/*
  # Add course unlocking system

  1. New Tables
    - `user_course_access` - tracks which courses each user has access to
    - `course_referral_links` - stores unique referral links per user per course

  2. Functions
    - `unlock_courses_on_purchase` - automatically unlocks lower-priced courses
    - `generate_course_referral_link` - generates unique referral links

  3. Security
    - Enable RLS on new tables
    - Add appropriate policies
*/

-- Create user_course_access table
CREATE TABLE IF NOT EXISTS user_course_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  course_id text NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  access_type text NOT NULL CHECK (access_type IN ('purchased', 'unlocked')),
  unlocked_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create course_referral_links table  
CREATE TABLE IF NOT EXISTS course_referral_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  course_id text NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  referral_link text NOT NULL,
  clicks integer DEFAULT 0,
  conversions integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE user_course_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_referral_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_course_access
CREATE POLICY "Users can view their own course access"
  ON user_course_access
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can manage course access"
  ON user_course_access
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for course_referral_links
CREATE POLICY "Users can view their own referral links"
  ON course_referral_links
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own referral links"
  ON course_referral_links
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Function to unlock courses based on purchase
CREATE OR REPLACE FUNCTION unlock_courses_on_purchase(purchased_course_id text, buyer_user_id uuid)
RETURNS void AS $$
DECLARE
  purchased_price numeric;
  course_record RECORD;
BEGIN
  -- Get the price of the purchased course
  SELECT price INTO purchased_price
  FROM courses
  WHERE id = purchased_course_id;

  -- Insert access for the purchased course
  INSERT INTO user_course_access (user_id, course_id, access_type)
  VALUES (buyer_user_id, purchased_course_id, 'purchased')
  ON CONFLICT (user_id, course_id) DO NOTHING;

  -- Unlock all courses with lower or equal price
  FOR course_record IN
    SELECT id FROM courses 
    WHERE price <= purchased_price AND id != purchased_course_id
  LOOP
    INSERT INTO user_course_access (user_id, course_id, access_type)
    VALUES (buyer_user_id, course_record.id, 'unlocked')
    ON CONFLICT (user_id, course_id) DO NOTHING;
  END LOOP;

  -- Generate referral links for all unlocked courses
  PERFORM generate_referral_links_for_user(buyer_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate referral links for a user
CREATE OR REPLACE FUNCTION generate_referral_links_for_user(target_user_id uuid)
RETURNS void AS $$
DECLARE
  course_record RECORD;
  user_referral_code text;
  base_url text := 'https://your-domain.com';
BEGIN
  -- Get user's referral code
  SELECT referral_code INTO user_referral_code
  FROM profiles
  WHERE user_id = target_user_id;

  -- Generate referral links for all accessible courses
  FOR course_record IN
    SELECT DISTINCT c.id
    FROM courses c
    INNER JOIN user_course_access uca ON c.id = uca.course_id
    WHERE uca.user_id = target_user_id
  LOOP
    INSERT INTO course_referral_links (user_id, course_id, referral_link)
    VALUES (
      target_user_id,
      course_record.id,
      base_url || '/course/' || course_record.id || '?ref=' || user_referral_code
    )
    ON CONFLICT (user_id, course_id) 
    DO UPDATE SET 
      referral_link = EXCLUDED.referral_link,
      updated_at = now();
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the existing process_referral_earnings function to work with new system
CREATE OR REPLACE FUNCTION process_referral_earnings(enrollment_id uuid)
RETURNS void AS $$
DECLARE
  enrollment_record RECORD;
  referrer_record RECORD;
  course_price numeric;
  level1_commission numeric;
  level2_commission numeric;
BEGIN
  -- Get enrollment details
  SELECT ce.*, p.referred_by
  INTO enrollment_record
  FROM course_enrollments ce
  LEFT JOIN profiles p ON ce.user_id = p.user_id
  WHERE ce.id = enrollment_id;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Get course price
  SELECT price INTO course_price
  FROM courses
  WHERE id = enrollment_record.course_id;

  -- Process Level 1 referral (direct referrer)
  IF enrollment_record.referred_by IS NOT NULL THEN
    level1_commission := course_price * 0.50; -- 50%
    
    INSERT INTO referral_earnings (
      referrer_id, referred_id, course_id, enrollment_id,
      commission_level, commission_percentage, course_price, commission_amount
    ) VALUES (
      enrollment_record.referred_by, enrollment_record.user_id, enrollment_record.course_id, enrollment_id,
      1, 50.00, course_price, level1_commission
    );

    -- Update referrer's totals
    UPDATE profiles 
    SET total_earnings = COALESCE(total_earnings, 0) + level1_commission,
        available_balance = COALESCE(available_balance, 0) + level1_commission,
        total_referrals = COALESCE(total_referrals, 0) + 1
    WHERE user_id = enrollment_record.referred_by;

    -- Process Level 2 referral (referrer's referrer)
    SELECT referred_by INTO referrer_record
    FROM profiles
    WHERE user_id = enrollment_record.referred_by;

    IF referrer_record.referred_by IS NOT NULL THEN
      level2_commission := course_price * 0.10; -- 10%
      
      INSERT INTO referral_earnings (
        referrer_id, referred_id, course_id, enrollment_id,
        commission_level, commission_percentage, course_price, commission_amount
      ) VALUES (
        referrer_record.referred_by, enrollment_record.user_id, enrollment_record.course_id, enrollment_id,
        2, 10.00, course_price, level2_commission
      );

      -- Update level 2 referrer's totals
      UPDATE profiles 
      SET total_earnings = COALESCE(total_earnings, 0) + level2_commission,
          available_balance = COALESCE(available_balance, 0) + level2_commission
      WHERE user_id = referrer_record.referred_by;
    END IF;
  END IF;

  -- Unlock courses for the purchaser
  PERFORM unlock_courses_on_purchase(enrollment_record.course_id, enrollment_record.user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add triggers for updated_at
CREATE TRIGGER update_course_referral_links_updated_at
  BEFORE UPDATE ON course_referral_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
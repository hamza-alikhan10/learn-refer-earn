-- Fix function search path mutable warnings by setting proper search_path
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    code := 'REF' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = code) INTO exists_check;
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  RETURN code;
END;
$$;

CREATE OR REPLACE FUNCTION public.process_referral_earnings(enrollment_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  enrollment_record RECORD;
  referral_record RECORD;
  commission_amount DECIMAL(10,2);
  commission_percentage DECIMAL(5,2);
  bonus_check INTEGER;
BEGIN
  -- Get enrollment details
  SELECT * INTO enrollment_record
  FROM public.course_enrollments ce
  JOIN public.courses c ON ce.course_id = c.id
  WHERE ce.id = enrollment_id;
  
  -- Process referral earnings for each level
  FOR referral_record IN 
    SELECT r.*, p.user_id as referrer_user_id
    FROM public.referrals r
    JOIN public.profiles p ON r.referrer_id = p.user_id
    WHERE r.referred_id = enrollment_record.user_id
  LOOP
    -- Calculate commission based on level
    IF referral_record.level = 1 THEN
      commission_percentage := 50.00;
    ELSIF referral_record.level = 2 THEN
      commission_percentage := 10.00;
    END IF;
    
    commission_amount := (enrollment_record.purchase_price * commission_percentage / 100);
    
    -- Insert referral earning record
    INSERT INTO public.referral_earnings (
      referrer_id, referred_id, course_id, enrollment_id,
      commission_level, commission_percentage, course_price, commission_amount
    ) VALUES (
      referral_record.referrer_id, enrollment_record.user_id, enrollment_record.course_id, enrollment_id,
      referral_record.level, commission_percentage, enrollment_record.purchase_price, commission_amount
    );
    
    -- Update referrer's earnings
    UPDATE public.profiles
    SET total_earnings = total_earnings + commission_amount,
        available_balance = available_balance + commission_amount
    WHERE user_id = referral_record.referrer_id;
    
    -- Check for milestone bonus (only for level 1 referrals)
    IF referral_record.level = 1 THEN
      UPDATE public.profiles
      SET total_referrals = total_referrals + 1
      WHERE user_id = referral_record.referrer_id;
      
      -- Check if user reached milestone (every 5 referrals)
      SELECT total_referrals INTO bonus_check
      FROM public.profiles
      WHERE user_id = referral_record.referrer_id;
      
      IF bonus_check % 5 = 0 THEN
        -- Credit milestone bonus
        INSERT INTO public.referral_bonuses (user_id, milestone_count)
        VALUES (referral_record.referrer_id, bonus_check / 5);
        
        UPDATE public.profiles
        SET total_bonuses = total_bonuses + 500,
            available_balance = available_balance + 500
        WHERE user_id = referral_record.referrer_id;
      END IF;
    END IF;
  END LOOP;
END;
$$;
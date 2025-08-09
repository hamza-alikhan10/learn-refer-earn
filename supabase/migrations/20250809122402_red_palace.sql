/*
  # Create demo accounts for testing

  1. Demo Accounts
    - demo1@test.com with referral code DEMO001
    - demo2@test.com with referral code DEMO002

  2. Test Data
    - Demo1 has purchased Course 3 (unlocks Courses 1, 2, 3)
    - Demo2 has purchased Course 1 only
    - Set up referral relationships for testing

  3. Security
    - These are test accounts with known credentials
*/

-- Insert demo user profiles (these will be created when users sign up)
-- The auth.users entries will be created through the signup process

-- Demo account 1: Has purchased Course 3, so has access to Courses 1, 2, 3
-- We'll use a placeholder UUID that will be replaced when the actual user signs up
DO $$
DECLARE
  demo1_user_id uuid := '11111111-1111-1111-1111-111111111111';
  demo2_user_id uuid := '22222222-2222-2222-2222-222222222222';
BEGIN
  -- Note: These profiles will be created automatically when users sign up
  -- This is just for reference of what the demo accounts should look like
  
  -- Demo 1 course access (purchased Course 3, unlocked 1 & 2)
  -- This will be handled by the unlock_courses_on_purchase function
  
  -- Demo 2 course access (purchased Course 1 only)
  -- This will be handled by the unlock_courses_on_purchase function
  
END $$;

-- Create a function to set up demo data after user signup
CREATE OR REPLACE FUNCTION setup_demo_account(user_email text, user_id uuid)
RETURNS void AS $$
BEGIN
  IF user_email = 'demo1@test.com' THEN
    -- Demo1 purchased Course 3 (₹4000) - unlocks courses 1, 2, 3
    INSERT INTO course_enrollments (user_id, course_id, purchase_price)
    VALUES (user_id, '3', 4000);
    
    -- Unlock courses
    PERFORM unlock_courses_on_purchase('3', user_id);
    
  ELSIF user_email = 'demo2@test.com' THEN
    -- Demo2 purchased Course 1 (₹999) - only unlocks course 1
    INSERT INTO course_enrollments (user_id, course_id, purchase_price)
    VALUES (user_id, '1', 999);
    
    -- Unlock courses
    PERFORM unlock_courses_on_purchase('1', user_id);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
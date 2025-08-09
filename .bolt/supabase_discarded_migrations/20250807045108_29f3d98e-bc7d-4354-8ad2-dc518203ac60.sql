-- Drop and recreate the trigger function with proper schema qualification
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ref_code TEXT;
  referrer_profile_id UUID;
BEGIN
  -- Generate unique referral code
  ref_code := public.generate_referral_code();
  
  -- Insert new profile
  INSERT INTO public.profiles (
    user_id,
    display_name,
    referral_code,
    referred_by
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    ref_code,
    CASE 
      WHEN NEW.raw_user_meta_data->>'referral_code' IS NOT NULL THEN
        (SELECT user_id FROM public.profiles WHERE referral_code = NEW.raw_user_meta_data->>'referral_code')
      ELSE NULL
    END
  );
  
  -- If user was referred, create referral relationships
  IF NEW.raw_user_meta_data->>'referral_code' IS NOT NULL THEN
    SELECT user_id INTO referrer_profile_id 
    FROM public.profiles 
    WHERE referral_code = NEW.raw_user_meta_data->>'referral_code';
    
    IF referrer_profile_id IS NOT NULL THEN
      -- Create level 1 referral relationship
      INSERT INTO public.referrals (referrer_id, referred_id, level)
      VALUES (referrer_profile_id, NEW.id, 1);
      
      -- Create level 2 referral relationship if referrer was also referred
      INSERT INTO public.referrals (referrer_id, referred_id, level)
      SELECT referred_by, NEW.id, 2
      FROM public.profiles
      WHERE user_id = referrer_profile_id AND referred_by IS NOT NULL;
    END IF;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block user creation
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
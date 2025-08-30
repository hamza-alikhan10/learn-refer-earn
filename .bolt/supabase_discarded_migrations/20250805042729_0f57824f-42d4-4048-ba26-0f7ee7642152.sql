-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  phone TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  total_referrals INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  available_balance DECIMAL(10,2) DEFAULT 0,
  total_bonuses DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  image_url TEXT,
  curriculum JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Create referrals table for tracking referral hierarchy
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  level INTEGER NOT NULL CHECK (level IN (1, 2)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(referrer_id, referred_id, level)
);

-- Create referral earnings table
CREATE TABLE public.referral_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  enrollment_id UUID REFERENCES public.course_enrollments(id) ON DELETE CASCADE NOT NULL,
  commission_level INTEGER NOT NULL CHECK (commission_level IN (1, 2)),
  commission_percentage DECIMAL(5,2) NOT NULL,
  course_price DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'credited', 'paid')),
  credited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create referral bonuses table for milestone tracking
CREATE TABLE public.referral_bonuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  milestone_count INTEGER NOT NULL,
  bonus_amount DECIMAL(10,2) NOT NULL DEFAULT 500,
  status TEXT DEFAULT 'credited' CHECK (status IN ('credited', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create withdrawals table
CREATE TABLE public.withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_details JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  admin_notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_bonuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Anyone can view public profile info" ON public.profiles
  FOR SELECT USING (true);

-- RLS Policies for courses
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (true);

-- RLS Policies for course enrollments
CREATE POLICY "Users can view their own enrollments" ON public.course_enrollments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own enrollments" ON public.course_enrollments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for referrals
CREATE POLICY "Users can view their referrals" ON public.referrals
  FOR SELECT USING (referrer_id = auth.uid() OR referred_id = auth.uid());

-- RLS Policies for referral earnings
CREATE POLICY "Users can view their earnings" ON public.referral_earnings
  FOR SELECT USING (referrer_id = auth.uid());

-- RLS Policies for referral bonuses
CREATE POLICY "Users can view their bonuses" ON public.referral_bonuses
  FOR SELECT USING (user_id = auth.uid());

-- RLS Policies for withdrawals
CREATE POLICY "Users can view their withdrawals" ON public.withdrawals
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create withdrawals" ON public.withdrawals
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code() RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  ref_code TEXT;
  referrer_profile_id UUID;
BEGIN
  -- Generate unique referral code
  ref_code := generate_referral_code();
  
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update profile timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate and credit referral earnings
CREATE OR REPLACE FUNCTION process_referral_earnings(enrollment_id UUID)
RETURNS void AS $$
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
$$ LANGUAGE plpgsql;

-- Insert trading courses
INSERT INTO public.courses (title, description, instructor, price, duration, level, rating, total_students, image_url) VALUES
('Trading Fundamentals', 'Master the basics of trading with comprehensive market analysis and risk management strategies.', 'Expert Trader A', 999.00, '8 hours', 'Beginner', 4.5, 1250, '/placeholder.svg'),
('Technical Analysis Mastery', 'Advanced technical analysis techniques for professional trading decisions.', 'Expert Trader B', 1999.00, '12 hours', 'Intermediate', 4.7, 890, '/placeholder.svg'),
('Options Trading Strategies', 'Complete guide to options trading with real-world examples and case studies.', 'Expert Trader C', 3500.00, '15 hours', 'Intermediate', 4.6, 650, '/placeholder.svg'),
('Advanced Day Trading', 'Professional day trading strategies for consistent profits in volatile markets.', 'Expert Trader D', 5000.00, '20 hours', 'Advanced', 4.8, 420, '/placeholder.svg'),
('Professional Trading Bootcamp', 'Comprehensive trading program covering all aspects from basics to advanced strategies.', 'Expert Trader E', 10000.00, '40 hours', 'Professional', 4.9, 180, '/placeholder.svg');
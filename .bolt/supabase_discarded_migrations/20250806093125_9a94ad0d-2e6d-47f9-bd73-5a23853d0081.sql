-- Fix the missing trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert test accounts for backtesting
INSERT INTO public.profiles (
  user_id,
  display_name,
  referral_code,
  referred_by,
  total_earnings,
  available_balance,
  total_referrals
) VALUES 
-- Test Account 1: Test Referrer (has made referrals and earned money)
('11111111-1111-1111-1111-111111111111', 'Test Referrer', 'TEST001', NULL, 2500.00, 2500.00, 5),
-- Test Account 2: Test User (was referred by Test Referrer)
('22222222-2222-2222-2222-222222222222', 'Test User', 'TEST002', '11111111-1111-1111-1111-111111111111', 100.00, 100.00, 1);
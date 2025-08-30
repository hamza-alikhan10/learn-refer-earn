-- Insert test referral codes for testing signup process
INSERT INTO public.profiles (user_id, display_name, referral_code, total_earnings, available_balance, total_referrals, total_bonuses) VALUES
('00000000-0000-0000-0000-000000000001', 'Test User 1', 'REF001234', 0, 0, 0, 0),
('00000000-0000-0000-0000-000000000002', 'Test User 2', 'REF567890', 0, 0, 0, 0),
('00000000-0000-0000-0000-000000000003', 'Test User 3', 'REF111222', 0, 0, 0, 0);
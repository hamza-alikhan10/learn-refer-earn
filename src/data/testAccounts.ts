// Test accounts for backtesting the referral system
// These referral codes can be used to test the signup flow

export const testReferralCodes = [
  {
    code: 'TEST001',
    description: 'Master Trader - Has 8 referrals and ₹4,000 earnings',
    ownerName: 'Master Trader'
  },
  {
    code: 'TEST002', 
    description: 'Pro Trader - Has 3 referrals and ₹1,500 earnings',
    ownerName: 'Pro Trader'
  },
  {
    code: 'TEST003',
    description: 'Elite Trader - Has 12 referrals and ₹6,000 earnings',
    ownerName: 'Elite Trader'
  },
  {
    code: 'TEST004',
    description: 'Advanced Trader - Has 5 referrals and ₹2,500 earnings',
    ownerName: 'Advanced Trader'
  },
  {
    code: 'TEST005',
    description: 'Expert Trader - Has 15 referrals and ₹7,500 earnings',
    ownerName: 'Expert Trader'
  }
];

// Test URLs for easy testing:
// http://localhost:5173/?ref=TEST001
// http://localhost:5173/?ref=TEST002
// http://localhost:5173/?ref=TEST003
// http://localhost:5173/?ref=TEST004
// http://localhost:5173/?ref=TEST005

export const testLoginCredentials = {
  note: 'These are mock credentials for testing. In production, users will create real accounts.',
  accounts: [
    {
      email: 'master.trader@example.com',
      password: 'password123',
      referralCode: 'TEST001',
      name: 'Master Trader'
    },
    {
      email: 'pro.trader@example.com', 
      password: 'password123',
      referralCode: 'TEST002',
      name: 'Pro Trader'
    },
    {
      email: 'elite.trader@example.com',
      password: 'password123',
      referralCode: 'TEST003',
      name: 'Elite Trader'
    },
    {
      email: 'advanced.trader@example.com',
      password: 'password123',
      referralCode: 'TEST004',
      name: 'Advanced Trader'
    },
    {
      email: 'expert.trader@example.com',
      password: 'password123',
      referralCode: 'TEST005',
      name: 'Expert Trader'
    }
  ]
};

console.log('Test Referral URLs for backtesting:');
testReferralCodes.forEach(ref => {
  console.log(`${ref.description}: ${window.location.origin}/?ref=${ref.code}`);
});
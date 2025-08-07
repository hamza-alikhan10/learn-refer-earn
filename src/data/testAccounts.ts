// Test accounts for backtesting the referral system
// These referral codes can be used to test the signup flow

export const testReferralCodes = [
  {
    code: 'TEST001',
    description: 'Test Referrer Account - Has 5 referrals and ₹2,500 earnings',
    ownerName: 'Test Referrer'
  },
  {
    code: 'TEST002', 
    description: 'Test User Account - Was referred and has ₹100 earnings',
    ownerName: 'Test User'
  }
];

// Test URLs for easy testing:
// http://localhost:5173/?ref=TEST001
// http://localhost:5173/?ref=TEST002

export const testLoginCredentials = {
  note: 'These are mock credentials for testing. In production, users will create real accounts.',
  accounts: [
    {
      email: 'test.referrer@example.com',
      password: 'password123',
      referralCode: 'TEST001',
      name: 'Test Referrer'
    },
    {
      email: 'test.user@example.com', 
      password: 'password123',
      referralCode: 'TEST002',
      name: 'Test User'
    }
  ]
};

console.log('Test Referral URLs for backtesting:');
testReferralCodes.forEach(ref => {
  console.log(`${ref.description}: ${window.location.origin}/?ref=${ref.code}`);
});
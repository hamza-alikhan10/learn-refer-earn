// Test accounts for backtesting the referral system
// These referral codes can be used to test the signup flow

export const testReferralCodes = [
  {
    code: 'TEST001',
    description: 'Demo Account 1 - Has purchased Course 3 (₹4000), unlocked Courses 1, 2, 3',
    ownerName: 'Demo Affiliate 1'
  },
  {
    code: 'TEST002', 
    description: 'Demo Account 2 - Has purchased Course 1 (₹999) only',
    ownerName: 'Demo Affiliate 2'
  }
];

// Test URLs for easy testing:
// http://localhost:8080/?ref=DEMO001
// http://localhost:8080/?ref=DEMO002

export const testLoginCredentials = {
  note: 'Demo accounts for testing the affiliate marketing system and course unlocking.',
  accounts: [
    {
      email: 'demo1@test.com',
      password: 'password123',
      referralCode: 'DEMO001',
      name: 'Demo Affiliate 1',
      description: 'Has purchased Course 3 (₹4000) - can refer Courses 1, 2, 3'
    },
    {
      email: 'demo2@test.com', 
      password: 'password123',
      referralCode: 'DEMO002',
      name: 'Demo Affiliate 2',
      description: 'Has purchased Course 1 (₹999) - can refer Course 1 only'
    }
  ]
};

console.log('Demo Referral URLs for testing:');
testReferralCodes.forEach(ref => {
  console.log(`${ref.description}: http://localhost:8080/?ref=${ref.code}`);
});
// Test referral codes for development and testing
// These will be created when users actually sign up

export const testReferralInfo = [
  {
    code: 'REF001234',
    description: 'Test User 1 - Use this link to test referral signup'
  },
  {
    code: 'REF567890', 
    description: 'Test User 2 - Use this link to test referral signup'
  },
  {
    code: 'REF111222',
    description: 'Test User 3 - Use this link to test referral signup'
  }
];

// To test the referral system:
// 1. First create a test user account normally
// 2. Then use these URLs to test referral signup:
//    - http://localhost:5173/?ref=REF001234
//    - http://localhost:5173/?ref=REF567890  
//    - http://localhost:5173/?ref=REF111222

console.log('Test Referral URLs:');
testReferralInfo.forEach(ref => {
  console.log(`${ref.description}: ${window.location.origin}/?ref=${ref.code}`);
});
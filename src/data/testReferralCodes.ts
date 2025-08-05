// Test referral codes for development and testing
export const testReferralCodes = [
  'REF001234', // Test user 1
  'REF567890', // Test user 2  
  'REF111222', // Test user 3
];

// You can use these referral codes to test the signup process:
// 1. http://localhost:5173/?ref=REF001234
// 2. http://localhost:5173/?ref=REF567890  
// 3. http://localhost:5173/?ref=REF111222

export const testUsers = [
  {
    referral_code: 'REF001234',
    display_name: 'Test User 1',
    email: 'testuser1@example.com'
  },
  {
    referral_code: 'REF567890', 
    display_name: 'Test User 2',
    email: 'testuser2@example.com'
  },
  {
    referral_code: 'REF111222',
    display_name: 'Test User 3', 
    email: 'testuser3@example.com'
  }
];
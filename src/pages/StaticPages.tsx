
import React from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';

interface StaticPagesProps {
  page: string;
  onPageChange: (page: string) => void;
}

const StaticPages: React.FC<StaticPagesProps> = ({ page, onPageChange }) => {
  const renderAboutUs = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About LearnHub</h1>
        <p className="text-xl text-gray-600">
          Empowering learners worldwide through quality education and rewarding partnerships
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At LearnHub, we believe that quality education should be accessible to everyone, everywhere. 
            Our mission is to democratize learning by connecting students with expert instructors and 
            creating opportunities for knowledge sharing that benefits entire communities.
          </p>
          <p className="text-gray-600">
            We've built a platform where learning doesn't just transform individuals—it creates a 
            ripple effect of growth and opportunity through our innovative referral system.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-6">
            To create a global learning ecosystem where knowledge flows freely, instructors are 
            rewarded for their expertise, and learners become ambassadors for education by sharing 
            valuable courses with their networks.
          </p>
          <p className="text-gray-600">
            Through our referral program, we're not just building a platform—we're building a 
            community where everyone benefits from the success of learning.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose LearnHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert-Led Courses</h3>
            <p className="text-gray-600 text-sm">
              Learn from industry professionals with real-world experience and proven track records.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
            <p className="text-gray-600 text-sm">
              Join a community of learners and earn rewards by sharing valuable educational content.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Generous Rewards</h3>
            <p className="text-gray-600 text-sm">
              Earn 60% commission on successful referrals—the highest in the industry.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of students who are already transforming their careers and earning through referrals.
        </p>
        <button
          onClick={() => onPageChange('courses')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How LearnHub Works</h1>
        <p className="text-xl text-gray-600">
          Your step-by-step guide to learning and earning on our platform
        </p>
      </div>

      <div className="space-y-12 mb-12">
        <div className="flex items-start space-x-6">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up or Log In</h3>
            <p className="text-gray-600 mb-4">
              Create your free LearnHub account in seconds. Use your email or sign in with Google for quick access.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Pro tip:</strong> Complete your profile to get personalized course recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-6">
          <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Browse and Select Courses</h3>
            <p className="text-gray-600 mb-4">
              Explore our extensive library of courses across various categories. Use filters to find exactly what you're looking for.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-sm font-medium text-blue-900">Web Development</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-sm font-medium text-green-900">Data Science</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-sm font-medium text-purple-900">Marketing</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <p className="text-sm font-medium text-orange-900">Design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-6">
          <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Your Referral Link</h3>
            <p className="text-gray-600 mb-4">
              For any course you find valuable, click the "Refer Course" button to generate your unique referral link.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2"><strong>Example referral link:</strong></p>
              <code className="text-xs bg-white p-2 rounded border">
                https://learnhub.example.com/course/123?ref=your-id
              </code>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-6">
          <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            4
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share with Your Network</h3>
            <p className="text-gray-600 mb-4">
              Share your referral link with friends, family, colleagues, or your social media followers. You can share via:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">Email</span>
              </div>
              <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-900">WhatsApp</span>
              </div>
              <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">Social Media</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-6">
          <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            5
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Earn 60% Commission</h3>
            <p className="text-gray-600 mb-4">
              When someone purchases a course through your referral link, you earn 60% of the course price!
            </p>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-semibold text-green-900 mb-2">Commission Example</p>
                <div className="space-y-2">
                  <p className="text-sm text-green-800">Course Price: <strong>$100</strong></p>
                  <ArrowRight className="w-4 h-4 mx-auto text-green-600" />
                  <p className="text-sm text-green-800">Your Earnings: <strong>$60</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-blue-100">
          Join LearnHub today and start your journey of learning and earning!
        </p>
        <button
          onClick={() => onPageChange('home')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );

  const renderReferralProgram = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Referral Program Details</h1>
        <p className="text-xl text-gray-600">
          Earn generous commissions by sharing quality education
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-8 mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">60% Commission Rate</h2>
        <p className="text-xl text-green-100 mb-6">
          Industry-leading referral rewards for every successful conversion
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="font-semibold">$50 Course</p>
            <p className="text-2xl font-bold text-yellow-300">$30</p>
            <p className="text-sm">Your earnings</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="font-semibold">$150 Course</p>
            <p className="text-2xl font-bold text-yellow-300">$90</p>
            <p className="text-sm">Your earnings</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="font-semibold">$250 Course</p>
            <p className="text-2xl font-bold text-yellow-300">$150</p>
            <p className="text-sm">Your earnings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Generate Referral Links</p>
                <p className="text-gray-600 text-sm">Create unique links for any course on our platform</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Share with Your Network</p>
                <p className="text-gray-600 text-sm">Use email, social media, or any channel you prefer</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Earn on Every Sale</p>
                <p className="text-gray-600 text-sm">Receive 60% commission when someone purchases</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Track Your Progress</p>
                <p className="text-gray-600 text-sm">Monitor clicks, conversions, and earnings in your dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Benefits</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">High Commission Rate</h3>
              <p className="text-blue-800 text-sm">
                At 60%, we offer one of the highest commission rates in the online education industry.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">No Minimum Threshold</h3>
              <p className="text-green-800 text-sm">
                Start earning from your first successful referral with a low $50 withdrawal minimum.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Real-Time Tracking</h3>
              <p className="text-purple-800 text-sm">
                Monitor your referral performance with detailed analytics and instant notifications.
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Quality Courses</h3>
              <p className="text-orange-800 text-sm">
                Promote high-quality, expert-led courses that your network will genuinely value.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Commission Structure</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• 60% commission on all successful referrals</li>
              <li>• Commissions credited after course completion</li>
              <li>• 30-day tracking period for referral attribution</li>
              <li>• No cap on total earnings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Program Rules</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• Self-referrals are not permitted</li>
              <li>• Minimum withdrawal amount: $50</li>
              <li>• Payments processed within 5 business days</li>
              <li>• Must comply with promotional guidelines</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Earning Today</h2>
        <p className="mb-6 text-blue-100">
          Join our referral program and turn your network into a source of income!
        </p>
        <button
          onClick={() => onPageChange('courses')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Browse Courses to Refer
        </button>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          We're here to help! Get in touch with our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-2">support@learnhub.com</p>
          <p className="text-sm text-gray-500">Response within 24 hours</p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
          <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM PST</p>
        </div>

        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-2">Available 24/7</p>
          <p className="text-sm text-gray-500">Instant support online</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Billing Question</option>
              <option>Referral Program</option>
              <option>Course Content</option>
              <option>Partnership Opportunity</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us how we can help you..."
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => alert('Thank you for your message! We will get back to you within 24 hours.')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Send Message
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I track my referral earnings?</h3>
            <p className="text-gray-600 text-sm">
              You can track all your referral activities, earnings, and withdrawal history in your personal dashboard. 
              Simply log in and navigate to the "Referrals" or "Earnings" section.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">When will I receive my commission payments?</h3>
            <p className="text-gray-600 text-sm">
              Commissions are credited to your account after the referred student completes their course purchase. 
              You can withdraw your earnings once you reach the $50 minimum threshold, and payments are processed within 5 business days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I refer courses to myself or family members?</h3>
            <p className="text-gray-600 text-sm">
              Self-referrals are not permitted under our program terms. However, you can refer courses to family members 
              as long as they are making genuine purchases and you're not circumventing the system.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What happens if a student refunds a course I referred?</h3>
            <p className="text-gray-600 text-sm">
              If a referred student requests a refund within our refund policy period, the associated commission 
              will be deducted from your account. We maintain fair practices for both students and referrers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const getPageContent = () => {
    switch (page) {
      case 'about':
        return renderAboutUs();
      case 'how-it-works':
        return renderHowItWorks();
      case 'referral-program':
        return renderReferralProgram();
      case 'contact':
        return renderContact();
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {getPageContent()}
      </div>
    </div>
  );
};

export default StaticPages;

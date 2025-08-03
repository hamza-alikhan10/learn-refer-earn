
import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Share2, ExternalLink, Copy, CheckCircle } from 'lucide-react';

interface DashboardProps {
  user: any;
  onPageChange: (page: string, courseId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockEnrolledCourses = [
    { id: '1', title: 'Stock Market Basics for Beginners', progress: 75, lastAccessed: '2 days ago' },
    { id: '3', title: 'Technical Analysis Mastery', progress: 45, lastAccessed: '1 week ago' },
  ];

  const mockReferrals = [
    {
      id: '1',
      courseId: '1',
      courseTitle: 'Stock Market Basics for Beginners',
      link: `https://tradingacademy.example.com/course/1?ref=${user.id}`,
      clicks: 25,
      conversions: 4,
      level1Earnings: 1996, // 4 * ₹999 * 0.5
      level2Earnings: 199, // 2 * ₹999 * 0.1 (from sub-referrals)
      status: 'active'
    },
    {
      id: '2',
      courseId: '4',
      courseTitle: 'Forex Trading Complete Course',
      link: `https://tradingacademy.example.com/course/4?ref=${user.id}`,
      clicks: 12,
      conversions: 2,
      level1Earnings: 5000, // 2 * ₹5000 * 0.5
      level2Earnings: 500, // 1 * ₹5000 * 0.1
      status: 'active'
    },
  ];

  const totalLevel1Earnings = mockReferrals.reduce((sum, referral) => sum + referral.level1Earnings, 0);
  const totalLevel2Earnings = mockReferrals.reduce((sum, referral) => sum + referral.level2Earnings, 0);
  const totalReferrals = mockReferrals.reduce((sum, referral) => sum + referral.conversions, 0);
  const bonusEarnings = Math.floor(totalReferrals / 5) * 500; // ₹500 per 5 referrals
  const totalEarnings = totalLevel1Earnings + totalLevel2Earnings + bonusEarnings;
  const totalClicks = mockReferrals.reduce((sum, referral) => sum + referral.clicks, 0);
  const totalConversions = mockReferrals.reduce((sum, referral) => sum + referral.conversions, 0);
  const nextBonusProgress = totalReferrals % 5;

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const handleWithdraw = () => {
    if (totalEarnings >= 1000) {
      alert(`Withdrawal request for ₹${totalEarnings} has been submitted. You will receive the funds within 3-5 business days after refund period ends.`);
    } else {
      alert('You need a minimum of ₹1000 balance to withdraw.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600">Track your learning progress and referral earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Total Earnings</p>
                <p className="text-2xl font-bold">₹{totalEarnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Level 1 Earnings</p>
                <p className="text-2xl font-bold">₹{totalLevel1Earnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Share2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Level 2 Earnings</p>
                <p className="text-2xl font-bold">₹{totalLevel2Earnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Bonus Earned</p>
                <p className="text-2xl font-bold">₹{bonusEarnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Total Referrals</p>
                <p className="text-2xl font-bold">{totalReferrals}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Progress */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Bonus Progress</h3>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
              ₹500 per 5 referrals
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{nextBonusProgress}/5 referrals completed</span>
                <span>Next: ₹500</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(nextBonusProgress / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('referrals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'referrals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Referrals
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'earnings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Earnings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Courses</h3>
                  <div className="space-y-4">
                    {mockEnrolledCourses.map(course => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          <button
                            onClick={() => onPageChange('course-details', course.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Continue Learning
                          </button>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">My Referral Links</h3>
                  <button
                    onClick={() => onPageChange('courses')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create New Referral
                  </button>
                </div>

                <div className="space-y-4">
                  {mockReferrals.map(referral => (
                    <div key={referral.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{referral.courseTitle}</h4>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Clicks</p>
                              <p className="font-semibold">{referral.clicks}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Conversions</p>
                              <p className="font-semibold">{referral.conversions}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Level 1 (50%)</p>
                              <p className="font-semibold text-green-600">₹{referral.level1Earnings}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Level 2 (10%)</p>
                              <p className="font-semibold text-blue-600">₹{referral.level2Earnings}</p>
                            </div>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {referral.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={referral.link}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        />
                        <button
                          onClick={() => handleCopyLink(referral.link, referral.id)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
                        >
                          {copiedLink === referral.id ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="text-sm">Copy</span>
                        </button>
                        <button
                          onClick={() => window.open(referral.link, '_blank')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Visit</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Available Earnings</h3>
                      <p className="text-3xl font-bold text-green-600">₹{totalEarnings}</p>
                      <p className="text-sm text-green-700 mt-1">
                        {totalEarnings >= 1000 ? 'Ready for withdrawal' : `Need ₹${1000 - totalEarnings} more to withdraw`}
                      </p>
                    </div>
                    <button
                      onClick={handleWithdraw}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        totalEarnings >= 1000
                          ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Withdraw Earnings
                    </button>
                  </div>
                </div>

                {/* Earnings Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Level 1 Earnings (50%)</h4>
                    <p className="text-2xl font-bold text-blue-600">₹{totalLevel1Earnings}</p>
                    <p className="text-sm text-gray-500">Direct referrals</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Level 2 Earnings (10%)</h4>
                    <p className="text-2xl font-bold text-purple-600">₹{totalLevel2Earnings}</p>
                    <p className="text-sm text-gray-500">Sub-referrals</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Bonus Earnings</h4>
                    <p className="text-2xl font-bold text-orange-600">₹{bonusEarnings}</p>
                    <p className="text-sm text-gray-500">Milestone bonuses</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h3>
                  <div className="space-y-4">
                    {mockReferrals.map(referral => (
                      <div key={referral.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                          <div>
                            <h4 className="font-medium text-gray-900">{referral.courseTitle}</h4>
                            <p className="text-sm text-gray-600">
                              {referral.conversions} conversion{referral.conversions !== 1 ? 's' : ''} 
                              {' • '}
                              50% + 10% commission structure
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">+₹{referral.level1Earnings + referral.level2Earnings}</p>
                            <p className="text-sm text-gray-500">Total earned</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Withdrawal Terms & Commission Structure</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Minimum withdrawal amount: ₹1000</li>
                    <li>• Processing time: 3-5 business days after refund period</li>
                    <li>• Level 1: 50% commission on direct referrals</li>
                    <li>• Level 2: 10% commission on sub-referrals (2nd level only)</li>
                    <li>• Bonus: ₹500 for every 5 successful referrals</li>
                    <li>• No self-referrals allowed</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

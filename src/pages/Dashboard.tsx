import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Share2, ExternalLink, Copy, CheckCircle, Calendar, Eye } from 'lucide-react';

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
      level1Earnings: 1996,
      level2Earnings: 199,
      status: 'active'
    },
    {
      id: '2',
      courseId: '4',
      courseTitle: 'Forex Trading Complete Course',
      link: `https://tradingacademy.example.com/course/4?ref=${user.id}`,
      clicks: 12,
      conversions: 2,
      level1Earnings: 5000,
      level2Earnings: 500,
      status: 'active'
    },
  ];

  // Mock earning history with detailed level breakdown
  const mockLevel1History = [
    { id: '1', courseTitle: 'Stock Market Basics for Beginners', referredUser: 'john_doe', amount: 499, date: '2024-01-15', status: 'confirmed' },
    { id: '2', courseTitle: 'Stock Market Basics for Beginners', referredUser: 'jane_smith', amount: 499, date: '2024-01-20', status: 'confirmed' },
    { id: '3', courseTitle: 'Stock Market Basics for Beginners', referredUser: 'mike_wilson', amount: 499, date: '2024-01-25', status: 'confirmed' },
    { id: '4', courseTitle: 'Stock Market Basics for Beginners', referredUser: 'sarah_lee', amount: 499, date: '2024-01-28', status: 'confirmed' },
    { id: '5', courseTitle: 'Forex Trading Complete Course', referredUser: 'alex_brown', amount: 2500, date: '2024-02-02', status: 'confirmed' },
    { id: '6', courseTitle: 'Forex Trading Complete Course', referredUser: 'emma_davis', amount: 2500, date: '2024-02-08', status: 'pending' },
  ];

  const mockLevel2History = [
    { id: '1', courseTitle: 'Stock Market Basics for Beginners', originalReferrer: 'john_doe', referredUser: 'robert_jones', amount: 99.9, date: '2024-01-22', status: 'confirmed' },
    { id: '2', courseTitle: 'Stock Market Basics for Beginners', originalReferrer: 'jane_smith', referredUser: 'lisa_white', amount: 99.9, date: '2024-01-27', status: 'confirmed' },
    { id: '3', courseTitle: 'Forex Trading Complete Course', originalReferrer: 'alex_brown', referredUser: 'kevin_clark', amount: 500, date: '2024-02-10', status: 'pending' },
  ];

  const totalLevel1Earnings = mockReferrals.reduce((sum, referral) => sum + referral.level1Earnings, 0);
  const totalLevel2Earnings = mockReferrals.reduce((sum, referral) => sum + referral.level2Earnings, 0);
  const totalReferrals = mockReferrals.reduce((sum, referral) => sum + referral.conversions, 0);
  const bonusEarnings = Math.floor(totalReferrals / 5) * 500;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600">Track your learning progress and referral earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-xl shadow-lg text-white col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Total Earnings</p>
                <p className="text-lg sm:text-2xl font-bold">₹{totalEarnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <DollarSign className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Level 1</p>
                <p className="text-lg sm:text-2xl font-bold">₹{totalLevel1Earnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <Share2 className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Level 2</p>
                <p className="text-lg sm:text-2xl font-bold">₹{totalLevel2Earnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <Users className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Bonus</p>
                <p className="text-lg sm:text-2xl font-bold">₹{bonusEarnings}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Referrals</p>
                <p className="text-lg sm:text-2xl font-bold">{totalReferrals}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Progress */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 sm:mb-8 border-l-4 border-yellow-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Bonus Progress</h3>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full w-fit">
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
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 min-w-max">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('referrals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'referrals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Referrals
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'earnings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Earnings
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Courses</h3>
                  <div className="space-y-4">
                    {mockEnrolledCourses.map(course => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                          <h4 className="font-medium text-gray-900 pr-2">{course.title}</h4>
                          <button
                            onClick={() => onPageChange('course-details', course.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium w-fit"
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-gray-900">My Referral Links</h3>
                  <button
                    onClick={() => onPageChange('courses')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-fit"
                  >
                    Create New Referral
                  </button>
                </div>

                <div className="space-y-4">
                  {mockReferrals.map(referral => (
                    <div key={referral.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-3">{referral.courseTitle}</h4>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full w-fit">
                          {referral.status}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <input
                          type="text"
                          value={referral.link}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCopyLink(referral.link, referral.id)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
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
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Visit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Available Earnings</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{totalEarnings}</p>
                      <p className="text-sm text-green-700 mt-1">
                        {totalEarnings >= 1000 ? 'Ready for withdrawal' : `Need ₹${1000 - totalEarnings} more to withdraw`}
                      </p>
                    </div>
                    <button
                      onClick={handleWithdraw}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full sm:w-auto ${
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Level 1 Earnings (50%)</h4>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{totalLevel1Earnings}</p>
                    <p className="text-sm text-gray-500">Direct referrals</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Level 2 Earnings (10%)</h4>
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">₹{totalLevel2Earnings}</p>
                    <p className="text-sm text-gray-500">Sub-referrals</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Bonus Earnings</h4>
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">₹{bonusEarnings}</p>
                    <p className="text-sm text-gray-500">Milestone bonuses</p>
                  </div>
                </div>

                {/* Level 1 Earnings History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                    Level 1 Earnings History (50% Commission)
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <div className="min-w-full">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200">
                          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-4 sm:col-span-3">Course</div>
                            <div className="col-span-3 sm:col-span-2">Referred User</div>
                            <div className="col-span-2 sm:col-span-2">Amount</div>
                            <div className="col-span-2 sm:col-span-2">Date</div>
                            <div className="col-span-1 sm:col-span-3">Status</div>
                          </div>
                        </div>
                        {/* Body */}
                        <div className="divide-y divide-gray-200">
                          {mockLevel1History.map(earning => (
                            <div key={earning.id} className="px-4 sm:px-6 py-4">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-4 sm:col-span-3">
                                  <p className="text-sm font-medium text-gray-900 truncate" title={earning.courseTitle}>
                                    {earning.courseTitle}
                                  </p>
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                  <p className="text-sm text-gray-600 truncate">@{earning.referredUser}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-2">
                                  <p className="text-sm font-semibold text-green-600">₹{earning.amount}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-2">
                                  <p className="text-sm text-gray-500">{formatDate(earning.date)}</p>
                                </div>
                                <div className="col-span-1 sm:col-span-3">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    earning.status === 'confirmed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {earning.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level 2 Earnings History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-600" />
                    Level 2 Earnings History (10% Commission)
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <div className="min-w-full">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200">
                          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="col-span-3">Course</div>
                            <div className="col-span-2 sm:col-span-2">Original Referrer</div>
                            <div className="col-span-2 sm:col-span-2">End User</div>
                            <div className="col-span-2 sm:col-span-2">Amount</div>
                            <div className="col-span-2 sm:col-span-2">Date</div>
                            <div className="col-span-1 sm:col-span-2">Status</div>
                          </div>
                        </div>
                        {/* Body */}
                        <div className="divide-y divide-gray-200">
                          {mockLevel2History.map(earning => (
                            <div key={earning.id} className="px-4 sm:px-6 py-4">
                              <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3">
                                  <p className="text-sm font-medium text-gray-900 truncate" title={earning.courseTitle}>
                                    {earning.courseTitle}
                                  </p>
                                </div>
                                <div className="col-span-2 sm:col-span-2">
                                  <p className="text-sm text-gray-600 truncate">@{earning.originalReferrer}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-2">
                                  <p className="text-sm text-gray-600 truncate">@{earning.referredUser}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-2">
                                  <p className="text-sm font-semibold text-purple-600">₹{earning.amount}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-2">
                                  <p className="text-sm text-gray-500">{formatDate(earning.date)}</p>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    earning.status === 'confirmed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {earning.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Withdrawal Terms & Commission Structure</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <ul className="space-y-1">
                      <li>• Minimum withdrawal amount: ₹1000</li>
                      <li>• Processing time: 3-5 business days after refund period</li>
                      <li>• Level 1: 50% commission on direct referrals</li>
                      <li>• Level 2: 10% commission on sub-referrals (2nd level only)</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Bonus: ₹500 for every 5 successful referrals</li>
                      <li>• No self-referrals allowed</li>
                      <li>• All earnings subject to refund period completion</li>
                      <li>• Withdrawal requests processed on business days only</li>
                    </ul>
                  </div>
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

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
    { id: '1', title: 'Complete React Development Bootcamp', progress: 75, lastAccessed: '2 days ago' },
    { id: '2', title: 'Python for Data Science Masterclass', progress: 45, lastAccessed: '1 week ago' },
  ];

  const mockReferrals = [
    {
      id: '1',
      courseId: '1',
      courseTitle: 'Complete React Development Bootcamp',
      link: `https://learnhub.example.com/course/1?ref=${user.id}`,
      clicks: 15,
      conversions: 3,
      earnings: 267, // 3 * $149 * 0.6
      status: 'active'
    },
    {
      id: '2',
      courseId: '3',
      courseTitle: 'Digital Marketing Fundamentals',
      link: `https://learnhub.example.com/course/3?ref=${user.id}`,
      clicks: 8,
      conversions: 1,
      earnings: 77.4, // 1 * $129 * 0.6
      status: 'active'
    },
  ];

  const totalEarnings = mockReferrals.reduce((sum, referral) => sum + referral.earnings, 0);
  const totalClicks = mockReferrals.reduce((sum, referral) => sum + referral.clicks, 0);
  const totalConversions = mockReferrals.reduce((sum, referral) => sum + referral.conversions, 0);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const handleWithdraw = () => {
    alert(`Withdrawal request for $${totalEarnings.toFixed(2)} has been submitted. You will receive the funds within 3-5 business days.`);
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Referral Clicks</p>
                <p className="text-2xl font-bold text-blue-600">{totalClicks}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-purple-600">{totalConversions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                <p className="text-2xl font-bold text-indigo-600">{mockEnrolledCourses.length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
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
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Clicks</p>
                              <p className="font-semibold">{referral.clicks}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Conversions</p>
                              <p className="font-semibold">{referral.conversions}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Earnings</p>
                              <p className="font-semibold text-green-600">${referral.earnings.toFixed(2)}</p>
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Available Earnings</h3>
                      <p className="text-3xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
                      <p className="text-sm text-green-700 mt-1">Ready for withdrawal</p>
                    </div>
                    <button
                      onClick={handleWithdraw}
                      className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
                    >
                      Withdraw Earnings
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h3>
                  <div className="space-y-4">
                    {mockReferrals.map(referral => (
                      <div key={referral.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">{referral.courseTitle}</h4>
                            <p className="text-sm text-gray-600">
                              {referral.conversions} conversion{referral.conversions !== 1 ? 's' : ''} 
                              {' • '}
                              60% commission rate
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">+${referral.earnings.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Earned</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Withdrawal Terms</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Minimum withdrawal amount: $50</li>
                    <li>• Processing time: 3-5 business days</li>
                    <li>• Earnings are credited after successful course completion</li>
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

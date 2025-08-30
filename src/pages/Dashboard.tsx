import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/ReduxStore/hooks';
import { TrendingUp, Users, DollarSign, ExternalLink, Copy, CheckCircle, Eye, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { setIsAuthModelOpen, setLoading } from '@/ReduxStore/features/slices/auth';
import { useGetDashboardQuery } from '@/ReduxStore/features/api/dashboard';
import { useNavigate } from 'react-router-dom';
import { useGetPaymentMethodsMutation } from '@/ReduxStore/features/api/paymentMethods';
import WithdrawalModal from '@/components/WithdrawalModal';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState('');
  const { toast } = useToast();
  const dispatch = useAppDispatch();  
  const { user, userId, email, username } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();


  const [getMethods, { isLoading:paymentMethodLoading }] = useGetPaymentMethodsMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<any>(null); // GetPaymentMethodsResponse


    const handleOpen = async () => {
    if (!userId) {
      // if there is no user, redirect or show auth depending on your app
      dispatch(setIsAuthModelOpen(true));
      navigate('/');
      return;
    }
    try {
      const res = await getMethods({ userId }).unwrap();
      setPayload(res);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
      // show toast if you want
    }
  };

  // Fetch dashboard data for this user
  const { data: dashboardData, isLoading: isLoadingDashboard, isError, error } =   useGetDashboardQuery(
    { userId: userId || '' },   // first arg: params
    { skip: !userId }           // second arg: options
  );
  console.log("Dashboard data:", dashboardData);
  // If user is not logged in, show Access Denied
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }


  // Show loading spinner while fetching data
  if (isLoadingDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle error state (optional handling)
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-600">{error?.toString() || 'An unexpected error occurred.'}</p>
        </div>
      </div>
    );
  }

  // Ensure data is loaded
  if (!dashboardData) {
    return null; // or a fallback UI
  }

  
  // Helper: generate referral link using API's referral code
  const generateReferralLink = (courseId: string) => {
    const baseUrl = window.location.origin;
    const referralCode = dashboardData.referral_code || userId;
    return `${baseUrl}/?ref=${encodeURIComponent(referralCode)}`;
  };

  // Calculate total courses for display
  const totalCourses = dashboardData.enrolled_users + dashboardData.available_courses;

  // Handle Copy Link action
  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(''), 2000);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <>
      {modalOpen && payload && (
        <WithdrawalModal
          payload={payload}
          onClose={() => {
            setModalOpen(false);
            setPayload(null);
          }}
        />
      )}

      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user || username || email}!
            </h1>
            <p className="text-gray-600">Track your affiliate marketing progress and referral earnings</p>
            <div className="mt-2 text-sm text-blue-600 font-medium">
              Your Referral Code: <span className="bg-blue-100 px-2 py-1 rounded">{dashboardData.referral_code || userId}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-90">Total Earnings</p>
                  <p className="text-lg sm:text-2xl font-bold">₹{dashboardData.total_earnings.toFixed(0)}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                  <DollarSign className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-90">Referrals</p>
                  <p className="text-lg sm:text-2xl font-bold">{dashboardData.referrals}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-90">Enrolled</p>
                    <p className="text-lg sm:text-2xl font-bold">
                      {dashboardData.enrolled_users === 0 && dashboardData.referrals === 0
                        ? 0
                        : `${dashboardData.enrolled_users}/${dashboardData.referrals}`}
                    </p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                  <Eye className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium opacity-90">Available</p>
                  <p className="text-lg sm:text-2xl font-bold">{dashboardData.available_courses}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                  <ShoppingCart className="w-4 h-4 sm:w-6 sm:h-6" />
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
                  Courses & Purchase
                </button>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'referrals'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Referral Links
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
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">All Affiliate Marketing Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dashboardData.courses.map(course => (
                      <div key={course.course_id} className="border rounded-lg p-4 border-gray-200 bg-white flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{course.title}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Available
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm mb-3">
                          <span className="text-gray-600">₹{course.price} • {course.level}</span>
                          <span className="text-gray-500">{course.duration}</span>
                        </div>

                        {/* Description area — will grow/shrink but won't push the button out of place */}
                        <p className="text-sm text-gray-600 mb-4">{course.description ?? "No description available."}</p>

                        {/* This spacer + mt-auto ensures the button is always pushed to the bottom */}
                        <div className="mt-auto flex space-x-2">
                        {course.enrolled_status === "enrolled" ? (
                            <button
                              onClick={() => navigate(`/courses/${course.course_id}`)}
                              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Ready to study</span>
                            </button>
                            ) : (
                              <button
                                onClick={() => navigate(`/courses/${course.course_id}`)}
                                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm flex items-center justify-center space-x-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Purchase ₹{course.price}</span>
                              </button>
                            )}
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">How It Works</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Purchase any course with one-click UPI payment</li>
                      <li>• Generate referral links for any course (no restrictions)</li>
                      <li>• Earn 50% commission on direct referrals + 10% on second-level</li>
                      <li>• Get ₹500 bonus for every 5 successful referrals</li>
                      <li>• Minimum withdrawal: ₹1000</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Referrals Tab */}
              {activeTab === 'referrals' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-900">Referral Links</h3>
                    <p className="text-sm text-gray-600">Generate links for any course</p>
                  </div>

                  <div className="space-y-4">
                    {dashboardData.courses.map(course => {
                      const referralLink = generateReferralLink(course.course_id);
                      return (
                        <div key={course.course_id} className="border rounded-lg p-4 sm:p-6 border-gray-200">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-4 lg:space-y-0">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{course.title}</h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">₹{course.price} • {course.level}</p>
                              
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Potential Earning</p>
                                  <p className="font-semibold text-green-600">₹{Math.floor(course.potential_per_sale)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Total Earned</p>
                                  <p className="font-semibold text-blue-600">₹{course.total_earned.toFixed(0)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Referrals</p>
                                  <p className="font-semibold">{course.referrals}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                              <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleCopyLink(referralLink, course.course_id)}
                                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
                                >
                                  {copiedLink === course.course_id ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                  <span className="text-sm">Copy</span>
                                </button>
                                <button
                                  onClick={() => window.open(referralLink, '_blank')}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span className="text-sm">Visit</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Earnings Tab */}
              {activeTab === 'earnings' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                      <div>
                        <h3 className="text-lg font-semibold text-green-900">Available Earnings</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600">
                          ₹{dashboardData.available_balance.toFixed(2)}
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          {dashboardData.available_balance >= 1000
                            ? 'Ready for withdrawal'
                            : `Need ₹${(1000 - dashboardData.available_balance).toFixed(0)} more to withdraw`}
                        </p>
                      </div>
                      <button
                          onClick={handleOpen}
                          disabled={paymentMethodLoading}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full sm:w-auto ${
                          dashboardData.available_balance >= 1000
                            ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                          title="Open withdrawal"
                        >
                          {paymentMethodLoading ? (
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                          ) : (
                            <span>  Withdraw via UPI</span>
                          )}
                        </button>
                    </div>
                  </div>

                  {/* Earnings by Course */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings by Course</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dashboardData.courses.map(course => (
                        <div key={course.course_id} className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total Earned:</span>
                              <span className="font-semibold text-green-600">
                                ₹{course.total_earned.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Referrals:</span>
                              <span className="font-semibold">{course.referrals}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Potential per sale:</span>
                              <span className="font-semibold text-blue-600">
                                ₹{Math.floor(course.potential_per_sale)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

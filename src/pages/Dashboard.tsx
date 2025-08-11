import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Share2, ExternalLink, Copy, CheckCircle, Calendar, Eye, Lock, Unlock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  user: any;
  onPageChange: (page: string, courseId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onPageChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState('');
  const [userCourseAccess, setUserCourseAccess] = useState<any[]>([]);
  const [referralLinks, setReferralLinks] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // All 4 courses with their details
  const allCourses = [
    { id: '1', title: 'Affiliate Marketing Fundamentals', price: 999, level: 'Beginner' },
    { id: '2', title: 'Advanced Affiliate Strategies', price: 1999, level: 'Intermediate' },
    { id: '3', title: 'Affiliate Marketing Mastery', price: 4000, level: 'Advanced' },
    { id: '4', title: 'Affiliate Empire Blueprint', price: 5000, level: 'Expert' }
  ];

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load user course access
      const { data: accessData, error: accessError } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', user.user_id || user.id);

      if (accessError) throw accessError;
      setUserCourseAccess(accessData || []);

      // Load referral links
      // For now, generate referral links dynamically since the table doesn't exist yet
      const referralCode = user.referral_code || user.id;
      const baseUrl = window.location.origin;
      const dynamicLinks = (accessData || []).map(enrollment => ({
        course_id: enrollment.course_id,
        referral_link: `${baseUrl}/course/${enrollment.course_id}?ref=${referralCode}`,
        user_id: user.user_id || user.id
      }));

      setReferralLinks(dynamicLinks);

      // Load earnings
      const { data: earningsData, error: earningsError } = await supabase
        .from('referral_earnings')
        .select(`
          *,
          courses(title)
        `)
        .eq('referrer_id', user.user_id || user.id);

      if (earningsError) throw earningsError;
      setEarnings(earningsData || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReferralLink = async (courseId: string) => {
    try {
      const baseUrl = window.location.origin;
      const referralCode = user.referral_code || user.id;
      const referralLink = `${baseUrl}/course/${courseId}?ref=${referralCode}`;

      // For now, just add to local state since table doesn't exist yet
      const newLink = {
        user_id: user.user_id || user.id,
        course_id: courseId,
        referral_link: referralLink
      };
      
      setReferralLinks(prev => [...prev.filter(link => link.course_id !== courseId), newLink]);

      toast({
        title: "Success",
        description: "Referral link generated successfully!",
      });
    } catch (error) {
      console.error('Error generating referral link:', error);
      toast({
        title: "Error",
        description: "Failed to generate referral link",
        variant: "destructive",
      });
    }
  };

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

  const hasAccessToCourse = (courseId: string) => {
    return userCourseAccess.some(access => access.course_id === courseId);
  };

  const getReferralLinkForCourse = (courseId: string) => {
    return referralLinks.find(link => link.course_id === courseId);
  };

  const getEarningsForCourse = (courseId: string) => {
    return earnings.filter(earning => earning.course_id === courseId);
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + parseFloat(earning.commission_amount), 0);
  const totalReferrals = earnings.length;

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const handleWithdraw = () => {
    if (totalEarnings >= 1000) {
      alert(`Withdrawal request for ₹${totalEarnings.toFixed(2)} has been submitted. You will receive the funds within 3-5 business days.`);
    } else {
      alert('You need a minimum of ₹1000 balance to withdraw.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.display_name || user.username || user.email}!
          </h1>
          <p className="text-gray-600">Track your affiliate marketing progress and referral earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Total Earnings</p>
                <p className="text-lg sm:text-2xl font-bold">₹{totalEarnings.toFixed(0)}</p>
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
                <p className="text-lg sm:text-2xl font-bold">{totalReferrals}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <Users className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Unlocked</p>
                <p className="text-lg sm:text-2xl font-bold">{userCourseAccess.length}/4</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <Unlock className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Links</p>
                <p className="text-lg sm:text-2xl font-bold">{referralLinks.length}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-full">
                <Share2 className="w-4 h-4 sm:w-6 sm:h-6" />
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
                Course Access
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Access Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allCourses.map(course => {
                      const hasAccess = hasAccessToCourse(course.id);
                      return (
                        <div key={course.id} className={`border rounded-lg p-4 ${hasAccess ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">{course.title}</h4>
                            {hasAccess ? (
                              <Unlock className="w-5 h-5 text-green-600" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">₹{course.price} • {course.level}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              hasAccess ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {hasAccess ? 'Unlocked' : 'Locked'}
                            </span>
                          </div>
                          {hasAccess && (
                            <button
                              onClick={() => onPageChange('course-details', course.id)}
                              className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                            >
                              View Course
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Course Unlocking System</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Purchase Course 2 (₹1999) → Course 1 unlocks automatically</li>
                    <li>• Purchase Course 3 (₹4000) → Courses 1 & 2 unlock automatically</li>
                    <li>• Purchase Course 4 (₹5000) → All courses unlock automatically</li>
                    <li>• You can only refer courses that you have unlocked</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-gray-900">My Referral Links</h3>
                  <p className="text-sm text-gray-600">Generate links for unlocked courses only</p>
                </div>

                <div className="space-y-4">
                  {allCourses.map(course => {
                    const hasAccess = hasAccessToCourse(course.id);
                    const referralLink = getReferralLinkForCourse(course.id);
                    const courseEarnings = getEarningsForCourse(course.id);
                    const totalEarningsForCourse = courseEarnings.reduce((sum, earning) => sum + parseFloat(earning.commission_amount), 0);

                    return (
                      <div key={course.id} className={`border rounded-lg p-4 sm:p-6 ${hasAccess ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}>
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-4 lg:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{course.title}</h4>
                              {hasAccess ? (
                                <Unlock className="w-4 h-4 text-green-600" />
                              ) : (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">₹{course.price} • {course.level}</p>
                            
                            {hasAccess && (
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Potential Earning</p>
                                  <p className="font-semibold text-green-600">₹{Math.floor(course.price * 0.5)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Total Earned</p>
                                  <p className="font-semibold text-blue-600">₹{totalEarningsForCourse.toFixed(0)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Referrals</p>
                                  <p className="font-semibold">{courseEarnings.length}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {hasAccess ? (
                          referralLink ? (
                            <div className="space-y-3">
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                <input
                                  type="text"
                                  value={referralLink.referral_link}
                                  readOnly
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                                />
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleCopyLink(referralLink.referral_link, course.id)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
                                  >
                                    {copiedLink === course.id ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                    <span className="text-sm">Copy</span>
                                  </button>
                                  <button
                                    onClick={() => window.open(referralLink.referral_link, '_blank')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <span className="text-sm">Visit</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => generateReferralLink(course.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                              Generate Referral Link
                            </button>
                          )
                        ) : (
                          <div className="bg-gray-100 border border-gray-200 rounded-md p-3 text-center">
                            <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Purchase this course or a higher-tier course to unlock referral link</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">Available Earnings</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{totalEarnings.toFixed(2)}</p>
                      <p className="text-sm text-green-700 mt-1">
                        {totalEarnings >= 1000 ? 'Ready for withdrawal' : `Need ₹${(1000 - totalEarnings).toFixed(2)} more to withdraw`}
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

                {/* Earnings by Course */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings by Course</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allCourses.map(course => {
                      const courseEarnings = getEarningsForCourse(course.id);
                      const totalForCourse = courseEarnings.reduce((sum, earning) => sum + parseFloat(earning.commission_amount), 0);
                      
                      return (
                        <div key={course.id} className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total Earned:</span>
                              <span className="font-semibold text-green-600">₹{totalForCourse.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Referrals:</span>
                              <span className="font-semibold">{courseEarnings.length}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Potential per sale:</span>
                              <span className="font-semibold text-blue-600">₹{Math.floor(course.price * 0.5)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Earnings */}
                {earnings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Earnings</h3>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {earnings.slice(0, 10).map((earning, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {earning.courses?.title || `Course ${earning.course_id}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                  ₹{parseFloat(earning.commission_amount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  Level {earning.commission_level}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(earning.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/ReduxStore/hooks';
import { TrendingUp, Users, DollarSign, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { setIsAuthModelOpen } from '@/ReduxStore/features/slices/auth';
import { useGetDashboardQuery } from '@/ReduxStore/features/api/dashboard';
import { useNavigate } from 'react-router-dom';
import { useGetPaymentMethodsMutation } from '@/ReduxStore/features/api/paymentMethods';
import WithdrawalModal from '@/components/WithdrawalModal';

import { useLazyGetReferralHistoryQuery } from '@/ReduxStore/features/api/history';

const Dashboard = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { user, userId, email, username } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [getMethods, { isLoading: paymentMethodLoading }] = useGetPaymentMethodsMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const [triggerHistory, historyResult] = useLazyGetReferralHistoryQuery();
  const { data: historyData, isFetching: historyLoading, isError: historyIsError, error: historyError } = historyResult;

  const handleOpen = async () => {
    if (!userId) {
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
    }
  };

  const { data: dashboardData, isLoading: isLoadingDashboard, isError, error } = useGetDashboardQuery(
    { userId: userId || '' },
    { skip: !userId }
  );
  console.log("Dashboard data:", dashboardData);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  if (isLoadingDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-500 mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-400">{error?.toString() || 'An unexpected error occurred.'}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const referralLink = (() => {
    const baseUrl = window.location.origin;
    const referralCode = dashboardData.referral_code || userId;
    return `${baseUrl}/?ref=${encodeURIComponent(referralCode)}`;
  })();

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const totalReferrals = dashboardData.referrals_primary + dashboardData.enrolled_users_secondary || 0;
  const primaryReferrals = dashboardData.referrals_primary ?? 0;
  const secondaryReferrals = dashboardData.referrals_secondary ?? 0;
  const dailyEarnings = dashboardData.earnings_daily ?? 0;
  const weeklyEarnings = dashboardData.earnings_weekly ?? 0;
  const monthlyEarnings = dashboardData.earnings_monthly ?? 0;
  const primaryEnrolled = dashboardData.enrolled_users_primary ?? 0;
  const secondaryEnrolled = dashboardData.enrolled_users_secondary ?? 0;

    // Handler to trigger history fetch
  const handleLoadHistory = () => {
    if (!userId) {
      dispatch(setIsAuthModelOpen(true));
      return;
    }
    triggerHistory({ userId });
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

      <div className="min-h-screen bg-slate-950 py-4 sm:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xMDQtLjg5Ni0yLTItMmgxYzAtMS4xMDQtLjg5Ni0yLTItMnMtMiAuODk2LTIgMnMuODk2IDIgMiAyaC0xYzAgMS4xMDQuODk2IDIgMiAyaC0xYzAgMS4xMDQuODk2IDIgMiAyIi8+PC9nPjwvZz48L3N2Zz4=)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, {user || username || email}!
            </h1>
            <p className="text-gray-400">Track your affiliate marketing progress and referral earnings</p>
            <div className="mt-2 text-sm text-indigo-400 font-medium flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span>Your Referral Code: <span className="bg-indigo-900/50 px-2 py-1 rounded">{dashboardData.referral_code || userId}</span></span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="px-3 py-1 border border-indigo-500/50 rounded-md bg-slate-900 text-sm text-gray-300 w-full sm:w-64 mb-2 sm:mb-0"
                />
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleCopyLink(referralLink)}
                    className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 w-full sm:w-auto"
                  >
                    {copiedLink ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    Copy
                  </button>
                  {/* <button
                    onClick={() => window.open(referralLink, '_blank')}
                    className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Total Earnings</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">₹{dashboardData.total_earnings.toFixed(0)}</p>
                  </div>
                  <div className="bg-indigo-500/20 p-2 sm:p-3 rounded-full">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Total Referrals</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{totalReferrals}</p>
                  </div>
                  <div className="bg-purple-500/20 p-2 sm:p-3 rounded-full">
                    <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Primary Referrals</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{primaryEnrolled+"/"+primaryReferrals}</p>
                  </div>
                  <div className="bg-pink-500/20 p-2 sm:p-3 rounded-full">
                    <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Secondary Referrals</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{secondaryEnrolled+"/"+secondaryReferrals}</p>
                  </div>
                  <div className="bg-emerald-500/20 p-2 sm:p-3 rounded-full">
                    <Users className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg shadow-md mb-8 border-none">
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-300">Available Earnings</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        ₹{dashboardData.available_balance.toFixed(2)}
                      </p>
                      <p className="text-sm text-indigo-400 mt-1">
                        {dashboardData.available_balance >= 1000
                          ? 'Ready for withdrawal'
                          : `Need ₹${(1000 - dashboardData.available_balance).toFixed(0)} more to withdraw`}
                      </p>
                    </div>
                    <button
                      onClick={handleOpen}
                      disabled={paymentMethodLoading || dashboardData.available_balance < 1000}
                      className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full sm:w-auto ${
                        dashboardData.available_balance >= 1000
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:scale-105'
                          : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {paymentMethodLoading ? (
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block" />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Withdraw via UPI
                          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-md transition-all duration-300 group-hover:opacity-20" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Earnings Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/20">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                      <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                      <div className="relative">
                        <p className="text-xs font-medium text-gray-400">Daily Earnings</p>
                        <p className="text-lg font-bold text-white">₹{dailyEarnings.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-teal-500/20">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                      <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                      <div className="relative">
                        <p className="text-xs font-medium text-gray-400">Weekly Earnings</p>
                        <p className="text-lg font-bold text-white">₹{weeklyEarnings.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/20">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                      <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                      <div className="relative">
                        <p className="text-xs font-medium text-gray-400">Monthly Earnings</p>
                        <p className="text-lg font-bold text-white">₹{monthlyEarnings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                    <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                    <div className="relative">
               <>
                             <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <h3 className="text-sm font-semibold text-white">Earnings Trend</h3>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Live
                        </span>
                      </div>
                      
                      <div className="mb-4 h-24 w-full overflow-hidden rounded-lg bg-slate-900/50 p-3">
                        <div className="flex h-full w-full items-end justify-between gap-1">
                          <div className="h-[40%] w-3 rounded-sm bg-indigo-500/30 group-hover:animate-pulse">
                            <div className="h-[60%] w-full rounded-sm bg-indigo-500 transition-all duration-300 group-hover:h-[70%]" style={{ height: `${(dailyEarnings / Math.max(dailyEarnings, weeklyEarnings, monthlyEarnings) || 1) * 100}%` }} />
                          </div>
                          <div className="h-[60%] w-3 rounded-sm bg-indigo-500/30 group-hover:animate-pulse">
                            <div className="h-[40%] w-full rounded-sm bg-indigo-500 transition-all duration-300 group-hover:h-[50%]" style={{ height: `${(weeklyEarnings / Math.max(dailyEarnings, weeklyEarnings, monthlyEarnings) || 1) * 100}%` }} />
                          </div>
                          <div className="h-[75%] w-3 rounded-sm bg-indigo-500/30 group-hover:animate-pulse">
                            <div className="h-[80%] w-full rounded-sm bg-indigo-500 transition-all duration-300 group-hover:h-[90%]" style={{ height: `${(monthlyEarnings / Math.max(dailyEarnings, weeklyEarnings, monthlyEarnings) || 1) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div className="text-gray-400">Today Earnings: ₹{dailyEarnings.toFixed(2)}</div>
                        <div className="text-gray-400">Last Weekly Earnings: ₹{weeklyEarnings.toFixed(2)}</div>
                        <div className="text-gray-400">Monthly Earnings: ₹{monthlyEarnings.toFixed(2)}</div>
                      </div>
               </>


                      <div className="mt-4 w-full">
                        <button type= "button" disabled={!userId || historyLoading}  onClick={handleLoadHistory} className="flex  items-center gap-2">
                          <span className="text-xs font-medium text-gray-400">Last 30 days</span>
                        {historyLoading ? 
                          <svg className="h-4 w-4 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none" role="status" aria-hidden="true" >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          :
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>}
                        </button>

                        {/* <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600">
                          View Details
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button> */}

                        {/* History content */}
                       <div className="mt-4 w-full overflow-x-auto scrollbar-hide">
                          {historyLoading && (
                            <div className="text-sm text-gray-500 text-center">Loading history…</div>
                          )}

                          {historyIsError && (
                            <div className="text-sm text-red-600 text-center">
                              Error loading history: {String((historyError as any)?.data ?? (historyError as any)?.error ?? historyError)}
                            </div>
                          )}

                          {!historyLoading && historyData && (
                            <>
                              <div className="text-sm text-gray-400 mb-2 text-center">
                                Showing <strong>{historyData.earnings_count}</strong> events since{" "}
                                <strong>{new Date(historyData.since).toLocaleString()}</strong>
                              </div>

                              {/* BONUS TABLE: show only if there are bonuses */}
                              {historyData.bonuses && historyData.bonuses.length > 0 && (
                                <div className="mb-4 w-full">
                                  <p className="text-sm text-gray-400 mb-2 text-left">Bonus History</p>
                                  <table className="min-w-max border-collapse border w-full border-white text-sm text-gray-200 mb-4">
                                    <thead>
                                      <tr className="border border-gray-500 ">
                                        <th className="border border-gray-500 px-2 py-1 text-left">No.</th>
                                        <th className="border border-gray-500 px-2 py-1 text-left">Milestone</th>
                                        <th className="border border-gray-500  px-2 py-1 text-left">Amount</th>
                                        <th className="border border-gray-500  px-2 py-1 text-left">Status</th>
                                        <th className="border border-gray-500  px-2 py-1 text-left">Time</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {historyData.bonuses.map((b, idx) => {
                                        const milestone = b.milestone_count ?? "-";
                                        const amount = typeof b.bonus_amount === "number" ? `₹${b.bonus_amount.toFixed(2)}` : "-";
                                        const time = b.created_at ?? null;

                                        return (
                                          <tr key={b.bonus_id} className="border border-gray-500 ">
                                            <td className="border border-gray-500  px-2 py-1">{idx + 1}</td>
                                            <td className="border border-gray-500  px-2 py-1">{milestone}</td>
                                            <td className="border border-gray-500  px-2 py-1">{amount}</td>
                                            <td className="border border-gray-500  px-2 py-1">{b.status ?? "-"}</td>
                                            <td className="border border-gray-500  px-2 py-1">
                                              {time ? new Date(time).toLocaleString() : "-"}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                              <p className="text-sm text-gray-400 mb-2 text-left">Earnings History</p>
                              {/* HISTORY / EARNINGS TABLE (unchanged layout, only uses updated count variable) */}
                              <table className="min-w-max w-full border-collapse border border-white text-sm text-gray-200">
                                <thead>
                                  <tr className="border border-gray-500">
                                    <th className="border border-gray-500 px-2 py-1 text-left">No.</th>
                                    <th className="border border-gray-500 px-2 py-1 text-left">User</th>
                                    <th className="border border-gray-500 px-2 py-1 text-left">Level</th>
                                    <th className="border border-gray-500 px-2 py-1 text-left">Course</th>
                                    <th className="border border-gray-500 px-2 py-1 text-left">Price</th>
                                    <th className="border border-gray-500 px-2 py-1 text-left">Earnings</th>
                                    <th className="border border-gray-500 px-2 py-1 text-left">Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {historyData.history.map((h, idx) => {
                                    const user = h.buyer_display_name ?? h.buyer_username ?? h.buyer_email ?? "Unknown user";
                                    const price = h.course_price !== null && typeof h.course_price === "number" ? `₹${h.course_price}` : "-";
                                    const earnings = typeof h.commission_amount === "number" ? `₹${h.commission_amount.toFixed(2)}` : "-";
                                    const time = h.bought_at ?? h.created_at ?? null; // fallback to created_at if bought_at missing

                                    return (
                                      <tr key={h.referral_earning_id} className="border border-gray-500">
                                        <td className="border border-gray-500 px-2 py-1">{idx + 1}</td>
                                        <td className="border border-gray-500 px-2 py-1">{user}</td>
                                        <td className="border border-gray-500 px-2 py-1">{h.referral_level ?? "-"}</td>
                                        <td className="border border-gray-500 px-2 py-1">{h.course_title ?? "-"}</td>
                                        <td className="border border-gray-500 px-2 py-1">{price}</td>
                                        <td className="border border-gray-500 px-2 py-1">{earnings}</td>
                                        <td className="border border-gray-500 px-2 py-1">{time ? new Date(time).toLocaleString() : "unknown"}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-900/50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-300 mb-2">How It Works</h4>
                  <ul className="text-sm text-indigo-200 space-y-1">
                    <li>• Generate referral links and share</li>
                    <li>• Earn 50% commission on direct referrals + 10% on second-level</li>
                    <li>• Get ₹500 bonus for every 5 successful referrals</li>
                    <li>• Minimum withdrawal: ₹1000</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
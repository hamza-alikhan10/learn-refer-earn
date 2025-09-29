import React, { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/ReduxStore/hooks';
import { TrendingUp, Users, DollarSign, ExternalLink, Copy, CheckCircle, ChevronDown, ChevronUp, Info, Award, Zap, Megaphone, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { setIsAuthModelOpen } from '@/ReduxStore/features/slices/auth';
import { useGetDashboardQuery } from '@/ReduxStore/features/api/dashboard';
import { useNavigate } from 'react-router-dom';
import { useGetPaymentMethodsMutation } from '@/ReduxStore/features/api/paymentMethods';
import WithdrawalModal from '@/components/WithdrawalModal';
import { useLazyGetReferralHistoryQuery } from '@/ReduxStore/features/api/history';

const Dashboard = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
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
      toast({
        title: "Error",
        description: "Failed to load payment methods. Please try again.",
        variant: "destructive"
      });
    }
  };

  const { data: dashboardData, isLoading: isLoadingDashboard, isError, error } = useGetDashboardQuery(
    { userId: userId || '' },
    { skip: !userId }
  );

  const handleLoadHistory = () => {
    if (!userId) {
      dispatch(setIsAuthModelOpen(true));
      return;
    }
    if (!historyLoaded) {
      triggerHistory({ userId });
      setHistoryLoaded(true);
    }
    setShowHistory(!showHistory);
  };

  const stats = useMemo(() => {
    if (!dashboardData) return null;

    const totalReferrals = dashboardData.referrals_primary + dashboardData.enrolled_users_secondary || 0;
    const primaryEnrolled = dashboardData.enrolled_users_primary ?? 0;
    const secondaryEnrolled = dashboardData.enrolled_users_secondary ?? 0;
    const conversionRate = dashboardData.referrals_primary > 0 
      ? ((primaryEnrolled / dashboardData.referrals_primary) * 100).toFixed(1) 
      : '0';
    
    const nextBonus = Math.ceil(primaryEnrolled / 5) * 5;
    const bonusProgress = ((primaryEnrolled % 5) / 5) * 100;

    return {
      totalReferrals,
      primaryEnrolled,
      secondaryEnrolled,
      conversionRate,
      nextBonus,
      bonusProgress
    };
  }, [dashboardData]);

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

  if (!dashboardData || !stats) {
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

  const handleShareWhatsApp = () => {
    const message = `Affiliate marketing seekho aur EarnLabs ke saath earn karo! 💰 Direct referrals pe 50% — Earning half-half: half aapka, half hamara, half-half hardwork! ➕ Saath hi, extra 5% income bhi milega—agar aapke refer kiye bande ne kisi aur ko refer kiya aur usne ₹1000 earn kiya, to aapko usme se ₹50 milega. 📈 Future courses pe 60–70% commission bhi milne wala hai jo jaldi launch ho rahe hain. 👉 Content aur strategy hum denge, aapko sirf refer karna hai! Use my referral link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareTelegram = () => {
    const message = `Affiliate marketing seekho aur EarnLabs ke saath earn karo! 💰 Direct referrals pe 50% — Earning half-half: half aapka, half hamara, half-half hardwork! ➕ Saath hi, extra 5% income bhi milega—agar aapke refer kiye bande ne kisi aur ko refer kiya aur usne ₹1000 earn kiya, to aapko usme se ₹50 milega. 📈 Future courses pe 60–70% commission bhi milne wala hai jo jaldi launch ho rahe hain. 👉 Content aur strategy hum denge, aapko sirf refer karna hai! Use my referral link: ${referralLink}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const dailyEarnings = dashboardData.earnings_daily ?? 0;
  const weeklyEarnings = dashboardData.earnings_weekly ?? 0;
  const monthlyEarnings = dashboardData.earnings_monthly ?? 0;

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
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, {user || username || email}!
              </h1>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <p className="text-gray-400">Track your affiliate marketing progress and referral earnings</p>
              
              <button
                onClick={() => navigate('/earnlabs-promo')}
                className="group relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold transition-all duration-300 hover:from-orange-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 sm:w-auto w-full"
              >
                <Megaphone className="w-4 h-4" />
                <span>View Promotions</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {dashboardData.referral_code !== null && <div className="bg-slate-900/50 rounded-xl p-4 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-indigo-500/20 p-1.5 rounded-lg">
                  <ExternalLink className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-sm font-semibold text-indigo-300">Your Referral Link</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-indigo-500/30 rounded-lg bg-slate-950 text-sm text-gray-300 font-mono"
                  />
                  <button
                    onClick={() => handleCopyLink(referralLink)}
                    className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                  >
                    {copiedLink ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400">Share via:</span>
                  <button
                    onClick={handleShareWhatsApp}
                    className="group relative flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#20BA5A] hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleShareTelegram}
                    className="group relative flex items-center gap-2 rounded-lg bg-[#0088cc] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#006699] hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                    Telegram
                  </button>
                </div>
              </div>
            </div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-indigo-500/20 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{dailyEarnings > 0 ? ((dailyEarnings / dashboardData.total_earnings) * 100).toFixed(0) : 0}%
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-white">₹{dashboardData.total_earnings.toFixed(0)}</p>
              </div>
            </div>

            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-xs text-purple-400 font-medium">
                    {stats.conversionRate}% rate
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">Total Referrals</p>
                <p className="text-3xl font-bold text-white">{stats.totalReferrals}</p>
              </div>
            </div>

            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-pink-500/20 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="text-xs text-pink-400">70% comm.</div>
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">Primary Referrals</p>
                <p className="text-3xl font-bold text-white">{stats.primaryEnrolled}/{dashboardData.referrals_primary}</p>
              </div>
            </div>

            <div className="group relative flex flex-col rounded-xl bg-slate-950 p-5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
              <div className="absolute inset-px rounded-[11px] bg-slate-950" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-emerald-500/20 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-xs text-emerald-400">10% comm.</div>
                </div>
                <p className="text-sm font-medium text-gray-400 mb-1">Secondary Referrals</p>
                <p className="text-3xl font-bold text-white">{stats.secondaryEnrolled}/{dashboardData.referrals_secondary}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl shadow-2xl mb-8 border border-slate-800/50">
            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-indigo-500/20">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-indigo-500/30 p-2 rounded-lg">
                          <DollarSign className="w-5 h-5 text-indigo-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-indigo-200">Available for Withdrawal</h3>
                      </div>
                      <p className="text-4xl font-bold text-white mb-2">
                        ₹{dashboardData.available_balance.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        {dashboardData.available_balance >= 1000 ? (
                          <div className="flex items-center gap-2 text-emerald-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Ready for withdrawal
                          </div>
                        ) : (
                          <>
                            <div className="flex-1 bg-slate-900/50 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                                style={{ width: `${(dashboardData.available_balance / 1000) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-indigo-300 whitespace-nowrap">
                              ₹{(1000 - dashboardData.available_balance).toFixed(0)} more
                            </span>
                          </>
                        )}
                      </div>
                      {dashboardData.available_balance < 1000 && (
                        <p className="text-xs text-gray-400 mt-2">
                          Minimum withdrawal amount is ₹1000
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleOpen}
                      disabled={paymentMethodLoading || dashboardData.available_balance < 1000}
                      className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        dashboardData.available_balance >= 1000
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50'
                          : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {paymentMethodLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
                          Loading...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Withdraw via UPI
                          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-indigo-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-medium text-indigo-200">Next Bonus Milestone</span>
                      </div>
                      <span className="text-sm text-indigo-300 font-semibold">₹500 at {stats.nextBonus} referrals</span>
                    </div>
                    <div className="bg-slate-900/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full transition-all duration-500"
                        style={{ width: `${stats.bonusProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {5 - (stats.primaryEnrolled % 5)} more primary referrals to unlock ₹500 bonus
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-400" />
                    Earnings Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                      <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                      <div className="relative">
                        <p className="text-xs font-medium text-gray-400 mb-1">Today</p>
                        <p className="text-2xl font-bold text-white">₹{dailyEarnings.toFixed(2)}</p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>Daily earnings</span>
                        </div>
                      </div>
                    </div>
                    <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                      <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                      <div className="relative">
                        <p className="text-xs font-medium text-gray-400 mb-1">This Week</p>
                        <p className="text-2xl font-bold text-white">₹{weeklyEarnings.toFixed(2)}</p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-teal-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>Last 7 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                      <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                      <div className="relative">
                        <p className="text-xs font-medium text-gray-400 mb-1">This Month</p>
                        <p className="text-2xl font-bold text-white">₹{monthlyEarnings.toFixed(2)}</p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-cyan-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>Last 30 days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative flex flex-col rounded-xl bg-slate-950 p-6 shadow-xl transition-all duration-300 hover:scale-[1.01]">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                    <div className="absolute inset-px rounded-[11px] bg-slate-950" />
                    <div className="relative">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-white">Earnings Trend</h3>
                            <p className="text-xs text-gray-400">Visual performance overview</p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      </div>
                      
                      <div className="mb-6 h-32 w-full overflow-hidden rounded-xl bg-slate-900/50 p-4">
                        <div className="flex h-full w-full items-end justify-between gap-2">
                          {[dailyEarnings, weeklyEarnings, monthlyEarnings].map((value, idx) => {
                            const maxValue = Math.max(dailyEarnings, weeklyEarnings, monthlyEarnings) || 1;
                            const height = (value / maxValue) * 100;
                            const colors = ['from-emerald-500 to-teal-500', 'from-teal-500 to-cyan-500', 'from-cyan-500 to-blue-500'];
                            
                            return (
                              <div key={idx} className="flex-1 h-full flex flex-col justify-end">
                                <div 
                                  className={`w-full bg-gradient-to-t ${colors[idx]} rounded-t-lg transition-all duration-700 hover:opacity-80`}
                                  style={{ height: `${height}%` }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-6">
                        <div className="text-center p-2 rounded-lg bg-emerald-500/10">
                          <div className="text-emerald-400 font-semibold">₹{dailyEarnings.toFixed(2)}</div>
                          <div className="text-gray-400 text-xs">Daily</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-teal-500/10">
                          <div className="text-teal-400 font-semibold">₹{weeklyEarnings.toFixed(2)}</div>
                          <div className="text-gray-400 text-xs">Weekly</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-cyan-500/10">
                          <div className="text-cyan-400 font-semibold">₹{monthlyEarnings.toFixed(2)}</div>
                          <div className="text-gray-400 text-xs">Monthly</div>
                        </div>
                      </div>

                      <div className="w-full border-t border-slate-800 pt-4">
                        <button 
                          type="button" 
                          disabled={!userId || historyLoading}  
                          onClick={handleLoadHistory} 
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-500/20 p-2 rounded-lg">
                              <Info className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div className="text-left">
                              <span className="text-sm font-medium text-gray-300">Transaction History</span>
                              <p className="text-xs text-gray-500">Last 30 days activity</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {historyLoading && (
                              <svg className="h-4 w-4 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                              </svg>
                            )}
                            {showHistory ? (
                              <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                            )}
                          </div>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${showHistory ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                          {historyIsError && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                              <p className="text-sm text-red-400">
                                Error loading history: {String((historyError as any)?.data ?? (historyError as any)?.error ?? historyError)}
                              </p>
                            </div>
                          )}

                          {!historyLoading && historyData && (
                            <div className="space-y-4">
                              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-indigo-300">
                                    <strong>{historyData.earnings_count}</strong> transactions found
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Since {new Date(historyData.since).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>

                              {historyData.bonuses && historyData.bonuses.length > 0 && (
                                <div className="bg-slate-900/50 rounded-lg p-4 border border-yellow-500/20">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-5 h-5 text-yellow-400" />
                                    <h4 className="text-sm font-semibold text-yellow-300">Bonus History</h4>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b border-slate-700">
                                          <th className="text-left py-2 px-3 text-gray-400 font-medium">#</th>
                                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Milestone</th>
                                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Amount</th>
                                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Status</th>
                                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Date</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {historyData.bonuses.map((b, idx) => (
                                          <tr key={b.bonus_id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                            <td className="py-3 px-3 text-gray-300">{idx + 1}</td>
                                            <td className="py-3 px-3 text-gray-300">{b.milestone_count ?? "-"}</td>
                                            <td className="py-3 px-3">
                                              <span className="text-yellow-400 font-semibold">
                                                ₹{typeof b.bonus_amount === "number" ? b.bonus_amount.toFixed(2) : "-"}
                                              </span>
                                            </td>
                                            <td className="py-3 px-3">
                                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                b.status === 'credited' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-gray-400'
                                              }`}>
                                                {b.status ?? "-"}
                                              </span>
                                            </td>
                                            <td className="py-3 px-3 text-gray-400 text-xs">
                                              {b.created_at ? new Date(b.created_at).toLocaleDateString() : "-"}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              <div className="bg-slate-900/50 rounded-lg p-4 border border-indigo-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                  <DollarSign className="w-5 h-5 text-indigo-400" />
                                  <h4 className="text-sm font-semibold text-indigo-300">Earnings History</h4>
                                </div>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-slate-700">
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">#</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">User</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Level</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Course</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Price</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Earnings</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-medium">Date</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {historyData.history.map((h, idx) => {
                                        const user = h.buyer_display_name ?? h.buyer_username ?? h.buyer_email ?? "Unknown user";
                                        const time = h.bought_at ?? h.created_at ?? null;
                                        
                                        return (
                                          <tr key={h.referral_earning_id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                            <td className="py-3 px-3 text-gray-300">{idx + 1}</td>
                                            <td className="py-3 px-3 text-gray-300 max-w-[150px] truncate">{user}</td>
                                            <td className="py-3 px-3">
                                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                h.referral_level === 1 || String(h.referral_level).toLowerCase() === 'primary'
                                                  ? 'bg-pink-500/20 text-pink-400' 
                                                  : 'bg-emerald-500/20 text-emerald-400'
                                              }`}>
                                                {h.referral_level === 1 ? 'primary' : h.referral_level === 2 ? 'secondary' : h.referral_level ?? "-"}
                                              </span>
                                            </td>
                                            <td className="py-3 px-3 text-gray-300 max-w-[200px] truncate">{h.course_title ?? "-"}</td>
                                            <td className="py-3 px-3 text-gray-400">
                                              {h.course_price !== null && typeof h.course_price === "number" ? `₹${h.course_price}` : "-"}
                                            </td>
                                            <td className="py-3 px-3">
                                              <span className="text-emerald-400 font-semibold">
                                                {typeof h.commission_amount === "number" ? `₹${h.commission_amount.toFixed(2)}` : "-"}
                                              </span>
                                            </td>
                                            <td className="py-3 px-3 text-gray-400 text-xs">
                                              {time ? new Date(time).toLocaleDateString() : "unknown"}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-500/20 p-2 rounded-lg">
                      <Info className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h4 className="font-semibold text-indigo-200 text-lg">How It Works</h4>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-indigo-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-indigo-500/20 p-1.5 rounded">
                          <span className="text-indigo-300 text-sm font-bold">1</span>
                        </div>
                        <h5 className="text-indigo-200 font-medium text-sm">Share Link</h5>
                      </div>
                      <p className="text-xs text-gray-400">Generate and share your unique referral link with friends</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-purple-500/20 p-1.5 rounded">
                          <span className="text-purple-300 text-sm font-bold">2</span>
                        </div>
                        <h5 className="text-purple-200 font-medium text-sm">Earn Commission</h5>
                      </div>
                      <p className="text-xs text-gray-400">Get up to 70% on direct + 10% on secondary referrals</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-pink-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-pink-500/20 p-1.5 rounded">
                          <span className="text-pink-300 text-sm font-bold">3</span>
                        </div>
                        <h5 className="text-pink-200 font-medium text-sm">Get Bonuses</h5>
                      </div>
                      <p className="text-xs text-gray-400">Unlock ₹500 bonus for every 5 successful referrals</p>
                    </div>
                  </div>
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
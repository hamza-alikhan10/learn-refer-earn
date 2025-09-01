import React from 'react';
import { CheckCircle, Award, Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap, Users, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ReferralProgram = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-success/20 to-primary/20 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 flex items-center justify-center animate-float">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-success icon-3d" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-poppins">Referral Program Details</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-noto-sans">
              Earn multi-level commissions and bonus rewards by sharing quality affiliate marketing education
            </p>
          </div>

          <div className="bg-gradient-to-br from-success/10 to-primary/10 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-success/20 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-card-foreground mb-4 font-poppins">Earn up to 60% Commission on Every Sale!</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-noto-sans">
              Industry-leading multi-level referral rewards for affiliate marketing education + milestone bonuses
            </p>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-card-foreground font-poppins border-b border-border">Course Price</th>
                      <th className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-card-foreground font-poppins border-b border-border">
                        <span className="inline-flex items-center bg-blue-100 text-blue-900 px-2 py-1 rounded-full">
                          <Users className="w-4 h-4 mr-1" /> Primary - Direct
                        </span>
                      </th>
                      <th className="p-3 sm:p-4 text-sm sm:text-base font-semibold text-card-foreground font-poppins border-b border-border">
                        <span className="inline-flex items-center bg-green-100 text-green-900 px-2 py-1 rounded-full">
                          <Users className="w-4 h-4 mr-1" /> Secondary - Indirect
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-muted/30 transition-all duration-200">
                      <td className="p-3 sm:p-4 text-sm sm:text-base text-muted-foreground font-noto-sans border-b border-border">₹1000</td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-bold text-blue-600 font-noto-sans border-b border-border">40%</td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-bold text-green-600 font-noto-sans border-b border-border">5%</td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-all duration-200">
                      <td className="p-3 sm:p-4 text-sm sm:text-base text-muted-foreground font-noto-sans border-b border-border">₹3000</td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-bold text-blue-600 font-noto-sans border-b border-border">50%</td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-bold text-green-600 font-noto-sans border-b border-border">8%</td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-all duration-200">
                      <td className="p-3 sm:p-4 text-sm sm:text-base text-muted-foreground font-noto-sans border-b border-border">₹5000</td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-bold text-blue-600 font-noto-sans border-b border-border">60%</td>
                      <td className="p-3 sm:p-4 text-sm sm:text-base font-bold text-green-600 font-noto-sans border-b border-border">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-center text-sm sm:text-base text-muted-foreground mt-6 font-noto-sans">
                Refer and earn big! Get rewarded for both direct and indirect referrals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mb-6 flex items-center font-poppins">
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-primary icon-3d" />
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base font-noto-sans">Generate Referral Links</p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-noto-sans">Create unique links for any affiliate marketing course instantly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-success/10 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base font-noto-sans">Share with Your Network</p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-noto-sans">Use email, WhatsApp, social media, or any channel you prefer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base font-noto-sans">Earn Multi-Level Commissions</p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-noto-sans">Receive 40%–60% direct + 5%–10% second-level commissions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-warning/10 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warning icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base font-noto-sans">Track Your Progress</p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-noto-sans">Monitor clicks, conversions, and earnings in real-time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mb-6 flex items-center font-poppins">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-success icon-3d" />
                Program Benefits
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center text-sm sm:text-base font-noto-sans">
                    <TrendingUp className="w-4 h-4 mr-2 icon-3d" />
                    Multi-Level Commission
                  </h3>
                  <p className="text-blue-800 text-xs sm:text-sm leading-relaxed font-noto-sans">
                    Earn 40%–60% on direct referrals + 5%–10% on second-level referrals - the highest structure in trading education.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center text-sm sm:text-base font-noto-sans">
                    <Coins className="w-4 h-4 mr-2 icon-3d" />
                    ₹1000 Withdrawal Minimum
                  </h3>
                  <p className="text-green-800 text-xs sm:text-sm leading-relaxed font-noto-sans">
                    Start earning from your first affiliate marketing referral with a reasonable ₹1000 withdrawal threshold.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center text-sm sm:text-base font-noto-sans">
                    <Clock className="w-4 h-4 mr-2 icon-3d" />
                    Real-Time Tracking
                  </h3>
                  <p className="text-purple-800 text-xs sm:text-sm leading-relaxed font-noto-sans">
                    Monitor your referral performance with detailed analytics and instant notifications.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center text-sm sm:text-base font-noto-sans">
                    <Gift className="w-4 h-4 mr-2 icon-3d" />
                    Milestone Bonuses
                  </h3>
                  <p className="text-orange-800 text-xs sm:text-sm leading-relaxed font-noto-sans">
                    Earn ₹500 bonus for every 5 successful referrals - rewards that keep growing!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-border">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-card-foreground mb-8 text-center flex items-center justify-center font-poppins">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-primary icon-3d" />
              Terms and Conditions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
                <h3 className="font-bold text-card-foreground mb-4 flex items-center text-sm sm:text-base font-poppins">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-success icon-3d" />
                  Commission Structure
                </h3>
                <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm font-noto-sans">
                  <li className="flex items-start space-x-2">
                    <span className="text-success mt-1">•</span>
                    <span>40%–60% commission on direct referrals + 5%–10% on second-level</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-success mt-1">•</span>
                    <span>₹500 bonus for every 5 successful referrals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-success mt-1">•</span>
                    <span>Commissions credited after purchase completion</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-success mt-1">•</span>
                    <span>30-day cookie tracking period for referral attribution</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-success mt-1">•</span>
                    <span>No cap on total earnings potential</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
                <h3 className="font-bold text-card-foreground mb-4 flex items-center text-sm sm:text-base font-poppins">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-warning icon-3d" />
                  Program Rules
                </h3>
                <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm font-noto-sans">
                  <li className="flex items-start space-x-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Self-referrals are not permitted</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Minimum withdrawal amount: ₹1000</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Payments processed within 5 business days</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-warning mt-1">•</span>
                    <span>Must comply with affiliate marketing promotional guidelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 lg:p-12 text-primary-foreground text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 font-poppins">Start Earning Today</h2>
            <p className="mb-6 sm:mb-8 text-primary-foreground/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-noto-sans">
              Join our affiliate marketing referral program and turn your network into a source of income!
            </p>
            <Button
              onClick={() => navigate('/course-page')}
              variant="secondary"
              size="lg"
              className="shadow-lg"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 icon-3d" />
              Browse Affiliate Marketing Courses to Refer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;
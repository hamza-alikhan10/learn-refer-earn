import { CheckCircle, Award,Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReferralProgram = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-success/20 to-primary/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float">
              <Gift className="w-12 h-12 text-success icon-3d" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Referral Program Details</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Earn multi-level commissions and bonus rewards by sharing quality affiliate marketing education
            </p>
          </div>

          <div className="bg-gradient-to-br from-success to-primary text-primary-foreground rounded-2xl p-8 sm:p-12 mb-16 text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">50% + 10% Commission Structure</h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Industry-leading multi-level referral rewards for affiliate marketing education + milestone bonuses
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-6 rounded-xl">
                <p className="text-sm font-medium text-primary-foreground/80 mb-2">Entry Level</p>
                <p className="text-lg font-semibold text-primary-foreground">₹999 Course</p>
                <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹499</p>
                <p className="text-sm text-primary-foreground/80">Direct + ₹99 from sub-referrals</p>
              </div>
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-6 rounded-xl">
                <p className="text-sm font-medium text-primary-foreground/80 mb-2">Advanced</p>
                <p className="text-lg font-semibold text-primary-foreground">₹4000 Course</p>
                <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹2000</p>
                <p className="text-sm text-primary-foreground/80">Direct + ₹400 from sub-referrals</p>
              </div>
              <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-6 rounded-xl">
                <p className="text-sm font-medium text-primary-foreground/80 mb-2">Professional</p>
                <p className="text-lg font-semibold text-primary-foreground">₹5000 Course</p>
                <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹2500</p>
                <p className="text-sm text-primary-foreground/80">Direct + ₹500 from sub-referrals</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-6 flex items-center">
                <Share2 className="w-6 h-6 mr-3 text-primary icon-3d" />
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-primary icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">Generate Referral Links</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Create unique links for any affiliate marketing course instantly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-success/10 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-success icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">Share with Your Network</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Use email, WhatsApp, social media, or any channel you prefer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-accent icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">Earn Multi-Level Commissions</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Receive 50% direct + 10% second-level commissions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-warning/10 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-warning icon-3d" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">Track Your Progress</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">Monitor clicks, conversions, and earnings in real-time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-success icon-3d" />
                Program Benefits
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 icon-3d" />
                    Multi-Level Commission
                  </h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Earn 50% on direct referrals + 10% on second-level referrals - the highest structure in trading education.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Coins className="w-4 h-4 mr-2 icon-3d" />
                    ₹1000 Withdrawal Minimum
                  </h3>
                  <p className="text-green-800 text-sm leading-relaxed">
                    Start earning from your first affiliate marketing referral with a reasonable ₹1000 withdrawal threshold.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 icon-3d" />
                    Real-Time Tracking
                  </h3>
                  <p className="text-purple-800 text-sm leading-relaxed">
                    Monitor your referral performance with detailed analytics and instant notifications.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
                    <Gift className="w-4 h-4 mr-2 icon-3d" />
                    Milestone Bonuses
                  </h3>
                  <p className="text-orange-800 text-sm leading-relaxed">
                    Earn ₹500 bonus for every 5 successful referrals - rewards that keep growing!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-8 sm:p-12 mb-16 border border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-8 text-center flex items-center justify-center">
              <Shield className="w-8 h-8 mr-3 text-primary icon-3d" />
              Terms and Conditions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-bold text-card-foreground mb-4 flex items-center">
                  <Coins className="w-5 h-5 mr-2 text-success icon-3d" />
                  Commission Structure
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-success mt-1">•</span>
                    <span>50% commission on direct referrals + 10% on second-level</span>
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
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h3 className="font-bold text-card-foreground mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-warning icon-3d" />
                  Program Rules
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
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

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Start Earning Today</h2>
            <p className="mb-6 text-blue-100">
              Join our affiliate marketing referral program and turn your network into a source of income!
            </p>
            <button
              onClick={() => navigate('/course-page')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Affiliate Marketing Courses to Refer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralProgram
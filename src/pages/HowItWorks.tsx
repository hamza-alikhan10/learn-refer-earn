import React from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight, Mail, MessageCircle, BookOpen, Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 flex items-center justify-center animate-float">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary icon-3d" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-poppins">How Trading Academy Works</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-noto-sans">
              Your step-by-step guide to learning affiliate marketing and earning through our referral system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Step 1 */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Step 1</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mt-2 font-poppins">Sign Up</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 font-noto-sans">
                Create your free Affiliate Marketing Academy account in seconds. Join thousands of marketers learning and earning together.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground font-noto-sans">
                  <strong className="text-card-foreground">Pro tip:</strong> Complete your profile to get personalized affiliate marketing course recommendations.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-success to-success/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-success-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-success bg-success/10 px-3 py-1 rounded-full">Step 2</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mt-2 font-poppins">Browse Affiliate Marketing Courses</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 font-noto-sans">
                Explore our comprehensive library of affiliate marketing courses with different price points for every learning level.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center border border-blue-200">
                  <p className="text-xs sm:text-sm font-semibold text-blue-900">₹1000</p>
                  <p className="text-xs text-blue-700">Entry Level</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg text-center border border-green-200">
                  <p className="text-xs sm:text-sm font-semibold text-green-900">₹3000</p>
                  <p className="text-xs text-green-700">Advanced</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg text-center border border-purple-200">
                <p className="text-xs sm:text-sm font-semibold text-purple-900">₹5000</p>
                <p className="text-xs text-purple-700">Professional</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-accent to-accent/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Share2 className="w-6 h-6 sm:w-8 sm:h-8 text-accent-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">Step 3</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mt-2 font-poppins">Generate Referral Link</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 font-noto-sans">
                Click the "Refer & Earn" button on any course to generate your unique referral link instantly.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 font-noto-sans"><strong className="text-card-foreground">Example link:</strong></p>
                <code className="text-xs bg-card p-2 rounded border border-border text-primary">
                  Earnlabs.in/course/123?ref=your-id
                </code>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-warning to-warning/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-warning-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-warning bg-warning/10 px-3 py-1 rounded-full">Step 4</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mt-2 font-poppins">Share with Network</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4 font-noto-sans">
                Share your referral link with friends, family, trading communities, or social media followers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 icon-3d" />
                  <span className="text-xs sm:text-sm font-medium text-blue-900">Email</span>
                </div>
                <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 icon-3d" />
                  <span className="text-xs sm:text-sm font-medium text-green-900">WhatsApp</span>
                </div>
                <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 icon-3d" />
                  <span className="text-xs sm:text-sm font-medium text-purple-900">Social Media</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 - Earn Commissions */}
          <div className="bg-gradient-to-br from-success/10 to-primary/10 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-success/20">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-success to-success/80 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-gentle">
                <Coins className="w-8 h-8 sm:w-10 sm:h-10 text-success-foreground icon-3d" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-success bg-success/10 px-4 py-2 rounded-full">Step 5</span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-card-foreground mt-4 mb-4 font-poppins">Earn up to 60% Commission on Every Sale!</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-noto-sans">
                When someone purchases through your link, you earn commissions. Plus, earn from their referrals too!
              </p>
            </div>

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

            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-md mb-8">
              <h4 className="font-bold text-card-foreground mb-4 text-center text-lg sm:text-xl font-poppins">Commission Examples</h4>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm sm:text-base text-muted-foreground font-noto-sans">₹1000 course</span>
                  <span className="text-sm sm:text-base font-bold text-green-600 font-noto-sans">₹400 direct + ₹50 from sub-referrals</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm sm:text-base text-muted-foreground font-noto-sans">₹3000 course</span>
                  <span className="text-sm sm:text-base font-bold text-green-600 font-noto-sans">₹1500 direct + ₹240 from sub-referrals</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm sm:text-base text-muted-foreground font-noto-sans">₹5000 course</span>
                  <span className="text-sm sm:text-base font-bold text-green-600 font-noto-sans">₹3000 direct + ₹500 from sub-referrals</span>
                </div>
              </div>
            </div>

            {/* Program Benefits */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-border mb-8">
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

            {/* Terms and Conditions */}
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
                      <span>Must comply with affiliate marketing promotional guidelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 lg:p-12 text-primary-foreground text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 font-poppins">Ready to Start Earning?</h2>
            <p className="mb-6 sm:mb-8 text-primary-foreground/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-noto-sans">
              Join Affiliate Marketing Academy today and start your journey of learning affiliate marketing and earning through referrals!
            </p>
            <Button
              onClick={() => navigate('/course-page')}
              variant="secondary"
              size="lg"
              className="shadow-lg"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 icon-3d" />
              Explore Affiliate Marketing Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
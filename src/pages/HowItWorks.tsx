import React from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight, Mail, MessageCircle, Phone, Globe, BookOpen, Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float">
              <Target className="w-12 h-12 text-primary icon-3d" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">How Trading Academy Works</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your step-by-step guide to learning affiliate marketing and earning through our referral system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Step 1 */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Users className="w-8 h-8 text-primary-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Step 1</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mt-2">Sign Up</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Create your free Affiliate Marketing Academy account in seconds. Join thousands of marketers learning and earning together.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-card-foreground">Pro tip:</strong> Complete your profile to get personalized affiliate marketing course recommendations.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-success to-success/80 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="w-8 h-8 text-success-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-success bg-success/10 px-3 py-1 rounded-full">Step 2</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mt-2">Browse Affiliate Marketing Courses</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Explore our comprehensive library of affiliate marketing courses with different price points for every learning level.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900">₹999 - ₹1999</p>
                  <p className="text-xs text-blue-700">Entry Level</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg text-center border border-green-200">
                  <p className="text-sm font-semibold text-green-900">₹3500 - ₹5000</p>
                  <p className="text-xs text-green-700">Advanced</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg text-center border border-purple-200">
                <p className="text-sm font-semibold text-purple-900">₹10,000</p>
                <p className="text-xs text-purple-700">Professional</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-accent to-accent/80 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Share2 className="w-8 h-8 text-accent-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">Step 3</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mt-2">Generate Referral Link</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Click the "Refer & Earn" button on any course to generate your unique referral link instantly.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2"><strong className="text-card-foreground">Example link:</strong></p>
                <code className="text-xs bg-card p-2 rounded border border-border text-primary">
                  tradingacademy.com/course/123?ref=your-id
                </code>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-warning to-warning/80 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <MessageCircle className="w-8 h-8 text-warning-foreground icon-3d" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-warning bg-warning/10 px-3 py-1 rounded-full">Step 4</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mt-2">Share with Network</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Share your referral link with friends, family, trading communities, or social media followers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <Mail className="w-5 h-5 text-blue-600 icon-3d" />
                  <span className="text-sm font-medium text-blue-900">Email</span>
                </div>
                <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                  <MessageCircle className="w-5 h-5 text-green-600 icon-3d" />
                  <span className="text-sm font-medium text-green-900">WhatsApp</span>
                </div>
                <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <Users className="w-5 h-5 text-purple-600 icon-3d" />
                  <span className="text-sm font-medium text-purple-900">Social Media</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 - Earn Commissions */}
          <div className="bg-gradient-to-br from-success/10 to-primary/10 rounded-3xl p-8 sm:p-12 mb-16 border border-success/20">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-success to-success/80 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-gentle">
                <Coins className="w-10 h-10 text-success-foreground icon-3d" />
              </div>
              <span className="text-sm font-semibold text-success bg-success/10 px-4 py-2 rounded-full">Step 5</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mt-4 mb-4">Earn Multi-Level Commissions</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                When someone purchases through your link, you earn commissions. Plus, earn from their referrals too!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card p-6 rounded-xl border border-border shadow-md">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600 icon-3d" />
                  </div>
                  <h4 className="font-bold text-card-foreground mb-2">Direct Referrals</h4>
                  <p className="text-2xl font-bold text-green-600 mb-2">50%</p>
                  <p className="text-sm text-muted-foreground">Commission on every sale</p>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border shadow-md">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600 icon-3d" />
                  </div>
                  <h4 className="font-bold text-card-foreground mb-2">Second Level</h4>
                  <p className="text-2xl font-bold text-blue-600 mb-2">10%</p>
                  <p className="text-sm text-muted-foreground">From sub-referrals</p>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border shadow-md">
                <div className="text-center">
                  <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-6 h-6 text-yellow-600 icon-3d" />
                  </div>
                  <h4 className="font-bold text-card-foreground mb-2">Bonus Rewards</h4>
                  <p className="text-2xl font-bold text-yellow-600 mb-2">₹500</p>
                  <p className="text-sm text-muted-foreground">Every 5 referrals</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-md">
              <h4 className="font-bold text-card-foreground mb-4 text-center">Commission Examples</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">₹999 course</span>
                  <span className="font-bold text-green-600">₹499 direct + ₹99 from sub-referrals</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">₹5000 course</span>
                  <span className="font-bold text-green-600">₹2500 direct + ₹500 from sub-referrals</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">₹10000 course</span>
                  <span className="font-bold text-green-600">₹5000 direct + ₹1000 from sub-referrals</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 sm:p-12 text-primary-foreground text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="mb-8 text-primary-foreground/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Join Affiliate Marketing Academy today and start your journey of learning affiliate marketing and earning through referrals!
            </p>
            <Button
              onClick={() => navigate('/course-page')}
              variant="secondary"
              size="lg"
              className="shadow-lg"
            >
              <BookOpen className="w-5 h-5 mr-2 icon-3d" />
              Explore Affiliate Marketing Courses
            </Button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default HowItWorks
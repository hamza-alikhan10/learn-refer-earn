
import React from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight, Mail, MessageCircle, Phone, Globe, BookOpen, Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

interface StaticPagesProps {
  page: string;
  onPageChange: (page: string) => void;
}

const StaticPages: React.FC<StaticPagesProps> = ({ page, onPageChange }) => {
  const renderAboutUs = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float">
          <Globe className="w-12 h-12 text-primary icon-3d" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">About LearnHub</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Empowering learners worldwide through quality education and rewarding partnerships
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Target className="w-6 h-6 text-primary icon-3d" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            At LearnHub, we believe that quality education should be accessible to everyone, everywhere. 
            Our mission is to democratize learning by connecting students with expert instructors and 
            creating opportunities for knowledge sharing that benefits entire communities.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            We've built a platform where learning doesn't just transform individuals—it creates a 
            ripple effect of growth and opportunity through our innovative referral system.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-accent/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-accent icon-3d" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Our Vision</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            To create a global learning ecosystem where knowledge flows freely, instructors are 
            rewarded for their expertise, and learners become ambassadors for education by sharing 
            valuable courses with their networks.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            Through our referral program, we're not just building a platform—we're building a 
            community where everyone benefits from the success of learning.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-2xl p-8 sm:p-12 mb-16 border border-border">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center">Why Choose LearnHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-primary to-primary/80 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
              <BookOpen className="w-10 h-10 text-primary-foreground icon-3d" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Expert-Led Courses</h3>
            <p className="text-muted-foreground leading-relaxed">
              Learn from industry professionals with real-world experience and proven track records.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-success to-success/80 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Users className="w-10 h-10 text-success-foreground icon-3d" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Community Driven</h3>
            <p className="text-muted-foreground leading-relaxed">
              Join a community of learners and earn rewards by sharing valuable educational content.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-accent to-accent/80 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Gift className="w-10 h-10 text-accent-foreground icon-3d" />
            </div>
            <h3 className="font-bold text-foreground mb-3 text-lg">Generous Rewards</h3>
            <p className="text-muted-foreground leading-relaxed">
              Earn 50% commission on direct referrals + 10% on second-level + ₹500 bonus every 5 referrals.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-8 sm:p-12 text-primary-foreground">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-primary-foreground/90 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Join thousands of students who are already transforming their careers and earning through referrals.
        </p>
        <Button
          onClick={() => onPageChange('courses')}
          variant="secondary"
          size="lg"
          className="shadow-lg"
        >
          <BookOpen className="w-5 h-5 mr-2 icon-3d" />
          Explore Courses
        </Button>
      </div>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float">
          <Target className="w-12 h-12 text-primary icon-3d" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">How Trading Academy Works</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your step-by-step guide to learning trading and earning through our referral system
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
            Create your free Trading Academy account in seconds. Join thousands of traders learning and earning together.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-card-foreground">Pro tip:</strong> Complete your profile to get personalized trading course recommendations.
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
              <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mt-2">Browse Trading Courses</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Explore our comprehensive library of trading courses with different price points for every learning level.
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
          Join Trading Academy today and start your journey of learning trading and earning through referrals!
        </p>
        <Button
          onClick={() => onPageChange('courses')}
          variant="secondary"
          size="lg"
          className="shadow-lg"
        >
          <BookOpen className="w-5 h-5 mr-2 icon-3d" />
          Explore Trading Courses
        </Button>
      </div>
    </div>
  );

  const renderReferralProgram = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="bg-gradient-to-br from-success/20 to-primary/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float">
          <Gift className="w-12 h-12 text-success icon-3d" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Referral Program Details</h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Earn multi-level commissions and bonus rewards by sharing quality trading education
        </p>
      </div>

      <div className="bg-gradient-to-br from-success to-primary text-primary-foreground rounded-2xl p-8 sm:p-12 mb-16 text-center shadow-xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">50% + 10% Commission Structure</h2>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Industry-leading multi-level referral rewards + milestone bonuses
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
            <p className="text-lg font-semibold text-primary-foreground">₹5000 Course</p>
            <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹2500</p>
            <p className="text-sm text-primary-foreground/80">Direct + ₹500 from sub-referrals</p>
          </div>
          <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-6 rounded-xl">
            <p className="text-sm font-medium text-primary-foreground/80 mb-2">Professional</p>
            <p className="text-lg font-semibold text-primary-foreground">₹10000 Course</p>
            <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹5000</p>
            <p className="text-sm text-primary-foreground/80">Direct + ₹1000 from sub-referrals</p>
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
                <p className="text-muted-foreground text-sm leading-relaxed">Create unique links for any trading course instantly</p>
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
                Start earning from your first referral with a reasonable ₹1000 withdrawal threshold.
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
                <span>30-day tracking period for referral attribution</span>
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
                <span>Must comply with promotional guidelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Start Earning Today</h2>
        <p className="mb-6 text-blue-100">
          Join our referral program and turn your network into a source of income!
        </p>
        <button
          onClick={() => onPageChange('courses')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Browse Courses to Refer
        </button>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          We're here to help! Get in touch with our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-2">support@learnhub.com</p>
          <p className="text-sm text-gray-500">Response within 24 hours</p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
          <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM PST</p>
        </div>

        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-2">Available 24/7</p>
          <p className="text-sm text-gray-500">Instant support online</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Billing Question</option>
              <option>Referral Program</option>
              <option>Course Content</option>
              <option>Partnership Opportunity</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us how we can help you..."
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => alert('Thank you for your message! We will get back to you within 24 hours.')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Send Message
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I track my referral earnings?</h3>
            <p className="text-gray-600 text-sm">
              You can track all your referral activities, earnings, and withdrawal history in your personal dashboard. 
              Simply log in and navigate to the "Referrals" or "Earnings" section.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">When will I receive my commission payments?</h3>
            <p className="text-gray-600 text-sm">
              Commissions are credited to your account after the referred student completes their course purchase. 
              You can withdraw your earnings once you reach the $50 minimum threshold, and payments are processed within 5 business days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I refer courses to myself or family members?</h3>
            <p className="text-gray-600 text-sm">
              Self-referrals are not permitted under our program terms. However, you can refer courses to family members 
              as long as they are making genuine purchases and you're not circumventing the system.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What happens if a student refunds a course I referred?</h3>
            <p className="text-gray-600 text-sm">
              If a referred student requests a refund within our refund policy period, the associated commission 
              will be deducted from your account. We maintain fair practices for both students and referrers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const getPageContent = () => {
    switch (page) {
      case 'about':
        return renderAboutUs();
      case 'how-it-works':
        return renderHowItWorks();
      case 'referral-program':
        return renderReferralProgram();
      case 'contact':
        return renderContact();
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {getPageContent()}
      </div>
    </div>
  );
};

export default StaticPages;

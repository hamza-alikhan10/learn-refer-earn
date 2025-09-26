import React, { useState } from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight, Mail, MessageCircle, Phone, Globe, BookOpen, Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';

interface StaticPagesProps {
  page: string;
  onPageChange: (page: string) => void;
}

const StaticPages: React.FC<StaticPagesProps> = ({ page, onPageChange }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const renderAboutUs = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-6 sm:p-8 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About LearnHub</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
          Empowering affiliate marketers worldwide through quality education and rewarding partnerships
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
        <div className="group bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-primary/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Our Mission</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
              At LearnHub, we believe that affiliate marketing education should be accessible to everyone, everywhere. 
              Our mission is to democratize affiliate marketing knowledge by connecting students with expert marketers and 
              creating opportunities for knowledge sharing that benefits entire communities.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
              We've built a platform where learning doesn't just transform individuals—it creates a 
              ripple effect of growth and opportunity through our innovative referral system.
            </p>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-card to-card/80 rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-accent/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Our Vision</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
              To create a global learning ecosystem where knowledge flows freely, instructors are 
              rewarded for their expertise, and learners become ambassadors for education by sharing 
              valuable courses with their networks.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
              Through our referral program, we're not just building a platform—we're building a 
              community where everyone benefits from the success of learning.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-border shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center">Why Choose LearnHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="text-center group">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-primary to-primary/80 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Expert-Led Courses</h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Learn from successful affiliate marketers with real-world experience and proven track records.
            </p>
          </div>

          <div className="text-center group">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-success/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-success to-success/80 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-success-foreground" />
              </div>
            </div>
            <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Community Driven</h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Join a community of learners and earn rewards by sharing valuable educational content.
            </p>
          </div>

          <div className="text-center group">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-accent to-accent/80 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground" />
              </div>
            </div>
            <h3 className="font-bold text-foreground mb-3 text-base sm:text-lg">Generous Rewards</h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Earn 70% commission on direct referrals + 10% on second-level + ₹500 bonus every 5 referrals.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden text-center bg-gradient-to-r from-primary via-accent to-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-primary-foreground shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEwNC0uODk2LTItMi0yaDFjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAycy44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Learning?</h2>
          <p className="text-primary-foreground/90 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Join thousands of students who are already transforming their careers and earning through referrals.
          </p>
          <Button
            onClick={() => onPageChange('courses')}
            variant="secondary"
            size="lg"
            className="shadow-xl hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );

  const renderHowItWorks = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-6 sm:p-8 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">How Trading Academy Works</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
          Your step-by-step guide to learning affiliate marketing and earning through our referral system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {/* Step 1 */}
        <div className="group bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary to-primary/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">Step 1</span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground">Sign Up</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
            Create your free Affiliate Marketing Academy account in seconds. Join thousands of marketers learning and earning together.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-card-foreground">Pro tip:</strong> Complete your profile to get personalized affiliate marketing course recommendations.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="group bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-success to-success/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-success-foreground" />
            </div>
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-success bg-success/10 px-3 py-1 rounded-full mb-2">Step 2</span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground">Browse Courses</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
            Explore our comprehensive library of affiliate marketing courses with different price points for every learning level.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-3 rounded-lg text-center border border-blue-200 dark:border-blue-800">
              <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100">₹999 - ₹1999</p>
              <p className="text-xs text-blue-700 dark:text-blue-300">Entry Level</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-3 rounded-lg text-center border border-green-200 dark:border-green-800">
              <p className="text-xs sm:text-sm font-semibold text-green-900 dark:text-green-100">₹3500 - ₹5000</p>
              <p className="text-xs text-green-700 dark:text-green-300">Advanced</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-3 rounded-lg text-center border border-purple-200 dark:border-purple-800">
            <p className="text-xs sm:text-sm font-semibold text-purple-900 dark:text-purple-100">₹10,000</p>
            <p className="text-xs text-purple-700 dark:text-purple-300">Professional</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="group bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-accent to-accent/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Share2 className="w-7 h-7 sm:w-8 sm:h-8 text-accent-foreground" />
            </div>
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-2">Step 3</span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground">Generate Link</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
            Click the "Refer & Earn" button on any course to generate your unique referral link instantly.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2"><strong className="text-card-foreground">Example link:</strong></p>
            <code className="text-xs bg-card p-2 rounded border border-border text-primary break-all">
              tradingacademy.com/course/123?ref=your-id
            </code>
          </div>
        </div>

        {/* Step 4 */}
        <div className="group bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-warning to-warning/80 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-warning-foreground" />
            </div>
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-warning bg-warning/10 px-3 py-1 rounded-full mb-2">Step 4</span>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground">Share Network</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
            Share your referral link with friends, family, trading communities, or social media followers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-100">Email</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-green-50 dark:bg-green-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-green-900 dark:text-green-100">WhatsApp</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-purple-50 dark:bg-purple-950 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-purple-900 dark:text-purple-100">Social</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5 - Earn Commissions */}
      <div className="bg-gradient-to-br from-success/10 to-primary/10 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-success/20 shadow-xl">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-success/30 rounded-2xl blur-lg animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-success to-success/80 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg">
              <Coins className="w-8 h-8 sm:w-10 sm:h-10 text-success-foreground" />
            </div>
          </div>
          <span className="inline-block text-xs sm:text-sm font-semibold text-success bg-success/10 px-4 py-2 rounded-full mb-4">Step 5</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-3 sm:mb-4">Earn Multi-Level Commissions</h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-sm sm:text-base px-4">
            When someone purchases through your link, you earn commissions. Plus, earn from their referrals too!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-card p-4 sm:p-6 rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-bold text-card-foreground mb-2 text-sm sm:text-base">Direct Referrals</h4>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mb-2">70%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Commission on every sale</p>
            </div>
          </div>
          
          <div className="bg-card p-4 sm:p-6 rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-bold text-card-foreground mb-2 text-sm sm:text-base">Second Level</h4>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">10%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">From sub-referrals</p>
            </div>
          </div>
          
          <div className="bg-card p-4 sm:p-6 rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h4 className="font-bold text-card-foreground mb-2 text-sm sm:text-base">Bonus Rewards</h4>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600 mb-2">₹500</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Every 5 referrals</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-md">
          <h4 className="font-bold text-card-foreground mb-4 text-center text-sm sm:text-base">Commission Examples</h4>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground text-xs sm:text-sm">₹999 course</span>
              <span className="font-bold text-green-600 text-xs sm:text-sm">₹699 direct + ₹99 from sub-referrals</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground text-xs sm:text-sm">₹5000 course</span>
              <span className="font-bold text-green-600 text-xs sm:text-sm">₹3500 direct + ₹500 from sub-referrals</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground text-xs sm:text-sm">₹10000 course</span>
              <span className="font-bold text-green-600 text-xs sm:text-sm">₹7000 direct + ₹1000 from sub-referrals</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-primary-foreground text-center shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEwNC0uODk2LTItMi0yaDFjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAycy44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Earning?</h2>
          <p className="mb-6 sm:mb-8 text-primary-foreground/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Join Affiliate Marketing Academy today and start your journey of learning affiliate marketing and earning through referrals!
          </p>
          <Button
            onClick={() => onPageChange('courses')}
            variant="secondary"
            size="lg"
            className="shadow-xl hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Explore Affiliate Marketing Courses
          </Button>
        </div>
      </div>
    </div>
  );

  const renderReferralProgram = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-success/30 to-primary/30 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-success/20 to-primary/20 p-6 sm:p-8 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-success" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">Referral Program Details</h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
          Earn multi-level commissions and bonus rewards by sharing quality affiliate marketing education
        </p>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-success to-primary text-primary-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEwNC0uODk2LTItMi0yaDFjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAycy44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">70% + 10% Commission Structure</h2>
          <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Industry-leading multi-level referral rewards for affiliate marketing education + milestone bonuses
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-4 sm:p-6 rounded-xl hover:bg-card/20 transition-all duration-300">
              <p className="text-xs sm:text-sm font-medium text-primary-foreground/80 mb-2">Entry Level</p>
              <p className="text-base sm:text-lg font-semibold text-primary-foreground">₹999 Course</p>
              <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹699</p>
              <p className="text-xs sm:text-sm text-primary-foreground/80">Direct + ₹99 from sub-referrals</p>
            </div>
            <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-4 sm:p-6 rounded-xl hover:bg-card/20 transition-all duration-300">
              <p className="text-xs sm:text-sm font-medium text-primary-foreground/80 mb-2">Advanced</p>
              <p className="text-base sm:text-lg font-semibold text-primary-foreground">₹4000 Course</p>
              <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹2800</p>
              <p className="text-xs sm:text-sm text-primary-foreground/80">Direct + ₹400 from sub-referrals</p>
            </div>
            <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-4 sm:p-6 rounded-xl hover:bg-card/20 transition-all duration-300">
              <p className="text-xs sm:text-sm font-medium text-primary-foreground/80 mb-2">Professional</p>
              <p className="text-base sm:text-lg font-semibold text-primary-foreground">₹5000 Course</p>
              <p className="text-2xl sm:text-3xl font-bold text-warning mt-2 mb-1">₹3500</p>
              <p className="text-xs sm:text-sm text-primary-foreground/80">Direct + ₹500 from sub-referrals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-6 flex items-center">
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-primary" />
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-primary/10 p-2 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Generate Referral Links</p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">Create unique links for any affiliate marketing course instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-success/10 p-2 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Share with Your Network</p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">Use email, WhatsApp, social media, or any channel you prefer</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-accent/10 p-2 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Earn Multi-Level Commissions</p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">Receive 70% direct + 10% second-level commissions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-warning/10 p-2 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground mb-1 text-sm sm:text-base">Track Your Progress</p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">Monitor clicks, conversions, and earnings in real-time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-6 flex items-center">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-success" />
            Program Benefits
          </h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center text-sm sm:text-base">
                <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                Multi-Level Commission
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm leading-relaxed">
                Earn 70% on direct referrals + 10% on second-level referrals - the highest structure in trading education.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center text-sm sm:text-base">
                <Coins className="w-4 h-4 mr-2 flex-shrink-0" />
                ₹1000 Withdrawal Minimum
              </h3>
              <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm leading-relaxed">
                Start earning from your first affiliate marketing referral with a reasonable ₹1000 withdrawal threshold.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center text-sm sm:text-base">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                Real-Time Tracking
              </h3>
              <p className="text-purple-800 dark:text-purple-200 text-xs sm:text-sm leading-relaxed">
                Monitor your referral performance with detailed analytics and instant notifications.
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-4 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2 flex items-center text-sm sm:text-base">
                <Gift className="w-4 h-4 mr-2 flex-shrink-0" />
                Milestone Bonuses
              </h3>
              <p className="text-orange-800 dark:text-orange-200 text-xs sm:text-sm leading-relaxed">
                Earn ₹500 bonus for every 5 successful referrals - rewards that keep growing!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-border shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          <span>Terms and Conditions</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
            <h3 className="font-bold text-card-foreground mb-4 flex items-center text-sm sm:text-base">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-success flex-shrink-0" />
              Commission Structure
            </h3>
            <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-success mt-1 flex-shrink-0">•</span>
                <span>70% commission on direct referrals + 10% on second-level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-1 flex-shrink-0">•</span>
                <span>₹500 bonus for every 5 successful referrals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-1 flex-shrink-0">•</span>
                <span>Commissions credited after purchase completion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-1 flex-shrink-0">•</span>
                <span>30-day cookie tracking period for referral attribution</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-1 flex-shrink-0">•</span>
                <span>No cap on total earnings potential</span>
              </li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
            <h3 className="font-bold text-card-foreground mb-4 flex items-center text-sm sm:text-base">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-warning flex-shrink-0" />
              Program Rules
            </h3>
            <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1 flex-shrink-0">•</span>
                <span>Self-referrals are not permitted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1 flex-shrink-0">•</span>
                <span>Minimum withdrawal amount: ₹1000</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1 flex-shrink-0">•</span>
                <span>Payments processed within 5 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-1 flex-shrink-0">•</span>
                <span>Must comply with affiliate marketing promotional guidelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEwNC0uODk2LTItMi0yaDFjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAycy44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Start Earning Today</h2>
          <p className="mb-6 sm:mb-8 text-blue-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Join our affiliate marketing referral program and turn your network into a source of income!
          </p>
          <button
            onClick={() => onPageChange('courses')}
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Browse Affiliate Marketing Courses to Refer
          </button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => {
    const faqs = [
      {
        question: "How do I track my referral earnings?",
        answer: "You can track all your referral activities, earnings, and withdrawal history in your personal dashboard. Simply log in and navigate to the 'Referrals' or 'Earnings' section."
      },
      {
        question: "When will I receive my commission payments?",
        answer: "Commissions are credited to your account after the referred student completes their course purchase. You can withdraw your earnings once you reach the ₹1000 minimum threshold, and payments are processed within 5 business days."
      },
      {
        question: "Can I refer courses to myself or family members?",
        answer: "Self-referrals are not permitted under our program terms. However, you can refer courses to family members as long as they are making genuine purchases and you're not circumventing the system."
      },
      {
        question: "What happens if a student refunds a course I referred?",
        answer: "If a referred student requests a refund within our refund policy period, the associated commission will be deducted from your account. We maintain fair practices for both students and referrers."
      }
    ];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-6 sm:p-8 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 px-4">
            We're here to help! Get in touch with our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="text-center group bg-card p-6 rounded-2xl shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-blue-100 dark:bg-blue-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">support@learnhub.com</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Response within 24 hours</p>
          </div>

          <div className="text-center group bg-card p-6 rounded-2xl shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-green-100 dark:bg-green-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Phone Support</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">+1 (555) 123-4567</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Mon-Fri, 9AM-6PM PST</p>
          </div>

          <div className="text-center group bg-card p-6 rounded-2xl shadow-md border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">Available 24/7</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Instant support online</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12 border border-border">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send us a Message</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground transition-all duration-200"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground transition-all duration-200">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Referral Program</option>
                <option>Course Content</option>
                <option>Partnership Opportunity</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground transition-all duration-200 resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => alert('Thank you for your message! We will get back to you within 24 hours.')}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Send Message
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-border shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-300">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 pr-4 text-sm sm:text-base">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 animate-slideDown">
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
        return <div className="text-center py-12">Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {getPageContent()}
      </div>
    </div>
  );
};

export default StaticPages;
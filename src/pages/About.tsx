import React from 'react';
import { CheckCircle, Users, Target, Award, ArrowRight, Mail, MessageCircle, Phone, Globe, BookOpen, Share2, Gift, Coins, TrendingUp, Star, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-float">
              <Globe className="w-12 h-12 text-primary icon-3d" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">About LearnHub</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Empowering affiliate marketers worldwide through quality education and rewarding partnerships
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
                At LearnHub, we believe that affiliate marketing education should be accessible to everyone, everywhere. 
                Our mission is to democratize affiliate marketing knowledge by connecting students with expert marketers and 
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
                  Learn from successful affiliate marketers with real-world experience and proven track records.
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
            //   onClick={() => onPageChange('courses')}
              variant="secondary"
              size="lg"
              className="shadow-lg"
            >
              <BookOpen className="w-5 h-5 mr-2 icon-3d" />
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
import React from 'react';
import { CheckCircle, Users, Target, BookOpen, Gift, TrendingUp, Globe, Star, Clock, Award, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import styled from 'styled-components';

// Enhanced Wave Card with better responsiveness
const StyledWaveCard = styled.div`
  .e-card {
    margin: 20px auto;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
    position: relative;
    width: 100%;
    max-width: 280px;
    height: 320px;
    border-radius: 20px;
    overflow: hidden;
    
    @media (max-width: 640px) {
      height: 280px;
      max-width: 260px;
    }
  }
  .wave {
    position: absolute;
    width: 540px;
    height: 700px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb);
  }
  .icon {
    width: 3em;
    height: 3em;
    margin-top: -0.5em;
    padding-bottom: 0.5em;
    
    @media (max-width: 640px) {
      width: 2.5em;
      height: 2.5em;
    }
  }
  .infotop {
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 4.5em;
    left: 0;
    right: 0;
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    padding: 0 20px;
    
    @media (max-width: 640px) {
      font-size: 16px;
      top: 4em;
    }
  }
  .description {
    font-size: 13px;
    font-weight: 300;
    position: relative;
    top: 1em;
    padding: 0 20px;
    font-family: 'Noto Sans', sans-serif;
    line-height: 1.4;
    
    @media (max-width: 640px) {
      font-size: 12px;
      padding: 0 16px;
    }
  }
  .wave:nth-child(2), .wave:nth-child(3) {
    top: 210px;
  }
  .wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
  }
  .wave:nth-child(2) {
    animation-duration: 50s;
  }
  .wave:nth-child(3) {
    animation-duration: 45s;
  }
  @keyframes wave {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Enhanced Skew Card with better mobile support
const StyledSkewCard = styled.div`
  .group {
    transform-origin: center;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    
    @media (min-width: 768px) {
      transform-origin: bottom right;
    }
  }
  .group:hover {
    transform: scale(1.05);
    
    @media (min-width: 768px) {
      transform: rotate(0deg) skewX(-8deg) translateX(-4px) translateY(8px) scale(1.05);
    }
  }
  .card {
    position: relative;
    width: 100%;
    min-height: 220px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 24px 20px;
    color: #1f2937;
    font-family: 'Noto Sans', sans-serif;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 640px) {
      min-height: 200px;
      padding: 20px 16px;
    }
  }
  .card::before {
    content: '';
    position: absolute;
    right: 8px;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #0a89a8, #1e3a8a);
    border-radius: 20px;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .group:hover .card::before {
    right: -8px;
    
    @media (min-width: 768px) {
      transform: skewX(8deg);
    }
  }
  .card-content {
    z-index: 1;
    text-align: center;
  }
`;

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Enhanced */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-6 sm:p-8 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 font-poppins bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              About LearnHub
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-noto-sans px-4">
              Empowering affiliate marketers worldwide through quality education and rewarding partnerships
            </p>
          </div>

          {/* Mission and Vision - Enhanced Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-poppins">Our Mission</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans">
                  At LearnHub, we believe affiliate marketing education should be accessible to everyone, everywhere. Our mission is to democratize knowledge by connecting students with expert marketers and fostering opportunities for knowledge sharing that benefit entire communities.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans">
                  Our platform creates a ripple effect of growth through our innovative referral system, transforming individuals and communities alike.
                </p>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-poppins">Our Vision</h2>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans">
                  To build a global learning ecosystem where knowledge flows freely, instructors are rewarded for their expertise, and learners become ambassadors for education by sharing valuable courses with their networks.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans">
                  We're not just a platform—we're a community where everyone thrives through the power of learning and sharing.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose LearnHub - Enhanced with Skew Cards */}
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-border shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center font-poppins">
              Why Choose LearnHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <StyledSkewCard>
                <div className="group">
                  <div className="card">
                    <div className="card-content">
                      <div className="bg-primary/10 p-3 rounded-xl inline-flex mb-4">
                        <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-base sm:text-lg font-poppins">Expert-Led Courses</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Learn from successful affiliate marketers with real-world experience and proven track records.
                      </p>
                    </div>
                  </div>
                </div>
              </StyledSkewCard>

              <StyledSkewCard>
                <div className="group">
                  <div className="card">
                    <div className="card-content">
                      <div className="bg-success/10 p-3 rounded-xl inline-flex mb-4">
                        <Users className="w-7 h-7 sm:w-8 sm:h-8 text-success" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-base sm:text-lg font-poppins">Community Driven</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Join a community of learners and earn rewards by sharing valuable educational content.
                      </p>
                    </div>
                  </div>
                </div>
              </StyledSkewCard>

              <StyledSkewCard>
                <div className="group">
                  <div className="card">
                    <div className="card-content">
                      <div className="bg-accent/10 p-3 rounded-xl inline-flex mb-4">
                        <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-base sm:text-lg font-poppins">Generous Rewards</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Earn 70% commission on direct referrals + 10% on second-level + ₹500 bonus every 5 referrals.
                      </p>
                    </div>
                  </div>
                </div>
              </StyledSkewCard>
            </div>
          </div>

          {/* Our Journey - Wave Cards Section */}
          <div className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl sm:rounded-3xl mb-12 sm:mb-16 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-poppins">
                  Our Journey
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-noto-sans px-4">
                  From humble beginnings to a global impact, here's how LearnHub grew.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
                <StyledWaveCard>
                  <div className="e-card playing">
                    <div className="wave" />
                    <div className="wave" />
                    <div className="wave" />
                    <div className="infotop">
                      <Award className="icon" />
                      2020: Founded
                      <div className="description">LearnHub was born to democratize affiliate marketing education.</div>
                    </div>
                  </div>
                </StyledWaveCard>
                <StyledWaveCard>
                  <div className="e-card playing">
                    <div className="wave" />
                    <div className="wave" />
                    <div className="wave" />
                    <div className="infotop">
                      <Users className="icon" />
                      2022: 10,000 Students
                      <div className="description">Reached a milestone of empowering 10,000 learners worldwide.</div>
                    </div>
                  </div>
                </StyledWaveCard>
                <StyledWaveCard>
                  <div className="e-card playing">
                    <div className="wave" />
                    <div className="wave" />
                    <div className="wave" />
                    <div className="infotop">
                      <Globe className="icon" />
                      2024: Global Expansion
                      <div className="description">Expanded to over 100 countries with diverse courses.</div>
                    </div>
                  </div>
                </StyledWaveCard>
              </div>
            </div>
          </div>

          {/* Success Metrics - Enhanced */}
          <div className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl border border-border mb-12 sm:mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-poppins">
                  Our Impact
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-noto-sans px-4">
                  LearnHub is transforming lives through education and opportunity.
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center group">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative bg-blue-100 dark:bg-blue-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-poppins">20,000+</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-noto-sans mt-1">Students Enrolled</p>
                </div>

                <div className="text-center group">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-green-200 dark:bg-green-800 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative bg-green-100 dark:bg-green-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-poppins">50+</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-noto-sans mt-1">Courses Offered</p>
                </div>

                <div className="text-center group">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-purple-200 dark:bg-purple-800 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative bg-purple-100 dark:bg-purple-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-poppins">100+</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-noto-sans mt-1">Countries Reached</p>
                </div>

                <div className="text-center group">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-yellow-200 dark:bg-yellow-800 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative bg-yellow-100 dark:bg-yellow-900 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-poppins">4.9/5</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-noto-sans mt-1">Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Enhanced */}
          <div className="relative overflow-hidden text-center bg-gradient-to-r from-primary via-accent to-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-primary-foreground shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0xLjEwNC0uODk2LTItMi0yaDFjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAycy44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDJoLTFjMCAxLjEwNC44OTYgMiAyIDIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-poppins">
                Ready to Start Learning?
              </h2>
              <p className="text-primary-foreground/90 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-noto-sans px-4">
                Join thousands of students transforming their careers and earning through referrals.
              </p>
              <Button
                onClick={() => window.location.href = '/course-page'}
                variant="secondary"
                size="lg"
                className="shadow-xl bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Explore Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
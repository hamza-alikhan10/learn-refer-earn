import React from 'react';
import { CheckCircle, Users, Target, BookOpen, Gift, TrendingUp, Globe, Star, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import styled from 'styled-components';

// Wave Card Animation (Adapted from previous WaveCard)
const StyledWaveCard = styled.div`
  .e-card {
    margin: 20px auto;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
    position: relative;
    width: 240px;
    height: 280px;
    border-radius: 16px;
    overflow: hidden;
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
    width: 2.5em;
    margin-top: -0.5em;
    padding-bottom: 0.5em;
  }
  .infotop {
    text-align: center;
    font-size: 18px;
    position: absolute;
    top: 4em;
    left: 0;
    right: 0;
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }
  .description {
    font-size: 12px;
    font-weight: 300;
    position: relative;
    top: 1em;
    padding: 0 16px;
    font-family: 'Noto Sans', sans-serif;
  }
  .wave:nth-child(2), .wave:nth-child(3) {
    top: 210px;
  }
  .e-card.playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
  }
  .wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
  }
  .e-card.playing .wave:nth-child(2) {
    animation-duration: 4000ms;
  }
  .wave:nth-child(2) {
    animation-duration: 50s;
  }
  .e-card.playing .wave:nth-child(3) {
    animation-duration: 5000ms;
  }
  .wave:nth-child(3) {
    animation-duration: 45s;
  }
  @keyframes wave {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Skew Card Animation (Fixed from provided Card)
const StyledSkewCard = styled.div`
  .group {
    transform-origin: bottom right;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .group:hover {
    transform: rotate(0deg) skewX(-8deg) translateX(-4px) translateY(8px) scale(1.05);
  }
  .card {
    position: relative;
    width: 100%;
    height: 180px;
    background: linear-gradient(#ffffff, #f3f4f6);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #1f2937;
    font-family: 'Noto Sans', sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .card::before {
    content: '';
    position: absolute;
    right: 8px;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #0a89a8, #252e31);
    border-radius: 16px;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .group:hover .card::before {
    right: -8px;
    transform: skewX(8deg);
  }
`;

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 flex items-center justify-center animate-float">
              <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-primary icon-3d" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-poppins">
              About LearnHub
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-noto-sans">
              Empowering affiliate marketers worldwide through quality education and rewarding partnerships
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="w-6 h-6 text-primary icon-3d" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-poppins">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans">
                At LearnHub, we believe affiliate marketing education should be accessible to everyone, everywhere. Our mission is to democratize knowledge by connecting students with expert marketers and fostering opportunities for knowledge sharing that benefit entire communities.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans mt-4">
                Our platform creates a ripple effect of growth through our innovative referral system, transforming individuals and communities alike.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-accent icon-3d" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-poppins">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans">
                To build a global learning ecosystem where knowledge flows freely, instructors are rewarded for their expertise, and learners become ambassadors for education by sharing valuable courses with their networks.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-noto-sans mt-4">
                We’re not just a platform—we’re a community where everyone thrives through the power of learning and sharing.
              </p>
            </div>
          </div>

          {/* Why Choose LearnHub? */}
          <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-2xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-border">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-8 sm:mb-12 text-center font-poppins">
              Why Choose LearnHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <StyledSkewCard>
                <div className="group">
                  <div className="card">
                    <BookOpen className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-bold text-gray-900 mb-3 text-lg font-poppins">Expert-Led Courses</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Learn from successful affiliate marketers with real-world experience and proven track records.
                    </p>
                  </div>
                </div>
              </StyledSkewCard>
              <StyledSkewCard>
                <div className="group">
                  <div className="card">
                    <Users className="w-8 h-8 text-success mb-4" />
                    <h3 className="font-bold text-gray-900 mb-3 text-lg font-poppins">Community Driven</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Join a community of learners and earn rewards by sharing valuable educational content.
                    </p>
                  </div>
                </div>
              </StyledSkewCard>
              <StyledSkewCard>
                <div className="group">
                  <div className="card">
                    <Gift className="w-8 h-8 text-accent mb-4" />
                    <h3 className="font-bold text-gray-900 mb-3 text-lg font-poppins">Generous Rewards</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Earn 40%–60% commission on direct referrals + 5%–10% on second-level + ₹500 bonus every 5 referrals.
                    </p>
                  </div>
                </div>
              </StyledSkewCard>
            </div>
          </div>

          {/* Our Journey */}
          <div className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4 font-poppins">
                  Our Journey
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-noto-sans">
                  From humble beginnings to a global impact, here’s how LearnHub grew.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

          {/* Success Metrics */}
          <div className="py-12 sm:py-16 bg-white rounded-2xl shadow-md border border-border mb-12 sm:mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4 font-poppins">
                  Our Impact
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-noto-sans">
                  LearnHub is transforming lives through education and opportunity.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">20,000+</p>
                  <p className="text-sm sm:text-base text-gray-600 font-noto-sans">Students Enrolled</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">50+</p>
                  <p className="text-sm sm:text-base text-gray-600 font-noto-sans">Courses Offered</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">100+</p>
                  <p className="text-sm sm:text-base text-gray-600 font-noto-sans">Countries Reached</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">4.9/5</p>
                  <p className="text-sm sm:text-base text-gray-600 font-noto-sans">Average Course Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-6 sm:p-8 lg:p-12 text-primary-foreground">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 font-poppins">
              Ready to Start Learning?
            </h2>
            <p className="text-primary-foreground/90 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-noto-sans">
              Join thousands of students transforming their careers and earning through referrals.
            </p>
            <Button
              onClick={() => window.location.href = '/course-page'}
              variant="secondary"
              size="lg"
              className="shadow-lg bg-white text-primary hover:bg-gray-100"
            >
              <BookOpen className="w-5 h-5 mr-2 icon-3d" />
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
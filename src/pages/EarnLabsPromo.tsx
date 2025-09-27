import React, { useState } from 'react';
import { useAppSelector } from '@/ReduxStore/hooks';
import { useGetDashboardQuery } from '@/ReduxStore/features/api/dashboard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2, MessageCircle, Users, Instagram, Facebook, Download, Copy, CheckCircle, Star, TrendingUp, Award, Zap, ExternalLink, Sparkles } from 'lucide-react';
import flyerMockup from '@/assets/flyer-mockup.png';
import socialTemplate from '@/assets/social-template.png';
import motivationalflyer from '@/assets/motivational-flyer.png'
import explainflyer from '@/assets/explain-flyer.png'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EarnLabsPromo = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();
  const { userId } = useAppSelector((state) => state.auth);
  const { data: dashboardData } = useGetDashboardQuery(
    { userId: userId || '' },
    { skip: !userId }
  );

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500',
      description: 'Share instantly with contacts',
      action: 'Share on WhatsApp',
      stat: '85%',
      statLabel: 'Success Rate'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-600',
      description: 'Reach your network',
      action: 'Share on Facebook',
      stat: '92%',
      statLabel: 'Engagement'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 via-pink-500 to-orange-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'Post to your story',
      action: 'Share on Instagram',
      stat: '76%',
      statLabel: 'Click Rate'
    },
    {
      name: 'LinkedIn',
      icon: Users,
      color: 'from-blue-700 to-blue-800',
      bgColor: 'bg-blue-700',
      description: 'Connect with professionals',
      action: 'Share on LinkedIn',
      stat: '78%',
      statLabel: 'Conversion'
    }
  ];

  const flyerData = [
    {
      id: 1,
      title: 'Explanatory Promotion Flyer',
      description: 'Perfect for promoting individual courses',
      image: flyerMockup,
      caption: ' 🎓 New to Affiliate Marketing? Start with EarnLabs’ Beginner Course! 💼 Ready to kickstart a side hustle that pays? 🚀 Our Beginner Affiliate Course is designed for complete novices, guiding you through every step of affiliate marketing with easy-to-follow lessons. 📚 Learn how to craft irresistible promotions, grow your audience, and drive sales using proven strategies. 📣 Once you’ve mastered the basics, you’ll be ready to promote our exciting upcoming online courses, earning a massive 50% commission on every purchase made through your unique referral link. 💰 No experience? No problem! Our expert-led course provides all the tools you need to succeed, plus you’ll join a supportive EarnLabs community dedicated to learning and earning. 🌟 Whether you’re a student, professional, or entrepreneur, this is your chance to build skills and income. Enroll today and start your affiliate journey. #AffiliateBeginner #LearnAndEarn #JoinEarnLabs',
      downloads: 54,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 2,
      title: 'Referral-Focused',
      description: 'Optimized for social media sharing',
      image: socialTemplate,
      caption: '💸 Earn 50% Commissions with EarnLabs’ Referral Program! 🌟 Join EarnLabs, take our Beginner Affiliate Course, and start earning big! 🎓 Learn the essentials of affiliate marketing, then promote our upcoming online courses to your network. Every time someone purchases through your referral link, you’ll pocket 50% of the sale. 🤑 It’s simple: share, earn, repeat! 🚀 No prior experience needed—just a passion for growth. Sign up, grab your unique link, and start earning today. #EarnMoneyOnline #AffiliateMarketing #EarnLabsCommunity',
      downloads: 78,
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      id: 3,
      title: 'Referral Program Flyer',
      description: 'Highlight the earning opportunity',
      image: motivationalflyer,
      caption: '🌟 From Beginner to Affiliate Success with EarnLabs! 🚀 Imagine turning your love for learning into a thriving income stream! 💡 With EarnLabs’ Beginner Affiliate Course, you’ll master affiliate marketing skills to promote our upcoming online courses and earn 50% commission on every sale you drive. 💰 Picture this: Sarah, a college student, took our course, shared her referral link on social media, and earned hundreds in commissions within weeks! 📣 You could be next. No experience needed—just determination and our expert guidance. 🎓 Join the EarnLabs community, upskill, and build a future where learning pays. Start your success story today. #AffiliateJourney #PassiveIncome #JoinEarnLabs',
      downloads: 67,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 4,
      title: 'Starting Explaination Template',
      description: 'Share inspiring student achievements',
      image: explainflyer,
      caption: '🚀 Affiliate marketing seekho aur EarnLabs ke saath earn karo!💰 Direct referrals pe 50% — Earning half-half: *half aapka, half hamara* , half-half hardwork! ➕ Extra 5% income: Agar aapke refer kiye bande ne kisi aur ko refer kiya aur usne ₹1000 earn kiya → aapko usme se ₹50 milega! 📈 Future courses pe 60–70% commission — launching soon! 👉 Content & strategy hum denge, aapko bas refer karna hai. #SuccessStory #EarnLabs #CareerGrowth',
      downloads: 145,
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const getReferralLink = () => {
    if (!dashboardData) return window.location.origin;
    const baseUrl = window.location.origin;
    const referralCode = dashboardData.referral_code || userId;
    return `${baseUrl}/?ref=${encodeURIComponent(referralCode)}`;
  };

  const showShareInstructions = (platform: string) => {
    const instructions = {
      WhatsApp: {
        title: "Ready to Share on WhatsApp! 🟢",
        description: "Caption copied & Flyer downloaded!",
        steps: [
          "WhatsApp opened with your referral link",
          "Click attach (📎) to add the downloaded image",
          "Send to your contacts!"
        ]
      },
      Facebook: {
        title: "Ready to Share on Facebook! 🔵",
        description: "Caption copied & Flyer downloaded!",
        steps: [
          "Facebook opened in new tab",
          "Create a new post",
          "Upload the downloaded flyer image",
          "Paste the caption (Ctrl+V / Cmd+V)",
          "Share to your network!"
        ]
      },
      Instagram: {
        title: "Ready to Share on Instagram! 📸",
        description: "Caption copied & Flyer downloaded!",
        steps: [
          "Instagram opened",
          "Create new post or story",
          "Upload the downloaded flyer",
          "Paste the caption with your link",
          "Share and start earning!"
        ]
      },
      LinkedIn: {
        title: "Ready to Share on LinkedIn! 💼",
        description: "Caption copied & Flyer downloaded!",
        steps: [
          "LinkedIn opened in new tab",
          "Create a new post",
          "Upload the downloaded flyer",
          "Paste the caption (Ctrl+V / Cmd+V)",
          "Share to professionals!"
        ]
      }
    };

    const info = instructions[platform as keyof typeof instructions];
    
    toast({
      title: info.title,
      description: (
        <div className="space-y-3 mt-2">
          <p className="font-semibold text-emerald-400">{info.description}</p>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">Next Steps:</p>
            <ol className="space-y-1 text-sm text-gray-400 list-decimal list-inside">
              {info.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      ),
      duration: 8000,
    });
  };

  const handleCopyCaption = (caption: string, id: number) => {
    const referralLink = getReferralLink();
    const fullCaption = `${caption}\n\n🔗 Join here: ${referralLink}`;
    navigator.clipboard.writeText(fullCaption);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    
    toast({
      title: "Caption Copied!",
      description: "Caption with your referral link copied to clipboard",
    });
  };

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (platform: string, caption: string, imageUrl: string) => {
    const referralLink = getReferralLink();
    const fullCaption = `${caption}\n\n🔗 Join here: ${referralLink}`;
    const shareText = encodeURIComponent(fullCaption);
    const encodedUrl = encodeURIComponent(referralLink);
    
    if (navigator.share && platform === 'Instagram') {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'earnlabs-flyer.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'EarnLabs - Learn & Earn',
          text: fullCaption,
          files: [file]
        });
        return;
      } catch (err) {
        console.log('Web Share API failed, using fallback');
      }
    }
    
    switch(platform) {
      case 'WhatsApp':
        navigator.clipboard.writeText(fullCaption);
        const whatsappUrl = `https://wa.me/?text=${shareText}`;
        handleDownload(imageUrl, 'whatsapp-flyer');
        
        setTimeout(() => {
          window.open(whatsappUrl, '_blank', 'width=600,height=400');
          showShareInstructions('WhatsApp');
        }, 500);
        break;
        
      case 'Facebook':
        navigator.clipboard.writeText(fullCaption);
        handleDownload(imageUrl, 'facebook-flyer');
        
        setTimeout(() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            '_blank',
            'width=600,height=400'
          );
          showShareInstructions('Facebook');
        }, 500);
        break;
        
      case 'Instagram':
        navigator.clipboard.writeText(fullCaption);
        handleDownload(imageUrl, 'instagram-flyer');
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        setTimeout(() => {
          if (isMobile) {
            window.location.href = 'instagram://';
            setTimeout(() => {
              window.open('https://www.instagram.com/', '_blank');
            }, 1000);
          } else {
            window.open('https://www.instagram.com/', '_blank');
          }
          showShareInstructions('Instagram');
        }, 500);
        break;
        
      case 'LinkedIn':
        navigator.clipboard.writeText(fullCaption);
        handleDownload(imageUrl, 'linkedin-flyer');
        
        setTimeout(() => {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            '_blank',
            'width=600,height=400'
          );
          showShareInstructions('LinkedIn');
        }, 500);
        break;
        
      default:
        navigator.clipboard.writeText(fullCaption);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xMDQtLjg5Ni0yLTItMmgxYzAtMS4xMDQtLjg5Ni0yLTItMnMtMiAuODk2LTIgMnMuODk2IDIgMiAyaC0xYzAgMS4xMDQuODk2IDIgMiAyaC0xYzAgMS4xMDQuODk2IDIgMiAyIi8+PC9nPjwvZz48L3N2Zz4=)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 text-indigo-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base font-medium">Ready-to-Share Marketing Kit</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Share & Earn with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Professional Materials</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Download professionally designed flyers and templates. Share with one click and start earning from referrals instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Flyer Showcase Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8">
            {flyerData.map((flyer) => (
              <div key={flyer.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                
                <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={flyer.image} 
                      alt={flyer.title}
                      className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 sm:py-2 rounded-full border border-slate-700">
                      <span className="text-xs sm:text-sm font-medium text-white flex items-center">
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {flyer.downloads}+
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${flyer.gradient}`} />
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {flyer.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">
                      {flyer.description}
                    </p>
                    
                    <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-6 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-indigo-400" />
                          Ready Caption
                        </span>
                        <Button
                          onClick={() => handleCopyCaption(flyer.caption, flyer.id)}
                          variant="ghost"
                          size="sm"
                          className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 h-8 text-xs sm:text-sm"
                        >
                          {copiedId === flyer.id ? (
                            <>
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                        {flyer.caption}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleDownload(flyer.image, flyer.title)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base py-2 sm:py-3"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Flyer
                      </Button>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {socialPlatforms.map((platform) => (
                          <Button
                            key={platform.name}
                            onClick={() => handleShare(platform.name, flyer.caption, flyer.image)}
                            variant="outline"
                            size="sm"
                            className="border-slate-600 bg-slate-800/80 hover:bg-slate-700 text-gray-200 hover:text-white hover:border-slate-500 transition-all duration-200 text-xs sm:text-sm py-2"
                          >
                            <platform.icon className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                            <span className="hidden sm:inline">{platform.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Platforms Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base font-medium">One-Click Social Sharing</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Share Across <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">All Platforms</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Each share is a potential earning opportunity. Track your performance and optimize your strategy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
                
                <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02]">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${platform.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <platform.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">
                    {platform.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 sm:mb-6 text-center text-xs sm:text-sm">
                    {platform.description}
                  </p>
                  
                  <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 mb-4 border border-slate-700/50">
                    <div className="text-xl sm:text-2xl font-bold text-white text-center">{platform.stat}</div>
                    <div className="text-xs text-gray-400 text-center">{platform.statLabel}</div>
                  </div>
                  
                  <Button 
                    onClick={() => handleShare(platform.name, flyerData[0].caption, flyerData[0].image)}
                    variant="outline" 
                    className="w-full border-slate-600 bg-slate-800/80 hover:bg-slate-700 text-gray-200 hover:text-white hover:border-slate-500 transition-all duration-200 text-xs sm:text-sm"
                  >
                    {platform.action}
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative inline-block mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-indigo-500/30">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Start Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Success Journey</span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
              Join thousands who have transformed their lives with EarnLabs. Your financial freedom starts with a single share.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Start Learning Today
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-slate-700 hover:border-indigo-500 text-black hover:bg-indigo-500/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                View All Courses
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-800">
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                  4.9/5
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Student Rating</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-800">
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-white mb-2">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  50K+
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Active Learners</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-800">
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-white mb-2">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  98%
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
         
      
      </section>
       <Footer/>
    </div>
  );
};

export default EarnLabsPromo;
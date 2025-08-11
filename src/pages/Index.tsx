
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import ReferralModal from '../components/ReferralModal';
import Homepage from './Homepage';
import CoursesPage from './CoursesPage';
import CourseDetailsPage from './CourseDetailsPage';
import Dashboard from './Dashboard';
import StaticPages from './StaticPages';
import { mockCourses } from '../data/mockData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentCourseId, setCurrentCourseId] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [selectedCourseForReferral, setSelectedCourseForReferral] = useState<any>(null);
  const [referralCode, setReferralCode] = useState<string>('');
  const { toast } = useToast();

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      setAuthModalOpen(true);
      // Clean the URL without the ref parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Set up auth state listener and check for existing session
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            loadUserProfile(session.user.id);
          }, 0);
        }
        
        if (event === 'SIGNED_OUT') {
          setUserProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handlePageChange = (page: string, courseId?: string) => {
    setCurrentPage(page);
    if (courseId) {
      setCurrentCourseId(courseId);
    }
    window.scrollTo(0, 0);
  };

  const handleAuth = (userData: any) => {
    // This is now handled by the auth state listener
    setAuthModalOpen(false);
    // Redirect to dashboard after successful auth
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    try {
      // Clean up auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Ignore errors
      }
      
      setCurrentPage('home');
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleReferCourse = (courseId: string) => {
    if (!user || !userProfile) {
      setAuthModalOpen(true);
      return;
    }

    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForReferral(course);
      setReferralModalOpen(true);
    }
  };

  const handlePurchase = async (courseId: string) => {
    if (!user || !userProfile) {
      setAuthModalOpen(true);
      return;
    }

    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      const confirmPurchase = confirm(
        `Purchase ${course.title} for ₹${course.price}?\n\nOne-click purchase with UPI payment.`
      );
      
      if (confirmPurchase) {
        try {
          // Insert course enrollment
          const { data, error } = await supabase
            .from('course_enrollments')
            .insert({
              user_id: user.id,
              course_id: courseId,
              purchase_price: course.price
            })
            .select()
            .single();

          if (error) throw error;

          // Call the referral earnings function
          if (data) {
            const { error: earningsError } = await supabase.rpc('process_referral_earnings', {
              enrollment_id: data.id
            });

            if (earningsError) {
              console.error('Error processing referral earnings:', earningsError);
            }
          }

          toast({
            title: "Purchase Successful!",
            description: `You now have access to "${course.title}"!`,
          });
          
          // Reload user profile to get updated earnings
          loadUserProfile(user.id);
        } catch (error: any) {
          console.error('Error processing purchase:', error);
          toast({
            title: "Purchase Failed",
            description: error.message || "There was an error processing your purchase. Please try again.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Homepage 
            onPageChange={handlePageChange} 
            onReferCourse={handleReferCourse}
            user={userProfile || user}
          />
        );
      case 'courses':
        return (
          <CoursesPage 
            onPageChange={handlePageChange} 
            onReferCourse={handleReferCourse}
            user={userProfile || user}
          />
        );
      case 'course-details':
        return (
          <CourseDetailsPage 
            courseId={currentCourseId}
            user={userProfile || user}
            onReferCourse={handleReferCourse}
            onPurchase={handlePurchase}
          />
        );
      case 'dashboard':
        return user ? (
          <Dashboard 
            user={userProfile || user}
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h1>
              <p className="text-gray-600 mb-4">You need to sign in to access your dashboard.</p>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        );
      case 'about':
      case 'how-it-works':
      case 'referral-program':
        return (
          <StaticPages 
            page={currentPage}
            onPageChange={handlePageChange}
          />
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
              <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
              <button
                onClick={() => handlePageChange('home')}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        user={user}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main>
        {renderCurrentPage()}
      </main>
      
      <Footer onPageChange={handlePageChange} />

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setReferralCode('');
        }}
        onAuth={handleAuth}
        referralCode={referralCode}
      />

      <ReferralModal 
        isOpen={referralModalOpen}
        onClose={() => setReferralModalOpen(false)}
        course={selectedCourseForReferral}
        user={userProfile || user}
      />
    </div>
  );
};

export default Index;

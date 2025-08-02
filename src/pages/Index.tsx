
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

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentCourseId, setCurrentCourseId] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [selectedCourseForReferral, setSelectedCourseForReferral] = useState<any>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('learnhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handlePageChange = (page: string, courseId?: string) => {
    setCurrentPage(page);
    if (courseId) {
      setCurrentCourseId(courseId);
    }
    window.scrollTo(0, 0);
  };

  const handleAuth = (userData: any) => {
    setUser(userData);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('learnhub_user');
    setCurrentPage('home');
  };

  const handleReferCourse = (courseId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForReferral(course);
      setReferralModalOpen(true);
    }
  };

  const handlePurchase = (courseId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      alert(`Thank you for your purchase of "${course.title}"! You now have full access to the course content. Check your email for enrollment details.`);
      
      // Mock: Add to user's enrolled courses
      const updatedUser = {
        ...user,
        enrolledCourses: [...(user.enrolledCourses || []), courseId]
      };
      setUser(updatedUser);
      localStorage.setItem('learnhub_user', JSON.stringify(updatedUser));
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Homepage 
            onPageChange={handlePageChange} 
            onReferCourse={handleReferCourse}
            user={user}
          />
        );
      case 'courses':
        return (
          <CoursesPage 
            onPageChange={handlePageChange} 
            onReferCourse={handleReferCourse}
            user={user}
          />
        );
      case 'course-details':
        return (
          <CourseDetailsPage 
            courseId={currentCourseId}
            user={user}
            onReferCourse={handleReferCourse}
            onPurchase={handlePurchase}
          />
        );
      case 'dashboard':
        return user ? (
          <Dashboard 
            user={user}
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
      case 'contact':
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
        onClose={() => setAuthModalOpen(false)}
        onAuth={handleAuth}
      />

      <ReferralModal 
        isOpen={referralModalOpen}
        onClose={() => setReferralModalOpen(false)}
        course={selectedCourseForReferral}
        user={user}
      />
    </div>
  );
};

export default Index;

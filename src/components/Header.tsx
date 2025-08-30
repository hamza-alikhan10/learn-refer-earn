
import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/ReduxStore/hooks';
import { setIsAuthModelOpen, setIsSignUp } from "@/ReduxStore/features/slices/auth";
import useAuthModal from './AuthModal/useAuthModal';


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  const navigate = useNavigate();
  const location = useLocation();
  const {isSignUp, isAuthModelOpen, user, email, username} = useAppSelector((state) => state.auth );
  const currentPage = location.pathname;
  const dispatch = useAppDispatch();
  const { handleLogout } = useAuthModal();

  const navItems = [
    { id: 'home', label: 'Home' , path: '/' },
    { id: 'courses', label: 'Courses' , path: '/course-page'},
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'how-it-works', label: 'How It Works' , path: '/how-it-works' },
    { id: 'referral-program', label: 'Referral Program' , path: '/referral-program'},
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer"
             onClick={() => navigate('/')}
             >
              AffiliateHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`text-gray-700 hover:text-blue-600 transition-colors
                   ${
                  currentPage === item.path ? 'text-blue-600 font-semibold' : ''
                }`
              }
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="w-5 h-5" />
                  <span>{user|| username || email}</span>
                </button>
                <button
                  onClick={() => handleLogout()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(setIsAuthModelOpen(!isAuthModelOpen))}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {!isSignUp?'Sign up':'Sign In'}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-gray-700 hover:text-blue-600 transition-colors ${
                    currentPage === item.path ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setIsAuthModelOpen(!isAuthModelOpen));
                    setMobileMenuOpen(!mobileMenuOpen);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {!isSignUp ? 'Sign up' : 'Sign In'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

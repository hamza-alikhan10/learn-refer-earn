import React, { useState } from 'react';
import { User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/ReduxStore/hooks';
import { setIsAuthModelOpen, setIsSignUp } from "@/ReduxStore/features/slices/auth";
import useAuthModal from './AuthModal/useAuthModal';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .nav-container {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    border-radius: 0.5rem;
    background-color: #EEE;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 100%; /* Full width, responsive */
    font-size: 14px;
    margin: 0 auto;
  }

  .nav-container .nav-item {
    flex: 1 1 auto;
    text-align: center;
    min-width: 0;
  }

  .nav-container .nav-item input {
    display: none;
  }

  .nav-container .nav-item .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-container .nav-item input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }

  .nav-container .nav-item .name:hover {
    background-color: #fff;
  }

  @media (max-width: 1279px) {
    .nav-container {
      display: none; /* Hide styled nav on xl and below */
    }
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, email, username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { handleLogout } = useAuthModal();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'courses', label: 'Courses', path: '/course-page' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'how-it-works', label: 'How It Works', path: '/how-it-works' },
  ];

  const handleAuthClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      dispatch(setIsAuthModelOpen(true));
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
           <h1
  className="text-xl sm:text-2xl lg:text-3xl font-bold cursor-pointer bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
  onClick={() => navigate('/')}
>
  EarnLabs
</h1>

          </div>

          {/* Desktop Navigation (xl and above) */}
          <div className="hidden xl:block flex-1 max-w-2xl mx-4 sm:mx-6 lg:mx-8">
            <StyledWrapper>
              <div className="nav-container">
                {navItems.map((item) => (
                  <label key={item.id} className="nav-item">
                    <input
                      type="radio"
                      name="nav"
                      checked={location.pathname === item.path}
                      onChange={() => navigate(item.path)}
                    />
                    <span className="name">{item.label}</span>
                  </label>
                ))}
              </div>
            </StyledWrapper>
          </div>

          {/* Regular Navigation for Large screens (lg to xl) */}
          <nav className="hidden lg:flex xl:hidden space-x-2 sm:space-x-4 flex-1 justify-center max-w-md sm:max-w-lg mx-2 sm:mx-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 px-2 py-2 rounded-lg hover:bg-blue-50
                  ${location.pathname === item.path ? 'text-blue-600 font-semibold bg-blue-50' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Medium Screen Navigation (md to lg) */}
          <nav className="hidden md:flex lg:hidden space-x-1 sm:space-x-2 flex-1 justify-center max-w-xs sm:max-w-md mx-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`text-xs font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 px-1 sm:px-2 py-1 sm:py-2 rounded-md hover:bg-blue-50
                  ${location.pathname === item.path ? 'text-blue-600 font-semibold bg-blue-50' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Section - Desktop & Tablet */}
          <div className="hidden md:flex items-center flex-shrink-0">
                <button
                  onClick={() => {
                    handleAuthClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 sm:space-x-2 text-left text-blue-600 hover:text-blue-700 px-2 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  {!user && <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />}
                  <span>{user ? (user || username || email) : 'Sign In'}</span>
                </button>
                {user && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 hover:bg-red-600 text-red-500 px-2 sm:px-4 py-2 sm:py-3 rounded-lg hover:text-white transition-all duration-200 font-medium"
                >
                  <span>Logout</span>
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-1 pt-2 sm:pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-2 sm:px-4 py-2 sm:py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg mx-1 sm:mx-2 font-medium ${
                    location.pathname === item.path ? 'text-blue-600 font-semibold bg-blue-50' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-2 sm:pt-3 border-t border-gray-200 mx-1 sm:mx-2 mt-2 sm:mt-3">
                <button
                  onClick={() => {
                    handleAuthClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 sm:space-x-2 text-left text-blue-600 hover:text-blue-700 px-2 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  {!user && <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />}
                  <span>{user ? (user || username || email) : 'Sign In'}</span>
                </button>
                {user && (
                 <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 hover:bg-red-600 text-red-500 px-2 sm:px-4 py-2 sm:py-3 rounded-lg hover:text-white transition-all duration-200 font-medium"
                  >
                    <span>Logout</span>
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
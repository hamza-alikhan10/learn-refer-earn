
import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, user, onAuthClick, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'about', label: 'About Us' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'referral-program', label: 'Referral Program' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => onPageChange('home')}>
              AffiliateHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  currentPage === item.id ? 'text-blue-600 font-semibold' : ''
                }`}
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
                  onClick={() => onPageChange('dashboard')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <User className="w-5 h-5" />
                  <span>{user.display_name || user.username || user.email}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
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
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-gray-700 hover:text-blue-600 transition-colors ${
                    currentPage === item.id ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      onPageChange('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    className="text-left bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign In
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

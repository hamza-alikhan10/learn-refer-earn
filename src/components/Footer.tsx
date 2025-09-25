import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = [
    { id: 'home', label: 'Homepage', path: '/' },
    { id: 'courses', label: 'Courses', path: '/course-page' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'how-it-works', label: 'How It Works', path: '/how-it-works' },
    { id: 'referral-program', label: 'Referral Program', path: '/referral-program' },
    { id: 'contact', label: 'Contact Us', path: '/contact-us' },
  ];

  const socialLinks = [
    { id: 'twitter', label: 'Twitter', href: '#', icon: 'fab fa-twitter' },
    { id: 'linkedin', label: 'LinkedIn', href: '#', icon: 'fab fa-linkedin-in' },
    { id: 'facebook', label: 'Facebook', href: '#', icon: 'fab fa-facebook-f' },
    { id: 'instagram', label: 'Instagram', href: '#', icon: 'fab fa-instagram' },
  ];

  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-3xl font-bold text-blue-400 mb-4 tracking-tight">
              EarnLabs
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
              Empowering affiliate marketers worldwide with high-quality online courses and rewarding referral opportunities.
            </p>
            <p className="text-sm text-blue-300 font-medium">
              Earn upto <span className="text-yellow-400">70% commission</span> on every successful referral!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-300 hover:text-blue-400 text-sm md:text-base transition-colors duration-300 ease-in-out hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white tracking-wide">Connect</h4>
            <div className="space-y-3 text-sm md:text-base">
              <p className="text-gray-300 hover:text-blue-400 transition-colors">
                <a href="mailto:support@learnhub.com">info@earnlabs.in</a>
              </p>
            
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                    aria-label={link.label}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} EarnLabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
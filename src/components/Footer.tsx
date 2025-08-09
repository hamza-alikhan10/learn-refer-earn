
import React from 'react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const footerLinks = [
    { id: 'home', label: 'Homepage' },
    { id: 'courses', label: 'Courses' },
    { id: 'about', label: 'About Us' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'referral-program', label: 'Referral Program' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">AffiliateHub</h3>
            <p className="text-gray-300 mb-4">
              Empowering affiliate marketers worldwide with high-quality online courses and rewarding referral opportunities.
            </p>
            <p className="text-sm text-gray-400">
              Earn 60% commission on every successful referral!
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onPageChange(link.id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <p className="text-gray-300">support@learnhub.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 AffiliateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

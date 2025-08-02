
import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  user: any;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose, course, user }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !course || !user) return null;

  const referralLink = `https://learnhub.example.com/course/${course.id}?ref=${user.id}`;
  const commission = Math.round(course.price * 0.6);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const message = `Check out this amazing course: ${course.title} on LearnHub! ${referralLink}`;
    
    switch (platform) {
      case 'email':
        window.open(`mailto:?subject=Check out this course&body=${encodeURIComponent(message)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`);
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Share2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Share & Earn</h2>
          <p className="text-gray-600 mt-2">
            Earn <span className="font-bold text-green-600">${commission}</span> for each successful referral!
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
          <p className="text-lg font-bold text-blue-600">${course.price}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Referral Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors flex items-center"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-green-600 text-sm mt-1">Link copied to clipboard!</p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Share via:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleShare('email')}
                className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">Email</span>
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Twitter</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Share your unique referral link</li>
              <li>• Earn 60% commission when someone purchases</li>
              <li>• Track your earnings in your dashboard</li>
              <li>• Withdraw earnings anytime</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;

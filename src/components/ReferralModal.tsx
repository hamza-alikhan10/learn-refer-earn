
import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageCircle, Gift, Coins, Twitter } from 'lucide-react';
import { Button } from './ui/button';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  user: any;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose, course, user }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !course || !user) return null;

  const referralLink = `${window.location.origin}/?ref=${user.referral_code || user.id}&course=${course.id}`;
  const commission = Math.round(course.price * 0.5);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const message = `Check out this amazing affiliate marketing course: ${course.title} on AffiliateHub! ${referralLink}`;
    
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-border animate-scale-in">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="bg-gradient-to-br from-success/20 to-accent/20 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center animate-float">
            <Gift className="w-10 h-10 text-success icon-3d" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">Share & Earn</h2>
          <p className="text-muted-foreground mt-2">
            Earn <span className="font-bold text-success text-xl">₹{commission}</span> for each successful referral!
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-xl mb-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">by {course.instructor}</p>
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-warning icon-3d" />
            <p className="text-lg font-bold text-primary">₹{course.price}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3 flex items-center">
              <Share2 className="w-4 h-4 mr-2 icon-3d" />
              Your Referral Link
            </label>
            <div className="flex rounded-lg overflow-hidden border border-input">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 bg-muted text-sm text-card-foreground select-all focus:outline-none"
              />
              <Button
                onClick={handleCopyLink}
                variant={copied ? "success" : "default"}
                size="touch"
                className="rounded-none px-4"
              >
                {copied ? <Check className="w-4 h-4 icon-3d" /> : <Copy className="w-4 h-4 icon-3d" />}
              </Button>
            </div>
            {copied && (
              <p className="text-success text-sm mt-2 animate-fade-in flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Link copied to clipboard!
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-card-foreground mb-3 flex items-center">
              <Share2 className="w-4 h-4 mr-2 icon-3d" />
              Share via:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleShare('email')}
                variant="outline"
                size="touch"
                className="flex-col space-y-1 h-auto py-3"
              >
                <Mail className="w-5 h-5 icon-3d" />
                <span className="text-xs">Email</span>
              </Button>
              <Button
                onClick={() => handleShare('whatsapp')}
                variant="outline"
                size="touch"
                className="flex-col space-y-1 h-auto py-3 hover:bg-success/10 hover:border-success/20"
              >
                <MessageCircle className="w-5 h-5 icon-3d" />
                <span className="text-xs">WhatsApp</span>
              </Button>
              <Button
                onClick={() => handleShare('twitter')}
                variant="outline"
                size="touch"
                className="flex-col space-y-1 h-auto py-3 hover:bg-primary/10 hover:border-primary/20"
              >
                <Twitter className="w-5 h-5 icon-3d" />
                <span className="text-xs">Twitter</span>
              </Button>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;

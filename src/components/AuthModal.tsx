
import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError('');
    
    if (!email || !password || (isSignUp && !username)) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username: username || email.split('@')[0],
      enrolledCourses: [],
      referrals: [],
      earnings: 0
    };

    // Store in localStorage
    localStorage.setItem('learnhub_user', JSON.stringify(userData));
    
    onAuth(userData);
    handleClose();
  };

  const handleGoogleAuth = () => {
    // Mock Google authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: 'user@gmail.com',
      username: 'Google User',
      enrolledCourses: [],
      referrals: [],
      earnings: 0
    };

    localStorage.setItem('learnhub_user', JSON.stringify(userData));
    onAuth(userData);
    handleClose();
  };

  const handleClose = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setError('');
    setIsSignUp(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 relative shadow-2xl border border-border animate-scale-in">
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <User className="w-8 h-8 text-primary icon-3d" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isSignUp ? 'Join thousands of learners' : 'Sign in to your account'}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-4 animate-fade-in">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground icon-3d" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground icon-3d" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                  placeholder="Your username"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground icon-3d" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Password"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1 h-8 w-8"
              >
                {showPassword ? <EyeOff className="w-4 h-4 icon-3d" /> : <Eye className="w-4 h-4 icon-3d" />}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            size="touch"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full"
            size="touch"
          >
            Continue with Google
          </Button>

          <div className="text-center">
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              variant="link"
              className="text-sm"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

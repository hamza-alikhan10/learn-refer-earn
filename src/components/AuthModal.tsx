import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (userData: any) => void;
  referralCode?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth, referralCode }) => {
  const [isSignUp, setIsSignUp] = useState(!!referralCode);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userReferralCode, setUserReferralCode] = useState(referralCode || '');
  const { toast } = useToast();

  if (!isOpen) return null;

  const cleanupAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const handleSignUp = async () => {
    setError('');
    setLoading(true);

    if (!email || !password || !username) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!userReferralCode) {
      setError('Referral code is required to create an account');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      cleanupAuthState();
      
      const signUpData: any = {
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            display_name: username,
          }
        }
      };

      if (userReferralCode) {
        signUpData.options.data.referral_code = userReferralCode;
      }

      const { data, error } = await supabase.auth.signUp(signUpData);

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created!",
          description: "Welcome to LearnHub Trading Academy",
        });
        window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in",
        });
        window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setError('');
    setLoading(true);

    if (!otp) {
      setError('Please enter the verification code');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account verified!",
          description: "Welcome to LearnHub Trading Academy",
        });
        window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      cleanupAuthState();

      const signInData: any = {
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      };

      if (userReferralCode) {
        signInData.options.queryParams = {
          referral_code: userReferralCode
        };
      }

      const { error } = await supabase.auth.signInWithOAuth(signInData);

      if (error) throw error;
    } catch (error: any) {
      setError(error.message || 'An error occurred with Google authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setOtp('');
    setError('');
    setIsSignUp(!!referralCode);
    setIsOtpVerification(false);
    setUserReferralCode(referralCode || '');
    onClose();
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast({
        title: "Code resent",
        description: "Check your email for a new verification code",
      });
    } catch (error: any) {
      setError(error.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  if (isOtpVerification) {
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
              <Mail className="w-8 h-8 text-primary icon-3d" />
            </div>
            <h2 className="text-2xl font-bold text-card-foreground">
              Verify Your Email
            </h2>
            <p className="text-muted-foreground mt-1">
              Enter the 6-digit code sent to {email}
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
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <Button
              onClick={handleOtpVerification}
              className="w-full"
              size="touch"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Verify Account
            </Button>

            <div className="text-center">
              <Button
                onClick={handleResendOtp}
                variant="link"
                className="text-sm"
                disabled={loading}
              >
                Didn't receive code? Resend
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {userReferralCode && (
            <p className="text-primary text-sm mt-2 font-medium">
              Invited with referral code: {userReferralCode}
            </p>
          )}
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
            <>
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
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Referral Code <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={userReferralCode}
                  onChange={(e) => setUserReferralCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter referral code"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use TEST001 or TEST002 for testing
                </p>
              </div>
            </>
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
            onClick={isSignUp ? handleSignUp : handleSignIn}
            className="w-full"
            size="touch"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
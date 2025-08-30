// src/components/AuthModal/AuthForm.tsx
import React from "react";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { setIsSignUp , setStartWithGoogle} from "@/ReduxStore/features/slices/auth";
import useAuthModal from "./useAuthModal";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onSignIn: () => Promise<void>;
  onSignUp: () => Promise<void>;
  loading: boolean;
};

const AuthForm: React.FC<Props> = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSignIn,
  onSignUp,
  loading,
}) => {
  // Local state for toggling between Sign Up and Sign In
    const dispatch = useAppDispatch();
    const {isSignUp, isAuthModelOpen} = useAppSelector((state) => state.auth);
    const { handleGoogleAuth } = useAuthModal();
    const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    if (isAuthModelOpen) {
      const storedRef = sessionStorage.getItem("referralCode") || "";
      setReferralCode(storedRef);
    }
  }, [isAuthModelOpen]);

  return (
    <div className="flex flex-col min-h-full">
      {/* Form content */}
      <div className="flex-1 space-y-4">

            {/* Username (Display name) */}
      {!isSignUp && (
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
      
        {/* Email field */}
     
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

        {/* Password field */}

          <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground icon-3d" />
            <input
              type={showPassword ? "text" : "password"}
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
              {showPassword ? (
                <EyeOff className="w-4 h-4 icon-3d" />
              ) : (
                <Eye className="w-4 h-4 icon-3d" />
              )}
            </Button>
          </div>
        </div>

      {/* Referral Code (only if exists) */}
      {!isSignUp && referralCode && (
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Referral Code
          </label>
          <div className="relative">
            <input
              type="text"
              value={referralCode}
              disabled
              className="w-full pl-3 pr-4 py-3 border border-input rounded-lg 
                         bg-background text-foreground 
                         placeholder:text-muted-foreground 
                         focus:outline-none cursor-not-allowed opacity-70"
            />
          </div>
        </div>
      )}

        {/* Submit button */}
     
        <Button
          onClick={() => (!isSignUp ? onSignUp() : onSignIn())}
          className="w-full"
          size="touch"
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {!isSignUp ? "Create Account" : "Sign In"}
        </Button>
      </div>

      {/* Social login section */}
      <div className="pt-6">
        
          <div className="relative flex items-center">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="px-3 text-muted-foreground text-sm">
            Or continue with
          </span>
          <span className="flex-grow border-t border-gray-300"></span>
        </div>
        {!isSignUp && 
        <Button onClick={() => handleGoogleAuth()} className="w-full mt-4" variant="outline">
          Continue with Google
        </Button>}
      </div>

      {/* Bottom switch button */}
      <div className="mt-6 text-center">
        <Button
          onClick={() => dispatch(setIsSignUp(!isSignUp))}
          variant="link"
          className="text-sm"
        >
          {!isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;

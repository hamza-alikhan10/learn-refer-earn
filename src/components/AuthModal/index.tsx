// src/components/AuthModal/index.tsx
import React , {useEffect} from "react";
import { X, User, Mail } from "lucide-react";
import { Button } from "../ui/button";
import AuthForm from "./AuthForm";
import OtpVerification from "./OtpVerification";
import useAuthModal from "./useAuthModal";
import { setIsAuthModelOpen } from "@/ReduxStore/features/slices/auth";
import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { useToast } from "@/hooks/use-toast";

type Props = {
  onClose?: () => void;
  onAuth?: (userData: any) => void;
  referralCode?: string;
};

const AuthModalContent: React.FC<Props> = () => {
  const {
    isOtpVerification,
    email,
    loading,
    error,
    handleClose,
    handleOtpVerification,
    handleSignIn,
    handleSignUp, 
    handleResendOtp,  
    formProps,
  } = useAuthModal();
  const dispatch = useAppDispatch();

  const { isSignUp, isAuthModelOpen } = useAppSelector((state) => state.auth);

  const { toast } = useToast();

  // useEffect(() => {
  //   console.log("error:", error, "email:", email);
  //   if (error === "Invalid login credentials" && (email === "")) {
  //   toast({
  //     title: "Signup Failed",
  //     description: error,
  //     variant: "destructive",
  //   });    }
  // }, [error, email]);

  if (!isAuthModelOpen) return null;


  if (isOtpVerification) {
    return (
      <OtpVerification
        email={email}
        otp={formProps.otp}
        setOtp={formProps.setOtp}
        loading={loading}
        error={error}
        onVerify={handleOtpVerification}
        onResend={handleResendOtp}
        onClose={handleClose}
      />
    );
  }

  return (
   <div onClick={() => setIsAuthModelOpen(!isAuthModelOpen)} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-border animate-scale-in">
    
    {/* Close Button */}
    <Button
      onClick={() => dispatch(setIsAuthModelOpen(!isAuthModelOpen))}
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 h-8 w-8"
    >
      <X className="w-4 h-4" />
    </Button>

    {/* Header */}
    <div className="text-center mb-6">
      <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <User className="w-8 h-8 text-primary icon-3d" />
      </div>
      <h2 className="text-2xl font-bold">{!isSignUp? 'Create Account':'Welcome Back'}</h2>
      <p className="text-gray-500">{!isSignUp ? 'Join thousands of learners' : 'Sign in to your account'}</p>
    </div>

    {/* Error Message */}
    {error && (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-4 animate-fade-in">
        {error}
      </div>
    )}


    {/* Auth Form */}
    <AuthForm
      {...formProps}
      loading={loading}
      onSignIn={formProps.onSignIn}
      onSignUp={formProps.onSignUp}
    />
  </div>
</div>

  );
};

export default AuthModalContent;

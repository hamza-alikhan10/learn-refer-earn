import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hooks";
import {useNavigate} from "react-router-dom";
import {
  setField,
  setLoading,
  setError,
  setOtpVerification,
  resetAuthState,
  setUser,
  setIsAuthModelOpen,
  setIsSignUp,
} from "@/ReduxStore/features/slices/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


export default function useAuthModal() {
  const {
    user,
    email,
    username,
    password,
    otp,
    showPassword,
    error,
    loading,
    isOtpVerification,
  } = useAppSelector((state) => state.auth);

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isAuthModelOpen} = useAppSelector((state) => state.auth);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    if (isAuthModelOpen) {
      const storedRef = sessionStorage.getItem("referralCode") || "";
      setReferralCode(storedRef);
    }
  }, [isAuthModelOpen]);

  const cleanupAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
        localStorage.removeItem(key);
      }
    });
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
        sessionStorage.removeItem(key);
      }
    });
  };


useEffect(() => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        dispatch(
          setUser({
            user: session.user.user_metadata.display_name || session.user.email,
            userId: session.user.id,
            isAuthenticated: session.user.aud,
          })
        );

        toast({
          title: "Welcome Back!",
          description: "You are signed in 🎉",
        });

        // navigate("/dashboard");
      }

      if (event === "SIGNED_OUT") {
        dispatch(resetAuthState());
      }
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, [dispatch, navigate, toast]);

const handleGoogleAuth = async () => {
  dispatch(setError(null));
  dispatch(setLoading(true));

  try {
    cleanupAuthState();

    const signInData: any = {
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    };

    if (referralCode) {
      signInData.options.queryParams = {
        referral_code: referralCode,
      };
    }

    const { error } = await supabase.auth.signInWithOAuth(signInData);
    if (error) throw error;

    // No user data here! onAuthStateChange will catch it after redirect.
  } catch (e: any) {
    dispatch(setError(e?.message || "Google sign-in failed"));
    toast({
      title: "Login Failed",
      description: e?.message || "Something went wrong with Google sign-in",
      variant: "destructive",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

  const handleForgotPassword = async () => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    dispatch(setIsAuthModelOpen(false));
    dispatch(setOtpVerification(true));
  };
  
const handleSignUp = async () => {
  // Reset error and set loading
  dispatch(setError(null));
  dispatch(setLoading(true));

  // --- Validation ---
  if (!email || !password || !username) {
    dispatch(setError("Please fill in all fields"));
    toast({
      title: "Signup Failed",
      description: "Please fill in all fields before continuing.",
      variant: "destructive",
    });
    dispatch(setLoading(false));
    return;
  }

  if (!email.includes("@")) {
    dispatch(setError("Please enter a valid email address"));
    toast({
      title: "Signup Failed",
      description: "Please enter a valid email address.",
      variant: "destructive",
    });
    dispatch(setLoading(false));
    return;
  }

  if (password.length < 6) {
    dispatch(setError("Password must be at least 6 characters"));
    toast({
      title: "Signup Failed",
      description: "Password must be at least 6 characters long.",
      variant: "destructive",
    });
    dispatch(setLoading(false));
    return;
  }

  try {
    cleanupAuthState();

    // Build sign up payload
    const signUpData: any = {
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          display_name: username,
        },
      },
    };

    // Add referral_code only if not empty
    if (referralCode.trim() !== "") {
      signUpData.options.data.referral_code = referralCode.trim();
    }

    const { data, error } = await supabase.auth.signUp(signUpData);

    console.log("SignUp Data:", data);

    if (error) throw error;
    
    if (data.user) {
      // Save user in Redux
    dispatch(
      setUser({
        user: data?.user?.user_metadata.display_name || data.user.user_metadata.email,                     // full user object
        userId: data.user?.id || null,       // extract userId safely
        isAuthenticated: data.user?.aud,        // true if user exists
      })
    );

      toast({
        title: "Account Created!",
        description: "Welcome to AffiliateHub 🎉 ",
      });

      dispatch(setIsAuthModelOpen(!isAuthModelOpen))

      //  Clear password after signup (security best practice)
      dispatch(setField({ key: "password", value: "" }));
      navigate("/course-page");
    }
  } catch (e: any) {
    const message = e?.message || "An error occurred during signup";
    dispatch(setError(message));

    toast({
      title: "Signup Failed",
      description: message,
      variant: "destructive",
    });
  } finally {
    dispatch(setLoading(false));
  }
};



  const handleSignIn = async () => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    // if (!email || !password) {
      // dispatch(setError("Please fill in all fields"));
      // dispatch(setLoading(false));
    //   return;
    // }
      if (!email || !password) {
    dispatch(setError("Please fill in all fields"));
    toast({
      title: "Signup Failed",
      description: "Please fill in all fields before continuing.",
      variant: "destructive",
    });
    dispatch(setLoading(false));
    return;
  }

  if (!email.includes("@")) {
    dispatch(setError("Please enter a valid email address"));
    toast({
      title: "Signup Failed",
      description: "Please enter a valid email address.",
      variant: "destructive",
    });
    dispatch(setLoading(false));
    return;
  }

  if (password.length < 6) {
    dispatch(setError("Password must be at least 6 characters"));
    toast({
      title: "Signup Failed",
      description: "Password must be at least 6 characters long.",
      variant: "destructive",
    });
    dispatch(setLoading(false));
    return;
  }

    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: "global" });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
      dispatch(
        setUser({
          user: data.user?.user_metadata?.display_name || data.user?.email ,                     // full user object
          userId: data.user?.id || null,       // extract userId safely
          isAuthenticated: data.user?.aud,        // true if user exists
        })
      ); 
       toast({
          title: "Welcome back!",
          description: "Redirecting...",
        });
      }
    } catch (e: any) {
      dispatch(setError(e?.message || "Invalid login"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpVerification = async () => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    if (!otp) {
      dispatch(setError("Please enter the verification code"));
      dispatch(setLoading(false));
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });

      if (error) throw error;

      if (data.user) {
      dispatch(
        setUser({
          user: data.user?.user_metadata?.display_name || data.user?.email ,                     // full user object
          userId: data.user?.id || null,       // extract userId safely
          isAuthenticated: data.user?.aud,        // true if user exists
        })
      );
      
      toast({
          title: "Account verified!",
          description: "Welcome!",
        });
        window.location.href = "/";
      }
    } catch (e: any) {
      dispatch(setError(e?.message || "Invalid verification code"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClose = () => {
    dispatch(resetAuthState());
  };

  const handleLogout = async () => {

    try {
      // Clear Supabase local storage keys
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
          localStorage.removeItem(key);
        }
      });

      // Supabase sign out
      await supabase.auth.signOut({ scope: "global" });

      // Reset redux auth state
      dispatch(resetAuthState());
      dispatch(setIsSignUp(true));

      // Show success toast
        toast({
          title: "Success",
          description: "You have been logged out successfully.",
          variant: "default",
        });

      // Redirect user
        navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);

    toast({
      title: "Logout Failed",
      description: "Something went wrong while logging out.",
      variant: "destructive",
    });
    }
  };

  return {
    isOtpVerification,
    email,
    loading,
    error,
    handleClose,
    handleOtpVerification,
    handleForgotPassword,  
    handleSignIn,
    handleSignUp,
    handleLogout,
    handleGoogleAuth,
    formProps: {
      email,
      setEmail: (v: string) => dispatch(setField({ key: "email", value: v })),
      username,
      setUsername: (v: string) =>
        dispatch(setField({ key: "username", value: v })),
      password,
      setPassword: (v: string) =>
        dispatch(setField({ key: "password", value: v })),
      otp,
      setOtp: (v: string) => dispatch(setField({ key: "otp", value: v })),
      showPassword,
      setShowPassword: (v: boolean) =>
        dispatch(setField({ key: "showPassword", value: v })),
      onSignIn: handleSignIn,
      onSignUp: handleSignUp,
    },
  };
}

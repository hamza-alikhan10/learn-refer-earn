// src/components/AuthModal/SendResetPassword.tsx
import React, { useState } from "react";
import { Mail, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Props = {
  onClose: () => void;
};

const SendResetPassword: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [sent, setSent] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSend = async () => {
    setLocalError(null);
    setSent(false);

    if (!email || !email.includes("@")) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      console.log("forget password for:", email);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // must be whitelisted in Supabase dashboard > Auth > Settings > Redirect URLs
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      console.log("Password reset response error:", error);
      if (error) throw error;

      setSent(true);

      toast({
        title: "Password reset",
        description: "If an account exists for that email, we've sent a reset link.",
      });
    } catch (e: any) {
      setLocalError(e?.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 relative shadow-2xl border border-border animate-scale-in">
        <Button
          onClick={onClose}
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
          <h2 className="text-2xl font-bold text-card-foreground">Reset your password</h2>
          <p className="text-muted-foreground mt-1">
            Enter the email address associated with your account. We'll send a link to reset your password.
          </p>
        </div>

        {(localError) && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-4 animate-fade-in">
            {localError}
          </div>
        )}

        {sent ? (
          <div className="bg-green-50 border border-green-100 text-green-800 px-4 py-3 rounded-lg mb-4 animate-fade-in">
            If an account exists for <strong>{email}</strong>, we've sent a password reset link. Please check your inbox.
          </div>
        ) : null}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="you@example.com"
              autoFocus
            />
          </div>

          <Button onClick={handleSend} className="w-full" size="touch" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Send reset link
          </Button>

          <div className="text-center">
            <Button onClick={onClose} variant="link" className="text-sm">
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendResetPassword;

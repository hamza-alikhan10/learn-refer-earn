// src/components/AuthModal/OtpVerification.tsx
import React from "react";
import { Mail, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  email: string;
  otp: string;
  setOtp: (v: string) => void;
  loading: boolean;
  error?: string;
  onVerify: () => Promise<void>;
  onResend: () => Promise<void>;
  onClose: () => void;
};

const OtpVerification: React.FC<Props> = ({ email, otp, setOtp, loading, error, onVerify, onResend, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 relative shadow-2xl border border-border animate-scale-in">
        <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8">
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary icon-3d" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">Verify Your Email</h2>
          <p className="text-muted-foreground mt-1">Enter the 6-digit code sent to {email}</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-4 animate-fade-in">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Verification Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <Button onClick={onVerify} className="w-full" size="touch" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Verify Account
          </Button>

          <div className="text-center">
            <Button onClick={onResend} variant="link" className="text-sm" disabled={loading}>
              Didn't receive code? Resend
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;

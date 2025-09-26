// src/components/WithdrawalModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { X, Check, Copy, Wallet, Smartphone, CreditCard, AlertCircle, CheckCircle2, TrendingUp, ArrowRight, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { PaymentMethod, GetPaymentMethodsResponse } from "@/ReduxStore/features/api/paymentMethods";
import { useWithdrawalViaEmailMutation } from "@/ReduxStore/features/api/dashboard";
import { useAppSelector } from "@/ReduxStore/hooks";
import { toast } from "@/components/ui/use-toast"; 

type Props = {
  payload: GetPaymentMethodsResponse;
  onClose: () => void;
};

export default function WithdrawalModal({ payload, onClose }: Props) {
  const { payment_methods, default_primary_id, available_balance } = payload;

  const defaultPrimary: PaymentMethod | undefined =
    (payment_methods ?? []).find((m) => m.id === default_primary_id) ?? payment_methods?.[0];

  const prefillVpa =
    defaultPrimary?.method_type === "upi"
      ? (defaultPrimary.account_details?.vpa ?? defaultPrimary.account_details?.upi ?? "")
      : "";

  const prefillPhone =
    defaultPrimary?.account_details?.contact ??
    (payload as any)["user_phone"] ?? 
    "";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-slate-900 rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto relative shadow-2xl border border-indigo-500/20 animate-slideUp">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 z-10 transition-all duration-200 hover:scale-110"
        >
          <X className="w-5 h-5 text-gray-300" />
        </Button>

        {/* Header Section with Gradient */}
        <div className="relative p-6 sm:p-8 pb-6 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-b border-indigo-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,70,229,0.2)_0%,transparent_50%)] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Withdraw Funds</h2>
                <p className="text-sm text-gray-400">Fast & secure UPI withdrawal</p>
              </div>
            </div>
            
            {/* Balance Display */}
            <div className="bg-slate-950/50 rounded-xl p-4 border border-indigo-500/20 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    ₹{Number(available_balance ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="bg-emerald-500/10 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <WithdrawalForm
            userId={""}
            balance={available_balance ?? 0}
            initialVpa={prefillVpa}
            initialPhone={prefillPhone}
            onClose={onClose}
          />
        </div>

        {/* Security Footer */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-indigo-300">Secure Transaction</p>
                <p className="text-xs text-gray-400 mt-1">Your withdrawal will be processed within 30 minutes. All transactions are encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= WithdrawalForm ================= */
type WFProps = {
  userId: string;
  balance: number;
  initialVpa?: string;
  initialPhone?: string;
  onClose?: () => void;
};

export function WithdrawalForm({
  userId,
  balance,
  initialVpa = "",
  initialPhone = "",
  onClose,
}: WFProps) {
  const reduxUserId = useAppSelector((s) => (s as any).auth?.userId);
  const [amount, setAmount] = useState<number | "">("");
  const [vpa, setVpa] = useState(initialVpa);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { email } = useAppSelector((state) => state.auth);
  const [withdrawalViaEmail, { isLoading: createPayoutLoading }] = useWithdrawalViaEmailMutation();

  useEffect(() => {
    setVpa(initialVpa ?? "");
    setPhone(initialPhone ?? "");
  }, [initialVpa, initialPhone]);

  function validate(): string | null {
    if (!vpa && !phone) return "Enter UPI ID or Mobile number";
    
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      return "Enter a valid 10-digit mobile number";
    }

    if (!amount || Number(amount) <= 0) return "Enter a valid amount";
    if (Number(amount) > balance) return "Insufficient balance";
    if (Number(amount) < 1) return "Minimum withdrawal is ₹1";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSuccessData(null);

    const err = validate();
    if (err) {
      setMessage(err);
      toast({
        title: "Validation Error",
        description: err,
        variant: "destructive"
      });
      return;
    }

    if (!reduxUserId) {
      setMessage("You must be logged in to withdraw.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId: reduxUserId,
        amount: Number(amount),
        email: email?.trim() || undefined,
        upiId: vpa?.trim() || undefined,
        mobileNo: phone?.trim() || undefined,
      };

      if (!payload.upiId) {
        setMessage("UPI ID is required.");
        setLoading(false);
        return;
      }

      const res = await withdrawalViaEmail(payload).unwrap();

      if (res?.ok) {
        setSuccessData(res);
        toast({
          title: "Withdrawal Successful! 🎉",
          description: `₹${amount} will arrive in your account within 30 minutes.`,
          variant: "default",
        });
        setTimeout(() => onClose?.(), 1500);
      } else {
        setMessage("Withdrawal failed: unknown response.");
      }

    } catch (e: any) {
      console.error("withdrawalViaEmail error", e);
      const errMsg =
        (e?.data as any)?.error ??
        (e?.data as any)?.message ??
        e?.message ??
        "Withdrawal failed. Try again.";

      setMessage(String(errMsg));
      toast({
        title: "Withdrawal Failed",
        description: String(errMsg),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCopyVpa = async () => {
    if (!vpa) return;
    try {
      await navigator.clipboard.writeText(vpa);
      setCopiedVpa(true);
      setTimeout(() => setCopiedVpa(false), 2000);
      toast({
        title: "Copied!",
        description: "UPI ID copied to clipboard",
      });
    } catch {
      // ignore
    }
  };

  const handleCopyPhone = async () => {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast({
        title: "Copied!",
        description: "Mobile number copied to clipboard",
      });
    } catch {
      // ignore
    }
  };

  const quickAmounts = [100, 500, 1000, balance];

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* UPI ID Input */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <CreditCard className="w-4 h-4 text-indigo-400" />
          UPI ID <span className="text-red-400">*</span>
        </label>
        <div className="relative group">
          <input
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
            placeholder="yourname@paytm"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 outline-none"
          />
          <button
            type="button"
            onClick={handleCopyVpa}
            disabled={!vpa}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            {copiedVpa ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1.5">Enter your UPI ID (e.g., 9876543210@paytm)</p>
      </div>

      {/* Mobile Number Input */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Smartphone className="w-4 h-4 text-purple-400" />
          Mobile Number <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <div className="relative group">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            maxLength={10}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none"
          />
          <button
            type="button"
            onClick={handleCopyPhone}
            disabled={!phone}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1.5">For verification purposes</p>
      </div>

      {/* Amount Input */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Wallet className="w-4 h-4 text-emerald-400" />
          Withdrawal Amount (₹) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            min={1}
            step={1}
            placeholder="Enter amount"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-gray-200 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none"
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-xs text-gray-500">
            Available: <span className="text-emerald-400 font-semibold">₹{Number(balance ?? 0).toFixed(2)}</span>
          </p>
          <button
            type="button"
            onClick={() => setAmount(balance)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Use Max
          </button>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {quickAmounts.map((amt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setAmount(amt)}
              disabled={amt > balance}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-gray-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {idx === quickAmounts.length - 1 ? 'Max' : `₹${amt}`}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {message && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-slideDown">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-400 flex-1">{message}</p>
        </div>
      )}

      {/* Success Message */}
      {successData && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-slideDown">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-400">Withdrawal Successful!</p>
            <p className="text-xs text-gray-400 mt-1">Your money will arrive shortly</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          disabled={loading}
          type="submit"
          className="flex-1 group relative px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/50"
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Withdraw to UPI
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onClose?.()}
          disabled={loading}
          className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>

      {/* Processing Info */}
      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Processing time: 5-30 minutes</span>
      </div>
    </form>
  );
}
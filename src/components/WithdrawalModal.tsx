// src/components/WithdrawalModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { PaymentMethod, GetPaymentMethodsResponse } from "@/ReduxStore/features/api/paymentMethods";
import { useWithdrawalViaEmailMutation } from "@/ReduxStore/features/api/dashboard";
import { useAppSelector } from "@/ReduxStore/hooks";
import { toast } from "@/components/ui/use-toast"; 

// import { useCreatePayoutMutation } from "@/ReduxStore/features/api/payoutApi";

type Props = {
  payload: GetPaymentMethodsResponse;
  onClose: () => void;
};

export default function WithdrawalModal({ payload, onClose }: Props) {
  const { payment_methods, default_primary_id, available_balance } = payload;

  // choose default primary from payload if present
  const defaultPrimary: PaymentMethod | undefined =
    (payment_methods ?? []).find((m) => m.id === default_primary_id) ?? payment_methods?.[0];

  const prefillVpa =
    defaultPrimary?.method_type === "upi"
      ? (defaultPrimary.account_details?.vpa ?? defaultPrimary.account_details?.upi ?? "")
      : "";

  const prefillPhone =
    defaultPrimary?.account_details?.contact ??
    (payload as any)["user_phone"] ?? // in case payload contains user_phone
    "";

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
          <h2 className="text-2xl font-bold text-card-foreground">Withdraw Funds</h2>
          <p className="text-muted-foreground mt-2">
            Available balance:{" "}
            <span className="font-bold text-success">₹{Number(available_balance ?? 0).toFixed(2)}</span>
          </p>
        </div>

        <div className="space-y-6">
          <WithdrawalForm
            userId={"" /* not required; we'll read from redux inside form */}
            balance={available_balance ?? 0}
            initialVpa={prefillVpa}
            initialPhone={prefillPhone}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= WithdrawalForm ================= */
type WFProps = {
  userId: string; // unused; kept for backwards compat
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
  const [copied, setCopied] = useState(false);


  // const [createPayout, { isLoading: createPayoutLoading }] = useCreatePayoutMutation();
  const { email } = useAppSelector((state) => state.auth);
  const [withdrawalViaEmail, { isLoading: createPayoutLoading, isError, error, isSuccess }] = useWithdrawalViaEmailMutation();
 console.log(" user Email is ", email);
  useEffect(() => {
    // update fields if initial props change
    setVpa(initialVpa ?? "");
    setPhone(initialPhone ?? "");
  }, [initialVpa, initialPhone]);

  function validate(): string | null {
    if (!vpa && !phone) return "Enter UPI ID or Mobile number";
    
    // Validate mobile number if entered
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
      return;
    }

    if (!reduxUserId) {
      setMessage("You must be logged in to withdraw.");
      return;
    }

    setLoading(true);
    try {
      // Prepare payload for withdrawalViaEmail
      const payload = {
        userId: reduxUserId,
        amount: Number(amount),
        email: email?.trim() || undefined,
        upiId: vpa?.trim() || undefined,
        mobileNo: phone?.trim() || undefined,
      };

      if (!payload.upiId) {
        setMessage("UPI ID is required.");
        return;
      }
      // Call the RTK mutation
      const res = await withdrawalViaEmail(payload).unwrap();

      if (res?.ok) {
        setSuccessData(res);
        toast({
          title: "Withdrawal Successful",
          description: `Your withdrawal of ₹${amount} was successful. Money 💸 will arrive in your account 🏦 within 30 minutes.`,
          variant: "default", // green toast
        });
        // optionally close modal after short delay
        onClose();

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
    } finally {
      setLoading(false);
    }
  }

  const handleCopyVpa = async () => {
    if (!vpa) return;
    try {
      await navigator.clipboard.writeText(vpa);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium">UPI ID </label>
        <div className="flex items-center mt-1">
          <input
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
            placeholder="alice@okbank"
            className="flex-1 block w-full border rounded p-2"
          />
          <button
            type="button"
            onClick={handleCopyVpa}
            className="ml-2 px-3 py-2 bg-gray-100 rounded"
          >
            {copied ? <Check className="w-4 h-4" /> : "Copy"}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Mobile number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile number (optional)"
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          min={1}
          step={1}
          className="mt-1 block w-full border rounded p-2"
        />
        <p className="text-xs text-gray-500 mt-1">Available: ₹{Number(balance ?? 0).toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <button
          disabled={loading}
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Withdraw to UPI"}
        </button>
        <button
          type="button"
          onClick={() => onClose?.()}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>

      {message && (
        <div className="mt-2 p-2 rounded bg-gray-100 text-sm">
          {message}
        </div>
      )}
    </form>
  );
}

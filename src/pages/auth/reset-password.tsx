import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Check } from "lucide-react";

export default function ResetPasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Simple strength heuristic: returns score 0..4
  const passwordScore = (pw: string) => {
    let score = 0;
    // length threshold lowered to 6 to match login page requirement
    if (pw.length >= 6) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordScore(newPassword);

useEffect(() => {
  let unsubFn: (() => void) | null = null;

  const init = async () => {
    try {
      console.log('[reset] loaded, href:', window.location.href);
      const rawHash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
      const params = new URLSearchParams(rawHash);

      // 1) handle fragment error directly (otp_expired etc)
      const err = params.get('error');
      const errCode = params.get('error_code');
      const errDesc = params.get('error_description');
      if (err) {
        console.warn('[reset] fragment error', { err, errCode, errDesc });
        if (errCode === 'otp_expired') {
          setError('This reset link has expired. Please request a new password reset.');
        } else {
          setError(errDesc ? decodeURIComponent(errDesc) : 'Access denied for this reset link.');
        }
        // clear hash (safety) but keep it optional during debugging
        // window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        return;
      }

      // 2) If SDK helper exists, call it (preferred)
      const authAny = supabase.auth as any;
      if (typeof authAny.getSessionFromUrl === 'function') {
        console.log('[reset] calling getSessionFromUrl()');
        const res = await authAny.getSessionFromUrl({ storeSession: true });
        console.log('[reset] getSessionFromUrl res:', res);
        if (res?.error) {
          setError(res.error.message || 'Invalid or expired recovery link. Please request a new password reset.');
          return;
        }
        // check session
        const sessionCandidate = res?.data?.session ?? res?.session ?? null;
        if (sessionCandidate) {
          // success
          setReady(true);
          // clear hash for safety
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          return;
        }
      }

      // 3) Fallback: parse access & refresh tokens manually and try to set session
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      const type = params.get('type'); // should be "recovery"

      if (access_token && refresh_token) {
        console.log('[reset] found tokens in fragment, attempting to set session', { type });

        // Try v2 method: supabase.auth.setSession({ access_token, refresh_token })
        if (typeof supabase.auth.setSession === 'function') {
          const setRes = await (supabase.auth as any).setSession({ access_token, refresh_token });
          console.log('[reset] setSession result:', setRes);
          if (setRes?.error) {
            setError(setRes.error.message || 'Failed to set session from token.');
            return;
          }
          // success
          setReady(true);
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          return;
        }

        // Try other possible fallback: some SDKs provide setAuth or similar
        if (typeof (supabase.auth as any).setAuth === 'function') {
          try {
            (supabase.auth as any).setAuth(access_token);
            // Some SDKs do not persist refresh token; try reading session
            const s = await (supabase.auth as any).getSession?.();
            console.log('[reset] after setAuth getSession:', s);
            // assume ready if no error
            setReady(true);
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
            return;
          } catch (e) {
            console.warn('[reset] setAuth failed', e);
          }
        }

        // If we've reached here, no suitable API was available
        console.warn('[reset] no API available to set session programmatically on this SDK version.');
        setError('This client is missing the helper to complete recovery automatically. Please request a new reset (or upgrade the client).');
        return;
      }

      // 4) Final fallback: subscribe to auth events in case the SDK handles the fragment earlier
      const subscription = supabase.auth.onAuthStateChange((event, session) => {
        console.log('[reset] onAuthStateChange', { event, session });
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          setReady(true);
        }
      });

      if (subscription && subscription.data && subscription.data.subscription && typeof subscription.data.subscription.unsubscribe === 'function') {
        unsubFn = () => subscription.data.subscription.unsubscribe();
      } else if (typeof subscription === 'function') {
        unsubFn = subscription;
      } else if (subscription && typeof (subscription as any).unsubscribe === 'function') {
        unsubFn = () => (subscription as any).unsubscribe();
      } else {
        unsubFn = null;
      }

      // log final state
      console.log('[reset] finished init, hash now:', window.location.hash, 'href now:', window.location.href);
    } catch (e: any) {
      console.error('[reset] init exception:', e);
      setError('Unable to process the recovery link. Try again or request a new reset.');
    }
  };

  init();

  return () => {
    if (unsubFn) {
      try {
        unsubFn();
      } catch (e) {
        console.warn('[reset] unsubscribe error', e);
      }
    }
  };
}, []);


  const validate = () => {
    if (!newPassword) {
      setError("Please enter a new password.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    // Enforce minimum length of 6 to match login page logic
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    setError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast({ title: "Password updated", description: "You can now sign in with your new password." });
      // give the user a moment to read toast then redirect
      navigate('/');
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to update password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center shadow-lg">
          <h2 className="text-xl font-bold text-rose-400 mb-2">Reset link problem</h2>
          <p className="text-sm text-slate-300 mb-4">{error}</p>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
            onClick={() => navigate('/')}
          >
            Request a new reset link
          </button>
        </div>
      </div>
    );

  if (!ready)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-sm w-full text-center">
          <div className="animate-pulse inline-block p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">Verifying recovery link...</h3>
            <p className="text-sm text-slate-400 mt-2">Please wait — we are validating the link from your email.</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-12">
      <div className="w-full max-w-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Set a new password</h1>
            <p className="text-sm text-slate-400">Create a secure password for your account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <span className="text-sm text-slate-300">New password</span>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="New password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-700/40 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-slate-300" /> : <Eye className="w-5 h-5 text-slate-300" />}
              </button>
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Confirm password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Confirm password"
            />
          </label>

          {/* Strength meter */}
          <div className="mt-1">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">Password strength</p>
              <p className="text-xs font-medium text-slate-300">{["Very weak", "Weak", "Okay", "Good", "Strong"][strength]}</p>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                style={{ width: `${(strength / 4) * 100}%` }}
                className={`h-2 transition-all ${
                  strength <= 1
                    ? "bg-rose-500"
                    : strength === 2
                    ? "bg-amber-400"
                    : strength === 3
                    ? "bg-lime-400"
                    : "bg-emerald-400"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save new password"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 border border-slate-700 text-slate-300 hover:bg-slate-800/50 transition"
            >
              Back to sign in
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2">Tip: Use a passphrase or mix upper/lowercase, numbers and symbols for stronger passwords.</p>
        </div>
      </div>
    </div>
  );
}

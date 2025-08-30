// create-payout.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") ?? "";
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";
const RAZORPAY_X_ACCOUNT = Deno.env.get("RAZORPAY_X_ACCOUNT_NUMBER") ?? "";
const MIN_WITHDRAWAL = Number(Deno.env.get("MIN_WITHDRAWAL_RUPEES") ?? 1);

// helpers
function paiseFromRupees(r: number) { return Math.round(r * 100); }
function base64Auth() { return `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`; }

/**
 * Try to extract a numeric fee (in paise) from various possible Razorpay shapes.
 * If not present, returns 0.
 */
function extractFeePaise(rpJson: any): number {
  if (!rpJson) return 0;
  // Common possibilities - try them in order
  const candidates = [
    rpJson.fee,
    rpJson.fees && rpJson.fees.amount,
    rpJson.fees && rpJson.fees.fee,
    rpJson.charges && rpJson.charges.amount,
    rpJson.charges && rpJson.charges.fee,
    rpJson.processing_fee, // unlikely but check
    rpJson.processing_fee_paise,
  ];
  for (const c of candidates) {
    if (typeof c === "number" && !Number.isNaN(c)) return Number(c);
  }
  return 0;
}

serve(async (req) => {
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: { ...corsHeaders(req) } });
    }

    const body = await req.json().catch(() => ({}));
    // Client will send: { userId, amount, vpa?, phone? } (you may add payment_method_id later)
    const { userId, amount, vpa: clientVpa, phone: clientPhone } = body ?? {};

    if (!userId || !Number.isFinite(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid payload: userId and positive amount required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) }
      });
    }

    if (amount < MIN_WITHDRAWAL) {
      return new Response(JSON.stringify({ error: `Minimum withdrawal is ₹${MIN_WITHDRAWAL}` }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) }
      });
    }

    // 1) Read profile.available_balance and a few fields for payout contact
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("available_balance, user_id, display_name, phone")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileErr) {
      console.error("create-payout: profileErr", profileErr);
      return new Response(JSON.stringify({ error: "Failed to read profile" }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(req) } });
    }

    const available = Number(profile?.available_balance ?? 0);
    if (available < amount) {
      return new Response(JSON.stringify({ error: "Insufficient balance" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) }
      });
    }

    // 2) Resolve UPI: prefer client-supplied (clientVpa), else pick user's primary UPI method
    let resolvedVpa: string | null = clientVpa ?? null;
    let resolvedContact: string | undefined = clientPhone ?? undefined;
    let resolvedPaymentDetails: any = null;
    let resolvedMethodType = "upi";

    if (!resolvedVpa) {
      // find primary upi in user_payment_methods
      const { data: primaryMethod, error: pmErr } = await supabase
        .from("user_payment_methods")
        .select("id, method_type, account_details, is_primary")
        .eq("user_id", userId)
        .eq("is_primary", true)
        .eq("method_type", "upi")
        .limit(1)
        .maybeSingle();

      if (pmErr) {
        console.error("create-payout: primary method lookup error", pmErr);
      } else if (primaryMethod) {
        resolvedMethodType = primaryMethod.method_type ?? "upi";
        resolvedPaymentDetails = primaryMethod.account_details ?? null;
        resolvedVpa = primaryMethod.account_details?.vpa ?? primaryMethod.account_details?.upi ?? null;
        resolvedContact = resolvedContact ?? primaryMethod.account_details?.contact ?? undefined;
      }
    } else {
      // client provided vpa -> use it
      resolvedPaymentDetails = { vpa: resolvedVpa, contact: resolvedContact ?? profile?.phone ?? null };
    }

    if (!resolvedVpa) {
      return new Response(JSON.stringify({ error: "No UPI ID provided. Please enter a UPI ID or select a saved UPI method." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) }
      });
    }

    // 3) Build payout payload for Razorpay (UPI)
    const payoutPayload: any = {
      account_number: RAZORPAY_X_ACCOUNT,
      amount: paiseFromRupees(Number(amount)), // paise
      currency: "INR",
      mode: "UPI",
      purpose: "payout",
      fund_account: {
        account_type: "vpa",
        vpa: { address: resolvedVpa },
        contact: {
          name: resolvedPaymentDetails?.name ?? profile?.display_name ?? `user_${userId}`,
          email: resolvedPaymentDetails?.email ?? undefined,
          contact: resolvedPaymentDetails?.contact ?? resolvedContact ?? profile?.phone ?? undefined,
          type: "customer",
          reference_id: String(userId)
        }
      },
      queue_if_low_balance: false,
      reference_id: `withdrawal_req_${crypto.randomUUID()}`,
      narration: `Withdrawal for user ${userId}`,
      notes: { requested_by: userId }
    };

    // 4) Call Razorpay payouts API
    const idempotencyKey = crypto.randomUUID();
    const rpResp = await fetch("https://api.razorpay.com/v1/payouts", {
      method: "POST",
      headers: {
        Authorization: base64Auth(),
        "Content-Type": "application/json",
        "X-Payout-Idempotency": idempotencyKey
      },
      body: JSON.stringify(payoutPayload)
    });

    const rpJson = await rpResp.json().catch(() => ({}));

    if (!rpResp.ok) {
      console.error("create-payout: razorpay error", rpJson);
      // Do not change DB: return error and let client show message
      return new Response(JSON.stringify({ error: "Payout failed", details: rpJson }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) }
      });
    }

    // 5) Payout succeeded - extract fees (paise) and compute rupees
    const feePaise = extractFeePaise(rpJson); // paise
    const processing_fee_rupees = feePaise ? Number(feePaise) / 100 : 0;
    const net_amount = Math.round(((Number(amount) - processing_fee_rupees) + Number.EPSILON) * 100) / 100;

    // 6) Insert withdrawal row (with raw gateway response in bank_details)
    const nowIso = new Date().toISOString();
    const processedAtIso = rpJson?.created_at ? new Date(Number(rpJson.created_at) * 1000).toISOString() : nowIso;

    const { data: inserted, error: insertErr } = await supabase
      .from("withdrawals")
      .insert({
        user_id: userId,
        amount: Number(amount),
        payment_method: resolvedMethodType,
        payment_details: resolvedPaymentDetails ?? { vpa: resolvedVpa, contact: resolvedContact ?? profile?.phone ?? null },
        status: rpJson?.status ?? "processing",
        requested_at: nowIso,
        processed_at: processedAtIso,
        bank_details: rpJson,
        upi_id: resolvedVpa ?? null,
        processing_fee: processing_fee_rupees,
        net_amount: net_amount
      })
      .select()
      .single();

    if (insertErr || !inserted) {
      console.error("create-payout: insert withdrawal failed", insertErr);
      // Payout already went through - return payout info and indicate DB failure so you can reconcile
      return new Response(JSON.stringify({
        error: "Payout succeeded but failed to record withdrawal in DB. Manual reconciliation required.",
        payout: rpJson,
        dbError: insertErr?.message ?? insertErr
      }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) }
      });
    }

    // 7) Deduct available_balance from profiles AFTER successful payout & insertion
    const newBalance = Math.round(((available - Number(amount)) + Number.EPSILON) * 100) / 100;
    const { error: balErr } = await supabase
      .from("profiles")
      .update({ available_balance: newBalance })
      .eq("user_id", userId);

    if (balErr) {
      console.error("create-payout: failed updating profile balance", balErr);
      // Not fatal to client: we return success but log for reconciliation
    }

    // 8) Return created withdrawal + raw payout result
    return new Response(JSON.stringify({
      success: true,
      withdrawal: inserted,
      payout: rpJson,
      new_available_balance: newBalance
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) }
    });

  } catch (err: any) {
    console.error("create-payout error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) }
    });
  }
});


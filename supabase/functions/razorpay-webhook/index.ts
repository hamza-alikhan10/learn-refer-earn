// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

async function hmacSHA256Hex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(sig);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req: Request) => {
  // handle preflight OPTIONS request first (keeps same header configuration)
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          "Content-Type": "text/plain",
          ...corsHeaders(req),
        },
      });
    }

    const webhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? "";
    const signature = req.headers.get("x-razorpay-signature") ?? "";

    // Use raw body for exact signature match
    const raw = await req.text();

    // Verify signature on raw payload
    const expected = await hmacSHA256Hex(raw, webhookSecret);
    if (expected !== signature) {
      console.warn("Invalid webhook signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const body = JSON.parse(raw);
    const event = body.event as string;

    // Entities we expect
    const payment = body.payload?.payment?.entity;
    const refund = body.payload?.refund?.entity;

    // PAYMENT CAPTURED: update tx, create enrollment (idempotent)
    if (event === "payment.captured" && payment) {
      const order_id = payment.order_id as string;
      const amountPaise = payment.amount as number; // paise
      const method = payment.method as string | undefined;
      const payId = payment.id as string;

      // 1) Update transaction row by razorpay_order_id (idempotent + defensive)
      const { data: tx, error: updErr } = await supabase
        .from("payment_transactions")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          razorpay_payment_id: payId,
          payment_method: method ?? "razorpay",
        })
        .eq("razorpay_order_id", order_id)
        .select()
        .maybeSingle(); // defensive: won't throw if not found

      if (updErr) {
        console.error("Error updating payment_transactions:", updErr);
        // Let provider retry by returning 500
        return new Response(JSON.stringify({ error: "db update error" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }

      if (!tx) {
        console.warn("Transaction not found for razorpay_order_id:", order_id, "paymentId:", payId);
        // Return 404 so you can be alerted & provider may retry
        return new Response(JSON.stringify({ error: "transaction not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }

      // 2) Idempotent enrollment: check first, then insert
      const { data: existing } = await supabase
        .from("course_enrollments")
        .select("id")
        .eq("user_id", tx.user_id)
        .eq("course_id", tx.course_id)
        .maybeSingle();

      if (!existing) {
        const priceRupees = (amountPaise ?? 0) / 100;
        const { data: enrollment, error: enrollErr } = await supabase
          .from("course_enrollments")
          .insert({
            user_id: tx.user_id,
            course_id: tx.course_id,
            purchase_price: priceRupees,
          })
          .select()
          .maybeSingle(); // defensive: use maybeSingle to handle constraint behavior

        if (enrollErr) {
          console.error("Enrollment insert error:", enrollErr);
          // Return 500 so webhook can be retried
          return new Response(JSON.stringify({ error: "enrollment error" }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders(req) },
          });
        }

        // 3) Referral processing (best-effort, don't break webhook on error)
        try {
          if (enrollment?.id) {
            await supabase.rpc("process_referral_earnings", { enrollment_id: enrollment.id });
          } else {
            // If enrollment is somehow missing but no error, log for investigation
            console.warn("Enrollment missing after insert, skipping referral RPC", { txId: tx.id });
          }
        } catch (rpcErr) {
          console.error("Referral RPC error (non-fatal):", rpcErr);
          // Do not fail the webhook for referral failure - log and continue
        }
      } else {
        // Already enrolled — idempotent path
        console.info("User already enrolled, skipping insert", { user: tx.user_id, course: tx.course_id });
      }
    }

    // PAYMENT FAILED: update transaction status defensively
    if (event === "payment.failed" && payment) {
      const order_id = payment.order_id as string;
      const method = payment.method as string | undefined;

      const { error: failErr } = await supabase
        .from("payment_transactions")
        .update({ status: "failed", payment_method: method ?? "razorpay" })
        .eq("razorpay_order_id", order_id);

      if (failErr) {
        console.error("Error updating failed status:", failErr);
        return new Response(JSON.stringify({ error: "db update error" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }
    }

    // REFUNDS: handle if refund entity present (best-effort; no logic skipped)
    if (event === "refund.processed" && refund) {
      // If you store refund mapping, update status; kept as comment because your logic may vary
      try {
        // Example (uncomment if desired):
        // await supabase.from("payment_transactions").update({ status: 'refunded' })
        //   .eq('razorpay_payment_id', refund.payment_id);
      } catch (refundErr) {
        console.error("Refund processing error (non-fatal):", refundErr);
      }
    }

    // success response with same headers and content-type
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err: any) {
    console.error("Webhook handler error:", err);
    return new Response(JSON.stringify({ error: err.message ?? "Unknown error" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});


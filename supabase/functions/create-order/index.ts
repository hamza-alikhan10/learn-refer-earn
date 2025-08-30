// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno import
import Razorpay from "razorpay";
// import your CORS helpers
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

type CreateOrderBody = {
  userId: string;
  courseId: string;
  amount: number; // rupees
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const razorpay = new Razorpay({
  key_id: Deno.env.get("RAZORPAY_KEY_ID")!,
  key_secret: Deno.env.get("RAZORPAY_KEY_SECRET")!,
});

serve(async (req) => {
  // handle preflight OPTIONS request first
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

    const { userId, courseId, amount }: CreateOrderBody = await req.json();

    if (!userId || !courseId || !Number.isFinite(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req),
        },
      });
    }

    // 1) Create pending transaction (rupees)
    const { data: tx, error: txErr } = await supabase
      .from("payment_transactions")
      .insert({
        user_id: userId,
        course_id: courseId,
        amount, // rupees
        currency: "INR",
        status: "pending",
        gateway: "razorpay",
      })
      .select()
      .single();

    if (txErr || !tx) throw txErr;

    // 2) Create Razorpay order (paise)
    const amountPaise = Math.round(amount * 100);
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: tx.id, // map back to our tx row
    });

    // 3) Store Razorpay order id for robust reconciliation
    const { error: updErr } = await supabase
      .from("payment_transactions")
      .update({ razorpay_order_id: order.id })
      .eq("id", tx.id);

    if (updErr) throw updErr;

    return new Response(
      JSON.stringify({
        id: order.id,
        amount: order.amount, // paise
        currency: order.currency, // 'INR'
        receipt: order.receipt, // tx.id
        key_id: Deno.env.get("RAZORPAY_KEY_ID"),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req),
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message ?? "Unknown error" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(req),
      },
    });
  }
});


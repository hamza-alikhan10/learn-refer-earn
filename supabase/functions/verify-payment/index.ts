// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import your CORS helpers
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

type VerifyBody = {
  userId: string;
  courseId: string;
  amount: number; // rupees (informational)
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
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

    const {
      userId,
      courseId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: VerifyBody = await req.json();

    if (
      !userId ||
      !courseId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return new Response(
        JSON.stringify({ status: "failed", reason: "Invalid payload" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(req),
          },
        }
      );
    }

    // 1) Verify signature
    const secret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const expected = await hmacSHA256Hex(
      `${razorpay_order_id}|${razorpay_payment_id}`,
      secret
    );

    if (expected !== razorpay_signature) {
      return new Response(
        JSON.stringify({ status: "failed", reason: "Bad signature" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(req),
          },
        }
      );
    }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(req),
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: "failed", reason: err.message ?? "Unknown error" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req),
        },
      }
    );
  }
});


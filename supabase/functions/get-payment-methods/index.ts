// /edge-functions/get-payment-methods.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders, handleCors } from "../_shared/cors.ts";


serve(async (req) => {
  // Handle preflight OPTIONS
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    // Only allow POST now (userId comes in body)
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { "Content-Type": "text/plain", ...corsHeaders(req) },
      });
    }

    // Parse body safely
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const userId = (body as any).userId;
    if (!userId || typeof userId !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // 1) Get payment methods for user
    const { data: methods, error: methodsErr } = await supabase
      .from("user_payment_methods")
      .select("id, method_type, account_details, is_verified, is_primary, created_at")
      .eq("user_id", userId)
      .order("is_primary", { ascending: false }) // primary first
      .order("created_at", { ascending: true });

    if (methodsErr) {
      console.error("get-payment-methods: methodsErr", methodsErr);
      return new Response(JSON.stringify({ error: "Failed to fetch payment methods" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // 2) Get available_balance from profiles
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("available_balance, user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileErr) {
      console.error("get-payment-methods: profileErr", profileErr);
      // continue — profile may be missing; we will default available_balance to 0
    }

    // Determine defaultPrimaryId (server-side fallback)
    let defaultPrimaryId: string | null = null;
    if (Array.isArray(methods) && methods.length > 0) {
      const foundPrimary = methods.find((m: any) => m.is_primary);
      defaultPrimaryId = foundPrimary ? foundPrimary.id : (methods[0] as any).id;
    }

    const payload = {
      payment_methods: methods ?? [],
      default_primary_id: defaultPrimaryId,
      available_balance: profile?.available_balance ?? 0,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err: any) {
    console.error("get-payment-methods error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});


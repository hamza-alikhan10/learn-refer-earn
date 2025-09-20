// functions/history.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

serve(async (req) => {
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    const url = new URL(req.url);
    const pathname = url.pathname || "/";
    const parts = pathname.split("/").filter(Boolean); // e.g. ["history","<userId>"]

    // Validate route
    if (parts.length < 2 || parts[0] !== "history") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const userId = parts[1];

    if (req.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // Call the RPC that returns the last-30-days history JSON
    const { data, error } = await supabaseAdmin.rpc("get_referral_history_last_30_days", {
      p_user_id: userId,
    });

    if (error) {
      console.error("RPC error get_referral_history_last_30_days:", error);
      return new Response(JSON.stringify({ error: error.message ?? error }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // RPC already returns JSONB; ensure we return JSON string
    return new Response(JSON.stringify(data ?? {}), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("history handler error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});


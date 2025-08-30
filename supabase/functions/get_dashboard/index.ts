// functions/get_dashboard.ts
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

serve(async (req) => {
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    if (req.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { "Content-Type": "text/plain", ...corsHeaders(req) },
      });
    }

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId query param" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // Call RPC that returns dashboard JSONB for the user:
    const { data, error } = await supabase.rpc("get_dashboard_for_user", {
      p_user_id: userId,
    });

    if (error) {
      console.error("RPC error get_dashboard_for_user:", error);
      return new Response(JSON.stringify({ error: error.message ?? error }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // Return the RPC result as JSON
    return new Response(JSON.stringify(data ?? {}), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("get_dashboard handler error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});


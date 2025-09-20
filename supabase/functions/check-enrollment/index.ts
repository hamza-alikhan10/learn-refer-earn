// functions/check-enrollment.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

serve(async (req) => {
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const body = await req.json().catch(() => ({}));
    const userId = (body && typeof body.userId === "string") ? body.userId.trim() : "";

    // If no userId provided, return false (per your requirement)
    if (!userId) {
      return new Response(JSON.stringify({ enrolled: false }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    // Query for any enrollment for this user
    // We only need to know existence, so limit to 1 for efficiency
    const { data, error } = await supabaseAdmin
      .from("course_enrollments")
      .select("id", { count: "exact", head: false })
      .eq("user_id", userId)
      .limit(1);

    if (error) {
      console.error("check-enrollment: supabase query error:", error);
      return new Response(JSON.stringify({ error: "Database query failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const hasEnrollment = Array.isArray(data) && data.length > 0;

    return new Response(JSON.stringify({ enrolled: !!hasEnrollment }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("check-enrollment unexpected error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});

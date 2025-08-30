// functions/referral.ts

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
  // Handle CORS
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    const url = new URL(req.url);
    const path = url.pathname; // e.g. /referral/123
    const courseId = path.split("/").pop(); // last part is courseId
    const userId = url.searchParams.get("userId");

    if (!courseId) {
      return new Response(
        JSON.stringify({ error: "Missing courseId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Missing userId" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    // Fetch course details
    const { data: course, error: courseErr } = await supabaseAdmin
      .from("courses")
      .select("id, title, description, instructor, price")
      .eq("id", courseId)
      .single();

    if (courseErr || !course) {
      return new Response(
        JSON.stringify({ error: courseErr?.message || "Course not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    // Fetch referral info for user
    const { data: profile, error: profileErr } = await supabaseAdmin
      .from("profiles")
      .select("user_id, referral_code")
      .eq("user_id", userId)
      .single();

    if (profileErr || !profile) {
      return new Response(
        JSON.stringify({ error: profileErr?.message || "Profile not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    // Response payload
    return new Response(
      JSON.stringify({
        course,
        referral: profile,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
    );
  }
});

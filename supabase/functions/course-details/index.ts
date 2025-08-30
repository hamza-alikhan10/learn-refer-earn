// functions/course.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";

// CORS helpers
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const storageBucket = "videos";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

serve(async (req) => {
  // 1. Handle preflight OPTIONS request
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get("id");
    const userId = url.searchParams.get("userId") || null;
    const path = url.pathname || "/";

    if (!courseId) {
      return new Response(JSON.stringify({ error: "Missing course id" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req),
        },
      });
    }

    // 2. Fetch public course fields
    const { data: course, error: courseErr } = await supabaseAdmin
      .from("courses")
      .select(`
        id, title, description, instructor, price, duration,
        level, rating, total_students, image_url,
        curriculum, created_at, updated_at, category
      `)
      .eq("id", courseId)
      .single();

    if (courseErr || !course) {
      return new Response(
        JSON.stringify({ error: courseErr?.message || "Course not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(req),
          },
        }
      );
    }

    // 3. Decide visitor type
    let visitorType: "public" | "logged_in" | "enrolled" = "public";
    let isEnrolled = false;

    if (userId) {
      const { data: enrollData, error: enrollErr } = await supabaseAdmin
        .from("course_enrollments")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .limit(1);

      if (!enrollErr && enrollData && enrollData.length > 0) {
        isEnrolled = true;
        visitorType = "enrolled";
      } else {
        visitorType = "logged_in";
      }
    }

    // 4. If videos requested, only allow enrolled users
    if (path.endsWith("/videos")) {
      if (!userId) {
        return new Response(JSON.stringify({ error: "Missing userId" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(req),
          },
        });
      }
      if (!isEnrolled) {
        return new Response(JSON.stringify({ error: "Not enrolled" }), {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(req),
          },
        });
      }

      const { data: courseVideosRow } = await supabaseAdmin
        .from("courses")
        .select("vedios")
        .eq("id", courseId)
        .single();

      const vedios = courseVideosRow?.vedios || [];

      const signed: Array<{ path: string; url: string }> = [];
      for (const p of vedios) {
        const { data: urlData, error: urlErr } = await supabaseAdmin.storage
          .from(storageBucket)
          .createSignedUrl(p, 60 * 60);

        if (!urlErr && urlData?.signedURL) {
          signed.push({ path: p, url: urlData.signedURL });
        }
      }

      return new Response(JSON.stringify({ videos: signed }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req),
        },
      });
    }

    // 5. Default: return course info
    return new Response(
      JSON.stringify({
        course,
        visitorType,
        isEnrolled,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req),
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(req),
      },
    });
  }
});

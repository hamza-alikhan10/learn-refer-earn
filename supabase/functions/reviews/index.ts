// functions/reviews.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

interface ReviewOut {
  id: string;
  course_id: string;
  user_id: string;
  userName?: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

serve(async (req) => {
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    const url = new URL(req.url);
    const pathname = url.pathname || "/";
    const parts = pathname.split("/").filter(Boolean); // e.g. ["reviews","<courseId>"]
    // Validate route
    if (parts.length < 2 || parts[0] !== "reviews") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const courseId = parts[1];

    if (req.method === "GET") {
      // GET /reviews/:courseId
      // 1) fetch reviews
      const { data: reviewsRows, error: reviewsErr } = await supabaseAdmin
        .from("course_reviews")
        .select("id, course_id, user_id, rating, comment, created_at")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (reviewsErr) {
        throw reviewsErr;
      }

      const reviews: ReviewOut[] = (reviewsRows ?? []).map((r: any) => ({
        id: r.id,
        course_id: r.course_id,
        user_id: r.user_id,
        rating: r.rating,
        comment: r.comment,
        created_at: r.created_at,
      }));

      // 2) fetch display_name for each user in bulk
      const userIds = Array.from(new Set(reviews.map((r) => r.user_id))).filter(Boolean);
      let profilesMap: Record<string, string> = {};
      if (userIds.length > 0) {
        const { data: profiles, error: profilesErr } = await supabaseAdmin
          .from("profiles")
          .select("user_id, display_name")
          .in("user_id", userIds);

        if (!profilesErr && profiles) {
          for (const p of profiles) {
            profilesMap[p.user_id] = p.display_name;
          }
        }
      }

      // attach userName
      const withNames = reviews.map((r) => ({
        ...r,
        userName: profilesMap[r.user_id] ?? undefined,
      }));

      const totalReviews = withNames.length;

      return new Response(
        JSON.stringify({
          reviews: withNames,
          totalReviews,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        }
      );
    }

    if (req.method === "POST") {
      // POST /reviews/:courseId
      // Body should contain: { userId, rating, comment }
      const body = await req.json().catch(() => null);
      if (!body) {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }

      const userId: string | undefined = body.userId || body.user_id;
      const ratingRaw = body.rating;
      const comment: string | null = body.comment ?? null;

      if (!userId) {
        return new Response(JSON.stringify({ error: "Missing userId" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }

      const rating = Number(ratingRaw);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return new Response(JSON.stringify({ error: "rating must be integer between 1 and 5" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }

      // 1) Insert review
      const { data: inserted, error: insertErr } = await supabaseAdmin
        .from("course_reviews")
        .insert([
          {
            course_id: courseId,
            user_id: userId,
            rating,
            comment,
          },
        ])
        .select()
        .single();

      if (insertErr) {
        // If FK or RLS or other error
        return new Response(JSON.stringify({ error: insertErr.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        });
      }

      // 2) Recalculate average rating from course_reviews for the course
      const { data: allRatings, error: ratingsErr } = await supabaseAdmin
        .from("course_reviews")
        .select("rating")
        .eq("course_id", courseId);

      if (ratingsErr) {
        // not fatal for insertion, but we should report
        return new Response(
          JSON.stringify({ error: "Inserted review but failed to recalc rating: " + ratingsErr.message }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders(req) },
          }
        );
      }

      const ratingsArr = (allRatings ?? []).map((r: any) => Number(r.rating)).filter((n) => !Number.isNaN(n));
      const totalReviews = ratingsArr.length;
      const averageRating = totalReviews === 0 ? 0 : ratingsArr.reduce((s, x) => s + x, 0) / totalReviews;
      const averageRounded = Number(averageRating.toFixed(2));

      // 3) Update courses.rating
      const { data: updatedCourse, error: updateErr } = await supabaseAdmin
        .from("courses")
        .update({ rating: averageRounded })
        .eq("id", courseId)
        .select()
        .single();

      if (updateErr) {
        // still return success for insertion but warn
        return new Response(
          JSON.stringify({
            warning: "review inserted but failed to update course rating: " + updateErr.message,
            inserted,
            averageRating: averageRounded,
            totalReviews,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders(req) },
          }
        );
      }

    return new Response(
        JSON.stringify({
            success: true,
            message: "Review submitted successfully",
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        }
    );

    }

    // Method not allowed
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});

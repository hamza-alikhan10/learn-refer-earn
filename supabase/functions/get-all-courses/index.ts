// @ts-ignore: Deno import
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// import your CORS helpers
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_ANON_KEY")
);

serve(async (req) => {
  // handle preflight OPTIONS request first
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    const url = new URL(req.url);

    // Pagination
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);
    const limit = parseInt(url.searchParams.get("limit") || "6", 10);

    // Filters & sort
    const search = url.searchParams.get("search") || null;

    // multiple categories: ?category=Web%20Dev&category=AI
    const categories = url.searchParams.getAll("category");
    const category_param = categories.length ? categories : null;

    // Price handling
    const priceMinRaw = url.searchParams.get("price_min");
    const priceMaxRaw = url.searchParams.get("price_max");
    let price_param = null;

    if (priceMinRaw !== null || priceMaxRaw !== null) {
      // range mode
      const min = priceMinRaw !== null ? Number(priceMinRaw) : null;
      const max = priceMaxRaw !== null ? Number(priceMaxRaw) : null;
      price_param = [min, max];
    } else {
      // discrete prices
      const priceList = url.searchParams
        .getAll("price")
        .map((p) => {
          const n = Number(p);
          return Number.isNaN(n) ? null : n;
        })
        .filter((n) => n !== null);
      price_param = priceList.length ? priceList : null;
    }

    const sort = url.searchParams.get("sort") || null;

    // Call the RPC with the correct param names
    const { data, error } = await supabase.rpc("get_courses_with_reviews", {
      search_param: search,
      category_param,
      price_param,
      sort_param: sort,
      offset_param: offset,
      limit_param: limit,
    });

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(req), // add CORS headers
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(req), // add CORS headers
        },
      }
    );
  }
});


export function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";

  // Allowed origins (add all your trusted client URLs here)
  const allowedOrigins = [
    "http://localhost:8080",
    "https://learn-refer.vercel.app"
  ];

  // Normalize origin before comparison
  const isAllowed = allowedOrigins.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true"
  };
}

// Utility to handle preflight requests safely
export async function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders(req)
    });
  }
  return null; // continue with your actual logic
}

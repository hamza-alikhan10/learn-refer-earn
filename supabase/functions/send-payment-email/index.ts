// functions/send-payment-email.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
const TO_EMAIL = Deno.env.get("TO_EMAIL");


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

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    }

    const body = await req.json().catch(() => ({}));
    const {
      userId,
      email: payerEmail,
      upiId,
      mobileNo,
      amount,
    } = body as {
      userId?: string;
      email?: string;
      upiId?: string;
      mobileNo?: string;
      amount?: number | string;
    };

    // Basic validation
    if (!userId || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields (userId, amount)" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        }
      );
    }

    const subjectForAdmin = `Payment Request notification — user ${userId} — ₹${amount}`;
    const htmlForAdmin = `
      <h3>Requested payment information</h3>
      <ul>
        <li><strong>User ID:</strong> ${userId}</li>
        <li><strong>Payer Email:</strong> ${payerEmail ?? "N/A"}</li>
        <li><strong>Mobile No:</strong> ${mobileNo ?? "N/A"}</li>
        <li><strong>UPI ID:</strong> ${upiId ?? "N/A"}</li>
        <li><strong>Amount:</strong> ₹${amount}</li>
      </ul>
      <p> ${payerEmail ?? "N/A"} requested for amount: ₹${amount}, send ₹${amount} to this UPI ID: ${upiId ?? "N/A"} within 30 minutes, Hurry Up!</p>
    `;

    async function sendResendEmail(to: string | string[], subject: string, html: string) {
      const payload = {
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      };

      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await r.text();
      if (!r.ok) {
        throw new Error(`Resend error ${r.status}: ${text}`);
      }
      // treat any successful response as success — return parsed JSON if available
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }

    // send only to admin, await the single send and return success if ok
    try {
      await sendResendEmail(TO_EMAIL, subjectForAdmin, htmlForAdmin);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders(req) },
      });
    } catch (sendErr) {
      console.error(
        "send error:",
        sendErr instanceof Error ? sendErr.message : String(sendErr)
      );
      return new Response(
        JSON.stringify({ error: "Failed to send admin email", detail: String(sendErr) }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders(req) },
        }
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("send-payment-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  }
});

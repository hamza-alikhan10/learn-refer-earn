// functions/send-contact-email.ts
// @ts-ignore: Deno import
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore: Deno import
import { corsHeaders, handleCors } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL");
const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL") ?? "hamzk760@gmail.com";

function escapeHtml(str: any) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

serve(async (req) => {
  const preflight = await handleCors(req);
  if (preflight) return preflight;

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method Not Allowed" }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Server misconfigured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
      );
    }

    const now = new Date().toLocaleString();

    // escaped values to avoid HTML injection
    const escName = escapeHtml(name);
    const escEmail = escapeHtml(email);
    const escSubject = escapeHtml(subject);
    const escMessage = escapeHtml(message);
    const escTime = escapeHtml(now);

    // A clean, responsive, email-friendly HTML layout with inline styles.
    const emailHtml = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>New Contact Submission</title>
      </head>
      <body style="margin:0;padding:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f6f8fb;">
        <!-- Preheader (hidden) -->
        <div style="display:none;max-height:0px;overflow:hidden;">
          New contact form message from ${escName} — ${escSubject}
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f6f8fb;padding:32px 12px;">
          <tr>
            <td align="center">
              <table width="700" cellpadding="0" cellspacing="0" role="presentation" style="max-width:700px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(17,24,39,0.08);">
                <!-- Header -->
                <tr>
                  <td style="padding:24px 28px 8px;background:linear-gradient(90deg,#2563eb,#7c3aed);color:#fff;">
                    <div style="display:flex;align-items:center;gap:12px;">
                      <div style="width:48px;height:48px;border-radius:10px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;font-weight:700;">
                        EL
                      </div>
                      <div>
                        <div style="font-size:18px;font-weight:700;line-height:1;">New Contact Form Submission</div>
                        <div style="font-size:12px;opacity:0.9;margin-top:2px;">Received: ${escTime}</div>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:24px 28px;">
                    <h3 style="margin:0 0 12px 0;font-size:18px;color:#0f172a;">Message details</h3>
                    <p style="margin:0 0 18px 0;color:#475569;font-size:14px;line-height:1.5;">
                      You have received a new message from the website contact form. Below are the details.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:12px;border-radius:8px;background:#f8fafc;border:1px solid #eef2ff;padding:12px;">
                      <tr>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#334155;"><strong>Name</strong></td>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#0f172a;">${escName}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#334155;"><strong>Email</strong></td>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#0f172a;"><a href="mailto:${escEmail}" style="color:#2563eb;text-decoration:none;">${escEmail}</a></td>
                      </tr>
                      <tr>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#334155;"><strong>Subject</strong></td>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#0f172a;">${escSubject}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#334155;"><strong>Message</strong></td>
                        <td style="padding:8px 12px;vertical-align:top;font-size:13px;color:#0f172a;white-space:pre-wrap;">${escMessage}</td>
                      </tr>
                    </table>

                    <div style="margin-top:20px;display:flex;gap:10px;align-items:center;">
                      <a href="mailto:${escEmail}" style="display:inline-block;padding:10px 14px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Reply to sender</a>
                      <a href="#" style="display:inline-block;padding:10px 14px;background:#f1f5f9;color:#0f172a;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #e2e8f0;">Open in dashboard</a>
                    </div>

                    <hr style="border:none;border-top:1px solid #eef2ff;margin:20px 0;" />

                    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">
                      <strong>Quick summary:</strong> ${escName} (${escEmail}) submitted a "${escSubject}" message on ${escTime}.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:16px 24px;background:#f8fafc;color:#64748b;font-size:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
                      <div>EarnLabs • <span style="opacity:0.9">Contact notifications</span></div>
                      <div style="opacity:0.9">Sent via Resend</div>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="max-width:700px;width:100%;margin-top:12px;text-align:center;color:#94a3b8;font-size:12px;">
                This email was generated automatically. Do not share sensitive information in the contact form.
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send email via Resend API
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        subject: `Contact Form: ${escSubject} — ${escName}`,
        html: emailHtml,
      }),
    });

    const text = await r.text();
    if (!r.ok) throw new Error(`Resend error ${r.status}: ${text}`);

    return new Response(JSON.stringify({ ok: true, result: text }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(req) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("send-contact-email error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(req) } }
    );
  }
});

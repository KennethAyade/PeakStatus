/**
 * Contact form endpoint.
 *
 * The browser posts here; this server route holds the Web3Forms access key
 * (WEB3FORMS_ACCESS_KEY) and forwards valid submissions to Web3Forms, which
 * emails them to the studio inbox. Doing it server-side keeps the key out of
 * the client and lets us validate + drop spam before anything is sent.
 *
 * If the key isn't set, we return 503 so the client can fall back to a mailto:
 * link — the form never hard-fails.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 100, email: 150, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // Not configured — tell the client to use the mailto fallback.
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    botcheck?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. If it's set, pretend success and
  // silently drop the submission so bots don't retry.
  if (
    (typeof body.botcheck === "string" && body.botcheck.trim() !== "") ||
    body.botcheck === true
  ) {
    return Response.json({ success: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > MAX.name) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || email.length > MAX.email || !EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (!message || message.length > MAX.message) {
    return Response.json(
      { error: "Please enter a message (up to 2000 characters)." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Web3Forms is behind Cloudflare, which blocks requests with a default
        // server user-agent (returns a "Just a moment…" challenge). A normal
        // browser UA passes it — required for this to work from Vercel too.
        "User-Agent":
          "Mozilla/5.0 (compatible; PeakStatusContactForm/1.0; +https://peak-status.vercel.app)",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `New inquiry from ${name} — Peak Status`,
        from_name: "Peak Status Website",
      }),
    });

    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (res.ok && data.success) {
      return Response.json({ success: true });
    }
    return Response.json({ error: "send_failed" }, { status: 502 });
  } catch {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}

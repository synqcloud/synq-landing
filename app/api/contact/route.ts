import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// All contact and support messages go to this inbox, nowhere else.
const INBOX = "iamtelmoo@gmail.com";
const FROM = "Synq <noreply@trysynq.com>";

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// ---- Anti-spam -------------------------------------------------------------
// Bots get a normal "success" response so they don't learn what tripped them,
// but nothing is sent: no email to the inbox and, importantly, no confirmation
// email to an address a bot typed in (that would hurt our sending reputation).

const ALLOWED_ORIGINS = [/^https:\/\/synq\.cards$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/];
const MIN_FILL_MS = 3_000; // humans don't fill the form in under 3 seconds
const MAX_FILL_MS = 24 * 60 * 60 * 1_000;
const MAX_LINKS = 2;
const RATE_LIMIT = 5; // per IP per hour (best effort: per serverless instance)
const RATE_WINDOW_MS = 60 * 60 * 1_000;
const SPAM_PATTERNS = [
  /\b(seo|backlinks?|guest post|link building|rank(ing)? (your|on) google)\b/i,
  /\b(crypto|bitcoin|forex|casino|viagra|loan offer)\b/i,
  /\b(web ?design|app development|lead generation) (services|agency|company)\b/i,
];

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function spamReason(request: NextRequest, body: Record<string, unknown>, message: string): string | null {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.some((re) => re.test(origin))) return "origin";
  if (String(body.website ?? "").trim()) return "honeypot";
  const elapsed = Number(body.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return "timing";
  if ((message.match(/https?:\/\/|www\./gi) ?? []).length > MAX_LINKS) return "links";
  if (SPAM_PATTERNS.some((re) => re.test(message))) return "content";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return "rate";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.firstName ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().slice(0, 200);
    const shop = String(body.shop ?? "").trim().slice(0, 200);
    const topic = String(body.storeType ?? "General inquiry").trim().slice(0, 80);
    const message = String(body.frustration ?? "").trim().slice(0, 5000);
    const page = String(body.page ?? "").slice(0, 200);
    const a = body.attribution && typeof body.attribution === "object" ? body.attribution : null;

    if (!email || !isEmail(email) || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const spam = spamReason(request, body, `${name} ${message}`);
    if (spam) {
      console.warn("Contact form: dropped as spam", { reason: spam });
      return NextResponse.json({ success: true });
    }

    const origin = a
      ? `${escapeHtml(a.source)} / ${escapeHtml(a.medium)}${a.campaign ? ` / ${escapeHtml(a.campaign)}` : ""} · first page ${escapeHtml(a.landingPath)} · first seen ${escapeHtml(a.firstSeen)}${a.referrer ? ` · referrer ${escapeHtml(a.referrer)}` : ""}`
      : "unknown";

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: INBOX,
      replyTo: email,
      subject: `[Synq] ${topic}: ${name || email}`,
      html: `
        <h2>${escapeHtml(topic)}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${shop ? `<p><strong>Store:</strong> ${escapeHtml(shop)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        <hr />
        <p style="color:#666;font-size:12px"><strong>Sent from:</strong> ${escapeHtml(page) || "unknown"}<br />
        <strong>Origin (first touch):</strong> ${origin}</p>
      `,
    });

    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: INBOX,
      subject: "We got your message",
      html: `
        <p>Hi ${escapeHtml(name) || "there"},</p>
        <p>Thanks for reaching out. We got your message and will reply to this email, usually within one business day.</p>
        <p>If you want to add anything, just reply to this email.</p>
        <p>Telmo, Synq</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

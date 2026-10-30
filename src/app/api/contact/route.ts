import { NextRequest, NextResponse } from "next/server";

/* The contact form: a message to the founder's inbox and a short receipt to
   the sender, both through Resend's HTTP API (no SDK needed). */

const RESEND_URL = "https://api.resend.com/emails";
const FROM = process.env.CONTACT_FROM ?? "Synq <noreply@trysynq.com>";
const TO = process.env.CONTACT_TO ?? "iamtelmoo@gmail.com";

const TOPICS = ["before", "app", "billing", "other"] as const;
const TOPIC_LABELS: Record<(typeof TOPICS)[number], string> = {
  before: "Question before installing",
  app: "Help with the app",
  billing: "Plans and billing",
  other: "Something else",
};

/* everything the sender typed is escaped before it goes into an email */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/* plain addresses only: nothing Resend would refuse (<, >, commas, quotes) */
const EMAIL = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
/* one line: no CR/LF can reach a header such as the subject */
const oneLine = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);

/* best-effort throttle (per server instance): a few messages per sender and
   per address an hour, so the form can't be used to mail third parties */
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
const MAX_KEYS = 5000;
let lastSweep = 0;
function allowed(key: string) {
  const now = Date.now();
  /* bounded memory: when full, sweep expired senders (at most once a minute) */
  if (hits.size >= MAX_KEYS && !hits.has(key) && now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  /* still full of active senders: refuse newcomers rather than forget anyone */
  if (hits.size >= MAX_KEYS && !hits.has(key)) return false;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}

async function send(key: string, payload: Record<string, unknown>) {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function POST(request: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  /* a field people never see: bots tend to fill it. A filled trap only flags
     the message (autofill can fill hidden fields too); it is never dropped */
  const suspect = typeof body.hp_x9 === "string" && body.hp_x9.trim() !== "";

  const name = oneLine(body.name, 120);
  const email = oneLine(body.email, 200);
  const store = oneLine(body.store, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const topic = TOPICS.includes(body.topic as (typeof TOPICS)[number])
    ? (body.topic as (typeof TOPICS)[number])
    : "other";

  if (!name || !EMAIL.test(email) || message.length < 2) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  /* first touch of the visit (src/lib/attribution.ts), if the browser noted one */
  const a = (body.attribution ?? null) as Record<string, unknown> | null;
  const foundVia =
    a && typeof a === "object"
      ? [a.source, a.medium, a.campaign, a.landingPath]
          .filter((v): v is string => typeof v === "string" && !!v)
          .map((v) => v.slice(0, 80))
          .join(" · ")
      : "";

  /* Vercel sets x-real-ip itself; the first x-forwarded-for entry is client-supplied */
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown";
  if (!allowed(`ip:${ip}`) || !allowed(`to:${email.toLowerCase()}`)) {
    return NextResponse.json({ error: "busy" }, { status: 429 });
  }

  try {
    await send(key, {
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `${suspect ? "[possible bot] " : ""}${TOPIC_LABELS[topic]}: ${name}`,
      html: `
        <h2>${esc(TOPIC_LABELS[topic])}</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${store ? `<p><strong>Store:</strong> ${esc(store)}</p>` : ""}
        ${foundVia ? `<p><strong>Found us via:</strong> ${esc(foundVia)}</p>` : ""}
        <p style="white-space:pre-wrap">${esc(message)}</p>
      `,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }

  if (suspect) return NextResponse.json({ success: true });

  /* the receipt is a courtesy: if it fails, the message still arrived. It
     carries nothing the sender typed, since the address isn't verified */
  try {
    await send(key, {
      from: FROM,
      to: email,
      reply_to: "help@synq.cards",
      subject: "We got your message",
      html: `
        <p>Hi,</p>
        <p>Thanks for writing to Synq. Your message reached us and you'll hear back within one business day.</p>
        <p>While you wait, the help center may already have the answer: <a href="https://synq.cards/docs">synq.cards/docs</a>.</p>
        <p>If anything else comes up, just reply to this email.</p>
        <p>Telmo, Synq</p>
      `,
    });
  } catch (error) {
    console.error("Contact receipt error:", error);
  }

  return NextResponse.json({ success: true });
}

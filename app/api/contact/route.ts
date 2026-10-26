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

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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

    const origin = a
      ? `${escapeHtml(a.source)} / ${escapeHtml(a.medium)}${a.campaign ? ` / ${escapeHtml(a.campaign)}` : ""} · first page ${escapeHtml(a.landingPath)} · first seen ${escapeHtml(a.firstSeen)}${a.referrer ? ` · referrer ${escapeHtml(a.referrer)}` : ""}`
      : "unknown";

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

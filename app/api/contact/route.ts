import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { firstName, email, storeType, role, frustration, inventorySize, wantsUpdates } =
      body;

    // Validate required fields
    if (!email || !storeType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const isWaitlist = storeType === "waitlist";
    const region = role || "Not specified";
    const games = frustration || "Not specified";
    const inventory = inventorySize || "Not specified";

    // Send email to you
    const notificationEmail = await resend.emails.send({
      from: "Synq <noreply@trysynq.com>",
      to: "iamtelmo@proton.me",
      subject: isWaitlist
        ? `New Waitlist Signup: ${email}`
        : `Support Ticket: ${firstName} <${email}>`,
      html: isWaitlist
        ? `
        <h2>New Waitlist Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Games:</strong> ${games}</p>
        <p><strong>Inventory:</strong> ${inventory}</p>
      `
        : `
        <h2>New Support Ticket</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${storeType}</p>
        ${frustration ? `<p><strong>Description:</strong> ${frustration}</p>` : ""}
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: "Synq <noreply@trysynq.com>",
      to: email,
      subject: isWaitlist
        ? "You're on the Synq waitlist!"
        : "We received your support ticket",
      html: isWaitlist
        ? `
        <h2>You're on the list!</h2>
        <p>Really glad to have you here. We're building Synq because we know how much time card store owners lose to manual work, time that could go toward growing your store instead.</p>
        <p>We're currently going through Shopify's app review. As soon as we're live, we'll reach out to this email with your invite.</p>
        <p>If anything comes to mind in the meantime, we're always happy to hear from you at <a href="mailto:help@trysynq.com">help@trysynq.com</a>.</p>
        <p>Telmo, founder @ Synq</p>
      `
        : `
        <h2>Hi ${firstName},</h2>
        <p>We got your message and we're on it. You'll hear back from us within one business day.</p>
        <p>In the meantime, you can browse our <a href="https://trysynq.com/help">help center</a> — it might have a quick answer while you wait.</p>
        <p>If anything else comes up, just reply to this email.</p>
        <p>— The Synq team</p>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

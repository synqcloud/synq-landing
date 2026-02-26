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
        : `New Contact Form Submission: ${firstName} from ${storeType}`,
      html: isWaitlist
        ? `
        <h2>New Waitlist Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Games:</strong> ${games}</p>
        <p><strong>Inventory:</strong> ${inventory}</p>
      `
        : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Store Type:</strong> ${storeType}</p>
        ${role ? `<p><strong>Role:</strong> ${role}</p>` : ""}
        ${frustration ? `<p><strong>Biggest Frustration:</strong> ${frustration}</p>` : ""}
        <p><strong>Wants Updates:</strong> ${wantsUpdates ? "Yes" : "No"}</p>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: "Synq <noreply@trysynq.com>",
      to: email,
      subject: isWaitlist
        ? "You're on the Synq waitlist!"
        : "Thanks for reaching out! 👋",
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
        <p>Thanks for reaching out! I'm excited to learn more about your needs.</p>
        <p>I'll be in touch soon to keep the conversation going and see how Synq can help your business.</p>
        <p>If you have any questions or want to share more thoughts, feel free to reach out directly at <a href="mailto:iamtelmo@proton.me">iamtelmo@proton.me</a>.</p>
        <p>Telmo, founder @ Synq</p>
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

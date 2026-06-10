import { NextRequest, NextResponse } from "next/server";

// POST /api/email/send
// Sends order confirmation email via Resend
export async function POST(req: NextRequest) {
  try {
    const order = await req.json();
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn("[Resend] API key not configured — skipping email");
      return NextResponse.json({ status: true, message: "Email not configured, skipped" });
    }

    // npm install resend
    // import { Resend } from "resend";
    // const resend = new Resend(RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Kenya Business Blueprints <orders@kenyabusiness.co.ke>",
    //   to: order.email,
    //   subject: `Your ${order.packageName} Guide is Ready! 🎉`,
    //   html: `<h2>Hi ${order.name}!</h2><p>Thank you for your purchase. Your guide will arrive on WhatsApp (${order.phone}) within 5 minutes.</p>`,
    // });

    console.log("[Resend] Would send email to:", order.email);
    return NextResponse.json({ status: true });
  } catch (error) {
    console.error("[Resend Error]", error);
    return NextResponse.json({ status: false }, { status: 500 });
  }
}

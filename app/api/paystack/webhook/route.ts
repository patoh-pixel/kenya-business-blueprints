import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// POST /api/paystack/webhook
// Paystack sends payment confirmation here — set this URL in your Paystack Dashboard
export async function POST(req: NextRequest) {
  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature") || "";

  // Verify webhook signature
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { reference, metadata, amount, customer } = event.data;
    console.log("[Webhook] Payment success:", reference, metadata);

    // TODO: 
    // 1. Mark order as paid in your DB
    // 2. Trigger guide delivery via WhatsApp API
    // 3. Send email via Resend
    // 4. Log to Google Sheets
  }

  return NextResponse.json({ received: true });
}

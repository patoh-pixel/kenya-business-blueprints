import { NextRequest, NextResponse } from "next/server";

// GET /api/paystack/verify?reference=xxx
export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ status: false, message: "Reference required" }, { status: 400 });
  }

  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ status: false, message: "Not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: false, message: "Verification failed" }, { status: 500 });
  }
}

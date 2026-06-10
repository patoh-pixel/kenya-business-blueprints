import { NextRequest, NextResponse } from "next/server";

// POST /api/paystack/charge
// Initiates M-Pesa STK Push via Paystack Charge API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { status: false, message: "Paystack secret key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.paystack.co/charge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Paystack Charge Error]", error);
    return NextResponse.json(
      { status: false, message: "Charge initiation failed" },
      { status: 500 }
    );
  }
}

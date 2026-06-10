// ============================================================
// PAYMENTS — Unified Paystack Integration
// Handles: M-Pesa STK Push + Card via single Paystack Charge API
// ============================================================

export interface OrderData {
  name: string;
  email: string;
  phone: string; // Safaricom number e.g. +254722000000
  packageId: string;
  packageName: string;
  amount: number; // KSh (not kobo)
}

export interface PaystackChargeResponse {
  status: boolean;
  message: string;
  data?: {
    reference: string;
    status: string; // "send_otp" | "pending" | "success" | "failed"
    display_text?: string;
  };
}

// ------------------------------------------------------------------
// UNIFIED CHARGE — M-Pesa STK Push via Paystack Charge API
// Docs: https://paystack.com/docs/payments/payment-channels/#m-pesa
// ------------------------------------------------------------------
export async function chargeViaMpesa(order: OrderData): Promise<PaystackChargeResponse> {
  // Normalize phone: 07XX -> +254XX
  const phone = order.phone.startsWith("0")
    ? "+254" + order.phone.slice(1)
    : order.phone.startsWith("254")
    ? "+" + order.phone
    : order.phone;

  const res = await fetch("/api/paystack/charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: order.email,
      amount: order.amount * 100, // Paystack expects amount in cents (KES kobo)
      currency: "KES",
      mobile_money: {
        phone,
        provider: "mpesa",
      },
      metadata: {
        name: order.name,
        package_id: order.packageId,
        package_name: order.packageName,
        phone: order.phone,
        custom_fields: [
          { display_name: "Customer Name", variable_name: "name", value: order.name },
          { display_name: "Package", variable_name: "package", value: order.packageName },
          { display_name: "WhatsApp", variable_name: "phone", value: order.phone },
        ],
      },
    }),
  });

  if (!res.ok) {
    return { status: false, message: "Network error. Please try again." };
  }
  return res.json();
}

// ------------------------------------------------------------------
// PAYSTACK INLINE CHECKOUT — Card payments (Visa / Mastercard)
// Loads Paystack's hosted checkout popup
// ------------------------------------------------------------------
export function chargeViaCard(order: OrderData, onSuccess: (ref: string) => void) {
  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxx";

  // @ts-ignore — Paystack JS loaded via <script> in layout
  if (typeof PaystackPop === "undefined") {
    alert("Paystack not loaded. Check your internet connection.");
    return;
  }

  // @ts-ignore
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: order.email,
    amount: order.amount * 100,
    currency: "KES",
    ref: `KBB-${Date.now()}`,
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: order.name },
        { display_name: "Package", variable_name: "package", value: order.packageName },
        { display_name: "WhatsApp", variable_name: "phone", value: order.phone },
      ],
    },
    callback: (response: { reference: string }) => {
      onSuccess(response.reference);
    },
    onClose: () => {
      console.log("Payment popup closed");
    },
  });

  handler.openIframe();
}

// ------------------------------------------------------------------
// VERIFY — Called after STK push confirms or card callback fires
// Should be called from your webhook or client after payment
// ------------------------------------------------------------------
export async function verifyAndDeliver(reference: string, order: OrderData) {
  // 1. Verify transaction via /api/paystack/verify
  const res = await fetch(`/api/paystack/verify?reference=${reference}`);
  const data = await res.json();

  if (data.status && data.data?.status === "success") {
    // 2. Log to Google Sheets via /api/sheets/log
    await fetch("/api/sheets/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...order, reference, paid_at: new Date().toISOString() }),
    });

    // 3. Send confirmation email via /api/email/send (Resend)
    await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    return { success: true };
  }

  return { success: false, message: "Payment verification failed" };
}

import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Kenya Business Blueprints — Start a Profitable Business Today",
  description: "100+ step-by-step Kenyan business startup guides with costs, equipment lists, licenses & profit breakdowns. Pay via M-Pesa. Instant WhatsApp delivery.",
  keywords: "Kenya business guide, start business Kenya, M-Pesa payment, business ideas Kenya, startup guide 2024",
  openGraph: {
    title: "Kenya Business Blueprints",
    description: "Start a profitable business in Kenya today. 100+ guides from KSh 20.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="grain">
        {children}
        {/* Paystack inline JS for card payments */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

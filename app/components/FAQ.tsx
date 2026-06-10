"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Are these guides Kenya-specific?", a: "100% yes. Every guide is researched for the Kenyan market — startup costs in KSh, Kenya licensing requirements (Business Permit, KEBS, NEMA), local supplier contacts across Nairobi, Mombasa and major towns, and profit projections based on real Kenyan market data." },
  { q: "How do I pay — can I use M-Pesa?", a: "Yes! We use Paystack as our payment processor, which handles M-Pesa STK Push natively. After clicking 'Buy Now', enter your Safaricom number — you'll get an STK Push on your phone. Enter your M-Pesa PIN and payment is instant. We also accept Visa and Mastercard." },
  { q: "How do I receive my guides after payment?", a: "Within 5 minutes of confirmed payment, your PDF guides are delivered to your WhatsApp number or email — whichever you provide. No account creation or app download required." },
  { q: "Are these guides beginner-friendly?", a: "Absolutely. Written for first-time entrepreneurs with zero prior business experience. Every guide walks you through everything step by step — from idea validation and capital needed, to registering your business, sourcing equipment, finding customers and managing cash flow." },
  { q: "What's included in each guide?", a: "Every guide covers: estimated startup capital breakdown, full equipment & supplies list with costs, step-by-step setup instructions, required licenses and permits, pricing strategy, monthly income & profit projection, marketing tips, and common mistakes to avoid." },
  { q: "Is there a refund policy?", a: "If for any reason you feel the guide doesn't deliver, contact us on WhatsApp within 24 hours of purchase and we'll resolve it — either with a replacement guide or a full refund." },
  { q: "What if the M-Pesa STK Push doesn't arrive?", a: "Check your network signal and ensure your Safaricom number is active and has sufficient balance. If the prompt still doesn't arrive within 2 minutes, contact us on WhatsApp and we'll resolve it immediately." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block bg-white/10 text-white/60 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">FAQ</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3">Got Questions?</h2>
          <p className="text-white/50">
            Still unsure?{" "}
            <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="text-gold hover:text-gold/80 font-semibold">
              Chat on WhatsApp →
            </a>
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
                open === i ? "border-white/20 bg-white/8" : "border-white/8 bg-white/4 hover:bg-white/6"
              }`}
            >
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
                <span className={`font-medium text-sm sm:text-base ${open === i ? "text-white" : "text-white/70"}`}>{faq.q}</span>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${open === i ? "bg-red-700 text-white" : "bg-white/10 text-white/50"}`}>
                  {open === i ? <Minus size={12} /> : <Plus size={12} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
                    <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/8 pt-3">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

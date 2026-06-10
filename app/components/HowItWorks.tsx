"use client";
import { motion } from "framer-motion";
import { Search, CreditCard, MessageCircle } from "lucide-react";

const steps = [
  {
    n: "01", Icon: Search, title: "Choose Your Guides",
    desc: "Browse 100+ Kenya-specific ideas. Pick one or bundle several. Each guide is clearly described with what's covered.",
    pill: "bg-blue-50 text-blue-700 border border-blue-100",
    iconBg: "bg-blue-950", iconColor: "text-white",
  },
  {
    n: "02", Icon: CreditCard, title: "Pay via Paystack",
    desc: "Select M-Pesa STK Push or card at checkout. Paystack handles everything — no Safaricom Daraja setup needed on your end.",
    pill: "bg-red-50 text-red-700 border border-red-100",
    iconBg: "bg-red-700", iconColor: "text-white",
    highlight: true,
  },
  {
    n: "03", Icon: MessageCircle, title: "Receive on WhatsApp / Email",
    desc: "Within 5 minutes your PDF guides arrive on WhatsApp or email. Start reading and planning immediately — no app needed.",
    pill: "bg-green-50 text-green-700 border border-green-100",
    iconBg: "bg-green-600", iconColor: "text-white",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden diagonal-top">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-blue-950 mb-3">
            From Zero to Business Plan in 3 Steps
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            No forms. No waiting. No complicated setup. Just pick, pay, and build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Connecting dashes (desktop) */}
          <div className="hidden lg:block absolute top-12 left-1/3 right-1/3 h-px border-t-2 border-dashed border-slate-200 z-0" />

          {steps.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`relative bg-white rounded-3xl p-8 card-lift ${
                s.highlight
                  ? "ring-2 ring-blue-950 shadow-xl shadow-blue-100"
                  : "border border-slate-100 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-6xl font-extrabold text-slate-100 leading-none">{s.n}</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.iconBg}`}>
                  <s.Icon size={20} className={s.iconColor} />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${s.pill}`}>
                Step {i + 1} of 3
              </span>
              {/* Paystack badge on step 2 */}
              {s.highlight && (
                <div className="mt-4 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5">
                  <span className="text-base">🔒</span>
                  <div>
                    <p className="text-xs font-semibold text-ink">Secured by Paystack</p>
                    <p className="text-xs text-slate-400">M-Pesa STK · Visa · Mastercard</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#pricing"
            className="inline-flex items-center gap-2 bg-blue-950 text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-blue-900 transition-all hover:-translate-y-0.5 shadow-lg">
            Start Now →
          </a>
        </div>
      </div>
    </section>
  );
}

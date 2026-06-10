"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Wanjiku M.", location: "Nairobi, Westlands", business: "Water Refill", text: "Bought the Water Refill guide for KSh 20 and followed every step. Within 3 months I had my own plant running. The M-Pesa checkout was instant — got my guide on WhatsApp in 3 minutes!", avatar: "W", color: "bg-blue-800", income: "KSh 45K/month now" },
  { name: "Brian O.", location: "Mombasa", business: "Car Wash", text: "Very detailed and very Kenyan. Permits, equipment costs, pricing strategy — all there. Paid via M-Pesa STK Push, super easy. I'm now opening my second location.", avatar: "B", color: "bg-red-700", income: "2 locations running" },
  { name: "Achieng P.", location: "Kisumu", business: "Mitumba Fashion", text: "Did not know anything about mitumba before. The guide told me where to source bales and how to sell on TikTok. Best KSh 20 I've ever spent. Paystack made payment effortless.", avatar: "A", color: "bg-pink-700", income: "Growing online sales" },
  { name: "James K.", location: "Nakuru", business: "Poultry Farming", text: "Got the Full Library at KSh 675. Absolute steal. Paid by card via Paystack. The poultry guide alone paid for everything 10x over. Clear on costs, feeds, and how to find buyers.", avatar: "J", color: "bg-amber-600", income: "500+ birds running" },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white dot-pattern">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Success Stories</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-blue-950 mb-3">Real Kenyans. Real Businesses.</h2>
          <p className="text-slate-500 text-lg">5,000+ entrepreneurs have already started.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm card-lift">
              <div className="flex gap-0.5 mb-4">
                {Array(5).fill(0).map((_, j) => <Star key={j} size={13} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-4">✅ {t.income}</div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-9 h-9 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>{t.avatar}</div>
                <div>
                  <p className="font-semibold text-ink text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.location} · {t.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

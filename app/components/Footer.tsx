"use client";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* CTA strip */}
      <div className="relative border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Ready to Start Your Business?</h3>
              <p className="text-white/40">Join 5,000+ entrepreneurs. Pay via M-Pesa. Get your guide in 5 minutes.</p>
            </div>
            <a href="#pricing"
              className="flex-shrink-0 bg-red-700 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg">
              Get Your Guide Now <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-blue-800 rounded-lg rotate-6" />
                <div className="absolute inset-0 bg-red-700 rounded-lg -rotate-3" />
                <div className="absolute inset-0 bg-blue-950 rounded-lg flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xs">KB</span>
                </div>
              </div>
              <span className="font-display font-bold text-base text-white">Kenya<span className="text-red-500">Business</span><br /><span className="text-white/40 text-sm font-normal">Blueprints</span></span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              Kenya's most comprehensive digital library of business startup guides. Built for Kenyan entrepreneurs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/35 text-sm"><MapPin size={13} className="text-red-600 flex-shrink-0" />Nairobi, Kenya</div>
              <a href="mailto:hello@kenyabusiness.co.ke" className="flex items-center gap-2 text-white/35 hover:text-white text-sm transition-colors">
                <Mail size={13} className="text-red-600 flex-shrink-0" />hello@kenyabusiness.co.ke
              </a>
              <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/35 hover:text-white text-sm transition-colors">
                <MessageCircle size={13} className="text-green-500 flex-shrink-0" />+254 700 000 000
              </a>
            </div>
          </div>

          {/* Popular guides */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Popular Guides</h4>
            <ul className="space-y-2.5">
              {["Water Refill Business","Car Wash","Mitumba Fashion","Poultry Farming","Mobile Money Shop","Small Restaurant"].map((g) => (
                <li key={g}><a href="#carousel" className="text-white/35 hover:text-white text-sm transition-colors">{g}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["Pricing","#pricing"],["How It Works","#how-it-works"],["FAQ","#faq"],["Browse Ideas","#carousel"]].map(([label, href]) => (
                <li key={label}><a href={href} className="text-white/35 hover:text-white text-sm transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Payment Methods</h4>
            <div className="space-y-2.5">
              {[
                { emoji: "📱", label: "M-Pesa STK Push", sub: "via Paystack" },
                { emoji: "💳", label: "Visa / Mastercard", sub: "via Paystack" },
                { emoji: "🔒", label: "Secured & Encrypted", sub: "All transactions" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 bg-white/4 rounded-xl px-3 py-2.5 border border-white/6">
                  <span className="text-base">{p.emoji}</span>
                  <div>
                    <p className="text-white/70 text-xs font-semibold">{p.label}</p>
                    <p className="text-white/30 text-xs">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Kenya Business Blueprints. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy","Terms","Refunds"].map((l) => (
              <a key={l} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

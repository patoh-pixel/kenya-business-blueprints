"use client";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-blue-950 overflow-hidden flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-blue-800/40 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-red-700/20 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-800/10 blur-[120px]" />
      </div>

      {/* Floating badges */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute top-28 left-6 lg:left-20 hidden lg:flex items-center gap-2.5 bg-white/8 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 float">
        <span className="text-xl">🇰🇪</span>
        <div>
          <p className="text-white/50 text-xs">Built for Kenya</p>
          <p className="text-white font-semibold text-sm">100% Local Data</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute top-36 right-6 lg:right-20 hidden lg:flex items-center gap-2.5 bg-red-700/20 backdrop-blur border border-red-500/20 rounded-2xl px-4 py-3 float-delay">
        <Zap size={16} className="text-gold" />
        <div>
          <p className="text-white/50 text-xs">Delivery time</p>
          <p className="text-white font-semibold text-sm">Under 5 minutes</p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20 text-center">
        <motion.div variants={containerVariants} initial="initial" animate="animate">

          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70 text-xs font-medium tracking-widest uppercase">Kenya&apos;s #1 Business Startup Platform</span>
          </motion.div>

          <motion.h1 variants={itemVariants}
            className="font-display text-[2.6rem] sm:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.04] tracking-tight mb-6">
            Start a Profitable
            <br />
            <span className="shimmer-text">Business in Kenya</span>
            <br />
            <span className="text-white/90">Today.</span>
          </motion.h1>

          <motion.p variants={itemVariants}
            className="text-white/50 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Get <strong className="text-white font-semibold">100+ step-by-step guides</strong> — startup costs, equipment lists, licenses & profit breakdowns.
            All Kenya-specific. Pay via <strong className="text-white font-semibold">M-Pesa</strong> or card through <strong className="text-white font-semibold">Paystack</strong>.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#carousel"
              className="group w-full sm:w-auto bg-white text-blue-950 font-bold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-0.5">
              Browse Business Ideas
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#pricing"
              className="group w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-2xl shadow-red-900/40 hover:-translate-y-0.5">
              View Pricing — From KSh 20
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5 mt-10">
            {[
              { icon: "📱", text: "M-Pesa STK Push via Paystack" },
              { icon: "💳", text: "Card via Paystack" },
              { icon: "⚡", text: "WhatsApp delivery in 5 min" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <span className="text-base">{b.icon}</span>
                <span className="text-white/40 text-sm">{b.text}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full fill-white">
          <path d="M0,60 C360,20 1080,20 1440,60 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>
  );
}

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
    <section
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{ background: "#0a1f5b" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: "rgba(59,130,246,0.25)",
          filter: "blur(100px)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
        style={{
          background: "rgba(217,4,41,0.15)",
          filter: "blur(80px)",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Floating badge left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute top-28 left-6 lg:left-20 hidden lg:flex items-center gap-2.5 rounded-2xl px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="text-xl">🇰🇪</span>
        <div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
            Built for Kenya
          </p>
          <p style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600 }}>
            100% Local Data
          </p>
        </div>
      </motion.div>

      {/* Floating badge right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute top-36 right-6 lg:right-20 hidden lg:flex items-center gap-2.5 rounded-2xl px-4 py-3"
        style={{
          background: "rgba(217,4,41,0.2)",
          border: "1px solid rgba(239,68,68,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Zap size={16} style={{ color: "#fbbf24" }} />
        <div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
            Delivery time
          </p>
          <p style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600 }}>
            Under 5 minutes
          </p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Top badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#4ade80", animation: "pulse 2s infinite" }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Kenya&apos;s #1 Business Startup Platform
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              color: "#ffffff",
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Start a Profitable
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #fff 0%, #fbbf24 40%, #fff 70%, #fbbf24 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Business in Kenya
            </span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.9)" }}>Today.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Get{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>
              100+ step-by-step guides
            </strong>{" "}
            — startup costs, equipment lists, licenses &amp; profit
            breakdowns. All Kenya-specific. Pay via{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>
              M-Pesa
            </strong>{" "}
            or card through{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>
              Paystack
            </strong>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            
              href="#carousel"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "#ffffff",
                color: "#0a1f5b",
                padding: "14px 32px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            >
              Browse Business Ideas
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            
              href="#pricing"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "#d90429",
                color: "#ffffff",
                padding: "14px 32px",
                boxShadow: "0 8px 32px rgba(217,4,41,0.35)",
              }}
            >
              View Pricing — From KSh 20
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 mt-10"
          >
            {[
              { icon: "📱", text: "M-Pesa STK Push via Paystack" },
              { icon: "💳", text: "Card via Paystack" },
              { icon: "⚡", text: "WhatsApp delivery in 5 min" },
              { icon: "✅", text: "Beginner-friendly" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <span style={{ fontSize: "15px" }}>{b.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
                  {b.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ display: "block" }}
        >
          <path
            d="M0,60 C360,20 1080,20 1440,60 L1440,60 L0,60 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
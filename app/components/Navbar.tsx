"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Ideas", href: "#carousel" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ];

  const navStyle = {
    background: scrolled ? "rgba(255,255,255,0.97)" : "#0a1f5b",
    borderBottom: scrolled ? "1px solid #f1f5f9" : "none",
    boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg rotate-6" style={{ background: "#1b4fd8" }} />
              <div className="absolute inset-0 rounded-lg -rotate-3" style={{ background: "#d90429" }} />
              <div className="absolute inset-0 rounded-lg flex items-center justify-center" style={{ background: "#0a1f5b" }}>
                <span className="text-white font-bold text-xs">BM</span>
              </div>
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: scrolled ? "#0a1f5b" : "#ffffff" }}>
              BizMoney<span style={{ color: "#d90429" }}>Kenya</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium hover:text-red-600 transition-colors"
                style={{ color: scrolled ? "#64748b" : "rgba(255,255,255,0.75)" }}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#pricing" className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:-translate-y-px transition-all"
              style={{ background: "#d90429" }}>
              Buy a Guide →
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-1.5 rounded-lg"
            style={{ color: scrolled ? "#0a1f5b" : "#ffffff" }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t" style={{ background: "#ffffff" }}>
            <div className="px-5 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="text-slate-700 font-medium py-1 border-b border-slate-50">{l.label}</a>
              ))}
              <a href="#pricing" onClick={() => setOpen(false)}
                className="text-white text-center px-5 py-3 rounded-lg font-semibold"
                style={{ background: "#d90429" }}>Buy a Guide →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
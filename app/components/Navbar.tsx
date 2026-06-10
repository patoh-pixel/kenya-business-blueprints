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

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-xl border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-blue-800 rounded-lg rotate-6 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-red-700 rounded-lg -rotate-3 group-hover:-rotate-6 transition-transform" />
              <div className="absolute inset-0 bg-blue-950 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">KB</span>
              </div>
            </div>
            <span className={`font-display font-bold text-base tracking-tight transition-colors ${scrolled ? "text-ink" : "text-white"}`}>
              Kenya<span className="text-red-700">Business</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-red-600 ${scrolled ? "text-slate-500" : "text-white/75"}`}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#pricing"
              className="bg-red-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-red-200">
              Buy a Guide →
            </a>
          </div>

          <button onClick={() => setOpen(!open)}
            className={`md:hidden p-1.5 rounded-lg ${scrolled ? "text-ink" : "text-white"}`}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="text-slate-700 font-medium py-1 border-b border-slate-50">
                  {l.label}
                </a>
              ))}
              <a href="#pricing" onClick={() => setOpen(false)}
                className="bg-red-700 text-white text-center px-5 py-3 rounded-lg font-semibold mt-1">
                Buy a Guide →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

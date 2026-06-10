"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const WA = "254700000000";
  const MSG = encodeURIComponent("Hi! I need help choosing a business guide from Kenya Business Blueprints.");

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 w-64"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">Kenya Business Support</p>
                <p className="text-green-500 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block" />Online now
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-xs mb-3 leading-relaxed">
              Need help choosing the right business guide? We'll help you pick based on your budget and goals.
            </p>
            <a href={`https://wa.me/${WA}?text=${MSG}`} target="_blank" rel="noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold text-center py-2.5 rounded-xl transition-colors">
              Chat on WhatsApp →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="w-13 h-13 w-[52px] h-[52px] bg-green-500 hover:bg-green-600 rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center transition-colors relative">
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={20} className="text-white" /></motion.div>
            : <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {!open && (
          <>
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white animate-ping opacity-60" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white" />
          </>
        )}
      </motion.button>
    </div>
  );
}

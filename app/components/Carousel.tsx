"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, ArrowRight } from "lucide-react";

const businesses = [
  { name: "Water Refill Business", desc: "Purification plant serving your community. Consistent demand, low overhead.", emoji: "💧", startup: "KSh 80K", profit: "KSh 40K/mo", bg: "from-[#0369A1] to-[#0C4A6E]" },
  { name: "Car Wash Business", desc: "Mobile or station car wash. Booming with Kenya's rising car ownership.", emoji: "🚗", startup: "KSh 50K", profit: "KSh 60K/mo", bg: "from-[#1E40AF] to-[#1E3A5F]" },
  { name: "Mitumba Fashion", desc: "Import and sell second-hand clothing. Huge market across town and social media.", emoji: "👗", startup: "KSh 30K", profit: "KSh 35K/mo", bg: "from-[#BE185D] to-[#831843]" },
  { name: "Poultry Farming", desc: "Broiler or layer chickens. Sustainable agribusiness with strong local demand.", emoji: "🐓", startup: "KSh 60K", profit: "KSh 45K/mo", bg: "from-[#B45309] to-[#78350F]" },
  { name: "Cyber Café", desc: "Internet, printing & photocopying. Reliable income in any estate or town.", emoji: "💻", startup: "KSh 120K", profit: "KSh 50K/mo", bg: "from-[#6D28D9] to-[#4C1D95]" },
  { name: "Mobile Money Shop", desc: "M-Pesa agent. Low capital, daily cash flow, easy to grow with multiple lines.", emoji: "📱", startup: "KSh 25K", profit: "KSh 30K/mo", bg: "from-[#047857] to-[#064E3B]" },
  { name: "Agriculture Farming", desc: "High-value crops — tomatoes, kale, capsicum. Feed Kenya, earn consistently.", emoji: "🌿", startup: "KSh 40K", profit: "KSh 55K/mo", bg: "from-[#166534] to-[#14532D]" },
  { name: "Small Restaurant", desc: "Local meals business. Constant demand in estates, markets and office areas.", emoji: "🍽️", startup: "KSh 70K", profit: "KSh 65K/mo", bg: "from-[#B91C1C] to-[#7F1D1D]" },
];

export default function Carousel() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCur((p) => (p + 1) % businesses.length), []);
  const prev = useCallback(() => setCur((p) => (p - 1 + businesses.length) % businesses.length), []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, 3800);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, next]);

  const pause = () => {
    setPaused(true);
    if (timer.current) clearInterval(timer.current);
    setTimeout(() => setPaused(false), 9000);
  };

  const getSlides = () => [-1, 0, 1].map((offset) => ({
    index: (cur + offset + businesses.length) % businesses.length,
    position: offset,
  }));

  return (
    <section id="carousel" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Business Ideas
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-blue-950 mb-3">
            100+ Ideas. Pick Yours.
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every guide includes startup capital, licensing, supplier contacts and profit projections — all Kenya-specific.
          </p>
        </motion.div>

        {/* Carousel track */}
        <div className="relative flex items-center justify-center gap-4 min-h-[380px] sm:min-h-[420px]" onMouseEnter={pause}>
          <button onClick={() => { prev(); pause(); }}
            className="absolute left-0 z-20 bg-white border border-slate-200 shadow-md rounded-full p-2 hover:bg-blue-950 hover:text-white hover:border-blue-950 transition-all">
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center justify-center gap-4 w-full overflow-hidden py-6">
            {getSlides().map(({ index, position }) => {
              const b = businesses[index];
              const isCenter = position === 0;
              return (
                <motion.div key={`${index}-${position}`}
                  animate={{ scale: isCenter ? 1 : 0.82, opacity: isCenter ? 1 : 0.45, zIndex: isCenter ? 10 : 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => { setCur(index); pause(); }}
                  className={`relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer select-none ${
                    isCenter ? "w-72 sm:w-[340px] lg:w-[380px]" : "w-56 sm:w-64 hidden sm:block"
                  }`}
                >
                  {/* BG */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${b.bg}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Dot pattern */}
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

                  <div className="relative p-7 min-h-[340px] sm:min-h-[380px] flex flex-col justify-between">
                    <div className="text-5xl">{b.emoji}</div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{b.name}</h3>
                      <p className="text-white/65 text-sm leading-relaxed mb-5">{b.desc}</p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2.5">
                          <p className="text-white/50 text-xs mb-0.5">Startup from</p>
                          <p className="text-white font-bold text-sm">{b.startup}</p>
                        </div>
                        <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2.5 text-right">
                          <p className="text-white/50 text-xs mb-0.5 flex items-center justify-end gap-1"><TrendingUp size={9} />Monthly profit</p>
                          <p className="text-green-300 font-bold text-sm">{b.profit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={() => { next(); pause(); }}
            className="absolute right-0 z-20 bg-white border border-slate-200 shadow-md rounded-full p-2 hover:bg-blue-950 hover:text-white hover:border-blue-950 transition-all">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {businesses.map((_, i) => (
            <button key={i} onClick={() => { setCur(i); pause(); }}
              className={`rounded-full transition-all duration-300 ${i === cur ? "w-7 h-2 bg-blue-950" : "w-2 h-2 bg-slate-300"}`} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#pricing"
            className="inline-flex items-center gap-2 bg-blue-950 text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-blue-900 transition-all hover:-translate-y-0.5 shadow-lg">
            Get the Full Library — 100+ Guides
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

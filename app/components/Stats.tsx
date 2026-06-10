"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(end / 80));
    const t = setInterval(() => {
      start = Math.min(start + step, end);
      setVal(start);
      if (start >= end) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [inView, end]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 100, suffix: "+", label: "Business Guides", sub: "Ready to download", emoji: "📚" },
  { value: 20, suffix: "+", label: "Categories", sub: "Agriculture to tech", emoji: "🗂️" },
  { value: 5000, suffix: "+", label: "Entrepreneurs", sub: "Across Kenya", emoji: "🧑‍💼" },
  { value: 5, suffix: " min", label: "Delivery Time", sub: "Via WhatsApp/Email", emoji: "⚡" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white dot-pattern">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm card-lift">
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-blue-950 mb-1">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="font-semibold text-sm text-ink mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

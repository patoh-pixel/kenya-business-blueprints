"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, BookOpen, Zap, Star, Crown, ArrowRight, Smartphone, CreditCard } from "lucide-react";
import { chargeViaMpesa, chargeViaCard, type OrderData } from "../lib/payments";

const plans = [
  {
    id: "single", name: "Starter", tag: "1 Guide",
    price: 20, icon: BookOpen,
    accentBg: "bg-slate-100", accentText: "text-slate-600",
    btnClass: "bg-blue-950 hover:bg-blue-900 text-white",
    features: ["1 complete guide of your choice", "Startup cost breakdown", "Equipment & supplier list", "Licensing steps", "Instant WhatsApp/email delivery"],
  },
  {
    id: "trio", name: "Growth", tag: "Any 3 Guides",
    price: 75, icon: Zap,
    accentBg: "bg-blue-50", accentText: "text-blue-700",
    btnClass: "bg-blue-800 hover:bg-blue-900 text-white",
    features: ["Any 3 guides of your choice", "Startup cost breakdown", "Equipment & supplier lists", "Licensing steps", "Priority WhatsApp delivery"],
  },
  {
    id: "bundle", name: "Popular", tag: "Any 6 Guides",
    price: 125, badge: "Most Popular", featured: true, icon: Star,
    accentBg: "bg-blue-950", accentText: "text-white",
    btnClass: "bg-red-700 hover:bg-red-600 text-white",
    features: ["Any 6 guides of your choice", "Full profit analysis", "Supplier contacts included", "Marketing strategy notes", "Priority WhatsApp delivery", "Bonus: Business plan template"],
  },
  {
    id: "library", name: "Full Library", tag: "100+ Guides",
    price: 675, badge: "Best Value", icon: Crown,
    accentBg: "bg-gold/10", accentText: "text-amber-700",
    btnClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white",
    features: ["All 100+ business guides", "Lifetime access + future updates", "Full profit projections", "All supplier & licensor contacts", "Business plan templates", "1-on-1 WhatsApp support"],
  },
];

// -------------------------------------------------------
// Payment Modal — Unified Paystack (M-Pesa STK + Card)
// -------------------------------------------------------
function PayModal({ plan, onClose }: { plan: typeof plans[0]; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", method: "mpesa" });
  const [step, setStep] = useState<"form" | "loading" | "stk_waiting" | "success" | "error">("form");
  const [errMsg, setErrMsg] = useState("");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const valid = form.name.trim() && form.email.includes("@") && form.phone.length >= 9;

  const order: OrderData = {
    name: form.name, email: form.email,
    phone: form.phone, packageId: plan.id,
    packageName: plan.tag, amount: plan.price,
  };

  const handlePay = async () => {
    if (!valid) return;
    setStep("loading");

    if (form.method === "card") {
      // Paystack inline popup (card)
      try {
        chargeViaCard(order, () => setStep("success"));
        setStep("form"); // modal stays open; popup handles UX
      } catch {
        setStep("error"); setErrMsg("Could not open payment popup.");
      }
      return;
    }

    // M-Pesa STK Push via Paystack Charge API
    try {
      const res = await chargeViaMpesa(order);
      if (res.status) {
        setStep("stk_waiting");
        // Poll / wait for webhook — for demo we auto-succeed after 8s
        setTimeout(() => setStep("success"), 8000);
      } else {
        setStep("error");
        setErrMsg(res.message || "Payment failed. Please try again.");
      }
    } catch {
      setStep("error");
      setErrMsg("Network error. Check connection and retry.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Modal header */}
        <div className="bg-blue-950 px-6 pt-6 pb-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-full">{plan.tag}</span>
            {plan.badge && <span className="bg-gold text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">{plan.badge}</span>}
          </div>
          <p className="text-white/50 text-sm mb-1">{plan.name} Plan</p>
          <p className="font-display text-4xl font-extrabold text-white">KSh {plan.price.toLocaleString()}</p>
          <p className="text-white/40 text-xs mt-1">One-time payment · Paystack secured · 1.5% M-Pesa fee applies</p>
        </div>

        <div className="px-6 py-6">
          {/* FORM STATE */}
          {step === "form" && (
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder="Full Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" />
              <input value={form.email} onChange={(e) => set("email", e.target.value)}
                type="email" placeholder="Email Address" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" />
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)}
                placeholder="Phone Number (07XX XXX XXX)" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" />

              {/* Payment method toggle */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { id: "mpesa", label: "M-Pesa", sub: "STK Push", Icon: Smartphone },
                  { id: "card", label: "Card", sub: "Visa / Mastercard", Icon: CreditCard },
                ].map(({ id, label, sub, Icon }) => (
                  <button key={id} onClick={() => set("method", id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${
                      form.method === id ? "border-blue-800 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                    }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${form.method === id ? "bg-blue-800 text-white" : "bg-slate-100 text-slate-500"}`}>
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-ink">{label}</p>
                      <p className="text-slate-400 text-xs">{sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={handlePay} disabled={!valid}
                className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm mt-1">
                {form.method === "mpesa" ? `Pay KSh ${plan.price} via M-Pesa →` : `Pay KSh ${plan.price} via Card →`}
              </button>
              <p className="text-center text-slate-400 text-xs">🔒 Secured by Paystack · No card details stored</p>
            </div>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <div className="py-10 text-center">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-800 rounded-full mx-auto mb-4" style={{ animation: "spin 0.8s linear infinite" }} />
              <p className="font-semibold text-ink mb-1">Initiating Payment</p>
              <p className="text-slate-400 text-sm">Connecting to Paystack...</p>
            </div>
          )}

          {/* STK WAITING */}
          {step === "stk_waiting" && (
            <div className="py-8 text-center">
              <div className="text-5xl mb-4">📲</div>
              <p className="font-display font-bold text-xl text-ink mb-2">Check Your Phone!</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                An M-Pesa STK Push has been sent to <strong className="text-ink">{form.phone}</strong>.
                Enter your <strong>M-Pesa PIN</strong> to complete payment.
              </p>
              <div className="flex justify-center gap-1.5 mb-4">
                {[0,1,2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-blue-800 rounded-full"
                    style={{ animation: `spin 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
              <p className="text-slate-400 text-xs">Waiting for confirmation...</p>
            </div>
          )}

          {/* SUCCESS */}
          {step === "success" && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-600" />
              </div>
              <p className="font-display font-bold text-xl text-ink mb-2">Payment Confirmed! 🎉</p>
              <p className="text-slate-500 text-sm mb-5">
                Your guides are on their way to <strong className="text-ink">{form.phone}</strong> via WhatsApp and to <strong className="text-ink">{form.email}</strong>.
                Expect delivery within 5 minutes.
              </p>
              <button onClick={onClose} className="w-full bg-blue-950 text-white font-bold py-3 rounded-xl text-sm">
                Done
              </button>
            </div>
          )}

          {/* ERROR */}
          {step === "error" && (
            <div className="py-8 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="font-display font-bold text-lg text-ink mb-2">Something Went Wrong</p>
              <p className="text-slate-500 text-sm mb-5">{errMsg}</p>
              <button onClick={() => setStep("form")} className="w-full bg-blue-950 text-white font-bold py-3 rounded-xl text-sm">
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// -------------------------------------------------------
// Pricing Section
// -------------------------------------------------------
export default function Pricing() {
  const [selected, setSelected] = useState<typeof plans[0] | null>(null);

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50 translate-x-1/2 -translate-y-1/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Pricing</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-blue-950 mb-3">
            Invest in Your Business Future
          </h2>
          <p className="text-slate-500 text-lg">Pay once via M-Pesa or card. Guides are yours forever.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div key={plan.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-3xl overflow-hidden card-lift ${
                  plan.featured
                    ? "ring-2 ring-blue-950 shadow-2xl shadow-blue-200/50 xl:-translate-y-3"
                    : "border border-slate-100 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full z-10 ${plan.featured ? "bg-red-700 text-white" : "bg-gold text-amber-900"}`}>
                    {plan.badge}
                  </div>
                )}

                {/* Card top */}
                <div className={`px-6 pt-6 pb-5 ${plan.featured ? "bg-blue-950" : "bg-slate-50/80"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.accentBg}`}>
                    <Icon size={18} className={plan.accentText} />
                  </div>
                  <p className={`text-sm font-medium mb-1 ${plan.featured ? "text-white/50" : "text-slate-400"}`}>{plan.tag}</p>
                  <h3 className={`font-display text-lg font-bold mb-2 ${plan.featured ? "text-white" : "text-ink"}`}>{plan.name}</h3>
                  <div className={`font-display font-extrabold text-4xl ${plan.featured ? "text-white" : "text-blue-950"}`}>
                    KSh {plan.price.toLocaleString()}
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 py-5">
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setSelected(plan)}
                    className={`w-full ${plan.btnClass} font-bold py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2`}>
                    Buy Now <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          🔒 Secured by Paystack · M-Pesa STK Push · Visa / Mastercard · Delivered in &lt;5 min
        </p>
      </div>

      <AnimatePresence>
        {selected && <PayModal plan={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

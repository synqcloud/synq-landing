"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Library, Gamepad2, RefreshCw, SlidersHorizontal, Zap, PlusCircle, CalendarDays, Headphones, type LucideIcon } from "lucide-react";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";

type Feature = { label: string; icon: LucideIcon };

const BASE_FEATURES: Feature[] = [
  { label: "MTG, Pokémon, Lorcana & more", icon: Gamepad2 },
  { label: "Daily prices from TCGPlayer", icon: RefreshCw },
  { label: "Custom condition adjustments", icon: SlidersHorizontal },
  { label: "Bulk price updates in one click", icon: Zap },
  { label: "One-click card & product creation", icon: PlusCircle },
  { label: "7-day free trial, no card required", icon: CalendarDays },
];

const plans = [
  {
    id: "scale", name: "Scale",
    monthlyPrice: 149, annualPrice: 99, annualTotal: 1192,
    description: "For high-volume card operations.",
    cta: "Start free trial",
    highlighted: false,
    features: [{ label: "Up to 50,000 cards managed", icon: Library }, ...BASE_FEATURES, { label: "Priority support", icon: Headphones }] as Feature[],
  },
  {
    id: "pro", name: "Pro",
    monthlyPrice: 79, annualPrice: 53, annualTotal: 632,
    description: "For shops ready to grow.",
    cta: "Start free trial",
    highlighted: true, badge: "Most popular",
    features: [{ label: "Up to 15,000 cards managed", icon: Library }, ...BASE_FEATURES] as Feature[],
  },
  {
    id: "starter", name: "Starter",
    monthlyPrice: 29, annualPrice: 19, annualTotal: 232,
    description: "Perfect for shops just getting started.",
    cta: "Start free trial",
    highlighted: false,
    features: [{ label: "Up to 2,000 cards managed", icon: Library }, ...BASE_FEATURES] as Feature[],
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-muted">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">Pricing</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em]">Simple, honest pricing.</h2>
              <p className="text-sm text-muted-foreground mt-2">7-day free trial on every plan.</p>
            </div>
            <div className="inline-flex bg-card border border-border rounded-lg p-1 flex-shrink-0 shadow-sm">
              {["Monthly", "Annual"].map((label) => {
                const active = label === "Annual" ? isAnnual : !isAnnual;
                return (
                  <button
                    key={label}
                    onClick={() => setIsAnnual(label === "Annual")}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                    {label === "Annual" && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        −33%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative flex flex-col rounded-xl p-6 border ${
                plan.highlighted
                  ? "bg-primary border-primary shadow-lg"
                  : "bg-card border-border shadow-sm"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card border border-border text-foreground text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                  {plan.badge}
                </span>
              )}
              <div className="mb-5">
                <h3 className={`text-base font-bold mb-1 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>{plan.name}</h3>
                <p className={`text-xs mb-4 ${plan.highlighted ? "text-primary-foreground/50" : "text-subtle"}`}>{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold tracking-tight ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/40" : "text-subtle"}`}>/mo</span>
                </div>
                <p className={`text-xs mt-1 ${plan.highlighted ? "text-primary-foreground/40" : "text-subtle"}`}>
                  {isAnnual ? `$${plan.annualTotal}/yr · save 33%` : "Billed monthly"}
                </p>
              </div>
              <div className={`border-t mb-5 ${plan.highlighted ? "border-primary-foreground/10" : "border-border"}`} />
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className={`w-3.5 h-3.5 flex-shrink-0 ${plan.highlighted ? "text-primary-foreground/40" : "text-subtle"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{f.label}</span>
                  </li>
                ))}
              </ul>
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-card"
                    : "bg-muted text-foreground hover:bg-muted"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xs text-subtle mt-4"
        >
          Cancel anytime from your Shopify admin. No hidden fees.
        </motion.p>
      </div>
    </section>
  );
}

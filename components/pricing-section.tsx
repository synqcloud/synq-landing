"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@synq/ui/component";

const SHOPIFY_APP_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_APP_URL ||
  "https://apps.shopify.com/synq";

// Ordered: most expensive first (anchoring effect)
const plans = [
  {
    id: "business",
    name: "Business",
    monthlyPrice: 79,
    annualPrice: 63,
    annualTotal: 756,
    description: "High-volume sellers.",
    features: [
      "Unlimited cards",
      "Bulk operations",
      "Priority support",
      "Multi-game (coming soon)",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 39,
    annualPrice: 31,
    annualTotal: 372,
    description: "Growing stores.",
    features: [
      "Up to 500 cards",
      "Bulk operations",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 19,
    annualPrice: 15,
    annualTotal: 180,
    description: "Getting started.",
    features: [
      "Up to 100 cards",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

const SHARED_FEATURES = [
  "Daily price syncs",
  "Market price tracking",
  "Condition-based pricing",
  "Shopify auto-sync",
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] },
  },
};

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <motion.div
      className="py-16 bg-muted/30"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        {/* Header + toggle in one row on desktop */}
        <motion.div variants={fadeInUp} className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-2">
            Simple, transparent pricing
          </h2>
          <p className="text-sm text-muted-foreground">
            All plans include a free trial. No credit card required.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center mb-8"
        >
          <div className="inline-flex items-center rounded-lg border border-border bg-card/50 p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isAnnual
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeInUp}
              className={`relative border rounded-lg bg-card/50 p-6 flex flex-col ${
                plan.highlighted
                  ? "border-primary shadow-md"
                  : "border-border"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header + Price */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-foreground">
                  {plan.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-medium text-foreground">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                {isAnnual ? (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                    ${plan.annualTotal}/yr — save ${plan.monthlyPrice * 12 - plan.annualTotal}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Billed monthly
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-border mb-4" />

              {/* Plan-specific features */}
              <ul className="space-y-2 mb-5 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className="w-full"
                size="sm"
                variant={plan.highlighted ? "default" : "outline"}
              >
                <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Shared features */}
        <motion.div variants={fadeInUp} className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            All plans include:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {SHARED_FEATURES.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Check className="w-3 h-3 text-primary" />
                {feature}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            7-day free trial on all plans. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const conditions = [
  { grade: "NM", label: "Near Mint",         adj: "Base price",  highlight: true },
  { grade: "LP", label: "Lightly Played",    adj: "−10%",        highlight: false },
  { grade: "MP", label: "Moderately Played", adj: "−20%",        highlight: false },
  { grade: "HP", label: "Heavily Played",    adj: "−35%",        highlight: false },
  { grade: "DMG", label: "Damaged",          adj: "−50%",        highlight: false },
];

export function ConditionPricingSection() {
  return (
    <section id="condition-pricing" className="py-10 bg-muted">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
              Multi-Condition Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-4">
              Price each condition automatically.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-7">
              Not every card is Near Mint. Synq creates Shopify variants for each condition with configurable adjustments. Set it once and let it run.
            </p>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              {conditions.map((c, i) => (
                <div
                  key={c.grade}
                  className={`flex items-center justify-between px-4 py-3 ${
                    i < conditions.length - 1 ? "border-b border-border" : ""
                  } ${c.highlight ? "bg-primary" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold w-10 ${c.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                      {c.grade}
                    </span>
                    <span className={`text-sm ${c.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {c.label}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${c.highlight ? "text-primary-foreground" : "text-muted-foreground"}`}>
                    {c.adj}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-subtle mt-2.5">
              All percentages are fully customizable in settings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="screenshot-frame"
          >
            <Image
              src="/brand/shopify-magic-the-gathering-product-variants.png"
              alt="Condition-based pricing showing Shopify product variants"
              width={1200} height={700}
              sizes="(max-width: 768px) 100vw, 600px"
              className="w-full h-auto"
              quality={90}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

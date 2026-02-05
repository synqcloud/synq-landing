"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ConditionPricingSection() {
  return (
    <section id="condition-pricing" className="py-24">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            Multi-Condition Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 max-w-2xl">
            Price each condition automatically based on market rates
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Not every card is Near Mint. Synq creates Shopify variants for each
            condition with configurable price adjustments based on market
            rates.
          </p>
        </motion.div>

        {/* Condition Pricing Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border overflow-hidden shadow-lg"
        >
          <Image
            src="/brand/shopify-magic-the-gathering-product-variants.png"
            alt="Synq condition-based pricing showing Shopify product variants for different card conditions"
            width={1200}
            height={700}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="w-full h-auto"
            quality={85}
          />
        </motion.div>
      </div>
    </section>
  );
}

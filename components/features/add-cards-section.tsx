"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  { num: "1", label: "Search", desc: "By name, set or collector number" },
  { num: "2", label: "Pick", desc: "The printing and the conditions you stock" },
  { num: "3", label: "Add", desc: "Priced by your rules, live on Shopify" },
];

export function AddCardsSection() {
  return (
    <section id="add-cards" className="py-10">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
            Add products
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-3 max-w-xl">
            Add cards to your store in seconds.
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Search a catalog of singles, sealed product and decks. Synq creates the Shopify product with its image, title, a variant per condition and a price from your rules. Cards you already stock show their stock on the tile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="screenshot-frame"
        >
          <Image
            src="/screens/add-products.webp"
            alt="Searching Synq's catalog for Charizard ex, with the printings already in the store shown first"
            width={2000} height={1210}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="w-full h-auto"
            quality={90}
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 grid sm:grid-cols-3 gap-3"
        >
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-3.5 p-4 bg-card rounded-xl border border-border">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {step.num}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
                <p className="text-xs text-subtle mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

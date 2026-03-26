"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  { num: "1", label: "Search", desc: "Find any card by name or set" },
  { num: "2", label: "Configure", desc: "Choose conditions and pricing rules" },
  { num: "3", label: "Publish", desc: "Live on Shopify in seconds" },
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
            Card Search & Product Creation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-3 max-w-xl">
            Add cards to your store in seconds.
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Search our database, pick a card and its condition, and Synq creates a complete Shopify product — image, title, description, and market price included.
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
            src="/brand/add-magic-cards-to-shopify.png"
            alt="Synq card search — add Magic: The Gathering cards to Shopify instantly"
            width={1200} height={700}
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

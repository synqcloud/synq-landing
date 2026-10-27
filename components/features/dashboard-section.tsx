"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function DashboardSection() {
  return (
    <section id="dashboard" className="py-10 bg-muted">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
            Inventory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-3 max-w-xl">
            Manage your TCG inventory card by card.
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Every card by game, with its market price, your price, cost and margin side by side. Filter, save views, edit a price in place, and change stock, cost or conditions for many cards at once.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="screenshot-frame"
        >
          <Image
            src="/screens/inventory.webp"
            alt="Synq inventory filtered to Pokémon, with market, listed price, cost and margin per card and bulk actions for four selected cards"
            width={2000} height={1112}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="w-full h-auto"
            quality={90}
          />
        </motion.div>
      </div>
    </section>
  );
}

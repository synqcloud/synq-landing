"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function DashboardSection() {
  return (
    <section id="dashboard" className="py-10">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
            Dashboard & Batch Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-3 max-w-xl">
            See everything. Update in bulk.
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Your dashboard shows every managed card, total inventory value, and exactly which cards need price updates. Select a batch, update all prices in one click.
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
            src="/brand/dashboard.png"
            alt="Synq dashboard — manage card inventory and bulk update prices"
            width={1200} height={700}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="w-full h-auto"
            quality={90}
          />
        </motion.div>
      </div>
    </section>
  );
}

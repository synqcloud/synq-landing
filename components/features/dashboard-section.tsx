"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function DashboardSection() {
  return (
    <section id="dashboard" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            Dashboard & Batch Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 max-w-2xl">
            See your entire inventory at a glance, update prices in bulk
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Your dashboard shows cards managed, total inventory value, and which
            cards need price updates. Select multiple cards and update all their
            prices with one click.
          </p>
        </motion.div>

        {/* Dashboard Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border overflow-hidden shadow-lg"
        >
          <Image
            src="/brand/dashboard.png"
            alt="Synq dashboard showing card inventory management and bulk price update operations"
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

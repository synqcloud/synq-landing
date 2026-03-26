"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    when: "Today",
    title: "Install and configure",
    desc: "Connect Synq to your Shopify store in minutes. No dev work required.",
  },
  {
    number: "2",
    when: "Day 1",
    title: "Add your first cards",
    desc: "Search any card, pick your conditions, and Synq builds a complete Shopify product instantly.",
  },
  {
    number: "3",
    when: "Week 1+",
    title: "Automated pricing running",
    desc: "Synq checks TCGPlayer every 24 hours. Update stale listings with one click, or let it run on its own.",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] max-w-lg">
            Up and running in a day.
            Automated from week one.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-[18px] left-[calc(16.666%+18px)] right-[calc(16.666%+18px)] h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex md:flex-col gap-5 md:gap-0"
              >
                {/* Circle */}
                <div className="flex-shrink-0 flex md:mb-6 items-start">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold relative z-10">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs font-semibold text-subtle uppercase tracking-wider mb-1">
                    {step.when}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

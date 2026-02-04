"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@synq/ui/component";

export function TimelineSection() {
  const milestones = [
    {
      day: "Today",
      title: "Install and configure",
      items: [
        "Install Synq on your Shopify store",
        "Choose your selling region (US or EU)",
        "Select a product template preset",
        "Configure condition pricing adjustments",
      ],
    },
    {
      day: "Day 1",
      title: "Add your first cards",
      items: [
        "Search and add cards to your store",
        "Products created with images and prices",
        "Variants for each condition you sell",
        "Publish products when ready",
      ],
    },
    {
      day: "Week 1",
      title: "Automated pricing running",
      items: [
        "Prices sync automatically every 24 hours",
        "Dashboard shows cards needing updates",
        "Update all prices with one click",
        "Prices update automatically from here",
      ],
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4">
            Up and running in a week
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Here's what a typical first week looks like.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {milestone.day}
                </span>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-4">
                {milestone.title}
              </h3>
              <ul className="space-y-2">
                {milestone.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild>
            <a href="#contact">Start for free</a>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            7-day free trial, no credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

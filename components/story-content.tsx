"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Section wrapper for scroll-triggered animation
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StoryContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-2xl"
    >
      <Section className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            The Problem
          </h3>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              Card prices change constantly. A card worth $5 today might be $15
              tomorrow after a tournament result or new set announcement. If
              your Shopify prices don't keep up, you're either losing sales (too
              high) or losing profit (too low).
            </p>
            <p>
              Manually checking market prices and updating each product is tedious.
              Most sellers don't have time for it, so they leave money on the
              table.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            The Solution
          </h3>
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              Synq is a Shopify app that connects your store to market
              pricing. Add new cards with one click (images, descriptions, and
              prices included). See which products need price updates. Apply
              changes instantly.
            </p>
            <p>
              Built by a card seller who got tired of the manual work. If you
              have a Shopify store selling Pokemon, Magic, or other trading
              cards, this app is for you.
            </p>
          </div>
          <p className="text-sm">
            <Link href="#contact" className="text-primary hover:text-primary/80 transition-colors">
              Questions or feedback? Get in touch
            </Link>
          </p>
        </div>
      </Section>
    </motion.div>
  );
}

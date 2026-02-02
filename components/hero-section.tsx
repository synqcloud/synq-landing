"use client";

import { motion } from "framer-motion";
import { Button } from "@synq/ui/component";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function HeroSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1, delayChildren: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.02em] text-foreground mb-6 leading-[1.15] max-w-3xl"
          >
            Keep your Shopify TCG prices synced with TCGPlayer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1], delay: 0.05 }}
            className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed"
          >
            Add cards to your Shopify store with images, descriptions, and TCGPlayer prices. Update prices with one click. Stop leaving money on the table.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1], delay: 0.1 }}
            className="text-base text-muted-foreground mb-8 max-w-2xl"
          >
            For Pokemon, Magic: The Gathering, and other TCGs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1], delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button asChild>
              <a href="#install">Get started</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#features">See how it works</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1], delay: 0.3 }}
        >
          <Image
            src={
              mounted && resolvedTheme === "dark"
                ? "/brand/synq-eyecatcher-dark.png"
                : "/brand/synq-eyecatcher-light.png"
            }
            alt="Synq - TCGPlayer Price Sync for Shopify"
            width={1200}
            height={800}
            className="w-full h-auto shadow-xl rounded-lg border border-border/50"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";
import { Check } from "lucide-react";
import { Button } from "@synq/ui/component";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] },
  },
};

export function ContactPricingSection() {
  const features = [
    "Add cards to Shopify with images and descriptions",
    "Daily price sync from TCGPlayer or Cardmarket",
    "One-click bulk price updates",
    "Support for Pokemon, Magic, and more",
    "Set your own markup percentage",
  ];

  return (
    <motion.div
      className="py-24 bg-muted/30"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto px-6 border-t border-border pt-24">
        <motion.div variants={fadeInUp} className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4">
            Get Started
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Install Synq on your Shopify store and start keeping your card
            prices competitive.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form - Left Column */}
          <motion.div variants={fadeInUp} className="lg:pr-8">
            <h3 className="text-xl font-medium text-foreground mb-3">
              Request Your Install Link
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Share your details and we'll send you a direct link to install
              Synq on your Shopify store.
            </p>
            <ContactForm />
          </motion.div>

          {/* Pricing Card - Right Column */}
          <motion.div variants={fadeInUp} className="lg:pl-8">
            <div className="sticky top-8 border border-border rounded-lg bg-card/50 p-8 max-w-md">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4">
                  SHOPIFY APP
                </span>
                <h3 className="text-xl font-medium text-foreground mb-1">
                  Synq for Shopify
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-medium text-foreground">
                    $19
                  </span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  7-day free trial included
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full">
                <a href="#contact">Request install link</a>
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                We'll send you a direct install link for your store
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@synq/ui/component";

const SHOPIFY_APP_URL = "https://apps.shopify.com/synq-tcg-card-manager";

export function InstallRequestSection() {
  return (
    <section id="get-started" className="py-24">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-3">
            Ready to automate your card pricing?
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8">
            Install Synq directly from the Shopify App Store. 7-day free trial, no credit card required.
          </p>
          <Button asChild size="lg">
            <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer">
              Install on Shopify
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Available on the Shopify App Store
          </p>
        </motion.div>
      </div>
    </section>
  );
}

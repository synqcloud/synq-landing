"use client";

import { motion } from "framer-motion";
import { InstallRequestForm } from "./install-request-form";

export function InstallRequestSection() {
  return (
    <section id="get-started" className="py-24">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-3">
            Get early access
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Enter your Shopify store domain and we'll send you a direct install link.
          </p>
        </motion.div>

        <InstallRequestForm />
      </div>
    </section>
  );
}

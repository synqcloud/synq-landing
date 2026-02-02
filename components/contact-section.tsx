"use client";

import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";

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

export function ContactSection() {
  return (
    <motion.div
      className="bg-muted/30 py-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-md">
          <motion.h2
            className="text-2xl sm:text-3xl font-light text-foreground mb-3"
            variants={fadeInUp}
          >
            Get Your Install Link
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground mb-8"
            variants={fadeInUp}
          >
            Share your details and we'll send you a direct link to install Synq on your Shopify store.
          </motion.p>
          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { Button, Input, Label } from "@synq/ui/component";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] },
  },
};

export function InstallRequestForm() {
  const [shopifyDomain, setShopifyDomain] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopifyDomain || !email) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: shopifyDomain,
          email,
          storeType: "install-request",
          role: "",
          frustration: `Shopify domain: ${shopifyDomain}`,
          wantsUpdates: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/20 mb-4">
          <CheckCircle className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          Request received
        </h3>
        <p className="text-muted-foreground text-sm">
          We'll send your install link shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div>
        <Label htmlFor="shopify-domain">Shopify Store Domain</Label>
        <div className="flex items-center gap-0 mt-1.5">
          <Input
            id="shopify-domain"
            type="text"
            value={shopifyDomain}
            onChange={(e) => setShopifyDomain(e.target.value.replace(/\s/g, "").toLowerCase())}
            placeholder="yourstore"
            required
            disabled={isLoading}
            className="rounded-r-none border-r-0"
          />
          <span className="inline-flex items-center px-3 h-9 text-sm text-muted-foreground bg-muted border border-border rounded-r-md">
            .myshopify.com
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="request-email">Email</Label>
        <Input
          id="request-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
          className="mt-1.5"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !shopifyDomain || !email}
        className="w-full"
      >
        {isLoading ? "Sending..." : "Request Install Link"}
      </Button>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        We'll send you a direct install link for your store.
      </p>
    </motion.form>
  );
}

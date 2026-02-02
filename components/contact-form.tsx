"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Input,
  Textarea,
  Label,
} from "@synq/ui/component";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [storeType, setStoreType] = useState("");
  const [role, setRole] = useState("");
  const [frustration, setFrustration] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [wantsUpdates, setWantsUpdates] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !storeType) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          storeType,
          role,
          frustration,
          wantsUpdates,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 border border-primary/20">
          <CheckCircle className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-3xl font-light text-foreground mb-4">
            Thanks for sharing!
          </h2>
          <p className="text-muted-foreground mb-4">
            We'll be in touch soon to keep the conversation going.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.form
        id="contact"
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto space-y-4 text-left"
        role="form"
        aria-label="Contact us form"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* First Name */}
        <motion.div variants={fadeInUp}>
          <Label htmlFor="firstName-input">First Name</Label>
          <Input
            id="firstName-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
            disabled={isLoading}
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={fadeInUp}>
          <Label htmlFor="email-input">Email</Label>
          <Input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isLoading}
            aria-describedby={error ? "form-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
        </motion.div>

        {/* Store Type - usando shadcn Select */}
        <motion.div variants={fadeInUp}>
          <Label htmlFor="storeType-select">Do you have a Shopify store?</Label>
          <Select
            value={storeType}
            onValueChange={(value) => setStoreType(value)}
          >
            <SelectTrigger id="storeType-select" disabled={isLoading}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shopify-yes">Yes, I have a Shopify store</SelectItem>
              <SelectItem value="shopify-planning">Planning to set one up</SelectItem>
              <SelectItem value="shopify-no">No, I use another platform</SelectItem>
              <SelectItem value="other">Other / Just exploring</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Role */}
        <motion.div variants={fadeInUp}>
          <Label htmlFor="role-input">Role or Title (optional)</Label>
          <Input
            id="role-input"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Owner, Manager, Solo seller, etc."
            disabled={isLoading}
          />
        </motion.div>

        {/* Frustration */}
        <motion.div variants={fadeInUp}>
          <Label htmlFor="frustration-input">
            What TCGs do you sell? Any specific needs? (optional)
          </Label>
          <Textarea
            id="frustration-input"
            value={frustration}
            onChange={(e) => setFrustration(e.target.value)}
            placeholder="e.g., Pokemon and Magic. Looking for price sync..."
            disabled={isLoading}
            className="min-h-[90px]"
          />
        </motion.div>

        {/* Checkbox */}
        <motion.div variants={fadeInUp} className="flex items-center gap-2">
          <input
            id="updates-checkbox"
            type="checkbox"
            checked={wantsUpdates}
            onChange={(e) => setWantsUpdates(e.target.checked)}
            disabled={isLoading}
            className="h-4 w-4 text-primary border-input rounded focus:ring-ring"
          />
          <Label htmlFor="updates-checkbox">
            Send me the install link when ready
          </Label>
        </motion.div>

        {/* Submit */}
        <motion.div variants={fadeInUp}>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !firstName || !email || !storeType}
            aria-describedby={isLoading ? "loading-status" : undefined}
            className="w-full text-[10px] uppercase tracking-[0.2em] py-3 h-auto rounded-lg font-medium disabled:opacity-50 transition-all duration-200"
          >
            {isLoading ? "Sending..." : "Send it over"}
          </Button>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            id="form-error"
            role="alert"
            aria-live="polite"
            className="text-sm text-destructive mt-2"
            variants={fadeInUp}
          >
            {error}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}

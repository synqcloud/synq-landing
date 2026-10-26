"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button, Input, Textarea, Label } from "@synq/ui/component";
import { getAttribution } from "@/lib/attribution";

const TOPICS = [
  "Support with the app",
  "Question before installing",
  "Bug report",
  "Feature request",
  "Other",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shop, setShop] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Anti-spam: bots fill the hidden field and submit instantly.
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());

  const canSubmit = name.trim() && email.trim() && message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.trim(),
          email: email.trim(),
          shop: shop.trim(),
          storeType: topic,
          frustration: message.trim(),
          page: window.location.pathname,
          attribution: getAttribution(),
          website,
          elapsedMs: Date.now() - startedAt,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center py-12 gap-3 text-center border border-border rounded-xl bg-card">
        <CheckCircle className="w-10 h-10 text-green-500" />
        <p className="text-lg font-semibold text-foreground">We got your message</p>
        <p className="text-sm text-muted-foreground">
          Thanks {name}! You&apos;ll get a reply at {email}, usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-6 border border-border rounded-xl bg-card">
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="contact-shop">Shopify store (optional)</Label>
          <Input id="contact-shop" placeholder="your-store.myshopify.com" value={shop} onChange={(e) => setShop(e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="contact-topic">Topic</Label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us what you need. For issues: what you expected, what happened, and any error message you saw."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or email{" "}
          <a href="mailto:iamtelmoo@gmail.com" className="underline">iamtelmoo@gmail.com</a>.
        </p>
      )}

      <Button type="submit" disabled={!canSubmit || status === "sending"}>
        {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

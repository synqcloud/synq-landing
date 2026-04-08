"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Input,
  Textarea,
  Label,
} from "@synq/ui/component";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

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
          storeType: "General inquiry",
          frustration: message.trim(),
          wantsUpdates: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form after close animation
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setStatus("idle");
      }, 200);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg sm:max-w-lg">
        {status === "sent" ? (
          <div className="flex flex-col items-center py-8 gap-3 text-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <DialogTitle>We got your message</DialogTitle>
            <DialogDescription>
              Thanks {name}! We typically reply within one business day.
            </DialogDescription>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Submit a support ticket</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll follow up by email. Usually within one business day.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="contact-message">What's going on?</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Describe the issue in as much detail as you can: what you expected, what happened, and any error messages you saw."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">
                  Something went wrong. Please try again or email us at{" "}
                  <a href="mailto:support@synq.cards" className="underline">
                    support@synq.cards
                  </a>
                  .
                </p>
              )}

              <Button type="submit" disabled={!canSubmit || status === "sending"}>
                {status === "sending" ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {status === "sending" ? "Sending..." : "Send ticket"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

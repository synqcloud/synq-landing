"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";

export function TicketButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="w-6 h-6 rounded bg-muted flex items-center justify-center shrink-0">
          <Plus className="w-3.5 h-3.5" />
        </span>
        New Support Ticket
      </button>

      <ContactModal open={open} onOpenChange={setOpen} />
    </>
  );
}

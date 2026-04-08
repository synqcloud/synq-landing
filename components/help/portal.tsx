"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookOpen, Users } from "lucide-react";
import { DocMeta } from "@/lib/docs";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@synq/ui/component";

interface PortalProps {
  grouped: Record<string, DocMeta[]>;
  communitySlot: React.ReactNode;
}

export function Portal({ grouped, communitySlot }: PortalProps) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"kb" | "community">(
    searchParams.get("tab") === "community" ? "community" : "kb"
  );

  return (
    <div className="bg-card rounded border border-border">
      {/* Tab bar */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setTab("kb")}
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${
            tab === "kb"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Knowledge Base
        </button>
        <button
          onClick={() => setTab("community")}
          className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium border-b-2 transition-colors ${
            tab === "community"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" />
          Roadmap &amp; Community
        </button>
      </div>

      {/* Knowledge Base tab */}
      {tab === "kb" && (
        <div className="p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BookOpen />
              </EmptyMedia>
              <EmptyTitle>Knowledge base coming soon</EmptyTitle>
              <EmptyDescription>
                We&apos;re writing guides and tutorials. Check back soon or reach out if you need help now.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      )}

      {/* Community tab — server-rendered content passed as slot */}
      {tab === "community" && communitySlot}
    </div>
  );
}

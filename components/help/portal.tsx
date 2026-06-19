"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import type { DocMeta } from "@/lib/docs";
import { CATEGORY_ORDER } from "@/lib/docs-config";
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

  // Known categories first (in configured order), then any extras, skipping
  // empty ones so the grid only shows categories that actually have articles.
  const categories = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]?.length),
    ...Object.keys(grouped).filter(
      (c) => !CATEGORY_ORDER.includes(c) && grouped[c]?.length
    ),
  ];

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
      {tab === "kb" &&
        (categories.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 p-8">
            {categories.map((cat) => (
              <section key={cat}>
                <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-foreground">
                  {cat}
                  <span className="font-normal text-muted-foreground">
                    ({grouped[cat].length})
                  </span>
                </h3>
                <ul className="space-y-3">
                  {grouped[cat].map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/help/${doc.slug}`}
                        className="flex items-start gap-2.5 text-sm text-foreground transition-colors hover:text-primary"
                      >
                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="leading-snug">{doc.frontmatter.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ))}

      {/* Community tab — server-rendered content passed as slot */}
      {tab === "community" && communitySlot}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, MessageSquare, ChevronUp, Loader2, X } from "lucide-react";

interface ArticleResult {
  type: "article";
  slug: string;
  title: string;
  category: string;
  snippet: string;
}

interface DiscussionResult {
  type: "discussion";
  number: number;
  title: string;
  description: string;
  votesCount: number;
  status: string;
  url: string;
  tags: string[];
}

interface SearchResults {
  articles: ArticleResult[];
  discussions: DiscussionResult[];
}

const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  planned: "Planned",
  started: "In Progress",
  completed: "Completed",
  declined: "Declined",
  duplicate: "Duplicate",
};

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/help/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Search failed");
      const data: SearchResults = await res.json();
      setResults(data);
    } catch {
      setResults({ articles: [], discussions: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => search(query), 300);
    return () => clearTimeout(t);
  }, [query, search]);

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const showDropdown =
    focused && query.length >= 2 && (loading || results !== null);

  const hasResults =
    results && (results.articles.length > 0 || results.discussions.length > 0);

  function clear() {
    setQuery("");
    setResults(null);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => { if (e.key === "Enter") { setFocused(true); search(query); } }}
          placeholder="Enter your search term here..."
          aria-label="Search support articles and discussions"
          autoComplete="off"
          className="w-full pl-4 pr-16 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query && (
            <button
              onClick={clear}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {loading ? (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
          ) : (
            <button
              onClick={() => { setFocused(true); search(query); }}
              aria-label="Search"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-1.5 w-full sm:min-w-[500px] bg-card border border-border rounded-lg shadow-xl z-[100] overflow-hidden">
          {loading && !results && (
            <div className="px-4 py-6 text-sm text-muted-foreground text-center">
              Searching…
            </div>
          )}

          {!loading && results && !hasResults && (
            <div className="px-4 py-6 text-sm text-muted-foreground text-center">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {results && hasResults && (
            <div className="max-h-[480px] overflow-y-auto">
              {/* Articles */}
              {results.articles.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Articles
                  </p>
                  {results.articles.map((a) => (
                    <button
                      key={a.slug}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        router.push(`/help/${a.slug}`);
                        setFocused(false);
                        setQuery("");
                      }}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-t border-border first:border-t-0"
                    >
                      <BookOpen className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                          {a.snippet}
                        </p>
                        <span className="text-xs text-primary mt-0.5 block">{a.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Discussions */}
              {results.discussions.length > 0 && (
                <div className={results.articles.length > 0 ? "border-t border-border" : ""}>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Community
                  </p>
                  {results.discussions.map((d) => (
                    <a
                      key={d.number}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setFocused(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors border-t border-border first:border-t-0"
                    >
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug">{d.title}</p>
                        {d.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{d.description}</p>
                        )}
                      </div>
                      <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <ChevronUp className="w-3 h-3" />
                          {d.votesCount}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded border border-border text-muted-foreground whitespace-nowrap">
                          {STATUS_LABEL[d.status] ?? d.status}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

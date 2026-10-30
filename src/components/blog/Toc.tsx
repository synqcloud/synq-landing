"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/* "On this page": built on the server from the post's headings; the client
   only marks the section being read. */
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    /* the active heading is the last one that has scrolled past the top band */
    const onScroll = () => {
      const line = 140;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
        else break;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="blog-toc">
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
        On this page
      </p>
      <ul className="mt-3 flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              data-level={item.level}
              className="blog-toc-link"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

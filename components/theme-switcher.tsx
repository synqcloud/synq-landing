"use client";

import { useEffect, useState } from "react";

export const themes = [
  { id: "warm",         label: "Warm",        swatch: "#E8D5C4" },
  { id: "synq-og",      label: "Synq OG",     swatch: "#3730eb" },
  { id: "blue",         label: "Blue",        swatch: "#2d5fa3" },
  { id: "blue-dark",    label: "Blue Dark",   swatch: "#1e3a8a" },
  { id: "graphite",     label: "Graphite",    swatch: "#888888" },
  { id: "graphite-dark",label: "Graphite Dk", swatch: "#333333" },
  { id: "nature",       label: "Nature",      swatch: "#4a8c4e" },
  { id: "nature-dark",  label: "Nature Dk",   swatch: "#1f3320" },
  { id: "clay",         label: "Clay",        swatch: "#8b7fe8" },
  { id: "clay-dark",    label: "Clay Dark",   swatch: "#3b2f1e" },
  { id: "dark",         label: "Dark",        swatch: "#292524" },
  { id: "bw",           label: "B&W",         swatch: "#888888" },
];

export function ThemeSwitcher() {
  const [activeId, setActiveId] = useState("warm");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeId);
  }, [activeId]);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-2 shadow-lg">
      <span className="text-[10px] font-semibold text-subtle uppercase tracking-widest mr-1 pl-1">
        Theme
      </span>
      {themes.map((t) => {
        const isActive = t.id === activeId;
        return (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            title={t.label}
            className={`group flex flex-col items-center gap-1 px-2 py-1 rounded-full transition-all ${
              isActive ? "bg-muted" : "hover:bg-muted"
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full border-2 transition-transform ${
                isActive ? "scale-110 border-foreground/30" : "border-transparent"
              }`}
              style={{ background: t.swatch }}
            />
            <span className={`text-[9px] font-medium leading-none ${isActive ? "text-foreground" : "text-subtle"}`}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

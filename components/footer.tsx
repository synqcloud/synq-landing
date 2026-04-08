import Link from "next/link";
import { Logo } from "./logo";

const links = [
  { label: "Features", href: "/#features" },
  { label: "Pricing",  href: "/pricing" },
  { label: "FAQ",      href: "/#faq" },
  { label: "Blog",     href: "/blog" },
  { label: "Help",     href: "/help" },
  { label: "Community & Roadmap", href: "/help?tab=community" },
  { label: "Privacy",  href: "/privacy" },
  { label: "Terms",    href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <Logo size="sm" />
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {links.map((link) =>
              "external" in link ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-subtle hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-subtle hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-subtle">© 2025 Synq. All rights reserved.</p>
          <p className="text-xs text-subtle">Automated card pricing for Shopify stores.</p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer className="py-8 border-t border-border/20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            © 2025 Synq
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#install"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about-us"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#install"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Synq
          </p>
        </div>
      </div>
    </footer>
  );
}

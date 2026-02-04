interface CtaBoxProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export function CtaBox({
  title = "Ready to automate your card shop?",
  description = "Synq keeps your Shopify store prices synced with the market.",
  buttonText = "Get early access",
  href = "/#get-started",
}: CtaBoxProps) {
  return (
    <div className="not-prose my-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
      <p className="mb-2 text-lg font-semibold text-foreground">{title}</p>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <a
        href={href}
        className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {buttonText}
      </a>
    </div>
  );
}

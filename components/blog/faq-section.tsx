interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="not-prose my-12">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-card"
          >
            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-foreground">
              {item.question}
              <span className="ml-2 text-muted-foreground transition-transform group-open:rotate-180">
                &#9660;
              </span>
            </summary>
            <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

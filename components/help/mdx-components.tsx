import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const docsMdxComponents: Record<string, any> = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-4 text-xl font-semibold tracking-tight text-foreground scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-2 text-[15px] font-semibold text-foreground scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 text-[15px] leading-7 text-foreground/90" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:opacity-75"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-primary underline underline-offset-4 hover:opacity-75"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="mb-4 ml-5 space-y-2 list-disc marker:text-muted-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mb-4 ml-5 space-y-2 list-decimal marker:text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-[15px] leading-7 text-foreground/90 pl-1" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-xl bg-muted p-4 text-xs font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-5 rounded-r-lg border-l-2 border-primary/50 bg-muted/50 py-3 pl-4 pr-4 text-[15px] leading-7 text-foreground/90 [&>p]:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/60 text-left" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-2.5 text-sm text-foreground/90 border-t border-border align-top"
      {...props}
    >
      {children}
    </td>
  ),
  hr: () => <hr className="my-6 border-border" />,
};

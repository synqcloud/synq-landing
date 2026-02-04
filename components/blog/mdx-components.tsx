import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { CtaBox } from "./cta-box";
import { FaqSection } from "./faq-section";

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mt-6 mb-2 text-lg font-semibold text-foreground"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props}>
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
          className="text-primary underline underline-offset-4 hover:text-primary/80"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-primary underline underline-offset-4 hover:text-primary/80"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b border-border" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left font-medium text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-border px-4 py-3 text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={800}
      height={450}
      className="my-6 rounded-lg border border-border"
      {...(props as any)}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  // Custom components available in MDX
  CtaBox,
  FaqSection,
};

import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import CtaCard from "./CtaCard";
import PostFaq from "./PostFaq";
import type { TocItem } from "./Toc";

/* MDX for the blog: GFM (tables, task lists), heading ids, and the two
   components the old posts could call. Styling lives in blog.css (.blog-prose). */

type Components = NonNullable<Parameters<typeof compileMDX>[0]["components"]>;

const components: Components = {
  a: ({ href = "", children, ...props }) => {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    /* site links (/blog/<slug>, /docs/...) are English URLs, unprefixed */
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  table: ({ children, ...props }) => (
    <div className="blog-table" role="region" aria-label="Table" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  ),
  img: ({ src, alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : ""} alt={alt} loading="lazy" decoding="async" {...props} />
  ),
  CtaBox: CtaCard,
  FaqSection: ({ items }: { items: { question: string; answer: string }[] }) => <PostFaq items={items} />,
};

type HNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
};

const textOf = (n: HNode): string =>
  n.type === "text" ? n.value ?? "" : (n.children ?? []).map(textOf).join("");

/* runs after rehype-slug: collects h2/h3 for the table of contents */
function rehypeToc(out: TocItem[]) {
  return () => (tree: HNode) => {
    const walk = (n: HNode) => {
      if (n.type === "element" && (n.tagName === "h2" || n.tagName === "h3")) {
        const id = n.properties?.id;
        if (typeof id === "string") out.push({ id, text: textOf(n).trim(), level: n.tagName === "h2" ? 2 : 3 });
        return;
      }
      n.children?.forEach(walk);
    };
    walk(tree);
  };
}

export async function renderPost(source: string) {
  const toc: TocItem[] = [];
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeToc(toc)],
      },
    },
  });
  return { content, toc };
}

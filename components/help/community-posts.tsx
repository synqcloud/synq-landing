import { getFiderPosts, getFiderTags, fiderPostUrl, STATUS_LABEL, STATUS_CLASS } from "@/lib/fider";
import { ArrowUpRight, ChevronUp, MessageSquare } from "lucide-react";

const FIDER_URL = "https://synq.fider.io";

export async function CommunityPosts() {
  const [trending, planned, allTags] = await Promise.all([
    getFiderPosts("trending", 8),
    getFiderPosts("planned", 4),
    getFiderTags(),
  ]);

  const tagBySlug = Object.fromEntries(allTags.map((t) => [t.slug, t.name]));

  return (
    <div className="p-8 space-y-10">
      {/* Top CTA */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Vote on requests or submit your own ideas
        </p>
        <a
          href={FIDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
        >
          Open community
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Planned / In Progress — shown first */}
      {planned.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm">
              Planned &amp; in progress
            </h3>
            <a
              href={`${FIDER_URL}?view=planned`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:opacity-75 transition-opacity"
            >
              View all
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <ul className="divide-y divide-border">
            {planned.map((post) => (
              <li key={post.id}>
                <a
                  href={fiderPostUrl(post)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3.5 group"
                >
                  <div className="flex flex-col items-center gap-0.5 w-10 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-xs font-semibold tabular-nums">
                      {post.votesCount}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded border border-border text-muted-foreground"
                          >
                            {tagBySlug[tag] ?? tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASS[post.status]}`}
                    >
                      {STATUS_LABEL[post.status]}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Trending */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground text-sm">
            Trending requests
          </h3>
          <a
            href={`${FIDER_URL}?view=trending`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:opacity-75 transition-opacity"
          >
            View all
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {trending.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {trending.map((post) => (
              <li key={post.id}>
                <a
                  href={fiderPostUrl(post)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3.5 group"
                >
                  {/* Vote count */}
                  <div className="flex flex-col items-center gap-0.5 w-10 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-xs font-semibold tabular-nums">
                      {post.votesCount}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </p>
                    {post.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {post.description}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded border border-border text-muted-foreground"
                          >
                            {tagBySlug[tag] ?? tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    {post.commentsCount > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        {post.commentsCount}
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASS[post.status]}`}
                    >
                      {STATUS_LABEL[post.status]}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* CTA */}
      <div className="pt-2 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Vote on requests or submit your own ideas
        </p>
        <a
          href={FIDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
        >
          Open community
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

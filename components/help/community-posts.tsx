import {
  getFeedbackSuggestions,
  feedbackPostUrl,
  getTextPreview,
  STATUS_LABEL,
  STATUS_CLASS,
  FEEDBACK_URL,
} from "@/lib/feedback";
import { ArrowUpRight, ChevronUp, MessageSquare } from "lucide-react";

export async function CommunityPosts() {
  const [trending, planned] = await Promise.all([
    getFeedbackSuggestions("trending", 8),
    getFeedbackSuggestions("planned", 4),
  ]);

  return (
    <div className="p-8 space-y-10">
      {/* Top CTA */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Vote on requests or submit your own ideas
        </p>
        <a
          href={FEEDBACK_URL}
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
              href={`${FEEDBACK_URL}/roadmap`}
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
                  href={feedbackPostUrl(post)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-3.5 group"
                >
                  <div className="flex flex-col items-center gap-0.5 w-10 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-xs font-semibold tabular-nums">
                      {post.vote_count}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </p>
                    {post.type && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <span className="text-xs px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                          {post.type.name}
                        </span>
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
            href={FEEDBACK_URL}
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
            {trending.map((post) => {
              const preview = getTextPreview(post.body, 100);
              return (
                <li key={post.id}>
                  <a
                    href={feedbackPostUrl(post)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 py-3.5 group"
                  >
                    {/* Vote count */}
                    <div className="flex flex-col items-center gap-0.5 w-10 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-xs font-semibold tabular-nums">
                        {post.vote_count}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </p>
                      {preview && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {preview}
                        </p>
                      )}
                      {post.type && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          <span className="text-xs px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                            {post.type.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {post.comment_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3" />
                          {post.comment_count}
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
              );
            })}
          </ul>
        )}
      </section>

      {/* CTA */}
      <div className="pt-2 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Vote on requests or submit your own ideas
        </p>
        <a
          href={FEEDBACK_URL}
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

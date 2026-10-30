import { llmsTxt } from "@/lib/llms";

/* /llms.txt (llmstxt.org): what Synq is, for AI assistants */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

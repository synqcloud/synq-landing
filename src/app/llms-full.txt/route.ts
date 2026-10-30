import { llmsFullTxt } from "@/lib/llms";

/* /llms-full.txt: the help center, FAQ, game pages and blog in full text */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

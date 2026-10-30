import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /* everything but API routes, Next internals, files (anything with a dot:
     robots.txt, sitemap.xml, llms.txt, favicon.ico...) and the generated
     share images */
  matcher: ["/((?!api|_next|_vercel|og/|opengraph-image|twitter-image|.*\\..*).*)"],
};

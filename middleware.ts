// Vercel Edge Middleware — DataFast AI crawler tracking.
//
// Why this exists: the DataFast script in every page's <head> can only see
// visitors that run JavaScript. AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// OAI-SearchBot…) do not, so they are invisible to it. Bot traffic has to be
// caught server-side, and on a static site the only server-side hook Vercel
// gives us is middleware.
//
// This is the whole point for us: the AI visibility audit found Iro is cited on
// branded prompts and absent on discovery ones, and the thing we have never been
// able to measure is whether the assistants are actually FETCHING /llms.txt,
// /llms-full.txt, /iro.json and /ai-info. This answers that directly.
//
// Deliberately non-blocking: trackAICrawlerRequest is NOT awaited. It schedules
// its POST with waitUntil and returns immediately, so no visitor ever waits on
// DataFast. It also fails open — a DataFast outage cannot take pages down.
//
// The local user-agent check inside the package is only a cost pre-filter;
// DataFast's servers do the real provider/IP classification, which means the
// crawler list updates without us bumping this package.

import { next, waitUntil } from '@vercel/functions';
import { trackAICrawlerRequest } from '@datafast/ai-crawl';

export const config = {
  // Skip static assets so we are not paying for an edge invocation on every
  // image and font. Crawler-facing files are deliberately NOT excluded:
  // robots.txt, llms.txt, llms-full.txt, iro.json and the sitemaps are exactly
  // the URLs we most want to see AI crawlers hitting.
  matcher: [
    '/((?!assets/|_vercel/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|mjs|woff|woff2|ttf|otf|mp4|webm)$).*)',
  ],
};

export default function middleware(request: Request) {
  try {
    // Three-arg overload: (request, waitUntil-context, config). Not awaited on
    // purpose — see the note above.
    trackAICrawlerRequest(request, { waitUntil }, {
      websiteId: 'dfid_pTmvsHyl8feOT2EfmXOim',
      domain: 'tryiro.com',
    });
  } catch {
    // Never let analytics break a page request.
  }

  return next();
}

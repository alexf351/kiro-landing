// Vercel Edge Middleware — AI crawler tracking, reported to PostHog.
//
// Why this exists: the analytics script in every page's <head> only sees
// visitors that run JavaScript. AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// OAI-SearchBot, the *-User answer fetchers…) do not, so they are invisible to
// it. On a static site the only server-side hook Vercel gives us is middleware.
//
// The thing we want to know: are the assistants actually FETCHING /llms.txt,
// /llms-full.txt, /iro.json and /ai-info, which pages do the training crawlers
// take, and do the answer fetchers (ChatGPT-User, Claude-User) hit us for live
// user questions. Every match becomes one PostHog event, `ai_crawler_hit`, with
// the bot, its provider, the category, the path and the surface, so the same
// PostHog project that holds the human analytics answers the crawler questions.
//
// Until 2026-09-09 this reported to DataFast (@datafast/ai-crawl). That did IP
// verification of crawlers on its servers; this does not, so a spoofed
// user-agent counts. Treat volumes as directional. Classification lives here in
// BOTS, so a new crawler means adding a row, not upgrading a package.
//
// Deliberately non-blocking: the POST is scheduled with waitUntil and never
// awaited, so no visitor waits on PostHog, and every path fails open — an
// analytics outage cannot take a page down.

import { next, waitUntil } from '@vercel/functions';

export const config = {
  // Skip static assets so we are not paying for an edge invocation on every
  // image and font. Crawler-facing files are deliberately NOT excluded:
  // robots.txt, llms.txt, llms-full.txt, iro.json and the sitemaps are exactly
  // the URLs we most want to see AI crawlers hitting.
  matcher: [
    '/((?!assets/|_vercel/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|mjs|woff|woff2|ttf|otf|mp4|webm)$).*)',
  ],
};

// Same project write key the pages use in posthog.init(); it is public by design.
const POSTHOG_HOST = 'https://us.i.posthog.com';
const POSTHOG_KEY = 'phc_WkvD7IaVmxRJFXWpiu5MkabZL1iQZpPmDTvMmQTkXkc';
const EVENT = 'ai_crawler_hit';

export type Category = 'training' | 'answer_fetch' | 'search_index' | 'other';
export interface Hit { bot: string; provider: string; category: Category }

// Order matters: the *-User and *-SearchBot agents are matched before the
// broader training crawlers from the same provider.
const BOTS: Array<[RegExp, string, string, Category]> = [
  [/ChatGPT-User/i, 'ChatGPT-User', 'OpenAI', 'answer_fetch'],
  [/OAI-SearchBot/i, 'OAI-SearchBot', 'OpenAI', 'search_index'],
  [/GPTBot/i, 'GPTBot', 'OpenAI', 'training'],
  [/Claude-User/i, 'Claude-User', 'Anthropic', 'answer_fetch'],
  [/Claude-SearchBot/i, 'Claude-SearchBot', 'Anthropic', 'search_index'],
  [/ClaudeBot|anthropic-ai/i, 'ClaudeBot', 'Anthropic', 'training'],
  [/Perplexity-User/i, 'Perplexity-User', 'Perplexity', 'answer_fetch'],
  [/PerplexityBot/i, 'PerplexityBot', 'Perplexity', 'search_index'],
  [/Google-Extended/i, 'Google-Extended', 'Google', 'training'],
  [/Google-CloudVertexBot/i, 'Google-CloudVertexBot', 'Google', 'training'],
  [/GoogleOther/i, 'GoogleOther', 'Google', 'other'],
  [/MistralAI-User/i, 'MistralAI-User', 'Mistral', 'answer_fetch'],
  [/DuckAssistBot/i, 'DuckAssistBot', 'DuckDuckGo', 'answer_fetch'],
  [/meta-externalfetcher/i, 'Meta-ExternalFetcher', 'Meta', 'answer_fetch'],
  [/meta-externalagent|FacebookBot/i, 'Meta-ExternalAgent', 'Meta', 'training'],
  [/Applebot-Extended/i, 'Applebot-Extended', 'Apple', 'training'],
  [/Amazonbot/i, 'Amazonbot', 'Amazon', 'training'],
  [/Bytespider/i, 'Bytespider', 'ByteDance', 'training'],
  [/CCBot/i, 'CCBot', 'Common Crawl', 'training'],
  [/cohere-ai|cohere-training-data-crawler/i, 'cohere-ai', 'Cohere', 'training'],
  [/AI2Bot/i, 'AI2Bot', 'Ai2', 'training'],
  [/YouBot/i, 'YouBot', 'You.com', 'search_index'],
  [/Diffbot/i, 'Diffbot', 'Diffbot', 'training'],
  [/omgili|webzio/i, 'Omgili', 'Webz.io', 'training'],
  [/Timpibot/i, 'Timpibot', 'Timpi', 'search_index'],
  [/PetalBot/i, 'PetalBot', 'Huawei', 'search_index'],
  [/ImagesiftBot/i, 'ImagesiftBot', 'Hive', 'training'],
];

export function classify(userAgent: string): Hit | null {
  if (!userAgent) return null;
  for (const [re, bot, provider, category] of BOTS) {
    if (re.test(userAgent)) return { bot, provider, category };
  }
  return null;
}

// Which part of the site was asked for. Lets a PostHog breakdown answer "is
// anyone reading llms.txt" without a regex in the dashboard.
export function surfaceFor(pathname: string): string {
  const p = pathname.toLowerCase();
  if (p === '/llms.txt' || p === '/llms-full.txt' || p === '/llms-index.txt' || p.startsWith('/llms/')) return 'llms';
  if (p === '/ai-info' || p === '/ai-info.html' || p === '/ai.txt') return 'ai-info';
  if (p === '/iro.json' || p === '/localization.json') return 'product-feed';
  if (p === '/robots.txt') return 'robots';
  if (p.endsWith('sitemap.xml') || p === '/sitemap-index.xml') return 'sitemap';
  if (p === '/rss.xml' || p === '/atom.xml' || p === '/feed.json' || p.startsWith('/blog/rss')) return 'feed';
  if (p === '/' || p === '/index.html') return 'home';
  if (p === '/blog' || p === '/blog/' || p === '/blog/index.html') return 'blog-hub';
  if (p.startsWith('/blog/')) return 'blog-post';
  if (p === '/paths' || p === '/paths.html') return 'path-library';
  if (p.startsWith('/learn-') || p.startsWith('/ai-for-') || p.endsWith('-course') || p.endsWith('-course.html')) return 'path-page';
  return 'page';
}

function report(request: Request, hit: Hit, userAgent: string): Promise<void> {
  const url = new URL(request.url);
  const body = {
    api_key: POSTHOG_KEY,
    event: EVENT,
    distinct_id: `crawler:${hit.bot}`,
    timestamp: new Date().toISOString(),
    properties: {
      $process_person_profile: false,
      $lib: 'iro-edge-middleware',
      $current_url: url.href,
      bot: hit.bot,
      provider: hit.provider,
      category: hit.category,
      surface: surfaceFor(url.pathname),
      path: url.pathname,
      query: url.search.slice(0, 200),
      host: url.hostname,
      method: request.method,
      user_agent: userAgent.slice(0, 300),
      referer: request.headers.get('referer') || null,
      country: request.headers.get('x-vercel-ip-country') || null,
    },
  };
  return fetch(`${POSTHOG_HOST}/capture/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(() => undefined)
    .catch(() => undefined);
}

export default function middleware(request: Request) {
  try {
    const userAgent = request.headers.get('user-agent') || '';
    const hit = classify(userAgent);
    if (hit) waitUntil(report(request, hit, userAgent));
  } catch {
    // Never let analytics break a page request.
  }
  return next();
}

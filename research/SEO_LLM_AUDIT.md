# SEO and LLM SEO Audit — Iro AI Website

Audit date: 2026-05-18
Site: https://tryiro.com

## Executive summary

The site already has a strong SEO/LLM foundation: canonical URLs, a sitemap, permissive robots rules for search and AI crawlers, an `llms.txt` product brief, FAQ structured data, app structured data, social metadata on the landing page and quiz, and crawlable long-form body copy.

This pass fixed several crawl/discovery gaps and documents the remaining highest-impact opportunities.

## Fixes completed in this pass

1. Added `WebSite` structured data to the homepage so crawlers and LLMs can more reliably connect the landing page, brand name, app icon, publisher entity, and site description.
2. Added meta descriptions, Open Graph, Twitter card, and page-level JSON-LD to privacy, terms, and account-deletion pages.
3. Added extensionless redirects for `/privacy`, `/terms`, `/quiz`, and `/delete-account`, because LLM-facing copy references clean URLs while canonical HTML files live at `.html` paths.
4. Updated `llms.txt` with canonical/legal/support links, sitemap and robots references, and a fresh last-updated date.
5. Refreshed sitemap `lastmod` values for updated pages.
6. Added a fuller `/llms-full.txt` reference and linked it from HTML heads, `/llms.txt`, and `robots.txt`.
7. Added Vercel headers for text/XML machine-readable files so crawlers receive explicit content types.
8. Added footer discovery links for support and machine-readable resources.
9. Added crawlable topic and comparison pages for ChatGPT, prompt engineering, AI agents, Duolingo-style AI learning, AI learning app intent, and company/about trust signals.
10. Expanded coverage with Claude, Gemini, Perplexity, AI for marketing, AI for students, AI for work, AI automation, iPhone learning, and AI course alternative pages.

## Current strengths

- **Entity clarity:** The homepage uses product, app, organization, FAQ, and video schema.
- **LLM discovery:** `robots.txt` explicitly welcomes major AI crawlers and points to the sitemap; the homepage exposes `/llms.txt` as an alternate text reference.
- **Commercial-intent copy:** Homepage copy targets concrete use cases and tools including ChatGPT, Claude, Gemini, Perplexity, AI agents, automation, image/video generation, and prompt engineering.
- **Indexable quiz asset:** The AI IQ test has its own canonical URL, meta description, social metadata, and quiz schema.
- **Canonical consolidation:** Old `trykiro.app` hosts permanently redirect to `tryiro.com`.

## Remaining priority opportunities

### P0 — Validate production crawlability

- Run Google Search Console URL Inspection for `/`, `/quiz.html`, `/llms.txt`, `/sitemap.xml`, `/privacy.html`, and `/terms.html`.
- Confirm Vercel serves `/llms.txt` as `text/plain` and `/sitemap.xml` as `application/xml` or `text/xml`.
- Confirm extensionless redirects return `308`/`301` and land on the canonical `.html` URLs.

### P1 — Expand topic hub coverage

Crawlable topic pages now exist for `/learn-chatgpt`, `/learn-claude`, `/learn-gemini`, `/learn-perplexity`, `/prompt-engineering-app`, `/ai-agents-course`, `/ai-automation-course`, `/ai-for-marketing`, `/ai-for-students`, `/ai-for-work`, `/duolingo-for-ai`, `/best-ai-learning-app`, and `/about`. Next high-intent pages to add are:

- `/ai-for-healthcare`
- `/ai-for-finance`
- `/ai-for-managers`
- `/vibe-coding-course`
- `/ai-image-generation-course`
- `/ai-video-generation-course`
- `/ai-job-hunting`

Each page should keep unique title/description, useful body copy, product screenshots, internal links to the App Store and quiz, FAQ schema, and clear canonical tags.

### P1 — Expand `/llms-full.txt` over time

The new `/llms-full.txt` covers product/entity basics, features, pricing, URLs, social profiles, FAQs, and assistant guidance. Keep it updated whenever pricing, platform support, lesson counts, or positioning changes. Consider adding a dated changelog section once product updates become frequent.

### P1 — Improve internal linking

- Link to the quiz from more mid-page sections, not only the nav.
- Add footer links to account deletion and sitemap.
- Add contextual links from FAQ answers to the quiz and App Store.

### P1 — Add more comparison and alternative-intent pages

Initial comparison/alternative-intent coverage now includes `/duolingo-for-ai`, `/best-ai-learning-app`, `/iro-ai-vs-video-courses`, `/learn-ai-on-iphone`, and `/ai-course-alternative`. Additional pages to consider:

- `/ai-learning-app-for-beginners`
- `/prompt-engineering-course-alternative`
- `/best-chatgpt-course-alternative`

These should avoid unsupported competitor claims. Focus on use-case fit, active practice, mobile sessions, and transparent pricing.

### P1 — Add author/company credibility signals

For stronger E-E-A-T and LLM confidence, add a crawlable About/Company section or page with:

- Who built Iro and why.
- Editorial/content review process for lessons and weekly AI news.
- Contact/support details.
- Links to official social profiles.
- A visible date for pages where freshness matters.

### P2 — Add proof/trust signals only when verifiable

If available, add real App Store rating/review count, user count, press mentions, or testimonials. Avoid fake ratings in JSON-LD; structured data should only include claims visible on-page and verifiable.

### P2 — Expand image SEO

- Add width/height attributes to major images to reduce layout shift and improve page quality signals.
- Keep decorative mascot alt text empty, but make app screenshot alt text specific to the displayed feature.
- Consider dedicated image sitemap entries for app screenshots and the OG image.

### P2 — Performance and crawl budget

- Reduce unused Google Font weights.
- Consider splitting large inline CSS/JS if production performance metrics show parser-blocking cost.
- Continue preferring WebP and responsive `srcset` for screenshots.

## Suggested monitoring

Track these metrics after deploy:

- Google Search Console indexed pages and impressions by query group.
- Search appearance for FAQ/app rich results.
- Referrers from AI assistants and answer engines.
- Crawl hits and status codes for `/llms-full.txt` in addition to `/llms.txt`.
- Crawl hits for `/llms.txt`, `/robots.txt`, `/sitemap.xml`, and extensionless redirect URLs.
- Quiz impressions, starts, completions, and App Store click-through rate.

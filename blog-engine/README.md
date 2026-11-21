# Iro AI Blog Engine

JSON in → a standardized, SEO/GEO-optimized blog out. You write content as
structured JSON; one zero-dependency Node script renders every artifact (post
pages, **content-pillar hubs**, the index, feeds, LLM mirrors, sitemap) in the
exact Iro AI design system, with **cross-linking** and structured data baked in.

No build tools, no framework, no `npm install`. Just Node 18+.

```bash
node blog-engine/build.mjs                 # render everything from content/*.json
node blog-engine/generate-hero-image.mjs   # generate hero/OG covers for new posts
node blog-engine/tools/sitemap-lastmod.mjs # sitemap.xml + sitemap-index.xml lastmod from git (body-text changes only)
```

**sitemap.xml and llms.txt fill themselves.** Vercel runs
`node scripts/seo-indexes.mjs --deploy` before every deploy (the `buildCommand`
in `vercel.json`). It scans the published HTML and adds every indexable page that
isn't listed by hand (every post, hub and `<locale>/blog/` translation, with its
lastmod and hreflang) to the AUTO block of `sitemap.xml`, and rewrites the
"Every blog post, by topic" section of `llms.txt`. A new post needs no edit to
either file. Run `node scripts/seo-indexes.mjs` to refresh the committed copies,
or `--check` to see whether they are stale. It lives outside `blog-engine/`
because `.vercelignore` drops that folder before the build.

---

## Why this exists

The blog used to be hand-written HTML — every post duplicated ~75 lines of head
meta, JSON-LD, nav, CSS, and footer. That's error-prone and doesn't scale. The
engine makes content the only thing you author; everything mechanical (meta,
Open Graph, Twitter cards, JSON-LD `BlogPosting`/`FAQPage`/`BreadcrumbList`,
TOC, feeds, sitemap, `llms/` markdown mirrors, internal links) is generated and
always consistent.

It also adds the two things a flat list of posts was missing for SEO:

1. **Content pillars** — topic-cluster hub pages (`/blog/ai-fluency`, etc.) that
   group related posts. Pillars are the #1 structural SEO win: a hub page targets
   a broad head term and links to deep-dive posts that target long-tail terms.
2. **Cross-linking** — every post links *up* to its pillar and *across* to
   siblings; every pillar links *down* to its cluster. Bidirectional internal
   links spread authority and keep readers (and crawlers) moving.

---

## Directory layout

```
blog-engine/
  build.mjs                  # the generator (run this)
  generate-hero-image.mjs    # AI / branded hero+OG image generator
  import-existing.mjs         # one-time migration of legacy HTML posts → JSON
  hero-prompts.json           # generated: AI image prompt per cover
  lib/
    site.config.json          # brand, nav, footer, CTA, feeds, domain
    png.mjs                   # zero-dep PNG encoder + branded cover renderer
  content/
    pillars/*.json            # pillar (topic-cluster hub) definitions
    posts/*.json              # blog post definitions
  dist/
    vercel-blog-rewrites.json # generated: clean-URL rewrites for vercel.json
```

### What gets written (repo root)

| Output | From |
| --- | --- |
| `blog/<slug>.html` | each post + each pillar |
| `blog/index.html` | pillar-grouped index |
| `blog/rss.xml`, `blog/atom.xml`, `blog/feed.json` | all posts |
| `llms/blog/<slug>.md` + `index.md` | LLM-readable markdown mirrors |
| `blog-sitemap.xml` | index + pillars + posts (with image entries) |
| `assets/og/<slug>.png` | hero/OG cover per post + pillar (image script) |

---

## Add a new post

1. Create `content/posts/<slug>.json` (copy an existing one). Minimum fields:

   ```jsonc
   {
     "slug": "my-post",            // = URL /blog/my-post and file name
     "order": 7,                    // sort order in index/feeds (lower = first)
     "pillar": "ai-fluency",       // which pillar cluster it belongs to
     "title": "...",
     "lede": "...",                 // one-line hook (shown in hero + short feeds)
     "description": "...",          // meta description (150–160 chars, long feeds)
     "keywords": ["...", "..."],
     "datePublished": "2026-06-01",
     "dateModified": "2026-06-01",
     "readingTime": 7,              // minutes
     "articleSection": "AI fluency",
     "feedCategory": "AI fluency",  // single category for RSS/Atom
     "feedTags": ["AI fluency"],    // tags for JSON Feed
     "inlineCtaAfter": 2,           // insert the inline CTA after section N
     "toc": [{ "href": "#x", "label": "..." }],
     "sections": [{ "id": "x", "heading": "...", "html": "<p>...</p>" }],
     "readNext": [{ "href": "/blog/...", "label": "..." }],
     "faq": [{ "q": "...", "a": "<p>...</p> or text" }],
     "related": ["/learn-chatgpt", "/blog/other-post"]
   }
   ```

   - `sections[].html` is verbatim body HTML (`<p>`, `<ul>/<ol>`, `<blockquote>`,
     `<strong>/<em>/<code>`, `<a href>`). Keep links **relative** (`/blog/...`).
   - `related` drives both the `<link rel="related">` tags and the JSON-LD
     `mentions[]` — list the internal pages this post references. This is your
     **cross-linking** surface; link siblings in the same pillar generously.
   - `readNext` is the visible "Read next" block (typically 4 links).

2. `node blog-engine/build.mjs` — renders the post and refreshes index, feeds,
   sitemap, and the pillar it belongs to (the pillar auto-lists it).

3. `node blog-engine/generate-hero-image.mjs` — creates `assets/og/<slug>.png`.

4. If the build prints a "missing /blog rewrites" warning, copy the entry from
   `dist/vercel-blog-rewrites.json` into `vercel.json` (clean URLs).

## Add a new pillar

Create `content/pillars/<slug>.json`:

```jsonc
{
  "slug": "ai-tools",
  "order": 4,
  "title": "Full pillar title (head term)",
  "shortName": "AI Tools",          // used in the post meta chip + nav
  "tagline": "one line for cards",
  "lede": "hero subtitle",
  "description": "meta description",
  "keywords": ["..."],
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-01",
  "intro": ["<p>...</p>", "<p>...</p>"],   // hub body copy (aim 250–400 words)
  "faq": [{ "q": "...", "a": "..." }],
  "related": ["/blog/..."],                  // <link rel=related> targets
  "relatedLabels": [{ "href": "/...", "label": "..." }]  // extra "Explore more"
}
```

Posts join a pillar by setting `"pillar": "<slug>"`. The pillar page lists its
cluster automatically — no need to hand-maintain the list.

---

## Hero / OG images

`generate-hero-image.mjs` produces one 1200×630 cover per post and pillar.

- **Default (offline, zero-dep):** renders an on-brand navy/cyan/gold cover with
  the title baked in (`lib/png.mjs`). Always works.
- **AI (`--ai`):** with `OPENAI_API_KEY` set, calls the OpenAI Images API using a
  brand-consistent prompt. Falls back to the branded cover on any error.
- **Manual:** every cover's prompt is written to `hero-prompts.json`. Generate a
  richer image in any tool (Midjourney, Ideogram, ChatGPT) and drop it in at
  `assets/og/<slug>.png` — no code change needed.

```bash
node blog-engine/generate-hero-image.mjs            # fill missing covers
node blog-engine/generate-hero-image.mjs --force    # regenerate all
node blog-engine/generate-hero-image.mjs --ai       # use the image API
```

### Branded covers (mascot + headline)

`tools/branded-covers.mjs` renders the richer Iro cover: site fonts, the real app
icon as the mascot, an eyebrow (Review, Alternatives, Buyer's guide...), the
headline and the part of the title after a colon as a subline. It writes the
same `assets/og/<slug>.png`, so og:image, twitter:image and the on-page cover
all switch over with no HTML change. Posts with their own hero art are skipped.
Pages that are not blog posts (like `/ai-learning-statistics`) and per-slug copy
overrides live in `covers.json`.

```bash
# once: headless Chrome deps, kept outside the repo
mkdir -p ~/.iro-covers && (cd ~/.iro-covers && npm i puppeteer-core@23 @sparticuz/chromium@131)
export COVER_DEPS=~/.iro-covers          # or CHROME_PATH=/path/to/Chrome on a Mac

node blog-engine/tools/branded-covers.mjs --latest 10               # newest posts
node blog-engine/tools/branded-covers.mjs ai-learning-statistics    # one page
node blog-engine/tools/branded-covers.mjs --all                     # everything
```

Covers are palette-compressed to about 140 KB (about 210 KB with brand logos)
when `python3` with Pillow is installed; `COVER_RAW=1` skips that. Note that
`generate-hero-image.mjs --force` would overwrite branded covers with the plain
text cards.

**Brand logos.** When a post's headline (the title before any colon) names a
brand listed under `brands` in `covers.json`, that brand's logo goes on a tile
along the bottom of the mascot, up to 3 per cover. Posts that name more than 3
registered brands get none. Logos live in `assets/brands/<key>.png` and are the
brand's own App Store icon, saved as-is at 384×384 (never redrawn or recolored).
To add a brand, save its icon there and add an entry:

```jsonc
"perplexity": { "name": "Perplexity", "logo": "assets/brands/perplexity.png", "match": ["Perplexity"] }
```

`match` is case-sensitive and whole-word. To choose logos by hand for one post,
set `"logos": ["claude", "chatgpt"]` in its `overrides` entry, or `"logos": []`
to drop them.

---

## SEO / GEO

Every page the engine emits ships with: canonical + hreflang, full Open
Graph/Twitter cards, Dublin Core, robots directives, `BlogPosting` +
`BreadcrumbList` + `FAQPage` JSON-LD with `speakable`, an on-page TOC, a
markdown mirror under `/llms/` for AI crawlers, and feed + sitemap entries.

For the strategy behind it — the full GEO checklist, an honest "do we have
this?" audit, how to do keyword research, and how to earn backlinks — see
**[SEO-GEO-PLAYBOOK.md](./SEO-GEO-PLAYBOOK.md)**.

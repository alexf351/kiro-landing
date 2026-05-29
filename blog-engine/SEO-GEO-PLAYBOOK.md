# SEO + GEO Playbook for Iro AI

**SEO** = ranking in search engines (Google, Bing).
**GEO** = Generative Engine Optimization — getting *cited and recommended* by AI
answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini).

They overlap but aren't identical. SEO rewards authority + relevance + clean
crawlability. GEO rewards content that's *easy for an LLM to extract, quote, and
attribute*: clear claims, structured answers, definitions, stats, FAQs, and
machine-readable mirrors.

This doc has four parts:

1. [The checklist + honest audit](#1-the-checklist--do-we-have-this) — "do we have all this?"
2. [How the engine bakes GEO in](#2-what-the-engine-does-for-you)
3. [Keyword research, step by step](#3-keyword-research-how-to-actually-do-it)
4. [Backlinks + timeline + cadence](#4-backlinks-timeline-and-cadence)

---

## 1. The checklist — do we have this?

Status against `tryiro.com` as of this writing.

### Technical SEO foundations

| Item | Status | Notes |
| --- | --- | --- |
| HTTPS, single canonical host | ✅ | old `trykiro.app` 301s → `tryiro.com` |
| `robots.txt` welcoming search + AI crawlers | ✅ | lists every sitemap |
| XML sitemaps (+ sitemap index) | ✅ | `sitemap.xml`, `news-`, `image-`, `blog-sitemap.xml` |
| Canonical + hreflang on every page | ✅ | engine emits both |
| Clean URLs (extensionless) | ✅ | `vercel.json` rewrites; engine flags missing ones |
| Mobile-first, fast, responsive | ✅ | inline CSS, WebP, `srcset` |
| Per-page meta description + title | ✅ | unique per post/pillar |
| Open Graph + Twitter cards + OG image | ✅ | 1200×630 per page |
| Favicon / manifest / theme-color | ✅ | shared chrome |

### Structured data (the SEO ↔ GEO bridge)

| Item | Status | Notes |
| --- | --- | --- |
| `Organization` / `WebSite` entity | ✅ | homepage |
| `SoftwareApplication` | ✅ | app schema |
| `BlogPosting` per post | ✅ | engine |
| `BreadcrumbList` (incl. pillar level) | ✅ | engine |
| `FAQPage` per post + pillar | ✅ | engine |
| `CollectionPage` + `ItemList` per pillar | ✅ | engine |
| `speakable` (voice / assistant) | ✅ | engine |
| `Article` dates (`datePublished`/`modified`) | ✅ | engine |

### Content architecture

| Item | Status | Notes |
| --- | --- | --- |
| Topic clusters / content pillars | ✅ **(new)** | 3 pillar hubs, engine-managed |
| Bidirectional internal linking | ✅ **(new)** | pillar ↔ cluster + sibling cross-links |
| "Read next" + contextual in-body links | ✅ | engine |
| Table of contents w/ anchors | ✅ | engine |
| RSS / Atom / JSON feeds | ✅ | engine |

### GEO-specific (getting cited by AI)

| Item | Status | Notes |
| --- | --- | --- |
| `llms.txt` + `llms-full.txt` | ✅ | product brief for LLMs |
| `ai.txt` crawler policy | ✅ | welcomes AI agents |
| Per-page **markdown mirror** (`/llms/...`) | ✅ | clean text for extraction |
| `<link rel="alternate" type="text/markdown">` | ✅ | engine points crawlers to the .md |
| Question-style H2s + direct answers | ✅ | how content is written |
| FAQ blocks (extractable Q&A) | ✅ | engine |
| Definitions / "X is …" sentences | ✅ | e.g. agents post opens with a definition |
| Citable stats with context | ⚠️ partial | add more sourced numbers (see §2) |
| TL;DR / key-takeaways block | ⚠️ gap | strongest single GEO upgrade to add next |
| Author / E-E-A-T signals | ⚠️ partial | `/about` exists; add a named author + bio |
| First-hand data / original research | ⚠️ gap | quiz score distributions = untapped goldmine |

**Verdict:** the foundation is genuinely strong — better than most startups. The
real gaps are *content* gaps, not plumbing: TL;DR blocks, more cited statistics,
named-author E-E-A-T, and original data. The next section turns those into a
repeatable recipe; §3–4 cover the off-page work (keywords + backlinks) that the
site can't generate for itself.

---

## 2. What the engine does for you

Every post/pillar the engine renders is GEO-ready by construction:

- **Extractable structure** — question H2s, short answer-first paragraphs, lists,
  an FAQ block, and a TOC. LLMs lift these almost verbatim into answers.
- **Three machine-readable surfaces** — HTML, JSON-LD, and a `/llms/blog/<slug>.md`
  markdown mirror linked from `<head>`. Answer engines prefer clean markdown.
- **Entity clarity** — `BlogPosting` + `FAQPage` + `BreadcrumbList` + pillar
  `CollectionPage`/`ItemList`, all cross-referenced by `@id`.
- **Topic authority** — pillar clusters tell crawlers "this site is *about* AI
  fluency / prompting / agents," not a scattering of one-off posts.

### Writing rules to maximise GEO (apply when authoring JSON)

1. **Answer in the first sentence.** Lead each section with the claim, then
   support it. LLMs quote opening sentences.
2. **One idea per H2, phrased as the query.** "When are AI agents worth it?"
   beats "Use cases."
3. **Put a number on it.** "~5 minutes a day for 2–3 weeks" is more citable than
   "a little daily practice." When you cite an external stat, name the source in
   the sentence so the model can attribute it.
4. **Add a TL;DR** (gap above). A 2–3 bullet summary right under the lede is the
   single highest-leverage GEO block — it's what gets pulled into AI Overviews.
   *Engine note:* add it as the first `sections[]` entry (e.g. `id: "tldr"`).
5. **Define your terms.** A clean "An X is a Y that does Z" sentence wins the
   definitional query and the featured snippet.
6. **Keep links relative and cross-link siblings.** Use `related` + in-body links
   to every relevant pillar-mate.

> Original data is the GEO cheat code. The quiz produces real numbers — score
> distributions, most-missed topics, average AI IQ by experience level. A post
> like "We tested 10,000 people on AI literacy — here's what they got wrong" is
> exactly the kind of first-party, citable source LLMs love and other sites link
> to. This is the highest-ROI content you can publish.

---

## 3. Keyword research — how to actually do it

You said you don't have a good process. Here's a concrete, mostly-free one. The
goal isn't volume — it's finding **questions real people ask that you can answer
better than what ranks today**, then making each one a post inside a pillar.

### Step 1 — Seed from the product and the audience
List the jobs your users hire AI for: "learn ChatGPT," "write better prompts,"
"AI for marketing/finance/students," "spot AI mistakes," "AI for beginners."
These are your pillars and head terms (most already exist as pages).

### Step 2 — Harvest the long tail (free)
For each seed, collect the *questions* and modifiers:

- **Google autocomplete** — type the seed, read the dropdown; add a–z ("learn ai
  a…", "…b…").
- **People Also Ask** — expand the PAA box on the SERP; each is a post H2 or FAQ.
- **"Searches related to…"** at the bottom of the SERP.
- **AnswerThePublic / AlsoAsked** (free tiers) — question maps around a seed.
- **Reddit / Quora / Discord** — search the seed; real phrasing, real pain.
- **Ask the AI engines themselves** — "What do beginners ask about learning AI?"
  Since GEO is the goal, the questions LLMs *generate* are the ones you want to
  rank for inside them.

### Step 3 — Add data (free tiers go far)
- **Google Search Console** (you already have the site): the *Performance →
  Queries* report shows terms you already get impressions for but rank #8–20 on.
  Those are the fastest wins — you're already relevant, you just need a focused
  post. Start here every month.
- **Bing Webmaster Tools** keyword research — free, decent volumes.
- **Google Keyword Planner** (free with any Ads account) — rough volume + ideas.
- Optional paid: Ahrefs/Semrush/**Keywords Everywhere** (cheap) for volume +
  difficulty if budget allows. Not required to start.

### Step 4 — Score and pick
For each candidate keyword, judge three things:

- **Intent fit** — would the searcher plausibly install Iro AI? (a "what is AI"
  reader, eventually yes; "openai stock price," no.)
- **Difficulty** — eyeball page 1. Big brands + tons of backlinks = skip for now.
  Forums, thin pages, outdated 2023 posts on page 1 = opportunity.
- **Cluster fit** — does it belong to an existing pillar? If yes, write it. If it
  needs a *new* pillar, that's a signal to create one.

Prioritise **low-difficulty + high-intent + fits a pillar**. A keyword with 200
searches/month you can win beats one with 20,000 you can't.

### Step 5 — One keyword → one post → mapped to a pillar
Make the target query the `title`/`<h1>` and the first H2. Write the post in the
engine's JSON, set its `pillar`, cross-link siblings, ship. Track the query in
GSC; refresh the post when it stalls at the bottom of page 1.

---

## 4. Backlinks, timeline, and cadence

### Why backlinks still matter (for SEO *and* GEO)
Backlinks are the web's votes of confidence. For SEO they're a top ranking
factor; for GEO, LLMs are likelier to trust and cite pages that other reputable
sites reference. You can't fully generate them yourself — you earn them. But you
*can* stack the deck.

### Launch directories (start here — fast, founder-friendly)
These give you real, do-or-nofollow links, referral traffic, and the social
proof that seeds further coverage. Two favorites to prioritise:

- **TinyLaunch** — `@chrissyinspace`. Indie-friendly launch platform; quick to
  submit, good for a first wave of links + traffic.
- **VerifiedTools** — `@yeonjidev`. Tools directory; strong fit for an AI app and
  a credible niche backlink.

Then broaden: Product Hunt, BetaList, There's An AI For That, Futurepedia,
SaaSHub, AlternativeTo, Toolify, and relevant "best AI learning app" listicles.
Submit the homepage *and* deep-link the quiz and best pillar pages.

### Earned links (the durable ones)
- **Original data** (see §2) — the quiz-results post is your best linkbait; data
  gets cited by journalists and bloggers.
- **Free tools** — the AI IQ quiz is already a linkable asset; pitch it to AI
  newsletters and "free AI tools" roundups.
- **Guest posts / podcasts / "build in public"** on X, LinkedIn, indie hacker
  communities — the solo-founder story is a hook.
- **HARO / Help-a-B2B-Writer / Featured** — answer reporter queries on AI
  learning; land contextual links from real publications.
- **Comparison + alternative pages** (already a site strength) attract links from
  people researching options.

### Timeline — the patience part
SEO is a compounding asset, not a switch. Realistic curve for a fresh blog:

- **Weeks 0–4:** publish, get indexed, links from directories. Little ranking
  movement — normal.
- **Months 2–3:** long-tail / low-difficulty posts start ranking and pulling
  impressions in GSC. First AI-engine citations appear.
- **Months 4–6+:** pillars accumulate authority; head terms climb; traffic and
  citations compound.

Plan for **2–3 months before meaningful movement, 6+ for momentum.** The job in
the waiting period is *consistency*, not refreshing analytics.

### Sustainable cadence
- **Weekly:** publish 1–2 posts into existing pillars (the engine makes this
  cheap). Submit to 1–2 directories.
- **Monthly:** mine GSC for "striking distance" queries (#8–20) and write/refresh
  to push them up. Update `dateModified`. Add a TL;DR to your top posts.
- **Quarterly:** publish one original-data piece. Audit pillar coverage and add a
  new pillar if a cluster has outgrown its hub.

### Measure
Track in GSC: indexed pages, impressions and average position by query group,
FAQ/rich-result appearances. Track referrals from AI assistants. Track quiz
starts → App Store CTR. Rankings are the leading indicator; installs are the
goal.

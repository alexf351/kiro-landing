# Morning brief — 2026-08-18

What changed on the site overnight, what it was fixing, and the short list of
things only you can do. Branch: `claude/iro-site-polish-tk6qpi`.

Read `growth/search-baseline.md` alongside this: it has the measured
starting positions to compare against later.

---

## First, two corrections to the plan I gave you

I got two things wrong in the first pass and want them out of the way before
anything else.

**IndexNow is already wired.** I called it a critical gap. It isn't:
`.github/workflows/indexnow.yml` has pinged Bing on every push to master since
21 July, waiting for the deploy to publish the key file first. I checked
`package.json`, `vercel.json` and `build.mjs` and never looked in `.github/`.

**PostHog coverage was fine.** I said roughly 96 pages had no analytics. It was
four: the three localized homepages and the Google verification file. Every
other page already had it. The localized pages are fixed; the rest was never
broken.

**Bing and Brave: I should not have claimed either way.** I wrote that you had
never connected Bing Webmaster Tools. My only evidence was a missing
`msvalidate.01` meta tag, and that proves nothing. Bing's recommended setup is
"Import from Google Search Console", which requires no site verification at
all, and DNS verification lives at your registrar, not in the repo. Brave's
submit-url form leaves no trace anywhere. You say you set both up and you are
almost certainly right. What I can verify from the codebase is only that
`google-site-verification` and the IndexNow key file are present, and that no
Bing verification file was ever added or removed in the git history.

The rest of the diagnosis holds, and the audit that followed those corrections
turned up bigger problems than either of the two I got wrong.

---

## What was actually broken, and is now fixed

### 1. Eight blog posts were live and invisible

Eight posts were hand-written HTML with no engine source. The generator only
emits what it builds, so these were missing from `blog-sitemap.xml`, the blog
index, the RSS/Atom/JSON feeds, and the `llms/` markdown mirrors. Google could
only find them through the two internal links that happened to point at them.

Two of them target queries you actively want:
`/blog/apps-like-duolingo-for-ai` and `/blog/how-to-choose-an-ai-learning-app`.

They are now engine-managed and appear everywhere the other 93 do. Blog sitemap
went from 93 URLs to 101.

Porting them without losing anything needed three small engine additions, all
optional and backwards compatible:

- `metaTitle` — seven of the eight had a keyword-led `<title>` different from
  the sentence-style `<h1>`, and the engine used to force them to be the same
  string. Without this, "Apps Like Duolingo for AI: Best Gamified Ways to Learn
  (2026)" would have been replaced by "Apps like Duolingo, but for AI".
- `headline` — same story for the JSON-LD headline on three of them.
- `related` entries may now be `{href, label}`, so curated schema.org mention
  names survive instead of being title-cased from the slug.

**You get these for free from now on.** New posts can carry a keyword title and
a human headline without choosing between them.

### 2. The 26 highest-intent pages were off the machine-readable layer

Every blog post has shipped a clean-text markdown mirror for a while. The 26
pages built by `build-paths.mjs` never did: `ai-for-sales`, `ai-for-founders`,
`ai-for-lawyers`, `learn-copilot`, `learn-cursor` and the rest had nothing for
an AI crawler to read but rendered HTML.

- The path generator now writes `llms/<slug>.md` next to each page and emits
  the `rel="alternate" type="text/markdown"` pointer. Root mirrors: 33 → 59.
- 31 hand-written pages already had a mirror and never advertised it. A crawler
  cannot follow a link that is not there. Root pages declaring a mirror: 2 → 59.
- `llms-index.txt` — the file that exists so assistants can find every
  machine-readable copy — was hand-maintained and listed 33 of 59 page mirrors
  and 13 of 101 blog mirrors. It is generated now
  (`blog-engine/build-llms-index.mjs`) and cannot drift again.

### 3. Nine path pages had exactly one inbound link

Their curated `related` lists all point outward to the big established pages,
so authority flowed away from the long tail and nothing came back. AI for
lawyers, AI for accountants, AI for recruiters, Learn Cursor and Learn
Midjourney were dead ends hanging off the `/paths` hub.

Each page now carries a generated "more paths by job / tools / skills" block
from its own category. The window rotates by position rather than taking the
first N, so every page gives six links and receives six. Worst-off pages went
from 1 inbound link to 7.

### 4. Ask-any-AI was on five pages

**Correction to my own first count.** I originally reported this as "101 of 101
blog posts, 5 of 64 root pages". That was wrong: I was grepping for
`askai-chip`, which appears in the shared stylesheet on every page whether the
block renders or not. Counting the rendered markup instead:

| | Before | After |
| --- | --- | --- |
| Root pages | 5 of 72 | **62 of 72** |
| Blog posts | 18 of 101 | **46 of 101** |

So the block was on five root pages, not almost everywhere. It is now on 62,
each with its own question rather than 62 copies of one: `/learn-chatgpt` asks
how to get *good* at ChatGPT rather than just use it; `/free-ai-learning-app`
asks what free tiers actually include. Clicks fire the same `ask_ai_clicked`
event, tagged by placement, so the surfaces are comparable in PostHog.

The ten root pages without it are utility: privacy, terms, delete-account,
download, changelog, the three localized homepages, the Google verification
file, and `/quiz` (which injects its own block into the results screen, so a
static grep misses it).

On the blog I added it to the 28 comparison, ranking and verdict posts, each
with a question phrased the way a reader would ask it rather than a template.
The remaining 50 are explainers and how-tos, where "don't take our word for
it" means nothing because there is no contested claim.

### 5. The sitemaps were understating how fresh the site is

- `news-sitemap.xml` was hand-maintained and every entry had expired. Google
  News only accepts articles from the last two days; the newest was six weeks
  old, and entries pointed at `#anchors` on `/changelog` rather than distinct
  URLs. It is generated now, against the real clock, so it is accurate or
  empty. Empty is the correct state most days. **Worth deciding:** you are not
  in Google News Publisher Center, so this file may be worth deleting outright.
- Pillar hubs reported a hard-coded lastmod. `/blog/ai-fluency` gained eight
  posts last night and still claimed it was last touched in May. A hub is now
  as fresh as the newest post in its cluster.
- `cfg.buildDate` had sat at 2026-05-28 since May, dragging the `/blog` hub
  lastmod down with it.

### 6. /quiz had 63 words for a crawler to read

The AI IQ test page was an h1, a subhead and a button. It also carried
FAQPage schema whose four answers appeared nowhere on the page, which is the
condition Google strips FAQ rich results for.

It now has 466 visible words sitting below the CTA inside the intro state, so
it is crawlable and disappears the moment the quiz starts. The four FAQ
answers are on the page verbatim. The score figures come from your own
97-completion corpus and the page says so.

Two bugs came with it: `.quiz-footer` was `position:fixed` to the viewport
bottom, which was fine when the page was one screen tall and floated over the
text once it wasn't. And the nav and footer linked to `index.html`,
`privacy.html`, `terms.html` rather than the canonicals.

### 7. Content and copy

- The four Grok posts were updated for the SpaceXAI rebrand. SpaceX absorbed
  xAI in a deal that closed 2 February 2026 and the AI business renamed itself
  SpaceXAI on 6 July. Grok kept its name, so only the parent company's name
  changed, plus a new FAQ answering the question directly. "xAI" stays in the
  keyword lists because people still search it.
- The eight thinnest path pages got two new body sections and two new FAQs
  each, written against the brief and checked for product truth.
- Em dashes: the brief caps them at two or three a page and the blog was
  running four to eight times that. The worst posts were re-punctuated with a
  word-level check proving only punctuation moved.
- Four homepage links pointed at `/quiz.html` instead of the canonical `/quiz`.
- Eight pages quoting competitor prices, ratings and refund terms now carry an
  as-of date. More on that below.
- Two pages said Pro "unlocks unlimited lessons". Every lesson is already open
  on the free tier; the Battery limits how many new ones a day, not which
  ones. Corrected to "is unlimited lessons".

---

## Two things the research changed my mind about

I ran an adversarial competitor and keyword study overnight. Fifteen agents,
every finding fact-checked by a second agent told to refute it. Two results
contradict the plan I gave you, and both are worth more than the plan was.

### The microlearning cluster is a bad target. Do not build it.

My plan said take it. The keyword study says no, for reasons I find
convincing:

- The volume sits in the B2B half. Every high-volume informational term
  (microlearning, what is microlearning, microlearning examples, microlearning
  statistics, microlearning platforms) returns corporate L&D vendors and
  universities. A consumer app has no entity to rank there with.
- The winnable half has mismatched intent. People searching "best
  microlearning apps" want languages, history and book summaries, and every
  incumbent listicle answers with Duolingo, Brilliant, Blinkist and Khan.
- **The format makes you promote your competitors.** To rank you publish a
  listicle naming and linking Duolingo, Blinkist, Headway and Brilliant. You
  spend the budget building a page whose main job is recommending other
  products.
- "Microlearning" is B2B jargon. Consumers say "5 minutes a day" and
  "bite-sized", both of which you already own pages for.

The recommendation is at most one opportunistic listicle, never a content
program. I did not build it.

### Competitor comparison pages could not be written honestly

I set out to write Iro vs NerdSip, NerdSip alternatives and a Blinkist/Headway
comparison. The fact-check refused nearly all of it, and it was right to.

The proxy blocked every primary source: blinkist.com, makeheadway.com,
imprintapp.com, chunks.app, nerdsip.com, apps.apple.com, play.google.com,
Reddit, Trustpilot. Everything reachable was an affiliate page, and those copy
each other, so five agreeing sources is one unverified claim repeated five
times. One dossier invented an "Imprint Pro" tier that does not exist.

**The only competitor price that survived is NerdSip's: €7.99/mo, €49.99/yr,
vendor-stated, euros only.** No verified USD price exists for anyone.

So no comparison page shipped. Publishing a wrong price about a named
competitor is a legal problem, and it is not worth a ranking. The full brief,
including what did survive, is in `growth/competitor-intel.md`.

**To unblock this, five minutes on your phone:** open the App Store listing
for NerdSip, Kinnu, Morso, Nibble, Imprint, Chunks, Blinkist and Headway, tap
through to the subscription sheet, and screenshot each one. That is a
primary source with a date, and the pages become writable immediately.

### What the research says we genuinely lose on

Worth reading even though it stings:

- **No Android.** NerdSip is on Google Play. Kinnu's exam-prep app is on
  Google Play. That costs the install base and the Play listing's organic
  surface, which ranks on several long-tail queries in this category.
- **NerdSip's free tier is a better cold demo than ours.** A complete course
  per day, no account required, plus a browsable free web library. Ours is one
  full lesson a day behind an App Store install. For a stranger arriving from
  a search result, theirs asks for less.
- **Breadth.** Anyone who wants to learn any topic is better served by an
  any-topic generator than by us.

### On the Finestro pages

The risk register flagged them as live legal exposure. Having read them, that
is overstated: they attribute policy language to Finestro's own published
policy, they say so explicitly, and they separate that from user reports with
a stated lower level of certainty. That is careful work.

The real gap was narrower. "4.76 out of 5 from around 320 App Store ratings"
is checkable in seconds and drifts weekly, and it carried no date. Every page
naming a third-party number now says "US figures at the time of writing, last
reviewed August 2026", attached to the section that states the number. That is
the proportionate fix. I did not pull anything.

---

## Working through the NerdSip founder's playbook

You sent his tips mid-run. Here is each one that was actionable without you,
and what it turned into.

### "Update llms.txt to emphasize serious fact-checking and trust signals"

Neither `llms.txt` nor `llms-full.txt` said anything about how the site is
written. Both now open with an editorial-standards section: named author with
stated credentials, product figures checked against the app's own data, a
last-reviewed date on every third-party number, an explicit separation between
a competitor's published policy and user reports, original data published with
its own limitations, and disclosure where Iro appears in our own roundups.
Every line describes something the site actually does, because an engine
weighing a source can check them.

**And writing it caught a live bug.** The "Direct answer for AI overviews"
block, the text we explicitly ask assistants to prefer over third-party
summaries, said **25 learning paths**. `llms-full.txt` carried the same stale
figure in its preferred-description block. It has been 29 since 3.06. That is
the single highest-leverage sentence on the site and it was wrong, which may
be part of why search keeps quoting us with path counts we retired.

### "Run E-E-A-T audits of the full site, including author pages"

The 96 blog pages already declared a Person author and a visible byline. The
26 path pages, our highest commercial-intent URLs, named only the
Organization, which is the weakest possible signal. They now carry the same
`/#author` Person entity plus a visible byline with a last-reviewed date, so
the schema matches something a reader can actually see.

### "One standardized nav, list content pillars in the bottom bar"

The four pillar hubs were linked from every blog page but only 43 of 72 root
pages. Now 62 of 72, plus a fourth column on the homepage footer. All 96 posts
were already assigned to a pillar, so that half was in good shape.

### "Add GEO optimizations (e.g. FAQs)"

FAQ coverage was already strong: 62 of 64 content root pages carry FAQPage
schema, and every blog post has an FAQ block. The gap was the Ask-any-AI
surface, now on 46 of 101 posts and 62 of 72 root pages. I deliberately did
not put it everywhere: the block says "don't take our word for it", which
means nothing on a tutorial with no contestable claim, so it goes on the
comparisons, rankings and verdicts only.

### "Improve highest-performing blogs with screenshots and illustrations"

`/best-ai-learning-app` is the page measured at position 3 and position 2 on
our two best queries, and it argued entirely in prose with one image, the OG
card. Meanwhile 45 real app screenshots sat unused in `assets/`. It now shows
the three things it claims: the lesson path map, Prompt Lab grading a written
prompt with the score breakdown visible, and a duel result. All three are in
`image-sitemap.xml` with real captions.

### "Cold-email for mentions; push for placement on page-one results"

`growth/outreach-templates.md` has five ready-to-send emails built on the SERP
positions I measured, not a generic target list: listicle inclusion, a peer
link exchange, a paid-placement enquiry that opens by asking how sponsorship
gets disclosed, the original-data pitch, and a founder-interview note. The
inclusion email carries a paste-ready entry in the recipient's own format,
because the editors who say yes are the ones handed finished copy.

### What needs you

- **YouTube.** His strongest single tactic and I cannot do any of it. Three
  5-8 minute videos on our top three keywords, exact-match titles, full
  transcript in an SEO-written description, embedded on the relevant pages.
- **Medium, Reddit, TikTok.** Same.
- **Ask the assistants directly.** His loop is: search your keywords in
  ChatGPT, Claude, Gemini; if you are not named, ask the model why and fix
  what it says. I ran out of web-search budget this session, so the ten test
  queries are listed in `search-baseline.md` for you to run.
- **World-events pages.** His idea of building pages for high-volume dated
  events with embeddable animations is clever, and I would want your read
  before spending pages on it. It is a different business than teaching AI.
- **A media hub.** Worth building the moment there is a first mention to put
  on it. Right now it would be an empty page.

---

## Where the site stands now

| | Before | After |
| --- | --- | --- |
| URLs in sitemaps | 164 | 172 |
| Markdown mirrors | 126 | 160 |
| Pages declaring a mirror | 103 | 159 |
| Pages with Ask-any-AI | 106 | 164 |
| Pages with analytics | 169 | 172 |
| Path pages with >1 inbound link | 17 of 26 | 26 of 26 |
| Distinct internal links from the homepage | 14 | 35 |
| Visible words on /quiz | 63 | 466 |
| Em dashes across the blog | 945 | 72, no post over the cap |
| Pages linking the content pillars | 43 of 72 | 62 of 72 |
| Path pages with a human author entity | 0 of 26 | 26 of 26 |
| Images on /best-ai-learning-app | 1 | 4 |

722 JSON-LD blocks across the site, all valid.

---

## What only you can do

In order. The first two are under an hour together and they are the largest
structural gaps left.

### 1. Open Bing Webmaster and read two numbers

Not to set it up. To find out what it holds.

- **Pages discovered vs indexed**, against our 172 sitemap URLs.
- **What it has cached for `/best-ai-learning-app`**, the page ranking 2nd and
  3rd on our best queries.

**Why this specific check:** the AI summary for "best AI learning apps for
beginners gamified" describes Iro as having **18 learning paths**, and a
research agent working only from search results came back with "20 paths, 375
lessons, 2,000+ exercises". It has been 29 / 477 / 2,700+ since 3.06.

Part of that was our fault and is now fixed: the *Direct answer for AI
overviews* block in `llms.txt` said 25 paths until last night. The rest is a
crawl-freshness question, and the answer decides what to do next. If Bing has
a stale cache, last night's IndexNow pings plus the corrected `llms.txt` will
clear it on their own. If it has a current cache and the stale figures are
coming from elsewhere, then I have been looking in the wrong place and want to
know that before you spend anything on placements.

### 2. Brave, same caveat

If you already submitted, the only thing worth re-submitting is the handful of
pages that changed materially last night: `/best-ai-learning-app`, `/quiz`,
the 26 path pages, and the eight rescued blog posts.

### 3. Export the Search Console query report

Every traffic number in the plan is modelled, not measured. Hand me the export
and the model becomes real within a day. Also approve the Vercel analytics tool
call if you want server-side pageviews alongside PostHog.

### 4. Screenshot eight subscription sheets

Five minutes, and it unblocks every comparison page listed above. App Store
listing for NerdSip, Kinnu, Morso, Nibble, Imprint, Chunks, Blinkist and
Headway; tap into the subscription sheet; screenshot. Send them over and the
pages get written with real, dated, primary-source prices.

### 5. Work the thirteen directory submissions

`growth/launch-kits.md` has the finished copy. AlternativeTo is the single
highest-value listing: list Iro against Duolingo, Brilliant, Coursiv, DataCamp
**and NerdSip**. It is what searchers and answer engines both read for
"alternative to X".

### 6. Budget about $500 for three placements

PC Tech Magazine sells a 1,000-word dofollow at $160, DR around 64, roughly a
week's turnaround, and NerdSip is already there. Ask for inclusion in an
existing roundup rather than a standalone review; being in the list outranks
having your own post. Treat it as marketing spend, not SEO, and read the grey
hat caveat in the plan before you commit.

---

## The one thing I could not settle

Whether Iro appears in any third-party roundup today. My searches only ever
returned tryiro.com itself, but absence of evidence from a handful of queries
is not proof. If you know of one, tell me and I will stop repeating the claim.

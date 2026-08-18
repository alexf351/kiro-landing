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

### 4. Ask-any-AI was on the blog and almost nowhere else

101 of 101 blog posts had it. 5 of 64 root pages did, and the root pages carry
the higher commercial intent. This is the one surface that puts our framing
into the prompt a reader sends to an assistant.

Now on 63 of 72 root pages. Each has its own question rather than 63 copies of
one: `/learn-chatgpt` asks how to get *good* at ChatGPT rather than just use
it; `/free-ai-learning-app` asks what free tiers actually include. Clicks fire
the same `ask_ai_clicked` event the blog does, so the surfaces are comparable
in PostHog.

The nine without it are utility pages: privacy, terms, delete-account,
download, changelog, the three localized homepages, and the Google
verification file.

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
| Em dashes across the blog | 945 | see below |

722 JSON-LD blocks across the site, all valid.

---

## What only you can do

In order. The first two are under an hour together and they are the largest
structural gaps left.

### 1. Connect Bing Webmaster Tools

https://www.bing.com/webmasters — use "Import from Google Search Console",
which skips re-verification and pulls the sitemaps across. Then add the
`msvalidate.01` meta tag to the site (send it to me and I will put it on every
page next to the Google one).

This is the index behind ChatGPT search, DuckDuckGo, Yahoo and Ecosia. It is
the one place the site has no visibility at all.

**Concrete evidence it matters:** the AI summary for "best AI learning apps for
beginners gamified" currently describes Iro as having **18 learning paths**.
Every page says 29 and has for months. Our best-ranking page is being quoted
with stale numbers in exactly the answers we want to win.

### 2. Submit to Brave

https://search.brave.com/submit-url — one URL at a time, no console. Brave does
not support IndexNow and runs its own index. Submit the ten priority pages in
`growth/backlink-submission-pack.md` §5.

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

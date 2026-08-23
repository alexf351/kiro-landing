# Search baseline — 2026-08-18

Measured by hand so there is something to compare against later. Re-run the
same queries monthly and fill in a new column; the point is the trend, not any
single row.

**How this was measured:** web search from a US IP, logged out, no
personalization. Positions are the organic result order as returned, ignoring
ads. This is a rough instrument. Search Console is the real one, and these
rows should be replaced with GSC data the moment the export exists.

---

## MEASURED — the first real data (2026-08-18)

Everything above this line was modelled. This section is not.

### Google Search Console, 90 days to 2026-08-16

| | |
| --- | --- |
| Clicks | **355** |
| Impressions | **17,100** |
| CTR | **2.1%** |
| Average position | **32.7** |

Shape of the curve matters more than the totals: impressions ran near zero in
mid-May and reached roughly **550 a day by mid-August**. That is real growth
and it came from the content work, not from links.

**Three readings.**

1. **CTR is not the problem, and titles are not either.** Published CTR curves
   put position 33 at roughly 0.8 to 1.2%. We are at 2.1%, which is *above*
   the curve. Rewriting titles and meta descriptions would be wasted effort
   right now.
2. **Position is the bottleneck.** 32.7 is page three or four. The pages are
   indexed, they are being served, and almost nobody scrolls that far.
3. **Position alone does not get us to the goal.** At today's impression
   volume, even an average position of 8 yields about 900 clicks a month:

   | Avg position | Est. CTR | Clicks/month at today's impressions |
   | --- | --- | --- |
   | 32.7 (now) | 2.1% | ~350 |
   | 20 | 3.0% | ~495 |
   | 12 | 4.5% | ~742 |
   | 8 | 5.5% | ~908 |

### Bing Webmaster, same day

| | |
| --- | --- |
| Impressions | **0** |
| URLs discovered | 71 (of our 172) |
| Last sitemap crawl | 2026-07-21 |
| Referring domains | 4 |

`blog-sitemap.xml` had never been submitted, so Bing's sitemap discovery
covered root pages only. Submitted 2026-08-18. IndexNow had been feeding it
the blog URLs anyway (171 submitted in 21 hours, 6.5K over time), so Bing knew
about the pages and was not showing them.

The four referring domains are reddlx.com, liststartup.in, umia.finance and
cybercorsairs.com. Those are auto-generated scraper directories. **The real
referring-domain count is zero**, and Bing's own top recommendation says so:
"Your site does not have enough inbound links from high quality domains."

### What this does to the 100-a-day goal

The plan modelled month 12 at 100 installs a day. **That is not credible
against this data and I am retracting it.**

100 installs/day needs roughly 100,000 sessions a month. We are at about 350 a
month. That is a **289x** gap, and position improvement alone closes maybe 3x
of it. The rest has to come from impression growth, which means more pages
ranking for more queries, which means authority.

A defensible ladder from here, assuming the directory and outreach work
actually happens:

| | Clicks/month | Installs/day |
| --- | --- | --- |
| Now | ~350 | under 1 |
| Month 6 | 1,500-2,500 | 1-2 |
| Month 12 | 4,000-8,000 | 4-8 |
| 100/day | ~35,000 | the 2-4 year target |

I would rather hand you that than a number that flatters the plan. The growth
curve is genuinely good; the goal was set before anyone had measured the base.

### The next thing I need

The **Queries** and **Pages** tabs, exported as CSV, 3 months. The summary
tells us the average is 32.7; the export tells us *which* terms sit at 11-20.
Those are striking distance, where a small push moves a page onto page one and
CTR triples. That list is the highest-value thing on this page and I cannot
derive it from the totals.

---

---

## MEASURED — first GEO datapoint (2026-08-19)

A third-party AI visibility audit, run free. **Its headline score is unusable
and its underlying data is good**, so read past the grade.

**The contradiction:** the scorecard reports 0/100, Grade F, 0% AI Visibility,
Mention Rate 0/40. Three screens later the same report shows ChatGPT ranking
Iro **#1** on "How does Iro AI compare to other AI learning platforms" and
**#3** on "What are the best ways to learn prompt engineering," and states
"Iro AI is frequently mentioned on ChatGPT (80%)". Both cannot be true. Do not
quote the F.

### The finding worth keeping

| Prompt type | Iro's mention rate |
| --- | --- |
| Branded ("Is Iro AI good for beginners", "How does Iro AI compare") | mentioned everywhere; #1 and #3 on ChatGPT |
| Recommendation | 50% |
| **Discovery** (unbranded, e.g. "Where can I find interactive apps to…") | **0%** |

**Iro wins when someone already knows the name and is invisible when they do
not.** That is the same shape as the Google data — brand queries fine, head
terms at position 40-88 — now confirmed independently on the AI side. It is
one diagnosis, not two problems.

### Other signals

- **Perplexity 20% vs ChatGPT 80%.** Not a crawler problem: `robots.txt`
  explicitly allows `PerplexityBot` and `Perplexity-User`, along with 30+
  other AI agents. Checked 2026-08-19, so the gap is content or citation, not
  access.
- **"Mentioned but not cited"** on the key prompts. Being named in prose is
  worth much less than being the linked source, and citations are what carry
  into the next answer.
- **Top cited sources for this category: reddit.com, mwm.ai, aitoolnet.com.**
  This is the most actionable line in the report — *measured* citation sources
  beat any DR estimate. Two are directories we are not on. And it is
  independent evidence for the Reddit thesis that §"Answer-engine verdict" in
  `competitor-intel.md` flagged as unverified.

### Shipped in response, same day

`/ai-info` now carries five **unbranded discovery questions** answered in full,
with FAQPage schema generated *from* the visible copy rather than written
alongside it, so the two cannot drift. The questions are the discovery-shaped
ones the audit tested, where we score 0%.

Re-run the same audit in a month. It is one free check per month, and the
number to watch is the discovery row, not the grade.

## Where Iro already ranks

| Query | Iro's position | Page | Notes |
| --- | --- | --- | --- |
| best app to learn AI 2026 | **3** | `/best-ai-learning-app` | AI summary leads with "Iro AI is the strongest pick", quoting our page |
| best AI learning apps for beginners gamified | **2** | `/best-ai-learning-app` | Same page, second query |

`/best-ai-learning-app` is the proven asset. It is the only page confirmed
ranking on a commercial query, and both AI summaries pull their framing from
it. Everything about it is worth copying to other pages: answer-first opening,
an honest comparison table that names competitors, a clear "who each app is
for" structure.

## Where Iro is absent

| Query | Who ranks | Iro |
| --- | --- | --- |
| best microlearning apps 2026 | riseguide.com, nibble-app.com, nerdsip.com, chunks.app, doozy.live, morso.app, a Medium post | not present |
| best AI education apps 2026 | befreed.ai (position 2) | not present |
| "Duolingo for AI" app | Duolingo's own blog, OpenAI's case study, press coverage of Duolingo | not present |

Three separate problems, and they need different answers.

**Microlearning is winnable and we are not in it.** The cluster is consumer
apps, not corporate L&D vendors: Duolingo, Brilliant, Khan Academy, Chunks,
Nibble, Blinkist, Headway, Kinnu, Morso, Uptime, Deepstash, Drops. That was
the open question and the answer is good news, because a consumer app can
compete here. Every ranking page is a roundup written by one of the apps in
it. Six of them run the same play and none of them mention Iro.

**BeFreed is a competitor we had not counted.** befreed.ai ranks second on
"best AI education apps 2026" with its own roundup. Same play again.

**"Duolingo for AI" is not a winnable query, and that is fine.** Duolingo owns
its own brand name; the results are Duolingo's blog, OpenAI's Duolingo case
study, and press about Duolingo's AI features. The phrase is excellent
positioning in an App Store subtitle or a first sentence, where it borrows a
mental model instantly. It is a bad ranking target. `/duolingo-for-ai` should
be judged on the long-tail phrases around it ("apps like Duolingo but for AI",
"is there a Duolingo for AI"), not on the head term.

## One thing search is currently getting wrong about us

The AI summary for "best AI learning apps for beginners gamified" described
Iro as having **18 learning paths**. Separately, a research agent working only
from search results came back with "20 paths, 375 lessons, 2,000+ exercises,
16 exercise types" as Iro's current figures.

**Correction to my own first pass.** I originally wrote that every live file
said 29 and that nothing on the site said otherwise. That was wrong, and the
reason is worth recording: my check grepped for `29 learning paths` as a
single string, so it missed the counts wrapped across a line break. The
*Direct answer for AI overviews* block in `llms.txt` said **25 learning
paths**, and `llms-full.txt` carried the same figure in its
preferred-description block. Both are the text we explicitly ask assistants to
prefer over third-party summaries. Fixed on 18 August.

So one cause was ours. The 18 and the 20 are still unexplained by anything we
publish, which leaves crawl freshness. **Not, as I also first wrote, a missing
Bing connection:** I inferred that from an absent `msvalidate.01` tag, but the
"Import from Google Search Console" route needs no site verification and DNS
verification leaves nothing in the repo, so the tag's absence is not evidence.

The check that actually settles it: what Bing Webmaster reports as discovered
versus indexed against our 172 sitemap URLs, and what it has cached for
`/best-ai-learning-app`.

## What I could not verify, and why it matters

I tried to build a verified fact sheet on the competitor set so we could write
honest comparison pages. **It failed, and the failure is worth recording.**

The proxy this session blocked every primary source: blinkist.com,
makeheadway.com, imprintapp.com, chunks.app, nerdsip.com, apps.apple.com,
play.google.com, Reddit and Trustpilot. Everything reachable was an SEO farm,
and those copy each other, so five sources agreeing means one unverified claim
repeated five times.

An adversarial fact-check refused the pricing outright:

- **Blinkist and Headway** — no publishable price. Two incompatible Headway
  structures reported; every Blinkist source traced back to affiliate pages.
- **Imprint and Chunks** — zero primary reads. One dossier invented an
  "Imprint Pro" tier that does not exist.
- **NerdSip, Kinnu, Morso, Nibble** — medium confidence on structure (Kinnu is
  genuinely free, Morso has a real free tier, Nibble has none beyond a 7-day
  trial), no confidence on numbers.

**Correction, same day: the pages were written, without prices.** The original
conclusion here — that no comparison page could be written — conflated two
things. Publishing a wrong price about a named competitor is a legal and
reputational problem and remains banned. But a price is not what an
alternatives page is for. Eight now ship (NerdSip, Blinkist, Headway, Kinnu,
Morso, Nibble, Imprint, Chunks), each arguing a category difference rather
than a feature-by-feature contest, with every unverifiable cell marked *"not
verified by us"* and a legend explaining why the gap is there.

That marker is doing real work on this SERP. Every ranking roundup on
"best microlearning apps" is published by one of the apps in it, and most
quote prices traceable to affiliate pages. A table that says plainly what it
could not check is the only genuinely differentiated artifact available to us
here, and it costs nothing to be true.

**What is still missing, and it is a five-minute job on your phone:** open
each app's App Store listing, scroll to the in-app purchase section, and
screenshot the subscription sheet. Each one fills exactly one table cell —
the *Free tier* column on that app's page. Nothing else about the pages
changes.

## The queries to track from here

Run these monthly, log position and whether Iro is named. The second column is
what to watch: an AI answer that names Iro is worth more than a blue link.

1. best app to learn AI
2. best AI learning apps 2026
3. best microlearning apps 2026
4. best free microlearning apps
5. apps like Duolingo but for AI
6. how to learn AI as a beginner
7. AI literacy app
8. best AI education apps
9. NerdSip alternatives
10. how to get better at prompting

Ask the same ten of ChatGPT, Claude, Perplexity, Gemini and Google AI Mode.
Record only whether Iro is named and which page it cites. Thirty minutes a
month, and it is the only GEO ranking report that exists.

---

## Open technical item — FAQ schema drift (found 2026-08-21)

Measured across all 182 published pages: **836 FAQPage answers, 17 of which do
not appear verbatim in the visible copy of their own page.**

Google's requirement is that the schema answer be present on the page. These 17
are not fabrications — every sentence in them does appear somewhere on the page
— but the schema answer *recomposes* material from two different visible
questions. Example, `faq.html`:

| | |
| --- | --- |
| Schema | "Iro AI runs on iPhone and iPad (iOS), and in any desktop or mobile browser at app.tryiro.com. **Android is in development.**" |
| Visible, Q1 | "Iro AI runs on iPhone and iPad (iOS), and in any desktop or mobile browser at app.tryiro.com." |
| Visible, Q2 | *When will Iro be on Android?* → "Android is in development. Follow tryiro.com…" |

The tail sentence is on the page, under a different question, so the exact
string never matches.

**Not fixed, deliberately.** It is pre-existing, it is not a factual error, and
rewriting 17 live answers to chase an exact-match rule is a different job from
the product-truth pass this was found during — with a real chance of
introducing errors in copy that is currently correct. Worth doing as its own
scoped task.

The affected pages: `faq.html` (3), `index.html` (4), `ai-tools-comparison.html`
(4), `ai-prompts.html` (3), and one each on `learn-ai-on-iphone.html`,
`best-ai-learning-app.html` and `quiz.html`.

**The check itself is worth keeping** — and note the trap in writing it. A
naive version replaces every tag with a space, which breaks the match on any
answer containing an inline `<a>` or `<strong>` and reports **61** false
positives. Strip inline tags to the empty string, compare against both
normalisations, and only then is a mismatch real.

---

## New instrument — server-side AI crawler tracking (live 2026-08-21)

We could never see AI crawlers before. The DataFast script in every page head
only fires for visitors that execute JavaScript, and GPTBot, ClaudeBot,
PerplexityBot and friends do not. Everything we knew about AI crawling was
inferred from Bing's discovery counts and from whether assistants happened to
name us.

`middleware.ts` now catches them server-side and reports to DataFast. **This is
the instrument the GEO plan was missing**: it answers, with dates, whether
assistants are actually fetching `/llms.txt`, `/llms-full.txt`, `/iro.json` and
`/ai-info` — the four surfaces this whole strategy is built on, and which until
now were an act of faith.

**What to watch, in rough order of value:**

1. **Is anything fetching `/llms.txt` and `/llms-full.txt` at all?** If not,
   every hour spent on them is being spent on a file nobody reads.
2. **`ChatGPT-User` and `Claude-User` hits** — the `answer_fetch` category.
   These are *live user questions* being answered with our page, which is the
   closest thing to a real-time GEO signal that exists.
3. **Which pages the training crawlers take.** `/best-ai-learning-app` is our
   proven asset; if GPTBot is not taking it, that is a finding.
4. **404s from crawlers.** DataFast reports what bots asked for and did not
   find — a free list of pages worth creating.

**Caveats to keep honest.** The local user-agent check is a pre-filter only;
DataFast's servers do the provider and IP verification, so the crawler list
updates without us upgrading the package. User agents are trivially spoofable,
so treat volume as indicative rather than exact. And this now runs an edge
invocation on every non-asset request — negligible at our traffic, worth
re-checking if crawler volume turns out to be orders of magnitude above human
volume.

Re-read this alongside the monthly GEO check above. The discovery-prompt row is
still the number that matters; this tells you whether the inputs to it are even
being read.

---

## MEASURED — Ahrefs, 2026-08-21

First movement on domain authority since tracking began.

| | 2026-08-18 | 2026-08-21 |
| --- | --- | --- |
| Domain Rating | 0.4 | **2.8** |
| Backlinks | — | 897 (4% dofollow) |
| Linking websites | 4 | **518** (3% dofollow) |

**The DR move is real and worth having.** After months at effectively zero, 0.4
to 2.8 in three days is the badge work landing — Wired Business and Startup Fame
verified, and Firsto, TinyLaunch and PeerPush have not even gone live yet.

**The 518 figure is not what it looks like, and it matters that we say so.**
Four directory submissions cannot produce 514 new referring domains in three
days. That is the signature of scraper and aggregator propagation: submit to one
directory network and hundreds of auto-generated sites copy the listing. It is
the same phenomenon as the original four (reddlx.com, liststartup.in,
umia.finance, cybercorsairs.com), just at scale.

Run our own test on it:

- **3% dofollow of 518 is about 15 domains actually passing equity.** By the
  exact standard applied to LaunchBuck two days ago — 365 linking websites at 4%
  dofollow, "roughly 15 domains pass it equity, so it has little to pass on" —
  tryiro.com is now approximately where LaunchBuck is. That standard has to cut
  both ways or it is not a standard.
- **DR is logarithmic and compresses hard at the bottom.** 0.4 → 2.8 reads as a
  7x gain and is closer to "left the floor" than "gained authority". The
  interesting threshold is DR 10-15, and it is not near.

**What actually settles it, and we can now measure it.** Referring domains that
send no traffic and pass no equity are noise. DataFast is live as of today, so
the question "did any of these 518 send a single human being?" has an answer
waiting in the referrers report. Check it in a week.

**Do not change strategy on this number.** It is a leading indicator moving in
the right direction, not evidence that directory volume works. The plan stays:
a small number of badges from places that get cited, Product Hunt for audience,
and content that earns links on merit.

# Search baseline — 2026-08-18

Measured by hand so there is something to compare against later. Re-run the
same queries monthly and fill in a new column; the point is the trend, not any
single row.

**How this was measured:** web search from a US IP, logged out, no
personalization. Positions are the organic result order as returned, ignoring
ads. This is a rough instrument. Search Console is the real one, and these
rows should be replaced with GSC data the moment the export exists.

---

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

Every live file says 29 paths, 477 lessons, 2,700+ exercises, 24 exercise
types. I checked the pages, `llms.txt`, `llms-full.txt` and `iro.json`: all
consistent, all current. Nothing on the site says 18 or 20.

So two independent stale snapshots are circulating in the index, and neither
matches anything we publish. That is not a content problem, it is a crawl
problem, and it is the concrete argument for the Bing and Brave submissions:
our top-ranking page is being quoted with numbers we retired months ago, in
exactly the answers we want to win.

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

**So no competitor comparison page was written.** Publishing a wrong price
about a named competitor is a legal and reputational problem, and it is not
worth a ranking. The pages are worth writing the moment the prices can be
checked from an unblocked network, or from your own phone in five minutes:
open each app's App Store listing and screenshot the subscription sheet.

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

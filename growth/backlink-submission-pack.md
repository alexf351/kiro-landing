# Iro AI — Backlink & Launch Submission Pack

Internal working doc (not deployed — excluded via .vercelignore).
Goal: earn the first wave of real backlinks + referral traffic fast. For a
young site, this is the #1 lever left — on-page SEO/GEO is already done.

**The rule:** paste, don't rewrite. Everything below is ready to submit. Do a
handful a day; don't burn out doing all of them at once.

**Ready-to-paste kits:** see `growth/launch-kits.md` for the finished
Product Hunt launch kit, AlternativeTo positioning lines, directory
short-forms, researched listicle targets, and HARO answer templates.
(Status research 2026-07-21: no existing Iro listing found on any Tier-1
directory. Re-checked 2026-08-18 across every reachable source and still
found none, but treat that as "not found" rather than "not there": the
proxy blocked most directory hosts that session.)

---

## 0. Copy-paste asset block (use everywhere)

- **Name:** Iro AI
- **URL:** https://tryiro.com
- **Web app:** https://app.tryiro.com
- **App Store:** https://apps.apple.com/app/id6759628066
- **Category:** AI / Education / Productivity / EdTech / Learning app
- **Founder:** Alex Furukawa — https://www.linkedin.com/in/alex-furukawa · https://x.com/tryiroapp
- **Pricing:** Free to start. Pro $49.99 a year (7-day free trial) or $9.99 a month.
- **Platforms:** iOS now; runs in any browser at app.tryiro.com; Android in development.

**Tagline (≤10 words):**
> The Duolingo for AI — master AI, 5 minutes a day.

**One-liner (≤60 chars):**
> Learn AI the fun way — 5-minute gamified lessons.

**Short description (≤160 chars):**
> Iro is the Duolingo for AI: master ChatGPT, Claude, prompting, and AI agents through 5-minute gamified lessons, real practice, streaks, and duels. Free to start.

**Medium description (~300 chars):**
> Iro AI turns learning AI into a game. Instead of watching videos you'll forget, you practice: write real prompts, spot AI mistakes, and duel a skill-matched opponent — 5 minutes a day. 29 learning paths across ChatGPT, Claude, Gemini, prompting, and agents, plus Custom Paths that build a course on any topic. Free to start on iOS or the web.

**Long description (~500 chars):**
> Iro AI is a gamified app for building real AI skills — "the Duolingo for AI." Most people learn AI by watching tutorials and hit a ceiling. Iro makes you practice instead: write real prompts and get instant feedback, compare model outputs, spot hallucinations, and go head-to-head in timed duels. It covers ChatGPT, Claude, Gemini, Perplexity, prompt engineering, and AI agents across 29 paths (477 lessons, 3,000+ exercises), plus Ask Iro (an AI coach) and Custom Paths that generate a course on any topic you type. Five minutes a day, streaks and ranks to keep you going. Free to start on iOS or in the browser.

**Founder blurb (for "maker" fields):**
> I'm Alex, solo founder of Iro. I built it because every "learn AI" resource was passive video that doesn't stick — Iro makes you actually practice, like Duolingo does for languages.

---

## 0b. Badge directories — what verification actually requires

**Measured 2026-08-19, on Startup Fame.** Worth reading before you collect any
more badges, because it settles a question I got wrong.

I originally shipped the badges with `rel="nofollow"`, on the reasoning that a
badge-for-listing swap is the arrangement Google's link spam policy asks to be
qualified. **Startup Fame's verifier rejects a nofollowed badge.** It failed
repeatedly with "please add a link to https://startupfa.me" while the link was
demonstrably in the served HTML. Removing `nofollow` passed immediately.

Ruled out before landing on that, so the conclusion is sound: the href was
present in the live page (fetched via Vercel), the document parses with zero
unclosed tags, there is no redirect on the apex, and `/` sends `no-cache`.

**But it is not a category rule.** Same day, **Wired Business verified with
`rel="nofollow"` still on its badge.** Two directories, two different
enforcement levels. So:

**The operating rule: ship every new badge nofollowed, hit Verify, and remove
`nofollow` only if that specific verifier rejects it.** Score so far: Wired
Business and Firsto both **accepted** nofollow; only Startup Fame rejected it.
Two of three verifiers never asked for the equity at all. You then pay link
equity exactly where it is enforced and nowhere else. Doing it the other way
round — dofollow by default — hands away equity to directories that would
never have asked.

### Badge row status

| Directory | Submitted | Live | Badge rel | Notes |
| --- | --- | --- | --- | --- |
| Wired Business | 2026-08-19 | yes | `nofollow` | verified with nofollow intact |
| Startup Fame | 2026-08-19 | yes | `noopener` only | verifier rejected nofollow |
| PeerPush | 2026-08-19 | **queued** | — | free queue, ~34 days, est. **2026-09-22**. Paid skip was $39; declined, since the paid delta is speed + videos + analytics, not the link. Their own modal says "Every plan includes: Permanent listing link." |
| Firsto | 2026-08-19 | badge verified, listing **queued** | `nofollow` **accepted** | Badge moved it from the 180-day standard queue (16 Feb 2027) to the priority queue: **launches 18 Sep 2026**. Their terms: *keep the badge online 30 days* — i.e. until **~18 Sep 2026** — to hold the slot. Declined the $19.90 tier, which sells a "Guaranteed DR59+ Dofollow Backlink" rather than speed. |
| Verified Tools | 2026-08-20 | badge live, listing **under review** | `nofollow` first — **unverified** | Their offer is the Startup Fame trade verbatim: *"Add our badge to your homepage. Once verified, your listing link becomes dofollow."* Their own embed ships `noopener noreferrer` with no nofollow, which is a hint their checker may read `rel` the way Startup Fame's did. Shipped nofollowed per the standing rule; **if verification fails, drop `nofollow` and re-check — that is the known fix, and it is the only thing to change.** Also dropped their `noreferrer`: it strips the Referer header, so they would not see our clicks, and we want that traffic attributed. |
| TinyLaunch | 2026-08-21 | **scheduled 21 Sep 2026** | — | Confirmed by email same day. Standard (free) launch, Education & Learning. Listing: https://tinylaunch.com/launch/20197-iro-ai — pending review. No badge taken. |
| LaunchBuck | **skipped** | — | — | Submit form returned "Something went wrong" on repeated attempts 2026-08-21. Not worth chasing: DR 26, and the number that actually decides it is **4% dofollow across 365 linking websites** — roughly 15 domains pass it any equity, so it has little to pass on. Revisit only if it starts showing up as a cited source. |
| Product Hunt | — | — | — | the only one in this row with a real audience; needs launch prep |
| Bob's Tech Review | **skipped** | — | — | Run by the NerdSip founder. Unlike every other row here, this is a *review someone else writes*, not a listing we control — and that someone sells the closest competing product. Bad trade for the smallest badge in the set. Same call as the standing "do not send the inclusion ask to NerdSip" note in §3. |

### Dates to keep

| Date | What |
| --- | --- |
| **~18 Sep 2026** | Firsto's 30-day badge obligation ends — same day the listing goes live, so the badge stays put until then regardless. |
| **18 Sep 2026** | Firsto listing goes live (confirmed on activation, 08:00 UTC). |
| **~22 Sep 2026** | PeerPush listing goes live — grab its badge embed then. |
| **21 Sep 2026** | TinyLaunch launch day. |

**Three listings land inside five days** (Firsto 18th, TinyLaunch 21st, PeerPush ~22nd). That is the closest thing to a launch moment on the calendar, and it is free. If Product Hunt is going to happen, aiming it at that week compounds the three rather than spending them separately — a PH launch with three fresh listings already live reads better than a cold one.

**When a badge is worth a slot.** The strip caps at four, so every badge now
displaces another. Decide with these, in order:

1. **Is the directory a measured citation source?** The AI visibility audit
   named reddit.com, mwm.ai and aitoolnet.com as what actually gets cited in
   this category. A directory assistants quote is worth a slot; one they never
   cite is not, whatever its DR.
2. **Does it have a real audience?** Product Hunt sends people. Pure
   directories mostly do not.
3. **Only then, its ability to pass equity** — and read *dofollow share of
   linking websites*, not DR. A site with 365 referring domains at 4% dofollow
   is receiving equity from ~15 domains and can pass on very little.

Failing all three, take the free listing **without** the badge: the page, the
brand mention and any referral traffic are the parts that mattered anyway, and
a footer of five reciprocal badges pointing into one small directory network is
the pattern the link-scheme policy actually describes.

**Do not buy a dofollow.** Paying for speed is fine (Firsto). Paying for the
link itself is not, and a tier that bundles both — LaunchBuck's $5 "dofollow
from day one, no badge needed", Firsto's $19.90 "Guaranteed DR59+ Dofollow" --
is mostly selling the link. Declined both.

**Adding any new badge:** append an `<li>` to the `.featured` strip in
`index.html`, `rel="nofollow noopener"` first, then verify. No `.reveal`, no
`loading="lazy"`, and **convert any inline `style="width:…"` the vendor ships
into `width`/`height` attributes** — inline styles outrank the stylesheet and
break the row's uniform 44px height. Firsto's embed did exactly this.

**The strip is now at its cap of four.** Live: Wired Business, Startup Fame,
Firsto, Verified Tools. That means PeerPush (~22 Sep) and Product Hunt are no
longer additions — each one is a **swap**, and the swap has to be decided
rather than defaulted.

Order to remove from, worst first, when a slot is needed:

1. **Startup Fame** — the only badge we ship dofollow, because its verifier
   rejected nofollow. It is the one actually passing equity out of the
   homepage, so it costs the most to keep.
2. **Verified Tools** — newest and least proven; drop it if it never verifies.
3. **Wired Business** — nofollow accepted, so it is cheap to keep.
4. **Firsto** — contractually pinned until ~18 Sep. Not removable before then
   without forfeiting the priority slot.

Product Hunt displaces whichever sits highest on that list when it launches.

Costs declined so far: $29 (Wired Business Pro), $39 (PeerPush Standard), plus
a 40%-off exit-intent modal on the latter. Every directory in this category
runs the same upsell; the free tier exists to create the moment. The pattern is
the defense.

**And the row still has a ceiling.** One or two dofollow reciprocal links is
unremarkable; plenty of legitimate sites carry badges. A footer full of them,
all pointing into the same small directory network, is a different picture and
starts to resemble the pattern the policy describes. **Cap the strip at four**
— and **prefer badges from places with an actual audience** (Product Hunt)
over pure directories. The removal order above is how that preference gets
applied when the next listing goes live.

**Also required, and easy to miss:** the badge must be *visible to a
non-scrolling bot*. Ours initially carried the site's `.reveal` class
(`opacity:0` until IntersectionObserver fires) and `loading="lazy"`, so a bot
that loads without scrolling saw a transparent element wrapping images that
were never requested. Both are removed and there is a comment in `index.html`
saying so. **Never put `.reveal` or lazy-loading on a badge.**

---

## 1. TIER 1 — do this week (highest link + traffic value)

Check each off. Most give a real do- or nofollow link + referral traffic +
get you discovered by other list-makers.

- [ ] **Product Hunt** — the big one. Prep a proper launch (gallery images, first comment, hunter if you can get one). Even a modest launch = a strong backlink + lasting profile. Pick a Tue–Thu. https://producthunt.com
- [ ] **There's An AI For That** — the largest AI tool directory; category "AI learning". https://theresanaiforthat.com
- [ ] **AlternativeTo** — list Iro as an alternative to **Duolingo, Coursiv, Brilliant, DataCamp**, and add
  **NerdSip, Morso, Nibble, Kinnu, Imprint, Chunks, Blinkist and Headway**. Those eight are the apps that
  actually appear alongside Iro in search results (measured 2026-08-18, see `search-baseline.md`), and Iro
  is listed against none of them. This is exactly what searchers AND LLMs cite for "alternative to X".
  https://alternativeto.net
- [ ] **BetaList** — for early-stage; good for a first wave of eyes + a link. https://betalist.com
- [ ] **Futurepedia** — major AI tools directory. https://futurepedia.io
- [ ] **Uneed** / **Fazier** / **Startup Fame** — indie launch platforms, quick submits, real links.
- [ ] **Peerlist Launchpad** — dev/indie audience, good DR.
- [ ] **SaaSHub** — SaaS directory; add as alternative to the same competitors.
- [ ] **Toolify.ai** — AI directory with decent traffic.

## 2. TIER 2 — broaden over the next 2–3 weeks

- [ ] **AI directories:** AIToolsDirectory, AItoolhunt, TopAI.tools, Insidr.ai, AI Scout, AIcyclopedia, easywithai, Foundr AI list.
- [ ] **App/edtech:** AppAdvice, appPicker, "best language-learning-style apps" roundups.
- [ ] **Indie/startup:** Indie Hackers (post your build story), Startup Stash, Launching Next, Land-book (if the site design is strong — yours is).
- [ ] **Free-tools roundups:** pitch the **free AI IQ test** (tryiro.com/quiz) to "free AI tools" lists — it's your most linkable asset because it needs no signup.

---

## 2b. The competitor set, as actually measured

`growth/competitor-intel.md` has the fact-checked brief. Two things from it
change how you work this list:

- **The apps that rank alongside Iro are not the ones we write about.** Our
  comparison pages target Coursiv, Finestro, Learnova and Wondering. The apps
  that appear next to us in results are NerdSip, Morso, Chunks, Nibble, Kinnu
  and BeFreed. Every listing and every listicle pitch should name those.
- **Every one of them publishes its own roundup and ranks with it.** Chunks,
  Nibble, NerdSip, Morso, RiseGuide and Headway all rank their own app in their
  own comparison post. Self-listing is the norm in this category, not an
  anomaly, so `/best-ai-learning-app` doing the same is not a risk.

## 3. EARN links (the durable ones — worth more than any directory)

### 3a. Original-data study = your best linkbait AND your best GEO citation magnet
You have PostHog data from the AI IQ test. A piece like *"We tested [N] people
on AI literacy — here's what they got wrong"* is exactly what journalists and
bloggers link to, and what ChatGPT/Perplexity cite as a primary source. You
already have one (/blog/average-ai-literacy-score). As N grows:
- refresh the numbers and re-date it,
- spin angles: by profession, by age, most-missed question, "the average person scores X/10",
- pitch each new data point to AI newsletters (Ben's Bites, The Rundown, TLDR AI, Superhuman) and journalists covering AI literacy.
This is the single highest-ROI thing you can publish. Ask Claude to build the next one from fresh quiz numbers.

### 3b. "Best AI learning app" listicle outreach
Search `best AI learning apps 2026`, `apps like Duolingo for AI`, `learn AI apps`.
For each ranking article that doesn't include Iro, email the author a short,
specific pitch (why Iro fits their list, one line, link). ~1 in 10 lands — and
each is a high-relevance link.

### 3c. HARO / Help-a-B2B-Writer / Featured / Qwoted
Answer reporter queries about "learning AI", "AI for beginners", "prompt
engineering". Alex as a named founder source = links from real publications +
E-E-A-T author signal.

### 3d. Build-in-public + guest posts
Post the Iro story + the SEO experiment on X/LinkedIn/Indie Hackers. Offer guest
posts to edtech/AI blogs. The solo-founder angle is a hook.

---

## 4. Weekly cadence (sustainable, not a sprint)

- **This week:** Tier 1 directories + AlternativeTo listings.
- **Weekly:** 2–3 Tier-2 submissions + 3–5 listicle outreach emails + 1–2 HARO answers.
- **Monthly:** one original-data piece; pitch it to newsletters.
- **Track:** new referring domains in GSC (Links report) + Ahrefs/Ubersuggest free tier.

## 5. Search-engine submission (beyond Google Search Console)

Google is only one index. Submitting to the others is a one-time nudge that
gets you discovered faster (ranking still rides on content + links).

**Brave Search** — https://search.brave.com/submit-url
No console; just paste one URL at a time. Submit the homepage + top pages
(see priority list below). Brave has its own independent index.

**Bing Webmaster Tools** — https://www.bing.com/webmasters
The bigger win: Bing's index also powers **ChatGPT Search, DuckDuckGo, Yahoo,
and Ecosia**, so it's a GEO play too. Fastest setup: "Import from Google
Search Console" (skips re-verification, auto-imports sitemaps).
**Note:** that import path leaves no trace in this repo, so do not read a
missing `msvalidate.01` tag as proof it was never done. Check the console. Otherwise add
the site, verify, then Sitemaps → submit `https://tryiro.com/sitemap-index.xml`.
Use URL Submission for the top pages; up to 10k/day on verified sites.

**IndexNow** (automated Bing/Yandex/Seznam/Naver ping) — **already wired and
running.** `.github/workflows/indexnow.yml` fires on every push to master that
touches an HTML file or a sitemap, waits for the deploy to publish the key
file, then submits every sitemap URL. Nothing to do here; the manual commands
below are for one-off pings.

**IndexNow** (automated Bing/Yandex/Seznam/Naver ping) — set up in this repo:
- Key file served at `https://tryiro.com/b5b04a1f5ff05c02d330e53b5362b5db.txt`
- After each deploy is live, run:
  - `node growth/indexnow-ping.mjs` — pings every URL in the sitemaps
  - `node growth/indexnow-ping.mjs https://tryiro.com/new-page` — just new pages
  - `node growth/indexnow-ping.mjs --dry-run` — preview, sends nothing
- Google and Brave do NOT use IndexNow — those stay manual.

**Priority pages to submit manually** (Brave one-at-a-time / Bing URL Submission):
1. https://tryiro.com/ (homepage)
2. https://tryiro.com/best-ai-learning-app (top performer)
3. https://tryiro.com/blog/coursiv-alternatives (top performer)
4. https://tryiro.com/blog/learnova-alternatives (top performer)
5. https://tryiro.com/quiz (AI IQ test — high engagement)
6. https://tryiro.com/paths (path library hub)
7. https://tryiro.com/blog (blog hub)
8. https://tryiro.com/duolingo-for-ai
9. https://tryiro.com/learn-chatgpt
10. https://tryiro.com/how-to-learn-ai

## 6. Reality check
SEO + links compound over **months**, not weeks. The pages you shipped will
start ranking in 2–8 weeks; backlinks accelerate it. Keep other channels
(TikTok, App Store, paid) alive in parallel — don't bet the company on SEO
landing this month. But keep at this list and it *will* pay off.

---

## 7. Review velocity (from the Tally teardown, 2026-08-19)

Tally reached 4.8 on G2 and 4.9 on Product Hunt by **asking**: through their
newsletter and after support interactions. We have 4.7 on the App Store and
nothing anywhere else, and `competitor-intel.md` §3 lists *"no verified
third-party proof of any kind"* as a place Iro loses. This is the cheapest fix
for that.

**Where to collect, in priority order.**

1. **Product Hunt** — reviews accrue on the profile whether or not you have
   launched, and they persist. Do this alongside the launch, not after.
2. **App Store** — you already have 4.7. The lever is *volume*, not score;
   a 4.7 from 40 ratings reads very differently from a 4.7 from 400.
3. **AlternativeTo / SaaSHub** — reviews there double as the listings Tier 1
   already asks for, and both are heavily scraped by answer engines.
4. **G2** — only worth it if you ever push a team/business tier. It is a B2B
   surface and the profile setup is not free of effort.

**When to ask.** Not randomly, and never on first open. The moments where
someone has just experienced the product working:

- immediately after a rank-up or a completed path
- after a duel win
- after a support conversation that resolved well
- in the newsletter, to people with a streak over ~14 days

**What to ask for.** One tap to the store sheet, no interstitial of your own
first. Asking "enjoying Iro?" and routing unhappy answers to a feedback form
instead of the store is against App Store guidelines — use Apple's native
`SKStoreReviewController` and let it handle throttling.

**Why this is GEO work, not just vanity.** Review text is third-party writing
about Iro on domains engines already crawl. Per the Tally thread: *ChatGPT
recommends Tally because the internet does.* Reviews are the cheapest way to
put sentences about Iro on the internet that we did not write ourselves.

---

## 8. Resolved — the rank ladder contradiction

Traced 2026-08-19. **Iridescent is correct; "Titan" is a leftover in one widget.**

| Surface | Sixth rank |
| --- | --- |
| `index.html` Operator Build widget (~line 2232) | **Titan** — and it loads `assets/iridescent-kiro.webp` as that tier's mascot |
| `faq.html` FAQ schema | Iridescent |
| `blog/apps-like-duolingo-for-ai.html` | "16 ranks from Bronze to Iridescent" |
| `glossary.html`, `llms-full.txt`, `iro.json`, `llms/*.md` | Iridescent |
| mascot art in `assets/` | `iridescent-kiro.webp` |

The widget contradicts itself inside a single object: the tier is labelled
Titan and rendered with the Iridescent mascot. Every other surface, and the
image file the widget itself loads, says Iridescent.

The Bronze→Diamond ladder that also appears across the site is the **quiz
result** tiers, a separate five-tier system. Not a conflict.

**Fixed 2026-08-19.** Alex confirmed Iridescent. The widget's four `titan`
references are renamed and it now renders Bronze / Silver / Gold / Platinum /
Diamond / Iridescent with no console errors. `/ai-info` names the top rank.

**Correction to my own note above:** I flagged a seventh tier, `wood`, as an
unrendered phantom. That was wrong — `wood` is a real entry in `RANK_TIERS`
and `tierForScore()` uses it as the colour band for *individual skill scores*
below 25, which the Bronze sample build hits (automation: 22). It is a score
band, not a rank, and it is correct as written. `RANKS` holding six and
`RANK_TIERS` holding seven is deliberate.

**My error, corrected.** `competitor-intel.md` asserted the reverse — "top
rank is **Titan**" and listed "Bronze to Iridescent" as a *stale string to
fix*. That has been sitting in the brief as a recommendation since the
overnight pass and is now corrected in three places.

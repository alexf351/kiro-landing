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
| LaunchBuck | 2026-08-21 | **NOT live** — `/p/iro-ai` 404s (audited 2026-09-01, correcting the round-2 report) | — | Logged as skipped after the submit form returned "Something went wrong" on repeated attempts 2026-08-21 — so at least one of those attempts landed after all. Worth knowing for next time: **a directory error page is not proof the submission failed.** Not worth chasing: DR 26, and the number that actually decides it is **4% dofollow across 365 linking websites** — roughly 15 domains pass it any equity, so it has little to pass on. Revisit only if it starts showing up as a cited source. |
| **Aitoolnet** | 2026-08-21 | **LIVE** — https://www.aitoolnet.com/iro-ai (reported 2026-09-01) | — (no badge) | **The one directory that passes test #1.** The AI visibility audit named reddit.com, mwm.ai and aitoolnet.com as *measured* citation sources for this category, which puts it in a different class from the launch boards. Free route existed but required a reciprocal badge, and the strip is at its cap of four — so $9.9 bought speed *and* kept a badge slot free, which is the cheaper trade. Category: Education Assistant. Pricing: Freemium. |
| outbid.lol | 2026-08-21 | live | dofollow (theirs, not ours) | **$5 pay-to-rank leaderboard.** Bid sets position. Logged as the worked example of the paid-link rule below — judge it on referral traffic in DataFast, not on links. |
| CurlShip | 2026-08-21 | **live immediately** (free tier, no approval queue) | — badge **declined** | API-first directory, submitted with support@tryiro.com. Listing scrapes our own title and meta description, both current. Badge was offered to upgrade the link to dofollow and was declined: the strip is at its cap of four, and a dofollow split across 2,500+ listings on a brand-new domain is worth far less than the footprint risk of a fifth reciprocal badge. Declined the $50 featured auction and $49/yr platinum for the same reason as outbid.lol — that is buying the link. **Worth watching for a different reason:** it publishes an llms.txt and markets itself to crawlers, so if it turns up in the DataFast AI-crawler report it is evidence that bot-first directories are worth more than human-first ones. |
| **AlternativeTo** | 2026-08-21 | **live, 12 alternatives attached** | — no badge | Highest-value free listing on the list, because the relationship is two-way: each alternative also places Iro on *that* app's page. Anchored on the high-traffic ones first (Duolingo, Brilliant, Khan Academy, Blinkist, Coursera, DataCamp) rather than count. **Two rules learned doing it:** (1) never 'Select All' — Duolingo's alternatives are language apps, and matching against Memrise puts Iro on pages where it is irrelevant and gets voted down; (2) **never create an AlternativeTo entry for a competitor that is not already listed** — that hands them a page, a description and a backlink on a high-authority domain that they did not have. Same call as the standing 'do not help NerdSip' note. |
| — *AlternativeTo follow-up* | open | — | — | **Alternatives are ranked by votes.** Iro is currently bottom of Duolingo's, Brilliant's and Khan Academy's lists — the three that actually carry traffic. Upvoting Iro on those pages is worth more than any further listing, and is the one place asking a few real people for a click is both legitimate and high-leverage. |
| Product Hunt | — | — | — | the only one in this row with a real audience; needs launch prep |
| Bob's Tech Review | **skipped** | — | — | Run by the NerdSip founder. Unlike every other row here, this is a *review someone else writes*, not a listing we control — and that someone sells the closest competing product. Bad trade for the smallest badge in the set. Same call as the standing "do not send the inclusion ask to NerdSip" note in §3. |


**Aitoolnet follow-up — CLOSED 2026-09-01. It is live:**
https://www.aitoolnet.com/iro-ai

The payment cleared through PayPro Global with no vendor confirmation and no
visible listing, which looked like the worst case. It was the benign one: a
merchant-of-record handoff lag, exactly as guessed. **Do not chase a silent MoR
payment for at least a week** — the instinct to resubmit would have bought the
listing twice.

**This is the single most useful result in the whole pack, for two reasons.**

1. **It is the one directory measured as a citation source.** The AI visibility
   audit named reddit.com, mwm.ai and aitoolnet.com as what actually gets quoted
   in this category. Every other row here is a link we hope gets crawled; this
   one is a page assistants have already been observed citing.
2. **It answers the paying-for-speed question with a yes.** The rule was: paying
   for speed is fine, paying for the link is not. $9.9 bought a listing that
   existed on the free tier anyway (behind a reciprocal badge we did not want to
   spend a strip slot on), and it delivered. That is now a tested trade rather
   than a principle — and it is the shape to repeat, not outbid.lol's.

**What to check on it, once:** open the listing and confirm the copy matches
current product truth (29 paths, 477 lessons, Battery not hearts, iOS + web,
no Android). Directories scrape and paraphrase, and this is the one page in the
set where a wrong figure would actually propagate into AI answers.

### Grok Bot autonomous run — 2026-08-21

Alex handed the agent brief (product data block, hard-facts list, NEVER SAY
list, free-tier-only rule, no reciprocal badges, no paid placements, never
create competitor entries, support@tryiro.com) to Grok Bot and let it run.
**Resolved 2026-09-01** — the Chief-of-Staff agent produced the run table. The
reconstruction below the line was right about the shape and wrong about two
things, both recorded. URLs are as that agent reported them; **the egress proxy
blocks every one of these hosts, so none is independently verified from here.**

**Live, with a public URL (5):**

| Site | URL |
| --- | --- |
| Aitoolnet | https://www.aitoolnet.com/iro-ai |
| Indie Hackers | https://www.indiehackers.com/product/iro-ai |
| Easy With AI | https://easywithai.com/ai-educational-tools/iro-ai/ |
| LaunchFree | https://launchfree.io/listings/iro-ai.html |
| Wired Business | https://www.wired.business/tryiro |

**Live from earlier rounds, no URL captured (9):** AlternativeTo, CurlShip,
TinyLaunch, Firsto, PeerPush, Startup Fame, Verified Tools, outbid.lol,
LaunchBuck.

**Pending (11):** FoundrList (21 Sep), ISTE (org approved, product page
pending), SideProjectors (in review), Launching Next (**~4-month queue**),
Insidr, Startup Stash, AI Tools Directory, The Next AI, ToolPilot, AIChief
(account exists, no public URL), Uneed (**draft until we pay**).

**Round 2 adds 11 more to the skip list** (see the round-2 section below):
EdTech Impact, llmstxt.site, llmstxt.info, directory.llmstxt.cloud,
llmstxt.work, Learnamic, LaunchBoosts, TeachersFirst Edge, Class Tech Tips,
AASL Best Digital Tools 2027, Common Sense Privacy. **Any round-3 brief must
carry all 36 names** — the skip list is the single thing that stops an agent
run burning itself on resubmissions.

**Absent from both lists — which is itself the finding:** Peerlist, G2,
Crunchbase, AppAdvice. Peerlist's absence confirms the four-verification-codes
read: the agent looped and never completed it. G2 and Crunchbase were account
creations that never became listings. AppAdvice bounced.

**What the reconstruction got wrong, both worth keeping:**

1. **LaunchBuck was logged as skipped** because its submit form kept returning
   "Something went wrong". It is live. *A directory's error page is not proof
   the submission failed* — check the listing before writing something off.
2. **Indie Hackers was logged as "account only; no listing exists there to
   confirm".** There is a product page. The instinct that IH's value is the
   build story rather than the listing is still right — but the listing exists,
   and the reconstruction stated otherwise as fact.

**What to do now, in this order:**

1. **Read the five live listings once, against the hard facts.** This is the
   only remaining unknown: we still do not know what the agent *said* about Iro
   on each form, and the whole point of the NEVER SAY list is that claims stay
   right on pages we do not control. Check for 29 paths, 477 lessons, 16 ranks,
   Battery (not hearts), duels never described as live, iOS + web with Android
   in development, no "Kiro", no model or vendor names. **Aitoolnet first** —
   it is the one measured citation source, so a wrong figure there propagates
   into AI answers rather than just sitting on a page nobody reads.
2. **Decide Uneed deliberately.** "Draft until we pay" is the exact shape the
   paid-link rule exists for. Apply the test: does the listing exist without
   the money? Uneed does run a free queue, so if the payment buys *position or
   speed* it is a Firsto-shaped trade and fine; if it is the only way to be
   listed at all, it is an outbid.lol-shaped trade and the answer is no.
3. **Chase ISTE, and treat it as the most valuable thing in the pending list.**
   It is the only entry here that is not an AI directory: a real education-sector
   body with an audience of actual teachers. "Org approved, product page still
   pending" means the hard part already cleared. One follow-up email is worth
   more than ten more tool directories.
4. **Write off Peerlist, G2, Crunchbase for now.** Peerlist never completed.
   G2 is a review platform, not a listing — an empty claimed profile is worse
   than an unclaimed one, so either drive real reviews to it or leave it. Same
   logic as §7's review-velocity note.
5. **Launching Next is a ~4-month queue** — roughly late December. Not worth a
   second thought until then; do not resubmit.

**Unrelated to links, but worth acting on.** The same inbox showed a GitHub
personal access token (classic) named `grokbot` created with `admin:enterprise`
and `admin:gpg_key` scopes. Nothing in directory submission needs either — that
token can administer an enterprise and manage signing keys. Revoke it and, if
the agent genuinely needs GitHub at all, reissue a fine-grained token scoped to
one repo, read-only. There were also Google security alerts for Grok access on
`nba.designsig@gmail.com`; worth confirming that account is one of yours.

**The standing read on agent-run submissions.** The brief's quality bar was
"20 real listings beats 100 junk ones", and this run is the test of whether an
agent can hold that line. Judge it in a month on one number: how many of these
are *live listings with correct copy*, not how many accounts exist. If the
answer is most of them, this is the cheapest link channel available. If it is a
pile of half-finished signups, it is noise with our brand on it.

### Grok Bot round 2 — 2026-09-01

Ran on the round-2 brief (skip list of 25, education-sector first, llms.txt
directories second, account-is-not-a-submission, two-attempts-then-move-on).
**Eleven sites, zero wasted on resubmissions** — the skip list did its job.
One live immediately; the other ten sit with real human reviewers, which is
what an education channel looks like versus an auto-publishing tool directory.

| Site | Status | URL / route |
| --- | --- | --- |
| **EdTech Impact** | **LIVE** | https://edtechimpact.com/products/iro-ai/ |
| llmstxt.site | submitted | — |
| llmstxt.info | submitted (Standard, free) | — |
| directory.llmstxt.cloud | **waitlist** | — |
| llmstxt.work | submitted | — |
| Learnamic | submitted | — |
| LaunchBoosts | submitted | — |
| TeachersFirst Edge | pitched by email | editorial |
| Class Tech Tips | pitched by email | editorial |
| AASL Best Digital Tools 2027 | nominated | award, not a listing |
| Common Sense Privacy | submitted by email | **evaluation, see below** |

**EdTech Impact is the best listing we have.** It is a review platform schools
actually use during procurement, so the audience is buyers rather than
link-crawlers. It is also the first listing where the *reviews* matter more
than the link — same shape as G2, but in a sector where we can plausibly get
them. Worth reading the live page against the hard facts, second only to
Aitoolnet.

**The four llms.txt directories are the bot-first experiment, and they are an
honest fit.** We publish llms.txt, llms-full.txt, llms-index.txt, ai.txt and
175 markdown mirrors, so a directory *of llms.txt files* is the one category
where the listing describes something we genuinely do. Judge them on one
question only: **do they show up in the DataFast AI-crawler report?** If
crawlers reach us through them, bot-first directories beat human-first ones
for GEO and that is a genuinely new finding. If nothing arrives, they cost
nothing and the experiment is closed. Do not expect link equity from
four-week-old domains, and do not scale this pattern past these four — the
footprint of one brand across every near-identical llmstxt.* domain starts to
look manufactured however legitimate each one is.

### The K-12 tension this round exposes — decide before Common Sense reports

Four of these channels are K-12: TeachersFirst Edge, Class Tech Tips, AASL
(school librarians) and Common Sense Privacy. **Our privacy policy says Iro
"is not directed at children under the age of 13" and that we do not knowingly
collect data from them.** That is an honest, standard 13+ stance and there is
nothing wrong with it — but it is in tension with pitching K-12 channels, and
one of them publishes a public rating.

**Common Sense Privacy is an evaluation, not a listing.** They review the
privacy policy against a K-12 lens and publish a score that schools check
before adopting a tool. Three outcomes:

1. They rate us as a 13+ / not-for-children product. Fine, accurate, and
   limits us to high school and teacher use — which is the honest market.
2. They find the policy thin on something they weight heavily (third-party
   data sharing, retention specifics, ad/tracking disclosure). A weak public
   rating on a site schools trust is worse than no rating.
3. They do not review it at all, since we are not a children's product.

**Before that lands, read the privacy policy once as a school would.** The
current page covers collection, third parties, retention/deletion, children's
privacy and changes — the right sections — but it was written for an app
store, not a district procurement review. This is the one item in the whole
pack where a submission can produce a *negative* public artifact.

**Positioning for all four K-12 channels: high school and up, plus teachers
themselves.** Iro teaching a teacher to use AI is a straightforward,
defensible pitch that sidesteps the under-13 question entirely — and AASL and
TeachersFirst both serve educators directly, not just classrooms.

### Grok Bot round 3 — the audit, 2026-09-01

The audit round, and the most valuable of the three. Two headline results.

**1. Four listings we recorded as live were never live.**

| Site | What the audit found |
| --- | --- |
| AlternativeTo | Search empty, `/software/iro-ai` returns 404. **Alex did this work personally and saw 12 alternatives attached**, so the likely explanation is moderation — AlternativeTo reviews new entries and can reject them. Needs Alex to log in and check status, not a resubmit. |
| Verified Tools | Not live. **And we are displaying their badge on the homepage right now**, hotlinked from their domain. See below. |
| outbid.lol | Site returned HTTP 429 (rate-limited), so this is *could not verify*, not *not live*. We paid $5 for it. Check manually. |
| LaunchBuck | `/p/iro-ai` 404s. My 2026-09-01 entry above logged it as live from the round-2 report — **that was wrong and is corrected here.** |

**The Verified Tools badge is the urgent one.** The deal was: display their
badge, and once verified the listing link becomes dofollow. If there is no
listing, we are giving an outbound link plus a third-party image request on the
homepage and receiving nothing. **Click the badge on tryiro.com — five seconds.
If it 404s, pull the badge.** It also frees a slot in a strip capped at four.

**2. Seven of the eleven listings that ARE live carry wrong copy.**

Two were fixed by the agent (**Wired Business**, **TinyLaunch**). Seven need a
human because every dashboard login was blocked by anti-bot measures — Turnstile,
Google OAuth, a failed magic link. That is the tooling working as designed, not
an agent failure.

| Site | Wrong | Fix route |
| --- | --- | --- |
| **AIToolNet** | 7-day trial shown on monthly; Custom Paths uncapped; duels not labelled simulated. **Wrong in 7 languages** (zh, zh-TW, ko, ja, ru, fr, es). | No CMS. Emailed support@aitoolnet.com |
| **EdTech Impact** | iOS-only, pricing "not provided by vendor", missing web app / Battery / 29-477-3,000+ / 16 ranks. **Lists "1-100 customers" — a number we never supplied.** | **my.edtechimpact.com** → Profile → Information → Save and Publish |
| Firsto | 2,700+ exercises, live duels, trial on monthly, Custom Paths uncapped | Dashboard, else contact@firsto.co |
| PeerPush | Live duels, 2,700+, **six ranks**, $4.17 only, wrong handle (@nbakix) | Login @afur351, else support@peerpush.com |
| Startup Fame | Live duels, 2,700+, six ranks, Custom Paths uncapped | Dashboard, else hello@startupfa.me |
| Easy With AI | Custom Paths uncapped, no Pro price | Emailed admin@easywithai.com |
| LaunchFree | Trial not annual-only; **logo file is `kiro-app-icon-512.png`** | Emailed hello@launchfree.io |

**The pattern in the errors is one thing repeated: these are all snapshots of
the old product.** "2,700+ exercises", "six ranks", live duels, uncapped Custom
Paths — that is the pre-August product. Directories scrape once at submission
and never refresh. Every listing is a photograph of the day it was submitted,
so **the copy has to be right at submission time; there is no cheap fix
afterwards.** That is now the strongest argument for the pre-submission fact
check, and against submitting in volume.

**3. The .edu vein opened.** Fourteen university library guides, teaching
centres and higher-ed trackers contacted, all `.edu` or EDUCAUSE, each with a
named librarian or an actual suggestion form — Ithaka S+R's GenAI Product
Tracker, EDUCAUSE Library, and LibGuides at SUNY Oswego, UVA, Baylor, Chapman,
Montgomery College, Miami, LSU, Vanderbilt, Yale Poorvu, Fresno State, UF and
The Chicago School.

**Do not scale this before measuring it.** Fourteen personalised emails to
named librarians is outreach; a hundred is spam, and it would put
support@tryiro.com at risk. **Wait for reply rates on these fourteen before
sending any more.** If two or three land, the pitch works and the channel is
worth real investment. If zero land in two weeks, the pitch is wrong and
sending more of it just burns the list.

Also correctly declined: Tech & Learning ($625), Common Sense reviews (paused),
EdSurge (turned out to be ISTE, already done).

### Dates to keep

| Date | What |
| --- | --- |
| **~18 Sep 2026** | Firsto's 30-day badge obligation ends — same day the listing goes live, so the badge stays put until then regardless. |
| **18 Sep 2026** | Firsto listing goes live (confirmed on activation, 08:00 UTC). |
| **~22 Sep 2026** | PeerPush listing goes live — grab its badge embed then. |
| **21 Sep 2026** | TinyLaunch launch day. |
| **21 Sep 2026** | FoundrList goes live (confirmed date, same day as TinyLaunch). |
| **~late Dec 2026** | Launching Next clears its ~4-month queue. Do not chase before then. |

**Four listings land inside five days** — Firsto 18th, TinyLaunch 21st, FoundrList 21st, PeerPush ~22nd. That is the closest thing to a launch moment on the calendar, and all four are free. If Product Hunt is going to happen, aiming it at that week compounds the four rather than spending them separately: a PH launch with four fresh listings already live reads like momentum, a cold one reads like a first attempt. **Decide the PH date by 8 Sep** — the gallery, first comment and hunter outreach all need lead time, and 18–22 Sep is under three weeks out.

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

**Worked example, 2026-08-21 — the same $10 spent two ways.**

Two purchases on the same day, and the difference is the whole rule:

| | outbid.lol, $5 | Aitoolnet, $9.9 |
| --- | --- | --- |
| What the money bought | position on a pay-to-rank board, plus a dofollow | skipping a queue |
| Was the link available free? | no — the link *is* the product | **yes**, free route existed |
| Is it a measured citation source? | no | **yes** |
| Verdict | tolerable at $5, do not repeat or scale | good spend |

outbid.lol is a paid dofollow, which is what the policy prohibits. At $5 on a
two-day-old novelty site the practical risk is negligible — Google's usual
response to obvious paid-link networks is to devalue them rather than penalise
the buyers, and that needs a pattern at scale. **But do not bid higher and do
not repeat it**, and expect the whole `.lol` bidding wave (Payluck, Daily
Outbid) to be devalued in bulk once the footprint is obvious.

Aitoolnet is the opposite shape. The listing was free either way, so the $9.9
bought speed and avoided owing a reciprocal badge from a strip already at its
cap of four. That is the Firsto trade, and it is fine.

**The test, restated:** ask whether the link exists without the money. If yes,
you are buying speed. If no, you are buying the link.

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
- [x] **AlternativeTo** (done 2026-08-21 — see status table) — list Iro as an alternative to **Duolingo, Coursiv, Brilliant, DataCamp**, and add
  **NerdSip, Morso, Nibble, Kinnu, Imprint, Chunks, Blinkist and Headway**. Those eight are the apps that
  actually appear alongside Iro in search results (measured 2026-08-18, see `search-baseline.md`), and Iro
  is listed against none of them. This is exactly what searchers AND LLMs cite for "alternative to X".
  https://alternativeto.net
- [ ] **BetaList** — for early-stage; good for a first wave of eyes + a link. https://betalist.com
- [ ] **Futurepedia** — major AI tools directory. https://futurepedia.io
- [~] **Uneed** (*submitted; sits as a draft until paid — apply the test in §"Do not buy a dofollow" before paying: if the free queue still lists us eventually, paying buys speed and is fine; if payment is the only route to being listed, decline*) / **Fazier** / **Startup Fame** (done) — indie launch platforms, quick submits, real links.
- [ ] **Peerlist Launchpad** — dev/indie audience, good DR. *Grok Bot's 2026-08-21 attempt never completed (four verification codes in four minutes, and Peerlist appears in neither the live nor the pending list). Still open; needs a manual submit.*
- [ ] **SaaSHub** — SaaS directory; add as alternative to the same competitors.
- [ ] **Toolify.ai** — AI directory with decent traffic.

## 2. TIER 2 — broaden over the next 2–3 weeks

- [ ] **AI directories:** AIToolsDirectory, AItoolhunt, TopAI.tools, Insidr.ai, AI Scout, AIcyclopedia, easywithai, Foundr AI list.
- [ ] **App/edtech:** ~~AppAdvice~~ (*`devcontact@appadvice.com` bounced 2026-08-21 — address not found; find a live contact or drop it*), appPicker, "best language-learning-style apps" roundups.
- [~] **Indie/startup:** **Indie Hackers** (*product page live: indiehackers.com/product/iro-ai — the build story is still unwritten, and that is the part that carries the audience*), Startup Stash (*pending*), **Launching Next** (*submitted, ~4-month queue, so ~late Dec*), Land-book (if the site design is strong — yours is).
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

# Iro AI — App Store Optimization (ASO) package

**Purpose:** paste-ready metadata + keyword research for the iOS App Store
listing (App Store Connect). ASO metadata lives in App Store Connect, **not**
in this repo — this file is the source copy to paste in and A/B test.

App: **Iro AI — Learn AI Skills** · App ID `6759628066`
Last updated: 2026-06-05 · Maintained alongside `llms-full.txt` (single source of product facts)

> **Field limits (Apple):** Name ≤ 30 chars · Subtitle ≤ 30 chars · Keyword field
> ≤ 100 chars · Promotional text ≤ 170 chars · Description ≤ 4000 chars. The
> **Name + Subtitle + Keyword field** are the only fields Apple indexes for
> search — spend them deliberately. Apple auto-combines words across these
> fields, so **never repeat a word** between them, and don't waste characters on
> spaces in the keyword field.

---

## 1. App Name (≤30 chars)

Recommended (keeps brand + the #1 head term):

```
Iro: Learn AI & ChatGPT
```
(23 chars — adds the highest-volume search term "ChatGPT" to the indexed name.)

Alternatives to A/B test:
- `Iro AI — Learn AI Skills` (24) — current; brand-forward, no extra keyword.
- `Iro: Learn AI, ChatGPT, GPT` (27) — squeezes a third indexed term.
- `Iro AI: Learn AI & Prompting` (28) — leans into prompting.

**Recommendation:** test `Iro: Learn AI & ChatGPT` against the current name.
Putting "ChatGPT" in the *Name* (highest-weight field) is the single biggest
ASO lever available, because nearly everyone searching to "learn AI" searches
"ChatGPT" too.

## 2. Subtitle (≤30 chars)

Recommended:

```
Master AI tools in 5 min/day
```
(28 chars — benefit + the "AI tools" term + the 5-minute hook.)

Alternatives:
- `Prompt, practice & level up` (27) — verbs + gamification.
- `Your daily AI tutor & coach` (27) — owns "AI tutor"/"AI coach" intents.
- `Learn prompting, AI & LLMs` (26) — keyword-dense.

**Recommendation:** `Master AI tools in 5 min/day` for the value prop; rotate in
`Your daily AI tutor & coach` to test the high-intent "AI tutor" search.

## 3. Keyword field (≤100 chars, comma-separated, NO spaces)

Do **not** repeat any word already used in the Name or Subtitle. Use singulars
(Apple matches plurals automatically). Recommended 100-char string:

```
prompt,gpt,claude,gemini,tutor,course,llm,quiz,coach,genai,copilot,perplexity,literacy,prompting
```

Rationale: covers the major model names people search (gpt/claude/gemini/
perplexity/copilot), the high-intent learning terms (tutor/course/coach/study),
the category terms (llm/genai/literacy/prompting), and the free-tool hook (quiz).
"ChatGPT", "AI", "learn", "skills", "tools", "5 min" are intentionally omitted
here because they live in the Name/Subtitle and Apple already combines them.

**Verify the exact character count before pasting** (must be ≤100). A second
string to rotate for a test cycle:

```
gpt,claude,gemini,prompt,tutor,bootcamp,course,llm,genai,agent,automation,quiz,coach,beginner,study
```

## 4. Promotional text (≤170 chars — editable any time, not indexed)

```
New: weekly AI news + live duels. Learn ChatGPT, Claude, Gemini & prompting in 5-minute lessons. Free to start — see how high your AI IQ really is.
```
(146 chars.) Swap this for launches/seasonal hooks; it doesn't affect search,
so use it for conversion and freshness.

## 5. Description (≤4000 chars)

First 1–2 lines show above the fold — front-load the hook and value. Apple does
**not** index the description for search, so write it for *conversion*, but keep
it keyword-natural for screenshots/AI overviews that may quote it.

```
Iro is the fun, fast way to actually get good at AI — like Duolingo, but for ChatGPT, Claude, Gemini, and the AI skills that matter at work and in life.

Most people use AI at maybe 10% of its potential. Iro closes that gap in about five minutes a day. Instead of watching another endless video course, you learn by doing: write real prompts, get instant feedback, spot AI mistakes, compare models, and duel other learners — then keep a streak going as you climb the ranks.

WHAT YOU'LL LEARN
• ChatGPT, Claude, Gemini & Perplexity — get more out of every tool
• Prompt engineering — the one skill that works across every AI
• AI agents & automation — hand off the busywork
• Image & video generation, vibe coding, and AI for real jobs
• How to spot hallucinations and know when to trust AI

WHY IRO WORKS
• 5-minute lessons built for a coffee break or commute
• Active practice, not passive video — so it actually sticks
• Prompt Lab: write real prompts and get AI feedback
• Live duels with ELO matchmaking — learning that feels like a game
• XP, daily streaks, and 6 ranks to keep you coming back
• Weekly AI news so you never fall behind

18 learning paths · 345 lessons · 2,000+ hands-on exercises · for total beginners and power users alike.

NOT SURE WHERE YOU STAND?
Take the free AI IQ Test — 10 questions, about two minutes — and get a personalized learning path.

FREE TO START
Learn free, forever. Iro Pro unlocks every lesson, the Prompt Lab, unlimited duels, and weekly news: $49.99/year (about $0.96/week) with a 7-day free trial, or $9.99/week. Cancel anytime.

Download Iro and turn AI from a novelty into your edge.
```

## 6. Screenshot captions (6–8, ≤ ~5 words each — biggest conversion lever)

1. Master AI in 5 minutes a day
2. Learn ChatGPT, Claude & Gemini
3. Write real prompts. Get feedback.
4. Duel other learners — live
5. Keep your streak. Climb the ranks.
6. Spot AI mistakes like a pro
7. 18 paths for every job
8. Take the free AI IQ Test

## 7. "What's New" template (per release)

```
• New lessons across [paths]
• [Feature] — [one-line benefit]
• Faster, smoother, and more accurate feedback
Keep your streak going — happy learning!
```

---

## 8. Keyword research & rationale

Prioritise **high-intent + winnable** terms. For an indie app, long-tail and
brandable intents convert better than head terms you can't rank for yet.

| Keyword / intent | Why it matters | Where to place | Priority |
| --- | --- | --- | --- |
| chatgpt | Massive volume; most "learn AI" users also search this | Name | ★★★ |
| learn ai / ai | Core category | Name | ★★★ |
| prompt / prompting | High-intent, on-brand, winnable | Subtitle/Keywords | ★★★ |
| ai tutor / ai coach | High purchase intent, low competition | Subtitle/Keywords | ★★★ |
| gpt / llm / genai | Category + abbreviations people type | Keywords | ★★ |
| claude / gemini / perplexity / copilot | Tool-name searches | Keywords | ★★ |
| ai course / bootcamp | Course-seeker intent | Keywords | ★★ |
| ai quiz / ai test | Ties to the free AI IQ Test hook | Keywords | ★★ |
| ai for beginners / study | Beginner + student intent | Keywords | ★★ |
| ai agents / automation | Trending advanced intent | Keywords (rotate) | ★ |

**Process to keep this fresh (monthly, ~30 min):**
1. App Store Connect → **App Analytics → Search terms**: see which terms already
   drive impressions/downloads; double down on winners, cut dead weight.
2. Check competitor listings (search "learn AI", "ChatGPT", "AI tutor") and note
   the terms in their names/subtitles.
3. Use a free/cheap ASO tool (AppFigures, Astro, Sensor Tower free tier) for
   rough volume + difficulty.
4. Re-balance the 100-char keyword field; never repeat Name/Subtitle words.

---

## 9. A/B test plan (App Store Connect → Product Page Optimization)

Run one variable at a time, ~7–14 days each, watch **conversion rate** (not
just impressions):

1. **Name:** `Iro: Learn AI & ChatGPT` vs current `Iro AI — Learn AI Skills`.
2. **First screenshot caption:** benefit ("Master AI in 5 min/day") vs social
   proof ("4.7★ — learn AI by doing").
3. **Subtitle:** value prop vs "AI tutor" intent.
4. **App icon:** current vs a variant with a subtle "AI" / spark motif (icon is
   the highest-impact visual test).

---

## 10. Localized ASO (when the localized pages/app ship)

The web localization is currently hidden (not ready). When the app supports
es/fr/de, localize Name/Subtitle/Keywords too — localized keyword fields are
"free" extra indexed terms even for users in English-speaking regions who set a
localized language. Seed phrases:

- **ES:** `aprender ia, chatgpt, prompts, tutor de ia, curso de ia, inteligencia artificial`
- **FR:** `apprendre l'ia, chatgpt, prompts, tuteur ia, cours d'ia, intelligence artificielle`
- **DE:** `ki lernen, chatgpt, prompts, ki tutor, ki kurs, künstliche intelligenz`

(Translate the subtitle/description for real; do not machine-dump. Coordinate
with the web localization effort so brand voice matches across surfaces.)

---

## 11. Beyond metadata (ratings, freshness, signals)

- **Ratings & reviews** are a top ASO ranking + conversion factor. Prompt happy
  users with `SKStoreReviewController` after a win/streak milestone (not mid-task).
- **Ship updates regularly** — recency is a ranking signal and "What's New" keeps
  the listing fresh.
- **Custom Product Pages** (per campaign/keyword) + **in-app events** ("AI IQ
  Challenge week") add indexed surfaces and re-engagement.
- **Drive external traffic** to the App Store page (the website, the AI IQ test,
  social) — download velocity from outside Search lifts Search rank too.

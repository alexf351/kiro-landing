# Path-page authoring brief (Iro AI path library)

You are writing JSON content specs for indexable SEO/GEO "path" pages. A Node
generator (`blog-engine/build-paths.mjs`) turns each `<slug>.json` in this folder
into a full HTML page. **You only write the JSON.** Read the golden example
`ai-for-founders.json` in this folder before you start — match its depth, tone,
and structure exactly. This file (`_BRIEF.md`) is ignored by the generator.

## Mission
Iro is losing the SEO/GEO race to competitors who publish a large library of
genuinely useful pages. Each page must earn its ranking: real search intent,
real teaching, a real practice sample. **No thin or generic filler.** If two
pages could share the same body text, you've failed — every page is specific to
its exact topic.

## HARD FACTS — never contradict these
- **Product:** Iro AI — "the Duolingo for AI." Gamified microlearning: ~5-minute
  lessons, active practice with instant feedback, streaks, XP, 6 ranks, daily
  challenges, head-to-head duels (ELO matchmaking), weekly AI news.
- **Real features you may reference:** Prompt Lab / real prompt practice with
  feedback; 13 exercise types; **Ask Iro** (a personal AI coach — chat and
  voice); **Custom Paths** (generate a learning path on almost any topic you
  type in); shareable certificates; 20 built-in learning paths; 375 lessons;
  2,000+ exercises. **Do NOT invent features that aren't in this list.**
- **Platform:** iOS now. Android is **in development** — users can join the
  Android waitlist on the home page. Iro also runs in any browser at
  **app.tryiro.com**. NEVER claim there is an Android app. NEVER touch/expand
  Android messaging beyond "in development + waitlist."
- **Pricing:** Free to start (starter lessons + a taste of everything). Pro is
  **$59.99 a year** (~$1.15/week) with a **7-day free trial**, or
  **$9.99/week**. Cancel anytime. Pro unlocks every lesson/path, unlimited
  Custom Paths, unlimited Ask Iro, full prompt library, certificates.
- **"Free" rule:** You MAY call the iOS app "free to start" / "Download Iro
  free." You may NOT call the **web app** free (it has a paywall). Refer to the
  web app neutrally: "Iro also runs in your browser at app.tryiro.com."
- **Tone:** confident, plain-spoken, a little bold. No hype, no em-dash-free
  robotic voice, no fake statistics, no invented user quotes or ratings.

## GEO rules (this is how we get cited by ChatGPT/Perplexity/AI Overviews)
- The `tldr.answer` must answer the page's core question in the FIRST sentence,
  directly and quotably. Then support it.
- FAQ answers are self-contained and factual (they become FAQ rich results).
- Put concrete specifics in (numbers, named tools, real tasks), never vague
  "leverage AI to unlock synergies" filler.

## The practice card is the most important part
Every page needs ONE genuinely useful `practice` exercise that feels like a real
Iro card. Two formats:
- **Multiple-choice** (preferred for prompt-quality lessons): a realistic
  scenario, a task, 4 `options` where exactly one has `"correct": true`, and a
  `feedback` explaining *why* the right one wins (name the specific techniques:
  role, context, constraints, output format, edge-case handling, verification).
- Make the correct option a genuinely strong, specific example the reader could
  copy. Make wrong options plausibly tempting (too vague, too broad, asks AI to
  decide). The exercise must be TRUE to the page's topic.

## JSON schema (all fields required unless marked optional)
```
{
  "slug": "ai-for-sales",            // = filename without .json, matches assignment
  "order": <int>,                     // from assignment (controls hub/sitemap order)
  "category": "jobs|skills|tools",    // from assignment
  "eyebrow": "AI for sales",          // short label shown above H1 + in breadcrumb + hub
  "hubTitle": "AI for sales",         // card title on /paths hub
  "hubBlurb": "one line, ~10 words",  // card description on /paths hub
  "title": "AI for Sales: ... | Iro AI",  // <title>/OG, ~55-60 chars before | Iro AI
  "h1": "Short, benefit-led headline.",    // the on-page H1 (can differ from title)
  "metaDescription": "150-160 chars, keyword-rich, benefit + method",
  "keywords": ["primary kw", "variant", "...4-6 total"],
  "lede": "2-3 sentence hero paragraph. Speak to the reader's real problem, name Iro's role.",
  "pills": ["6 short topic chips"],
  "about": "short schema 'about' topic, e.g. 'AI for sales'",   // optional
  "level": "Beginner to advanced",     // optional
  "audience": "who this is for (schema audienceType)",
  "teaches": ["4-5 skill phrases for Course/LearningResource schema"],
  "tldr": { "answer": "answer-first paragraph, 2-3 sentences", "bullets": ["3 crisp takeaways"] },
  "outcomesHeading": "What you'll be able to do",   // optional (this is the default)
  "outcomes": ["5 concrete 'you can do X' outcomes, specific to the topic"],
  "lessons": [ {"t":"Lesson title","dur":"5 min","blurb":"one sentence, specific"} x5 ],
  "practice": {
    "type": "Prompt practice",
    "scenario": "realistic setup, 1-2 sentences",
    "task": "what the reader must choose/do",
    "options": [ {"text":"...","correct":false}, {"text":"...(strong, specific)","correct":true}, ... ],  // exactly 4, one correct
    "revealLabel": "See why ... wins",
    "feedback": "why the correct answer wins; may use <strong>...</strong>. Name the techniques."
  },
  "body": [ {"h2":"Question-style or specific H2","html":"<p>...</p>... (may use <ul><li><strong>)"} x2 ],
  "faqHeading": "Questions people ask",   // optional; customize e.g. "Sales AI questions"
  "faq": [ {"q":"real question people search","a":"self-contained factual answer"} x5 ],  // 'aHtml' optional instead of 'a' for HTML
  "related": [ {"href":"/existing-slug","label":"..."} x3 ],   // MUST link only to pages that exist (see list)
  "readNext": [ {"href":"/blog/existing-slug","label":"..."} x3 ],  // MUST be real blog posts (see list)
  "llmsBlurb": "one line for llms.txt, ~15 words",
  "ctaHeading": "Practice this in Iro.",   // optional; customize per page
  "ctaBody": "1-2 sentences",              // optional
  "datePublished": "2026-07-09",
  "dateModified": "2026-07-09"
}
```

## Internal links — ONLY link to pages that exist
`related[]` (root path pages) — choose 3 relevant from:
/ai-for-work /ai-for-marketing /ai-for-finance /ai-for-managers /ai-for-students
/ai-for-healthcare /ai-job-hunting /ai-for-founders /ai-for-excel /ai-productivity
/learn-chatgpt /learn-claude /learn-gemini /learn-perplexity /learn-llms
/prompt-engineering-app /ai-agents-course /ai-automation-course
/ai-image-generation-course /ai-video-generation-course /vibe-coding-course
/ai-prompts /paths — plus any other slug in THIS wave (see assignment list).

`readNext[]` (blog posts) — choose 3 relevant from:
/blog/how-to-use-ai-at-work /blog/spot-ai-hallucinations
/blog/prompt-engineering-patterns /blog/how-to-learn-chatgpt-in-2026
/blog/chatgpt-vs-claude-vs-gemini /blog/what-is-prompt-engineering
/blog/ai-automation-for-beginners /blog/ai-for-small-business
/blog/how-to-use-ai-to-write-a-resume /blog/best-ai-apps
/blog/how-to-use-chatgpt /blog/how-to-use-claude /blog/how-to-use-gemini
/blog/is-prompt-engineering-dead /blog/how-to-write-a-prompt
/blog/best-ai-tools-for-students /blog/how-to-use-ai-for-studying

If unsure a link exists, pick a safer one from these lists. Never invent URLs.

## Step 5 — Anti-slop pass (REQUIRED before you finish)

Reread everything you wrote and strip the tells that make text read like an
unedited AI draft. This is a hard gate, not a nicety.

- **Em dashes: cap at ~2-3 per page.** Our drafts badly overuse them. Rewrite
  the rest with commas, colons, periods, or parentheses — whichever reads most
  naturally. Never create comma splices or run-ons.
- **Vary openings.** Do not start consecutive sentences, list items, or sections
  the same way. Don't open every bullet or paragraph with the same word.
- **Cut hype and corporate verbs:** leverage (as a verb), unlock, supercharge,
  seamless, elevate, robust, game-changer, cutting-edge, revolutionize,
  effortless, unleash, "harness the power," "in today's fast-paced world,"
  "take it to the next level." Say the plain thing instead.
- **No fake hook questions** ("Ever wondered…?", "What if you could…?") and no
  empty marketing filler or throat-clearing intros.
- **Keep contractions** (it's, you'll, don't) — dropping them reads robotic.
- **No unsupported claims or invented stats.** Every product claim traces to
  HARD FACTS above.
- **Vary sentence length; keep paragraphs short** (≤4 sentences). Avoid weak
  transitions ("Additionally," "Moreover," "Furthermore").

## Step 6 — Self-score before returning (REQUIRED)

Rate your draft 1-5 on the two things that matter most:
1. **Human voice** — would a skeptical reader believe a person wrote AND edited
   this, not an AI that shipped its first draft?
2. **Product truth** — is every statement about Iro accurate per HARD FACTS
   (nothing invented, the web app is never called "free," no Android app)?

If either is below 4, revise (Step 4 → Step 5) and re-score. Do not return a
draft that still reads like an AI first draft or contains a single unverified
product claim.

## Output
Write each assigned spec to `blog-engine/content/paths/<slug>.json` as valid
JSON (no comments, no trailing commas). Validate with `node -e` or `python -m
json.tool` before finishing. Do not modify any other file.

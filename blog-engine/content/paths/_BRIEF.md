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
  feedback; 24 exercise types; **Ask Iro** (a personal AI coach — chat and
  voice); **Custom Paths** (generate a learning path on almost any topic you
  type in); shareable certificates; 29 built-in learning paths; 477 lessons;
  3,000+ exercises. **Do NOT invent features that aren't in this list.**
  *Where 3,000+ comes from (verified against the app repo 2026-08-20): curriculum exercises are 2,271; app-wide adds the Daily Challenge pool (140), the Duels pool (163), weekly AI news quizzes (516 and growing ~15/week) and onboarding (~50), for 3,090+ today. Publish "3,000+ interactive exercises" app-wide, or "2,200+ curriculum exercises". The old "2,700+" was wrong in both framings.*

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

---

## Positioning rule for comparison pages (added 2026-08-19)

These pages exist to show that Iro is the right choice. That is the job.
Three errors on 19 August all cut the other way, and all three were factually
wrong as well as off-message:

1. "Iro covers one subject" — false. Custom Paths and Community Paths cover
   anything (both Pro).
2. "NerdSip's free tier is the most generous cold demo" — false.
   app.tryiro.com is the full product with no signup; their browser surface is
   read-only.
3. "Prefer your desktop? Iro also runs in your browser" — framed a free,
   no-signup product as a desktop convenience.

**The rule, so this stops recurring.** A concession earns its place only if it
passes both tests:

- **It is true.** Check it against the product, not against a stale brief.
- **It is about a different buyer, not ours.** Android is a concession: that
  reader cannot install Iro today, full stop. "They want breadth" was not — our
  reader can have breadth. Never hand a reason to leave to the reader the page
  is written for.

**One real concession per page is the target.** Zero reads as an advert and
does not get cited; `/best-ai-learning-app` ranks 3 and 2 and gets quoted
verbatim precisely because it names competitors and says who each is for. Three
concessions, or one in the key takeaways, is over-correcting.

**Never close an FAQ answer by recommending the competitor** on the query the
page exists to win. Lead with Iro, then qualify.

**Check the Pro gate before claiming a capability.** Custom Paths, Community
Paths, Prompt Lab, Image Lab, unlimited Ask Iro, the prompt library, duels and
certificate claiming are Pro. The free tier is the 29 curated AI paths, paced
by the Battery, plus the full web app with no signup.


---

## Product-truth open items (2026-08-20)

- **Custom Paths monthly cap: unconfirmed.** The app-repo brief said 3/day and
  20/month. Alex doubts the monthly figure and is checking. **Publish "up to 3
  a day" only** until confirmed — the monthly number is currently absent from
  every surface on purpose. Do not reinstate it from the brief alone.
- **Lesson podcasts: live in the web app, iOS shortly.** Two hosts, Sam and
  Ava, roughly two to three minutes, Pro. Alex confirmed 2026-08-20 that it is
  real and live at app.tryiro.com but not yet in the App Store build. Publish
  it as live *in the web app* with iOS following — that is both accurate today
  and how he wants it framed. Drop the web-app qualifier once iOS ships.
- **Pro Pass: do not mention, ever.** A 3-day streak earns 48 hours of Pro.
  Real, verified in the app repo, and Alex's explicit decision is that it stays
  off the site — publishing "3-day streak = free Pro" invites gaming. Zero
  instances currently; keep it that way.

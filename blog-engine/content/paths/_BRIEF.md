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

*Verified against the app repo 2026-08-20. Where this block and anything else
disagree, this block wins. Read "Product-truth open items" at the bottom too —
it carries the three things that are deliberately unsettled.*

- **Product:** Iro AI — "the Duolingo for AI." Gamified microlearning: ~5-minute
  lessons, active practice with instant feedback, streaks, XP, **16 ranks across
  six tiers (Bronze III → Diamond I → Iridescent)**, daily challenges, timed
  duels, weekly AI news.
- **Duels are NOT live play.** Opponents are **simulated characters drawn from
  a curated pool**, matched to your skill — stylized personas, not other users
  playing at the same time. Write "a skill-matched opponent". **Never** write
  live, real-time, PvP, "against other learners", or "against another person" —
  this is a standing product rule, not a style preference.
- **Do not name the celebrity-styled opponents in published copy.** Some
  personas use real people's names (stylized, not their likenesses). Alex
  confirmed this is real on 2026-08-21. It stays off public pages anyway: using
  a person's *name* is the right of publicity just as much as their likeness is,
  and celebrity-named characters in a paid app is the textbook fact pattern.
  Describe the roster, not the roster's names, unless Alex says otherwise.
- **Real features you may reference:**
  - **Prompt Lab** — write a real prompt, scored on clarity, specificity,
    constraints and context (Pro).
  - **24 exercise types**, including spot-the-hallucination, a 0–100
    trust-calibration dial, delegate-versus-do-it-yourself calls, prompt
    repair, guardrail writing and compression drills.
  - **Ask Iro** — personal AI coach, chat and voice. Free: 10 questions then 1
    a day, forever. Pro: unlimited.
  - **Custom Paths** — generate a path on any topic. Pro, **3 a day and 40 a
    month**. Four intake lanes, verified against `extract-post` v9 (Aug 2026):
    a **topic you type**; a **link** — TikTok, YouTube, Reddit or **any web
    page**; **screenshots**, up to 4; or a **PDF** up to 10MB.
    **Instagram links are NOT supported** — they are rejected server-side, and
    the supported route for an IG post is a screenshot. Never imply IG links work.
    The lanes read *deeply*, which is the part worth writing about: YouTube pulls
    the video's caption track, TikTok transcribes the audio, and Reddit reads the
    top comments as well as the post — so a generated path is grounded in **what
    was actually said**, not just a caption or a title. Sources are used for the
    request only and are never stored.
  - **The in-app share sheet IS live.** "Share a post straight from TikTok or
    Instagram" works in real builds: `ShareIntentHandler` is mounted in
    `app/_layout.tsx` and routes a shared URL to `sharedUrl` and a shared image
    to `sharedImage`, and the app ships its own how-to with an Instagram tab.
    Publish it. *(I removed this claim on 2026-08-21 believing it dormant — a
    doc line said "activates in the next eas build" and I trusted it over the
    code. Alex corrected it; the build had already shipped. Check the wiring,
    not the changelog prose.)*
  - **The one input that genuinely fails is an Instagram LINK.** Rejected in
    `app/post-to-path.tsx` and again in `extract-post/index.ts`, both with
    "Instagram links can't be read." Sharing *from* Instagram is fine — the
    share sheet hands over an image, which is the screenshot lane. Keep those
    two straight: the app deliberately names Instagram on the screenshot card
    and not on the link field.
  - **Community Paths** — paths built by other learners. Browsing and liking
    are free; taking one into your library is Pro.
  - **Lesson podcasts** — any lesson as a 2–3 minute episode with two hosts,
    Sam and Ava. Pro, live on iOS and the web. No availability qualifier
    needed (confirmed 2026-08-21).
  - **Image Lab** — 3 images free, up to 10 a day on Pro (not unlimited).
  - **Prompt library** — 250 prompts across 8 categories (Pro).
  - **Certificates** — one per path, each with a credential ID. **Earned free**
    by finishing every lesson; *claiming* one with your name, to share, is Pro.
    Not accredited and never to be described as a qualification.
  - **29 built-in learning paths; 477 lessons; 3,000+ exercises.**
- **The 29 paths, by name,** when a page needs to show breadth: tool courses for
  ChatGPT, Claude, Gemini, Perplexity, Grok, Microsoft Copilot, NotebookLM, Suno
  and ElevenLabs; applied paths (Excel, email, slides, side hustles, vibe
  coding, agents, automation); role paths (business, marketing, finance,
  managers, healthcare, school, job hunting, productivity). Sizes run from
  5-lesson sprints to a 33-lesson AI Foundations flagship.
- **Never publish which AI models or vendors power Iro's own features** — the
  coach, Image Lab and podcasts included. That is deliberate product policy.
- **Never claim Android.** iOS and web only; Android is in development with a
  waitlist. Saying a competitor has Android is fine and often true.
- **Never write "Kiro"** in published copy. Legacy internal name; it survives
  only in some asset filenames and in disambiguation copy that explains it.
- **Do NOT invent features that aren't in this list.**
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

## Product-truth open items (updated 2026-08-21)

Two of the three below are now closed. Kept rather than deleted, because the
history is what stops the old numbers coming back.

- **Custom Paths cap: SETTLED — 3 a day and 40 a month.** Alex confirmed the
  monthly figure on 2026-08-21. The app-repo brief's 20/month was wrong; his
  doubt about it was correct. Both numbers now publish together, since "3 a
  day" alone reads as ~90 a month and overstates it.
- **Lesson podcasts: SETTLED — live on iOS and the web.** Two hosts, Sam and
  Ava, roughly two to three minutes, Pro. Alex confirmed on 2026-08-21 that the
  App Store build is close enough to treat as live and asked that we not carry
  a qualifier we would only have to remove again. Every "in the web app, iOS
  shortly" hedge has been dropped.
- **Pro Pass: do not mention, ever.** A 3-day streak earns 48 hours of Pro.
  Real, verified in the app repo, and Alex's explicit decision is that it stays
  off the site — publishing "3-day streak = free Pro" invites gaming. Zero
  instances currently; keep it that way.

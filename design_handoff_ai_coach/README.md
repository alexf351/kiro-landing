# Handoff: "Ask Iro" AI Coach Module

## Overview
A marketing-site module for the Iro AI landing page that demonstrates Iro's **personal AI coach**. The left column is static copy + CTA; the right column is an animated, self-playing **chat card** that rotates through **5 short coaching sequences**. Each sequence shows the coaching loop: Iro asks a question → shows a weak prompt/scenario → the visitor taps one of 3 answer options → the choice **locks in** → Iro gives feedback → a compact "better version / next step / next practice" card appears. It then advances to the next sequence.

The goal of the module is to make a visitor feel, in ~10 seconds, that Iro teaches **AI judgment** across prompting, verification, tool choice, project planning, and learning from mistakes — not just prompt tweaking. There is intentionally **no XP / points / reward** language; tone is premium and coaching-led.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/vanilla JS** — a prototype showing the intended look and behavior. They are **not** meant to be dropped into production as-is. The task is to **recreate this module in the target codebase's existing environment** (React, Vue, Svelte, etc.) using its established component patterns, styling system, and conventions. If there is no front-end environment yet, pick the most appropriate framework and implement it there.

The included `coach.js` is plain DOM-manipulation code. In a component framework you'll likely re-express its state machine with the framework's state primitives (see **State Management** and **Interactions & Behavior**) rather than porting the DOM calls literally.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interaction timing are specified below and in `coach.css`. Recreate the visuals pixel-closely using the codebase's libraries, then wire the behavior to match.

## Files
- `coach-demo.html` — isolated, runnable reference. Open it in a browser to see the finished module. Scroll it into view to trigger the animation.
- `coach.css` — all styles for the module, plus the design tokens (`:root`) and the few shared primitives it depends on (`.pill`, `.btn`, `.btn-primary`). In the live site these live in the global `styles.css`; they're inlined here so the module renders standalone.
- `coach.js` — the interaction engine and the 5 sequences' content (the `SEQS` array).
- `assets/kiro-app-icon-256.png` — the Iro mascot avatar used in the chat header and on every coach message.

---

## Layout

The module is a `<section>` with vertical padding `clamp(90px, 12vh, 150px)` and a centered `.wrap` (max-width 1200px, 28px side padding).

Inside, `.coach-grid` is a 2-column CSS grid:
- `grid-template-columns: 1fr 1.04fr` (left copy / right chat), `gap: clamp(40px, 5vw, 76px)`, `align-items: center`, `max-width: 1080px`, centered.
- **≤ 900px:** collapses to a single column (`1fr`), `gap: 44px`, `max-width: 520px`, text-centered; the copy bullets stay left-aligned.

### Left column — `.coach-copy` (max-width 480px)
1. **Badge** `.pill.coach-pill` — text "Pro · New", with a pulsing accent dot.
2. **Heading** `.coach-h` — "Learn faster with your **personal AI coach**" (last phrase in accent color). `clamp(30px, 3.7vw, 48px)`, weight 800, letter-spacing −.035em, line-height 1.03.
3. **Sub** `.coach-sub` — "Ask Iro to explain mistakes, break down confusing concepts, and turn every lesson into guided practice." 16.5px, `--ink-2`, max-width 430px.
4. **Bullets** `.coach-pts` — 3 items, each a check icon (19px, accent) + text. Copy:
   - "Get the **why** behind every graded answer"
   - "Pop quizzes that adapt to where you're weak"
   - "Available the second a lesson trips you up"
5. **CTA** `.btn.btn-primary.btn-lg` — "Try Iro as your AI coach" → App Store link `https://apps.apple.com/app/id6759628066`.

### Right column — `.coach-stage` → `.coach-chat#coachChat`
A rounded chat card (radius 22px) over a soft accent glow (`.coach-stage::before`, a radial-gradient halo). The card has 3 stacked regions:

**Header `.cc-head`** (padding 14×17, bottom border `--line`):
- `.cc-ava` 40×40 avatar (radius 12) with `.cc-pulse` — an expanding accent ring (`ccPulse`, 2.6s infinite).
- `.cc-id`: name `<b>Iro</b>` (Geist 15.5px/700) + `.cc-status` "AI Coach · online" (JetBrains Mono 10px uppercase) with a green online dot `i` (#4ADE80, glow).
- `.cc-tag` "Pro" pill on the right (JetBrains Mono 9.5px uppercase, accent).

**Body `.cc-body#ccBody`** — **fixed height** `clamp(346px, 46vh, 448px)`, `overflow-y: auto`, flex column, `gap: 13px`, scrollbar hidden. This is the key to keeping the section height stable: messages stream and the body scrolls internally; the card never grows. Message types live here (see Components).

**Input `.cc-input`** (top border):
- `.cc-chips#ccChips` — suggested-reply chips (the "Next coaching tip →" advance control). Empty until offered.
- `.cc-field` — a **faux** input: placeholder text "Ask Iro anything" + a blinking caret `.cc-cur`, and a `.cc-send` button (36×36, accent gradient, arrow icon). It is decorative — there is no free-text entry; interaction is via chips and answer options.

---

## Components (inside the chat body)

All measurements are in `coach.css`. Exact hex/token values are in **Design Tokens**.

### Coach message — `.cc-row.coach`
Avatar (`.cc-mava` 30×30 radius 9) + bubble `.cc-bub`. Bubble: `--surface-2` fill, 1px `--line` border, radius 17 with `border-bottom-left-radius: 6px`, font 14.5px/1.5. `<b>` inside renders in accent. Row max-width 90%, left-aligned. Enters with `ccIn` (fade + 11px rise + slight scale, .44s).

### User message — `.cc-row.me`
Right-aligned, reversed row. Bubble is an **accent gradient** fill, `--accent-ink` text, weight 600, `border-bottom-right-radius: 6px`, soft accent shadow. (Used only if you add user-side turns; the current 5 sequences are coach-driven, so this style is available but not heavily used.)

### Typing indicator — `.cc-bub.cc-typing`
3 dots (7px) bouncing via `ccDot` (1.3s, staggered .18s/.36s). Shown in a coach row for the "type delay" before each coach message, then removed.

### Prompt / scenario card — `.cc-prompt` (inside `.cc-card`)
Aligned under coach bubbles via a 30px spacer `.cc-mava-sp` (so it lines up with bubble text, no avatar). Contains an uppercase mono label `.cc-prompt-lab` (e.g. "The prompt", "The scenario", "The goal", "The mistake") and the text `.cc-prompt-txt` in **JetBrains Mono 13.5px**. Subtle card: `rgba(255,255,255,.03)` fill, `--line` border, radius 15 / top-left 6.

### Answer options — `.cc-quiz` / `.cc-opt` (inside `.cc-card`)
A vertical stack (`gap: 8px`) of 3 buttons. Each `.cc-opt`: key letter `.k` (mono, accent, "A"/"B"/"C") + label `.t` (Outfit 14px). Full-width, radius 12, padding 11×13, `rgba(255,255,255,.03)` fill, `--line` border. **Min tap target height ≈ 44px** — keep it on mobile.
- **Hover (unlocked):** accent border + `rgba(accent,.08)` fill + `translateX(3px)`.
- **`.locked`:** cursor default, no hover (applied to all options once one is chosen).
- **`.correct`:** green border #4ADE80, `rgba(74,222,128,.13)` fill, `.k` green; a `.res` "✓" glyph is appended at the right.
- **`.wrong`:** red border #FF6B7A, `rgba(255,107,122,.11)` fill, `.k` red; a `.res` "✕" glyph appended.
- **`.dim`:** opacity .5 (applied to the non-selected, non-correct options so the chosen + correct stand out — **do not animate every option equally**).

### Before/After + Next-step card — `.cc-ba` (inside `.cc-card`)
A bordered card with one or two rows:
- Two-row variant (sequences with a `before`): `.cc-ba-row.before` (label "Before", muted `--ink-3` text, bottom divider) then `.cc-ba-row.after` (label "After" in accent, `rgba(accent,.07)` tinted background, brighter text).
- One-row variant (sequences with only an `afterLabel`): a single `.cc-ba-row.after` with a custom label ("Better ask", "Next step", "Next practice").

### Suggested chip — `.cc-chip` (in `.cc-input`)
Pill button, accent text on `rgba(accent,.08)`, 1px accent border, radius 100. Hover: brighter fill + `translateY(-1px)`. Used for the single advance control after each sequence: "Next coaching tip →" (or "Start over ↻" on the last one).

---

## Interactions & Behavior

The module plays automatically but is fully clickable. State machine (see `coach.js`):

1. **Trigger:** an `IntersectionObserver` (threshold 0.35) starts the sequence the first time the card scrolls into view. Before that, the static fallback thread (in markup) is shown.
2. **On start:** `#ccBody` is cleared; sequence `idx = 0` runs.
3. **Per sequence (`run()`):**
   a. Typing indicator (~1.05s) → coach posts the **question** (`seq.q`).
   b. ~0.25s → **prompt/scenario card** (`seq.card`).
   c. ~0.55s → **answer options** render.
   d. **User taps an option** (or, if idle ~5.2s, the engine auto-selects the correct one to keep the demo alive):
      - All options get `.locked`. The chosen one gets `.correct` (✓) or `.wrong` (✕); if wrong, the correct option is also marked `.correct`; the rest get `.dim`.
      - ~0.62s pause so the lock-in reads.
   e. If the pick was wrong, a short redirect message ("Not quite — the stronger move is **X**.") posts first.
   f. Typing → coach posts the **feedback** (`seq.feedback`).
   g. ~0.45s → the **before/after or next-step card** (`finalCard`).
   h. Typing → a short transition line ("That's the skill — ready for the next one?"; on the last sequence: "Keep practicing inside Iro — it runs this loop on every lesson.").
   i. A single chip is offered: "Next coaching tip →" (last: "Start over ↻"). Tapping it (or idle ~8s) advances.
4. **Advance:** `idx = (idx + 1) % 5`; body is cleared; next sequence runs. Loops indefinitely.

**Timing/easing:** message enter = `ccIn` .44s `cubic-bezier(.16,1,.3,1)`; typing dots `ccDot` 1.3s; avatar ring `ccPulse` 2.6s; caret blink `ccCaret` 1.1s; hover transforms .2s `cubic-bezier(.2,.8,.2,1)`.

**Auto-advance vs. interactive:** every timed auto-step (option auto-select, chip auto-advance) must be cancelable the moment the user clicks — clear the pending timer on any manual choice so the demo doesn't fight the user.

**Reduced motion:** if `prefers-reduced-motion: reduce`, `coach.js` returns early and the **static fallback thread** in the markup is shown (no animation, no rotation). Preserve this — render a representative complete sequence statically for reduced-motion / no-JS / SSR.

**Height stability:** never let the body grow the card. Keep `#ccBody` at the fixed clamp height with internal scroll; clear it between sequences rather than appending forever.

---

## State Management

Minimal. If reimplementing in a framework, model:
- `index` (0–4): which sequence is active.
- `started` (bool): whether the IntersectionObserver has fired.
- `messages` (ordered list): the rendered turns for the current sequence — each is one of `{kind: 'coach', html}`, `{kind: 'card', …}`, `{kind: 'quiz', options, answer, locked, picked}`, `{kind: 'before-after' | 'next-step', …}`.
- `answered` (bool, per quiz): locks options after first pick.
- A set of **pending timers** for the staged reveal + auto-advance, all cancelable.
- No data fetching. All content is static (the `SEQS` array). No persistence required.

---

## Content — the 5 sequences

Source of truth is the `SEQS` array in `coach.js`. Summary (correct option is **A** in 1, 2, 3, 4, 5):

**1 — Better Prompt** · label "The prompt"
- Q: "Quick check: what would improve this prompt most?"
- Card: "Make this landing page better."
- Options: A Add audience, goal, and constraints · B Make it longer · C Use more emojis
- Feedback: "Exactly. 'Better' is too vague. Strong prompts tell the AI who it's helping, what outcome matters, and what constraints to follow."
- Before/After → After: "Act as a conversion strategist. Rewrite this hero for busy founders. Keep it under 12 words and make the outcome specific."

**2 — Check the Output** · label "The scenario"
- Q: "The AI sounds confident, but you're not sure it's right. What should you ask next?"
- Card: "The model gave you a technical answer you might use in a real project."
- Options: A Explain assumptions and edge cases · B Make the answer shorter · C Add a catchier title
- Feedback: "Right. Confident output isn't the same as correct output. Ask the AI to expose its assumptions, failure cases, and what you should verify before using it."
- Better ask: "List your assumptions, possible failure cases, and the 3 things I should verify before I rely on this answer."

**3 — Pick the Right Tool** · label "The scenario"
- Q: "You need current market research. Which tool fits best?"
- Card: "You want recent opinions, links, and examples from the web."
- Options: A A web-connected research tool · B An offline chatbot only · C Ask for a motivational quote
- Feedback: "Exactly. The best AI workflow starts with choosing the right tool for the job. If the answer depends on fresh information, use something that can search or cite sources."
- Next step: "Ask: 'Search recent sources, summarize the strongest patterns, and link the evidence.'"

**4 — Break Down the Build** · label "The goal"
- Q: "You want to build an app with AI. What should you do first?"
- Card: "I want to build a habit tracker with AI coaching."
- Options: A Define the smallest working version · B Add every feature idea · C Start with the logo
- Feedback: "Correct. AI can generate a lot fast — but shipping starts with scope. Define the smallest version that proves the product works."
- Next step: "Break this into: core user action, required data, first screen, success metric, and one thing to test with real users."

**5 — Turn Mistakes Into Practice** · label "The mistake"
- Q: "You got the answer wrong. What should happen next?"
- Card: "You picked a prompt that was too broad."
- Options: A Turn the mistake into another practice rep · B Skip the concept · C Just reveal the answer
- Feedback: "Exactly. Mistakes are useful when they become targeted practice. Iro explains what went wrong, then gives you a sharper rep while the concept is fresh."
- Next practice: "Try this: rewrite 'Help me launch my app' with a clear audience, goal, and constraint."

---

## Design Tokens

```
/* Surfaces */
--bg:           #070A12
--surface-2:    rgba(255,255,255,.05)
--line:         rgba(255,255,255,.08)
--line-strong:  rgba(255,255,255,.14)
chat card fill: linear-gradient(180deg, rgba(14,19,32,.94), rgba(8,11,18,.97))

/* Ink */
--ink:   #F2F5FF
--ink-2: #9BA7C4
--ink-3: #616E8C

/* Accent (brand cyan) */
--accent:     #00E5FF
--accent-rgb: 0,229,255
--accent-ink: #04222B   (text on accent fills)

/* Semantic */
correct/online green: #4ADE80
wrong red:            #FF6B7A

/* Type */
display:  'Geist', sans-serif        (headings, names — 700/800)
body:     'Outfit', sans-serif       (copy, bubbles, options)
mono:     'JetBrains Mono', monospace (labels, status, prompt text, key letters)

/* Radii */
chat card 22 · bubbles 17 (one corner 6) · cards 15 (top-left 6) · options 12 · chips/pills 100 · send 10 · avatar 12 / small avatar 9

/* Easing */
--ease:     cubic-bezier(.2,.8,.2,1)
--ease-out: cubic-bezier(.16,1,.3,1)

/* Key animations */
ccIn .44s (message enter) · ccDot 1.3s (typing) · ccPulse 2.6s (avatar ring) · ccCaret 1.1s (caret) · pulse 2.2s (badge dot)

/* Layout */
container max-width 1200 (module grid capped at 1080) · side padding 28
chat body fixed height clamp(346px, 46vh, 448px), internal scroll
mobile breakpoint 900px (grid → 1 column)
```

## Assets
- `assets/kiro-app-icon-256.png` — the Iro mascot ("Kiro" the penguin) app icon, used as the chat avatar (header 40px, messages 30px). Use the equivalent brand asset already in your codebase if one exists.
- All other icons (check marks, send arrow) are **inline SVG** in the markup — no image files needed.
- Fonts load from Google Fonts (Geist, Outfit, JetBrains Mono). Swap to your app's font pipeline if it self-hosts.

## Notes for implementation
- The cyan accent is theme-able: everything keys off `--accent` / `--accent-rgb`. On the live site a tweak panel swaps this value at runtime — not required for production, but keep the accent as a single token so it stays easy to retheme.
- The faux input bar (`.cc-field`) is intentionally non-functional. If your product wants a real "ask" entry, that's a net-new feature — confirm scope before building it.
- Keep the section's no-gamification stance: no XP, points, streaks, or reward bursts in this marketing module.

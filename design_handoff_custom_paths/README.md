# Handoff: Custom Paths — “Not just AI. Learn anything.” (Assembly line)

## Overview
A redesigned marketing section for the Iro AI landing page (tryiro.com) that sells the **Custom Paths** Pro feature: *type any topic and Iro builds a complete, structured learning path in seconds — real lessons, a quiz, and a recap.*

The centerpiece is a **live demo**: the prompt input auto‑types a topic, Iro “generates,” and a path card assembles the lessons onto a glowing **connector spine**, finishing with a gold **recap card**. It loops through real topics. If the visitor clicks the input, the loop pauses and they can type their own topic. This mirrors the auto‑typing behaviour in the app’s onboarding and the in‑app **Create** tab.

This is the **“Assembly line”** direction — the one selected from a 3‑direction exploration (see *Related files*).

## About the design files
The files in this bundle are a **design reference built in plain HTML/CSS/vanilla JS** — a working prototype of the intended look, motion, and behaviour. They are **not** meant to be shipped verbatim. The task is to **recreate this section in the target codebase’s environment** using its established patterns (the live site is static HTML today; if it’s on React/Astro/Vue/etc., build a component there). If you keep the static‑HTML approach, these files can be adapted more directly, but should still be wired into the site’s real asset pipeline and data.

The section is authored to **reuse the existing Iro landing‑page design system** (same tokens, fonts, button/eyebrow styles as `styles.css`). In this bundle the tokens are scoped onto `.cp` so the file is self‑contained; **when integrating, delete the scoped token block and inherit the global `:root` tokens** from the site.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, motion and interactions are all specified below. Recreate faithfully.

---

## The section (one view)

**Name:** Custom Paths section (`#custom-paths`)
**Purpose:** Convert landing‑page visitors by showing that Iro turns *any* typed topic into a real, structured course — then drive an App Store download.
**Placement:** A full‑width section on the landing page. Recommended just after the hero / “Inside the app,” alongside the other feature sections. Separated from neighbours by the site’s `.divider` hairline.

### Layout
- Full‑width dark section. Vertical padding `clamp(72px, 10vh, 120px)`, horizontal `28px`.
- Inner content: `max-width: 1160px`, centered.
- **Two‑column CSS grid**, `grid-template-columns: 1fr 1.05fr`, `gap: 56px`, `align-items: center`.
  - **Left = copy column** (`max-width: 520px`, `position: relative`): eyebrow, headline (with mascot beside it), lead paragraph, 3‑step “how it works” row, topic chips, primary CTA.
  - **Right = demo column**: prompt input bar, hint line, generated path card.
- **Responsive:** at `≤880px` the grid collapses to a single column (`max-width: 560px`), and the mascot moves above the headline (centered).

### Components (left / copy column)

1. **Eyebrow** — `CUSTOM PATHS · PRO`
   - JetBrains Mono, 11px, weight 500, `letter-spacing: .26em`, uppercase.
   - “CUSTOM PATHS” in accent `#00E5FF`; leading 6px pulsing dot (accent, glow); the `·` at 40% opacity; “PRO” in gold `#FFD45A`.

2. **Headline** (`.cp-h`) — “**Not just AI.**” / “**Learn anything.**” (second line in accent)
   - Geist 800, `font-size: clamp(40px, 3.5vw, 56px)`, `line-height: 1.02`, `letter-spacing: -.035em`.
   - Line 1 color `#F2F5FF`; line 2 (“Learn anything.”) color `#00E5FF`. Hard `<br>` between lines.

3. **Typing mascot** (`.cp-mascot`) — the glossy penguin‑with‑laptop.
   - Positioned `position: absolute` inside the copy column, `top: 16px; right: -2px`, `width: 96px`, sitting **beside the headline**.
   - Soft float animation (`cpFloat`, 5.5s, ±7px / ±2°); drop shadow `0 10px 22px rgba(0,0,0,.55)` plus a faint accent glow. `pointer-events: none`.

4. **Lead** (`.cp-lead`) — “Type any topic and watch Iro assemble a full learning path — lessons, a quiz, and a recap — wired together in seconds.”
   - Outfit 400, 16.5px, `line-height: 1.6`, color `#9BA7C4`, `max-width: 440px`.

5. **“How it works” stepper** (`.cp-steps`) — single row, wraps gracefully:
   - `1  Name your topic  ›  2  Iro builds your path  ›  3  Learn 5 min a day`
   - Each number is a small accent **badge**: JetBrains Mono 11px/700, accent text, `background: rgba(0,229,255,.08)`, `border: 1px solid rgba(0,229,255,.3)`, `border-radius: 7px`, `padding: 4px 7px`.
   - Labels: Outfit 13.5px/600, color `#9BA7C4`. Separators: accent chevron (`›`), 14px, 50% opacity.

6. **Topic chips** (`.cp-chips`) — 8 pills: Public speaking · Personal finance · Negotiation · Learning guitar · Cooking basics · Getting in shape · Interview prep · Studying smarter.
   - Outfit 13.5px/500, color `#9BA7C4`; `background: rgba(255,255,255,.028)`, `border: 1px solid rgba(255,255,255,.08)`, `border-radius: 100px`, `padding: 8px 15px`.
   - Hover: lift 1px, text → ink, border/bg → accent tint.
   - **Active state** (`.on`, the topic currently showing): filled accent bg, `#04222B` text.
   - **Clicking a chip jumps the demo to that topic.**

7. **Primary CTA** (`.cp-cta`) — “Start learning anything →” → App Store (`https://apps.apple.com/app/id6759628066`).
   - Outfit 700, 16px; `padding: 16px 28px`; `border-radius: 14px`; accent gradient fill `linear-gradient(180deg, color-mix(in oklab, var(--accent), #fff 22%), var(--accent))`; `#04222B` text; layered glow shadow. Hover: lift 2px, stronger glow. (Identical to the site’s `.btn.btn-primary`.)

### Components (right / demo column)

8. **Prompt input bar** (`.cp-input`) — `background: rgba(255,255,255,.05)`, `border: 1px solid rgba(255,255,255,.14)`, `border-radius: 15px`, `padding: 12px 12px 12px 17px`.
   - Left: accent “sparkles/wand” icon (19px).
   - Middle: the auto‑typed topic (`.cp-type`, Outfit 15.5px, ink) + a blinking accent caret (`.cp-cur`, 2px×18px).
   - Right: round **send button** (`.cp-send`, 38px, `border-radius: 11px`, accent gradient, `#04222B` arrow icon, glow).
   - **Focused / editing state** (`.live`): accent border + `0 0 0 3px rgba(0,229,255,.12)` ring.

9. **Hint line** (`.cp-hint`) — JetBrains Mono 10.5px, uppercase, `letter-spacing: .1em`, color `#616E8C`. Default: `AUTO‑DEMO · click to try your own topic`. While editing: `↵ Press enter to build your path`. After submit: `✓ Built for you · demo resumes shortly`.

10. **Path card** (`.cp-path`) — `background: #0E1320`, `border: 1px solid rgba(255,255,255,.08)`, `border-radius: 18px`, `padding: 20px 22px`, shadow `0 20px 50px rgba(0,0,0,.35)`. Opacity transitions over 340ms.
    - **Header** (`.cp-path-head`): `YOUR PATH` (JetBrains Mono 11px/700, `.2em`, `#9BA7C4`) on the left; `5 LESSONS · QUIZ · RECAP` (JetBrains Mono 10px, accent) on the right.
    - **Lessons on a spine** (`.cp-lessons` → `.cp-lesson`): 5 rows, each a numbered node + title.
      - Node (`.cp-n`): 28×28, `border-radius: 9px` (rounded square), JetBrains Mono 12px/700 accent numeral, `border: 1.5px solid rgba(0,229,255,.45)`, `background: rgba(0,229,255,.07)`.
      - **Connector spine**: a 2px vertical gradient line (`rgba(0,229,255,.5) → rgba(0,229,255,.15)`) drawn from each node down to the next (`.cp-n::after`), so the lessons read as a wired build.
      - Title (`.cp-lt .t`): Outfit 15px/600, ink, `letter-spacing: -.01em`.
    - **Lesson‑1 preview** (`.cp-preview`, shown under the first lesson only): accent‑tinted panel (`background: rgba(0,229,255,.05)`, `border: 1px solid rgba(0,229,255,.16)`, `border-radius: 11px`). Contains a `LESSON PREVIEW` mono label (accent), a concept line (13.5px ink), and a “**Try it:** …” line (12.5px, `#9BA7C4`).
    - **Recap card** (`.cp-recap`): gold‑tinted row (`background: linear-gradient(180deg, rgba(255,212,90,.07), rgba(255,212,90,.02))`, `border: 1px solid rgba(255,212,90,.2)`, `border-radius: 13px`). Star icon in a gold rounded‑square tile + “**Recap card** · *your 90‑day growth plan*” (recap label in gold).

---

## Interactions & behaviour

- **Auto‑demo loop** (per section, starts when scrolled into view):
  1. On load the first topic’s path is shown fully (no empty state).
  2. Hold ~3.8s, then: clear input → **type** the next topic (~46ms/char, slight jitter, +90ms after spaces) → brief pause (320ms).
  3. **“Generating” pass**: path gets a `.gen` class → a soft accent gradient **scan** sweeps top→bottom (`cpScan`, ~1s) with a pulsing `Generating` label top‑right.
  4. **Reveal**: lessons fade/slide in one‑by‑one (185ms stagger), then the recap card.
  5. Hold, advance to the next topic, repeat (wraps around `CP.TOPICS`).
- **Type your own**: clicking the input (or send) pauses the loop, reveals a real text field, and shows the “press enter” hint. On submit, `CP.resolve(text)` maps the input to a path (keyword match to a known topic, else a generic 5‑lesson scaffold) and builds it. The loop auto‑resumes ~6.5s later. Escape/empty‑blur cancels.
- **Chips**: click → jump the demo straight to that topic; the matching chip shows the active (filled) state as topics cycle.
- **Start trigger**: `IntersectionObserver` at `threshold: 0.25` (with a 1.6s fallback timer). On a single‑section page this makes the animation begin when the section enters the viewport.
- **Reduced motion** (`prefers-reduced-motion: reduce`): typing, scan, float, caret blink and row transitions are disabled — topics render instantly.

## State
Per section instance (see `custom-paths.js`, `Controller`):
- `idx` — current topic index into `CP.TOPICS`.
- `paused` — true while the visitor is typing / just submitted.
- `editing` — true while the free‑text field is focused.
- `current` — the path object currently rendered.
- `timers[]` — pending `setTimeout`s, cleared on any interruption.

## Data to wire
- `paths-data.js` exposes `window.CP = { TOPICS, resolve(text), titleCase }`.
  - `TOPICS`: 10 topics, each `{ topic, recap, lessons: [{t, dur}], preview: {concept, exercise} }`. **These are editorial/mock content** — replace with real path‑generation output from the app’s backend/model. (`dur` is currently unused in this direction; durations were intentionally removed from the UI.)
  - `resolve(text)`: demo‑only keyword matcher standing in for real generation. In production, call the actual “build a custom path” endpoint and render its result into the same card structure.
- **CTA / deep links**: App Store URL is `https://apps.apple.com/app/id6759628066`.

## Design tokens
| Token | Value | Use |
|---|---|---|
| `--bg` | `#070A12` | section background |
| `--elev` | `#0E1320` | path card |
| `--surface` | `rgba(255,255,255,.028)` | chips |
| `--surface-2` | `rgba(255,255,255,.05)` | input bar |
| `--line` | `rgba(255,255,255,.08)` | hairline borders |
| `--line-strong` | `rgba(255,255,255,.14)` | input border |
| `--ink` | `#F2F5FF` | primary text |
| `--ink-2` | `#9BA7C4` | secondary text |
| `--ink-3` | `#616E8C` | muted/labels |
| `--accent` | `#00E5FF` (rgb `0,229,255`) | primary accent |
| `--accent-ink` | `#04222B` | text on accent fills |
| `--gold` | `#FFD45A` (rgb `255,212,90`) | recap card |
| radii | input 15 · card 18 · node 9 · recap 13 · chip 100 · CTA 14 (px) | |
| eases | `--ease cubic-bezier(.2,.8,.2,1)` · `--ease-out cubic-bezier(.16,1,.3,1)` | |
| motion | type 46ms/char · generate 950ms · reveal stagger 185ms · hold 3800ms · fade 340ms | |

**Type:** Geist (display 800), Outfit (body 400–700), JetBrains Mono (labels/eyebrows/numbers 500/700). No italics (brand rule). These are the same three families as the rest of the site.

## Assets
- `assets/typing-kiro.png` — the app’s “typing” mascot (glossy penguin with a laptop). **⚠️ This copy was extracted/cut out from an app screenshot for the mock, so its edges are soft/approximate. Replace it with the original transparent PNG/WebP mascot asset from the app** before shipping.
- Icons (sparkles/wand, arrows, chevron, star) are inline SVGs in the markup — no image files needed.

## Files in this bundle
- `custom-paths.html` — the section markup + a standalone demo page (dark bg, scroll spacers to show the scroll‑into‑view start).
- `custom-paths.css` — all styles + scoped design tokens (remove the scoped tokens when integrating and use the site’s global `:root`).
- `custom-paths.js` — vanilla engine: typing, generate/reveal, loop, type‑your‑own, chips, scroll trigger.
- `paths-data.js` — `window.CP` topic data + `resolve()` (mock; wire to real generation).
- `assets/typing-kiro.png` — mascot (replace with original).
- `screenshots/01-custom-paths.png` — full section. `screenshots/02-custom-paths.png` — path‑card detail.

## Related files (in the parent project)
- `Custom Paths Redesign.html` (+ `custompaths.css`, `cp-engine.js`, `cp-tweaks.js`, `cp-paths.js`) — the full **3‑direction exploration** on a pan/zoom canvas with a Tweaks panel (accent color / layout / path‑detail). Directions were: **A — Live build** (plain numbered list), **B — Assembly line** (this one), **C — Anything engine** (kinetic topic + horizontal card rail). Useful if you want to see the alternatives or the tweakable variants (e.g. “minimal / standard / expanded” path detail; two‑column / centered / full layouts).
- The chosen config shipped here: **Assembly line · expanded (lesson‑1 preview, no per‑lesson durations) · two‑column · cyan accent · mascot beside the headline.**

## Integration notes
1. Drop the `<section class="cp cp--b" id="custom-paths">…</section>` into the landing page between existing sections; remove the standalone demo’s scroll spacers and body background.
2. Delete the scoped `--*` token block at the top of `.cp` in the CSS and rely on the site’s global tokens (they match). Ensure Geist / Outfit / JetBrains Mono are loaded (they already are on the site).
3. Replace the mascot with the real transparent asset.
4. Swap the mock `paths-data.js` for real generated content; keep the same card structure so the animation/reveal code is unchanged.
5. Keep the App Store CTA link.

# Handoff: Reviews + AI Rank Assessment Section

## Overview
A single social-proof + conversion section for the Iro AI marketing site (dark, gamified, premium learning-app aesthetic). It does two jobs in one scroll:
1. **Reviews / social proof** — 4.7 App Store rating as the trust anchor, one featured quote, three mini review cards. Deliberately NOT pill-heavy: small-radius cards, low-contrast borders, restrained glow.
2. **AI Rank assessment CTA** — an in-app-style "sample skill profile" card next to quiz copy, framed as the logical next step after reading reviews ("okay, now find where you rank"). Replaces all earlier "AI IQ" framing.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Vue, plain templates, etc.) using its established patterns and libraries — or, if no environment exists yet, choose the most appropriate framework and implement it there. The CSS in `reviews-rank-quiz.html` is the exact production CSS from the live prototype (`index.html` in the parent project), so values can be lifted verbatim.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and shadows are final. Recreate pixel-perfectly.

## Copy (final — do not paraphrase)
- Eyebrow: `App Store reviews`
- Heading: `Loved by people building real AI skills.` (accent span on "building real AI skills.")
- Subheading: `Short daily lessons, practical prompts, and progress that makes AI feel less overwhelming.`
- Quiz kicker: `Rank assessment · Free · ~2 min`
- Quiz headline: `Find your AI rank in 2 minutes`
- Quiz supporting: `Answer a few quick questions and get a starting skill profile built around how you actually use AI.`
- Quiz CTA: `Get my AI rank` → links to `/quiz.html`
- Quiz subtext: `No signup required to see your result.`
- **Never** use "AI IQ" / "AI IQ score" language anywhere in this section.

## Layout

### Section shell (`#proof`)
- `padding: clamp(48px, 6.5vh, 76px) 0`, sits directly on the site background `#070A12` — **no section-level card, border, or fill**.
- Inner content capped at `max-width: 1080px`, centered (page `.wrap` is 1200px with 28px side padding).

### Row 1 — proof grid (`.proof-grid`)
- `display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(28px, 4.5vw, 60px); align-items: center; margin-bottom: clamp(14px, 2vh, 20px)`
- **Left (`.proof-intro`)**: eyebrow → heading → subheading → rating hero.
- **Right (`.review-feat`)**: featured review card.

### Rating hero (`.rating-hero`) — deliberately NOT a card
- Separated from copy above by a hairline: `margin-top: 26px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.08)`; `display: flex; align-items: center; gap: 20px`
- Score `4.7`: Geist 800, `clamp(54px, 5vw, 70px)`, `letter-spacing: -.04em`, `line-height: .95`, color `#F2F5FF`, subtle cyan glow `text-shadow: 0 0 60px rgba(0,229,255,.15)`
- Beside it (column, gap 7px): star row `★★★★★` in gold `#FFD45A`, 13.5px, `letter-spacing: 3px`, `text-shadow: 0 0 12px rgba(255,212,90,.35)`; label `Average rating` JetBrains Mono 10px uppercase `.14em` tracking, color `#616E8C`
- Accessibility: visually-hidden text "4.7 out of 5 average App Store rating"; decorative pieces `aria-hidden`.

### Featured review card (`.review-feat`)
- `padding: 26px 28px; border-radius: 8px; background: rgba(255,255,255,.028); border: 1px solid rgba(255,255,255,.08)`; flex column, `gap: 14px`
- `::before` overlay: `radial-gradient(120% 100% at 0% 0%, rgba(0,229,255,.04), transparent 55%)`
- Quote: Geist 700, `clamp(17px, 1.6vw, 21px)`, `line-height: 1.42`, `letter-spacing: -.015em`, color `#F2F5FF`, `text-wrap: pretty`. Use real curly quotes (&ldquo; &rdquo;).
- Footer row (flex, gap 10px, `padding-top: 6px`): avatar tile 26×26, `border-radius: 7px`, `background: linear-gradient(135deg, rgba(0,229,255,.4), rgba(0,229,255,.1))`, `border: 1px solid rgba(0,229,255,.24)`, initial in Geist 800 12px; name Outfit 700 13px; source `App Store review` JetBrains Mono 10px `#616E8C`.
- Hover: border-color → `rgba(0,229,255,.25)` (transition `border-color .3s`).

### Row 2 — mini reviews (`.review-minis`)
- `display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px`
- Each card (`.review-mini`): `padding: 18px 20px; border-radius: 8px; background: rgba(255,255,255,.028); border: 1px solid rgba(255,255,255,.08)`; flex column, `gap: 8px`
- Star row (`.rm-stars`): gold, 10px, `letter-spacing: 2.5px`, `text-shadow: 0 0 8px rgba(255,212,90,.3)`
- Quote: Outfit 500 13px, `line-height: 1.5`, color `#9BA7C4` (first card `.hl` uses `#F2F5FF` for emphasis; same border as the others)
- Source (`.rm-src`): JetBrains Mono 9.5px uppercase `.08em` tracking `#616E8C`, pinned to bottom via `margin-top: auto; padding-top: 4px`
- Hover: border-color → `rgba(0,229,255,.25)`

### Row 3 — rank assessment CTA (`.rankcta`)
- **No chunky wrapper**: sits on the page background, separated by a hairline — `margin: 64px auto 0; padding-top: 56px; border-top: 1px solid rgba(255,255,255,.08)`
- `display: grid; grid-template-columns: 1.12fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: center; max-width: 1080px`
- **Left (`.rankcta-copy`)**:
  - Kicker: 6px cyan glowing dot + `Rank assessment · Free · ~2 min`, JetBrains Mono 10.5px uppercase `.2em` tracking, cyan `#00E5FF`
  - H3: Geist 800, `clamp(24px, 2.9vw, 33px)`, `letter-spacing: -.03em`, `line-height: 1.08`, `margin: 14px 0 10px`
  - Paragraph: Outfit 15.5px, `line-height: 1.55`, `#9BA7C4`, `max-width: 430px`
  - Actions row (flex, gap 18px, wrap, `margin-top: 26px`): primary cyan button + note `No signup required to see your result.` (13px, `#616E8C`)
  - Button `.btn-primary.btn-lg`: `padding: 18px 32px; border-radius: 15px; font: Outfit 700 16.5px`; fill `linear-gradient(180deg, color-mix(in oklab, #00E5FF, #fff 22%), #00E5FF)`; text `#04222B`; `box-shadow: 0 10px 30px rgba(0,229,255,.25)`; hover lifts 2px and deepens shadow.
- **Right (`.rank-preview`)** — sample skill-profile card, `aria-hidden="true"` (decorative): the only surfaced element in this row. `padding: 22px 24px 24px; background: #0A0E18; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; box-shadow: 0 24px 60px rgba(0,0,0,.4), 0 0 40px rgba(0,229,255,.04)`; flex column, `gap: 18px`. Contents top-to-bottom:
  1. **Header** (`.rp-head`, space-between, `border-bottom: 1px solid rgba(255,255,255,.08)`, `padding-bottom: 14px`): `SKILL PROFILE` (mono 10px `#616E8C`) · `SAMPLE RESULT` (mono 9.5px cyan, `opacity: .85` — plain text, no badge box)
  2. **Rank row** (`.rp-rank`, flex gap 14px): gold gem tile 38×38, `border-radius: 8px`, `background: rgba(255,212,90,.07)`, `border: 1px solid rgba(255,212,90,.22)`, containing a 14×14 diamond (square rotated 45°, `border-radius: 3px`, `background: linear-gradient(135deg, #FFE9A8, #FFD45A 55%, #C9962B)`, glow `0 0 14px rgba(255,212,90,.5)`). Beside it: `Gold` (Geist 800 20px, **gold** `#FFD45A`) over `The Research Sniper` (Outfit 600 13px `#9BA7C4`).
  3. **Rank meter** (`.rp-meter`): 5px track (`rgba(255,255,255,.05)`, radius 3px) with cyan fill to **56%** (`linear-gradient(90deg, rgba(0,229,255,.35), #00E5FF)`) and a **gold** 11px dot at 56% (`box-shadow: 0 0 12px rgba(255,212,90,.6), 0 0 0 3px rgba(255,212,90,.18)`). Tick labels below (space-between, mono 8.5px uppercase `#616E8C`): Bronze · Silver · **Gold** (gold-colored, `.on`) · Platinum · Diamond.
  4. **Skill bars** (`.rp-skills`, column gap 11px). Each row: `grid-template-columns: 86px 1fr 26px; gap: 12px` — label (Outfit 600 12.5px `#9BA7C4`), 5px cyan bar (same gradient as meter), right-aligned score (mono 700 11px `#F2F5FF`). Values: Prompting 78 · Research 92 · Automation 22. The Automation row carries a flag `TRAIN THIS FIRST` (mono 9px uppercase cyan) on a full-width grid line below, indented `margin-left: 98px` to align with the bar (0 on mobile).

**Color discipline:** gold = achievement/rank signals only (stars, rank name, gem, meter dot, active tick). Cyan = action/progress energy (kicker, CTA, bars, meter fill, flag). Never swap them.

## Interactions & Behavior
- Review cards + featured card: border brightens to `rgba(0,229,255,.25)` on hover, `transition: border-color .3s`.
- CTA button: `translateY(-2px)` + shadow deepen on hover, `transition .25s cubic-bezier(.16,1,.3,1)`.
- **Skill-bar reveal**: bars are `width: 0` until the module scrolls into view, then animate to their value — `transition: width .9s cubic-bezier(.16,1,.3,1) .3s`. Production wires this to the site-wide IntersectionObserver "reveal" system (`.reveal` gets `.in` when intersecting); the reference file includes a minimal standalone equivalent. Important: the zero-width state is applied via `.rankcta.reveal:not(.in) .rp-bar i{width:0}` so bars are visible if JS never runs.
- Analytics (production site): clicks on `/quiz` links fire a PostHog `cta_clicked` event with `cta: 'quiz'` and a placement label — preserve if the target codebase has the same pattern.
- The whole section uses the site's scroll-reveal (fade/rise) on entry; match the host page's existing reveal behavior.

## Responsive (≤880px)
- `.proof-grid` → single column, gap 22px; rating score 50px.
- `.review-minis` → horizontal scroll-snap row bleeding to screen edges (`margin: 0 -28px; padding: 2px 28px 8px`), cards `min-width: 240px`, `gap: 12px`, hidden scrollbar.
- `.rankcta` → single column (copy first, preview card second), `gap: 28px; margin-top: 52px; padding-top: 44px`; CTA button goes full-width.
- Meter ticks: only Bronze, Gold (active), Diamond stay visible; flag loses its indent.

## State Management
None — the section is static apart from the one-shot in-view class for the bar animation. No data fetching; review quotes and the sample profile are hard-coded (the profile is an illustrative sample, matching the "Gold / The Research Sniper" build used elsewhere on the site).

## Design Tokens
- Backgrounds: page `#070A12`, card `#0A0E18` (`--bg-2`), surface `rgba(255,255,255,.028)`, surface-2 `rgba(255,255,255,.05)`
- Lines: `rgba(255,255,255,.08)` (default), `rgba(255,255,255,.14)` (strong — unused here by design)
- Ink: `#F2F5FF` / `#9BA7C4` / `#616E8C`
- Accent cyan: `#00E5FF` (rgb `0,229,255`), text-on-accent `#04222B`
- Gold: `#FFD45A` (rgb `255,212,90`)
- Radii: cards 8px, rank preview 10px, gem tile 8px, avatar 7px, bars/tracks 3px, button 15px
- Type: Geist (display/headings/quotes), Outfit (body/UI), JetBrains Mono (labels/meta) — Google Fonts
- Easing: `cubic-bezier(.16,1,.3,1)` (ease-out)

## Assets
None required — stars are unicode `★`, the gem is pure CSS, the avatar is a styled initial. Fonts load from Google Fonts.

## Files
- `reviews-rank-quiz.html` — standalone, self-contained reference with exact production CSS and markup (open in a browser)
- `screenshot-desktop.png` — desktop render, reviews area
- `screenshot-rank-module.png` — desktop render, rank assessment module
- Production source lives in the parent project's `index.html` (section `#proof`, inline styles under `/* PROOF */` and `/* ===== Rank assessment CTA ===== */`)

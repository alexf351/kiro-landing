# Handoff: App Store Reviews Section ("Proof")

## Overview
A compact, rating-first social-proof section for the Iro AI marketing site. It replaces a tall testimonial wall with a single tight section that communicates three things in one glance: the app has a strong App Store rating (4.7), people compare it to Duolingo for AI, and the learning is practical. It sits between the "Inside the app" showcase and the "Get certified" section on the landing page.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Vue, SwiftUI web views, plain templates, etc.) using its established patterns and libraries. If no environment exists yet, choose the most appropriate framework for the project and implement the design there.

- `reviews-section.html` — standalone, self-contained rendering of the section (exact markup + CSS, plus the site's design tokens and Google Fonts import). Open it in a browser to see the design live.
- `screenshots/desktop.png` — section at desktop width
- `screenshots/mobile.png` / `screenshots/mobile-minis.png` — mobile layout (stacked intro + featured card; second shot shows the horizontally scrolling mini-review row)

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final. Recreate pixel-perfectly, mapping values onto the codebase's token system where one exists.

## Layout

### Desktop (> 880px)
Two rows, both constrained to `max-width: 1080px`, centered, inside a page wrapper (`max-width: 1200px`, `padding: 0 28px`).

**Row 1 — `proof-grid`:** CSS grid, `grid-template-columns: 1fr 1.15fr`, `gap: clamp(28px, 4.5vw, 60px)`, `align-items: center`, bottom margin `clamp(10px, 1.6vh, 14px)`.
- **Left column (intro):** eyebrow label → headline → supporting line → rating hero block.
- **Right column:** featured review card.

**Row 2 — `review-minis`:** CSS grid, `repeat(3, 1fr)`, `gap: 10px`. Three small quote cards.

Section vertical padding: `clamp(48px, 6.5vh, 76px)` top and bottom (intentionally tighter than the site's default section padding of `clamp(90px,12vh,150px)` — do not use the default).

### Mobile (≤ 880px)
- `proof-grid` collapses to one column, `gap: 22px` (intro stack, then featured card).
- `review-minis` becomes a horizontal scroll row: `display: flex; overflow-x: auto`, negative margins `0 -28px` with matching `padding: 2px 28px 8px` so cards bleed to the viewport edge, `scroll-snap-type: x mandatory`, scrollbars hidden (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`). Each card: `min-width: 240px; flex-shrink: 0; scroll-snap-align: start`.
- Rating score drops to `font-size: 50px`.

## Components

### 1. Eyebrow label
- Text: `App Store reviews`
- JetBrains Mono 11.5px, weight 500, `letter-spacing: .28em`, uppercase, color `--accent` (#00E5FF)
- 22×1px accent-colored dash before the text (opacity .6), `gap: 10px`, inline-flex

### 2. Headline
- Text: `AI learning people actually finish.` — "actually finish." wrapped in an accent-colored span (#00E5FF)
- Geist, `font-size: clamp(24px, 2.6vw, 34px)`, weight 800, `line-height: 1.05`, `letter-spacing: -.03em`, color `--ink` (#F2F5FF), `margin-top: 12px`

### 3. Supporting line
- Text: `Practical lessons, hands-on exercises, and paths people actually finish.`
- Outfit 14px, `line-height: 1.5`, color `--ink-2` (#9BA7C4), `margin-top: 8px`, `max-width: 480px`

### 4. Rating hero (primary trust signal — deliberately NOT a card)
The 4.7 rating is the visual anchor of the section. It sits directly on the page background, separated from the copy above by a thin hairline — **no border box, no background fill, no card chrome.**
- Container: `display: flex; align-items: center; gap: 20px; margin-top: 26px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.08)`
- Score `4.7`: Geist, `font-size: clamp(54px, 5vw, 70px)`, weight 800, `letter-spacing: -.04em`, `line-height: .95`, color #F2F5FF, subtle cyan glow via `text-shadow: 0 0 60px rgba(0,229,255,.22)`
- Beside it, a vertical stack (`gap: 7px`):
  - Star row `★★★★★` (unicode stars): color `--gold` (#FFD45A), 15px, `letter-spacing: 3px`, `text-shadow: 0 0 14px rgba(255,212,90,.45)`
  - Label `Average rating`: JetBrains Mono 10px, `letter-spacing: .14em`, uppercase, color `--ink-3` (#616E8C)

### 5. Featured review card
- Container: `padding: 24px 26px; border-radius: 8px; background: rgba(255,255,255,.028); border: 1px solid rgba(0,229,255,.16); overflow: hidden`
- `::before` overlay: `radial-gradient(120% 100% at 0% 0%, rgba(0,229,255,.05), transparent 55%)` (very subtle cyan wash from top-left)
- Flex column, `gap: 14px`
- Quote (verbatim App Store review, keep the surrounding typographic quotes): `"I thought I already understood how to utilize AI tools, but this made me realize I was leaving a lot on the table. Iro taught me how to use AI more effectively for both work and personal use."`
  - Geist, `font-size: clamp(17px, 1.6vw, 21px)`, weight 700, `letter-spacing: -.015em`, `line-height: 1.42`, color #F2F5FF, `text-wrap: pretty`
- Footer row (`gap: 10px`, `margin-top: auto`, `padding-top: 6px`):
  - Avatar: 26×26px, `border-radius: 7px`, letter `A`, Geist 12px/800, background `linear-gradient(135deg, rgba(0,229,255,.5), rgba(0,229,255,.14))`, border `1px solid rgba(0,229,255,.3)`
  - Name `abrjav`: Outfit 13px, weight 700, `letter-spacing: -.01em`, #F2F5FF
  - Source `App Store review`: JetBrains Mono 10px, `letter-spacing: .06em`, #616E8C
- Hover: border-color → `rgba(0,229,255,.3)` (transition `border-color .3s`)
- No star row on this card — stars appear only once, in the rating hero.

### 6. Mini review cards (×3)
- Container: `padding: 12px 16px; border-radius: 8px; background: rgba(255,255,255,.028); border: 1px solid rgba(255,255,255,.08)`; flex column, `justify-content: center; gap: 6px`; hover border → `rgba(0,229,255,.3)`
- Quote: Outfit 13px, weight 500, `line-height: 1.45`, color #9BA7C4, `text-wrap: pretty`
- Attribution: JetBrains Mono 9.5px, `letter-spacing: .08em`, uppercase, #616E8C
- Content, in order (order matters — Duolingo quote must be first / most visible):
  1. **Highlighted** (`hl` modifier — quote text in #F2F5FF instead of #9BA7C4, border `rgba(0,229,255,.18)`):
     `"It's like Duolingo for learning AI. If you are in for AI and prompting then look no further."` — `Pradyot · App Store`
     ⚠️ Note: this quote's first sentence is a marketing paraphrase; the reviewer's verbatim opening was "This is really a great app like Duolingo." Confirm with the owner which to ship.
  2. `"Easy to use and includes a lot of new information even I, a frequent AI user, found helpful."` — `michael · App Store`
  3. `"Great app! Very helpful with engaging learning exercises geared to specific goals."` — `Jmf275 · App Store`

## Interactions & Behavior
- **Hover:** featured card and mini cards animate border-color to `rgba(0,229,255,.3)` over 300ms. No transform/lift.
- **Scroll reveal:** on the production site, `proof-grid` and `review-minis` carry a `reveal` class (with `data-d="1"` stagger on the minis) — a site-wide IntersectionObserver fades/slides them in on first view. Recreate with the codebase's existing scroll-reveal mechanism, or omit; the section must look correct without JS.
- **Mobile minis:** native horizontal scroll with x-mandatory snap; no arrows, no pagination dots, hidden scrollbars.
- No other JS, state, or data fetching. Content is static.

## State Management
None required. Purely presentational.

## Design Tokens
```css
--bg:        #070A12;                    /* page background */
--surface:   rgba(255,255,255,.028);     /* card fill */
--line:      rgba(255,255,255,.08);      /* hairline borders / divider */
--ink:       #F2F5FF;                    /* primary text */
--ink-2:     #9BA7C4;                    /* secondary text */
--ink-3:     #616E8C;                    /* tertiary / labels */
--accent:    #00E5FF;  /* rgb(0,229,255) — cyan brand accent */
--gold:      #FFD45A;  /* rgb(255,212,90) — star rating color */
```
- Radius: **8px** on all cards (7px on the tiny avatar). Do not exceed 8px — intentionally slimmer than the site's default 18px radius.
- Spacing: card padding 24/26px (featured) and 12/16px (minis); grid gaps 10px (cards) and clamp(28–60px) (intro↔featured).
- Type stack: **Geist** (display/quotes/score), **Outfit** (body), **JetBrains Mono** (labels/attributions). Loaded from Google Fonts:
  `https://fonts.googleapis.com/css2?family=Geist:wght@400..900&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap`

## Assets
None. Stars are unicode `★` characters; the avatar is a CSS-styled letter. No images or icon files.

## Files
- `reviews-section.html` — standalone reference (exact markup + CSS). Also contains a `body.force-mobile` helper class used only for the mobile screenshot — ignore it.
- `screenshots/desktop.png`, `screenshots/mobile.png`, `screenshots/mobile-minis.png`
- In the source project, the section lives in `Iro AI.html` (`<section id="proof">`, lines ~215–255) and `styles.css` (the `PROOF` block, lines ~505–548), with tokens in the `:root` at the top of `styles.css`.

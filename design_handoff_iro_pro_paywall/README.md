# Handoff: Iro Pro Paywall Section (Website)

## Overview
A full-width "Iro Pro" upgrade/paywall band for the Iro AI marketing site (tryiro.com). It translates the in-app gold Iro Pro paywall to web: deep-navy starfield background, warm gold radial glow, gold mascot as the emotional anchor, five benefit bullets, and a single gold pill CTA ("Try 7 days free"). On the homepage it sits between the AI IQ Test section and the Pricing section. **No pricing appears in this section by design** — price disclosure happens in the native purchase sheet.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Next.js, etc.) using its established patterns and component libraries. If no web codebase exists yet, choose the most appropriate framework and implement it there. `paywall-section.html` is fully self-contained (open it in a browser) and is the source of truth.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, copy, and interactions are final. Recreate pixel-perfectly.

## Screens / Views

### Iro Pro paywall band (`section#pro`)
- **Purpose**: Drive free-trial intent for Iro Pro without price comparison.
- **Layout (desktop ≥881px)**:
  - Full-bleed band `.pro-band`: background `#070B15`, 1px top/bottom hairlines `rgba(255,255,255,.05)`, vertical padding `clamp(76px,10vh,128px)`.
  - Inner `.wrap`: max-width 1180px, 24px side padding.
  - Two-column CSS grid `.pro-grid`: `grid-template-columns:.92fr 1.08fr`, gap `clamp(36px,5vw,80px)`, `align-items:center`. Visual left, copy right.
- **Layout (mobile ≤880px)**: single column, mascot stage first, copy block centered (`text-align:center`, max-width 520px, margin auto), benefits left-aligned inside a centered 360px column, CTA full-width (max 380px).

#### Components
1. **Band atmosphere** (two pseudo-layers on `.pro-band`):
   - `::before` warm glows: `radial-gradient(42% 58% at 26% 46%, rgba(255,206,74,.1), transparent 66%)` + `radial-gradient(50% 40% at 62% -12%, rgba(255,206,74,.06), transparent 60%)`.
   - `::after` starfield: 8 tiny white radial-gradient dots (1–1.5px, alpha .3–.5) at fixed percentages, whole layer at opacity .5. See HTML for exact positions.
2. **Mascot stage** (`.pro-stage`, min-height 380px desktop):
   - `.pro-glow`: circle `min(420px,92%)`, `radial-gradient(circle, rgba(255,206,74,.2), rgba(255,206,74,.05) 46%, transparent 68%)`, `blur(14px)` — grounding glow behind mascot.
   - `.pro-rays`: static SVG sunburst, 12 radial lines in a 400×400 viewBox, stroke `rgba(255,206,74,.3)`, width 1.5, round caps; sized `min(430px,100%)`, opacity .85.
   - `.pro-mascot`: `assets/gold-kiro.webp`, width `clamp(190px,21vw,258px)`; `filter: drop-shadow(0 26px 46px rgba(0,0,0,.55)) drop-shadow(0 0 34px rgba(255,206,74,.28))`; floats ±14px over 6s ease-in-out (see `float` keyframes).
   - Two 4-point gold sparkles (`.pro-spark`, fill `#FFCE4A`): 16px at top 18% / right 24%, 11px at bottom 20% / left 22%; twinkle 3.4s (opacity .25→.85, scale .7→1), second one delayed 1.7s.
3. **Badge** (`.pro-badge`): "IRO PRO" uppercase, 12px / 800 / letter-spacing .18em, color `#FFCE4A`; pill `rgba(255,206,74,.08)` bg, 1px border `rgba(255,206,74,.26)`, padding 7px 15px, radius 999px; leading 7px gold dot with `0 0 8px rgba(255,206,74,.8)` glow. Margin-bottom 20px.
4. **Headline** (`.pro-h`): "Unlock your **AI fluency plan**" — h2, `clamp(32px,4.2vw,52px)`, weight 800, letter-spacing -.025em, line-height 1.04, white `#F5F8FF`; "AI fluency plan" in gold `#FFCE4A`. Margin-bottom 16px.
5. **Supporting line** (`.pro-sub`): "Build real AI skills faster with guided lessons, smarter practice, and progress that adapts to you." — `clamp(16px,1.5vw,18.5px)`, color `#AAB4D4`, max-width 480px, `text-wrap:pretty`, margin-bottom 28px.
6. **Benefits** (`.pro-benefits`): single-column list, gap 14px, max-width 440px, margin-bottom 36px. Each `<li>`: flex, gap 12px, 15.5px / 600, white, line-height 1.35. Check icon: 22px stroked circle-check SVG (stroke-width 2), color `#FFCE4A`, `filter: drop-shadow(0 0 6px rgba(255,206,74,.45))`, margin-top -1px. Exact copy:
   - Custom AI learning paths for your goals
   - Ask Iro for guidance anytime
   - Unlimited practice on real workplace skills
   - Advanced prompts, drills, and workflows
   - Progress, streaks, and XP rewards
7. **CTA** (`.pro-cta`): "Try 7 days free" — `<a>` to the App Store listing (`https://apps.apple.com/app/id6759628066`). Pill radius 999px, padding 19px 46px, 18px / 800, text `#2b1e00`, background `linear-gradient(180deg, #FFDD70, #F8C63A)`, shadow `0 5px 0 #E0A81F, 0 14px 40px rgba(255,206,74,.26)`. **No subtext and no pricing under the button.**

## Interactions & Behavior
- CTA hover: `filter:brightness(1.05)`; active/press: `translateY(4px)` with shadow collapsing to `0 1px 0 #E0A81F, 0 6px 18px rgba(255,206,74,.2)` (Duolingo-style pressable). Transition: transform/box-shadow .08s ease, filter .2s ease.
- Mascot idle float: 6s ease-in-out infinite, translateY 0 → -14px → 0.
- Sparkles twinkle: 3.4s ease-in-out infinite; respect `prefers-reduced-motion` in production (disable float/twinkle).
- On the homepage, the stage and copy blocks use scroll-reveal (fade/slide-in) consistent with the rest of the site; optional.
- Responsive breakpoint at 880px (see Layout above).

## State Management
None — static marketing section. CTA is a plain link (App Store on iOS; can be swapped for a smart link/web-app URL per platform).

## Design Tokens
- Colors: band bg `#070B15`; page bg `#0A0E1A`; ink `#F5F8FF`; ink-2 `#AAB4D4`; ink-3 `#7A85A3`; gold `#FFCE4A`; gold-deep (shadow edge) `#E0A81F`; CTA gradient `#FFDD70 → #F8C63A`; CTA text `#2b1e00`; hairline `rgba(255,255,255,.05)`; gold-rgb base for alphas `255,206,74`. Cyan (`#00E5FF`) is the site-wide accent but is deliberately **absent** here — gold is the Pro signal.
- Type: Outfit (Google Fonts), weights 400/600/700/800. Headline clamp 32–52px; sub 16–18.5px; benefits 15.5px; badge 12px; CTA 18px.
- Spacing: section pad clamp(76–128px); column gap clamp(36–80px); benefit gap 14px; badge→h2 20px; h2→sub 16px; sub→list 28px; list→CTA 36px.
- Radii: pills 999px. Shadows/glows: as listed per component.

## Assets
- `assets/gold-kiro.webp` — gold Iro mascot render (from the Iro asset library; also used in the in-app paywall). Transparent background.
- Check, sparkle, and sunburst-ray SVGs are inline in the HTML (copy verbatim).

## Files
- `paywall-section.html` — self-contained design reference (open in a browser; resize under 880px for mobile).
- `assets/gold-kiro.webp` — mascot image referenced by the HTML.
- `screenshots/desktop.png`, `screenshots/mobile.png` — rendered reference captures.
- In the full site prototype, this section lives in `Iro Homepage Redesign.html` (`section#pro`) with styles in `iro-redesign.css` under "IRO PRO PAYWALL".

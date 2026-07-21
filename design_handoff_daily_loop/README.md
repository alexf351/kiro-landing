# Handoff: Iro — "The Daily Loop" section

## Overview
A homepage section for Iro (iOS app for learning AI skills) that presents the core habit mechanic as a 5-step "training circuit": pick a path → 5-minute lesson → practice with prompts → earn XP & keep a streak → rank up. Steps are game-like pressable icon tiles on a curved glowing rail, with a dashed return arc communicating "run it again tomorrow." Ends in one primary CTA.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior, not production code to ship directly. Recreate this design in your target codebase's existing environment (React, Vue, plain templates, etc.) using its established patterns. If no web codebase exists yet, the standalone HTML here is close enough to adapt directly.

## Fidelity
**High-fidelity.** Colors, typography, spacing, shadows, and motion are final. Recreate pixel-perfectly.

## Files
- `Daily Loop Section.html` — self-contained standalone reference (markup + all CSS + reveal JS). This is the source of truth.
- `Daily Loop Section -mobile preview-.html` — same section with the ≤860px layout force-applied at 400px width, for quick visual reference only. Real implementation uses the media query, not this file.
- `screenshots/daily-loop-desktop.png`, `screenshots/daily-loop-mobile.png`

The section also lives in context in the full-page prototype (`Iro Homepage Redesign.html` + `iro-redesign.css` + `iro-redesign.js` at the project root, section `#how`) — not included here; the standalone file is identical.

## Design Tokens
Surfaces: `--bg #0A0E1A`, `--card #141A2B`, lines `rgba(255,255,255,.08 / .14)`
Ink: primary `#F5F8FF`, secondary `#AAB4D4`, tertiary `#7A85A3`
Accent (learning/energy): cyan `#00E5FF`, pressed-edge `#00B7D4`, text-on-cyan `#052733`
Gold (XP/rewards only): `#FFCE4A`, pressed-edge `#E0A81F`, text-on-gold `#2b1e00`
Fonts: **Outfit** (all text; weights 400–900) + **JetBrains Mono 700** (micro-labels only)
Easing: `cubic-bezier(.2,.8,.2,1)`. Container max-width 1180px, 24px side padding. Section padding `clamp(72px,10vh,132px)` vertical.

## Layout (desktop, >860px)
- **Header** (centered, max 720px): plain-text label `THE DAILY LOOP` (JetBrains Mono 11.5px/700, letter-spacing .2em, uppercase, `#7A85A3` — deliberately NOT a pill), headline `Build AI skill in one daily rep` (clamp 32–56px, weight 800, "one daily rep" in cyan), supporting line 16–19px `#AAB4D4`, max 540px.
- **Circuit** (`.loop2`, max 1060px): 5-column grid of steps over an absolutely-positioned SVG rail (viewBox `0 0 1000 170`, `preserveAspectRatio:none`, height 170px).
  - **Main rail**: quadratic curve `M100 96 Q 500 142 900 96`, 2.5px stroke, cyan→gold gradient (gold starts ~58%), draws in on reveal (dashoffset 1→0, 1.6s, .4s delay, uses `pathLength="1"` + `vector-effect:non-scaling-stroke`).
  - **Return arc**: two dashed paths arcing over the top (`M900 60 C 880 16,700 12,610 12` and `M390 12 C 300 12,120 16,100 60`) + small arrowhead at step 1; `rgba(255,255,255,.24)` 1.5px, dash `5 8` animating (`stroke-dashoffset:-13` per 2.8s, linear, infinite). Centered in the gap: `⟳ RUN IT AGAIN TOMORROW` label (mono 10.5px, letter-spacing .15em, `#7A85A3`), gold refresh icon rotating 360° per 7s.
  - **Steps** sit on the curve via per-step `translateY` offsets: 0 / 17 / 23 / 17 / 0 px.
- **Step anatomy** (no pills, no card backplates):
  - **Node**: 64×64, radius 20px, centered 28×28 stroke icon (stroke-width 2.2). Steps 1–3 cyan: gradient `#54EEFF→#00C8E4`, icon color `#052733`, shadow `0 5px 0 #0090A9` (pressed 3D edge) + `0 0 0 6px rgba(cyan,.08)` halo + `0 14px 32px rgba(cyan,.16)`. Steps 4–5 gold: gradient `#FFDD70→#F5C33B`, icon `#2b1e00`, edge `#BE8E1C`, gold halos. Hover: node lifts −4px, edge grows to 9px, halos brighten (.25s ease).
  - **Number chip**: 22×22, radius 8px, top −9/right −9, bg `#0A0E1A`, 1px border `rgba(255,255,255,.14)`, 11px/800 `#AAB4D4`.
  - **Text**: title 17px/800 (16px above→6px below), body 13.5px `#AAB4D4` line-height 1.45, max-width ~190px, centered.
- **Icons** (24×24 stroke, round caps/joins): 1 flag, 2 open book, 3 pencil, 4 flame, 5 trophy.
- **CTA block**: centered column, gap 14px, margin-top `clamp(46px,6vh,68px)`. Primary button `Start your first 5-minute rep` (Duolingo-style pressable: cyan bg, dark text 18px/800, radius 18px, padding 19×32, `0 5px 0 #00B7D4` edge; :active translates down 4px and edge collapses to 1px; :hover brightness 1.06 — keep text color pinned, do not let global link hover recolor it). Below: `Then come back tomorrow and run it again.` 13.5px `#7A85A3`.

## Copy (exact)
Label `THE DAILY LOOP` · H2 `Build AI skill in one daily rep` · Sub `Iro turns learning AI into a simple loop: choose your path, practice for a few minutes, and level up as your skills improve.`
1 `Pick your path` / `Choose the AI skill you want to build.`
2 `Take a 5-minute lesson` / `Learn one concept without getting overwhelmed.`
3 `Practice with prompts` / `Apply it through real workplace-style exercises.`
4 `Earn XP & keep your streak` / `Build momentum every time you show up.`
5 `Rank up your skills` / `Watch your AI fluency grow over time.`
CTA `Start your first 5-minute rep` (links to App Store id6759628066) · note `Then come back tomorrow and run it again.`
Content rule: **no stat badges** on steps (removed by design). If exercise counts appear elsewhere on the site, the current number is **16 exercise types** (not 13).

## Motion (all CSS-only, everything stays stationary — no carousel/revolving)
1. **Rail draw-in** on scroll reveal (see above).
2. **Traveling glow**: duplicate main path, stroke gradient, 5px, `blur(3px)`, `stroke-dasharray:.1 1.2`; 12s linear infinite (2s initial delay): dashoffset `.1 → −1` over 0–80% of the cycle with opacity fading in 0–4% and out 72–80%; rests 20%.
3. **Sequential node pulse**: `::before` ring on each node — box-shadow spread 0→16px fading over the first 11% of a 12s cycle; staggered delays 0 / 2.4 / 4.8 / 7.2 / 9.6s (+2s base) so one step pulses at a time in loop order, roughly tracking the glow. Cyan ring `rgba(0,229,255,.45)`, gold steps `rgba(255,206,74,.4)`. Desktop only.
4. **XP sparkles** on step 4: three 8px gold 8-point stars (clip-path) around the node at offsets (−25,−12) (30,−20 @ .7 scale) (24,18 @ .55 scale); each twinkles opacity 0→.85→0 with slight rise + 95° rotation, 4.8s ease-in-out, staggered 0/1.6/3.1s.
5. **Section reveal**: opacity 0 + translateY(22px) → in view (IntersectionObserver, threshold .12, rootMargin −8% bottom), .7s, stagger .08s per `data-d`.
6. **Reduced motion**: `prefers-reduced-motion` kills ALL animations; glow overlay and sparkles default to `opacity:0` so they vanish entirely; reveals render visible immediately.

## Responsive (≤860px)
- SVG rail hidden. Steps become a vertical list (max 420px, centered, 26px gap): node 54×54 (radius 17, icon 24px) left, text left-aligned right.
- Connector: 2px vertical gradient line between nodes (`left:26px`, from node bottom to next), cyan fading; transitions cyan→gold between steps 3→4, gold after.
- Pulse rings off; sparkles remain. "Run it again tomorrow" label becomes static centered text (order: currently renders above step 1 — acceptable, or move below the list in implementation).
- No per-step translateY offsets on mobile.

## Accessibility
- Steps are an `<ol>` (semantic order). SVG rail is `aria-hidden`. CTA is a real link. Icon-only meaning is duplicated by titles. Honor reduced motion as above.

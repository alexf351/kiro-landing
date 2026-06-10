# Handoff: Iro AI — Landing Page Redesign

## Overview
A complete redesign of the Iro AI marketing landing page (tryiro.com). Iro is an iOS app, "the Duolingo for AI": 5-minute daily lessons that teach people to use ChatGPT, Claude, Gemini, Perplexity, AI agents, automation and more, with XP, ranks, duels, and a skill-scan. The single goal of the page is **App Store downloads**.

The redesign replaced a long (~12-section) page with a tight, premium, dark "HUD/cyber" experience whose centerpiece is an **interactive Skill Universe** in the hero.

## About the Design Files
The files in this bundle are **design references built in HTML/CSS/vanilla JS** — a working prototype showing the intended look, motion, and behavior. They are **not** meant to be shipped verbatim. The task is to **recreate these designs in the target codebase's environment** (the live site is static HTML; if it moves to React/Vue/Astro/etc., use that framework's established patterns and component model). If the static-HTML approach is kept, these files can be adapted more directly, but should still be integrated into the site's real build/asset pipeline.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion, and interactions are all specified. Recreate pixel-faithfully. Everything is responsive (breakpoints noted below).

---

## Design Tokens

All tokens are CSS custom properties defined in `styles.css` under `:root`.

### Colors
| Token | Value | Use |
|---|---|---|
| `--bg` | `#070A12` | page background |
| `--bg-2` | `#0A0E18` | alt surface |
| `--elev` | `#0E1320` | elevated surface |
| `--surface` | `rgba(255,255,255,.028)` | card background |
| `--surface-2` | `rgba(255,255,255,.05)` | raised card bg |
| `--line` | `rgba(255,255,255,.08)` | hairline borders |
| `--line-strong` | `rgba(255,255,255,.14)` | stronger borders |
| `--ink` | `#F2F5FF` | primary text |
| `--ink-2` | `#9BA7C4` | secondary text |
| `--ink-3` | `#616E8C` | tertiary/muted text |
| `--accent` | `#00E5FF` (cyan) | primary accent (TWEAKABLE) |
| `--accent-rgb` | `0,229,255` | accent as rgb triple |
| `--accent-ink` | `#04222B` | text on accent fills |
| `--gold` | `#FFD45A` | secondary accent (ratings, certificate, gold rank) |
| `--gold-rgb` | `255,212,90` | |

### Skill signature colors (Skill Universe nodes)
Each of the 6 skills owns a fixed color (in `skilltree.js` `NODES[].color`):
- Strategy `#9B8CFF` (violet) · Research `#3DDBFF` (cyan) · Prompting `#FFC940` (gold) · Execution `#FF9D4D` (amber) · Automation `#5B9DFF` (blue) · Writing `#C78BF0` (orchid)

### Rank tier colors (`skilltree.js` `RANK_TIERS`)
bronze `#E89A4F` · silver `#D5DAE2` · gold `#FFC940` · platinum `#A3F5E5` · diamond `#9FD8FF` · iridescent `#C8B8FF` (each also has a `deep` shade + `glow` rgba for the gem gradient).

### Typography
- Display/headings: **Geist** (800/900 weights), letter-spacing -0.02 to -0.04em
- Body: **Outfit** (400–700)
- Labels/mono/eyebrows: **JetBrains Mono** (500/700), letter-spacing .14–.22em, uppercase
- Loaded via Google Fonts. NO italics anywhere (brand rule). The certificate is a flat image (see Assets).
- Type scale: headings use `clamp()` (e.g. hero h1 `clamp(38px,5.4vw,70px)`); body 15–16px; eyebrows 11px; never below ~10px.

### Spacing / radius / motion
- Section vertical padding: `clamp(90px,12vh,150px)`
- Card radius 14–20px; pills 100px; `--radius: 18px`
- Eases: `--ease: cubic-bezier(.2,.8,.2,1)`, `--ease-out: cubic-bezier(.16,1,.3,1)`
- Max content width `--maxw: 1200px`; section inner widths vary (noted per section)

---

## Page Structure (section order)
1. **Nav** (fixed, blur-on-scroll)
2. **Hero = Skill Universe** (`<header class="hero hero-uni" id="top">`)
3. **Inside the app** (`#showcase`) — interactive phone + daily-loop cards
4. **Proof** (`#proof`) — rating stat + real App Store reviews
5. **Get certified** (`#certs`) — certificate image
6. **Pricing** (`#pricing`) — 3 cards
7. **FAQ** (`#faq`) — accordion
8. **Final CTA** (`.final`) — App Store button + Android email capture
9. **Footer** — brand, links, socials

Sections are separated by `.divider` hairlines. All major blocks use a `.reveal` class that fades/translates in on scroll via IntersectionObserver (`app.js`), staggered with `data-d="1..5"`.

---

## Sections in detail

### 1. Nav (`<nav id="nav">`)
- Fixed, height 62px, `backdrop-filter: blur(18px)`, transparent until scrolled >12px then gains bottom border + darker bg (`.scrolled` toggled in `app.js`).
- Left: brand = app icon (30px, radius 9px) + "**Iro AI**" (Geist 700, 18px).
- Right (`.nav-links`): "AI IQ Test" (accent-colored, `--accent`, → `/quiz.html`), "Inside the app" (#showcase), "Skill scan" (#paths), "Pricing" (#pricing), "FAQ" (#faq), then primary button "Get the app" (→ App Store URL `https://apps.apple.com/app/id6759628066`).
- Text links hide below 760px (mobile shows only logo + Get the app).

### 2. Hero — Skill Universe (THE centerpiece) — `skilltree.js`
A radial, interactive "AI Rank Scan / Operator Build". Layout is a centered column: copy on top, universe below, CTA below that (controlled by `data-herocta="below"` on `<html>`).

**Top copy (`.hero-lead`):** pill "iOS · Free to start"; h1 "**Master AI.**" / "**Train like it's a game.**" (2nd line in accent); subhead; (see `.hero-actions` for CTA — rendered *below* the universe by default).

**The universe (`#buildCanvas`, built entirely in `skilltree.js`):**
- A central **mascot** (penguin, `assets/gold-kiro.webp` by default) with a pulsing colored aura + ring.
- **6 skill nodes** orbiting at fixed hexagonal angles (Strategy 0°/top, Research 60°, Prompting 120°, Execution 180°, Automation 240°, Writing 300°), each a glass tile showing emoji + score + label, colored by its signature color. Strongest node gets ↑ badge, weakest gets ↓ badge.
- **18 path nodes** branching further out (3 per skill, fanned ±15°), each a tile with the path's real icon (tool logos for ChatGPT/Claude/Gemini/Perplexity/Midjourney; emoji for the rest).
- **SVG connectors**: rings + spokes (center→skill) + branches (skill→path), each colored by skill; faint at rest, bright when that skill is active.
- **Energy particles**: small glowing dots flow outward along every spoke and branch (SVG SMIL `<animate>`; 24 total, ~2.8–5s travel; respects `prefers-reduced-motion`).
- **Interaction**: hover/click a skill node (or its path nodes) → that skill's branch + paths light up, and a caption below (`#uniCap`) shows the skill name, score/100, tier label (Bronze…Iridescent only — never "Wood"), a one-line description, and its 3 path chips. Defaults to the weak spot (Automation).
- **Rank ladder (`#rankSwitch`)**: a vertical gem strip docked top-left under the rank badge. 6 gems (Iridescent at top → Bronze at bottom) with a gradient "spine". Clicking a rank **morphs the entire build**: swaps the central mascot image (`assets/{bronze|silver|gold|platinum|diamond|iridescent}-kiro.webp`), recolors the gem + aura, and updates all 6 skill scores + strongest/weak flags to that rank's profile (see `BUILDS` object). Names shown on hover. Default rank = **gold**.
- **Rank badge (`.uni-rank`)**: gold heraldic gem (drawn as SVG in `buildGem()`) + "Operator Build" eyebrow + rank name (`#uniRank`) + archetype (`#uniArch`, e.g. "The Research Sniper").

> The example scores/archetypes per rank live in `BUILDS` in `skilltree.js` and are illustrative — wire to real scan data when available. The skill→path grouping is an **editorial mapping** (the app has no fixed path-to-skill table); confirm/adjust in `NODES`.

**`.hero-actions`** (below universe): App Store button (`.btn-primary`, with Apple logo + "Download on the App Store"), ghost "See it in action" (→ #showcase), and trust row (★★★★★ "4.7 on the App Store" · "345 lessons across 18 paths"). A `data-herocta="above|below"` attribute on `<html>` flips this block above/below the universe (default `below`).

### 3. Inside the app (`#showcase`) — `showcase.js`
Two columns. **Left**: an iPhone mockup (`.device.ia-phone`) showing one app screen (`#iaImg`), with a control row beneath = round prev arrow + 7 progress dots (active = elongated accent pill, `#iaDots`) + next arrow, then a "Tap through the app" hint. **Right** (`.ia-right`, top-aligned): a caption (`#iaCaption`) showing eyebrow `NN / 07 · NAME`, headline, description, 3 check-bullets, and a tag pill — all swapping per screen; and BELOW it a **2×2 "Daily loop"** card grid (`.loop-row`): 01 Learn a skill (5 min) · 02 Practice for real (13 types) · 03 Earn XP & streaks (daily) · 04 Rank up (6 ranks).
- 7 screens defined in `showcase.js` `SCREENS[]` (img, title, headline, description, tag, 3 bullets). Images are in `screens/` (cropped from App Store marketing shots — see Assets).
- Interactions: arrows, clickable dots, swipe on the phone, and gentle auto-advance (4.6s) that pauses on hover and stops permanently after any manual interaction; only runs while section is in view. Phone screen crossfades on change.
- Device frame (`.device`) is pure CSS (bezel gradient, notch `.island`, glare overlay).

### 4. Proof (`#proof`)
- Centered header "People keep coming back."
- Stat row (`.proof-top`): **4.7** App Store rating (★★★★★) · count-up "2,075+" hands-on exercises · count-up "18" learning paths. Count-ups animate when scrolled into view (`app.js`, `[data-count]`).
- **Reviews** = featured layout (`.reviews-feat`, grid 1.45fr/1fr): one big card left (abrjav, "Surprisingly helpful", 5★) + two stacked cards right (michael19583173 "Helpful app"; Jmf275 "Great app!"). These are **real App Store reviews**. Each card: avatar initial tile, username, "App Store · United States", gold stars, quote (NOT italic), and a mono review-title chip.

### 5. Get certified (`#certs`)
Two columns. Left: gold "GET CERTIFIED" eyebrow, headline "Finish a path. Earn a shareable certificate.", paragraph, 3 gold check-bullets (verified certificate / one-tap LinkedIn / unique credential ID), primary CTA "Start earning yours". Right: the **real certificate image** (`assets/certificate.png`, 3360×2400) with a green "VERIFIED" pill above it and a subtle 3D tilt (`rotateX(6deg) rotateY(-6deg)`) that eases flatter on hover.

### 6. Pricing (`#pricing`)
3 cards (`.price-grid`, `repeat(3,1fr)`, max 1040px):
- **Free** — $0 forever; 54 free lessons · 5 duels · 3 hearts · Beginner prompt library; ghost "Download free".
- **Pro Weekly** — $9.99/week; "Billed weekly, no commitment"; full Pro feature list; ghost "Get Pro Weekly".
- **Pro Yearly** (highlighted `.pro` — cyan ring + glow + "Best value · save 90%" badge) — **$0.96/week**; "Billed $49.99/year. Starts with a 7-day free trial."; full Pro feature list; primary "Start 7-day free trial".
- Pro features (both): Everything in Free + All 345 lessons across 18 paths · Prompt Lab with AI grading · Full prompt library · Unlimited duels & hearts.
- Stacks to 1 column ≤860px.

### 7. FAQ (`#faq`)
Accordion, 5 items (`.faq-item`, only one open at a time, max-height transition; logic in `app.js`): Is Iro free? · Do I need AI experience? · How is this different from tutorials? · How long does each lesson take? · What AI topics does Iro cover? (Plus/minus icon drawn with CSS pseudo-elements.)

### 8. Final CTA (`.final`)
Centered: iridescent mascot, h2 "Train your AI fluency like it is a game.", subline, App Store button, then an **Android band** (`.android`): "Android coming soon. Get notified the day it drops." + email capture form (`#notifyForm` → on valid submit, hides form and shows `#notifyDone` confirmation; logic in `app.js`). Radial accent glow behind.

### 9. Footer
`.foot-top`: brand (icon + "Iro AI") · link list · **social icons** (Instagram, TikTok, YouTube, X, LinkedIn — inline SVGs, links to instagram.com/tryiro, tiktok.com/@tryiro, youtube.com/@tryiro, x.com/tryiro, linkedin.com/company/tryiro). `.foot-bottom`: "© 2026 Iro AI · Master AI. Stay ahead."

---

## Interactions & Behavior summary
- **Scroll reveals** — `.reveal` → `.in` via IntersectionObserver, staggered by `data-d`.
- **Nav** — `.scrolled` after 12px.
- **Hero universe** — hover/click skills + path nodes; rank ladder morphs build; pointer parallax is NOT used here (it was on the old phone hero). Particles via SMIL.
- **Inside-the-app carousel** — arrows / dots / swipe / auto-advance; crossfade.
- **Count-up stats**, **FAQ accordion**, **Android notify form**, **pricing** (static 3-card, no toggle).
- **Tweaks panel** (`tweaks.js`) — a dev/preview-only floating panel (hidden unless host activates it) to flip accent color, background pattern (grid/dots/plain), motion (full/calm), and hero CTA position (above/below). This is a prototyping aid; it can be dropped in production or kept behind a flag.
- **Reduced motion** — particles and looping animations disabled under `prefers-reduced-motion`.

## State / data to wire
- Skill scan scores + archetype + rank (currently mocked in `BUILDS`/`NODES`).
- App screen set for the carousel (`SCREENS`).
- Reviews (currently 3 real ones hardcoded).
- Pricing values + App Store product/deep links per plan.
- Android email capture → real endpoint (currently client-only confirmation).
- Certificate → currently a static image; swap for dynamic when available.

## Assets (in `assets/` and `screens/`)
- Mascots: `bronze-kiro.webp`, `silver-kiro.webp`, `gold-kiro.webp`, `platinum-kiro.webp`, `diamond-kiro.webp`, `iridescent-kiro.webp`
- Tool logos: `chatgpt.png`, `claude.png`, `gemini.png`, `perplexity.png`, `midjourney.png`
- App icon: `kiro-app-icon-256.png`; favicon `favicon-64.png`
- Certificate: `certificate.png` (real, 3360×2400)
- `screens/01-prompt-lab.png` … `08-ranks.png` — app screenshots cropped to screen-only from the App Store marketing shots. For production, re-export from the **full-res originals** and serve with `srcset` (current crops are from the 660px webp set, fine for preview, light for retina).

## Files in this bundle
- `Iro AI.html` — markup for the whole page
- `styles.css` — all styles + design tokens
- `skilltree.js` — the Skill Universe engine (nodes, paths, particles, rank morph, gem SVG)
- `showcase.js` — the "Inside the app" interactive phone
- `app.js` — nav scroll, scroll reveals, count-ups, FAQ accordion, Android notify form
- `tweaks.js` — preview-only Tweaks panel (optional)
- `assets/`, `screens/` — images

## Notes / open items
- Skill→path mapping and per-rank example scores are editorial; confirm against real data.
- Rating is set to **4.7** (US App Store) per the client; if a global average is shown elsewhere, label it.
- No italic fonts anywhere; keep that rule.
- The page targets AI-curious professionals / career-minded learners; copy tone is confident and plain, no hype.

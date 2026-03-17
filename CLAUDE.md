# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kiro is a static marketing website and interactive quiz for an AI learning app ("The Duolingo for AI"). It consists of static HTML files with inline CSS and vanilla JavaScript, ready to deploy to any static host.

## Development

There are no build, test, or lint commands. To develop locally, serve the files with any static HTTP server (e.g., `npx serve .` or `python -m http.server`). Keep the `assets/` folder alongside the HTML files.

## Architecture

**Pages:**
- `index.html` — Landing page (hero, gameplay showcase, rank progression, social proof, FAQ accordion)
- `quiz.html` — AI IQ Test interactive quiz with client-side state machine (intro → quiz → results)
- `privacy.html` / `terms.html` — Legal pages

**All CSS and JavaScript are inlined** in each HTML file. There are no external stylesheets or script files.

### Design System (CSS variables in `:root`)
- Dark theme with cyan (#00E5FF) accent color
- Fonts: "Outfit" (body), "JetBrains Mono" (numbers/monospace) via Google Fonts
- Responsive breakpoints: 1024px, 768px, 480px

### Quiz Engine (`quiz.html`)
- 3 rotating quiz sets of 10 questions each (30 total), selected randomly per session
- Answer options are shuffled to prevent positional bias
- Each question has: text, 4 options, correct index, difficulty (easy/medium/hard), topic, and educational nudge
- Streak counter with animated feedback words ("Nice!", "On fire!", "Genius!")
- Results map scores to rank tiers (Bronze 0-3, Silver 4-5, Gold 6-7, Platinum 8-9, Diamond 10)
- Identifies weakest topic and recommends a learning path
- Supports `?score=X` URL parameter for friend challenge mode

### Analytics
- PostHog integration tracks: quiz_started, quiz_answer (with question/topic/difficulty), quiz_completed, quiz_shared

### Assets
All images are served locally from the `assets/` folder via relative paths (e.g., `src="assets/diamond-kiro.png"`). Nothing is pulled from a CDN or external image host. The folder contains:
- Mascot images for 6 rank tiers (bronze, silver, gold, platinum, diamond, iridescent)
- App icon in multiple sizes (256, 512, favicon, apple-touch-icon)
- 6 app screenshots used in the gameplay showcase (named `01-node-map-...`, `02-hero-...`, etc.)

OG/Twitter meta images use the absolute URL `https://www.trykiro.app/assets/...` for social preview cards.

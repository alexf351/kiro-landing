# Kiro Website Improvements — Combined Master List

## Tier 1 — Critical (Do First)

### 1. Add email/lead capture
- No way to re-engage visitors who don't download immediately — 100% are lost
- Add email capture on quiz results page ("Get your full AI skills report")
- Add "Android coming soon — join the waitlist" for non-iOS users
- Collect name to personalize CTA: "Sarah, your AI learning path is ready" (+17% conversion per onboarding research)

### 2. Optimize images
- Total assets ~14MB. Individual screenshots 1-1.9MB each as uncompressed PNGs at 1320x2868
- Convert all images to WebP
- Serve at actual display size (~400px mobile, ~700px tablet) using `srcset` and `<picture>`
- Could cut payload by 80%, saving 5-10 seconds on mobile load

### 3. Fix CTA strategy
- Add mid-page CTAs after gameplay screenshots and rank progression sections (peak engagement, zero CTAs)
- Add "Cancel anytime" text under every CTA button
- Test "$0" instead of "Free" (Duolingo data shows "$0" outperforms "free")
- Make all CTA copy consistent across the page (currently varies between buttons)
- Pass UTM parameters through App Store links for PostHog attribution tracking

### 4. Replace anonymous testimonials with real social proof
- "Beta tester, Product Manager" reads as fabricated
- Use real names, photos, and App Store reviews
- Add a user/download count in the first viewport: "Join 10,000+ learners"
- Display App Store rating near CTAs: "Rated 4.8 stars"

### 5. Address iOS-only gap
- ~50% of visitors may be Android users who hit App Store and bounce
- Add clear "Currently on iOS. Android coming soon" messaging
- Turn this dead-end into a lead with email capture

---

## Tier 2 — Important (High Impact)

### 6. Upgrade the quiz page as primary growth lever
- Treat it as a primary conversion tool, not a side feature
- Rewrite intro headline using TikTok hook format: "The AI question 90% of professionals get wrong"
- Make results page screenshot-worthy (rank badge + score + mascot designed for social sharing)
- Tease next lesson on results: "Your next lesson: Prompt Engineering Basics" (Zeigarnik Effect)
- Add native share buttons (LinkedIn, X, WhatsApp) — not just clipboard copy
- Embed a mini-quiz question directly on the landing page with "Take the full quiz" CTA

### 7. Rewrite hero copy — outcome-first, not feature-first
- Current subheadline lists 4 features. Lead with one outcome instead
- Research suggests: "Build AI fluency in 5 minutes a day" or "The people who learn AI now will run the future"
- Let features emerge in sections below, not the hero

### 8. Fix "unreplaceable"
- Not a real word. Appears in H1, footer, meta tags
- Fix to "irreplaceable" or make the wordplay clearly intentional with stylization

### 9. Improve pricing transparency
- Page says "Free" 4+ times, then reveals $70/year in small text at bottom — feels like bait-and-switch
- Add "Free to start. Pro from $0.19/day" earlier on the page
- Frame annual as "$5.83/month" with "SAVE 55%" badge
- Add trial timeline: "Today: Full access → Day 5: Reminder → Day 7: $5.83/mo"
- Consider a lifetime tier ($79-99) as anchor price

### 10. Show concrete content numbers prominently
- "27 paths, 167 lessons, 1,012 exercises, 8 exercise types, 6 rank tiers"
- These signal depth. No competitor matches it. Currently buried or absent from the page

---

## Tier 3 — Valuable Refinements

### 11. Add a "Before & After" transformation section
- "Week 1: What is a prompt? → Week 4: Building AI workflows"
- Mirrors high-converting TikTok format, works as scroll narrative
- Answers "what will I actually be able to DO?"

### 12. Make "How It Works" concrete
- Current version is generic ("Pick a path → Learn → Level up")
- Show a specific example: "Day 1: Learn prompting. Day 3: Write your first prompt. Day 7: Automate a real task"

### 13. Embed a video demo
- Even a simple screen recording GIF of completing a lesson outperforms static screenshots
- UGC research says talking-head + screen recording is the #1 ad format
- Landing page should mirror the TikTok ad experience for visitors arriving from social

### 14. Animate the mascot
- Mascot is the #1 untapped marketing asset per multiple research files
- Animated paywalls produce 2.9x higher conversion
- Even subtle idle animation or rank-up celebration would add life

### 15. Reframe "Built solo in 2 weeks"
- Currently reads as "side project"
- Reposition: "The founder used the AI skills Kiro teaches to build the entire app solo — Kiro is its own proof"

### 16. Add mini personalization to landing page
- "Why do you want to learn AI?" with 3-4 clickable options
- Customize the hero message based on selection
- Mirrors in-app onboarding commitment bias

### 17. Display streak stat
- "Users who reach a 7-day streak are 3.6x more likely to complete their course"
- Sells the streak mechanic with data rather than description

### 18. Fix accessibility issues
- `--text3: #4A5370` fails WCAG AA (~2.7:1 contrast). Bump to `#7A849E`+
- Add `<main>` landmark and skip-nav link
- Add `aria-hidden="true"` to decorative emojis
- Improve alt text on screenshots (currently generic like "Node Map")

### 19. Trim Google Fonts
- Loading 9 weights, using ~5. Reduce to `wght@400;600;700;800;900` for Outfit, `wght@700` for JetBrains Mono

### 20. Add JSON-LD structured data
- `SoftwareApplication` schema for better Google search appearance (rating, price, category in SERP)

### 21. Verify pricing matches RevenueCat
- Integrations research flagged discrepancy between README product IDs and actual code
- Ensure landing page shows $12.99/mo and $69.99/yr accurately

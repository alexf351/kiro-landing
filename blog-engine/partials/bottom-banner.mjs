// One bottom-of-page download banner, shared by the blog generator and the
// hand-written landing pages. The HTML fragment is identical everywhere; the
// only thing that changes is the headline, chosen from the page's variant.
//
// Buttons carry no script of their own. /consent.js sends the existing
// cta_clicked event (cta: app_store | web_app, placement: "bottom-banner")
// for any App Store / app.tryiro.com link inside .iro-banner, and only after
// the visitor has accepted, because PostHog is never loaded before that.

export const BANNER_SUB =
  'Free every day · no card · iPhone and any browser · ★ 4.7 on the App Store (43 ratings)';

// Verified 2026-10-08 on the US App Store (apps.apple.com/us/app/id6759628066):
// 4.7 from 43 ratings. Do not change the number without re-checking.

const HEADLINES = {
  switch: 'Still want to get good at AI? Start free, with no trial trap.',
  habit: 'Keep a streak that actually makes you better at AI.',
  tool: 'Get fluent in the tools you already use, in 5 minutes a day.',
  prompt: 'Write prompts that work the first time, in 5 minutes a day.',
  default: 'Get genuinely good at ChatGPT, Claude and Gemini, in 5 minutes a day.',
};

export function bannerVariant(slug) {
  if (/(^|-)(cancel|alternatives)(-|$)/.test(slug) || /(^|-)vs(-|$)/.test(slug)) return 'switch';
  if (slug.includes('duolingo') || slug.includes('microlearning')) return 'habit';
  if (/^(learn|how-to-use)-/.test(slug)) return 'tool';
  if (slug.includes('prompt')) return 'prompt';
  return 'default';
}

// slug is the page slug used as the utm_campaign, matching the other CTAs.
export function bottomBanner({ variant = 'default', slug, image = '/assets/screens/learning-path.webp' } = {}) {
  const headline = HEADLINES[variant] || HEADLINES.default;
  const campaign = encodeURIComponent(slug);
  const store = `https://apps.apple.com/app/id6759628066?utm_source=blog&utm_medium=bottom_banner&utm_campaign=${campaign}`;
  const web = `https://app.tryiro.com/?utm_source=blog&utm_medium=bottom_banner&utm_campaign=${campaign}`;
  return `<aside class="iro-banner" data-variant="${variant}">
<img class="iro-banner-shot" src="${image}" alt="The Iro AI learning path on an iPhone" width="900" height="1951" loading="lazy" decoding="async"/>
<div class="iro-banner-copy">
<p class="iro-banner-h">${headline}</p>
<p class="iro-banner-sub">${BANNER_SUB}</p>
<div class="cta-row">
<a class="btn" data-placement="bottom-banner" href="${store}">Download on the App Store</a>
<a class="btn secondary" data-placement="bottom-banner" href="${web}">Start free in your browser</a>
</div>
</div>
</aside>`;
}

#!/usr/bin/env node
// Iro AI — path-library engine. JSON in, indexable path/use-case/tool pages out.
//
//   node blog-engine/build-paths.mjs
//
// Reads:  blog-engine/content/paths/*.json   (one file per path page)
//         blog-engine/content/paths-hub.json  (the /paths library hub config)
//         blog-engine/lib/site.config.json    (global brand/site config)
//
// Writes: <slug>.html                          (root-level path pages)
//         paths.html                            (the library hub)
//         sitemap.xml                           (refreshes a marked block)
//         llms.txt                              (refreshes a marked block)
//
// Every page ships with a TL;DR answer block, a real "inside the path" lesson
// breakdown, a sample practice exercise, an FAQ, tight internal links, a strong
// "Practice this in Iro" CTA, and Course + LearningResource + FAQ + Breadcrumb
// + Article JSON-LD — GEO-ready by construction. Zero dependencies; Node 18+.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(__dirname, 'content');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/site.config.json'), 'utf8'));
const D = cfg.domain; // https://tryiro.com
const APP = cfg.appStoreUrl;
const APPID = cfg.appStoreId;

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => (/^https?:/.test(p) ? p : D + p);
const url = (slug) => `${D}/${slug}`;
// Compact Python-style JSON-LD (", " / ": " separators) to match existing pages.
function jsonld(v) {
  if (v === null) return 'null';
  const t = typeof v;
  if (t === 'number' || t === 'boolean') return String(v);
  if (t === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(jsonld).join(', ') + ']';
  return '{' + Object.entries(v).map(([k, val]) => JSON.stringify(k) + ': ' + jsonld(val)).join(', ') + '}';
}

const CTA_UTM = (slug, placement) =>
  `${APP}?utm_source=seo_page&utm_medium=website&utm_campaign=${slug}${placement ? '&utm_content=' + placement : ''}`;

// ---------- shared chrome ----------
const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com"/>' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>' +
  '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400..900&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>';

const POSTHOG = `<script>
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_WkvD7IaVmxRJFXWpiu5MkabZL1iQZpPmDTvMmQTkXkc',{api_host:'https://us.i.posthog.com',person_profiles:'identified_only'});
</script>`;

// Base CSS lifted verbatim from the existing path pages, plus path-library components.
const CSS = `*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#0A0E1A;color:#fff;line-height:1.7}a{color:#00E5FF;text-decoration:none}a:hover{text-decoration:underline}.page{min-height:100vh;background:radial-gradient(circle at 20% 0%,rgba(0,229,255,.16),transparent 34rem),radial-gradient(circle at 80% 10%,rgba(255,215,0,.08),transparent 30rem),#0A0E1A}.nav{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px clamp(20px,5vw,64px);background:rgba(10,14,26,.82);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.06)}.brand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:900}.brand img{width:32px;height:32px;border-radius:9px}.nav-links{display:flex;gap:16px;flex-wrap:wrap;font-size:.95rem}.nav-links a{color:#C9D2EA}.hero,.content,.faq,.related{max-width:1120px;margin:0 auto;padding:clamp(44px,7vw,88px) clamp(20px,5vw,36px)}.eyebrow{color:#00E5FF;text-transform:uppercase;letter-spacing:.14em;font-size:.8rem;font-weight:900;margin:0 0 14px}.hero h1{font-size:clamp(2.5rem,7vw,5.6rem);line-height:.95;letter-spacing:-.06em;margin:0 0 22px}.hero p{max-width:760px;color:#C9D2EA;font-size:clamp(1.08rem,2.2vw,1.32rem);margin:0 0 28px}.cta-row{display:flex;gap:14px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:14px 22px;font-weight:900;border:1px solid rgba(0,229,255,.35);background:linear-gradient(135deg,#00E5FF,#00B4D8);color:#06111c;box-shadow:0 10px 32px rgba(0,229,255,.18)}.btn.secondary{background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.16);box-shadow:none}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin:34px 0}.card{background:rgba(20,27,45,.82);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:24px}.card h3{margin:0 0 10px;font-size:1.22rem}.card p,.card li{color:#B6C0DA}.content{padding-top:24px}.content h2,.faq h2,.related h2{font-size:clamp(1.8rem,4vw,3rem);line-height:1.05;letter-spacing:-.035em;margin:0 0 18px}.content p,.content li,.faq p{color:#CFD6EA}.content section{margin:0 0 42px}.two-col{display:grid;grid-template-columns:1.1fr .9fr;gap:24px}.faq details{background:rgba(20,27,45,.82);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px 20px;margin:12px 0}.faq summary{font-weight:900;cursor:pointer}.footer{padding:34px clamp(20px,5vw,64px);border-top:1px solid rgba(255,255,255,.08);color:#8B95B0}.footer nav{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px}.footer a{color:#C9D2EA}.note{font-size:.95rem;color:#8B95B0}.pill-list{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0}.pill{border:1px solid rgba(0,229,255,.25);background:rgba(0,229,255,.06);border-radius:999px;padding:8px 12px;color:#CFF8FF;font-weight:800;font-size:.92rem}
/* ---- path-library additions ---- */
.crumb{max-width:1120px;margin:0 auto;padding:16px clamp(20px,5vw,36px) 0;font-size:.82rem;color:#8B95B0}.crumb a{color:#A9B4D0}.crumb span{color:#6b7590;margin:0 8px}
.answer{max-width:1120px;margin:0 auto;padding:8px clamp(20px,5vw,36px)}.answer .box{background:linear-gradient(135deg,rgba(0,229,255,.08),rgba(0,229,255,.02));border:1px solid rgba(0,229,255,.22);border-radius:22px;padding:24px 26px}.answer .lbl{color:#00E5FF;text-transform:uppercase;letter-spacing:.14em;font-size:.72rem;font-weight:900;margin:0 0 10px}.answer p{margin:0 0 14px;color:#E6ECFA;font-size:1.08rem}.answer ul{margin:0;padding-left:20px;color:#CFD6EA}.answer li{margin:6px 0}
.outcomes{list-style:none;padding:0;margin:14px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:12px}.outcomes li{position:relative;padding-left:30px;color:#DCE3F4}.outcomes li::before{content:"✓";position:absolute;left:0;top:0;color:#06111c;background:#00E5FF;width:20px;height:20px;border-radius:6px;display:grid;place-items:center;font-size:.72rem;font-weight:900}
.lessons{list-style:none;margin:16px 0 0;padding:0;counter-reset:l}.lesson{display:flex;gap:16px;align-items:flex-start;background:rgba(20,27,45,.6);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px 18px;margin:10px 0}.lesson .n{counter-increment:l;flex:0 0 auto;width:30px;height:30px;border-radius:9px;background:rgba(0,229,255,.12);border:1px solid rgba(0,229,255,.3);color:#00E5FF;font-weight:900;display:grid;place-items:center;font-family:'JetBrains Mono',monospace}.lesson .n::before{content:counter(l)}.lesson h3{margin:0 0 4px;font-size:1.06rem}.lesson .dur{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:#8B95B0;font-weight:700}.lesson p{margin:6px 0 0;color:#AEB8D2;font-size:.96rem}
.practice{background:linear-gradient(135deg,rgba(20,27,45,.95),rgba(12,17,30,.95));border:1px solid rgba(0,229,255,.22);border-radius:24px;padding:26px;margin:16px 0 0;box-shadow:0 20px 60px rgba(0,0,0,.35)}.practice .tag{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:#00E5FF;font-weight:800;margin:0 0 14px}.practice .scenario{color:#E6ECFA;font-size:1.06rem;margin:0 0 16px}.practice .task{color:#CFD6EA;margin:0 0 16px}.practice .opts{list-style:none;padding:0;margin:0 0 8px;display:grid;gap:8px}.practice .opts li{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:11px 14px;color:#CFD6EA}.practice .opts li.correct{border-color:rgba(0,229,255,.55);background:rgba(0,229,255,.08);color:#EAFBFF;font-weight:700}.practice details{margin-top:14px;background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.2);border-radius:14px;padding:14px 16px}.practice summary{cursor:pointer;font-weight:800;color:#00E5FF}.practice .fb{color:#DCE3F4;margin:10px 0 0}.practice .fb strong{color:#fff}
.ctaband{max-width:1120px;margin:0 auto;padding:8px clamp(20px,5vw,36px) clamp(40px,6vw,72px)}.ctaband .box{background:linear-gradient(135deg,rgba(0,229,255,.14),rgba(255,215,0,.05));border:1px solid rgba(0,229,255,.28);border-radius:26px;padding:clamp(26px,4vw,42px);text-align:center}.ctaband h2{font-size:clamp(1.6rem,3.4vw,2.4rem);margin:0 0 12px;letter-spacing:-.03em}.ctaband p{color:#CFD6EA;max-width:620px;margin:0 auto 22px}.ctaband .cta-row{justify-content:center}
/* hub */
.hub-cats{max-width:1120px;margin:0 auto;padding:8px clamp(20px,5vw,36px) clamp(40px,6vw,72px)}.hub-cat{margin:0 0 40px}.hub-cat h2{font-size:clamp(1.4rem,3vw,2rem);letter-spacing:-.03em;margin:0 0 6px}.hub-cat .sub{color:#8B95B0;margin:0 0 18px}.hub-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.hub-card{display:block;background:rgba(20,27,45,.82);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px 20px;transition:border-color .2s,transform .2s}.hub-card:hover{border-color:rgba(0,229,255,.4);text-decoration:none;transform:translateY(-2px)}.hub-card .t{color:#fff;font-weight:800;font-size:1.04rem;margin:0 0 4px}.hub-card .d{color:#A9B4D0;font-size:.92rem;margin:0}
@media(max-width:800px){.grid,.two-col,.hub-grid,.outcomes{grid-template-columns:1fr}.nav{align-items:flex-start;flex-direction:column}.hero h1{font-size:3rem}}`;

function head({ title, description, canonical, ogImage, keywords, prev, next, jsonBlocks }) {
  const og = ogImage || `${D}/assets/og-card.png`;
  const metas = [
    `<meta charset="utf-8"/>`,
    `<meta name="viewport" content="width=device-width, initial-scale=1"/>`,
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}"/>`,
    keywords ? `<meta name="keywords" content="${esc(keywords)}"/>` : '',
    `<meta name="application-name" content="Iro AI"/>`,
    `<meta name="apple-mobile-web-app-title" content="Iro AI"/>`,
    `<meta name="apple-mobile-web-app-capable" content="yes"/>`,
    `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>`,
    `<meta name="mobile-web-app-capable" content="yes"/>`,
    `<meta name="msapplication-TileColor" content="#0A0E1A"/>`,
    `<meta name="format-detection" content="telephone=no"/>`,
    `<meta name="author" content="Iro AI"/>`,
    `<meta name="theme-color" content="#070A12"/>`,
    prev ? `<link rel="prev" href="${prev}"/>` : '',
    next ? `<link rel="next" href="${next}"/>` : '',
    `<link rel="canonical" href="${canonical}"/>`,
    `<link rel="alternate" hreflang="en" href="${canonical}"/>`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}"/>`,
    `<link rel="alternate" type="text/plain" title="LLM-readable product summary" href="/llms.txt"/>`,
    `<link rel="alternate" type="text/plain" title="Detailed LLM-readable product reference" href="/llms-full.txt"/>`,
    `<link rel="alternate" type="text/plain" title="AI assistant and crawler policy" href="/ai.txt"/>`,
    `<link rel="manifest" href="/manifest.json"/>`,
    `<link rel="alternate" type="application/ld+json" title="Iro AI machine-readable product feed" href="/iro.json"/>`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>`,
    `<meta property="og:title" content="${esc(title)}"/>`,
    `<meta property="og:description" content="${esc(description)}"/>`,
    `<meta property="og:image" content="${og}"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:url" content="${canonical}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="Iro AI"/>`,
    `<meta property="og:locale" content="en_US"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:site" content="@tryiroapp"/>`,
    `<meta name="twitter:title" content="${esc(title)}"/>`,
    `<meta name="twitter:description" content="${esc(description)}"/>`,
    `<meta name="twitter:image" content="${og}"/>`,
    `<link rel="icon" href="assets/favicon-64.png" type="image/png"/>`,
    `<link rel="apple-touch-icon" href="assets/apple-touch-icon.png"/>`,
  ];
  const blocks = jsonBlocks.map((b) => `<script type="application/ld+json">${jsonld(b)}</script>`).join('\n');
  return (
    '<!doctype html>\n<html lang="en">\n<head>\n' +
    metas.filter(Boolean).join('\n') +
    '\n' +
    blocks +
    '\n<style>' +
    CSS +
    '</style>\n' +
    FONTS +
    '\n<link rel="stylesheet" href="/iro.css"/>\n' +
    `<meta name="apple-itunes-app" content="app-id=${APPID}"/>\n` +
    POSTHOG +
    '\n<script src="/llm-referrals.js"></script>\n</head>\n'
  );
}

const NAV =
  '<header class="nav"><a class="brand" href="/"><img src="assets/kiro-app-icon-256.png" alt="Iro AI"/>Iro AI</a>' +
  '<nav class="nav-links"><a href="/paths">Path library</a><a href="/learn-chatgpt">Learn ChatGPT</a><a href="/prompt-engineering-app">Prompt Engineering</a><a href="/quiz">AI IQ Test</a><a href="/about">About</a><a href="https://app.tryiro.com">Open web app</a></nav></header>';

const FOOTER =
  '<footer class="footer"><nav><a href="/paths">Path library</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/blog">Blog</a><a href="https://instagram.com/tryiro" target="_blank" rel="noopener">Instagram</a><a href="https://www.tiktok.com/@tryiro" target="_blank" rel="noopener">TikTok</a><a href="https://www.youtube.com/@tryiroai" target="_blank" rel="noopener">YouTube</a><a href="https://x.com/tryiroapp" target="_blank" rel="noopener">X</a><a href="https://www.linkedin.com/company/iro-ai-app/" target="_blank" rel="noopener">LinkedIn</a><a href="https://app.tryiro.com">Web app / Log in</a></nav><p>© 2026 Iro AI. Master AI. Stay ahead.</p></footer>';

// ---------- page builder ----------
function buildPage(p, allBySlug) {
  const canonical = url(p.slug);
  const og = `${D}/assets/og/${p.slug}.png`;
  const ogExists = fs.existsSync(path.join(ROOT, 'assets/og', `${p.slug}.png`));
  const teaches = p.teaches || p.pills || [];
  const dateP = p.datePublished || cfg.firstDate;
  const dateM = p.dateModified || dateP;

  // ---- schema ----
  const webPage = { '@context': 'https://schema.org', '@type': 'WebPage', name: p.title, description: p.metaDescription, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Iro AI', url: D + '/' }, about: [{ '@type': 'Thing', name: 'Iro AI' }, { '@type': 'Thing', name: p.about || 'AI education' }], publisher: { '@type': 'Organization', name: 'Iro AI', url: D, logo: { '@type': 'ImageObject', url: D + '/assets/kiro-app-icon-512.png' } }, inLanguage: 'en-US' };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Iro AI', item: D + '/' },
    { '@type': 'ListItem', position: 2, name: 'Path library', item: D + '/paths' },
    { '@type': 'ListItem', position: 3, name: p.h1, item: canonical },
  ] };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  const course = { '@context': 'https://schema.org', '@type': 'Course', name: p.h1, description: p.metaDescription, url: canonical, provider: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D, sameAs: [APP] }, educationalLevel: p.level || 'Beginner to advanced', inLanguage: 'en-US', teaches, isAccessibleForFree: true, offers: { '@type': 'Offer', category: 'Free', price: '0', priceCurrency: 'USD', url: APP }, hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT5M', instructor: { '@type': 'Organization', name: 'Iro AI' } }, isPartOf: { '@type': 'MobileApplication', '@id': D + '/#app', name: 'Iro AI', operatingSystem: 'iOS', url: APP }, datePublished: dateP, dateModified: dateM };
  const learningResource = { '@context': 'https://schema.org', '@type': 'LearningResource', name: p.h1, url: canonical, description: p.metaDescription, learningResourceType: 'App lesson series', educationalLevel: p.level || 'Beginner to advanced', interactivityType: 'active', isAccessibleForFree: true, inLanguage: 'en-US', teaches, audience: { '@type': 'Audience', audienceType: p.audience || 'Professionals, students, founders, creators' }, provider: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D }, isPartOf: { '@type': 'MobileApplication', '@id': D + '/#app', name: 'Iro AI', operatingSystem: 'iOS', url: APP }, datePublished: dateP, dateModified: dateM };
  const article = { '@context': 'https://schema.org', '@type': 'Article', headline: p.h1, description: p.metaDescription, url: canonical, mainEntityOfPage: canonical, image: og, author: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D }, publisher: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D, logo: { '@type': 'ImageObject', url: D + '/assets/kiro-app-icon-512.png' } }, datePublished: dateP, dateModified: dateM, inLanguage: 'en-US', isPartOf: { '@id': D + '/#website' } };
  const mentions = (p.related || []).concat(p.readNext || []).map((r) => r.href).filter((h) => h.startsWith('/'));
  const mentionsSchema = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': canonical + '#mentions', url: canonical, mentions: mentions.map((h) => ({ '@type': 'WebPage', url: abs(h) })), relatedLink: mentions.map(abs) };

  const H = head({
    title: p.title,
    description: p.metaDescription,
    canonical,
    ogImage: ogExists ? og : `${D}/assets/og-card.png`,
    keywords: (p.keywords || []).join(', '),
    prev: p.prev ? abs(p.prev) : '',
    next: p.next ? abs(p.next) : '',
    jsonBlocks: [webPage, breadcrumb, faqSchema, course, learningResource, article, mentionsSchema],
  });

  // ---- body ----
  const pills = (p.pills || []).map((x) => `<span class="pill">${esc(x)}</span>`).join('');
  const crumb = `<nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/paths">Path library</a><span>›</span>${esc(p.eyebrow)}</nav>`;
  const hero = `<section class="hero"><p class="eyebrow">${esc(p.eyebrow)}</p><h1>${esc(p.h1)}</h1><p>${esc(p.lede)}</p>${pills ? `<div class="pill-list">${pills}</div>` : ''}<div class="cta-row"><a class="btn" href="${CTA_UTM(p.slug, 'hero')}" data-cta="app_store">Download Iro free</a><a class="btn secondary" href="/quiz">Take the AI IQ test</a></div><p class="note">iOS now. Android is in development — join the waitlist on the home page. Free to start; optional Pro upgrade is managed through Apple. Prefer your desktop? Iro also runs in your browser at <a href="https://app.tryiro.com">app.tryiro.com</a>.</p></section>`;

  const answer = `<div class="answer"><div class="box"><p class="lbl">The short version</p><p>${esc(p.tldr.answer)}</p><ul>${p.tldr.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div></div>`;

  const outcomes = `<section><h2>${esc(p.outcomesHeading || 'What you\'ll be able to do')}</h2><ul class="outcomes">${p.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>`;

  const lessons = `<section><h2>Inside the path</h2><p>A focused set of five-minute lessons — each one ends with a hands-on exercise, not a quiz you can guess.</p><ol class="lessons">${p.lessons.map((l) => `<li class="lesson"><span class="n"></span><div><h3>${esc(l.t)} <span class="dur">${esc(l.dur)}</span></h3><p>${esc(l.blurb)}</p></div></li>`).join('')}</ol></section>`;

  const pr = p.practice;
  const opts = pr.options
    ? `<ul class="opts">${pr.options.map((o) => `<li class="${o.correct ? 'correct' : ''}">${esc(o.text)}</li>`).join('')}</ul>`
    : '';
  const practice = `<section><h2>Try a sample exercise</h2><p>This is the kind of card you'd practice inside Iro — you do the thinking, then get feedback.</p><div class="practice"><p class="tag">◆ Sample exercise · ${esc(pr.type || 'Prompt practice')}</p><p class="scenario">${esc(pr.scenario)}</p><p class="task"><strong>Your task:</strong> ${esc(pr.task)}</p>${opts}<details><summary>${esc(pr.revealLabel || 'See a strong answer + why it works')}</summary><p class="fb">${pr.feedback}</p></details></div></section>`;

  const bodySections = (p.body || []).map((s) => `<section><h2>${esc(s.h2)}</h2>${s.html}</section>`).join('');

  const faq = `<section class="faq"><h2>${esc(p.faqHeading || 'Questions people ask')}</h2>${p.faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${f.aHtml || esc(f.a)}</p></details>`).join('')}</section>`;

  const ctaband = `<div class="ctaband"><div class="box"><h2>${esc(p.ctaHeading || 'Practice this in Iro.')}</h2><p>${esc(p.ctaBody || 'Reading about AI builds awareness. Iro builds skill — five minutes a day of real practice with instant feedback, streaks, and progress you can feel.')}</p><div class="cta-row"><a class="btn" href="${CTA_UTM(p.slug, 'footer')}" data-cta="app_store">Download Iro free</a><a class="btn secondary" href="/paths">Browse all paths</a></div></div></div>`;

  const rel = (p.related || []).map((r) => `<a class="btn secondary" href="${r.href}">${esc(r.label)}</a>`).join('');
  const readNext = (p.readNext || []).map((r) => `<a href="${r.href}">${esc(r.label)}</a>`).join(' · ');
  const related = `<section class="related"><h2>Related paths</h2><div class="cta-row">${rel}<a class="btn secondary" href="/paths">All paths</a></div>${readNext ? `<p style="margin-top:18px;color:#CFD6EA">More reading: ${readNext}.</p>` : ''}</section>`;

  const body =
    '<body><div class="page">\n' +
    NAV +
    '\n' +
    crumb +
    '\n<main>\n' +
    hero +
    '\n' +
    answer +
    '\n<section class="content">\n' +
    outcomes +
    '\n' +
    lessons +
    '\n' +
    practice +
    '\n' +
    bodySections +
    '\n</section>\n' +
    faq +
    '\n' +
    related +
    '\n' +
    ctaband +
    '\n</main>\n' +
    FOOTER +
    '\n</div></body></html>\n';

  return H + body;
}

// ---------- hub builder ----------
function buildHub(hub, pages) {
  const canonical = url('paths');
  const byCat = {};
  for (const c of hub.categories) byCat[c.id] = [];
  // include generated pages + any manually-registered entries from hub.extra
  const entries = pages.map((p) => ({ slug: p.slug, cat: p.category, t: p.hubTitle || p.eyebrow, d: p.hubBlurb || p.metaDescription }))
    .concat(hub.extra || []);
  for (const e of entries) {
    if (!byCat[e.cat]) byCat[e.cat] = [];
    byCat[e.cat].push(e);
  }
  const totalCount = entries.length;

  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Iro AI path library', description: hub.metaDescription, numberOfItems: totalCount, itemListElement: entries.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.t, url: e.slug.startsWith('http') ? e.slug : url(e.slug) })) };
  const collection = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: hub.title, description: hub.metaDescription, url: canonical, isPartOf: { '@type': 'WebSite', name: 'Iro AI', url: D + '/' }, inLanguage: 'en-US', about: { '@type': 'Thing', name: 'Learning AI with Iro' } };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Iro AI', item: D + '/' }, { '@type': 'ListItem', position: 2, name: 'Path library', item: canonical } ] };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: hub.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  const H = head({ title: hub.title, description: hub.metaDescription, canonical, ogImage: fs.existsSync(path.join(ROOT, 'assets/og/paths.png')) ? `${D}/assets/og/paths.png` : `${D}/assets/og-card.png`, keywords: (hub.keywords || []).join(', '), jsonBlocks: [collection, breadcrumb, itemList, faqSchema] });

  const cats = hub.categories.map((c) => {
    const items = (byCat[c.id] || []);
    if (!items.length) return '';
    const cards = items.map((e) => `<a class="hub-card" href="${e.slug.startsWith('http') ? e.slug : '/' + e.slug}"><p class="t">${esc(e.t)}</p><p class="d">${esc(e.d)}</p></a>`).join('');
    return `<section class="hub-cat"><h2>${esc(c.title)}</h2><p class="sub">${esc(c.sub)}</p><div class="hub-grid">${cards}</div></section>`;
  }).join('\n');

  const crumb = `<nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span>Path library</nav>`;
  const hero = `<section class="hero"><p class="eyebrow">${esc(hub.eyebrow)}</p><h1>${esc(hub.h1)}</h1><p>${esc(hub.lede)}</p><div class="cta-row"><a class="btn" href="${CTA_UTM('paths', 'hero')}" data-cta="app_store">Download Iro free</a><a class="btn secondary" href="/quiz">Take the AI IQ test</a></div><p class="note">${esc(hub.note)}</p></section>`;
  const answer = `<div class="answer"><div class="box"><p class="lbl">What is this?</p><p>${esc(hub.answer)}</p><ul>${hub.answerBullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div></div>`;
  const faq = `<section class="faq"><h2>Questions people ask</h2>${hub.faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>`;
  const ctaband = `<div class="ctaband"><div class="box"><h2>${esc(hub.ctaHeading)}</h2><p>${esc(hub.ctaBody)}</p><div class="cta-row"><a class="btn" href="${CTA_UTM('paths', 'footer')}" data-cta="app_store">Download Iro free</a><a class="btn secondary" href="/quiz">Take the AI IQ test</a></div></div></div>`;

  const body = '<body><div class="page">\n' + NAV + '\n' + crumb + '\n<main>\n' + hero + '\n' + answer + '\n<div class="hub-cats">\n' + cats + '\n</div>\n' + faq + '\n' + ctaband + '\n</main>\n' + FOOTER + '\n</div></body></html>\n';
  return { html: H + body, count: totalCount };
}

// ---------- sitemap + llms marker-block updates ----------
function replaceBlock(file, startMark, endMark, inner) {
  let s = fs.readFileSync(file, 'utf8');
  const a = s.indexOf(startMark);
  const b = s.indexOf(endMark);
  if (a !== -1 && b !== -1) {
    s = s.slice(0, a + startMark.length) + '\n' + inner + '\n  ' + s.slice(b);
    fs.writeFileSync(file, s);
    return true;
  }
  return false; // caller handles first-time insertion
}

// ---------- run ----------
const dir = path.join(CONTENT, 'paths');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')) : [];
const pages = files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))).filter((p) => !p.draft);
pages.sort((a, b) => (a.order || 999) - (b.order || 999));
const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));

let wrote = 0;
for (const p of pages) {
  fs.writeFileSync(path.join(ROOT, `${p.slug}.html`), buildPage(p, bySlug));
  wrote++;
}

// hub
const hub = JSON.parse(fs.readFileSync(path.join(CONTENT, 'paths-hub.json'), 'utf8'));
const built = buildHub(hub, pages);
fs.writeFileSync(path.join(ROOT, 'paths.html'), built.html);

// sitemap block (all new path pages + hub)
const today = cfg.buildDate;
const sitemapEntries = ['paths'].concat(pages.map((p) => p.slug))
  .map((slug) => `  <url><loc>${url(slug)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${slug === 'paths' ? '0.9' : '0.8'}</priority></url>`)
  .join('\n');
const smFile = path.join(ROOT, 'sitemap.xml');
if (!replaceBlock(smFile, '<!-- PATHS:START -->', '<!-- PATHS:END -->', sitemapEntries)) {
  let s = fs.readFileSync(smFile, 'utf8');
  s = s.replace('</urlset>', `  <!-- PATHS:START -->\n${sitemapEntries}\n  <!-- PATHS:END -->\n</urlset>`);
  fs.writeFileSync(smFile, s);
}

// llms.txt block
const llmsEntries = pages.map((p) => `- [${p.eyebrow}](${url(p.slug)}): ${p.llmsBlurb || p.metaDescription}`).join('\n');
const llmsBlock = `## Iro path library (learn by doing)\nBrowse every Iro learning path at ${url('paths')}. Each path is a set of five-minute, hands-on lessons with feedback.\n${llmsEntries}`;
const llmsFile = path.join(ROOT, 'llms.txt');
if (!replaceBlock(llmsFile, '<!-- PATHLIB:START -->', '<!-- PATHLIB:END -->', llmsBlock)) {
  let s = fs.readFileSync(llmsFile, 'utf8');
  s = s.trimEnd() + `\n\n<!-- PATHLIB:START -->\n${llmsBlock}\n<!-- PATHLIB:END -->\n`;
  fs.writeFileSync(llmsFile, s);
}

// vercel.json rewrites — extensionless clean URLs. Additive + idempotent:
// only appends a rewrite for a slug that doesn't already have one.
const vfile = path.join(ROOT, 'vercel.json');
let vtext = fs.readFileSync(vfile, 'utf8');
const needed = ['paths'].concat(pages.map((p) => p.slug));
const toAdd = needed.filter((slug) => !new RegExp('"source":\\s*"/' + slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"').test(vtext));
if (toAdd.length) {
  const entries = toAdd.map((slug) => `    {\n      "source": "/${slug}",\n      "destination": "/${slug}.html"\n    }`).join(',\n');
  const marker = '\n  ]\n}';
  const idx = vtext.lastIndexOf(marker);
  vtext = vtext.slice(0, idx) + ',\n' + entries + vtext.slice(idx);
  fs.writeFileSync(vfile, vtext);
}

console.log(`paths-engine: wrote ${wrote} path page(s) + hub (paths.html, ${built.count} entries listed); refreshed sitemap.xml + llms.txt; added ${toAdd.length} vercel.json rewrite(s)`);

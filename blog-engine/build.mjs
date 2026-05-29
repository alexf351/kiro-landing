#!/usr/bin/env node
// Iro AI blog engine — JSON in, standardized blog site out.
//
//   node blog-engine/build.mjs
//
// Reads:  blog-engine/content/pillars/*.json   (topic-cluster hub pages)
//         blog-engine/content/posts/*.json      (individual blog posts)
//         blog-engine/lib/site.config.json       (global brand/site config)
//
// Writes: blog/<slug>.html                       (posts + pillar hubs)
//         blog/index.html                         (pillar-grouped index)
//         blog/{rss.xml,atom.xml,feed.json}       (feeds)
//         llms/blog/<slug>.md + index.md          (LLM-readable mirrors)
//         blog-sitemap.xml                        (sitemap with image entries)
//
// Cross-linking is computed automatically from pillar membership (bidirectional
// pillar <-> cluster) and from each post's explicit `related` / `readNext`.
// Zero dependencies; Node 18+.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(__dirname, 'content');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/site.config.json'), 'utf8'));
const D = cfg.domain;

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => (/^https?:/.test(p) ? p : D + p);
const iso = (d) => `${d}T00:00:00Z`;
const rfc822 = (d) => new Date(iso(d)).toUTCString();
const stripTags = (h) =>
  String(h)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();

// Title-case a URL path into a schema.org `mentions` name (e.g. blog/spot-ai -> "Blog/Spot Ai").
const nameFromUrl = (p) =>
  p
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\//, '')
    .split('/')
    .map((seg) => seg.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .join('/');

// Python-style compact JSON-LD (", " / ": " separators), matching existing pages.
function jsonld(v) {
  if (v === null) return 'null';
  const t = typeof v;
  if (t === 'number' || t === 'boolean') return String(v);
  if (t === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(jsonld).join(', ') + ']';
  return '{' + Object.entries(v).map(([k, val]) => JSON.stringify(k) + ': ' + jsonld(val)).join(', ') + '}';
}

// Minimal HTML -> Markdown for the LLM mirrors.
function inlineMd(s) {
  return s
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<em>([\s\S]*?)<\/em>/g, '_$1_')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
function blocksToMd(html) {
  const out = [];
  const re = /<(p|ul|ol|blockquote)>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html))) {
    const [, tag, inner] = m;
    if (tag === 'p') out.push(inlineMd(inner));
    else if (tag === 'blockquote') out.push('> ' + inlineMd(inner));
    else {
      const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((li) => '- ' + inlineMd(li[1]));
      out.push(items.join('\n'));
    }
  }
  return out.join('\n\n');
}

// ---------- load content ----------
function loadDir(dir) {
  const p = path.join(CONTENT, dir);
  if (!fs.existsSync(p)) return [];
  return fs
    .readdirSync(p)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(p, f), 'utf8')))
    .filter((x) => !x.draft);
}
const pillars = loadDir('pillars').sort((a, b) => (a.order || 0) - (b.order || 0));
const posts = loadDir('posts').sort((a, b) => (a.order || 0) - (b.order || 0));

const pillarBySlug = Object.fromEntries(pillars.map((p) => [p.slug, p]));
// Attach cluster posts to each pillar (in post order).
for (const p of pillars) p.posts = posts.filter((post) => post.pillar === p.slug);

const postUrl = (p) => `${D}/blog/${p.slug}`;
const pillarUrl = (p) => `${D}/blog/${p.slug}`;
const og = (slug) => `${D}/assets/og/${slug}.png`;

// ---------- shared chrome ----------
const STYLE = `*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#0A0E1A;color:#fff;line-height:1.75}a{color:#00E5FF;text-decoration:none}a:hover{text-decoration:underline}.page{min-height:100vh;background:radial-gradient(circle at 20% 0%,rgba(0,229,255,.16),transparent 34rem),radial-gradient(circle at 80% 10%,rgba(255,215,0,.08),transparent 30rem),#0A0E1A}.nav{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px clamp(20px,5vw,64px);background:rgba(10,14,26,.82);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.06)}.brand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:900}.brand img{width:32px;height:32px;border-radius:9px}.nav-links{display:flex;gap:16px;flex-wrap:wrap;font-size:.95rem}.nav-links a{color:#C9D2EA}.hero,.content,.related,.faq{max-width:760px;margin:0 auto;padding:clamp(28px,5vw,56px) clamp(20px,5vw,36px)}.hero{padding-top:clamp(48px,8vw,96px)}.eyebrow{color:#00E5FF;text-transform:uppercase;letter-spacing:.14em;font-size:.78rem;font-weight:900;margin:0 0 14px}.hero h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;letter-spacing:-.04em;margin:0 0 18px}.lede{color:#C9D2EA;font-size:clamp(1.05rem,2vw,1.2rem);margin:0 0 22px;line-height:1.7}.meta{color:#8B95B0;font-size:.92rem;font-family:JetBrains Mono,ui-monospace,Menlo,monospace;display:flex;gap:18px;flex-wrap:wrap;margin-bottom:24px}.hero-img{width:100%;border-radius:18px;border:1px solid rgba(255,255,255,.08);margin:8px 0 20px;display:block}.content h2{font-size:clamp(1.4rem,3vw,2rem);margin:42px 0 12px;letter-spacing:-.02em;color:#fff;scroll-margin-top:72px}.content h3{font-size:1.18rem;margin:28px 0 10px;letter-spacing:-.01em;color:#fff}.content p,.content li{color:#CFD6EA;font-size:1.04rem}.content p{margin:0 0 16px}.content ul,.content ol{margin:0 0 16px;padding-left:22px}.content li{margin:6px 0}.content blockquote{margin:18px 0;padding:14px 18px;border-left:3px solid #00E5FF;background:rgba(0,229,255,.05);border-radius:0 14px 14px 0;color:#E6ECF8}.content code{background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.18);padding:1px 6px;border-radius:6px;font-size:.92em;color:#CFF8FF}.toc{background:rgba(20,27,45,.7);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px 22px;margin:0 0 22px;font-size:.95rem}.toc strong{color:#fff;display:block;margin-bottom:6px;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:#00E5FF}.toc a{color:#CFF8FF;font-weight:600;display:inline-block;margin:3px 14px 3px 0}.cta-box{background:rgba(20,27,45,.85);border:1px solid rgba(0,229,255,.25);border-radius:18px;padding:22px 24px;margin:28px 0;text-align:left}.cta-box h3{margin:0 0 8px;font-size:1.1rem;color:#fff}.cta-box p{margin:0 0 14px;color:#CFD6EA}.cta-row{display:flex;gap:12px;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 20px;font-weight:900;border:1px solid rgba(0,229,255,.35);background:linear-gradient(135deg,#00E5FF,#00B4D8);color:#06111c;font-size:.95rem}.btn.secondary{background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.16)}.related h2,.faq h2{font-size:clamp(1.3rem,2.5vw,1.7rem);margin:0 0 14px;letter-spacing:-.02em}.related ul{list-style:none;padding:0;margin:0}.related li{background:rgba(20,27,45,.7);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px;margin:10px 0}.related li a{font-weight:700;color:#fff}.related li p{margin:6px 0 0;color:#8B95B0;font-size:.92rem}.faq details{background:rgba(20,27,45,.78);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px;margin:10px 0}.faq summary{font-weight:800;cursor:pointer;color:#fff}.faq p{color:#CFD6EA;margin:8px 0 0}.footer{padding:34px clamp(20px,5vw,64px);border-top:1px solid rgba(255,255,255,.08);color:#8B95B0;margin-top:48px}.footer nav{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px}.footer a{color:#C9D2EA}.posts-list{list-style:none;padding:0;margin:0}.posts-list li{background:rgba(20,27,45,.7);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px 24px;margin:14px 0}.posts-list h2{font-size:1.3rem;margin:0 0 6px}.posts-list h2 a{color:#fff}.posts-list .meta{margin-bottom:6px}.posts-list p{color:#CFD6EA;margin:6px 0 0;font-size:1rem}@media(max-width:800px){.nav{align-items:flex-start;flex-direction:column}.hero h1{font-size:2.1rem}}`;

const NAV = `<header class="nav"><a class="brand" href="/"><img src="${cfg.icons.brand}" alt="Iro AI"/>Iro AI</a><nav class="nav-links">${cfg.nav
  .map((n) => `<a href="${n.href}">${n.label}</a>`)
  .join('')}</nav></header>`;

const FOOTER = `<footer class="footer"><nav>${cfg.footer
  .map((f) => `<a href="${f.href}"${f.external ? ' target="_blank" rel="noopener"' : ''}>${f.label}</a>`)
  .join('')}</nav><p>${cfg.copyright}. ${cfg.tagline}</p></footer>`;

const ctaBox = (slug) =>
  `<div class="cta-box"><h3>${cfg.cta.heading}</h3><p>${cfg.cta.body}</p><div class="cta-row"><a class="btn" href="${esc(
    `${cfg.appStoreUrl}?utm_source=blog&utm_medium=inline&utm_campaign=${slug}`
  )}">${cfg.cta.primaryLabel}</a><a class="btn secondary" href="${cfg.cta.secondaryHref}">${cfg.cta.secondaryLabel}</a></div></div>`;

// Shared <head> alternate/meta blocks reused across page types.
const FONTS_CSS = `<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400..900&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/iro.css"/>`;
const HEAD_ICONS = `<link rel="icon" href="${cfg.icons.favicon}" type="image/png"/>
<link rel="apple-touch-icon" href="${cfg.icons.appleTouch}"/>`;

// ---------- post renderer ----------
function renderPost(post) {
  const url = postUrl(post);
  const title = post.title;
  const desc = post.description;
  const ogImg = post.ogImage || og(post.slug); // absolute — social cards + JSON-LD
  const heroSrc = post.heroImage || `/assets/og/${post.slug}.png`; // relative — on-page <img>
  const dp = post.datePublished;
  const dm = post.dateModified || dp;
  const rt = post.readingTime;
  const kw = post.keywords.join(', ');
  const pillar = post.pillar ? pillarBySlug[post.pillar] : null;
  const section = post.articleSection || cfg.articleSection;

  // Breadcrumb (adds the pillar level when the post belongs to a cluster).
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'Iro AI', item: D + '/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: D + '/blog' },
  ];
  if (pillar) crumbs.push({ '@type': 'ListItem', position: 3, name: pillar.title, item: pillarUrl(pillar) });
  crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: title, item: url });

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url + '#post',
    headline: title,
    description: desc,
    url,
    mainEntityOfPage: url,
    image: ogImg,
    datePublished: dp,
    dateModified: dm,
    wordCount: null,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'Blog', '@id': D + '/blog#blog', name: 'Iro AI Blog', url: D + '/blog' },
    author: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D },
    publisher: {
      '@type': 'Organization',
      '@id': D + '/#organization',
      name: 'Iro AI',
      url: D,
      logo: { '@type': 'ImageObject', url: D + cfg.icons.logo512 },
    },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'p'] },
    keywords: kw,
    articleSection: section,
    timeRequired: `PT${rt}M`,
    mentions: (post.related || []).map((r) => ({ '@type': 'Thing', name: nameFromUrl(r), url: abs(r) })),
  };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    })),
  };

  const relatedLinks = (post.related || []).map((r) => `<link rel="related" href="${abs(r)}"/>`).join('\n');
  const toc = post.toc.map((t) => `<a href="${t.href}">${t.label}</a>`).join('');

  // Content body: sections, with an inline CTA after the Nth section + a closing CTA.
  const after = (post.inlineCtaAfter || 2) - 1;
  const lines = [`<div class="toc"><strong>In this post</strong>${toc}</div>`];
  post.sections.forEach((s, i) => {
    lines.push(`<h2 id="${s.id}">${s.heading}</h2>`);
    lines.push(s.html);
    if (i === after) lines.push(ctaBox(post.slug));
  });
  lines.push('');
  lines.push(ctaBox(post.slug));
  const content = lines.join('\n');

  const readNext = post.readNext.map((r) => `<li><a href="${r.href}">${r.label}</a></li>`).join('');
  const faq = post.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');

  const pillarMeta = pillar ? `<span><a href="/blog/${pillar.slug}">${esc(pillar.shortName || pillar.title)}</a></span>` : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)} | Iro AI Blog</title>
<meta name="description" content="${esc(desc)}"/>
<meta name="keywords" content="${esc(kw)}"/>
<meta name="application-name" content="Iro AI"/>
<meta name="apple-mobile-web-app-title" content="Iro AI"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="msapplication-TileColor" content="#0A0E1A"/>
<meta name="msapplication-TileImage" content="${cfg.icons.tile}"/>
<meta name="author" content="Iro AI"/>
<meta name="publisher" content="Iro AI"/>
<meta name="copyright" content="${cfg.copyright}"/>
<meta name="rating" content="general"/>
<meta name="referrer" content="strict-origin-when-cross-origin"/>
<meta name="DC.title" content="${esc(title)} | Iro AI Blog"/>
<meta name="DC.creator" content="Iro AI"/>
<meta name="DC.publisher" content="Iro AI"/>
<meta name="DC.language" content="en-US"/>
<meta name="DC.rights" content="${cfg.copyright}"/>
<meta name="DC.source" content="${D}"/>
<meta name="DC.date" content="${dp}"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="theme-color" content="#0A0E1A"/>
<link rel="canonical" href="${url}"/>
<link rel="alternate" hreflang="en" href="${url}"/>
<link rel="alternate" hreflang="x-default" href="${url}"/>
<link rel="alternate" type="text/plain" title="LLM-readable product summary" href="/llms.txt"/>
<link rel="alternate" type="text/plain" title="Detailed LLM-readable product reference" href="/llms-full.txt"/>
<link rel="alternate" type="text/plain" title="AI assistant and crawler policy" href="/ai.txt"/>
<link rel="alternate" type="text/plain" title="LLM resource index" href="/llms-index.txt"/>
<link rel="alternate" type="application/rss+xml" title="Iro AI changelog (RSS)" href="/rss.xml"/>
<link rel="dns-prefetch" href="//apps.apple.com"/>
<link rel="preconnect" href="https://apps.apple.com" crossorigin/>
<link rel="alternate" type="application/atom+xml" title="Iro AI changelog (Atom)" href="/atom.xml"/>
<link rel="alternate" type="application/feed+json" title="Iro AI changelog (JSON Feed)" href="/feed.json"/>
<link rel="alternate" type="text/markdown" title="Post in Markdown" href="${D}/llms/blog/${post.slug}.md"/>
<link rel="manifest" href="/manifest.json"/>
<link rel="alternate" type="application/ld+json" title="Iro AI machine-readable product feed" href="/iro.json"/>
<meta property="article:published_time" content="${iso(dp)}"/>
<meta property="article:modified_time" content="${iso(dm)}"/>
<meta property="article:author" content="Iro AI"/>
<meta property="article:section" content="${esc(section)}"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:image" content="${ogImg}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:url" content="${url}"/>
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="Iro AI"/>
<meta property="og:locale" content="en_US"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="${cfg.twitterSite}"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(desc)}"/>
<meta name="twitter:image" content="${ogImg}"/>
${HEAD_ICONS}
<script type="application/ld+json">${jsonld(blogPosting)}</script>
<script type="application/ld+json">${jsonld(breadcrumb)}</script>
<style>${STYLE}</style>
${FONTS_CSS}
${relatedLinks}
<script type="application/ld+json">${jsonld(faqLd)}</script>
</head>
<body><div class="page">
${NAV}
<main>
<article class="hero">
<p class="eyebrow">${cfg.blog.heroEyebrow}</p>
<h1>${title}</h1>
<p class="lede">${post.lede}</p>
<p class="meta"><span>By Iro AI</span><span>${dp}</span><span>~${rt} min read</span>${pillarMeta}</p>
<img class="hero-img" src="${heroSrc}" alt="${esc(title)}" width="1200" height="630"/>
</article>
<div class="content">
${content}
</div>
<section class="related"><h2>Read next</h2><ul>${readNext}</ul></section>
<section class="faq"><h2>FAQ</h2>${faq}</section>
</main>
${FOOTER}
</div></body></html>
`;
}

// ---------- pillar hub renderer ----------
function renderPillar(pillar) {
  const url = pillarUrl(pillar);
  const ogImg = pillar.ogImage || og(pillar.slug); // absolute
  const heroSrc = pillar.heroImage || `/assets/og/${pillar.slug}.png`; // relative
  const dp = pillar.datePublished || cfg.buildDate;
  const dm = pillar.dateModified || dp;
  const kw = (pillar.keywords || []).join(', ');
  const clusterPosts = pillar.posts;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pillar.title,
    itemListElement: clusterPosts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: postUrl(p),
      name: p.title,
    })),
  };
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url + '#page',
    name: pillar.title,
    headline: pillar.title,
    description: pillar.description,
    url,
    image: ogImg,
    datePublished: dp,
    dateModified: dm,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'Blog', '@id': D + '/blog#blog', name: 'Iro AI Blog', url: D + '/blog' },
    about: (pillar.keywords || []).map((k) => ({ '@type': 'Thing', name: k })),
    publisher: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Iro AI', item: D + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: D + '/blog' },
      { '@type': 'ListItem', position: 3, name: pillar.title, item: url },
    ],
  };
  const faqLd = pillar.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pillar.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
        })),
      }
    : null;

  const relatedLinks = (pillar.related || []).map((r) => `<link rel="related" href="${abs(r)}"/>`).join('\n');

  const postsList = clusterPosts
    .map(
      (p) =>
        `<li><h2><a href="/blog/${p.slug}">${p.title}</a></h2><p class="meta"><span>${p.datePublished}</span><span>~${p.readingTime} min read</span></p><p>${esc(
          p.description
        )}</p></li>`
    )
    .join('');

  const otherPillars = pillars.filter((x) => x.slug !== pillar.slug);
  const related = [
    ...otherPillars.map((x) => `<li><a href="/blog/${x.slug}">${x.title}</a><p>${esc(x.tagline)}</p></li>`),
    ...(pillar.relatedLabels || []).map((r) => `<li><a href="${r.href}">${r.label}</a></li>`),
  ].join('');

  const faqSection = pillar.faq
    ? `<section class="faq"><h2>FAQ</h2>${pillar.faq
        .map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`)
        .join('')}</section>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(pillar.title)} | Iro AI Blog</title>
<meta name="description" content="${esc(pillar.description)}"/>
<meta name="keywords" content="${esc(kw)}"/>
<meta name="application-name" content="Iro AI"/>
<meta name="apple-mobile-web-app-title" content="Iro AI"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="msapplication-TileColor" content="#0A0E1A"/>
<meta name="msapplication-TileImage" content="${cfg.icons.tile}"/>
<meta name="author" content="Iro AI"/>
<meta name="publisher" content="Iro AI"/>
<meta name="copyright" content="${cfg.copyright}"/>
<meta name="referrer" content="strict-origin-when-cross-origin"/>
<meta name="DC.title" content="${esc(pillar.title)} | Iro AI Blog"/>
<meta name="DC.creator" content="Iro AI"/>
<meta name="DC.publisher" content="Iro AI"/>
<meta name="DC.language" content="en-US"/>
<meta name="DC.rights" content="${cfg.copyright}"/>
<meta name="DC.source" content="${D}"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="theme-color" content="#0A0E1A"/>
<link rel="canonical" href="${url}"/>
<link rel="alternate" hreflang="en" href="${url}"/>
<link rel="alternate" hreflang="x-default" href="${url}"/>
<link rel="alternate" type="text/plain" title="LLM-readable product summary" href="/llms.txt"/>
<link rel="alternate" type="text/plain" title="Detailed LLM-readable product reference" href="/llms-full.txt"/>
<link rel="alternate" type="text/plain" title="AI assistant and crawler policy" href="/ai.txt"/>
<link rel="alternate" type="text/plain" title="LLM resource index" href="/llms-index.txt"/>
<link rel="alternate" type="application/rss+xml" title="Iro AI blog feed" href="/blog/rss.xml"/>
<link rel="alternate" type="application/atom+xml" title="Iro AI blog feed (Atom)" href="/blog/atom.xml"/>
<link rel="alternate" type="application/feed+json" title="Iro AI blog (JSON Feed)" href="/blog/feed.json"/>
<link rel="dns-prefetch" href="//apps.apple.com"/>
<link rel="preconnect" href="https://apps.apple.com" crossorigin/>
<link rel="alternate" type="text/markdown" title="Pillar in Markdown" href="${D}/llms/blog/${pillar.slug}.md"/>
<link rel="manifest" href="/manifest.json"/>
<link rel="alternate" type="application/ld+json" title="Iro AI machine-readable product feed" href="/iro.json"/>
<meta property="og:title" content="${esc(pillar.title)}"/>
<meta property="og:description" content="${esc(pillar.description)}"/>
<meta property="og:image" content="${ogImg}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:url" content="${url}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Iro AI"/>
<meta property="og:locale" content="en_US"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="${cfg.twitterSite}"/>
<meta name="twitter:title" content="${esc(pillar.title)}"/>
<meta name="twitter:description" content="${esc(pillar.description)}"/>
<meta name="twitter:image" content="${ogImg}"/>
${HEAD_ICONS}
<script type="application/ld+json">${jsonld(collection)}</script>
<script type="application/ld+json">${jsonld(breadcrumb)}</script>
<script type="application/ld+json">${jsonld(itemList)}</script>${
    faqLd ? `\n<script type="application/ld+json">${jsonld(faqLd)}</script>` : ''
  }
<style>${STYLE}</style>
${FONTS_CSS}
${relatedLinks}
</head>
<body><div class="page">
${NAV}
<main>
<article class="hero">
<p class="eyebrow">Pillar · Iro AI Blog</p>
<h1>${pillar.title}</h1>
<p class="lede">${pillar.lede || pillar.description}</p>
<p class="meta"><span>By Iro AI</span><span>Updated ${dm}</span><span>${clusterPosts.length} posts</span></p>
<img class="hero-img" src="${heroSrc}" alt="${esc(pillar.title)}" width="1200" height="630"/>
</article>
<div class="content">
${(pillar.intro || []).map((h) => h).join('\n')}
${ctaBox(pillar.slug)}
</div>
<section class="related"><h2>In this pillar</h2><ul class="posts-list">${postsList}</ul></section>
${faqSection}
<section class="related"><h2>Explore more</h2><ul>${related}</ul></section>
</main>
${FOOTER}
</div></body></html>
`;
}

// ---------- blog index ----------
function renderIndex() {
  const b = cfg.blog;
  const blogPostLd = posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url: postUrl(p),
    datePublished: p.datePublished,
  }));
  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': D + '/blog#blog',
    name: 'Iro AI Blog',
    url: D + '/blog',
    description: b.description,
    inLanguage: 'en-US',
    publisher: { '@type': 'Organization', '@id': D + '/#organization', name: 'Iro AI', url: D },
    blogPost: blogPostLd,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Iro AI', item: D + '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: D + '/blog' },
    ],
  };
  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'The Iro AI blog',
    url: D + '/blog',
    description: b.description,
    isPartOf: { '@id': D + '/#website' },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
    datePublished: cfg.firstDate,
    dateModified: cfg.buildDate,
    inLanguage: 'en-US',
  };
  const pillarsLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Iro AI blog pillars',
    itemListElement: pillars.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: pillarUrl(p),
      name: p.title,
    })),
  };

  const pillarCards = pillars
    .map((p) => `<li><a href="/blog/${p.slug}">${p.title}</a><p>${esc(p.tagline)} · ${p.posts.length} posts</p></li>`)
    .join('');
  const postsList = posts
    .map(
      (p) =>
        `<li><h2><a href="/blog/${p.slug}">${p.title}</a></h2><p class="meta"><span>${p.datePublished}</span><span>~${p.readingTime} min read</span></p><p>${esc(
          p.description
        )}</p></li>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>The Iro AI Blog — Practical AI Fluency</title>
<meta name="description" content="${esc(b.description)}"/>
<meta name="keywords" content="${esc(b.keywords)}"/>
<meta name="application-name" content="Iro AI"/>
<meta name="apple-mobile-web-app-title" content="Iro AI"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="msapplication-TileColor" content="#0A0E1A"/>
<meta name="msapplication-TileImage" content="${cfg.icons.tile}"/>
<meta name="author" content="Iro AI"/>
<meta name="publisher" content="Iro AI"/>
<meta name="copyright" content="${cfg.copyright}"/>
<meta name="referrer" content="strict-origin-when-cross-origin"/>
<meta name="DC.title" content="The Iro AI Blog"/>
<meta name="DC.creator" content="Iro AI"/>
<meta name="DC.publisher" content="Iro AI"/>
<meta name="DC.language" content="en-US"/>
<meta name="DC.rights" content="${cfg.copyright}"/>
<meta name="DC.source" content="${D}"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="theme-color" content="#0A0E1A"/>
<link rel="canonical" href="${D}/blog"/>
<link rel="alternate" hreflang="en" href="${D}/blog"/>
<link rel="alternate" hreflang="x-default" href="${D}/blog"/>
<link rel="alternate" type="text/plain" title="LLM-readable product summary" href="/llms.txt"/>
<link rel="alternate" type="text/plain" title="Detailed LLM-readable product reference" href="/llms-full.txt"/>
<link rel="alternate" type="text/plain" title="AI assistant and crawler policy" href="/ai.txt"/>
<link rel="alternate" type="text/plain" title="LLM resource index" href="/llms-index.txt"/>
<link rel="alternate" type="application/rss+xml" title="Iro AI blog feed" href="/blog/rss.xml"/>
<link rel="alternate" type="application/atom+xml" title="Iro AI blog feed (Atom)" href="/blog/atom.xml"/>
<link rel="alternate" type="application/feed+json" title="Iro AI blog (JSON Feed)" href="/blog/feed.json"/>
<link rel="dns-prefetch" href="//apps.apple.com"/>
<link rel="preconnect" href="https://apps.apple.com" crossorigin/>
<link rel="manifest" href="/manifest.json"/>
<link rel="alternate" type="application/ld+json" title="Iro AI machine-readable product feed" href="/iro.json"/>
<meta property="og:title" content="The Iro AI Blog"/>
<meta property="og:description" content="${esc(b.description)}"/>
<meta property="og:image" content="${D}${b.ogImage}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:url" content="${D}/blog"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Iro AI"/>
<meta property="og:locale" content="en_US"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="${cfg.twitterSite}"/>
<meta name="twitter:title" content="The Iro AI Blog"/>
<meta name="twitter:description" content="${esc(b.description)}"/>
<meta name="twitter:image" content="${D}${b.ogImage}"/>
${HEAD_ICONS}
<script type="application/ld+json">${jsonld(blogLd)}</script>
<script type="application/ld+json">${jsonld(breadcrumb)}</script>
<script type="application/ld+json">${jsonld(webpage)}</script>
<script type="application/ld+json">${jsonld(pillarsLd)}</script>
<style>${STYLE}</style>
${FONTS_CSS}
</head>
<body><div class="page">
${NAV}
<main>
<section class="hero">
<p class="eyebrow">${b.heroEyebrow}</p>
<h1>${b.heroTitle}</h1>
<p class="lede">${b.description}</p>
</section>
<section class="related">
<h2>${b.pillarsHeading}</h2>
<ul>${pillarCards}</ul>
</section>
<section class="content">
<ul class="posts-list">${postsList}</ul>
</section>
</main>
${FOOTER}
</div></body></html>
`;
}

// ---------- feeds ----------
function renderRss() {
  const last = posts.reduce((m, p) => (p.datePublished > m ? p.datePublished : m), posts[0].datePublished);
  const items = posts
    .map(
      (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${postUrl(p)}</link>
      <guid isPermaLink="true">${postUrl(p)}</guid>
      <pubDate>${rfc822(p.datePublished)}</pubDate>
      <dc:creator>Iro AI</dc:creator>
      <category>${xml(p.feedCategory)}</category>
      <description>${xml(p.description)}</description>
    </item>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Iro AI Blog</title>
    <link>${D}/blog</link>
    <description>${xml(cfg.blog.description)}</description>
    <language>en-US</language>
    <atom:link href="${D}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${rfc822(last)}</lastBuildDate>
    <generator>tryiro.com</generator>
    <copyright>${cfg.copyright}</copyright>
    <image>
      <url>${D}${cfg.blog.ogImage}</url>
      <title>Iro AI Blog</title>
      <link>${D}/blog</link>
    </image>
${items}
  </channel>
</rss>
`;
}

function renderAtom() {
  const last = posts.reduce((m, p) => (p.dateModified || p.datePublished) > m ? p.dateModified || p.datePublished : m, posts[0].datePublished);
  const entries = posts
    .map(
      (p) => `  <entry>
    <title>${xml(p.title)}</title>
    <id>${postUrl(p)}</id>
    <link href="${postUrl(p)}"/>
    <updated>${iso(p.dateModified || p.datePublished)}</updated>
    <published>${iso(p.datePublished)}</published>
    <author><name>Iro AI</name></author>
    <category term="${xml(p.feedCategory)}"/>
    <summary>${xml(p.lede)}</summary>
  </entry>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-US">
  <title>Iro AI Blog</title>
  <subtitle>${xml(cfg.blog.feedDescriptionShort)}</subtitle>
  <link rel="self" href="${D}/blog/atom.xml" type="application/atom+xml"/>
  <link rel="alternate" href="${D}/blog" type="text/html"/>
  <id>${D}/blog/atom.xml</id>
  <updated>${iso(last)}</updated>
  <rights>${cfg.copyright}</rights>
  <author><name>Iro AI</name><uri>${D}</uri></author>
  <icon>${D}${cfg.icons.favicon}</icon>
  <logo>${D}${cfg.icons.logo512}</logo>
${entries}
</feed>
`;
}

function renderJsonFeed() {
  const items = posts.map((p) => ({
    id: postUrl(p),
    url: postUrl(p),
    title: p.title,
    summary: p.lede,
    date_published: iso(p.datePublished),
    tags: p.feedTags,
  }));
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Iro AI Blog',
    home_page_url: D + '/blog',
    feed_url: D + '/blog/feed.json',
    description: cfg.blog.feedDescriptionShort,
    icon: D + cfg.icons.logo512,
    favicon: D + cfg.icons.favicon,
    language: 'en-US',
    authors: [{ name: 'Iro AI', url: D }],
    items,
  };
  return JSON.stringify(feed, null, 2) + '\n';
}

// ---------- sitemap ----------
function renderSitemap() {
  const entry = (loc, lastmod, freq, prio, imgLoc, imgTitle) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
    <image:image>
      <image:loc>${imgLoc}</image:loc>
      <image:title>${xml(imgTitle)}</image:title>
    </image:image>
  </url>`;
  const urls = [entry(D + '/blog', cfg.buildDate, 'weekly', '0.9', D + cfg.blog.ogImage, 'Iro AI Blog')];
  for (const p of pillars)
    urls.push(entry(pillarUrl(p), p.dateModified || cfg.buildDate, 'weekly', '0.88', p.ogImage || og(p.slug), p.title));
  for (const p of posts)
    urls.push(
      entry(postUrl(p), p.dateModified || p.datePublished, 'monthly', '0.85', p.ogImage || og(p.slug), p.title)
    );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
}

// ---------- LLM markdown mirrors ----------
function renderPostMd(post) {
  const url = postUrl(post);
  const kwArr = '[' + post.keywords.map((k) => JSON.stringify(k)).join(', ') + ']';
  const sections = post.sections.map((s) => `## ${s.heading}\n\n${blocksToMd(s.html)}`).join('\n\n');
  const faq = post.faq.map((f) => `**${f.q}**\n\n${stripTags(f.a)}`).join('\n\n');
  const readNext = post.readNext.map((r) => `- [${r.label}](${abs(r.href)})`).join('\n');
  return `---
title: "${post.title}"
canonical_url: "${url}"
site: "Iro AI"
site_url: "${D}"
app_store: "${cfg.appStoreUrl}"
language: en-US
keywords: ${kwArr}
date_published: "${post.datePublished}"
date_modified: "${post.dateModified || post.datePublished}"
reading_time_minutes: ${post.readingTime}
author: "Iro AI"
license: "${cfg.copyright}"
canonical_llm_reference: "${D}/llms-full.txt"
pillar: "${post.pillar || ''}"
---

# ${post.title}

> ${post.lede}

**Canonical:** ${url}
**Published:** ${post.datePublished}
**Reading time:** ~${post.readingTime} min

${sections}

## FAQ

${faq}

## Read next

${readNext}
`;
}

function renderPillarMd(pillar) {
  const url = pillarUrl(pillar);
  const kwArr = '[' + (pillar.keywords || []).map((k) => JSON.stringify(k)).join(', ') + ']';
  const intro = (pillar.intro || []).map((h) => blocksToMd(h)).join('\n\n');
  const list = pillar.posts.map((p) => `- [${p.title}](${postUrl(p)}) — ${p.description}`).join('\n');
  return `---
title: "${pillar.title}"
canonical_url: "${url}"
site: "Iro AI"
site_url: "${D}"
language: en-US
last_updated: "${pillar.dateModified || cfg.buildDate}"
keywords: ${kwArr}
author: "Iro AI"
license: "${cfg.copyright}"
type: "content-pillar"
---

# ${pillar.title}

> ${pillar.lede || pillar.description}

**Canonical:** ${url}
**Last updated:** ${pillar.dateModified || cfg.buildDate}

${intro}

## Posts in this pillar

${list}
`;
}

function renderIndexMd() {
  const list = posts.map((p) => `- [${p.title}](${postUrl(p)}) — ${p.description}`).join('\n');
  const pillarList = pillars.map((p) => `- [${p.title}](${pillarUrl(p)}) — ${p.tagline}`).join('\n');
  return `---
title: "The Iro AI blog"
canonical_url: "${D}/blog"
site: "Iro AI"
site_url: "${D}"
language: en-US
last_updated: "${cfg.buildDate}"
author: "Iro AI"
license: "${cfg.copyright}"
---

# The Iro AI blog

> ${cfg.blog.feedDescriptionShort}

**Canonical:** ${D}/blog
**Last updated:** ${cfg.buildDate}

## Pillars

${pillarList}

## Posts

${list}
`;
}

// ---------- write everything ----------
function write(rel, data) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, data);
  console.log('  wrote', rel);
}

console.log(`Iro AI blog engine — ${pillars.length} pillars, ${posts.length} posts`);
for (const post of posts) {
  if (!post.pillar || !pillarBySlug[post.pillar]) console.warn(`  ! post "${post.slug}" has unknown pillar "${post.pillar}"`);
  write(`blog/${post.slug}.html`, renderPost(post));
  write(`llms/blog/${post.slug}.md`, renderPostMd(post));
}
for (const pillar of pillars) {
  write(`blog/${pillar.slug}.html`, renderPillar(pillar));
  write(`llms/blog/${pillar.slug}.md`, renderPillarMd(pillar));
}
write('blog/index.html', renderIndex());
write('llms/blog/index.md', renderIndexMd());
write('blog/rss.xml', renderRss());
write('blog/atom.xml', renderAtom());
write('blog/feed.json', renderJsonFeed());
write('blog-sitemap.xml', renderSitemap());

// Keep clean-URL routing in sync: the site serves /blog/<slug> via explicit
// vercel.json rewrites (no cleanUrls). Warn about any slug missing a rewrite and
// write the full recommended block to dist/ for easy copy-paste.
try {
  const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  const sources = new Set((vercel.rewrites || []).map((r) => r.source));
  const slugs = [...pillars, ...posts].map((x) => x.slug);
  const missing = slugs.filter((s) => !sources.has(`/blog/${s}`));
  const rewrites = [
    { source: '/blog', destination: '/blog/index.html' },
    ...slugs.map((s) => ({ source: `/blog/${s}`, destination: `/blog/${s}.html` })),
  ];
  write('blog-engine/dist/vercel-blog-rewrites.json', JSON.stringify({ rewrites }, null, 2) + '\n');
  if (missing.length) {
    console.log('\n  ! vercel.json is missing /blog rewrites for:', missing.join(', '));
    console.log('    Add them from blog-engine/dist/vercel-blog-rewrites.json (or set "cleanUrls": true).');
  }
} catch {
  /* vercel.json optional */
}

// Report posts whose hero/OG image is missing so the image step can fill them.
const missing = [...pillars, ...posts].filter((x) => !fs.existsSync(path.join(ROOT, `assets/og/${x.slug}.png`)));
if (missing.length) {
  console.log('\n  Hero/OG images missing for:', missing.map((x) => x.slug).join(', '));
  console.log('  Run: node blog-engine/generate-hero-image.mjs');
}
console.log('\nDone.');

#!/usr/bin/env node
// One-time migration: parse the existing hand-built blog/*.html posts (plus the
// blog feeds) into the engine's standardized post JSON under content/posts/.
// Run once to bring legacy posts under the engine; after that, edit the JSON.
//
//   node blog-engine/import-existing.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'content/posts');
fs.mkdirSync(OUT, { recursive: true });

// Curated taxonomy that isn't expressible from the post HTML alone.
const ORDER = {
  'how-to-learn-chatgpt-in-2026': 1,
  'prompt-engineering-patterns': 2,
  'spot-ai-hallucinations': 3,
  'ai-agents-explained': 4,
  'best-free-ai-tools-2026': 5,
};
const PILLAR = {
  'how-to-learn-chatgpt-in-2026': 'ai-fluency',
  'prompt-engineering-patterns': 'prompt-engineering',
  'spot-ai-hallucinations': 'ai-fluency',
  'ai-agents-explained': 'ai-agents',
  'best-free-ai-tools-2026': 'ai-fluency',
};

const unesc = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const attr = (html, name) => {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`));
  return m ? unesc(m[1]) : null;
};
const prop = (html, name) => {
  const m = html.match(new RegExp(`<meta property="${name}" content="([^"]*)"`));
  return m ? unesc(m[1]) : null;
};

// Feed-only fields.
const rss = fs.readFileSync(path.join(ROOT, 'blog/rss.xml'), 'utf8');
const feedJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'blog/feed.json'), 'utf8'));
function feedCategory(url) {
  const block = rss.split('<item>').find((b) => b.includes(`<link>${url}</link>`));
  const m = block && block.match(/<category>([^<]*)<\/category>/);
  return m ? m[1] : 'AI fluency';
}
function feedTags(url) {
  const it = feedJson.items.find((i) => i.url === url);
  return it ? it.tags : [];
}

function parsePost(slug, html) {
  const url = `https://tryiro.com/blog/${slug}`;
  const title = html.match(/<h1>([\s\S]*?)<\/h1>/)[1].trim();
  const lede = html.match(/<p class="lede">([\s\S]*?)<\/p>/)[1].trim();
  const readingTime = Number((html.match(/~(\d+) min read/) || [])[1] || 0);

  // Table of contents (explicit entries authored on the page).
  const tocBlock = html.match(/<div class="toc">([\s\S]*?)<\/div>/)[1];
  const toc = [...tocBlock.matchAll(/<a href="([^"]+)">([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], label: m[2] }));

  // Content sections.
  const contentInner = html.match(/<div class="content">([\s\S]*?)<\/div>\s*<section class="related">/)[1];
  const inlineCtaAfter = (contentInner.split('<div class="cta-box">')[0].match(/<h2 id=/g) || []).length;
  const afterToc = contentInner.replace(/<div class="toc">[\s\S]*?<\/div>/, '');
  const noCta = afterToc.replace(/<div class="cta-box">[\s\S]*?<\/div><\/div>/g, '');
  const sections = [...noCta.matchAll(/<h2 id="([^"]*)">([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2 id=|$)/g)].map((m) => ({
    id: m[1],
    heading: m[2].trim(),
    html: m[3].trim(),
  }));

  // Read next.
  const relatedBlock = html.match(/<section class="related"><h2>Read next<\/h2><ul>([\s\S]*?)<\/ul>/)[1];
  const readNext = [...relatedBlock.matchAll(/<li><a href="([^"]+)">([\s\S]*?)<\/a><\/li>/g)].map((m) => ({
    href: m[1],
    label: m[2],
  }));

  // FAQ.
  const faqBlock = html.match(/<section class="faq"><h2>FAQ<\/h2>([\s\S]*?)<\/section>/)[1];
  const faq = [...faqBlock.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(
    (m) => ({ q: m[1], a: m[2] })
  );

  // Related (mentions + <link rel=related>), stored as site-relative paths.
  const related = [...html.matchAll(/<link rel="related" href="([^"]+)"\/>/g)].map((m) =>
    m[1].replace(/^https?:\/\/tryiro\.com/, '')
  );

  return {
    slug,
    order: ORDER[slug] || 99,
    pillar: PILLAR[slug] || null,
    title,
    lede,
    description: attr(html, 'description'),
    keywords: (attr(html, 'keywords') || '').split(',').map((s) => s.trim()).filter(Boolean),
    datePublished: attr(html, 'DC.date'),
    dateModified: (prop(html, 'article:modified_time') || '').slice(0, 10) || attr(html, 'DC.date'),
    readingTime,
    articleSection: prop(html, 'article:section') || 'AI fluency',
    feedCategory: feedCategory(url),
    feedTags: feedTags(url),
    inlineCtaAfter,
    toc,
    sections,
    readNext,
    faq,
    related,
  };
}

for (const slug of Object.keys(ORDER)) {
  const html = fs.readFileSync(path.join(ROOT, `blog/${slug}.html`), 'utf8');
  const post = parsePost(slug, html);
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(post, null, 2) + '\n');
  console.log('imported', slug, `(${post.sections.length} sections, ${post.faq.length} FAQ)`);
}
console.log('Done. Review content/posts/*.json, then run build.mjs.');

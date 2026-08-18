#!/usr/bin/env node
// Reverse-import the 8 orphaned blog posts (live HTML, but no engine JSON, so
// they are absent from the sitemap, blog index, feeds and llms/ mirrors) back
// into blog-engine/content/posts/*.json.
//
// Parses the engine's OWN output format so a rebuild round-trips byte-for-byte.
//   node rescue-orphans.mjs            # write JSON
//   node rescue-orphans.mjs --dry-run  # print a summary only

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'blog-engine/content/posts');

const SLUGS = [
  'ai-app-vs-ai-bootcamp',
  'ai-learning-app-for-professionals',
  'apps-like-duolingo-for-ai',
  'coursiv-vs-learnova',
  'does-duolingo-teach-ai',
  'how-to-choose-an-ai-learning-app',
  'how-to-use-ai-to-summarize-a-document',
  'how-to-use-ai-to-write-a-cover-letter',
];

const unesc = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const meta = (html, name) => {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`));
  return m ? unesc(m[1]) : null;
};
const prop = (html, name) => {
  const m = html.match(new RegExp(`<meta property="${name}" content="([^"]*)"`));
  return m ? unesc(m[1]) : null;
};

function parse(slug) {
  const file = path.join(ROOT, `blog/${slug}.html`);
  const html = fs.readFileSync(file, 'utf8');
  const problems = [];
  const need = (re, what) => {
    const m = html.match(re);
    if (!m) problems.push(`missing ${what}`);
    return m;
  };

  const title = need(/<h1>([\s\S]*?)<\/h1>/, 'h1')?.[1].trim();
  const lede = need(/<p class="lede">([\s\S]*?)<\/p>/, 'lede')?.[1].trim();
  const readingTime = Number((html.match(/~(\d+) min read/) || [])[1] || 0);

  // Key takeaways (GEO block).
  const takeBlock = html.match(/<aside class="key-takeaways"[^>]*><h2>Key takeaways<\/h2><ul>([\s\S]*?)<\/ul><\/aside>/);
  const keyTakeaways = takeBlock ? [...takeBlock[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1]) : [];

  const disclosure = /<p class="disclosure">/.test(html);

  // Table of contents.
  const tocBlock = need(/<div class="toc"><strong>In this post<\/strong>([\s\S]*?)<\/div>/, 'toc');
  const toc = tocBlock
    ? [...tocBlock[1].matchAll(/<a href="([^"]+)">([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], label: m[2] }))
    : [];

  // Body: everything inside <div class="content">…</div> up to the Read next block.
  const contentBlock = need(
    /<div class="content">\n([\s\S]*?)\n<\/div>\n<section class="related"><h2>Read next<\/h2>/,
    'content'
  );
  const content = contentBlock ? contentBlock[1] : '';

  // Where does the inline CTA sit? The engine emits it after section index
  // (inlineCtaAfter - 1), so count the h2s that precede the first cta-box.
  const beforeFirstCta = content.split('<div class="cta-box">')[0];
  const inlineCtaAfter = (beforeFirstCta.match(/<h2 id=/g) || []).length;

  // Strip both CTA boxes, then split into sections on the h2 anchors.
  const body = content.replace(/<div class="cta-box">[\s\S]*?<\/div><\/div>/g, '');
  const sections = [...body.matchAll(/<h2 id="([^"]*)">([\s\S]*?)<\/h2>\s*([\s\S]*?)(?=<h2 id=|$)/g)].map((m) => ({
    id: m[1],
    heading: m[2].trim(),
    html: m[3].trim(),
  }));
  if (!sections.length) problems.push('no sections parsed');

  // Read next.
  const rnBlock = need(/<section class="related"><h2>Read next<\/h2><ul>([\s\S]*?)<\/ul><\/section>/, 'readNext');
  const readNext = rnBlock
    ? [...rnBlock[1].matchAll(/<li><a href="([^"]+)">([\s\S]*?)<\/a><\/li>/g)].map((m) => ({ href: m[1], label: m[2] }))
    : [];

  // FAQ.
  const faqBlock = need(/<section class="faq"><h2>FAQ<\/h2>([\s\S]*?)<\/section>/, 'faq');
  const faq = faqBlock
    ? [...faqBlock[1].matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map((m) => ({
        q: m[1],
        a: m[2],
      }))
    : [];

  // Related (<link rel="related">), stored site-relative like the engine expects.
  // Curated schema.org names live in the JSON-LD `mentions` array; the engine
  // otherwise title-cases the slug ("Blog/Coursiv Alternatives"), which is worse.
  const mentionNames = new Map(
    [...html.matchAll(/\{"@type": "Thing", "name": "([^"]*)", "url": "([^"]*)"\}/g)].map((m) => [
      unesc(m[2]).replace(/^https?:\/\/tryiro\.com/, ''),
      unesc(m[1]),
    ])
  );
  const related = [...html.matchAll(/<link rel="related" href="([^"]+)"\/>/g)]
    .map((m) => m[1].replace(/^https?:\/\/tryiro\.com/, ''))
    .map((href) => {
      const label = mentionNames.get(href);
      // Keep the bare string when the label is just the title-cased slug.
      const derived = href
        .replace(/^\//, '')
        .split('/')
        .map((seg) => seg.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
        .join('/');
      return !label || label === derived ? href : { href, label };
    });

  // Ask-AI block: recover the pre-filled prompt from the first chip's href.
  const askAi = /class="askai-chip"/.test(html);
  let askAiPrompt = null;
  if (askAi) {
    const chip = html.match(/class="askai-chip" href="[^"]*?[?&]q=([^"&]+)"/);
    if (chip) askAiPrompt = decodeURIComponent(chip[1]);
    else problems.push('askAi block present but prompt not recoverable');
  }

  // Pillar, from the byline chip the engine appends after the reading time.
  const pillarM = html.match(/~\d+ min read<\/span><span><a href="\/blog\/([a-z0-9-]+)">/);
  const pillar = pillarM ? pillarM[1] : null;

  // Non-default hero image (engine default is /assets/og/<slug>.png).
  const heroM = html.match(/<img class="hero-img" src="([^"]+)"/);
  const heroImage = heroM && heroM[1] !== `/assets/og/${slug}.png` ? heroM[1] : undefined;

  // The <title> is keyword-led and often differs from the visible <h1>; the
  // JSON-LD headline can differ again. Preserve both when they are distinct.
  const titleTag = (html.match(/<title>([\s\S]*?) \| Iro AI Blog<\/title>/) || [])[1];
  const metaTitle = titleTag && unesc(titleTag) !== title ? unesc(titleTag) : undefined;
  const headlineM = (html.match(/"headline": "((?:[^"\\]|\\.)*)"/) || [])[1];
  const headline = headlineM && JSON.parse('"' + headlineM + '"') !== title ? JSON.parse('"' + headlineM + '"') : undefined;
  // JSON-LD carries the real dateModified; the meta tag on these hand-edited
  // pages was left at the published date.
  const ldModified = (html.match(/"dateModified": "([^"]*)"/) || [])[1];

  const post = {
    slug,
    order: 99,
    pillar,
    title,
    ...(metaTitle ? { metaTitle } : {}),
    ...(headline ? { headline } : {}),
    lede,
    keyTakeaways,
    description: meta(html, 'description'),
    keywords: (meta(html, 'keywords') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    datePublished: meta(html, 'DC.date'),
    dateModified: ldModified || (prop(html, 'article:modified_time') || '').slice(0, 10) || meta(html, 'DC.date'),
    readingTime,
    articleSection: prop(html, 'article:section') || 'AI fluency',
    inlineCtaAfter,
    toc,
    sections,
    readNext,
    faq,
    related,
  };
  if (disclosure) post.disclosure = true;
  if (askAi) {
    post.askAi = true;
    if (askAiPrompt) post.askAiPrompt = askAiPrompt;
  }
  if (heroImage) post.heroImage = heroImage;

  return { post, problems };
}

const dry = process.argv.includes('--dry-run');
let bad = 0;
for (const slug of SLUGS) {
  const { post, problems } = parse(slug);
  if (problems.length) {
    bad++;
    console.log(`! ${slug}: ${problems.join('; ')}`);
  }
  console.log(
    `  ${slug.padEnd(38)} ${String(post.sections.length).padStart(2)} sections, ${String(post.faq.length).padStart(
      2
    )} FAQ, ${String(post.keyTakeaways.length).padStart(2)} takeaways, cta@${post.inlineCtaAfter}, pillar=${post.pillar}`
  );
  if (!dry) fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(post, null, 2) + '\n');
}
console.log(dry ? '\n--dry-run: nothing written.' : `\nWrote ${SLUGS.length} JSON specs. ${bad} with warnings.`);

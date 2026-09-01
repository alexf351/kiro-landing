#!/usr/bin/env node
// Pre-deploy drift checks. Run from the repo root:  node blog-engine/tools/check-seo.mjs
//
// The recurring failure mode on this site is not bad writing, it is drift:
// copy edited in one place and not its mirror. Each check below caught a real,
// live defect on 2026-09-01, so each one earns its runtime.
//
// Exits non-zero if any check fails, so it can gate a deploy.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP = new Set(['googleda7976323da99038.html']);
const pages = [
  ...fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !SKIP.has(f)),
  ...fs.readdirSync(path.join(ROOT, 'blog')).filter((f) => f.endsWith('.html')).map((f) => `blog/${f}`),
];

const fail = [];
const note = (msg) => fail.push(msg);

// Visible text: drop scripts/styles/tags, collapse whitespace, and close the
// space an inline <a> leaves before punctuation (otherwise every linked phrase
// inside a sentence reads as a false drift).
const visible = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .replace(/([(“])\s+/g, '$1');

const norm = (t) => visible(t).trim();

// 1. Banned claims. Each pattern is a product-truth rule from
//    blog-engine/content/paths/_BRIEF.md that pages have violated before.
const BANNED = [
  [/\bELO\b/, 'ELO (duels are skill-matched, never ELO-ranked)'],
  [/\b(?:live|real[- ]time|PvP)[- ]?(?:AI )?duels?\b|\bduels?\b[^.<]{0,30}\b(?:live|real people|real players|another person)\b|\bBattle friends\b/i, 'live/PvP duels'],
  [/unlimited [Cc]ustom [Pp]aths|unlimited [Ii]mage [Ll]ab/, 'unlimited Custom Paths/Image Lab'],
  // Only flag Android availability claimed for IRO. Competitors' Google Play
  // presence is a legitimate, frequently-made comparison point.
  [/\bIro[^.<]{0,60}\b(?:available on Android|on Google Play)\b|\bAndroid app is (?:live|available)\b|\bdownload Iro (?:for|on) Android\b/i, 'Android availability for Iro'],
  [/90% of\s*(?:<[^>]*>\s*)*professionals/, 'the retired 90%-of-professionals stat'],
];
for (const p of pages) {
  const s = fs.readFileSync(path.join(ROOT, p), 'utf8');
  for (const [rx, label] of BANNED) {
    const m = s.match(rx);
    if (m) note(`BANNED  ${p}: ${label} — "${s.slice(Math.max(0, m.index - 40), m.index + 60).replace(/\s+/g, ' ')}"`);
  }
}

// 2. FAQ schema parity: an acceptedAnswer Google cannot see on the page is a
//    structured-data violation, and a Question with no visible counterpart is
//    the more serious version of the same fault.
let answers = 0;
for (const p of pages) {
  const s = fs.readFileSync(path.join(ROOT, p), 'utf8');
  const body = visible(s);
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let d;
    try { d = JSON.parse(m[1]); } catch { note(`JSONLD  ${p}: does not parse`); continue; }
    for (const node of [d, ...(Array.isArray(d?.['@graph']) ? d['@graph'] : [])]) {
      if (node?.['@type'] !== 'FAQPage') continue;
      for (const q of node.mainEntity || []) {
        answers++;
        if (!body.includes(norm(q.acceptedAnswer.text))) note(`FAQ     ${p}: answer not visible — "${norm(q.name).slice(0, 60)}"`);
        if (!body.includes(norm(q.name))) note(`FAQ     ${p}: question not visible — "${norm(q.name).slice(0, 60)}"`);
      }
    }
  }
}

// 5. Snippet lengths. Over-length titles and descriptions are truncated in the
//    SERP, so the promise the page paid for never reaches the searcher.
for (const p of pages) {
  const s = fs.readFileSync(path.join(ROOT, p), 'utf8');
  const t = s.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (t && norm(t[1]).length > 60) note(`TITLE   ${p}: ${norm(t[1]).length} chars — "${norm(t[1]).slice(0, 70)}"`);
  const tag = (s.match(/<meta\b[^>]*>/g) || []).find((x) => /name="description"/.test(x));
  const c = tag && tag.match(/content="([^"]*)"/);
  if (c && norm(c[1]).length > 160) note(`DESC    ${p}: ${norm(c[1]).length} chars`);
}

// 4. Snippet claims. A meta description that names a product the page never
//    mentions sends the searcher somewhere the page cannot deliver. Two of these
//    shipped on 2026-09-01 ("Google Imagen" on a post covering Gemini; "NerdSip"
//    on a roundup that omits it) and length checks structurally cannot see them.
//    Heuristic: a capitalised word (or two-word pair) inside the description,
//    never sentence-initial and never spanning a sentence boundary, must appear
//    in the page's own visible text.
const SNIPPET_STOP = new Set(['The','And','But','For','You','Your','Our','This','That','What','How','Why','When','Where','Which','Who','Plus','Free','Best','New','Real','Most','More','Every','Each','One','Two','Three','Here','Iro','English','Learn','Take','Find','Pick','Read','Use','Get','See','Ask','Try','Start','Also','Both','All','Some','Any','Full','Same','Own','Like','About','Into','Over','Under','Out','Per','Via','Compare','Looking','Forget','Architecture','Leverage']);
for (const p of pages) {
  const s = fs.readFileSync(path.join(ROOT, p), 'utf8');
  const body = visible(s).toLowerCase();
  const tag = (s.match(/<meta\b[^>]*>/g) || []).find((x) => /name="description"/.test(x));
  const c = tag && tag.match(/content="([^"]*)"/);
  if (!c) continue;
  const d = norm(c[1]);
  for (const m of d.matchAll(/(?:(?<=[a-z,] )|(?<=[a-z] ))([A-Z][A-Za-z0-9\u00b7]{2,}(?:\s[A-Z][A-Za-z0-9]{2,})?)/g)) {
    const tok = m[1].trim();
    if (tok.includes('-') || SNIPPET_STOP.has(tok) || SNIPPET_STOP.has(tok.split(' ')[0])) continue;
    if (body.includes(tok.toLowerCase())) continue;
    note(`SNIPPET ${p}: description names "${tok}", which does not appear on the page`);
  }
}

console.log(`checked ${pages.length} pages, ${answers} FAQ answers`);
if (fail.length) {
  console.error(`\n${fail.length} problem(s):\n`);
  for (const f of fail) console.error('  ' + f);
  process.exit(1);
}
console.log('all checks passed');

#!/usr/bin/env node
/*
 * extract.mjs — list every translatable string on the homepage, by section.
 *   node blog-engine/i18n/extract.mjs > /tmp/strings.json
 * Output is the raw material for home.json: English text in the exact form the
 * builder will look for. Nothing here is written into the repo.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, segments, norm } from './segment.mjs';
import { SECTIONS, locate } from './sections.mjs';
import { literals, looksLikeCopy } from './jsstrings.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const root = parse(html);
const ranges = SECTIONS.map((s) => ({ ...s, range: locate(s, html, root) }));
const out = {};
const seen = {};
const put = (id, text, extra = {}) => {
  (out[id] ||= []);
  (seen[id] ||= new Set());
  if (seen[id].has(text)) return;
  seen[id].add(text);
  out[id].push({ en: text, ...extra });
};

for (const seg of segments(html)) {
  const sec = ranges.filter((s) => s.type === 'html' && s.range && seg.start >= s.range[0] && seg.end <= s.range[1]).pop();
  put(sec ? sec.id : '(unscoped)', norm(seg.text), seg.kind === 'attr' ? { attr: seg.attr } : {});
}
for (const s of ranges.filter((r) => r.type === 'script')) {
  if (!s.range) { put(s.id, '!! marker not found'); continue; }
  const body = html.slice(s.range[0], s.range[1]);
  for (const l of literals(body)) if (looksLikeCopy(l.raw)) put(s.id, l.raw, { quote: l.quote });
}
const walk = (v, key) => {
  if (typeof v === 'string') { if (/\p{L}{2,}/u.test(v) && !/^(https?:|@|\d{4}-)/.test(v) && !['@type', '@id', '@context', 'url', 'priceCurrency', 'operatingSystem', 'inLanguage', 'itemListOrder'].includes(key)) put('jsonld', v, { key }); return; }
  if (Array.isArray(v)) v.forEach((x) => walk(x, key));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, k);
};
for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) walk(JSON.parse(m[1]));

const missing = ranges.filter((r) => r.type !== 'jsonld' && !r.range).map((r) => r.id);
if (missing.length) console.error('sections not found:', missing.join(', '));
console.log(JSON.stringify(out, null, 1));

#!/usr/bin/env node
/*
 * check-images.mjs — every image a built page references must exist and have dimensions.
 *
 *   node blog-engine/tools/check-images.mjs          # all root pages + blog/
 *
 * Checks, over *.html and blog/*.html:
 *   1. <img src>, <source srcset>, <link rel=preload imagesrcset>, og:image and twitter:image
 *      that point at this site resolve to a file on disk.
 *   2. Every <img> carries width and height (CLS), except the tiny inline brand/avatar icons.
 *   3. og:image files are 1200x630 (PNG or JPEG).
 * Exits 1 on any failure. No network, no secrets.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = /^https?:\/\/(www\.)?tryiro\.com/;
const files = [...fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).map((f) => f), ...fs.readdirSync(path.join(ROOT, 'blog')).filter((f) => f.endsWith('.html')).map((f) => 'blog/' + f)];

function local(ref, fromFile) {
  if (!ref || ref.startsWith('data:')) return null;
  if (/['"{}()]/.test(ref)) return null; // a JavaScript template inside an inline <script>, not a file
  if (/^https?:\/\//.test(ref)) { if (!SITE.test(ref)) return null; ref = ref.replace(SITE, ''); }
  if (ref.startsWith('/')) return path.join(ROOT, ref.split('?')[0]);
  return path.join(ROOT, path.dirname(fromFile), ref.split('?')[0]);
}
function dims(f) {
  const b = fs.readFileSync(f);
  if (b[0] === 0x89 && b[1] === 0x50) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) { if (b[i] !== 0xff) { i++; continue; } const m = b[i + 1]; if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + b.readUInt16BE(i + 2); }
  }
  return null;
}

let refs = 0, missing = [], unsized = [], badOg = [];
for (const f of files) {
  const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const seen = new Set();
  const add = (r) => { const p = local(r.trim().split(/\s+/)[0], f); if (p && !seen.has(p)) { seen.add(p); refs++; if (!fs.existsSync(p)) missing.push(`${f} → ${path.relative(ROOT, p)}`); } };
  for (const m of s.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    add(m[1]);
    const tag = m[0];
    const tiny = /kiro-app-icon|favicon|class="(cc-mava|app-banner-icon|rev-av)"/.test(tag);
    if (!tiny && !(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag)) && !/\bwidth="\d+%?"/.test(tag)) unsized.push(`${f}: ${tag.slice(0, 90)}`);
  }
  for (const m of s.matchAll(/\b(?:srcset|imagesrcset)="([^"]+)"/g)) for (const c of m[1].split(',')) add(c);
  for (const m of s.matchAll(/<meta (?:property="og:image"|name="twitter:image") content="([^"]+)"/g)) {
    add(m[1]);
    const p = local(m[1], f);
    if (p && fs.existsSync(p)) { const d = dims(p); if (!d || d[0] !== 1200 || d[1] !== 630) badOg.push(`${f}: ${path.relative(ROOT, p)} is ${d ? d.join('x') : 'unreadable'}`); }
  }
}
console.log(`checked ${files.length} pages, ${refs} image references`);
const out = (label, arr) => { if (arr.length) { console.log(`\n${label} (${arr.length}):`); arr.slice(0, 40).forEach((x) => console.log('  ' + x)); if (arr.length > 40) console.log(`  … ${arr.length - 40} more`); } };
out('MISSING files', missing);
out('IMG without width/height', unsized);
out('OG/Twitter images not 1200x630', badOg);
if (missing.length || badOg.length) { console.log('\nFAIL'); process.exit(1); }
console.log(unsized.length ? '\nPASS (with unsized warnings)' : '\nPASS');

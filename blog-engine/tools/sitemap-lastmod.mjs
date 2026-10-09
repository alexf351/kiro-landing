#!/usr/bin/env node
// Recompute <lastmod> for the hand-authored entries in sitemap.xml (everything
// outside the PATHS block, which build-paths.mjs owns) and for each child
// sitemap in sitemap-index.xml, from git history.
//
//   node blog-engine/tools/sitemap-lastmod.mjs          rewrite the dates
//   node blog-engine/tools/sitemap-lastmod.mjs --check  report, write nothing
//
// A page's lastmod is the commit date of the last change to its VISIBLE BODY
// TEXT: <head>, <script>, <style>, <header>, <nav>, <footer> and the shared
// download banner are stripped before comparing, so a sitewide nav, analytics
// or footer sweep does not make every page look freshly edited. If the page
// declares a later JSON-LD dateModified, that wins, so the sitemap never
// contradicts the page. An uncommitted body change counts as today.
//
// A child sitemap's lastmod in sitemap-index.xml is the newest <lastmod> it
// contains.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const CHECK = process.argv.includes('--check');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 });
const today = new Date().toLocaleDateString('en-CA');

function bodyText(html) {
  return html
    .replace(/<head[\s>][\s\S]*?<\/head>/gi, ' ')
    .replace(/<(script|style|header|nav|footer)[\s>][\s\S]*?<\/\1>/gi, ' ')
    .replace(/<aside class="iro-banner"[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function show(rev, file) {
  try { return git('show', `${rev}:${file}`); } catch { return null; }
}
function declaredModified(html) {
  const m = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '';
}
function contentDate(file) {
  const cur = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const head = show('HEAD', file);
  if (head === null || bodyText(head) !== bodyText(cur)) return today;
  const log = git('log', '--no-merges', '--format=%H %cs', '--', file).trim().split('\n').filter(Boolean);
  for (const line of log) {
    const [sha, date] = line.split(' ');
    const after = show(sha, file);
    const before = show(`${sha}^`, file);
    if (after === null) continue;
    if (before === null || bodyText(before) !== bodyText(after)) return date;
  }
  return log.length ? log[log.length - 1].split(' ')[1] : today;
}
function fileFor(loc) {
  const p = loc.replace(/^https:\/\/tryiro\.com\/?/, '');
  for (const f of [p ? `${p}.html` : 'index.html', `${p}/index.html`]) if (fs.existsSync(path.join(ROOT, f))) return f;
  return null;
}

const smFile = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smFile, 'utf8');
const a = sm.indexOf('<!-- PATHS:START -->');
const b = sm.indexOf('<!-- PATHS:END -->');
const owned = (i) => a !== -1 && i > a && i < b;
let changed = 0;
sm = sm.replace(/(<url>\s*<loc>)([^<]+)(<\/loc>\s*<lastmod>)([^<]+)(<\/lastmod>)/g, (all, p1, loc, p3, old, p5, off) => {
  if (owned(off)) return all;
  const f = fileFor(loc);
  if (!f) { console.warn(`  no file for ${loc}, left ${old}`); return all; }
  const c = contentDate(f);
  const d = declaredModified(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  const next = d > c ? d : c;
  if (next !== old) { changed++; console.log(`  ${loc.padEnd(52)} ${old} -> ${next}`); }
  return p1 + loc + p3 + next + p5;
});
if (!CHECK) fs.writeFileSync(smFile, sm);

const idxFile = path.join(ROOT, 'sitemap-index.xml');
let idx = fs.readFileSync(idxFile, 'utf8');
idx = idx.replace(/(<loc>https:\/\/tryiro\.com\/([^<]+)<\/loc>\s*<lastmod>)([^<]+)(<\/lastmod>)/g, (all, p1, name, old, p4) => {
  const f = path.join(ROOT, name);
  const src = name === 'sitemap.xml' ? sm : fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
  const dates = [...src.matchAll(/<lastmod>(\d{4}-\d{2}-\d{2})/g)].map((m) => m[1]);
  // A child with no dated entries (the news sitemap is often empty by design)
  // takes the date its file last changed in git.
  const next = dates.length ? dates.sort().pop() : (git('log', '-1', '--format=%cs', '--', name).trim() || old);
  if (next !== old) { changed++; console.log(`  index: ${name.padEnd(45)} ${old} -> ${next}`); }
  return p1 + next + p4;
});
if (!CHECK) fs.writeFileSync(idxFile, idx);
console.log(`sitemap-lastmod: ${changed} date(s) ${CHECK ? 'would change' : 'updated'}`);

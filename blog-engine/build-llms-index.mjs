#!/usr/bin/env node
// Regenerate the markdown-mirror sections of llms-index.txt from what is
// actually on disk.
//
//   node blog-engine/build-llms-index.mjs
//
// llms-index.txt is the discovery file AI crawlers read to find every
// machine-readable copy of the site. It was hand-maintained, so it drifted: it
// listed 33 of 59 root mirrors and 13 of 101 blog mirrors. Everything between
// the MIRRORS markers is now generated; the rest of the file stays hand-written.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'lib/site.config.json'), 'utf8'));
const D = cfg.domain;
const FILE = path.join(ROOT, 'llms-index.txt');
const START = '## Markdown mirrors (LLM-friendly clean text)';
const END = '## Support and policy';
const COL = 30; // label column width, matching the rest of the file

// A short human label for the URL column. Prefer the mirror's own title, minus
// the brand suffix; fall back to the slug.
function label(file, slug) {
  let t = '';
  const m = fs.readFileSync(file, 'utf8').match(/^title:\s*"?(.*?)"?\s*$/m);
  if (m) t = m[1];
  t = t
    .replace(/\s*\|\s*Iro AI( Blog)?\s*$/i, '')
    .replace(/^The\s+/i, '')
    .trim();
  // Titles are usually "Topic: promise" — the topic alone is the better label.
  const colon = t.indexOf(':');
  if (colon > 6) t = t.slice(0, colon);
  t = t.replace(/[\s.,:;?!—-]+$/, '').trim();
  if (!t) t = slug.replace(/-/g, ' ');
  t = t.toLowerCase();
  // Fall back to the slug when the trimmed title still overflows the column;
  // a whole slug reads better than a sentence chopped mid-clause.
  if (t.length > COL - 2) {
    const fromSlug = slug.replace(/-/g, ' ');
    t = fromSlug.length <= COL - 2 ? fromSlug : fromSlug.slice(0, COL - 2).trim();
  }
  return t;
}

function rows(dir, urlPrefix) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      return `${label(path.join(abs, f), slug).padEnd(COL)}${D}${urlPrefix}/${f}`;
    });
}

const rootRows = rows('llms', '/llms');
const blogRows = rows('llms/blog', '/llms/blog');

const block = [
  START,
  `# ${rootRows.length} page mirrors, generated — see blog-engine/build-llms-index.mjs`,
  ...rootRows,
  '',
  '## Blog (markdown mirrors)',
  `# ${blogRows.length} post and pillar mirrors, generated`,
  ...blogRows,
  '',
].join('\n');

const src = fs.readFileSync(FILE, 'utf8');
const s = src.indexOf(START);
const e = src.indexOf(END);
if (s === -1 || e === -1 || e < s) {
  console.error(`Could not find the mirror block between "${START}" and "${END}".`);
  process.exit(1);
}

const today = new Date(fs.statSync(path.join(ROOT, 'llms')).mtime).toISOString().slice(0, 10);
let out = src.slice(0, s) + block + '\n' + src.slice(e);
out = out.replace(/^# Last updated: .*$/m, `# Last updated: ${cfg.buildDate || today}`);
fs.writeFileSync(FILE, out);
console.log(`llms-index: listed ${rootRows.length} page mirrors + ${blogRows.length} blog mirrors`);

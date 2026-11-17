#!/usr/bin/env node
// Branded Iro covers: one 1200x630 PNG per post or page, written to
// assets/og/<slug>.png. That one file is both the og:image / twitter:image and,
// for posts without their own hero art, the on-page cover, so no HTML changes
// are needed after a render.
//
// The cover is an HTML template (site fonts, navy/cyan brand, the real app icon)
// rendered with headless Chromium, so no image API or key is involved.
//
//   node blog-engine/tools/branded-covers.mjs --latest 10          # 10 newest posts
//   node blog-engine/tools/branded-covers.mjs ai-learning-statistics brilliant-alternatives
//   node blog-engine/tools/branded-covers.mjs --all                # every post + page
//   node blog-engine/tools/branded-covers.mjs --preview <slug>     # write HTML only, no PNG
//
// Posts that already have AI hero art (post.hero / post.ogImage) are skipped:
// their og:image is that art, not assets/og/<slug>.png.
//
// Setup (once, outside the repo so nothing lands in package.json):
//   mkdir -p ~/.iro-covers && cd ~/.iro-covers && npm i puppeteer-core@23 @sparticuz/chromium@131
//   export COVER_DEPS=~/.iro-covers
// On a Mac you can skip @sparticuz/chromium and point CHROME_PATH at Chrome:
//   export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
//
// Copy, eyebrows and pages that are not blog posts live in blog-engine/covers.json.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENGINE = path.resolve(__dirname, '..');
const ROOT = path.resolve(ENGINE, '..');
const OG_DIR = path.join(ROOT, 'assets/og');
const FONTS = path.join(ROOT, 'assets/fonts');
const ICON = path.join(ROOT, 'assets/kiro-app-icon-512.png');
const cfg = JSON.parse(fs.readFileSync(path.join(ENGINE, 'covers.json'), 'utf8'));

// ---------- inputs ----------
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const latestIdx = args.indexOf('--latest');
const latestN = latestIdx >= 0 ? Number(args[latestIdx + 1]) : 0;
const slugsArg = args.filter((a, i) => !a.startsWith('--') && !(latestIdx >= 0 && i === latestIdx + 1));
const PREVIEW = flag('--preview');

const readDir = (d) =>
  fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8'))) : [];
const pillars = Object.fromEntries(readDir(path.join(ENGINE, 'content/pillars')).map((p) => [p.slug, p]));
const posts = readDir(path.join(ENGINE, 'content/posts')).filter((p) => !p.draft);
posts.sort((a, b) => String(b.datePublished || '').localeCompare(String(a.datePublished || '')) || a.slug.localeCompare(b.slug));
const bySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

function eyebrowFor(p) {
  const s = p.slug;
  const t = p.title.toLowerCase();
  if (/alternatives/.test(s)) return 'Alternatives';
  if (/-review$/.test(s)) return 'Review';
  if (/-vs-/.test(s) || / vs\.? /.test(t) || /compared/.test(t)) return 'Comparison';
  if (/^best-/.test(s)) return "Buyer's guide";
  if (/exercises|challenge|practice/.test(s)) return 'Practice';
  if (/^how-to/.test(s)) return 'How-to guide';
  // Pillar titles run long ("AI tools in 2026: pick one, then use it well"), so
  // the eyebrow uses the pillar's slug: ai-tools -> "AI tools".
  if (p.pillar && pillars[p.pillar]) {
    const words = p.pillar.split('-');
    return words.map((w, i) => (w === 'ai' ? 'AI' : i ? w : w[0].toUpperCase() + w.slice(1))).join(' ');
  }
  return 'Iro blog';
}

function coverFor(slug) {
  const o = cfg.overrides[slug] || {};
  if (cfg.pages[slug]) return { slug, ...cfg.pages[slug], ...o };
  const p = bySlug[slug];
  if (!p) throw new Error(`No post or page called "${slug}" (add pages to blog-engine/covers.json)`);
  if (p.hero || p.ogImage) return null; // has its own art
  const i = p.title.indexOf(': ');
  const title = i > 0 ? p.title.slice(0, i) : p.title;
  const sub = i > 0 ? p.title.slice(i + 2) : '';
  return { slug, eyebrow: eyebrowFor(p), title, sub: sub ? sub[0].toUpperCase() + sub.slice(1) : '', ...o };
}

let slugs = [...slugsArg];
if (latestN) slugs.push(...posts.filter((p) => !p.hero && !p.ogImage).slice(0, latestN).map((p) => p.slug));
if (flag('--all')) slugs.push(...Object.keys(cfg.pages), ...posts.map((p) => p.slug));
slugs = [...new Set(slugs)];
if (!slugs.length) {
  console.error('Nothing to render. Pass slugs, --latest N or --all.');
  process.exit(1);
}

// ---------- template ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const font = (fam, file, w) =>
  `@font-face{font-family:'${fam}';font-weight:${w};src:url('${pathToFileURL(path.join(FONTS, file)).href}') format('woff2')}`;
const FONT_CSS = [
  font('Geist', 'geist-v5-latin.woff2', '400 900'),
  font('Outfit', 'outfit-v15-latin.woff2', '400 800'),
  font('JetBrains Mono', 'jetbrains-mono-v24-latin.woff2', '400 700'),
].join('\n');

function html(c) {
  const icon = pathToFileURL(ICON).href;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#0A0E1A}
.c{position:relative;width:1200px;height:630px;overflow:hidden;
  background:
    radial-gradient(620px 420px at 6% -8%,rgba(0,229,255,.20),transparent 70%),
    radial-gradient(520px 520px at 86% 52%,rgba(255,138,30,.24),transparent 68%),
    linear-gradient(160deg,#0D1324 0%,#0A0E1A 55%,#070A13 100%);
  font-family:'Outfit',sans-serif;color:#fff}
.grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
  background-size:48px 48px;
  -webkit-mask-image:radial-gradient(900px 600px at 30% 40%,#000 30%,transparent 80%)}
.copy{position:absolute;left:72px;top:64px;bottom:60px;width:650px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:'Geist',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.01em}
.brand img{width:46px;height:46px;border-radius:12px;border:1px solid rgba(255,255,255,.14)}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding:6px 0 10px}
.eyebrow{display:inline-flex;align-self:flex-start;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:20px;
  letter-spacing:.14em;text-transform:uppercase;color:#00E5FF;margin-bottom:22px;white-space:nowrap}
.eyebrow:before{content:'';width:34px;height:4px;border-radius:2px;background:#00E5FF;box-shadow:0 0 14px rgba(0,229,255,.7)}
h1{font-family:'Geist',sans-serif;font-weight:800;letter-spacing:-.035em;line-height:1.04;color:#fff;font-size:76px}
.sub{font-weight:500;color:#C9D2EA;line-height:1.3;font-size:30px;margin-top:20px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.foot{display:flex;align-items:center;gap:14px;font-family:'JetBrains Mono',monospace;font-size:20px;color:#8B95B0;letter-spacing:.02em}
.foot b{color:#fff;font-weight:700}
.foot i{width:6px;height:6px;border-radius:50%;background:#FF8A1E;display:inline-block}
.mascot{position:absolute;right:66px;top:50%;width:360px;height:360px;transform:translateY(-50%)}
.mascot:before{content:'';position:absolute;inset:-26px;border-radius:104px;
  background:conic-gradient(from 210deg,rgba(0,229,255,.55),rgba(255,138,30,.65),rgba(0,229,255,.15),rgba(0,229,255,.55));
  filter:blur(26px);opacity:.75}
.mascot img{position:relative;display:block;width:360px;height:360px;border-radius:82px;
  border:2px solid rgba(255,255,255,.16);box-shadow:0 30px 70px rgba(0,0,0,.6)}
</style></head><body><div class="c"><div class="grid"></div>
<div class="copy">
  <div class="brand"><img src="${icon}" alt="">Iro AI</div>
  <div class="mid">
    <div class="eyebrow">${esc(c.eyebrow || 'Iro blog')}</div>
    <h1 id="h">${esc(c.title)}</h1>
    ${c.sub ? `<p class="sub" id="s">${esc(c.sub)}</p>` : ''}
  </div>
  <div class="foot"><b>tryiro.com</b><i></i><span>Learn AI in 5 minutes a day</span></div>
</div>
<div class="mascot"><img src="${icon}" alt=""></div>
</div></body></html>`;
}

// Shrink the headline until it fits: at most 3 lines (2 when there is a subline)
// and the middle block stays inside its box. Returns what it settled on.
const FIT = () => {
  const h = document.getElementById('h');
  const s = document.getElementById('s');
  const mid = document.querySelector('.mid');
  const maxLines = s ? 2 : 3;
  let size = 76;
  const lines = () => Math.round(h.getBoundingClientRect().height / (size * 1.04));
  const fits = () => lines() <= maxLines && mid.scrollHeight <= mid.clientHeight + 1;
  h.style.fontSize = size + 'px';
  while (!fits() && size > 40) { size -= 2; h.style.fontSize = size + 'px'; }
  if (s && !fits()) { s.style.fontSize = '26px'; }
  const subClipped = s ? s.scrollHeight > s.clientHeight + 1 : false;
  return { size, lines: lines(), fits: fits(), subClipped };
};

// ---------- render ----------
async function browser() {
  const base = process.env.COVER_DEPS ? path.resolve(process.env.COVER_DEPS.replace(/^~/, os.homedir())) : ROOT;
  const req = createRequire(path.join(base, 'package.json'));
  const puppeteer = req('puppeteer-core');
  let executablePath = process.env.CHROME_PATH;
  let launchArgs = ['--no-sandbox', '--font-render-hinting=none'];
  if (!executablePath) {
    const chromium = req('@sparticuz/chromium');
    executablePath = await chromium.executablePath();
    launchArgs = [...chromium.args, '--font-render-hinting=none', '--allow-file-access-from-files'];
  }
  return puppeteer.launch({ executablePath, args: launchArgs, headless: true, defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 1 } });
}

// The cover doubles as the on-page hero, so keep it light: a straight screenshot
// is ~450 KB; a 256-colour palette (median cut + k-means, dithered) is ~140 KB
// with no visible banding. Needs python3 with Pillow; without it the full PNG stays.
let warnedShrink = false;
function shrink(file) {
  const py = `import sys\nfrom PIL import Image\nf=sys.argv[1]\nim=Image.open(f).convert('RGB')\nim.quantize(colors=256,method=Image.Quantize.MEDIANCUT,kmeans=3,dither=Image.Dither.FLOYDSTEINBERG).save(f,optimize=True)`;
  const r = spawnSync('python3', ['-I', '-c', py, file], { encoding: 'utf8' });
  if (r.status !== 0 && !warnedShrink) {
    warnedShrink = true;
    console.log('  (python3 + Pillow not found, so covers stay full size: pip install pillow)');
  }
  return Math.round(fs.statSync(file).size / 1024);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'iro-covers-'));
const jobs = slugs.map((s) => [s, coverFor(s)]);
for (const [s, c] of jobs) if (!c) console.log(`  skip ${s} (has its own hero art)`);
const todo = jobs.filter(([, c]) => c);

if (PREVIEW) {
  for (const [s, c] of todo) {
    const f = path.join(tmp, `${s}.html`);
    fs.writeFileSync(f, html(c));
    console.log(`  preview ${f}`);
  }
  process.exit(0);
}

const b = await browser();
const page = await b.newPage();
let bad = 0;
for (const [s, c] of todo) {
  const f = path.join(tmp, `${s}.html`);
  fs.writeFileSync(f, html(c));
  await page.goto(pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const fit = await page.evaluate(FIT);
  const out = path.join(OG_DIR, `${s}.png`);
  await page.screenshot({ path: out, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  const kb = shrink(out);
  const warn = !fit.fits || fit.subClipped ? '  ! check: text may not fit' : '';
  if (warn) bad++;
  console.log(`  ${s}.png  headline ${fit.size}px, ${fit.lines} line(s), ${kb} KB${warn}`);
}
await b.close();
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${todo.length} cover(s) written to assets/og/${bad ? `, ${bad} to check` : ''}`);

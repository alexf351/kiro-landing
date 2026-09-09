#!/usr/bin/env node
/*
 * gen-hero-images.mjs — original hero images for the pages that earn them.
 *
 *   node blog-engine/tools/gen-hero-images.mjs                  dry run (default): pages, prompts, paths, calls, cost
 *   node blog-engine/tools/gen-hero-images.mjs --execute        generate, derive variants, integrate
 *   node blog-engine/tools/gen-hero-images.mjs --execute --limit 5 --only coursiv-alternatives,cancel-finestro
 *   node blog-engine/tools/gen-hero-images.mjs --derive-only    rebuild WebP/JPEG/OG variants from existing masters
 *   node blog-engine/tools/gen-hero-images.mjs --integrate-only re-apply page integration from the manifest
 *
 * Flags: --execute  --force  --limit N (default 20)  --only a,b  --price USD (default 0.06, an estimate)
 *        --model NAME (default from hero-concepts.json)  --no-integrate  --show-prompts  --derive-only  --integrate-only
 *
 * Secrets: the key is read from process.env.GEMINI_API_KEY only, sent as a request header, and never
 * printed. Every line this script logs passes through redact(). There is no client-side code path.
 *
 * Caps: hard stop at MAX_PAID generations per run and MAX_USD projected cost, before any call is made.
 * Idempotent: a page is skipped when the manifest already has status "done" for the same prompt hash and
 * the master file exists. --force regenerates. The manifest is written after every page, so a killed run
 * resumes where it stopped.
 *
 * Inputs:  blog-engine/content/hero-concepts.json   (scored shortlist + art direction)
 * Outputs: assets/hero/<slug>-master.jpg            (kept in git, excluded from deploy by .vercelignore)
 *          assets/hero/<slug>-{640,1000,1400}.webp  (responsive hero)
 *          assets/hero/<slug>-1000.jpg              (fallback)
 *          assets/hero/<slug>-og.jpg                (1200x630 social card)
 *          blog-engine/hero-manifest.json           (what was made, from which prompt, when, and how it went)
 *          blog-engine/content/posts/<slug>.json    (hero + ogImage fields; the blog build renders them)
 *          <slug>.html                              (root pages: figure, og/twitter/schema image, preload)
 *
 * Zero dependencies on purpose. Gemini is called over REST with Node's fetch; variants are derived with a
 * headless Chromium canvas (Playwright, resolved from PLAYWRIGHT_MODULE or the local module path).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CONCEPTS = path.join(ROOT, 'blog-engine', 'content', 'hero-concepts.json');
const MANIFEST = path.join(ROOT, 'blog-engine', 'hero-manifest.json');
const POSTS = path.join(ROOT, 'blog-engine', 'content', 'posts');
const HERO_DIR = path.join(ROOT, 'assets', 'hero');
const IRO_CSS = path.join(ROOT, 'iro.css');
const SITE = 'https://tryiro.com';
const MAX_PAID = 20;
const MAX_USD = 10;
const WIDTHS = [640, 1000, 1400];
const OG = { w: 1200, h: 630 };
const FALLBACK_W = 1000;
const MIN_GAP_MS = 4000;
const TIMEOUT_MS = 120000;
const RETRIES = 3;

// ---------- args ----------
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const EXECUTE = flag('--execute');
const FORCE = flag('--force');
const DERIVE_ONLY = flag('--derive-only');
const INTEGRATE_ONLY = flag('--integrate-only');
const NO_INTEGRATE = flag('--no-integrate');
const SHOW_PROMPTS = flag('--show-prompts');
const LIMIT = Math.max(1, parseInt(opt('--limit', '20'), 10) || 20);
const ONLY = opt('--only', '').split(',').map((s) => s.trim()).filter(Boolean);
const PRICE = parseFloat(opt('--price', '0.06'));

// ---------- secret handling ----------
const KEY = process.env.GEMINI_API_KEY || '';
const redact = (s) => (KEY && typeof s === 'string' ? s.split(KEY).join('[redacted]') : s);
const log = (...a) => console.log(...a.map((x) => redact(typeof x === 'string' ? x : JSON.stringify(x))));
const warn = (...a) => console.error(...a.map((x) => redact(typeof x === 'string' ? x : JSON.stringify(x))));

// ---------- load ----------
const concepts = JSON.parse(fs.readFileSync(CONCEPTS, 'utf8'));
const MODEL = opt('--model', concepts.model);
const ASPECT = concepts.aspectRatio || '16:9';
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : { version: 1, entries: {} };
manifest.entries ||= {};
const saveManifest = () => {
  manifest.updatedAt = new Date().toISOString();
  manifest.model = MODEL;
  manifest.pricePerImageUsdEstimate = PRICE;
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
};

function buildPrompt(p) {
  return [
    concepts.style,
    `Article title: "${p.title}".`,
    `Reader intent: ${p.intent}.`,
    `Audience: ${p.audience}.`,
    `The image must communicate this outcome: ${p.outcome}.`,
    `Visual metaphor: ${p.metaphor}.`,
    `Subject and scene: ${p.subject}`,
    concepts.negative,
  ].join('\n');
}
const hashOf = (prompt) => crypto.createHash('sha256').update(`${MODEL}|${ASPECT}|v${concepts.version}|${prompt}`).digest('hex').slice(0, 12);
const masterPath = (slug) => path.join(HERO_DIR, `${slug}-master.jpg`);
const exists = (f) => fs.existsSync(f);

// ---------- selection ----------
let pages = [...concepts.pages].sort((a, b) => b.score - a.score);
if (ONLY.length) pages = pages.filter((p) => ONLY.includes(p.slug));
pages = pages.slice(0, LIMIT);
for (const p of pages) {
  p.prompt = buildPrompt(p);
  p.hash = hashOf(p.prompt);
  const e = manifest.entries[p.slug];
  p.done = !!(e && e.status === 'done' && e.promptHash === p.hash && exists(masterPath(p.slug)));
  p.action = p.done && !FORCE ? 'skip (done, same prompt)' : e && e.status === 'done' && !FORCE ? 'regenerate (prompt changed)' : e && e.status === 'failed' ? 'retry (failed before)' : 'generate';
}
const toGenerate = pages.filter((p) => !(p.done && !FORCE));

// ---------- dry run report ----------
function report() {
  log(`\nHero pipeline — model ${MODEL}, aspect ${ASPECT}, price/image estimate $${PRICE.toFixed(3)} (labelled estimate; pricing page not fetched)`);
  log(`Selection: top ${LIMIT} by score${ONLY.length ? ` filtered to ${ONLY.join(',')}` : ''} → ${pages.length} page(s), ${toGenerate.length} call(s)\n`);
  log('score  kind  slug                                  action                       master');
  for (const p of pages) log(`${String(p.score).padStart(5)}  ${p.kind.padEnd(4)}  ${p.slug.padEnd(36)}  ${p.action.padEnd(27)}  assets/hero/${p.slug}-master.jpg`);
  log(`\nProjected: ${toGenerate.length} paid call(s) × $${PRICE.toFixed(3)} ≈ $${(toGenerate.length * PRICE).toFixed(2)}  (caps: ${MAX_PAID} calls, $${MAX_USD})`);
  if (SHOW_PROMPTS) for (const p of pages) log(`\n--- ${p.slug} [${p.hash}] ---\n${p.prompt}`);
  else if (pages[0]) log(`\nSample prompt (${pages[0].slug}, hash ${pages[0].hash}); --show-prompts prints all:\n${pages[0].prompt.slice(0, 420)}…`);
}

// ---------- Gemini ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastCall = 0;
async function generate(p) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: p.prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: ASPECT } },
  });
  let attempt = 0, lastErr;
  while (attempt < RETRIES) {
    attempt++;
    const wait = Math.max(0, lastCall + MIN_GAP_MS - Date.now());
    if (wait) await sleep(wait);
    lastCall = Date.now();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY }, body, signal: ctrl.signal });
      clearTimeout(timer);
      const text = await res.text();
      if (!res.ok) {
        let msg = text.slice(0, 300);
        try { msg = JSON.parse(text).error?.message || msg; } catch {}
        const retryable = res.status === 429 || res.status >= 500;
        lastErr = new Error(`HTTP ${res.status}: ${msg}`);
        if (!retryable) throw lastErr;
        warn(`  ${p.slug}: ${lastErr.message} (attempt ${attempt}/${RETRIES})`);
      } else {
        const json = JSON.parse(text);
        const part = (json.candidates?.[0]?.content?.parts || []).find((x) => x.inlineData);
        if (!part) {
          const reason = json.candidates?.[0]?.finishReason || json.promptFeedback?.blockReason || 'no image part in response';
          throw new Error(`no image returned (${reason})`);
        }
        return { buf: Buffer.from(part.inlineData.data, 'base64'), mime: part.inlineData.mimeType, usage: json.usageMetadata || null };
      }
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') { lastErr = new Error(`timeout after ${TIMEOUT_MS / 1000}s`); warn(`  ${p.slug}: ${lastErr.message} (attempt ${attempt}/${RETRIES})`); }
      else if (/^HTTP [45]/.test(err.message) && !/^HTTP (429|5)/.test(err.message)) throw err; // non-retryable
      else if (!lastErr || lastErr.message !== err.message) { lastErr = err; warn(`  ${p.slug}: ${err.message} (attempt ${attempt}/${RETRIES})`); }
    }
    if (attempt < RETRIES) await sleep(3000 * 2 ** (attempt - 1));
  }
  throw lastErr || new Error('generation failed');
}

function jpegDims(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return { width: 0, height: 0 };
}
function pngDims(buf) { return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }; }

// ---------- derivation (headless Chromium canvas) ----------
let browserP = null;
async function browser() {
  if (browserP) return browserP;
  browserP = (async () => {
    const mod = process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
    const ns = await import(exists(mod) ? mod : 'playwright');
    const pw = ns.chromium ? ns : ns.default;
    if (!pw || !pw.chromium) throw new Error('Playwright not found: set PLAYWRIGHT_MODULE to its index.js');
    return pw.chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  })();
  return browserP;
}
async function derive(slug) {
  const master = masterPath(slug);
  const b = await browser();
  const page = await b.newPage();
  try {
    const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(master).toString('base64');
    const out = await page.evaluate(async ({ dataUrl, widths, og, fallbackW }) => {
      const im = new Image(); im.src = dataUrl; await im.decode();
      const draw = (w, h, type, q) => {
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high';
        const sr = im.naturalWidth / im.naturalHeight, tr = w / h;
        let sw = im.naturalWidth, sh = im.naturalHeight, sx = 0, sy = 0;
        if (sr > tr) { sw = Math.round(sh * tr); sx = Math.round((im.naturalWidth - sw) / 2); }
        else { sh = Math.round(sw / tr); sy = Math.round((im.naturalHeight - sh) / 2); }
        ctx.drawImage(im, sx, sy, sw, sh, 0, 0, w, h);
        return c.toDataURL(type, q);
      };
      const res = { natural: [im.naturalWidth, im.naturalHeight] };
      for (const w of widths) res[`${w}.webp`] = draw(w, Math.round(w * 9 / 16), 'image/webp', 0.82);
      res[`${fallbackW}.jpg`] = draw(fallbackW, Math.round(fallbackW * 9 / 16), 'image/jpeg', 0.82);
      res['og.jpg'] = draw(og.w, og.h, 'image/jpeg', 0.84);
      return res;
    }, { dataUrl, widths: WIDTHS, og: OG, fallbackW: FALLBACK_W });
    const variants = {};
    for (const [k, v] of Object.entries(out)) {
      if (k === 'natural') continue;
      const buf = Buffer.from(v.split(',')[1], 'base64');
      const file = path.join(HERO_DIR, `${slug}-${k}`);
      fs.writeFileSync(file, buf);
      const [wStr] = k.split('.');
      const w = wStr === 'og' ? OG.w : +wStr, h = wStr === 'og' ? OG.h : Math.round(w * 9 / 16);
      variants[k] = { path: path.relative(ROOT, file), width: w, height: h, bytes: buf.length };
    }
    return variants;
  } finally { await page.close(); }
}

// ---------- integration ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const srcset = (slug) => WIDTHS.map((w) => `/assets/hero/${slug}-${w}.webp ${w}w`).join(', ');
const SIZES = '(max-width: 760px) calc(100vw - 40px), 720px';
function pictureHtml(slug, alt, { lazy = false, priority = false } = {}) {
  const attrs = [priority ? 'fetchpriority="high"' : '', lazy ? 'loading="lazy"' : '', 'decoding="async"'].filter(Boolean).join(' ');
  return `<picture><source type="image/webp" srcset="${srcset(slug)}" sizes="${SIZES}"/><img class="hero-img" src="/assets/hero/${slug}-${FALLBACK_W}.jpg" alt="${esc(alt)}" width="${WIDTHS[2]}" height="${Math.round(WIDTHS[2] * 9 / 16)}" ${attrs}/></picture>`;
}
function preloadHtml(slug) {
  return `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset(slug)}" imagesizes="${SIZES}" fetchpriority="high"/>`;
}
function integratePost(p) {
  const file = path.join(POSTS, `${p.slug}.json`);
  if (!exists(file)) throw new Error(`post JSON not found: ${path.relative(ROOT, file)}`);
  const post = JSON.parse(fs.readFileSync(file, 'utf8'));
  post.hero = { slug: p.slug, alt: p.alt, widths: WIDTHS, width: WIDTHS[2], height: Math.round(WIDTHS[2] * 9 / 16), fallback: `/assets/hero/${p.slug}-${FALLBACK_W}.jpg` };
  post.ogImage = `${SITE}/assets/hero/${p.slug}-og.jpg`;
  fs.writeFileSync(file, JSON.stringify(post, null, 2) + '\n');
  return `posts/${p.slug}.json: hero + ogImage set (run node blog-engine/build.mjs)`;
}
function integrateRoot(p) {
  const file = path.join(ROOT, `${p.slug}.html`);
  if (!exists(file)) throw new Error(`root page not found: ${p.slug}.html`);
  let s = fs.readFileSync(file, 'utf8');
  const oldOg = `${SITE}/assets/og/${p.slug}.png`, newOg = `${SITE}/assets/hero/${p.slug}-og.jpg`;
  const notes = [];
  if (s.includes(oldOg)) { s = s.split(oldOg).join(newOg); notes.push('og/twitter/schema image → hero og'); }
  if (!/property="og:image:alt"/.test(s) && /<meta property="og:image"[^>]*>/.test(s)) {
    s = s.replace(/(<meta property="og:image"[^>]*\/>)/, `$1\n<meta property="og:image:alt" content="${esc(p.alt)}"/>`);
    notes.push('og:image:alt added');
  }
  if (!s.includes(`data-hero="${p.slug}"`)) {
    const start = s.indexOf('<section class="hero">');
    const end = start >= 0 ? s.indexOf('</section>', start) : -1;
    if (end < 0) throw new Error(`${p.slug}.html: hero section not found`);
    const fig = `\n<figure class="hero-media" data-hero="${p.slug}">${pictureHtml(p.slug, p.alt, { lazy: true })}</figure>\n`;
    s = s.slice(0, end) + fig + s.slice(end);
    notes.push('hero figure inserted');
  }
  fs.writeFileSync(file, s);
  return `${p.slug}.html: ${notes.join(', ') || 'already integrated'}`;
}
function ensureCss() {
  const css = fs.readFileSync(IRO_CSS, 'utf8');
  if (css.includes('.hero-media{')) return;
  fs.writeFileSync(IRO_CSS, css.trimEnd() + `\n/* Generated hero art on root pages (blog-engine/tools/gen-hero-images.mjs) */\n.hero-media{margin:26px 0 0;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#0A0E1A}\n.hero-media .hero-img{display:block;width:100%;height:auto;border:0;border-radius:0;margin:0}\n`);
}

// ---------- main ----------
async function main() {
  if (!EXECUTE && !DERIVE_ONLY && !INTEGRATE_ONLY) { report(); log('\nDry run only. Add --execute to generate.'); return; }
  fs.mkdirSync(HERO_DIR, { recursive: true });
  const counts = { generated: 0, skipped: 0, failed: 0, derived: 0, integrated: 0 };
  let spent = 0;

  if (EXECUTE) {
    if (!KEY) { warn('GEMINI_API_KEY is not set. Export it in your shell (see .env.example). Nothing was called.'); process.exit(2); }
    report();
    if (toGenerate.length > MAX_PAID) { warn(`\nRefusing: ${toGenerate.length} generations exceed the hard cap of ${MAX_PAID}. Use --limit or --only.`); process.exit(3); }
    if (toGenerate.length * PRICE > MAX_USD) { warn(`\nRefusing: projected $${(toGenerate.length * PRICE).toFixed(2)} exceeds the $${MAX_USD} cap.`); process.exit(3); }
    log('');
    for (const p of pages) {
      if (p.done && !FORCE) { counts.skipped++; log(`skip      ${p.slug}`); continue; }
      const t0 = Date.now();
      try {
        const { buf, mime, usage } = await generate(p);
        if (!/jpeg|jpg/.test(mime)) warn(`  ${p.slug}: unexpected mime ${mime}, saving bytes as-is`);
        fs.writeFileSync(masterPath(p.slug), buf);
        const dims = /png/.test(mime) ? pngDims(buf) : jpegDims(buf);
        spent += PRICE; counts.generated++;
        manifest.entries[p.slug] = {
          slug: p.slug, kind: p.kind, score: p.score, reason: p.reason, alt: p.alt,
          model: MODEL, aspectRatio: ASPECT, prompt: p.prompt, promptHash: p.hash,
          master: { path: path.relative(ROOT, masterPath(p.slug)), width: dims.width, height: dims.height, bytes: buf.length, mime },
          usage: usage ? { promptTokens: usage.promptTokenCount, candidateTokens: usage.candidatesTokenCount, totalTokens: usage.totalTokenCount } : null,
          estimatedUsd: PRICE, timestamp: new Date().toISOString(), status: 'done', ms: Date.now() - t0,
        };
        log(`generated ${p.slug}  ${dims.width}x${dims.height} ${Math.round(buf.length / 1024)}KB  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
      } catch (err) {
        counts.failed++;
        manifest.entries[p.slug] = { ...(manifest.entries[p.slug] || {}), slug: p.slug, kind: p.kind, score: p.score, alt: p.alt, model: MODEL, promptHash: p.hash, prompt: p.prompt, timestamp: new Date().toISOString(), status: 'failed', error: redact(err.message) };
        warn(`FAILED    ${p.slug}: ${err.message}`);
      }
      saveManifest();
    }
  }

  // derive variants for every done master in the selection (or all, for --derive-only without --only)
  const deriveSet = pages.filter((p) => manifest.entries[p.slug]?.status === 'done' && exists(masterPath(p.slug)));
  if (deriveSet.length) log('');
  for (const p of deriveSet) {
    try {
      const variants = await derive(p.slug);
      manifest.entries[p.slug].variants = variants;
      delete manifest.entries[p.slug].deriveError;
      counts.derived++;
      log(`derived   ${p.slug}  ${Object.entries(variants).map(([k, v]) => `${k} ${Math.round(v.bytes / 1024)}KB`).join(', ')}`);
    } catch (err) { counts.failed++; manifest.entries[p.slug].deriveError = redact(err.message); warn(`FAILED    ${p.slug} derive: ${err.message}`); }
    saveManifest();
  }
  if (browserP) { try { (await browserP).close(); } catch {} }

  if (!NO_INTEGRATE) {
    ensureCss();
    log('');
    for (const p of deriveSet) {
      if (manifest.entries[p.slug].status !== 'done' || manifest.entries[p.slug].deriveError) continue;
      try {
        const note = p.kind === 'asset' ? `${p.slug}: asset only, no page integration` : p.kind === 'post' ? integratePost(p) : integrateRoot(p);
        manifest.entries[p.slug].integrated = { at: new Date().toISOString(), note };
        counts.integrated++;
        log(`integrate ${note}`);
      } catch (err) { warn(`FAILED    ${p.slug} integrate: ${err.message}`); manifest.entries[p.slug].integrated = { at: new Date().toISOString(), error: redact(err.message) }; }
      saveManifest();
    }
  }

  log(`\nDone. generated ${counts.generated}, skipped ${counts.skipped}, failed ${counts.failed}, derived ${counts.derived}, integrated ${counts.integrated}. Estimated spend this run: $${spent.toFixed(2)}.`);
  log(`Manifest: ${path.relative(ROOT, MANIFEST)}`);
  if (counts.integrated) log('Next: node blog-engine/build.mjs && node blog-engine/tools/check-seo.mjs');
}

main().catch((err) => { warn(`fatal: ${err.message}`); process.exit(1); });

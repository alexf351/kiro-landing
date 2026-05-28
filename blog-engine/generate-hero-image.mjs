#!/usr/bin/env node
// Hero / OG image generator — one 1200x630 cover per post and pillar.
//
//   node blog-engine/generate-hero-image.mjs            # fill missing covers
//   node blog-engine/generate-hero-image.mjs --force    # regenerate all
//   node blog-engine/generate-hero-image.mjs --ai       # use a real image API
//
// Two backends:
//   1. AI image API (preferred for production). Set an API key and pass --ai.
//      Supported out of the box: OpenAI Images (OPENAI_API_KEY, model gpt-image-1).
//      Each cover uses a brand-consistent prompt (see aiPrompt()).
//   2. Branded fallback (default, zero-dependency, offline). Renders an on-brand
//      navy/cyan/gold cover with the title baked in via lib/png.mjs. Always works,
//      so the pipeline never blocks on network/billing.
//
// Either way, the AI prompt for every cover is written to blog-engine/hero-prompts.json
// so you (or Codex / Midjourney / Ideogram) can hand-generate a richer image and
// drop it in at assets/og/<slug>.png — no code change needed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderHeroCover } from './lib/png.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(__dirname, 'content');
const OG_DIR = path.join(ROOT, 'assets/og');
fs.mkdirSync(OG_DIR, { recursive: true });

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const USE_AI = args.includes('--ai');

function load(dir, type) {
  const p = path.join(CONTENT, dir);
  if (!fs.existsSync(p)) return [];
  return fs
    .readdirSync(p)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ ...JSON.parse(fs.readFileSync(path.join(p, f), 'utf8')), _type: type }))
    .filter((x) => !x.draft);
}
const items = [...load('pillars', 'pillar'), ...load('posts', 'post')];

// Brand-consistent prompt for an AI image model.
function aiPrompt(item) {
  const subject =
    item._type === 'pillar'
      ? `the content-pillar theme "${item.title}"`
      : `the blog post "${item.title}"`;
  return [
    `A 1200x630 social/blog hero cover for ${subject}.`,
    `Dark, premium, futuristic tech aesthetic: deep navy background (#0A0E1A),`,
    `glowing electric-cyan (#00E5FF) accents and a subtle gold (#FFD700) ambient glow,`,
    `glassmorphic surfaces, soft radial light, faint grid, high contrast, lots of negative space.`,
    `Game-like and energetic but clean and editorial — "Duolingo gamification meets Valorant UI".`,
    `Abstract/conceptual illustration only, no real text baked in, no logos, no watermark, no human faces.`,
    `Centered focal point, leave room for an overlaid headline. Flat vector + soft gradients.`,
  ].join(' ');
}

async function generateAI(item, outPath) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('--ai set but OPENAI_API_KEY is not configured');
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-image-1', prompt: aiPrompt(item), size: '1536x1024', n: 1 }),
  });
  if (!res.ok) throw new Error(`image API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const b64 = data.data[0].b64_json;
  fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
}

const prompts = {};
let made = 0;
for (const item of items) {
  prompts[item.slug] = aiPrompt(item);
  const outPath = path.join(OG_DIR, `${item.slug}.png`);
  if (fs.existsSync(outPath) && !FORCE) continue;
  try {
    if (USE_AI) {
      await generateAI(item, outPath);
      console.log('  AI    ', `${item.slug}.png`);
    } else {
      renderHeroCover({ title: item.title, eyebrow: 'IRO AI', outPath });
      console.log('  cover ', `${item.slug}.png`);
    }
    made++;
  } catch (err) {
    console.warn(`  ! ${item.slug}: ${err.message} — falling back to branded cover`);
    renderHeroCover({ title: item.title, eyebrow: 'IRO AI', outPath });
    made++;
  }
}

fs.writeFileSync(path.join(__dirname, 'hero-prompts.json'), JSON.stringify(prompts, null, 2) + '\n');
console.log(`\nGenerated/updated ${made} cover(s). Prompts written to blog-engine/hero-prompts.json`);
if (!USE_AI) console.log('Tip: run with --ai (and OPENAI_API_KEY) for AI-generated covers, or hand-generate from hero-prompts.json.');

#!/usr/bin/env node
// IndexNow ping — instantly notify Bing (+ Yandex, Seznam, Naver) that pages
// changed, instead of waiting for the next crawl. Google and Brave do NOT use
// IndexNow (submit to Brave once at search.brave.com/submit-url).
//
// Usage:
//   node growth/indexnow-ping.mjs                 # ping every URL in the sitemaps
//   node growth/indexnow-ping.mjs <url> [url...]  # ping only the URLs you name
//   node growth/indexnow-ping.mjs --dry-run       # print the list, send nothing
//
// The URL list is read from the local sitemap files, so it stays in sync with
// what's actually deployed — drop a page from the sitemap and it stops pinging.
//
// Run it AFTER a deploy is live (IndexNow verifies each URL resolves).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HOST = 'tryiro.com';
const KEY = 'b5b04a1f5ff05c02d330e53b5362b5db';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow'; // fans out to all IndexNow engines
const BATCH = 10000; // IndexNow's per-request URL limit

// Sitemaps to harvest page URLs from (relative to repo root).
// image-sitemap.xml is skipped on purpose — those are image assets, not pages.
const SITEMAPS = ['sitemap.xml', 'blog-sitemap.xml'];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function urlsFromSitemaps() {
  const found = new Set();
  for (const file of SITEMAPS) {
    let xml;
    try {
      xml = readFileSync(join(root, file), 'utf8');
    } catch {
      console.warn(`! skipping ${file} (not found)`);
      continue;
    }
    for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
      const u = m[1].trim();
      if (u.startsWith(`https://${HOST}`)) found.add(u);
    }
  }
  return [...found];
}

async function ping(urlList) {
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });
  const text = await res.text().catch(() => '');
  return { status: res.status, ok: res.ok, text };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const explicit = args.filter((a) => a.startsWith('http'));

  const urls = explicit.length ? explicit : urlsFromSitemaps();
  if (!urls.length) {
    console.error('No URLs to submit. Check the sitemap files or pass URLs as arguments.');
    process.exit(1);
  }

  console.log(`${urls.length} URL(s) to submit via IndexNow (key ${KEY_LOCATION})`);
  if (dryRun) {
    urls.forEach((u) => console.log('  ' + u));
    console.log('\n--dry-run: nothing sent.');
    return;
  }

  for (let i = 0; i < urls.length; i += BATCH) {
    const chunk = urls.slice(i, i + BATCH);
    const { status, ok, text } = await ping(chunk);
    // IndexNow returns 200 (accepted) or 202 (accepted, pending validation).
    console.log(`  batch ${i / BATCH + 1}: ${chunk.length} URLs -> HTTP ${status} ${ok ? 'OK' : 'FAILED'}${text ? ' ' + text : ''}`);
    if (!ok) process.exitCode = 1;
  }
  console.log('\nDone. Bing typically processes submitted URLs within ~24h.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

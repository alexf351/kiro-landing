#!/usr/bin/env node
/*
 * build-i18n.mjs — the Spanish, French and German homepages, generated.
 *
 *   node blog-engine/build-i18n.mjs            write es.html, fr.html, de.html
 *   node blog-engine/build-i18n.mjs --check    build in memory, report, write nothing
 *   node blog-engine/build-i18n.mjs --only de  one locale
 *
 * index.html is the only homepage anyone edits. This reads it and one
 * dictionary, blog-engine/i18n/home.json, and writes /es, /fr and /de. The
 * localized pages are build output, like blog/*.html: hand edits are
 * overwritten on the next run.
 *
 * The dictionary is organized by page section (see i18n/sections.mjs). Each
 * entry is { en, es, fr, de }, where `en` is the English exactly as it appears
 * in index.html — gettext style, so the English page needs no placeholders and
 * stays byte-for-byte what it was. An entry only replaces text inside its own
 * section, and only whole strings:
 *   html sections   an element's prose (bounded by > and <) or a user-facing
 *                   attribute value (bounded by =" and ")
 *   script sections a whole string literal; `raw: true` for the rare fragment
 *                   that is code (a regex, a function body)
 *   jsonld          text values of the structured data, parsed as JSON and
 *                   re-serialized, so it always parses. FAQ answers reuse the
 *                   faq section's entries, which keeps the schema and the
 *                   visible answers identical (check-seo enforces that).
 *
 * The run fails, writing nothing, when an entry no longer matches index.html
 * (the English changed; update the entry) or when a built page has a script or
 * JSON-LD block that does not parse. It also fails, after writing, when a
 * locale is missing a translation (English is used in its place) or when
 * English copy is left in a built page — every string it finds that has no
 * entry, excluding brand and product names listed under `protected`.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { parse, segments, norm, hasWords } from './i18n/segment.mjs';
import { SECTIONS, locate } from './i18n/sections.mjs';
import { literals, looksLikeCopy } from './i18n/jsstrings.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://tryiro.com';
const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const ONLY = argv.includes('--only') ? argv[argv.indexOf('--only') + 1] : null;

const SRC = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const DICT = JSON.parse(fs.readFileSync(path.join(ROOT, 'blog-engine/i18n/home.json'), 'utf8'));
const LOCALES = Object.keys(DICT.locales).filter((l) => !ONLY || l === ONLY);
if (!LOCALES.length) { console.error(`unknown locale: ${ONLY}`); process.exit(2); }

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const flex = (s) => esc(s.trim()).replace(/\s+/g, '\\s+');           // markup whitespace is not significant
const decode = (s) => s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rarr;/g, '→')
  .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&lsquo;/g, '‘').replace(/&rsquo;/g, '’').replace(/&hellip;/g, '…')
  .replace(/&times;/g, '×').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/\s+/g, ' ').trim();
const entriesOf = (id) => Object.entries(DICT.sections[id] || {}).filter(([k]) => !k.startsWith('_')).map(([key, e]) => ({ key, ...e }));

// Protected names may stay in English; anything else English is a finding.
const PROTECTED = [...DICT.protected].sort((a, b) => b.length - a.length);
const onlyProtected = (s) => {
  let t = ` ${decode(s)} `;
  for (const p of PROTECTED) t = t.split(p).join(' ');
  return !/\p{L}{2,}/u.test(t.replace(/\b(\d+|min|px|x)\b/g, ' '));
};

// A script literal is copy only if words survive once markup, entities, escapes
// and CSS-class-looking tokens are stripped ('<img class="cc-mava" src="' is not).
const proseOf = (raw) => raw.replace(/<[^>]*>/g, ' ').replace(/^[^<]*?>/, ' ').replace(/<[^>]*$/, ' ')
  .replace(/&[a-z]+;|&#\d+;|\\u[0-9a-f]{4}/gi, ' ').split(/\s+/)
  .some((w) => /^[\p{L}][\p{L}’'.,!?:;()-]*$/u.test(w) && w.replace(/[^\p{L}]/gu, '').length >= 2 && !/^[a-z]+(-[a-z]+)+$/.test(w));

const problems = { stale: [], missing: [], leftover: [], broken: [] };

function buildLocale(L) {
  const meta = DICT.locales[L];
  const root = parse(SRC);
  const edits = [];
  const sameAsEnglish = new Set();       // entries deliberately left identical (Gold, Bronze, FAQ…)
  const tr = (e, ctx) => {
    if (e[L] === undefined) { problems.missing.push(`${L} ${ctx} ${e.key}`); return e.en; }
    if (e[L] === e.en) sameAsEnglish.add(norm(e.en));
    return e[L];
  };

  // ---- html + script sections: collect edits against the untouched source ----
  const masks = [];                                     // script/style/comment spans html entries must not touch
  const walk = (n) => { if (n.tag === 'script' || n.tag === 'style') masks.push([n.openEnd, n.closeStart]); n.children.forEach(walk); };
  walk(root);
  for (const m of SRC.matchAll(/<!--[\s\S]*?-->/g)) masks.push([m.index, m.index + m[0].length]);
  const masked = (i, j) => masks.some(([a, b]) => i < b && j > a);

  for (const sec of SECTIONS) {
    if (sec.type === 'jsonld') continue;
    const range = locate(sec, SRC, root);
    const entries = entriesOf(sec.id);
    if (!range) { if (entries.length) problems.stale.push(`${sec.id}: section not found in index.html`); continue; }
    const [a, b] = range;
    const chunk = SRC.slice(a, b);
    if (sec.type === 'html') {
      for (const e of entries) {
        const t = tr(e, sec.id);
        let hits = 0;
        const body = flex(e.en);
        for (const [re, attr] of [[new RegExp(`(?<=>\\s*)${body}(?=\\s*<)`, 'g'), false], [new RegExp(`(?<==")${body}(?=")`, 'g'), true]]) {
          for (const m of chunk.matchAll(re)) {
            const s = a + m.index, f = s + m[0].length;
            if (masked(s, f)) continue;
            hits++;
            edits.push({ s, f, text: attr ? t.replace(/"/g, '&quot;') : t, why: `${sec.id}.${e.key}` });
          }
        }
        if (!hits) problems.stale.push(`${sec.id}.${e.key}: "${norm(e.en).slice(0, 70)}" not found`);
      }
    } else {
      const lits = literals(chunk);
      for (const e of entries) {
        const t = tr(e, sec.id);
        let hits = 0;
        if (e.raw) {
          for (let i = chunk.indexOf(e.en); i >= 0; i = chunk.indexOf(e.en, i + e.en.length)) { hits++; edits.push({ s: a + i, f: a + i + e.en.length, text: t, why: `${sec.id}.${e.key}` }); }
        } else {
          for (const l of lits) {
            if (l.raw !== e.en) continue;
            hits++;
            let v = t.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(new RegExp(`(?<!\\\\)${esc(l.quote)}`, 'g'), '\\' + l.quote);
            if (e.en.includes('\\')) v = t;                // entry is written in escaped form already (a \u00b7 escape)
            if (l.quote === '`') v = v.replace(/\$\{/g, '\\${');
            edits.push({ s: a + l.start, f: a + l.end, text: v, why: `${sec.id}.${e.key}` });
          }
        }
        if (!hits) problems.stale.push(`${sec.id}.${e.key}: "${e.en.slice(0, 70)}" not found`);
      }
    }
  }

  // Apply, last first, refusing overlaps (two entries claiming the same text).
  edits.sort((x, y) => x.s - y.s);
  for (let i = 1; i < edits.length; i++) if (edits[i].s < edits[i - 1].f) problems.broken.push(`overlap: ${edits[i - 1].why} / ${edits[i].why}`);
  let out = SRC;
  for (const e of [...edits].reverse()) out = out.slice(0, e.s) + e.text + out.slice(e.f);

  // ---- structured data ----
  const pageUrl = `${SITE}${meta.path}`;
  const jsonEntries = [...entriesOf('jsonld'), ...entriesOf('faq')]
    .map((e) => ({ ...e, en: decode(e.en), t: decode(tr(e, 'jsonld')) }))
    .filter((e) => e.en)
    .sort((x, y) => y.en.length - x.en.length);
  const SKIP = new Set(['@type', '@id', '@context', 'url', 'item', 'logo', 'image', 'sameAs', 'downloadUrl', 'installUrl', 'priceCurrency', 'price', 'operatingSystem', 'applicationCategory', 'availableLanguage', 'inLanguage', 'foundingDate', 'dateModified', 'datePublished', 'itemListOrder', 'query-input', 'urlTemplate', 'target', 'courseWorkload']);
  const PAGE_IDS = ['webpage', 'learning-paths', 'breadcrumb', 'ai-fluency-course'];
  const translateValue = (v) => {
    const slots = [];
    let s = v;
    for (const e of jsonEntries) {
      if (!s.includes(e.en)) continue;
      s = s.split(e.en).join(`\u0000${slots.length}\u0000`);
      slots.push(e.t);
      if (e.t === e.en) sameAsEnglish.add(e.en);
    }
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => slots[+i]);
  };
  const xform = (node, key) => {
    if (typeof node === 'string') {
      if (key === '@id') { const m = node.match(/^https:\/\/tryiro\.com\/#([\w-]+)$/); return m && PAGE_IDS.includes(m[1]) ? `${pageUrl}#${m[1]}` : node; }
      return SKIP.has(key) ? node : translateValue(node);
    }
    if (Array.isArray(node)) return node.map((x) => xform(x, key));
    if (node && typeof node === 'object') {
      const o = {};
      for (const [k, v] of Object.entries(node)) o[k] = xform(v, k);
      if (o['@type'] === 'WebPage') { o.url = pageUrl; o.inLanguage = meta.lang; o.dateModified = DICT.dateModified; }
      if (o['@type'] === 'ListItem' && o.item === `${SITE}/`) o.item = pageUrl;
      if (o['@type'] === 'FAQPage' || o['@type'] === 'Course' || o['@type'] === 'ItemList') o.inLanguage = meta.lang;
      return o;
    }
    return node;
  };
  out = out.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>\n?/g, (whole, body) => {
    let d;
    try { d = JSON.parse(body); } catch { problems.broken.push(`${L}: source JSON-LD does not parse`); return whole; }
    // The WebSite entity is declared once, in English, on "/". Locale pages point
    // at it (WebPage.isPartOf) rather than re-declaring it with a second language.
    if (d['@type'] === 'WebSite') return '';
    return `<script type="application/ld+json">${JSON.stringify(xform(d)).replace(/<\//g, '<\\/')}</script>\n`;
  });

  // ---- page-level locale facts ----
  const others = Object.entries({ en: 'en_US', ...Object.fromEntries(Object.entries(DICT.locales).map(([k, v]) => [k, v.ogLocale])) }).filter(([k]) => k !== L);
  const sub = (from, to, label) => { if (!out.includes(from)) { problems.broken.push(`${L}: expected "${label}" in index.html`); return; } out = out.split(from).join(to); };
  sub('<html lang="en"', `<html lang="${meta.lang}"`, 'html lang');
  sub('<link rel="canonical" href="https://tryiro.com/"/>', `<link rel="canonical" href="${pageUrl}"/>`, 'canonical');
  sub('<meta property="og:url" content="https://tryiro.com"/>', `<meta property="og:url" content="${pageUrl}"/>`, 'og:url');
  out = out.replace(/<meta property="og:locale" content="en_US"\/>\n(?:<meta property="og:locale:alternate" content="[^"]+"\/>\n)+/,
    `<meta property="og:locale" content="${meta.ogLocale}"/>\n` + others.map(([, v]) => `<meta property="og:locale:alternate" content="${v}"/>\n`).join(''));
  // The Markdown twin describes the English page; there is no localized one.
  out = out.replace(/<link rel="alternate" type="text\/markdown" title="Page in Markdown" href="\/llms\/index\.md"\/>\n?/, '');
  // Language menu: this page is the current one.
  out = out.replace(/(<a href="\/" hreflang="en" lang="en" data-lang-link) aria-current="page"/g, '$1')
    .replace(new RegExp(`(<a href="${esc(meta.path)}" hreflang="${L}" lang="${L}" data-lang-link)`, 'g'), '$1 aria-current="page"');
  // Waitlist sign-ups say which page they came from (both forms carry _subject).
  out = out.replace(/(<input type="hidden" name="_subject" value="[^"]+"\/>)/g, `$1\n          <input type="hidden" name="locale" value="${L}"/>`);
  out = out.replace('<!DOCTYPE html>\n', `<!DOCTYPE html>\n<!-- Generated by blog-engine/build-i18n.mjs from index.html and blog-engine/i18n/home.json. Edit those; this file is overwritten. -->\n`);

  // ---- does it still run? ----
  for (const m of out.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    if (!m[1].trim()) continue;
    try { new vm.Script(m[1]); } catch (err) { problems.broken.push(`${L}: inline script no longer parses (${err.message}) near "${m[1].trim().slice(0, 60)}"`); }
  }
  for (const m of out.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (err) { problems.broken.push(`${L}: JSON-LD no longer parses (${err.message})`); }
  }

  // ---- what English is left? ----
  const outRoot = parse(out);
  const scoped = (html, r) => SECTIONS.filter((s) => s.type === 'html').map((s) => locate(s, html, r)).filter(Boolean);
  const inScope = (rs, seg) => rs.some(([x, y]) => seg.start >= x && seg.end <= y);
  const srcRanges = scoped(SRC, root), outRanges = scoped(out, outRoot);
  const english = new Set(segments(SRC).filter((s) => inScope(srcRanges, s)).map((s) => norm(s.text)));
  for (const seg of segments(out)) {
    const t = norm(seg.text);
    if (!inScope(outRanges, seg) || !english.has(t) || sameAsEnglish.has(t) || onlyProtected(t)) continue;
    problems.leftover.push(`${L} html  ${seg.kind === 'attr' ? `[${seg.attr}] ` : ''}"${t.slice(0, 90)}"`);
  }
  for (const sec of SECTIONS.filter((s) => s.type === 'script')) {
    const r0 = locate(sec, SRC, root), r1 = locate(sec, out, outRoot);
    if (!r0 || !r1) continue;
    const ignore = new Set(DICT.sections[sec.id]?._ignore || []);
    const en = new Set(literals(SRC.slice(...r0)).map((l) => l.raw).filter((r) => looksLikeCopy(r) && proseOf(r)));
    for (const l of literals(out.slice(...r1))) {
      if (!en.has(l.raw) || ignore.has(l.raw) || sameAsEnglish.has(norm(l.raw)) || onlyProtected(l.raw)) continue;
      problems.leftover.push(`${L} ${sec.id}  '${l.raw.slice(0, 90)}'`);
    }
  }
  const enJson = new Set();
  const collect = (v, k, set) => { if (typeof v === 'string') { if (!SKIP.has(k) && hasWords(v)) set.add(v); } else if (Array.isArray(v)) v.forEach((x) => collect(x, k, set)); else if (v && typeof v === 'object') for (const [kk, x] of Object.entries(v)) collect(x, kk, set); };
  for (const m of SRC.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) collect(JSON.parse(m[1]), '', enJson);
  const outJson = new Set();
  for (const m of out.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { collect(JSON.parse(m[1]), '', outJson); } catch { /* reported above */ } }
  for (const v of outJson) if (enJson.has(v) && !sameAsEnglish.has(v) && !onlyProtected(v)) problems.leftover.push(`${L} jsonld "${v.slice(0, 90)}"`);

  return out;
}

const built = {};
for (const L of LOCALES) built[L] = buildLocale(L);

const uniq = (a) => [...new Set(a)];
const report = (label, list) => { const u = uniq(list); if (u.length) { console.log(`\n${label} (${u.length}):`); u.slice(0, 60).forEach((x) => console.log('  ' + x)); if (u.length > 60) console.log(`  … ${u.length - 60} more`); } };
report('STALE — entry no longer matches index.html', problems.stale);
report('BROKEN — built page would not work', problems.broken);
report('MISSING — no translation, English used', problems.missing);
report('LEFTOVER — English with no dictionary entry', problems.leftover);

const hard = problems.stale.length || problems.broken.length;
if (!CHECK && !hard) {
  for (const L of LOCALES) fs.writeFileSync(path.join(ROOT, DICT.locales[L].file), built[L]);
}
const total = Object.values(DICT.sections).reduce((n, s) => n + Object.keys(s).filter((k) => !k.startsWith('_')).length, 0);
console.log(`\ni18n: ${total} dictionary entries, locales ${LOCALES.join(', ')} — ${hard ? 'NOT WRITTEN' : CHECK ? 'checked, nothing written' : 'wrote ' + LOCALES.map((l) => DICT.locales[l].file).join(', ')}`);
process.exit(hard || problems.missing.length || problems.leftover.length ? 1 : 0);

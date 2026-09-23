/*
 * segment.mjs — split an HTML page into translatable segments, with offsets.
 *
 * Shared by build-i18n.mjs (to find English left untranslated in a built page)
 * and by `build-i18n.mjs --extract` (to list the strings a dictionary needs).
 *
 * The homepage is hand-authored, well-formed HTML, so a small tokenizer is
 * enough; no dependency. A "segment" is the unit a translator works on:
 *   - a run of prose inside an element that has direct text, including its
 *     inline markup (<b>, <span class>, <a>, <br/>), so a sentence with a link
 *     in it is one string and word order can change around the link;
 *   - a user-facing attribute (alt, aria-label, placeholder, title, and the
 *     content of description / og / twitter meta tags).
 * svg, script and style are opaque. Leading and trailing icons, empty spans
 * and <br/> are trimmed off the edges of a run so the string starts and ends
 * with words.
 */

export const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style']);
const OPAQUE = new Set(['script', 'style', 'svg', 'template']);
const BLOCK = new Set(['address', 'article', 'aside', 'blockquote', 'body', 'canvas', 'dd', 'details', 'dialog', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'iframe', 'input', 'legend', 'li', 'main', 'nav', 'noscript', 'ol', 'p', 'pre', 'section', 'select', 'summary', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'ul', 'video', 'audio']);
const TEXT_ATTRS = ['alt', 'aria-label', 'placeholder', 'title', 'aria-description', 'aria-roledescription'];
const META_CONTENT = /^(description|og:title|og:description|og:image:alt|twitter:title|twitter:description|twitter:image:alt)$/;

export const hasWords = (s) => /\p{L}{2,}/u.test(s.replace(/&[a-z]+;|&#\d+;/gi, ' ').replace(/<[^>]*>/g, ' '));

export function parseAttrs(src) {
  const out = {};
  for (const m of src.matchAll(/([^\s=\/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  return out;
}

export function parse(html) {
  const lower = html.toLowerCase();
  const root = { tag: '#root', attrs: {}, start: 0, openEnd: 0, closeStart: html.length, end: html.length, children: [], parent: null };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z][\w:-]*)\s*>|<([a-zA-Z][\w:-]*)((?:\s+[^\s=\/>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[0][1] === '!') continue;
    const top = stack[stack.length - 1];
    if (m[1] !== undefined) {
      const tag = m[1].toLowerCase();
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag !== tag) continue;
        while (stack.length > i) { const n = stack.pop(); n.closeStart = m.index; n.end = m.index + m[0].length; }
        break;
      }
      continue;
    }
    const tag = m[2].toLowerCase();
    const node = { tag, attrs: parseAttrs(m[3] || ''), start: m.index, openEnd: m.index + m[0].length, children: [], parent: top };
    top.children.push(node);
    if (RAW.has(tag)) {
      const c = lower.indexOf('</' + tag, node.openEnd);
      node.closeStart = c < 0 ? html.length : c;
      node.end = c < 0 ? html.length : html.indexOf('>', c) + 1;
      re.lastIndex = node.end;
      continue;
    }
    if (VOID.has(tag) || m[4] === '/') { node.closeStart = node.end = node.openEnd; continue; }
    stack.push(node);
  }
  return root;
}

// Direct children in source order, with the text between them.
function pieces(node, html) {
  const out = [];
  let at = node.openEnd;
  for (const c of node.children) {
    if (c.start > at) out.push({ text: html.slice(at, c.start), start: at, end: c.start });
    out.push({ el: c, start: c.start, end: c.end });
    at = c.end;
  }
  if (node.closeStart > at) out.push({ text: html.slice(at, node.closeStart), start: at, end: node.closeStart });
  return out;
}

const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
const isEdgeJunk = (p, html) => (p.text !== undefined && !stripComments(p.text).trim())
  || (p.el && (['svg', 'img', 'br', 'wbr'].includes(p.el.tag) || !hasWords(html.slice(p.el.start, p.el.end))));

export function segments(html, { from = 0, to = html.length } = {}) {
  const root = parse(html);
  const out = [];
  const inRange = (a, b) => a >= from && b <= to;
  const visitAttrs = (n) => {
    if (n.tag === 'meta') {
      const key = n.attrs.name || n.attrs.property || '';
      if (META_CONTENT.test(key) && n.attrs.content && hasWords(n.attrs.content)) out.push({ kind: 'attr', attr: 'content', text: n.attrs.content, start: n.start, end: n.openEnd, tag: n.tag });
      return;
    }
    if (n.tag === 'link') return;
    for (const a of TEXT_ATTRS) if (n.attrs[a] && hasWords(n.attrs[a])) out.push({ kind: 'attr', attr: a, text: n.attrs[a], start: n.start, end: n.openEnd, tag: n.tag });
    if (n.tag === 'input' && /^(submit|button)$/i.test(n.attrs.type || '') && n.attrs.value && hasWords(n.attrs.value)) out.push({ kind: 'attr', attr: 'value', text: n.attrs.value, start: n.start, end: n.openEnd, tag: n.tag });
  };
  // Inline elements inside a prose run are not visited as blocks, but their
  // alt / aria-label text still needs translating.
  const attrsDeep = (el) => {
    if (inRange(el.start, el.openEnd)) visitAttrs(el);
    if (!RAW.has(el.tag)) el.children.forEach(attrsDeep);
  };
  const visit = (n) => {
    if (n.tag !== '#root' && (n.end < from || n.start > to)) return;
    if (n.tag !== '#root' && inRange(n.start, n.openEnd)) visitAttrs(n);
    if (OPAQUE.has(n.tag)) return;
    const ps = pieces(n, html);
    const prose = ps.some((p) => p.text !== undefined && hasWords(stripComments(p.text)));
    if (!prose) { n.children.forEach(visit); return; }
    // Runs of text + inline elements, broken by block children.
    let run = [];
    const flush = () => {
      while (run.length && isEdgeJunk(run[0], html)) run.shift();
      while (run.length && isEdgeJunk(run[run.length - 1], html)) run.pop();
      if (run.length) {
        const a = run[0].start, b = run[run.length - 1].end;
        const raw = html.slice(a, b);
        if (hasWords(stripComments(raw)) && inRange(a, b)) out.push({ kind: 'text', text: stripComments(raw).trim(), start: a, end: b, tag: n.tag });
      }
      run = [];
    };
    for (const p of ps) {
      if (p.el && (BLOCK.has(p.el.tag) || OPAQUE.has(p.el.tag) && p.el.tag !== 'svg')) { flush(); visit(p.el); continue; }
      run.push(p);
      if (p.el) attrsDeep(p.el);
    }
    flush();
  };
  visit(root);
  return out;
}

export const norm = (s) => s.replace(/\s+/g, ' ').trim();

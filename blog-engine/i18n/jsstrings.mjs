/*
 * jsstrings.mjs — string literals in an inline script, with offsets.
 * A small scanner, not a parser: it knows comments, the three quote styles and
 * regex literals well enough for the homepage's hand-written scripts. Used to
 * list candidate UI strings (--extract) and to report English left in a
 * built page's scripts.
 */
export function literals(src) {
  const out = [];
  let i = 0, prev = '';
  const n = src.length;
  const regexOk = () => !prev || /[(,=:[!&|?{};+\-*%<>~^]$/.test(prev) || /\b(return|typeof|case|in|of|delete|void|throw|new)$/.test(prev);
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { const e = src.indexOf('\n', i); i = e < 0 ? n : e; continue; }
    if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === '\\') j++; else if (c !== '`' && src[j] === '\n') break; j++; }
      out.push({ quote: c, raw: src.slice(i + 1, j), start: i + 1, end: j });
      i = j + 1; prev = 'str'; continue;
    }
    if (c === '/' && regexOk()) {
      let j = i + 1, cls = false;
      while (j < n && src[j] !== '\n') {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === '[') cls = true; else if (src[j] === ']') cls = false; else if (src[j] === '/' && !cls) break;
        j++;
      }
      i = j + 1; while (i < n && /[a-z]/i.test(src[i])) i++;
      prev = 'regex'; continue;
    }
    if (!/\s/.test(c)) prev = (/[\w$]/.test(c) ? (prev.match(/[\w$]*$/)?.[0] ?? '') + c : c);
    i++;
  }
  return out;
}

// Is a literal plausibly something a person reads? Errs toward inclusion;
// the dictionary author decides.
export function looksLikeCopy(raw) {
  const s = raw.replace(/\\n/g, ' ');
  if (!/\p{L}{2,}/u.test(s)) return false;
  if (/^(https?:|mailto:|\/|\.\/|#[\w-]|\.[\w-]+|\[|data:)/.test(s)) return false;
  if (/^[#.]?[a-z][\w-]*([ .#>:][\w-]+)*$/.test(s) && !/\s/.test(s.trim())) return false;   // ids, classes, events, selectors
  if (/^[a-z-]+(\s[a-z-]+)*$/.test(s) && /-/.test(s)) return false;                         // "is-open ia-ph"
  if (/^(rgba?|hsla?|var|translate|scale|rotate|cubic-bezier|linear-gradient|radial-gradient)\(/.test(s)) return false;
  if (/\.(webp|png|jpe?g|svg|js|css|mp4)$/.test(s)) return false;
  return true;
}

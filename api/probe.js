// Throwaway diagnostic. Step one showed the competitor serves a 307 to the App
// Store for Safari but a 200 HTML page for an Instagram in-app-browser user
// agent, so their escape lives in that page's markup or its JS chunks. This
// pass pulls the full page and greps the bundles for the technique. Targets are
// hardcoded so this is not an open proxy. Delete once the handoff is fixed.

const IG_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0.0 (iPhone16,2; iOS 18_5; en_US; en; scale=3.00; 1290x2796)';

const PAGE = 'https://kikulang.com/download';

// Signals that would reveal an in-app-browser escape.
const PATTERNS = [
  /itms-?apps?s?:\/\/[^\s"'`<>\\]{0,120}/gi,
  /x-safari-[^\s"'`<>\\]{0,120}/gi,
  /googlechrome:\/\/[^\s"'`<>\\]{0,80}/gi,
  /intent:\/\/[^\s"'`<>\\]{0,120}/gi,
  /https?:\/\/(?:apps|itunes)\.apple\.com[^\s"'`<>\\]{0,120}/gi,
  /\.{0,10}(?:Instagram|FBAN|FBAV|FB_IAB|Bytedance|musical_ly)[^\s"'`<>\\]{0,60}/g,
  /[\w$.]{0,30}(?:inApp|isInApp|in_app|webview|isWebView|standalone)[\w$.]{0,30}/gi,
  /window\.location(?:\.href|\.replace|\.assign)?\s*=?\s*[^;\n]{0,120}/g,
  /document\.location[^;\n]{0,120}/g,
  /<meta[^>]*apple-itunes-app[^>]*>/gi,
  /rel=["']?(?:alternate|manifest)["']?[^>]{0,120}/gi,
];

function scan(text, label) {
  const hits = {};
  for (const re of PATTERNS) {
    const found = Array.from(new Set(text.match(re) || []))
      .map((s) => s.replace(/\s+/g, ' ').trim())
      .filter((s) => s.length > 3)
      .slice(0, 25);
    if (found.length) hits[re.source.slice(0, 42)] = found;
  }
  return { label, length: text.length, hits };
}

async function get(url, ua) {
  const r = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': ua, accept: '*/*' },
  });
  return { status: r.status, text: await r.text() };
}

module.exports = async (req, res) => {
  const out = { page: PAGE, results: [] };

  let html = '';
  try {
    const r = await get(PAGE, IG_UA);
    html = r.text;
    out.pageStatus = r.status;
    out.results.push(scan(html, 'download.html (instagram ua)'));
  } catch (e) {
    out.pageError = String(e.message || e);
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('cache-control', 'no-store');
    return res.status(200).send(JSON.stringify(out, null, 2));
  }

  // Their logic is almost certainly in a bundle, not the markup.
  const scripts = Array.from(new Set((html.match(/src="([^"]+\.js)"/g) || []).map((s) => s.slice(5, -1))))
    .map((s) => new URL(s, PAGE).toString())
    .slice(0, 14);
  out.scripts = scripts;

  for (const s of scripts) {
    try {
      const r = await get(s, IG_UA);
      const scanned = scan(r.text, s.replace('https://kikulang.com', ''));
      if (Object.keys(scanned.hits).length) out.results.push(scanned);
    } catch (e) {
      out.results.push({ label: s, error: String(e.message || e) });
    }
  }

  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.status(200).send(JSON.stringify(out, null, 2));
};

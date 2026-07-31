// Throwaway diagnostic. Traces redirect chains from Vercel's network so we can
// compare what a competitor's bio link serves against what ours serves, and
// what Apple returns to an in-app-browser user agent. Targets are hardcoded so
// this is not an open proxy. Delete once the download handoff is fixed.

const IG_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0.0 (iPhone16,2; iOS 18_5; en_US; en; scale=3.00; 1290x2796)';

const SAFARI_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

const TARGETS = [
  'https://kikulang.com/download',
  'https://kikulang.com/',
  'https://tryiro.com/download',
  'https://apps.apple.com/us/app/iro-ai-learn-ai-skills/id6759628066',
];

const KEEP = ['location', 'content-type', 'server', 'x-frame-options', 'content-security-policy', 'refresh'];

async function trace(startUrl, ua) {
  const hops = [];
  let url = startUrl;

  for (let i = 0; i < 10; i++) {
    let r;
    try {
      r = await fetch(url, {
        redirect: 'manual',
        headers: { 'user-agent': ua, accept: 'text/html,application/xhtml+xml,*/*' },
      });
    } catch (e) {
      hops.push({ url, error: String(e && e.message ? e.message : e) });
      break;
    }

    const headers = {};
    for (const k of KEEP) {
      const v = r.headers.get(k);
      if (v) headers[k] = v;
    }

    const hop = { url, status: r.status, headers };

    if (r.status >= 300 && r.status < 400 && headers.location) {
      hops.push(hop);
      url = new URL(headers.location, url).toString();
      continue;
    }

    // Terminal response. Capture enough of the body to spot a meta refresh or a
    // script-driven jump, which a status code alone would not reveal.
    let body = '';
    try {
      body = (await r.text()).slice(0, 4000);
    } catch (e) {
      body = '<unreadable: ' + e.message + '>';
    }
    hop.bodyLength = body.length;
    hop.metaRefresh = (body.match(/http-equiv=["']?refresh["']?[^>]*/i) || [])[0] || null;
    hop.schemeUrlsInBody = Array.from(
      new Set((body.match(/(itms-apps|itms|x-safari-https?|fb|instagram|market):\/\/[^\s"'<>]+/gi) || []))
    ).slice(0, 10);
    hop.appStoreUrlsInBody = Array.from(
      new Set((body.match(/https?:\/\/(?:apps|itunes)\.apple\.com[^\s"'<>]*/gi) || []))
    ).slice(0, 10);
    hop.bodyHead = body.slice(0, 1200);
    hops.push(hop);
    break;
  }

  return hops;
}

module.exports = async (req, res) => {
  const out = {};
  for (const t of TARGETS) {
    out[t] = {
      instagram_ua: await trace(t, IG_UA),
      safari_ua: await trace(t, SAFARI_UA),
    };
  }
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.status(200).send(JSON.stringify(out, null, 2));
};

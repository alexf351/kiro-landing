// Throwaway. Confirms the vercel.json user-agent rule actually routes in-app
// browsers to the escape page, which cannot be checked from a tool that will
// not let us set a user agent. Hardcoded targets, no URL parameter. Delete once
// the routing is confirmed.

const UAS = {
  instagram_ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
    'Mobile/15E148 Instagram 350.0.0.0.0 (iPhone16,2; iOS 18_5; en_US; en; scale=3.00; 1290x2796)',
  tiktok_ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
    'Mobile/15E148 BytedanceWebview/d8a21c6 musical_ly_37.5.0',
  safari_ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) ' +
    'Version/18.0 Mobile/15E148 Safari/604.1',
  chrome_android:
    'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  desktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
};

const PATHS = ['https://tryiro.com/download', 'https://tryiro.com/app'];

module.exports = async (req, res) => {
  const out = {};
  for (const path of PATHS) {
    out[path] = {};
    for (const [name, ua] of Object.entries(UAS)) {
      try {
        const r = await fetch(path, {
          redirect: 'manual',
          headers: { 'user-agent': ua, accept: 'text/html,*/*' },
        });
        out[path][name] = { status: r.status, location: r.headers.get('location') || null };
      } catch (e) {
        out[path][name] = { error: String(e.message || e) };
      }
    }
  }
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.status(200).send(JSON.stringify(out, null, 2));
};

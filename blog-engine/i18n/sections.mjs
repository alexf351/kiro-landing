/*
 * sections.mjs — where each part of the homepage lives, so a dictionary entry
 * only ever replaces text inside the part of the page it was written for.
 * "Gold" the rank label and "Gold" inside some other sentence cannot collide.
 *
 * type html   : prose + user-facing attributes inside the element (never inside
 *               <script>/<style> within it)
 * type script : string literals inside the inline <script> whose body contains
 *               `marker`
 * type jsonld : text values of every application/ld+json block
 */
export const SECTIONS = [
  { id: 'head', type: 'html', select: 'head' },
  { id: 'overlays', type: 'html', from: '<body>', to: '<nav id="nav">', note: 'skip link, in-app-browser sheet, App Store bar, language suggestion' },
  { id: 'nav', type: 'html', select: 'nav#nav' },
  { id: 'hero', type: 'html', select: 'header#top' },
  { id: 'why', type: 'html', select: 'section#why' },
  { id: 'showcase', type: 'html', select: 'section#showcase' },
  { id: 'coach', type: 'html', select: 'section#ask-iro' },
  { id: 'proof', type: 'html', select: 'section#proof' },
  { id: 'webappBanner', type: 'html', select: 'div.webapp-banner' },
  { id: 'customPaths', type: 'html', select: 'section#custom-paths' },
  { id: 'certs', type: 'html', select: 'section#certs' },
  { id: 'pricing', type: 'html', select: 'section#pricing' },
  { id: 'faq', type: 'html', select: 'section#faq' },
  { id: 'askAi', type: 'html', select: 'section#ask-ai' },
  { id: 'final', type: 'html', select: 'section.final' },
  { id: 'featured', type: 'html', select: 'div.featured' },
  { id: 'footer', type: 'html', select: 'footer' },
  { id: 'js.coach', type: 'script', marker: 'AI Coach live chat' },
  { id: 'js.universe', type: 'script', marker: 'Iro AI — Skill Universe' },
  { id: 'js.showcase', type: 'script', marker: 'Inside the app (phone left, copy right)' },
  { id: 'js.interactions', type: 'script', marker: 'Iro AI — interactions' },
  { id: 'js.inAppBrowser', type: 'script', marker: 'In-app browser detection' },
  { id: 'js.appBanner', type: 'script', marker: 'Custom App Store banner' },
  { id: 'js.localeSuggest', type: 'script', marker: 'Browser-language suggestion' },
  { id: 'js.cpData', type: 'script', marker: 'Custom Paths: topic data' },
  { id: 'js.cpEngine', type: 'script', marker: 'Custom Paths: Assembly-line demo engine' },
  { id: 'jsonld', type: 'jsonld' },
];

// Resolve a section to [start, end) offsets in `html`, using the parsed tree.
export function locate(section, html, root) {
  if (section.type === 'jsonld') return null;
  if (section.type === 'script') {
    const re = /<script(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g;
    for (const m of html.matchAll(re)) if (m[1].includes(section.marker)) {
      const bodyStart = m.index + m[0].indexOf('>') + 1;
      return [bodyStart, bodyStart + m[1].length];
    }
    return null;
  }
  if (section.from) {
    const a = html.indexOf(section.from);
    const b = a < 0 ? -1 : html.indexOf(section.to, a);
    return a < 0 || b < 0 ? null : [a, b];
  }
  const [, tag, sep, name] = section.select.match(/^([a-z0-9]+)(?:([#.])([\w-]+))?$/);
  let hit = null;
  const walk = (n) => {
    if (hit) return;
    if (n.tag === tag && (!sep || (sep === '#' ? n.attrs.id === name : (n.attrs.class || '').split(/\s+/).includes(name)))) { hit = n; return; }
    n.children.forEach(walk);
  };
  walk(root);
  return hit ? [hit.start, hit.end] : null;
}

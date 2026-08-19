/* Inline logo marks for the Ask-AI chips.
 *
 * Hand-built, not official brand assets — they render at ~15px inside a chip,
 * where a correct silhouette is all that survives. Used as identifying marks
 * for links that open each assistant, which is what nominative use is for.
 * If you ever want exact artwork, drop the official SVG in here; the shape of
 * this map is all the build scripts depend on.
 *
 * Each is a 24x24 viewBox, sized down by .askai-chip svg in the stylesheet.
 * Monochrome marks use currentColor so they inherit the chip's text colour and
 * stay legible on the dark ground; Google keeps its four brand colours because
 * a one-colour Google G reads as nothing at all.
 */
export const ASK_AI_LOGOS = {
  // OpenAI: the interwoven knot — three capsules at 60 degree turns, which is
  // the six-fold rosette the real mark resolves to at this size.
  chatgpt:
    '<svg class="ai-logo" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke="currentColor" stroke-width="1.6">' +
    [0, 60, 120]
      .map((a) => `<rect x="3.2" y="8.6" width="17.6" height="6.8" rx="3.4" transform="rotate(${a} 12 12)"/>`)
      .join('') +
    '</g></svg>',

  // Claude: radial burst of tapered rays.
  claude:
    '<svg class="ai-logo" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<g fill="#D97757">' +
    [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
      .map((a, i) => {
        const len = i % 2 === 0 ? 9.2 : 6.4;
        return `<path d="M12 12 11.05 ${12 - len} 12 ${12 - len - 0.9} 12.95 ${12 - len}z" transform="rotate(${a} 12 12)"/>`;
      })
      .join('') +
    '</g></svg>',

  // Perplexity: vertical spine with mirrored brackets opening off it.
  perplexity:
    '<svg class="ai-logo" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke="#20B8CD" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 3.4v17.2"/>' +
    '<path d="M8.6 6.2a6.2 6.2 0 0 0 0 11.6"/><path d="M15.4 6.2a6.2 6.2 0 0 1 0 11.6"/>' +
    '<path d="M5.1 9.1h13.8"/><path d="M5.1 14.9h13.8"/>' +
    '</g></svg>',

  // Grok: xAI slash mark — two angled strokes with a cut through them.
  grok:
    '<svg class="ai-logo" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<g fill="currentColor">' +
    '<path d="M5.2 20h3.2L18.8 4h-3.2z"/><path d="M5.2 4l4.6 6.6-1.9 2.7L2 4z"/>' +
    '<path d="M13.6 15.2 15.5 12.5 20 20h-3.2z"/>' +
    '</g></svg>',

  // Google: the four-colour G, drawn as arcs of one ring plus the crossbar.
  'google-ai':
    '<svg class="ai-logo" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke-width="3.4">' +
    '<path stroke="#EA4335" d="M20.1 7.6A8.4 8.4 0 0 0 5.2 8"/>' +
    '<path stroke="#FBBC05" d="M5.2 8a8.4 8.4 0 0 0 0 8"/>' +
    '<path stroke="#34A853" d="M5.2 16a8.4 8.4 0 0 0 15.1-.6"/>' +
    '<path stroke="#4285F4" d="M20.3 15.4A8.4 8.4 0 0 0 20.4 12H12"/>' +
    '</g></svg>',
};

/** Chip anchor, logo + label + the little external-link arrow. */
export function askAiChip(name, key, href) {
  return (
    `<a class="askai-chip" href="${href}" target="_blank" rel="noopener" data-engine="${key}">` +
    (ASK_AI_LOGOS[key] || '') +
    `${name}<span aria-hidden="true">&#8599;</span></a>`
  );
}

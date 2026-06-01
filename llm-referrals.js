/* Iro AI — LLM / AI-assistant referral classification.
 *
 * PostHog (and GA) lump AI-assistant referrers into generic "referral" or, when the
 * referrer header is stripped, "direct" — so Perplexity / Claude / Gemini / Copilot
 * traffic is invisible even though it exists. This script reads document.referrer
 * (and utm_source) and tags a clean `ai_source` so every assistant is visible by name.
 *
 * Safe to load on any page. No-ops gracefully if PostHog isn't present yet (it queues
 * via the PostHog stub). Records first-touch in localStorage so the attribution
 * survives later same-session navigations that drop the referrer.
 */
(function () {
  'use strict';

  // hostname substring -> canonical source name
  var MAP = [
    [/chatgpt\.com|chat\.openai\.com|openai\.com/i, 'chatgpt'],
    [/perplexity\.ai/i, 'perplexity'],
    [/claude\.ai|anthropic\.com/i, 'claude'],
    [/gemini\.google\.com|bard\.google\.com/i, 'gemini'],
    [/copilot\.microsoft\.com|copilot\.cloud\.microsoft|bing\.com\/(chat|copilot)/i, 'copilot'],
    [/you\.com/i, 'you'],
    [/poe\.com/i, 'poe'],
    [/grok\.com|x\.ai/i, 'grok'],
    [/duckduckgo\.com\/.*(chat|aichat)/i, 'duckduckgo-ai'],
    [/phind\.com/i, 'phind'],
    [/kagi\.com/i, 'kagi'],
    [/mistral\.ai|chat\.mistral/i, 'mistral'],
    [/meta\.ai/i, 'meta-ai']
  ];

  function classify(str) {
    if (!str) return null;
    for (var i = 0; i < MAP.length; i++) {
      if (MAP[i][0].test(str)) return MAP[i][1];
    }
    return null;
  }

  var ref = document.referrer || '';
  var utm = '';
  try { utm = new URLSearchParams(location.search).get('utm_source') || ''; } catch (e) {}

  // utm_source can carry an explicit AI tag even when the referrer is blank
  var source = classify(ref) || classify(utm);

  // first-touch persistence
  var KEY = 'iro_ai_source';
  var firstTouch = null;
  try { firstTouch = localStorage.getItem(KEY); } catch (e) {}
  if (source && !firstTouch) {
    try { localStorage.setItem(KEY, source); } catch (e) {}
    firstTouch = source;
  }

  if (!source && !firstTouch) return; // nothing AI-related to report

  var current = source || 'none-this-visit';

  function send() {
    if (!window.posthog || !window.posthog.capture) return false;
    // register so it rides along on every subsequent event in the session
    if (posthog.register) {
      posthog.register({ ai_source: current, ai_source_first_touch: firstTouch || current });
    }
    if (source) {
      posthog.capture('ai_referral', {
        ai_source: source,
        referrer: ref || null,
        landing_path: location.pathname
      });
    }
    return true;
  }

  // PostHog may load after this script; retry briefly.
  if (!send()) {
    var tries = 0;
    var t = setInterval(function () {
      if (send() || ++tries > 40) clearInterval(t); // ~10s max
    }, 250);
  }
})();

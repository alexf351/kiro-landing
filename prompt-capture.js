/* Iro AI — capture the prompt that brought an AI-referred visitor here.
 *
 * llm-referrals.js already answers "which assistant sent them". This answers
 * "what did they type", which is the part no analytics tool can reconstruct
 * and the only way to learn which queries we actually rank for inside
 * ChatGPT, Claude, Perplexity and friends. Answers land in PostHog as
 * `ai_prompt_reported` with the source attached.
 *
 * Deliberately narrow so it is not a nag:
 *   - only shown when llm-referrals.js has already identified an AI source
 *   - once per browser, ever, whether answered or dismissed
 *   - appears after the visitor has engaged (scroll or dwell), never on load
 *   - never blocks the page; it is a corner card, not a modal
 *   - honours prefers-reduced-motion
 */
(function () {
  'use strict';

  var SRC_KEY = 'iro_ai_source';     // written by llm-referrals.js
  var DONE_KEY = 'iro_prompt_asked'; // set once we have asked, either way
  var DWELL_MS = 14000;
  var SCROLL_AT = 0.45;

  var LABEL = {
    chatgpt: 'ChatGPT', claude: 'Claude', perplexity: 'Perplexity',
    gemini: 'Gemini', copilot: 'Copilot', grok: 'Grok', you: 'You.com',
    poe: 'Poe', phind: 'Phind', kagi: 'Kagi', mistral: 'Mistral',
    'meta-ai': 'Meta AI', 'duckduckgo-ai': 'DuckDuckGo AI'
  };

  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var source = ls(SRC_KEY);
  if (!source || ls(DONE_KEY)) return;
  if (navigator.webdriver) return; // don't prompt headless checks

  var name = LABEL[source] || 'an AI assistant';
  var shown = false;

  function capture(event, props) {
    try {
      if (window.posthog && posthog.capture) posthog.capture(event, props);
    } catch (e) { /* analytics must never break the flow */ }
  }

  function styles() {
    var css = [
      '.pcap{position:fixed;right:16px;bottom:16px;z-index:9999;width:min(340px,calc(100vw - 32px));',
      'background:#141A29;border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px 16px 14px;',
      'box-shadow:0 18px 50px rgba(0,0,0,.55);color:#F2F5FF;',
      'font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;',
      'transform:translateY(12px);opacity:0;transition:opacity .3s ease,transform .3s ease}',
      '.pcap.in{opacity:1;transform:none}',
      '.pcap h4{margin:0 0 6px;font-size:14.5px;font-weight:700;line-height:1.35}',
      '.pcap p{margin:0 0 11px;font-size:12.5px;line-height:1.5;color:#9BA7C4}',
      '.pcap input{width:100%;padding:9px 11px;border-radius:9px;border:1px solid rgba(255,255,255,.16);',
      'background:rgba(255,255,255,.04);color:#F2F5FF;font:inherit;font-size:13px}',
      '.pcap input:focus{outline:2px solid rgba(0,229,255,.55);outline-offset:1px;border-color:transparent}',
      '.pcap .pcap-row{display:flex;gap:8px;margin-top:10px}',
      '.pcap button{flex:1;padding:9px 12px;border-radius:999px;border:0;font:inherit;font-size:13px;',
      'font-weight:700;cursor:pointer}',
      '.pcap .pcap-go{background:linear-gradient(135deg,#00E5FF,#00B4D8);color:#04222B}',
      '.pcap .pcap-no{background:rgba(255,255,255,.06);color:#C9D2EA;flex:0 0 auto;padding:9px 14px}',
      '.pcap .pcap-x{position:absolute;top:8px;right:10px;background:none;border:0;color:#7A87A8;',
      'font-size:17px;line-height:1;cursor:pointer;padding:4px;width:auto;flex:none}',
      '.pcap .pcap-thanks{margin:0;font-size:13px;color:#CFD6EA}',
      // self-contained: never rely on a host page defining .sr-only
      '.pcap .pcap-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;',
      'overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
      '@media(prefers-reduced-motion:reduce){.pcap{transition:none;transform:none;opacity:1}}'
    ].join('');
    var el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
  }

  function close(reason) {
    save(DONE_KEY, '1');
    var c = document.querySelector('.pcap');
    if (!c) return;
    c.classList.remove('in');
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 320);
    if (reason) capture('ai_prompt_dismissed', { ai_source: source, reason: reason });
  }

  function show() {
    if (shown) return;
    shown = true;
    styles();

    var card = document.createElement('div');
    card.className = 'pcap';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'One quick question');
    card.innerHTML =
      '<button class="pcap-x" type="button" aria-label="Close">&times;</button>' +
      '<h4>You found Iro through ' + name + '.</h4>' +
      '<p>What did you type? It is the only way we learn which questions bring people here.</p>' +
      '<form><label class="pcap-sr" for="pcap-q">The prompt you used</label>' +
      '<input id="pcap-q" name="q" type="text" autocomplete="off" ' +
      'placeholder="e.g. best app to learn AI" maxlength="300"/>' +
      '<div class="pcap-row"><button class="pcap-go" type="submit">Send</button>' +
      '<button class="pcap-no" type="button">No thanks</button></div></form>';

    document.body.appendChild(card);
    requestAnimationFrame(function () { card.classList.add('in'); });
    capture('ai_prompt_asked', { ai_source: source });

    card.querySelector('.pcap-x').addEventListener('click', function () { close('close'); });
    card.querySelector('.pcap-no').addEventListener('click', function () { close('no-thanks'); });

    card.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = card.querySelector('#pcap-q').value.trim();
      if (!v) return close('empty');
      save(DONE_KEY, '1'); // persist first: never re-ask because analytics failed
      capture('ai_prompt_reported', {
        ai_source: source,
        prompt: v.slice(0, 300),
        landing_path: location.pathname
      });
      card.innerHTML = '<p class="pcap-thanks">Thank you — that genuinely helps.</p>';
      setTimeout(function () { close(null); }, 2200);
    });
  }

  function armTriggers() {
    var timer = setTimeout(show, DWELL_MS);
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      if (max > 0 && (h.scrollTop || document.body.scrollTop) / max >= SCROLL_AT) {
        clearTimeout(timer);
        window.removeEventListener('scroll', onScroll);
        show();
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', armTriggers);
  } else {
    armTriggers();
  }
})();

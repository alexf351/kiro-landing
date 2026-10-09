/* Iro AI — analytics consent gate + CTA click tracking.
 *
 * Loaded (synchronously, in <head>) on every page in place of the old inline
 * PostHog snippet. Nothing that stores or sends analytics data runs until the
 * visitor chooses:
 *   - no choice yet  -> show the banner; PostHog is not loaded, and
 *                       /llm-referrals.js and /prompt-capture.js do not run
 *   - Accept         -> PostHog init exactly as before, then the referral
 *                       scripts (and the extra tracker on the pages that had it)
 *   - Reject         -> none of the above, ever, in this browser
 * The choice is one localStorage flag, `iro_consent` = "granted" | "denied".
 *
 * Options, as attributes on this <script> tag:
 *   data-pageview="off"          posthog.init with capture_pageview:false
 *   data-banner="off"            never show the banner on this page (it still
 *                                honours an earlier Accept)
 *   data-cta="off"               the page sends its own cta_clicked; skip ours
 *   data-convex-analytics="on"   also load the convex.site tracker after Accept
 *                                (only the pages that already carried it)
 *
 * Re-open the banner from anywhere with a link to #cookie-settings, an element
 * with data-cookie-settings, or window.iroConsent.open(). Switching from
 * Accept to Reject clears the analytics storage and reloads the page.
 */
(function () {
  'use strict';

  var KEY = 'iro_consent';
  var PH_KEY = 'phc_WkvD7IaVmxRJFXWpiu5MkabZL1iQZpPmDTvMmQTkXkc'; // public project key
  var PH_HOST = 'https://us.i.posthog.com';
  var CONVEX_SRC = 'https://aromatic-caribou-889.convex.site/api/a/am_xBvr5KPeNgRbN-Cp';

  var me = document.currentScript;
  function opt(name) { return me ? me.getAttribute('data-' + name) : null; }

  var memory = null; // fallback when localStorage is blocked
  function getChoice() {
    try { var v = localStorage.getItem(KEY); if (v) return v; } catch (e) {}
    return memory;
  }
  function setChoice(v) {
    memory = v;
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function addScript(src, async) {
    var s = document.createElement('script');
    s.src = src;
    s.async = !!async; // false keeps llm-referrals.js before prompt-capture.js
    (document.head || document.documentElement).appendChild(s);
  }

  var started = false;
  function startAnalytics() {
    if (started) return;
    started = true;
    // PostHog's standard loader snippet, unchanged.
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    var cfg = { api_host: PH_HOST, person_profiles: 'identified_only' };
    if (opt('pageview') === 'off') cfg.capture_pageview = false;
    posthog.init(PH_KEY, cfg);
    addScript('/llm-referrals.js');
    addScript('/prompt-capture.js');
    if (opt('convex-analytics') === 'on') addScript(CONVEX_SRC, true);
  }

  // Remove what analytics stored, for a visitor who withdraws consent.
  function clearAnalyticsStorage() {
    try {
      for (var i = localStorage.length - 1; i >= 0; i--) {
        var k = localStorage.key(i);
        if (/^(ph_|am_)|^__ph|^iro_ai_source$|^iro_prompt_asked$/.test(k)) localStorage.removeItem(k);
      }
    } catch (e) {}
    try {
      for (var j = sessionStorage.length - 1; j >= 0; j--) {
        var sk = sessionStorage.key(j);
        if (/^(ph_|am_)|^__ph/.test(sk)) sessionStorage.removeItem(sk);
      }
    } catch (e) {}
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^(ph_|am_)|^__ph/.test(name)) return;
      ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
      });
    });
  }

  // ---------- banner ----------
  var STRINGS = {
    en: { text: 'We use cookies to see which pages help you.', accept: 'Accept', reject: 'Reject', privacy: 'Privacy', label: 'Cookie choice' },
    es: { text: 'Usamos cookies para ver qué páginas te ayudan.', accept: 'Aceptar', reject: 'Rechazar', privacy: 'Privacidad', label: 'Preferencia de cookies' },
    fr: { text: 'Nous utilisons des cookies pour voir quelles pages vous aident.', accept: 'Accepter', reject: 'Refuser', privacy: 'Confidentialité', label: 'Choix des cookies' },
    de: { text: 'Wir nutzen Cookies, um zu sehen, welche Seiten dir helfen.', accept: 'Akzeptieren', reject: 'Ablehnen', privacy: 'Datenschutz', label: 'Cookie-Auswahl' },
    it: { text: 'Usiamo i cookie per capire quali pagine ti sono utili.', accept: 'Accetta', reject: 'Rifiuta', privacy: 'Privacy', label: 'Scelta sui cookie' },
    pt: { text: 'Usamos cookies para ver quais páginas ajudam você.', accept: 'Aceitar', reject: 'Recusar', privacy: 'Privacidade', label: 'Escolha de cookies' }
  };
  function strings() {
    var lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().slice(0, 2);
    return STRINGS[lang] || STRINGS.en;
  }

  var CSS =
    '.iro-consent{position:fixed;right:16px;bottom:16px;z-index:9500;box-sizing:border-box;' +
    'width:min(420px,calc(100vw - 32px));display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;' +
    'padding:14px 16px;border-radius:16px;border:1px solid var(--line-strong,rgba(255,255,255,.14));' +
    'background:rgba(10,14,24,.92);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);' +
    'box-shadow:0 18px 50px rgba(0,0,0,.55);color:var(--ink,#F2F5FF);' +
    "font-family:'Outfit',system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;line-height:1.4;" +
    'transition:bottom .2s ease}' +
    '.iro-consent[hidden]{display:none}' +
    '.iro-consent p{flex:1 1 220px;margin:0;color:var(--ink-2,#9BA7C4)}' +
    '.iro-consent p a{color:var(--ink-2,#9BA7C4);text-decoration:underline;text-underline-offset:3px}' +
    '.iro-consent p a:hover{color:var(--ink,#F2F5FF)}' +
    '.iro-consent-row{display:flex;gap:8px;flex:1 0 auto}' +
    '.iro-consent button{flex:1;min-width:96px;min-height:40px;padding:9px 16px;border-radius:999px;cursor:pointer;' +
    "font-family:'Outfit',system-ui,sans-serif;font-weight:700;font-size:14px;line-height:1}" +
    '.iro-consent .iro-consent-yes{border:1px solid transparent;color:var(--accent-ink,#04222B);background:var(--accent,#00E5FF)}' +
    '.iro-consent .iro-consent-no{border:1px solid var(--line-strong,rgba(255,255,255,.14));color:var(--ink,#F2F5FF);background:rgba(255,255,255,.06)}' +
    '.iro-consent .iro-consent-no:hover{background:rgba(255,255,255,.1)}' +
    '.iro-consent button:focus-visible{outline:2px solid var(--accent,#00E5FF);outline-offset:2px}' +
    '@media(max-width:560px){.iro-consent{left:12px;right:12px;bottom:12px;width:auto;flex-wrap:nowrap;gap:10px;' +
    'padding:10px 10px 10px 14px;font-size:13px;line-height:1.35}' +
    '.iro-consent p{flex:1 1 auto;min-width:0}.iro-consent-row{flex:0 0 auto;gap:6px}' +
    '.iro-consent button{min-width:0;min-height:38px;padding:8px 13px;font-size:13.5px}}' +
    '@media print{.iro-consent{display:none}}';

  var banner = null;
  function choose(v) {
    var before = getChoice();
    setChoice(v);
    if (banner) banner.hidden = true;
    if (v === 'granted') {
      startAnalytics();
    } else if (before === 'granted' || started) {
      clearAnalyticsStorage();
      location.reload();
    }
  }

  // Keep clear of the homepage's fixed App Store bar on iOS.
  function avoidAppBanner() {
    var bar = document.getElementById('appBanner');
    if (!banner || !bar) return;
    function place() {
      var shown = bar.classList.contains('show') && bar.offsetHeight;
      banner.style.bottom = shown ? (bar.offsetHeight + 12) + 'px' : '';
    }
    place();
    if (window.MutationObserver) new MutationObserver(place).observe(bar, { attributes: true, attributeFilter: ['class'] });
  }

  function openBanner() {
    if (!document.body) return;
    if (banner) { banner.hidden = false; return; }
    var t = strings();
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    banner = document.createElement('div');
    banner.className = 'iro-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', t.label);
    banner.innerHTML =
      '<p>' + t.text + ' <a href="/privacy">' + t.privacy + '</a></p>' +
      '<div class="iro-consent-row">' +
      '<button type="button" class="iro-consent-no">' + t.reject + '</button>' +
      '<button type="button" class="iro-consent-yes">' + t.accept + '</button>' +
      '</div>';
    banner.querySelector('.iro-consent-yes').addEventListener('click', function () { choose('granted'); });
    banner.querySelector('.iro-consent-no').addEventListener('click', function () { choose('denied'); });
    document.body.appendChild(banner);
    avoidAppBanner();
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  window.iroConsent = { get: getChoice, open: function () { whenReady(openBanner); } };

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest && e.target.closest('a[href="#cookie-settings"],[data-cookie-settings]');
    if (!el) return;
    e.preventDefault();
    openBanner();
  });

  // Banner button order: App Store leads on iPhone, the web app everywhere else.
  whenReady(function () {
    var iphone = /iPhone|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (iphone) return;
    document.querySelectorAll('.iro-banner .cta-row').forEach(function (row) {
      var web = row.querySelector('a[href*="app.tryiro.com"]');
      if (web) row.insertBefore(web, row.firstChild);
    });
  });

  var choice = getChoice();
  if (choice === 'granted') startAnalytics();
  else if (choice !== 'denied' && opt('banner') !== 'off') whenReady(openBanner);

  // ---------- cta_clicked outside the homepages ----------
  // The homepages send cta_clicked themselves (data-cta="off" there). Same event
  // name and properties: cta (app_store | web_app) and placement.
  if (opt('cta') === 'off') return;
  function placement(a) {
    var p = a.getAttribute('data-placement');
    if (p) return p;
    if (a.closest('footer')) return 'footer';
    if (a.closest('.nav, nav')) return 'nav';
    if (a.closest('.hero')) return 'hero';
    if (a.closest('.cta-box')) return 'in-article';
    if (a.closest('.iro-banner')) return 'bottom-banner';
    if (a.closest('.ctaband')) return 'bottom';
    if (a.closest('.related')) return 'related';
    if (a.closest('.faq')) return 'faq';
    if (a.closest('.content, article, .sec, .log, main')) return 'in-text';
    return 'page';
  }
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest || !window.posthog || !window.posthog.capture) return;
    var a = e.target.closest('a[href*="apps.apple.com"],a[href*="app.tryiro.com"]');
    if (!a) return;
    var cta = a.href.indexOf('apps.apple.com') > -1 ? 'app_store' : 'web_app';
    posthog.capture('cta_clicked', { cta: cta, placement: placement(a) });
  });
})();

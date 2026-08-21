/* datafast-goals.js — custom goals for DataFast.
 *
 * Two jobs:
 *   1. Fire a goal when someone clicks a real conversion link (App Store, web app).
 *   2. Mirror a whitelist of events the site ALREADY sends to PostHog, so goals
 *      and product analytics cannot drift apart and nothing is instrumented twice.
 *
 * Why the mirror matters: ask_ai_clicked alone is wired into 117 places. Copying
 * that by hand would guarantee divergence. Wrapping posthog.capture picks all of
 * it up for free, including anything added later.
 *
 * Naming rules are DataFast's, taken from the SDK source (isValidEventName):
 * /^[a-z0-9_:-]+$/, max 64 chars. Properties: max 10, keys /^[a-z0-9_-]+$/i.
 * Everything below already conforms; sendGoal re-checks anyway so a bad name is
 * dropped locally instead of being silently rejected server-side.
 *
 * Safety: the DataFast tag is `defer`, so nothing is ready at parse time. Goals
 * queue until it is. Every path is wrapped so that an ad blocker, an outage, or
 * a DataFast API change can never break a page — and, critically, the
 * posthog.capture wrapper ALWAYS calls through to the original first, so this
 * file cannot take PostHog down with it.
 */
(function () {
  'use strict';

  var QUEUE = [];
  var READY = false;
  var TRIES = 0;
  var VALID_NAME = /^[a-z0-9_:-]{1,64}$/;

  /* The script-tag build's global is resolved at call time rather than assumed:
     accept either a callable window.datafast(name, props) or an object exposing
     .track()/.goal(). Whichever shape ships, this finds it. */
  function resolve() {
    var d = window.datafast;
    if (typeof d === 'function') return function (n, p) { d(n, p); };
    if (d && typeof d.track === 'function') return function (n, p) { d.track(n, p); };
    if (d && typeof d.goal === 'function') return function (n, p) { d.goal(n, p); };
    return null;
  }

  function drain() {
    var send = resolve();
    if (!send) return false;
    READY = true;
    while (QUEUE.length) {
      var g = QUEUE.shift();
      try { send(g[0], g[1]); } catch (e) { /* never surface analytics errors */ }
    }
    return true;
  }

  /* Poll briefly for the deferred script, then give up quietly (~10s). */
  function pump() {
    if (READY || drain()) return;
    if (++TRIES > 40) return;
    setTimeout(pump, 250);
  }

  function sendGoal(name, props) {
    try {
      if (!VALID_NAME.test(name)) return;
      var p = {};
      if (props) {
        var keys = Object.keys(props).slice(0, 10);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (/^[a-z0-9_-]{1,64}$/i.test(k) && props[k] != null && props[k] !== '') {
            p[k] = String(props[k]).slice(0, 255);
          }
        }
      }
      if (READY) {
        var send = resolve();
        if (send) { send(name, p); return; }
        READY = false;
      }
      if (QUEUE.length < 50) QUEUE.push([name, p]);
      pump();
    } catch (e) { /* analytics must never throw into page code */ }
  }

  /* Page path, normalised, as the one shared property. Query strings and
     fragments are stripped: they add cardinality without adding meaning. */
  function where() {
    try { return (location.pathname || '/').slice(0, 255); } catch (e) { return '/'; }
  }

  /* ---- 1. conversion clicks, by delegation ------------------------------
     Delegation means this works on all 181 pages, including the ones the blog
     and path generators produce, without touching any markup. Capture phase so
     it still fires if something downstream stops propagation. */
  document.addEventListener('click', function (ev) {
    try {
      var a = ev.target && ev.target.closest && ev.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (/apps\.apple\.com|itunes\.apple\.com/.test(href)) {
        sendGoal('app_store_click', { source: where() });
      } else if (/app\.tryiro\.com/.test(href)) {
        sendGoal('web_app_click', { source: where() });
      }
    } catch (e) { /* ignore */ }
  }, true);

  /* ---- 2. mirror selected PostHog events --------------------------------
     Whitelisted deliberately. Mirroring everything would bury the goals that
     represent an actual decision under high-volume noise like quiz_answer. */
  /* NOTE: cta_clicked is deliberately NOT mirrored. It is instrumented inline on
     index.html only, and it fires for App Store, web app AND quiz links — so
     mirroring it would double-count the homepage against app_store_click /
     web_app_click below and count nothing extra anywhere else. Consistent
     coverage from delegation beats richer coverage on one page. */
  var MIRROR = {
    quiz_started: 'quiz_started',
    quiz_completed: 'quiz_completed',
    quiz_shared: 'quiz_shared',
    android_waitlist_signup: 'android_waitlist_signup',
    ask_ai_clicked: 'ask_ai_click',
    prompt_copied: 'prompt_copied',
    app_banner_get: 'app_banner_get',
    ai_prompt_reported: 'ai_prompt_reported'
  };

  function wrapPosthog() {
    try {
      var ph = window.posthog;
      if (!ph || typeof ph.capture !== 'function' || ph.__dfWrapped) return false;
      var original = ph.capture.bind(ph);
      ph.capture = function (event, props) {
        /* Original first and unconditionally: PostHog must be unaffected even
           if everything below fails. */
        var out;
        try { out = original.apply(null, arguments); } catch (e) { out = undefined; }
        try {
          var goal = MIRROR[event];
          if (goal) {
            var extra = { source: where() };
            if (props && props.engine) extra.engine = props.engine;
            if (props && props.placement) extra.placement = props.placement;
            sendGoal(goal, extra);
          }
        } catch (e) { /* ignore */ }
        return out;
      };
      ph.__dfWrapped = true;
      return true;
    } catch (e) { return false; }
  }

  /* posthog.init runs inline above this file, but capture may be replaced when
     the real array.js loads, so retry briefly rather than wrapping once. */
  var phTries = 0;
  (function wrapLater() {
    if (wrapPosthog()) return;
    if (++phTries > 40) return;
    setTimeout(wrapLater, 250);
  })();

  pump();
})();

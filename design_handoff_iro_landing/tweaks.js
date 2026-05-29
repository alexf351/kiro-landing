/* ============ Iro AI — Tweaks panel (vanilla, no deps) ============ */
(function () {
  'use strict';

  var TWEAKS = { accent: '#00E5FF', herocta: 'below', bg: 'grid', motion: 'full' };

  var ACCENTS = [
    { v: '#00E5FF', name: 'Cyan' },
    { v: '#7C8BFF', name: 'Indigo' },
    { v: '#2EE6A6', name: 'Mint' },
    { v: '#FF5CE1', name: 'Magenta' },
    { v: '#FFC24B', name: 'Amber' }
  ];

  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.replace(/./g, function (c) { return c + c; });
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function apply() {
    var root = document.documentElement;
    var rgb = hexToRgb(TWEAKS.accent);
    root.style.setProperty('--accent', TWEAKS.accent);
    root.style.setProperty('--accent-rgb', rgb.join(','));
    var lum = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    root.style.setProperty('--accent-ink', lum > 150 ? '#04161d' : '#ffffff');
    root.setAttribute('data-herocta', TWEAKS.herocta);
    root.setAttribute('data-bg', TWEAKS.bg);
    root.setAttribute('data-motion', TWEAKS.motion);
  }

  function set(key, val) {
    TWEAKS[key] = val;
    apply();
    render();
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: (function () { var o = {}; o[key] = val; return o; })() }, '*'); } catch (e) {}
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: { key: key, value: val } }));
  }

  apply();

  /* ---- styles ---- */
  var css = document.createElement('style');
  css.textContent = [
    '.iro-twk{position:fixed;right:18px;bottom:18px;z-index:2147483646;width:248px;',
    'background:rgba(12,16,26,.82);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);',
    'border:1px solid rgba(255,255,255,.1);border-radius:16px;color:#F2F5FF;',
    'box-shadow:0 1px 0 rgba(255,255,255,.06) inset,0 20px 50px rgba(0,0,0,.55);',
    "font-family:'Outfit',system-ui,sans-serif;overflow:hidden;display:none}",
    '.iro-twk.open{display:block}',
    '.iro-twk-hd{display:flex;align-items:center;justify-content:space-between;padding:13px 12px 13px 16px;border-bottom:1px solid rgba(255,255,255,.07)}',
    ".iro-twk-hd b{font-family:'Geist',sans-serif;font-size:13px;font-weight:700;letter-spacing:-.01em}",
    '.iro-twk-x{appearance:none;border:0;background:transparent;color:rgba(242,245,255,.5);width:24px;height:24px;border-radius:7px;cursor:pointer;font-size:13px}',
    '.iro-twk-x:hover{background:rgba(255,255,255,.08);color:#fff}',
    '.iro-twk-bd{padding:14px 16px 16px;display:flex;flex-direction:column;gap:14px}',
    ".iro-twk-sec{font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:rgba(242,245,255,.45);margin-bottom:-6px}",
    '.iro-twk-sw{display:flex;gap:7px}',
    '.iro-twk-sw button{flex:1;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,.12);cursor:pointer;position:relative;transition:transform .15s,box-shadow .2s}',
    '.iro-twk-sw button:hover{transform:translateY(-1px)}',
    '.iro-twk-sw button[data-on="1"]{box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(0,0,0,.4)}',
    '.iro-twk-seg{display:flex;background:rgba(255,255,255,.06);border-radius:9px;padding:3px;gap:2px}',
    '.iro-twk-seg button{flex:1;appearance:none;border:0;background:transparent;color:rgba(242,245,255,.6);',
    "font-family:'Outfit',sans-serif;font-size:11.5px;font-weight:600;padding:6px 4px;border-radius:6px;cursor:pointer;transition:all .18s;letter-spacing:.01em}",
    '.iro-twk-seg button[data-on="1"]{background:rgba(255,255,255,.12);color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.3)}'
  ].join('');
  document.head.appendChild(css);

  /* ---- DOM ---- */
  var panel = document.createElement('div');
  panel.className = 'iro-twk';
  panel.setAttribute('data-omelette-chrome', '');
  document.body.appendChild(panel);

  function seg(key, opts) {
    return '<div class="iro-twk-seg" data-key="' + key + '">' +
      opts.map(function (o) {
        return '<button data-val="' + o.v + '" data-on="' + (TWEAKS[key] === o.v ? '1' : '0') + '">' + o.l + '</button>';
      }).join('') + '</div>';
  }

  function render() {
    panel.innerHTML =
      '<div class="iro-twk-hd"><b>Tweaks</b><button class="iro-twk-x" aria-label="Close">\u2715</button></div>' +
      '<div class="iro-twk-bd">' +
        '<div class="iro-twk-sec">Accent</div>' +
        '<div class="iro-twk-sw" data-key="accent">' +
          ACCENTS.map(function (a) {
            return '<button title="' + a.name + '" data-val="' + a.v + '" data-on="' + (TWEAKS.accent.toLowerCase() === a.v.toLowerCase() ? '1' : '0') + '" style="background:' + a.v + '"></button>';
          }).join('') +
        '</div>' +
        '<div class="iro-twk-sec">Hero CTA</div>' +
        seg('herocta', [{ v: 'above', l: 'Above' }, { v: 'below', l: 'Below' }]) +
        '<div class="iro-twk-sec">Background</div>' +
        seg('bg', [{ v: 'grid', l: 'Grid' }, { v: 'dots', l: 'Dots' }, { v: 'plain', l: 'Plain' }]) +
        '<div class="iro-twk-sec">Motion</div>' +
        seg('motion', [{ v: 'full', l: 'Full' }, { v: 'calm', l: 'Calm' }]) +
      '</div>';
  }
  render();

  panel.addEventListener('click', function (e) {
    var x = e.target.closest('.iro-twk-x');
    if (x) { close(); return; }
    var btn = e.target.closest('button[data-val]');
    if (!btn) return;
    var key = btn.parentElement.getAttribute('data-key');
    if (key) set(key, btn.getAttribute('data-val'));
  });

  /* ---- host protocol ---- */
  var open = false;
  function openP() { open = true; panel.classList.add('open'); }
  function close() { open = false; panel.classList.remove('open'); try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {} }
  window.addEventListener('message', function (e) {
    var t = e && e.data && e.data.type;
    if (t === '__activate_edit_mode') openP();
    else if (t === '__deactivate_edit_mode') { open = false; panel.classList.remove('open'); }
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();

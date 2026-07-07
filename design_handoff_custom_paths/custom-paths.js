/* ============================================================
   Iro AI — Custom Paths ("Learn anything") — Assembly line engine
   Design reference. Vanilla JS; no dependencies. Requires paths-data.js
   (window.CP) to be loaded first.

   Behaviour:
   - Auto-types a topic into the prompt, "generates", then threads the
     lessons onto a connector spine (+ lesson-1 preview + recap card).
   - Loops through CP.TOPICS. Clicking the input pauses the loop and lets
     the visitor type their own topic (CP.resolve() maps it to a path).
   - Starts when the section scrolls into view (IntersectionObserver),
     with a timer fallback.
   ============================================================ */
(function () {
  'use strict';

  var CP = window.CP;
  if (!CP) { console.warn('[custom-paths] paths-data.js (window.CP) not found'); return; }
  var REDUCE = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  var STAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.3 21 12 17.6 5.7 21 7 14 2 9.3 9 8.5 12 2"/></svg>';

  /* timing (ms) */
  var TYPE = 46, AFTER_TYPE = 320, STAGGER = 185, GEN = 950, HOLD = 3800, FADE = 340;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function Controller(sec) {
    var self = this;
    this.sec = sec;
    this.input = sec.querySelector('.cp-input');
    this.typeEl = sec.querySelector('.cp-type');
    this.editEl = sec.querySelector('.cp-edit');
    this.pathEl = sec.querySelector('.cp-path');
    this.hint = sec.querySelector('.cp-hint');
    this.chips = sec.querySelectorAll('.cp-chip');
    this.idx = 0;
    this.paused = false;
    this.editing = false;
    this.started = false;
    this.timers = [];
    this.current = null;

    // first topic rendered + visible immediately so there is always content
    this.render(CP.TOPICS[0], true);
    this.pathEl.style.opacity = '1';
    this.typeEl.classList.remove('ph');
    this.typeEl.textContent = CP.TOPICS[0].topic;
    if (this.hint) this.hint.innerHTML = defaultHint();

    // click the input to type your own topic
    this.input.addEventListener('click', function (e) {
      if (e.target.closest('.cp-send')) { self.editing ? self.submit() : self.startEdit(); return; }
      self.startEdit();
    });
    this.editEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); self.submit(); }
      else if (e.key === 'Escape') { self.endEdit(); self.resumeSoon(0); }
    });
    this.editEl.addEventListener('blur', function () {
      if (self.editing && !self.editEl.value.trim()) { self.endEdit(); self.resumeSoon(400); }
    });

    // topic chips jump straight to a topic
    Array.prototype.forEach.call(this.chips, function (chip) {
      chip.addEventListener('click', function () {
        var t = chip.getAttribute('data-topic');
        var i = CP.TOPICS.findIndex(function (d) { return d.topic === t; });
        if (i < 0) return;
        self.editing && self.endEdit();
        self.idx = i; self.paused = false; self.clearTimers(); self.run();
      });
    });
  }

  Controller.prototype.wait = function (ms) {
    var self = this;
    return new Promise(function (res) { var t = setTimeout(res, ms); self.timers.push(t); });
  };
  Controller.prototype.clearTimers = function () { this.timers.forEach(clearTimeout); this.timers = []; };
  Controller.prototype.markChip = function (topic) {
    Array.prototype.forEach.call(this.chips, function (c) { c.classList.toggle('on', c.getAttribute('data-topic') === topic); });
  };

  Controller.prototype.type = function (text) {
    var self = this;
    this.typeEl.classList.remove('ph');
    return new Promise(function (res) {
      if (REDUCE) { self.typeEl.textContent = text; return res(); }
      var i = 0;
      (function step() {
        self.typeEl.textContent = text.slice(0, i);
        if (i++ <= text.length) {
          var jitter = text[i - 2] === ' ' ? 90 : TYPE + Math.random() * 40;
          var t = setTimeout(step, jitter); self.timers.push(t);
        } else { res(); }
      })();
    });
  };

  /* build the path card: header, lessons on a spine (+ lesson-1 preview), recap */
  Controller.prototype.render = function (data, instant) {
    var p = this.pathEl, self = this;
    this.current = data;
    p.classList.remove('gen');
    p.innerHTML = '';
    p.appendChild(el('div', 'cp-scan'));
    p.appendChild(el('div', 'cp-genlabel', 'Generating'));
    p.appendChild(el('div', 'cp-path-head',
      '<span class="lbl">Your path</span><span class="meta">5 lessons · quiz · recap</span>'));

    var list = el('div', 'cp-lessons');
    data.lessons.forEach(function (ls, i) {
      var row = el('div', 'cp-lesson' + (i === 0 ? ' first' : ''));
      var pv = (i === 0 && data.preview)
        ? '<div class="cp-preview"><div class="pl">Lesson preview</div><div class="pc">' + esc(data.preview.concept) +
          '</div><div class="pe"><b>Try it:</b> ' + esc(data.preview.exercise) + '</div></div>' : '';
      row.innerHTML = '<span class="cp-n">' + (i + 1) + '</span><div class="cp-lt"><div class="t">' + esc(ls.t) + '</div>' + pv + '</div>';
      list.appendChild(row);
    });
    p.appendChild(list);

    var recap = el('div', 'cp-recap',
      '<span class="ic">' + STAR + '</span><div><span class="rt">Recap card</span>' +
      '<span class="rd"> · <b>' + esc(data.recap) + '</b></span></div>');
    p.appendChild(recap);

    var rows = list.querySelectorAll('.cp-lesson');
    function reveal() {
      rows.forEach(function (r, i) { var t = setTimeout(function () { r.classList.add('in'); }, i * STAGGER); self.timers.push(t); });
      var t2 = setTimeout(function () { recap.classList.add('in'); }, rows.length * STAGGER); self.timers.push(t2);
    }
    if (instant || REDUCE) {
      rows.forEach(function (r) { r.classList.add('in'); }); recap.classList.add('in');
    } else {
      p.classList.add('gen');
      var t = setTimeout(function () { p.classList.remove('gen'); reveal(); }, GEN); this.timers.push(t);
    }
  };

  /* loop */
  Controller.prototype.run = function () {
    var self = this;
    var data = CP.TOPICS[this.idx];
    this.markChip(data.topic);
    this.pathEl.style.opacity = '1';
    this.type('').then(function () { return self.wait(260); })
      .then(function () { return self.type(data.topic); })
      .then(function () { return self.wait(AFTER_TYPE); })
      .then(function () { self.render(data, false); return self.wait(HOLD); })
      .then(function () {
        if (self.paused) return;
        self.idx = (self.idx + 1) % CP.TOPICS.length;
        self.run();
      });
  };

  /* type-your-own */
  Controller.prototype.startEdit = function () {
    if (this.editing) { this.editEl.focus(); return; }
    this.editing = true; this.paused = true; this.clearTimers();
    this.input.classList.add('editing', 'live');
    this.editEl.value = ''; this.editEl.focus();
    if (this.hint) this.hint.innerHTML = '<span class="k">↵</span> Press enter to build your path';
  };
  Controller.prototype.endEdit = function () {
    this.editing = false;
    this.input.classList.remove('editing', 'live');
    if (this.hint) this.hint.innerHTML = defaultHint();
  };
  Controller.prototype.submit = function () {
    var text = (this.editEl.value || '').trim();
    if (!text) { this.endEdit(); this.resumeSoon(400); return; }
    var data = CP.resolve(text);
    this.endEdit();
    this.typeEl.classList.remove('ph');
    this.typeEl.textContent = text;
    this.pathEl.style.opacity = '1';
    this.markChip(data.topic);
    this.render(data, false);
    if (this.hint) this.hint.innerHTML = '<span class="k">✓</span> Built for you · demo resumes shortly';
    this.resumeSoon(6500);
  };
  Controller.prototype.resumeSoon = function (ms) {
    var self = this; this.clearTimers();
    var t = setTimeout(function () {
      if (self.editing) return;
      self.paused = false;
      if (self.hint) self.hint.innerHTML = defaultHint();
      self.idx = (self.idx + 1) % CP.TOPICS.length; self.run();
    }, ms); this.timers.push(t);
  };
  Controller.prototype.start = function () {
    if (this.started) return; this.started = true;
    // topic 0 is already on screen — hold it, then loop from topic 1
    var self = this;
    var t = setTimeout(function () { self.idx = 1 % CP.TOPICS.length; self.run(); }, HOLD);
    this.timers.push(t);
  };

  function defaultHint() { return '<span class="k">Auto-demo</span> · click to try your own topic'; }

  /* boot — start when the section scrolls into view (with a fallback timer) */
  document.querySelectorAll('.cp').forEach(function (sec) {
    var c = new Controller(sec);
    var kicked = false;
    function kick() { if (kicked) return; kicked = true; c.start(); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { kick(); io.disconnect(); } });
      }, { threshold: 0.25 });
      io.observe(sec);
    }
    setTimeout(kick, 1600); // fallback if IO never fires
  });
})();

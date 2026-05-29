/* ============ Iro AI — interactions ============ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---- nav scrolled state ---- */
  var nav = document.getElementById('nav');
  function onScrollNav(){ if(nav) nav.classList.toggle('scrolled', window.scrollY > 12); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal:not(.in)');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- hero parallax (pointer + scroll) ---- */
  var device = document.getElementById('heroDevice');
  var mascot = document.querySelector('.hero-mascot');
  var wordmark = document.querySelector('.hero-wordmark');
  var stage = document.querySelector('.hero-stage');
  var pointerX = 0, pointerY = 0, curX = 0, curY = 0, scrollPy = 0, raf = null;

  function calm(){ return document.documentElement.getAttribute('data-motion') === 'calm'; }

  function loop(){
    curX += (pointerX - curX) * 0.08;
    curY += (pointerY - curY) * 0.08;
    if (device && !calm()) {
      device.style.transform =
        'translate3d(' + (curX*10) + 'px,' + (scrollPy + curY*8) + 'px,0) ' +
        'rotateY(' + (-7 + curX*5) + 'deg) rotateX(' + (3 - curY*4) + 'deg)';
    }
    if (mascot && !calm()) mascot.style.transform = 'translate3d(' + (curX*-18) + 'px,' + (curY*-10) + 'px,0)';
    if (wordmark) wordmark.style.transform = 'translate(-50%,calc(-50% + ' + (scrollPy*0.4 + curX*-12) + 'px))';
    raf = null;
  }
  function request(){ if (raf == null && !reduce) raf = requestAnimationFrame(loop); }

  if (stage && !reduce) {
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
      request();
    }, { passive: true });
    window.addEventListener('scroll', function () {
      if (window.scrollY < window.innerHeight) { scrollPy = window.scrollY * 0.06; request(); }
    }, { passive: true });
  }

  /* ---- gallery: drag to scroll + arrows ---- */
  var gallery = document.getElementById('gallery');
  if (gallery) {
    var down = false, startX = 0, startScroll = 0, moved = 0;
    gallery.addEventListener('pointerdown', function (e) {
      down = true; moved = 0; startX = e.clientX; startScroll = gallery.scrollLeft;
      gallery.classList.add('dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved = Math.abs(dx);
      gallery.scrollLeft = startScroll - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return; down = false; gallery.classList.remove('dragging');
    });
    gallery.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) { if (moved > 6) e.preventDefault(); });
    });
    function step(){ var card = gallery.querySelector('.shot'); return card ? card.offsetWidth + 26 : 280; }
    var prev = document.getElementById('galPrev'), next = document.getElementById('galNext');
    if (prev) prev.addEventListener('click', function () { gallery.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { gallery.scrollBy({ left: step(), behavior: 'smooth' }); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---- count-up stats ---- */
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, t0 = null;
    function tick(ts){
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseFloat(el.getAttribute('data-count')).toLocaleString() + (el.getAttribute('data-suffix') || '');
    });
  }
  /* ---- Android notify form ---- */
  var notifyForm = document.getElementById('notifyForm');
  if (notifyForm) {
    notifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('notifyEmail');
      var done = document.getElementById('notifyDone');
      if (email && email.value && /\S+@\S+\.\S+/.test(email.value)) {
        notifyForm.style.display = 'none';
        if (done) done.hidden = false;
      } else if (email) {
        email.focus();
        email.style.borderColor = '#FF6E5A';
      }
    });
  }
})();

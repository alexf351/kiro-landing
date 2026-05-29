/* ============ Iro AI — Inside the app (phone left, copy right) ============ */
(function () {
  'use strict';

  var SCREENS = [
    { img:'screens/01-prompt-lab.png',    t:'Prompt Lab',   h:'Write real prompts',   tag:'INSTANT FEEDBACK',
      d:'Type a prompt and Iro grades it out of 10 in seconds, then shows you exactly how to make it sharper.',
      b:['Scored on clarity, context and intent','Specific fixes, not vague praise','Practice on your own real scenarios'] },
    { img:'screens/02-learning-paths.png', t:'Paths',        h:'Choose your track',     tag:'18 PATHS',
      d:'Eighteen guided paths, from total beginner on ChatGPT to AI agents and automation.',
      b:['Tools, work, creative and core skills','Start from zero or jump ahead','345 lessons, about 5 minutes each'] },
    { img:'screens/04-duel-victory.png',   t:'Duels',        h:'Battle live opponents', tag:'LIVE PvP',
      d:'Go head-to-head with rivals, win to earn XP and climb the ranked ladder.',
      b:['ELO matchmaking against 60+ rivals','Chain combos for bonus XP','Cyberpunk arenas and podium reveals'] },
    { img:'screens/05-node-map.png',       t:'Skill map',    h:'Watch it connect',      tag:'PROGRESS',
      d:'Every lesson links into one growing map so your fluency visibly compounds.',
      b:['See how skills build on each other','Spot gaps before they cost you','Unlock new branches as you level'] },
    { img:'screens/07-perfect-xp.png',     t:'XP & streaks', h:'Earn every answer',     tag:'DAILY HABIT',
      d:'Correct reps build XP and daily streaks, the momentum that keeps the habit alive.',
      b:['XP on every correct rep','Daily streaks that pull you back','Perfect-round bonuses'] },
    { img:'screens/06-news.png',           t:'Weekly news',  h:'Stay current',          tag:'WEEKLY',
      d:'Short weekly briefings on what actually shipped in AI, with a quiz to make it stick.',
      b:['What launched, minus the hype','Two-minute reads','A quick quiz to lock it in'] },
    { img:'screens/08-ranks.png',          t:'Ranks',        h:'Evolve Kiro',           tag:'6 RANKS',
      d:'Climb six ranks and watch your penguin evolve from Bronze all the way to Iridescent.',
      b:['Six tiers of visible progress','Kiro levels up as you do','Proof you are actually getting good'] }
  ];

  var CHECK = '<svg class="ia-ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>';

  function mount(){
    var img = document.getElementById('iaImg');
    var copy = document.getElementById('iaCaption');
    var dots = document.getElementById('iaDots');
    var prev = document.getElementById('iaPrev');
    var next = document.getElementById('iaNext');
    if (!img || !copy || !dots) return;

    var cur = 0, timer = null, userTouched = false, N = SCREENS.length;

    SCREENS.forEach(function(s){ var im = new Image(); im.src = s.img; });

    dots.innerHTML = SCREENS.map(function(s,i){
      return '<button class="ia-dot" role="tab" data-i="'+i+'" aria-label="'+s.t+'"></button>';
    }).join('');
    var dotEls = [].slice.call(dots.querySelectorAll('.ia-dot'));

    function render(i){
      cur = (i + N) % N;
      var s = SCREENS[cur];
      img.classList.add('swapping');
      setTimeout(function(){
        img.src = s.img; img.alt = s.h;
        requestAnimationFrame(function(){ img.classList.remove('swapping'); });
      }, 170);
      copy.classList.remove('in'); void copy.offsetWidth;
      copy.innerHTML =
        '<div class="ia-n">'+String(cur+1).padStart(2,'0')+' / '+String(N).padStart(2,'0')+' · '+s.t.toUpperCase()+'</div>'+
        '<h3 class="ia-h">'+s.h+'</h3>'+
        '<p class="ia-d">'+s.d+'</p>'+
        '<ul class="ia-list">'+ s.b.map(function(x){ return '<li>'+CHECK+'<span>'+x+'</span></li>'; }).join('') +'</ul>'+
        '<span class="ia-tag">'+s.tag+'</span>';
      copy.classList.add('in');
      dotEls.forEach(function(el,idx){ el.classList.toggle('on', idx===cur); el.setAttribute('aria-selected', idx===cur); });
    }

    function go(d){ render(cur + d); }
    function stopAuto(){ if (timer){ clearInterval(timer); timer = null; } }
    function userGo(d){ userTouched = true; stopAuto(); go(d); }

    if (prev) prev.addEventListener('click', function(){ userGo(-1); });
    if (next) next.addEventListener('click', function(){ userGo(1); });
    dotEls.forEach(function(el){ el.addEventListener('click', function(){ userTouched = true; stopAuto(); render(+el.getAttribute('data-i')); }); });

    // swipe on the phone
    var sx = 0, sw = false;
    img.parentElement.addEventListener('pointerdown', function(e){ sw = true; sx = e.clientX; });
    window.addEventListener('pointerup', function(e){
      if (!sw) return; sw = false;
      var dx = e.clientX - sx; if (Math.abs(dx) > 40) userGo(dx < 0 ? 1 : -1);
    });

    var section = document.getElementById('showcase');
    function startAuto(){ if (userTouched || timer) return; timer = setInterval(function(){ if (!userTouched) go(1); }, 4600); }
    if (section){
      section.addEventListener('mouseenter', stopAuto);
      section.addEventListener('mouseleave', function(){ if (!userTouched) startAuto(); });
    }

    render(0);

    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if (e.isIntersecting) startAuto(); else stopAuto(); });
      }, { threshold:0.4 });
      io.observe(section || dots);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

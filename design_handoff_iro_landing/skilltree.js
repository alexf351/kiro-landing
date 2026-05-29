/* ============ Iro AI — Skill Universe ============
   Mascot centered. 6 skill nodes orbit it. 18 path nodes branch off the skills.
   A rank switch morphs the whole "Operator Build": mascot, gem, aura, scores. == */
(function () {
  'use strict';

  var RANK_TIERS = {
    wood:       { name: 'Wood',       color: '#B58360', deep:'#5A3A1F', glow: 'rgba(181,131,96,0.55)' },
    bronze:     { name: 'Bronze',     color: '#E89A4F', deep:'#7A3F12', glow: 'rgba(232,154,79,0.60)' },
    silver:     { name: 'Silver',     color: '#D5DAE2', deep:'#5C6470', glow: 'rgba(213,218,226,0.55)' },
    gold:       { name: 'Gold',       color: '#FFC940', deep:'#7A5A0A', glow: 'rgba(255,201,64,0.65)' },
    platinum:   { name: 'Platinum',   color: '#A3F5E5', deep:'#0F5A4E', glow: 'rgba(163,245,229,0.60)' },
    diamond:    { name: 'Diamond',    color: '#9FD8FF', deep:'#1F4A7A', glow: 'rgba(159,216,255,0.65)' },
    iridescent: { name: 'Iridescent', color: '#C8B8FF', deep:'#4A2F7A', glow: 'rgba(200,184,255,0.70)' }
  };
  function tierForScore(v){ return v>=90?'iridescent':v>=75?'diamond':v>=60?'platinum':v>=45?'gold':v>=30?'silver':'bronze'; }

  var RANKS = ['bronze','silver','gold','platinum','diamond','iridescent'];

  // Each rank is a sample "Operator Build": mascot + archetype + a skill profile.
  var BUILDS = {
    bronze:     { mascot:'assets/bronze-kiro.webp',     archetype:'The Rookie',
      scores:{ strategy:20, research:32, prompting:26, execution:14, automation:10, writing:24 } },
    silver:     { mascot:'assets/silver-kiro.webp',     archetype:'The Apprentice',
      scores:{ strategy:42, research:54, prompting:48, execution:32, automation:24, writing:46 } },
    gold:       { mascot:'assets/gold-kiro.webp',       archetype:'The Research Sniper',
      scores:{ strategy:72, research:92, prompting:78, execution:48, automation:22, writing:64 } },
    platinum:   { mascot:'assets/platinum-kiro.webp',   archetype:'The Strategist',
      scores:{ strategy:88, research:84, prompting:82, execution:70, automation:58, writing:74 } },
    diamond:    { mascot:'assets/diamond-kiro.webp',    archetype:'The Architect',
      scores:{ strategy:90, research:93, prompting:90, execution:84, automation:80, writing:87 } },
    iridescent: { mascot:'assets/iridescent-kiro.webp', archetype:'The Operator',
      scores:{ strategy:96, research:98, prompting:95, execution:94, automation:92, writing:96 } }
  };
  var DEFAULT_RANK = 'gold';

  // deg: 0 = top, clockwise. paths fan out from each skill (all 18, each once).
  var NODES = [
    { id:'strategy',  emoji:'🧠', label:'STRATEGY',  deg:0,   color:'#9B8CFF',
      desc:'Plan, scope, and decide with AI in the loop.',
      paths:[{n:'AI for Business',s:'Business',emoji:'💰'},{n:'AI for Finance',s:'Finance',emoji:'📈'},{n:'AI for Managers',s:'Managers',emoji:'👔'}] },
    { id:'research',  emoji:'🎯', label:'RESEARCH',  deg:60,  color:'#3DDBFF',
      desc:'Find, verify, and synthesize information fast.',
      paths:[{n:'Perplexity',s:'Perplexity',logo:'assets/perplexity.png'},{n:'Gemini',s:'Gemini',logo:'assets/gemini.png'},{n:'AI Foundations',s:'Foundations',emoji:'🤖'}] },
    { id:'prompting', emoji:'⚡', label:'PROMPTING', deg:120, color:'#FFC940',
      desc:'Pull reliable, high-signal output from any model.',
      paths:[{n:'ChatGPT',s:'ChatGPT',logo:'assets/chatgpt.png'},{n:'Claude',s:'Claude',logo:'assets/claude.png'},{n:'Prompt Engineering',s:'Prompt Eng',emoji:'💬'}] },
    { id:'execution', emoji:'🚀', label:'EXECUTION', deg:180, color:'#FF9D4D',
      desc:'Turn AI output into shipped, real-world work.',
      paths:[{n:'AI for Job Hunting',s:'Job Hunting',emoji:'💼'},{n:'AI for Healthcare',s:'Healthcare',emoji:'🏥'},{n:'AI Tools',s:'AI Tools',emoji:'🛠️'}] },
    { id:'automation',emoji:'⚙️', label:'AUTOMATION',deg:240, color:'#5B9DFF',
      desc:'Build workflows and agents that run without you.',
      paths:[{n:'AI Automation',s:'Automation',emoji:'⚡'},{n:'AI Agents',s:'Agents',emoji:'🕹️'},{n:'Vibe Coding with AI',s:'Vibe Coding',emoji:'💻'}] },
    { id:'writing',   emoji:'✍️', label:'WRITING',   deg:300, color:'#C78BF0',
      desc:'Generate and polish content, images, and video.',
      paths:[{n:'AI Image Generation',s:'Image Gen',logo:'assets/midjourney.png'},{n:'AI Video Generation',s:'Video Gen',emoji:'🎬'},{n:'AI for Marketing',s:'Marketing',emoji:'📣'}] }
  ];
  var R_SKILL = 26, R_PATH = 43, PATH_FAN = 15;
  var SVGNS='http://www.w3.org/2000/svg';

  function pos(deg, r){ var a=(deg-90)*Math.PI/180; return { x:50+Math.cos(a)*r, y:50+Math.sin(a)*r }; }

  function buildGem(tierId, size, pips){
    var t = RANK_TIERS[tierId], c=t.color, dp=t.deep, glow=t.glow, uid='g'+tierId;
    var svg=document.createElementNS(SVGNS,'svg');
    svg.setAttribute('viewBox','0 0 100 110'); svg.setAttribute('width',size); svg.setAttribute('height',size*1.1);
    svg.style.filter='drop-shadow(0 '+(size*0.06)+'px '+(size*0.2)+'px '+glow+')';
    var pipStr='', n=pips||1, w=(n-1)*4;
    for (var i=0;i<n;i++){ pipStr += '<circle cx="'+(-w/2+i*4)+'" cy="0" r="1.3" fill="#fff" opacity="0.95"/>'; }
    svg.innerHTML =
      '<defs><linearGradient id="'+uid+'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="'+c+'"/><stop offset="48%" stop-color="'+c+'" stop-opacity="0.95"/><stop offset="100%" stop-color="'+dp+'"/></linearGradient>'+
      '<linearGradient id="'+uid+'s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0.55"/><stop offset="40%" stop-color="#fff" stop-opacity="0.1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
      '<radialGradient id="'+uid+'c" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#fff" stop-opacity="0.9"/><stop offset="40%" stop-color="'+c+'" stop-opacity="0.9"/><stop offset="100%" stop-color="'+dp+'"/></radialGradient></defs>'+
      '<g><path d="M22 46 Q4 40 0 56 Q10 56 16 62 Q22 56 22 50 Z" fill="url(#'+uid+'b)" stroke="'+c+'" stroke-opacity="0.9" stroke-width="1.3" stroke-linejoin="round"/>'+
      '<path d="M78 46 Q96 40 100 56 Q90 56 84 62 Q78 56 78 50 Z" fill="url(#'+uid+'b)" stroke="'+c+'" stroke-opacity="0.9" stroke-width="1.3" stroke-linejoin="round"/></g>'+
      '<path d="M50 26 L78 30 L78 60 Q78 80 50 96 Q22 80 22 60 L22 30 Z" fill="url(#'+uid+'b)" stroke="'+c+'" stroke-width="2" stroke-linejoin="round"/>'+
      '<path d="M50 32 L72 35 L72 58 Q72 76 50 88 Q28 76 28 58 L28 35 Z" fill="none" stroke="#fff" stroke-opacity="0.25" stroke-width="1"/>'+
      '<path d="M50 26 L78 30 L78 60 Q78 80 50 96 Q22 80 22 60 L22 30 Z" fill="url(#'+uid+'s)"/>'+
      '<circle cx="50" cy="60" r="14" fill="url(#'+uid+'c)" stroke="'+c+'" stroke-width="1.3"/>'+
      '<text x="50" y="67" text-anchor="middle" style="font-family:Geist,sans-serif;font-weight:900;font-size:18px;fill:#11151C;letter-spacing:-1px">i</text>'+
      '<g transform="translate(50,84)">'+pipStr+'</g>';
    return svg;
  }

  function mount(){
    var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var canvas = document.getElementById('buildCanvas');
    if (!canvas) return;
    var gemHost = document.getElementById('rankGem');
    var cap = document.getElementById('uniCap');
    var rankLabel = document.getElementById('uniRank');
    var archLabel = document.getElementById('uniArch');
    var switchHost = document.getElementById('rankSwitch');

    // ---- mutable build state ----
    var rankId = DEFAULT_RANK;
    var scores = {}, strongest, weakest, activeId, svgEl;

    function recompute(){
      scores = BUILDS[rankId].scores;
      var ids = NODES.map(function(n){return n.id;});
      strongest = ids.reduce(function(a,b){ return scores[b]>scores[a]?b:a; });
      weakest   = ids.reduce(function(a,b){ return scores[b]<scores[a]?b:a; });
    }

    function flux(arr, x1,y1,x2,y2,color,skill,rad,begin0){
      if (reduce) return;
      var dur = Math.max(2.8, Math.min(5, Math.hypot(x2-x1,y2-y1)/10));
      arr.push('<circle class="flux" data-skill="'+skill+'" r="'+rad+'" fill="'+color+'" opacity="0">'+
        '<animate attributeName="cx" values="'+x1.toFixed(2)+';'+x2.toFixed(2)+'" dur="'+dur+'s" begin="'+begin0+'s" repeatCount="indefinite" calcMode="linear"/>'+
        '<animate attributeName="cy" values="'+y1.toFixed(2)+';'+y2.toFixed(2)+'" dur="'+dur+'s" begin="'+begin0+'s" repeatCount="indefinite" calcMode="linear"/>'+
        '<animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.2;0.7;1" dur="'+dur+'s" begin="'+begin0+'s" repeatCount="indefinite"/>'+
        '</circle>');
    }

    // build the whole universe for the current rank
    function renderUniverse(animate){
      recompute();
      var build = BUILDS[rankId];
      var tier = RANK_TIERS[rankId];
      var begin0 = animate ? 2.4 : 0.25;
      canvas.innerHTML = '';

      // SVG: rings + spokes + branches + particles
      svgEl = document.createElementNS(SVGNS,'svg');
      svgEl.setAttribute('viewBox','0 0 100 100'); svgEl.setAttribute('preserveAspectRatio','none');
      svgEl.classList.add('uni-svg');
      var s = [], fx = [];
      [R_SKILL*0.6, R_SKILL, (R_SKILL+R_PATH)/2, R_PATH].forEach(function(rr,i){
        s.push('<circle cx="50" cy="50" r="'+rr+'" fill="none" stroke="rgba(255,255,255,'+(i===1?0.09:0.05)+')" stroke-width="1" '+(i===2?'stroke-dasharray="1.5 3" ':'')+'vector-effect="non-scaling-stroke"/>');
      });
      NODES.forEach(function(n){
        var sk = pos(n.deg, R_SKILL), col = n.color;
        s.push('<line class="spoke" data-skill="'+n.id+'" x1="50" y1="50" x2="'+sk.x.toFixed(2)+'" y2="'+sk.y.toFixed(2)+'" stroke="'+col+'" stroke-width="1.4" vector-effect="non-scaling-stroke" pathLength="100" stroke-dasharray="100" stroke-dashoffset="'+(animate?100:0)+'"/>');
        flux(fx,50,50,sk.x,sk.y,col,n.id,0.5,begin0);
        n.paths.forEach(function(p,k){
          var pp = pos(n.deg+(k-1)*PATH_FAN, R_PATH);
          s.push('<line class="branch" data-skill="'+n.id+'" x1="'+sk.x.toFixed(2)+'" y1="'+sk.y.toFixed(2)+'" x2="'+pp.x.toFixed(2)+'" y2="'+pp.y.toFixed(2)+'" stroke="'+col+'" stroke-width="1.1" vector-effect="non-scaling-stroke" pathLength="100" stroke-dasharray="100" stroke-dashoffset="'+(animate?100:0)+'"/>');
          flux(fx,sk.x,sk.y,pp.x,pp.y,col,n.id,0.38,begin0);
        });
      });
      svgEl.innerHTML = s.join('') + fx.join('');
      canvas.appendChild(svgEl);

      // mascot
      var mascot = document.createElement('div');
      mascot.className = 'uni-mascot';
      mascot.style.setProperty('--mglow', tier.color);
      mascot.innerHTML = '<div class="bm-aura"></div><div class="bm-aura2"></div><div class="bm-ring"></div><img src="'+build.mascot+'" alt="Kiro, '+tier.name+' rank">';
      canvas.appendChild(mascot);

      // path nodes
      NODES.forEach(function(n){
        var col = n.color;
        n.paths.forEach(function(p,k){
          var pp = pos(n.deg+(k-1)*PATH_FAN, R_PATH);
          var el = document.createElement('div');
          el.className = 'pnode' + (p.logo?' has-logo':' has-emoji');
          el.setAttribute('data-skill', n.id);
          el.style.left = pp.x+'%'; el.style.top = pp.y+'%';
          el.style.setProperty('--tc', col);
          el.innerHTML = '<span class="pn-dot">'+(p.logo?'<img src="'+p.logo+'" alt="">':'<span class="pn-emoji">'+p.emoji+'</span>')+'</span><span class="pn-label">'+p.s+'</span>';
          el.addEventListener('mouseenter', function(){ if(window.matchMedia('(hover:hover)').matches) activate(n.id); });
          el.addEventListener('click', function(){ activate(n.id); });
          canvas.appendChild(el);
        });
      });

      // skill nodes
      NODES.forEach(function(n,i){
        var sk = pos(n.deg, R_SKILL);
        var strong = n.id===strongest, weak = n.id===weakest;
        var b = document.createElement('button');
        b.className = 'snode'+(strong?' strong':'')+(weak?' weak':'');
        b.setAttribute('data-skill', n.id);
        b.style.left = sk.x+'%'; b.style.top = sk.y+'%';
        b.style.setProperty('--tc', n.color); b.style.setProperty('--tg', n.color);
        b.style.setProperty('--pop-delay', (animate?(1100+i*80):0) + 'ms');
        b.innerHTML = '<span class="sn-emoji">'+n.emoji+'</span><span class="sn-score">'+scores[n.id]+'</span><span class="sn-label">'+n.label+'</span>'+
          ((strong||weak)?'<span class="sn-badge '+(strong?'up':'down')+'">'+(strong?'↑':'↓')+'</span>':'');
        b.addEventListener('mouseenter', function(){ if(window.matchMedia('(hover:hover)').matches) activate(n.id); });
        b.addEventListener('click', function(){ activate(n.id); });
        canvas.appendChild(b);
      });

      if (animate) canvas.classList.remove('revealed');

      // gem + rank labels
      if (gemHost){ gemHost.innerHTML=''; gemHost.appendChild(buildGem(rankId, 40, RANKS.indexOf(rankId)+1)); }
      if (rankLabel) rankLabel.textContent = tier.name;
      if (archLabel) archLabel.textContent = build.archetype;

      // keep active skill valid; default to weak spot
      if (!activeId || NODES.every(function(n){return n.id!==activeId;})) activeId = weakest;
      activate(activeId);
    }

    function activate(id){
      activeId = id;
      var n = NODES.find(function(x){return x.id===id;});
      var col = n.color, tierName = RANK_TIERS[tierForScore(scores[id])].name;
      canvas.setAttribute('data-active', id);
      canvas.querySelectorAll('.snode').forEach(function(el){ el.classList.toggle('active', el.getAttribute('data-skill')===id); });
      canvas.querySelectorAll('.pnode').forEach(function(el){ el.classList.toggle('lit', el.getAttribute('data-skill')===id); });
      svgEl.querySelectorAll('.branch,.spoke,.flux').forEach(function(el){ el.classList.toggle('lit', el.getAttribute('data-skill')===id); });
      if (cap){
        var chips = n.paths.map(function(p){
          return '<span class="cap-path">'+(p.logo?'<img src="'+p.logo+'" alt="">':'<span class="cap-emoji-sm">'+p.emoji+'</span>')+p.n+'</span>';
        }).join('');
        cap.innerHTML =
          '<div class="cap-head"><span class="cap-emoji">'+n.emoji+'</span>'+
            '<span class="cap-name">'+n.label.charAt(0)+n.label.slice(1).toLowerCase()+'</span>'+
            '<span class="cap-score" style="color:'+col+'">'+scores[id]+'<small>/100</small></span>'+
            '<span class="cap-tier" style="color:'+col+';border-color:'+col+'55">'+tierName.toUpperCase()+'</span>'+
            (id===weakest?'<span class="cap-flag down">Weak spot</span>':id===strongest?'<span class="cap-flag up">Strongest</span>':'')+
          '</div><p class="cap-desc">'+n.desc+'</p><div class="cap-paths">'+chips+'</div>';
      }
    }

    // ---- rank switch UI ----
    function markSwitch(){
      if (!switchHost) return;
      switchHost.querySelectorAll('.rsw').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-rank')===rankId); b.setAttribute('aria-selected', b.getAttribute('data-rank')===rankId); });
    }
    if (switchHost){
      switchHost.innerHTML = RANKS.slice().reverse().map(function(r){
        var t = RANK_TIERS[r];
        return '<button class="rsw" role="tab" data-rank="'+r+'" aria-label="'+t.name+'" style="--rc:'+t.color+'"><span class="rsw-gem"><span class="gd"></span></span><span class="rsw-name">'+t.name+'</span></button>';
      }).join('');
      switchHost.querySelectorAll('.rsw').forEach(function(btn){
        btn.addEventListener('click', function(){
          rankId = btn.getAttribute('data-rank');
          activeId = null;               // reset to new weak spot
          renderUniverse(false);
          markSwitch();
          var m = canvas.querySelector('.uni-mascot');
          if (m){ m.classList.add('swap'); setTimeout(function(){ m.classList.remove('swap'); }, 600); }
        });
      });
    }

    // ---- reveal on scroll ----
    function play(){
      renderUniverse(true);
      markSwitch();
      requestAnimationFrame(function(){
        canvas.classList.add('revealed');
        svgEl.querySelectorAll('.spoke').forEach(function(el,i){ el.style.animation='rs-draw 600ms ease-out '+(1150+i*70)+'ms forwards'; });
        svgEl.querySelectorAll('.branch').forEach(function(el,i){ el.style.animation='rs-draw 600ms ease-out '+(1500+i*40)+'ms forwards'; });
      });
    }
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ play(); io.disconnect(); } }); }, { threshold:0.3 });
      io.observe(canvas);
    } else { renderUniverse(false); markSwitch(); canvas.classList.add('revealed'); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

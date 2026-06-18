/* ============ Iro AI — AI Coach live chat demo ============ */
(function () {
  'use strict';

  var chat = document.getElementById('coachChat');
  if (!chat) return;
  var body = document.getElementById('ccBody');
  var chips = document.getElementById('ccChips');
  if (!body) return;

  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var AVA = 'assets/kiro-app-icon-256.png';
  var started = false;
  var idx = 0;
  var timers = [];

  /* reduced motion: leave the static thread in the markup as-is */
  if (reduce) return;

  /* ---- the 5 coaching sequences ---- */
  var SEQS = [
    {
      q: 'Quick check: what would improve this prompt most?',
      card: { label: 'The prompt', text: '&ldquo;Make this landing page better.&rdquo;' },
      options: [{ k: 'A', t: 'Add audience, goal, and constraints' }, { k: 'B', t: 'Make it longer' }, { k: 'C', t: 'Use more emojis' }],
      answer: 'A',
      feedback: 'Exactly. <b>&ldquo;Better&rdquo;</b> is too vague. Strong prompts tell the AI who it&rsquo;s helping, what outcome matters, and what constraints to follow.',
      before: 'Make this landing page better.',
      after: 'Act as a conversion strategist. Rewrite this hero for busy founders. Keep it under 12 words and make the outcome specific.'
    },
    {
      q: 'The AI sounds confident, but you&rsquo;re not sure it&rsquo;s right. What should you ask next?',
      card: { label: 'The scenario', text: 'The model gave you a technical answer you might use in a real project.' },
      options: [{ k: 'A', t: 'Explain assumptions and edge cases' }, { k: 'B', t: 'Make the answer shorter' }, { k: 'C', t: 'Add a catchier title' }],
      answer: 'A',
      feedback: 'Right. Confident output isn&rsquo;t the same as correct output. Ask the AI to expose its <b>assumptions, failure cases, and what you should verify</b> before using it.',
      afterLabel: 'Better ask',
      after: 'List your assumptions, possible failure cases, and the 3 things I should verify before I rely on this answer.'
    },
    {
      q: 'You need current market research. Which tool fits best?',
      card: { label: 'The scenario', text: 'You want recent opinions, links, and examples from the web.' },
      options: [{ k: 'A', t: 'A web-connected research tool' }, { k: 'B', t: 'An offline chatbot only' }, { k: 'C', t: 'Ask for a motivational quote' }],
      answer: 'A',
      feedback: 'Exactly. The best AI workflow starts with choosing the <b>right tool for the job</b>. If the answer depends on fresh information, use something that can search or cite sources.',
      afterLabel: 'Next step',
      after: 'Ask: &ldquo;Search recent sources, summarize the strongest patterns, and link the evidence.&rdquo;'
    },
    {
      q: 'You want to build an app with AI. What should you do first?',
      card: { label: 'The goal', text: '&ldquo;I want to build a habit tracker with AI coaching.&rdquo;' },
      options: [{ k: 'A', t: 'Define the smallest working version' }, { k: 'B', t: 'Add every feature idea' }, { k: 'C', t: 'Start with the logo' }],
      answer: 'A',
      feedback: 'Correct. AI can generate a lot fast &mdash; but shipping starts with <b>scope</b>. Define the smallest version that proves the product works.',
      afterLabel: 'Next step',
      after: 'Break this into: core user action, required data, first screen, success metric, and one thing to test with real users.'
    },
    {
      q: 'You got the answer wrong. What should happen next?',
      card: { label: 'The mistake', text: 'You picked a prompt that was too broad.' },
      options: [{ k: 'A', t: 'Turn the mistake into another practice rep' }, { k: 'B', t: 'Skip the concept' }, { k: 'C', t: 'Just reveal the answer' }],
      answer: 'A',
      feedback: 'Exactly. Mistakes are useful when they become <b>targeted practice</b>. Iro explains what went wrong, then gives you a sharper rep while the concept is fresh.',
      afterLabel: 'Next practice',
      after: 'Try this: rewrite &ldquo;Help me launch my app&rdquo; with a clear audience, goal, and constraint.'
    }
  ];

  function wait(ms) {
    return new Promise(function (res) { var t = setTimeout(res, ms); timers.push(t); });
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function down() { body.scrollTop = body.scrollHeight; }

  function row(cls, inner) {
    var r = document.createElement('div');
    r.className = 'cc-row ' + cls;
    r.innerHTML = inner;
    body.appendChild(r);
    down();
    return r;
  }
  function coachRow(inner) {
    return row('coach', '<img class="cc-mava" src="' + AVA + '" alt=""/><div class="cc-bub">' + inner + '</div>');
  }
  /* an artifact card aligned under the coach bubbles (no avatar, spacer keeps alignment) */
  function artRow(inner) {
    return row('coach', '<span class="cc-mava-sp"></span><div class="cc-card">' + inner + '</div>');
  }
  function typing() {
    return row('coach', '<img class="cc-mava" src="' + AVA + '" alt=""/>' +
      '<div class="cc-bub cc-typing"><span></span><span></span><span></span></div>');
  }
  async function coachSay(html, ms) {
    var t = typing();
    await wait(ms || 1100);
    t.remove();
    coachRow(html);
  }

  function promptCard(c) {
    artRow('<div class="cc-prompt"><span class="cc-prompt-lab">' + c.label + '</span><span class="cc-prompt-txt">' + c.text + '</span></div>');
  }
  function finalCard(seq) {
    if (seq.before !== undefined) {
      artRow('<div class="cc-ba">' +
        '<div class="cc-ba-row before"><span class="cc-ba-lab">Before</span><span class="cc-ba-txt">' + seq.before + '</span></div>' +
        '<div class="cc-ba-row after"><span class="cc-ba-lab">After</span><span class="cc-ba-txt">' + seq.after + '</span></div>' +
        '</div>');
    } else {
      artRow('<div class="cc-ba"><div class="cc-ba-row after"><span class="cc-ba-lab">' +
        seq.afterLabel + '</span><span class="cc-ba-txt">' + seq.after + '</span></div></div>');
    }
  }

  /* in-chat quiz — locks the chosen option in, then resolves true/false.
     auto-selects the correct answer if the user doesn't tap (keeps the demo flowing). */
  function askQuiz(options, answer) {
    return new Promise(function (resolve) {
      var r = artRow('<div class="cc-quiz"></div>');
      var quiz = r.querySelector('.cc-quiz');
      var answered = false, auto;
      var correctIdx = 0;

      function choose(o, btn) {
        if (answered) return;
        answered = true;
        clearTimeout(auto);
        var all = quiz.querySelectorAll('.cc-opt');
        all.forEach(function (x) { x.classList.add('locked'); });
        var ok = o.k === answer;
        if (ok) {
          btn.classList.add('correct');
          btn.insertAdjacentHTML('beforeend', '<span class="res">\u2713</span>');
          all.forEach(function (x) { if (x !== btn) x.classList.add('dim'); });
        } else {
          btn.classList.add('wrong');
          btn.insertAdjacentHTML('beforeend', '<span class="res">\u2715</span>');
          all.forEach(function (x) {
            if (x.dataset.k === answer) {
              x.classList.add('correct');
              x.insertAdjacentHTML('beforeend', '<span class="res">\u2713</span>');
            } else if (x !== btn) { x.classList.add('dim'); }
          });
        }
        down();
        setTimeout(function () { resolve(ok); }, 620);
      }

      options.forEach(function (o, i) {
        if (o.k === answer) correctIdx = i;
        var b = document.createElement('button');
        b.className = 'cc-opt';
        b.type = 'button';
        b.dataset.k = o.k;
        b.innerHTML = '<span class="k">' + o.k + '</span><span class="t">' + o.t + '</span>';
        b.addEventListener('click', function () { choose(o, b); });
        quiz.appendChild(b);
      });
      down();
      auto = setTimeout(function () {
        var btns = quiz.querySelectorAll('.cc-opt');
        choose(options[correctIdx], btns[correctIdx]);
      }, 5200);
      timers.push(auto);
    });
  }

  /* suggested-reply chips — resolves with the chosen item or auto-advances */
  function showChips(items, autoMs) {
    return new Promise(function (resolve) {
      chips.innerHTML = '';
      var done = false, auto;
      function pick(it) { if (done) return; done = true; clearTimeout(auto); chips.innerHTML = ''; resolve(it); }
      items.forEach(function (it, i) {
        var c = document.createElement('button');
        c.className = 'cc-chip';
        c.type = 'button';
        c.innerHTML = it.label;
        c.style.animationDelay = (i * 0.06) + 's';
        c.addEventListener('click', function () { pick(it); });
        chips.appendChild(c);
      });
      auto = setTimeout(function () { pick(items[items.length - 1]); }, autoMs || 6000);
      timers.push(auto);
    });
  }

  function correctText(seq) {
    for (var i = 0; i < seq.options.length; i++) {
      if (seq.options[i].k === seq.answer) return seq.options[i].t;
    }
    return '';
  }

  async function run() {
    var seq = SEQS[idx];
    await wait(450);
    await coachSay(seq.q, 1050);
    await wait(250);
    promptCard(seq.card);
    await wait(550);

    var ok = await askQuiz(seq.options, seq.answer);
    await wait(150);

    if (!ok) {
      await coachSay('Not quite &mdash; the stronger move is <b>' + correctText(seq) + '</b>.', 950);
      await wait(300);
    }
    await coachSay(seq.feedback, 1250);
    await wait(450);

    finalCard(seq);
    await wait(750);

    var last = idx === SEQS.length - 1;
    await coachSay(last
      ? 'Keep practicing inside Iro &mdash; it runs this loop on every lesson.'
      : 'That&rsquo;s the skill &mdash; ready for the next one?', 1050);
    await wait(300);

    await showChips([{ label: (last ? 'Start over \u21BB' : 'Next coaching tip \u2192'), k: 'next' }], 8000);
    idx = (idx + 1) % SEQS.length;
    restart();
  }

  function restart() {
    clearTimers();
    body.innerHTML = '';
    chips.innerHTML = '';
    run();
  }

  function start() {
    if (started) return;
    started = true;
    body.innerHTML = '';
    chips.innerHTML = '';
    run();
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { start(); io.disconnect(); }
      });
    }, { threshold: 0.35 });
    io.observe(chat);
  } else {
    start();
  }
})();

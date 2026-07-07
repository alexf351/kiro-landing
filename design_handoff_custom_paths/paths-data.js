/* ============ Iro AI — Custom Paths: topic → generated path data ============ */
(function () {
  'use strict';

  /* Each topic: 5 lessons (title + duration) + a recap label + a lesson-1 preview
     (concept + exercise) used only at the "Expanded" path-detail level. */
  var TOPICS = [
    {
      topic: 'grow my business',
      recap: 'your 90-day growth plan',
      lessons: [
        { t: 'Find your ideal customer', dur: '5 min' },
        { t: 'Craft an offer they want', dur: '6 min' },
        { t: 'Land your first 10 sales', dur: '5 min' },
        { t: 'Build a referral loop', dur: '4 min' },
        { t: 'Track the numbers that matter', dur: '5 min' }
      ],
      preview: { concept: 'Who you sell to shapes everything else.', exercise: 'Write a one-line profile of the customer you help most.' }
    },
    {
      topic: 'public speaking',
      recap: "your speaker's playbook",
      lessons: [
        { t: 'Turn nerves into energy', dur: '4 min' },
        { t: 'Structure a talk that lands', dur: '6 min' },
        { t: 'Open with a strong hook', dur: '4 min' },
        { t: 'Master pace and pauses', dur: '5 min' },
        { t: 'Handle Q&A with confidence', dur: '5 min' }
      ],
      preview: { concept: 'Nerves are energy you can redirect, not erase.', exercise: 'Name the one point your talk must land.' }
    },
    {
      topic: 'getting in shape',
      recap: 'your 8-week starter plan',
      lessons: [
        { t: 'Set an honest baseline', dur: '4 min' },
        { t: 'Build a simple 3-day split', dur: '6 min' },
        { t: 'Master five core lifts', dur: '6 min' },
        { t: 'Dial in protein and sleep', dur: '5 min' },
        { t: 'Track progress that sticks', dur: '4 min' }
      ],
      preview: { concept: 'Consistency beats intensity, every single week.', exercise: "Pick the three days you'll train this week." }
    },
    {
      topic: 'personal finance',
      recap: 'your money roadmap',
      lessons: [
        { t: 'Map where your money goes', dur: '5 min' },
        { t: 'Build a starter safety net', dur: '5 min' },
        { t: 'Kill high-interest debt', dur: '6 min' },
        { t: 'Automate your savings', dur: '4 min' },
        { t: 'Start investing simply', dur: '6 min' }
      ],
      preview: { concept: "You can't fix what you haven't measured.", exercise: 'List every subscription you paid for last month.' }
    },
    {
      topic: 'cooking basics',
      recap: 'your weeknight cookbook',
      lessons: [
        { t: 'Stock a starter kitchen', dur: '4 min' },
        { t: 'Master basic knife skills', dur: '6 min' },
        { t: 'Cook five go-to meals', dur: '6 min' },
        { t: 'Season and taste as you go', dur: '4 min' },
        { t: 'Plan a week of dinners', dur: '5 min' }
      ],
      preview: { concept: 'Great cooking is mostly prep and heat control.', exercise: 'Choose one meal to cook without a recipe tonight.' }
    },
    {
      topic: 'learning guitar',
      recap: 'your daily practice routine',
      lessons: [
        { t: 'Tune up and hold it right', dur: '4 min' },
        { t: 'Play your first three chords', dur: '6 min' },
        { t: 'Switch chords cleanly', dur: '6 min' },
        { t: 'Strum in time', dur: '5 min' },
        { t: 'Play your first full song', dur: '6 min' }
      ],
      preview: { concept: 'Clean changes matter more than speed.', exercise: 'Hold a G chord and pluck each string clean.' }
    },
    {
      topic: 'interview prep',
      recap: 'your interview game plan',
      lessons: [
        { t: 'Research the company fast', dur: '5 min' },
        { t: 'Tell your story with STAR', dur: '6 min' },
        { t: 'Answer the tough questions', dur: '6 min' },
        { t: 'Ask questions that impress', dur: '4 min' },
        { t: 'Negotiate the offer', dur: '5 min' }
      ],
      preview: { concept: 'Interviews reward stories, not summaries.', exercise: 'Draft one win as Situation, Task, Action, Result.' }
    },
    {
      topic: 'negotiation',
      recap: 'your negotiation toolkit',
      lessons: [
        { t: 'Know your walk-away number', dur: '4 min' },
        { t: 'Anchor the first offer', dur: '5 min' },
        { t: 'Listen for what they want', dur: '5 min' },
        { t: "Trade, don't cave", dur: '6 min' },
        { t: 'Close without regret', dur: '4 min' }
      ],
      preview: { concept: 'Whoever names the number first sets the frame.', exercise: 'Write the highest number you can say with a straight face.' }
    },
    {
      topic: 'studying smarter',
      recap: 'your study system',
      lessons: [
        { t: 'Ditch passive re-reading', dur: '4 min' },
        { t: 'Use active recall', dur: '6 min' },
        { t: 'Space your repetition', dur: '5 min' },
        { t: 'Beat procrastination', dur: '5 min' },
        { t: 'Prep for test day', dur: '4 min' }
      ],
      preview: { concept: 'Recalling beats reviewing, every time.', exercise: 'Close the book and write what you remember.' }
    },
    {
      topic: 'training a puppy',
      recap: 'your first-90-days plan',
      lessons: [
        { t: 'Set up a daily routine', dur: '4 min' },
        { t: 'Master crate training', dur: '6 min' },
        { t: 'Teach sit, stay, and come', dur: '6 min' },
        { t: 'Stop the play biting', dur: '5 min' },
        { t: 'Nail potty training', dur: '5 min' }
      ],
      preview: { concept: 'Reward the behavior you want to see again.', exercise: "Pick the one word you'll use to mark a win." }
    }
  ];

  /* keyword → topic index, for when a visitor types their own idea */
  var KEYS = [
    [/(business|startup|company|customers?|sales|revenue|marketing)/, 0],
    [/(speak|presentation|present|stage|talk|pitch)/, 1],
    [/(shape|fit|gym|workout|exercise|muscle|lose weight|strength)/, 2],
    [/(money|finance|budget|invest|saving|debt|wealth)/, 3],
    [/(cook|kitchen|recipe|meal|food|bak)/, 4],
    [/(guitar|instrument|music|piano|chord)/, 5],
    [/(interview|job|resume|hiring|career)/, 6],
    [/(negotiat|deal|salary|bargain)/, 7],
    [/(study|studying|exam|learn faster|memor|revis|school|college)/, 8],
    [/(puppy|dog|pet|obedience|train.*(dog|pup))/, 9]
  ];

  function titleCase(s) {
    return s.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  /* Build a plausible path for a free-typed topic that matches nothing. */
  function genericPath(raw) {
    var t = raw.trim().replace(/^(how to |learn |learning |get better at |master )/i, '') || 'anything';
    return {
      topic: raw.trim() || 'anything',
      recap: 'your personal roadmap',
      lessons: [
        { t: 'Get the fundamentals down', dur: '5 min' },
        { t: 'Learn the core moves', dur: '6 min' },
        { t: 'Practice on a real task', dur: '5 min' },
        { t: 'Fix the common mistakes', dur: '4 min' },
        { t: 'Build a daily habit', dur: '5 min' }
      ],
      preview: { concept: 'Every skill breaks down into a few key moves.', exercise: 'Write one sentence on why ' + t + ' matters to you.' }
    };
  }

  /* Resolve any text to a path object (known topic or generic). */
  function resolve(raw) {
    var s = (raw || '').toLowerCase();
    for (var i = 0; i < KEYS.length; i++) {
      if (KEYS[i][0].test(s)) return TOPICS[KEYS[i][1]];
    }
    // exact-ish match on topic string
    for (var j = 0; j < TOPICS.length; j++) {
      if (s.indexOf(TOPICS[j].topic) !== -1) return TOPICS[j];
    }
    return genericPath(raw);
  }

  window.CP = { TOPICS: TOPICS, resolve: resolve, titleCase: titleCase };
})();

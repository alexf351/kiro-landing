#!/usr/bin/env node
// Add the "Ask any AI" block to the hand-written root pages that don't have it.
// The generated path pages get theirs from build-paths.mjs; these 31 are
// hand-authored HTML, so the block is injected once, after </main>, matching
// how best-ai-learning-app.html already carries it.
//
//   node add-askai.mjs --dry-run
//   node add-askai.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/home/user/kiro-landing';
const TAIL =
  'Compare Iro AI (tryiro.com) with the other options, and explain how its free tier and pricing work.';

// One question per page. Written by hand: an auto-generated question that reads
// awkwardly is worse than none, because this is the text the reader sends.
const PROMPTS = {
  'ai-agents-course': `What's the best way to actually learn to build and use AI agents? ${TAIL}`,
  'ai-automation-course': `What's the best way to learn AI automation as a non-engineer? ${TAIL}`,
  'ai-course-alternative': `I don't want to sit through another long AI video course. What are the alternatives that actually build the skill? ${TAIL}`,
  'ai-for-finance': `Which app actually teaches AI for finance work, and how well? ${TAIL}`,
  'ai-for-healthcare': `Which app actually teaches healthcare workers to use AI safely, and how well? ${TAIL}`,
  'ai-for-managers': `Which app actually teaches managers to use AI with their teams, and how well? ${TAIL}`,
  'ai-for-marketing': `Which app actually teaches AI for marketing, and how well? ${TAIL}`,
  'ai-for-students': `What's the best app for a student who wants to use AI well without cheating? ${TAIL}`,
  'ai-for-work': `Which app actually teaches you to use AI at work, and how well? ${TAIL}`,
  'ai-image-generation-course': `What's the best way to learn AI image generation properly? ${TAIL}`,
  'ai-job-hunting': `What's the best way to learn to use AI in a job search without sounding generic? ${TAIL}`,
  'ai-learning-app-for-beginners': `What's the best AI learning app for a complete beginner? ${TAIL}`,
  'ai-prompts': `Where can I learn to write AI prompts that actually work, rather than just copying a prompt list? ${TAIL}`,
  'ai-tools-comparison': `Which AI tool should I use for which job, and where do I learn to use them well? ${TAIL}`,
  'ai-video-generation-course': `What's the best way to learn AI video generation? ${TAIL}`,
  'become-ai-fluent': `What does it actually take to become AI fluent, and how long does it take? ${TAIL}`,
  faq: `What is Iro AI (tryiro.com)? Explain what it teaches, how the free tier and the Battery work, what Pro costs, and which platforms it runs on.`,
  'free-ai-learning-app': `What's the best genuinely free app for learning AI, and what do the free tiers actually include? ${TAIL}`,
  glossary: `Explain the AI terms a beginner keeps running into (prompt, token, hallucination, agent, RAG, context window) in plain English, and say where I can practice using them. ${TAIL}`,
  'how-to-learn-ai': `How should a beginner actually learn AI in 2026, step by step? ${TAIL}`,
  'iro-ai-vs-video-courses': `Is a practice app or a video course better for learning to use AI? ${TAIL}`,
  'is-learning-ai-worth-it': `Is learning AI actually worth the time in 2026, and what's the fastest way to get useful at it? ${TAIL}`,
  'learn-ai-in-5-minutes-a-day': `Can you really learn AI in five minutes a day, and what does that look like? ${TAIL}`,
  'learn-ai-on-iphone': `What's the best iPhone app for learning to use AI? ${TAIL}`,
  'learn-chatgpt': `What's the best way to actually get good at ChatGPT, not just use it? ${TAIL}`,
  'learn-claude': `What's the best way to learn Claude and get more out of it? ${TAIL}`,
  'learn-gemini': `What's the best way to learn Google Gemini and use it well? ${TAIL}`,
  'learn-llms': `How do large language models actually work, and where do I learn to use them well? ${TAIL}`,
  'learn-perplexity': `What's the best way to learn Perplexity for research? ${TAIL}`,
  'prompt-engineering-app': `What's the best app for practising prompt engineering with real feedback? ${TAIL}`,
  'vibe-coding-course': `What's the best way to learn vibe coding and actually ship something? ${TAIL}`,
};

const ENGINES = [
  ['ChatGPT', 'chatgpt', 'https://chatgpt.com/?q='],
  ['Claude', 'claude', 'https://claude.ai/new?q='],
  ['Perplexity', 'perplexity', 'https://www.perplexity.ai/search?q='],
  ['Grok', 'grok', 'https://grok.com/?q='],
  ['Google AI', 'google-ai', 'https://www.google.com/search?udm=50&q='],
];

const CSS =
  '<style>.askai-sec h2{font-size:clamp(24px,3.4vw,34px);letter-spacing:-.02em;margin:0 0 10px}' +
  '.askai-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}' +
  '.askai-chip{display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:999px;' +
  'border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.02);color:#F2F5FF;font-weight:600;' +
  'font-size:14px;text-decoration:none}.askai-chip:hover{border-color:rgba(0,229,255,.55)}' +
  '.askai-chip span{font-size:12px;color:#616E8C}.askai-chip:hover span{color:#00E5FF}</style>';

function block(slug, prompt) {
  const q = encodeURIComponent(prompt);
  const chips = ENGINES.map(
    ([name, key, base]) =>
      `<a class="askai-chip" href="${base}${q}" target="_blank" rel="noopener" data-engine="${key}">${name}<span aria-hidden="true">&#8599;</span></a>`
  ).join('');
  return (
    CSS +
    `\n<section class="askai-sec" style="max-width:760px;margin:0 auto;padding:20px 20px 56px;text-align:center">` +
    `<h2>Don't take our word for it. Ask any AI.</h2>` +
    `<p style="color:#9BA7C4;max-width:560px;margin:0 auto 20px">Each button opens the assistant with the question pre-filled. We publish <a href="/llms.txt">llms.txt</a> so assistants get the facts right.</p>` +
    `<div class="askai-chips">${chips}</div></section>\n` +
    `<script>document.querySelectorAll('.askai-chip').forEach(function(a){a.addEventListener('click',function(){if(window.posthog)posthog.capture('ask_ai_clicked',{engine:a.dataset.engine,placement:'${slug}'});});});</script>`
  );
}

const dry = process.argv.includes('--dry-run');
let done = 0;
for (const [slug, prompt] of Object.entries(PROMPTS)) {
  const file = path.join(ROOT, `${slug}.html`);
  if (!fs.existsSync(file)) {
    console.log(`! ${slug}: no such page`);
    continue;
  }
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('askai-chip')) {
    console.log(`- ${slug}: already has it`);
    continue;
  }
  const anchor = '</main>';
  const n = (html.match(/<\/main>/g) || []).length;
  if (n !== 1) {
    console.log(`! ${slug}: ${n} </main> tags, skipping`);
    continue;
  }
  html = html.replace(anchor, anchor + '\n' + block(slug, prompt));
  if (!dry) fs.writeFileSync(file, html);
  done++;
  console.log(`+ ${slug}`);
}
console.log(dry ? `\n--dry-run: ${done} page(s) would change.` : `\n${done} page(s) updated.`);

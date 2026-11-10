---
title: "Claude Fable 5.2: what's new, what it costs, and whether you can use it"
canonical_url: "https://tryiro.com/blog/claude-fable-5-2"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Claude Fable 5.2", "Fable 5.2", "Claude Fable 5.2 pricing", "Fable 5.2 vs Fable 5.1", "Fable 5.2 benchmarks", "Claude Mythos 5.2", "Fable 5.2 Pro plan", "claude-fable-5-2"]
date_published: "2026-11-10"
date_modified: "2026-11-10"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# Claude Fable 5.2: what's new, what it costs, and whether you can use it

> Anthropic released Claude Fable 5.2 on 9 November 2026, alongside a restricted twin called Mythos 5.2. It is faster and 20% cheaper on the API than Fable 5.1, it trips its safety filters far less often, and Pro subscribers can try it at no extra cost until 16 November. Here is what changed, what the benchmarks do and don't show, and when it's worth picking over the default model.

**Canonical:** https://tryiro.com/blog/claude-fable-5-2
**Published:** 2026-11-10
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Claude Fable 5.2 is Anthropic's top publicly available model, released on 9 November 2026. It replaces Fable 5.1, which came out on 1 September and is now a legacy model.
- On the API it costs $8 per million input tokens and $40 per million output tokens, down from $10 and $50 for Fable 5.1. It has a 1M-token context window and up to 128K tokens of output.
- Anthropic says answers come up to 30% faster than 5.1, and that Fable 5.2 is blocked by its cyber and biology safeguards about 55% less often.
- In the Claude apps, Pro and standard Team seats can spend up to half their weekly limits on Fable models until 16 November 2026. Max, Ultra and premium seats get one to three free Fable usage resets. Free plans get neither.
- Mythos 5.2 is the same underlying model with looser safeguards, and only vetted organisations can use it.

## What is Claude Fable 5.2? The short answer

**Claude Fable 5.2 is Anthropic's most capable publicly available model, released on 9 November 2026 for demanding reasoning and long, multi-step agentic work such as large coding jobs.** It replaces Fable 5.1, which shipped on 1 September, and it arrived with a restricted twin, Claude Mythos 5.2, that only vetted organisations can use.

Three things to know before the detail:

- **It's cheaper and faster than the version it replaces.** API prices fell 20%, and Anthropic says answers arrive up to 30% faster.
- **It refuses less.** Its cyber and biology safeguards block about 55% fewer requests than Fable 5.1's did, which matters if you work anywhere near security or life sciences.
- **It isn't meant to be your default.** Anthropic itself suggests keeping its everyday Opus model for most work and stepping up to Fable for the hard jobs.

**Where this comes from.** Product details, prices and benchmark scores are taken from Anthropic's [launch announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2), the Fable 5.2 [model documentation](https://platform.claude.com/docs/en/models/fable-5-2/overview) and the [launch offers help article](https://support.claude.com/en/articles/17506494-claude-fable-5-2-launch-offers), all published 9 November 2026. The Fable 5.1 price is from the [Fable 5.1 documentation](https://platform.claude.com/docs/en/models/fable-5-1/overview). Benchmark scores are Anthropic's own and haven't been independently reproduced yet. Last reviewed 10 November 2026.

## What's new in Fable 5.2 compared with Fable 5.1?

Anthropic's announcement lists improvements in coding, reasoning and vision. The changes you'd actually notice are more practical:

- **Speed.** Outputs are up to 30% faster than Fable 5.1. An optional fast mode generates tokens up to 2.5 times faster again, for double the price.
- **Price.** $8 and $40 per million input and output tokens, against $10 and $50 for Fable 5.1.
- **Fewer false refusals.** About 55% fewer blocks overall, roughly 60% fewer in cybersecurity and 40% fewer in biology. When a question is blocked, Anthropic passes it to an older Claude model instead of leaving it unanswered.
- **Same size limits.** A 1M-token context window, up to 128K tokens of output, text and image input, and a training-data cutoff of June 2026.

Anthropic also showed what it calls long-horizon work: an experimental team of more than 1,000 Fable agents built a bootable prototype operating system over eight days, and another formalised Fermat's Last Theorem in 30 hours. Those are lab demonstrations with huge compute budgets, not something you'll reproduce in a chat window, but they show the direction: this model is tuned for jobs that run for hours, not for quick answers.

For developers there are two behaviour changes worth knowing. Thinking is always on and can't be switched off, with depth set by the effort parameter, and the sampling settings `temperature`, `top_p` and `top_k` should be left out. The model ID is `claude-fable-5-2`, and it's on Anthropic's API, Amazon Web Services, Google Cloud and Microsoft Azure.

## How much does Fable 5.2 cost, and can you use it on Claude Pro?

There are two answers, depending on whether you use Claude through an app or through the API.

| Where | What Anthropic says |
| --- | --- |
| API, standard | $8 per million input tokens, $40 per million output tokens |
| API, fast mode | $16 input, $80 output, up to 2.5 times faster |
| Pro and standard Team seats | Up to 50% of weekly usage limits can go to Fable models at no extra cost, until 16 November 2026 at 11:59 pm PT, plus one Fable reset |
| Max, Ultra and premium seats | One to three Fable resets depending on how long you've subscribed, usable until 8 March 2027 |
| Free plan | Not included in the launch offers |



A few details from the help article that are easy to miss. Your default model doesn't change, so you have to pick Fable from the model picker yourself. Fable uses up your allowance faster than other Claude models. A Fable reset only restores the usage you spent on Fable models, it doesn't raise your limits, and you lose unused resets if you cancel or downgrade. To be eligible, your paid billing had to be in place before 10:00 am PT on 9 November.

If you're deciding whether a paid plan is worth it in the first place, our breakdown of [whether Claude Pro is worth it](/blog/is-claude-pro-worth-it) covers the everyday case.

## What do Fable 5.2's benchmarks actually show?

Anthropic published a long table. Here are four rows that map onto work people actually do, with the rival models Anthropic chose to compare against:

| Benchmark | Fable 5.2 | Fable 5.1 | GPT-6 Astra | Gemini 4 Carbon |
| --- | --- | --- | --- | --- |
| FrontierSWE v2 (software engineering) | 69.9% | 56.3% | 65.5% | 61.2% |
| OSWorld 2.1 (using a computer) | 89.3% | 83.5% | 79.5% | 81.5% |
| Terminal-Bench-Science 0.1 | 74.6% | 52.6% | 68.1% | 64.8% |
| AutomationBench | 51.4% | 31.4% | 41.4% | 53.9% |



Two honest readings. First, the jump from Fable 5.1 is large on almost every row, which fits the claim that this is a real upgrade rather than a price cut with a new number. Second, Fable 5.2 doesn't win everything: Gemini 4 Carbon edges it on AutomationBench. Every figure here comes from the vendor's own runs, sometimes at different effort settings, so treat the gaps between rivals as rough. Our guide to [reading AI benchmark scores](/blog/how-to-read-ai-benchmarks) explains what to look for, and our [GPT-6 Astra explainer](/blog/gpt-6-astra) shows how a headline score can shift under a neutral test.

## What is Claude Mythos 5.2, and why can't most people use it?

Anthropic says Fable and Mythos are the same underlying model. The difference is the safeguards. Fable 5.2 ships with strong cyber and biology protections, so it's open to everyone. Mythos 5.2 has fewer restrictions, so it's limited to organisations that pass Anthropic's Cyber Verification Program or Life Sciences Verification Program, plus Claude Enterprise customers through Claude Security. The API price is the same.

For almost everyone reading this, Mythos is irrelevant. It exists so that security teams can hunt for vulnerabilities and biology labs can do protein design without hitting refusals built for the general public. Anthropic reports, for example, that Mythos 5.2 rediscovered 89.6% of known vulnerabilities in one test. If you aren't in one of those fields, Fable 5.2 is the model you'd actually pick.

## Should you switch to Fable 5.2?

Anthropic's own advice is to start with its everyday Opus model, step up to Fable when a task is genuinely hard, and step down to the smaller Sonnet or Haiku models for simple jobs. That's sensible, because Fable eats your allowance faster. Pick it for:

- **Long, multi-step jobs**, such as refactoring a codebase, analysing a large set of documents or building a detailed model.
- **Work where a wrong answer is expensive** and you want the strongest reasoning available.
- **Agentic tasks** where Claude uses tools or a computer for many steps in a row.

Leave it for quick questions, short drafts and everyday rewriting. You won't see the difference, and you'll burn through your week's usage.

If you're on Pro, the launch week is a free trial worth using on purpose: save one genuinely hard task, give it a clear brief with the context, the goal and what a good result looks like, and compare the result with what your usual model gives you. That briefing habit is the skill that makes a stronger model pay off, and it carries over to every release after this one.

Iro's [Claude path](/learn-claude) builds it in 5-minute lessons: writing briefs for long tasks, choosing the right model for the job, and checking answers before you rely on them. If you want to see where you stand first, the [AI rank quiz](/quiz) takes about two minutes.

## FAQ

**When was Claude Fable 5.2 released?**

Anthropic released Claude Fable 5.2 on 9 November 2026, together with Claude Mythos 5.2. It replaces Fable 5.1, which was released on 1 September 2026 and is now a legacy model.

**How much does Claude Fable 5.2 cost?**

On the API, Fable 5.2 costs $8 per million input tokens and $40 per million output tokens, 20% less than Fable 5.1's $10 and $50. An optional fast mode, up to 2.5 times faster, costs $16 and $80. In the Claude apps it is included in paid plans and uses your plan's usage limits.

**Can I use Fable 5.2 on Claude Pro?**

Yes. Until 16 November 2026 at 11:59 pm PT, Pro and standard Team seats can spend up to 50% of their weekly usage limits on Fable models at no extra cost, and get one Fable reset. You need to choose Fable in the model picker, because your default model does not change. The Free plan is not included.

**What is the difference between Fable 5.2 and Mythos 5.2?**

Anthropic says they are the same underlying model. Fable 5.2 has strong cyber and biology safeguards and is available to everyone. Mythos 5.2 has fewer restrictions and is only available to organisations verified through Anthropic's Cyber or Life Sciences Verification Programs, or Claude Enterprise customers through Claude Security.

**How big is Fable 5.2's context window?**

Fable 5.2 has a 1M-token context window and can produce up to 128K tokens of output. It takes text and images as input, and its training data runs to June 2026.

**Is Fable 5.2 better than GPT-6 Astra?**

On Anthropic's published benchmarks, Fable 5.2 scores higher than GPT-6 Astra on software engineering, computer use and science terminal tasks, and slightly lower than Gemini 4 Carbon on AutomationBench. These are the vendor's own results, so the best test is to try both on a task from your own work.

## Read next

- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)
- [GPT-6 Astra: what it is, and who has it](https://tryiro.com/blog/gpt-6-astra)
- [How to read an AI benchmark score](https://tryiro.com/blog/how-to-read-ai-benchmarks)
- [Learn to use Claude properly](https://tryiro.com/learn-claude)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. Alex works in private equity real estate, leading the firm's AI initiative and building the automation the team runs on live deals. Alex writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

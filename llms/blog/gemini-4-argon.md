---
title: "Gemini 4 Argon: what it is, who actually has it, and what the numbers mean"
canonical_url: "https://tryiro.com/blog/gemini-4-argon"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Gemini 4 Argon", "Gemini Argon", "Gemini 4 Argon free", "Gemini 4 Argon benchmarks", "Gemini 4 Argon vs GPT-6 Astra", "Gemini 4 Argon Google AI Pro"]
date_published: "2026-10-23"
date_modified: "2026-10-23"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# Gemini 4 Argon: what it is, who actually has it, and what the numbers mean

> Google's Gemini 4 Argon went to vetted cyber defenders on 30 September 2026 and to paying Gemini subscribers on 13 October. Whether you can use it comes down to one line on your plan, and Google's own benchmark table is more mixed than the launch posts make it sound.

**Canonical:** https://tryiro.com/blog/gemini-4-argon
**Published:** 2026-10-23
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Gemini 4 Argon is Google's new top model and the first of the Gemini 4 family. It was announced on 30 September 2026 for vetted cyber defenders and became generally available on 13 October 2026.
- In the Gemini app, Argon is only for Google AI Pro and Ultra subscribers. Free accounts and Google AI Plus don't get it, according to Google's own help center.
- Google's comparison table puts Argon ahead on 13 of 19 results, level on one and behind on five, including terminal coding and computer use, where GPT-6 Astra or Claude Opus 5.5 lead.
- Most rival scores in that table are the other labs' self-reported figures, and several of Argon's were run by Google itself, so a one- or two-point gap shouldn't decide anything for you.
- For everyday users the practical changes are more direct answers, a tasks mode that keeps working in the background, and an allowance that Argon uses up faster than lighter models.

## What is Gemini 4 Argon?

**Gemini 4 Argon is Google's new frontier model, the first of the Gemini 4 family, built for long, multi-step work such as coding, legal and financial analysis, science and cyber defense.** Google announced it on 30 September 2026 for a small group of vetted security teams, then [made it generally available on 13 October 2026](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/).

Three things to hold onto before the detail:

- **In the Gemini app, it's a paid-plan model.** Google AI Pro and Ultra get it. Free accounts and Google AI Plus don't.
- **It doesn't replace the other models.** Flash-Lite, Flash and Pro are still in the app. Argon sits above them as the one you pick for harder jobs.
- **The benchmarks are good, not sweeping.** Google's own table shows Argon behind rivals on several coding and computer-use tests.

**Where this comes from.** Everything below is from Google's own pages unless we name another source: its 30 September and 13 October blog posts, Google DeepMind's model card, evaluation notes and Fairwind page, the Gemini Apps Help Center and release notes, and Google Cloud's 8 October announcement. Benchmark figures are Google's, not independent reruns. Plans and limits change often, so check your own account. Last reviewed 23 October 2026.

## Do you have Gemini 4 Argon? Check your plan

This is the part that decides whether the launch touches you at all. [Google's help center](https://support.google.com/gemini/answer/18648722?hl=en) lists exactly which models each personal plan can pick:

| Plan | Models you can pick in chat | Tasks mode |
| --- | --- | --- |
| No Google AI plan | Auto or Flash-Lite | Not included |
| Google AI Plus | Flash-Lite, Flash, Pro | Not included |
| Google AI Pro | Flash-Lite, Flash, Pro, **Argon** | Flash or Argon |
| Google AI Ultra | Same as Pro, with 5x or 20x Pro's usage limits | Flash or Argon |



**If you pay for Pro or Ultra, tap the model name at the bottom of the chat box and choose Argon.** Models with a lock icon need a higher plan. On a free account, Auto sends most prompts to Flash-Lite, and Google names Flash and Pro as the models harder prompts may go to. Argon isn't on that list. Pro and Ultra subscribers also get Argon in AI Mode in Google Search.

Two details matter once you have it:

- **It eats more of your allowance.** Google says more advanced models and higher thinking levels use more of your usage. Limits refresh every five hours up to a weekly cap, and when a paid plan runs out, the chat carries on with Flash-Lite.
- **Work accounts follow different rules.** If your Gemini comes through a work or school account, what you get depends on your organization's Workspace license, not the table above.

Developers reach Argon on the paid tier of the Gemini API. At time of writing (October 2026), Google's introductory price is $2 per million input tokens and $10 per million output, rising to $4 and $20 after 30 November 2026. If you're newer to the app itself, [our beginner's guide to using Gemini](/blog/how-to-use-gemini) covers the habits that work whichever model you pick.

## Why did Gemini 4 Argon go to cyber defenders first?

The [30 September announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) was an odd one: a frontier model almost nobody could use. Google rolled Argon out first through Google DeepMind's **Fairwind Program**, which gives early access to governments and national cyber authorities, critical infrastructure operators (healthcare, telecoms, energy and financial networks) and core technology platforms. Google says it works with more than 650 partners and runs background checks on organizations that apply.

The reason is spelled out in the model card. Under its Frontier Safety Framework, Google says it **cannot rule out that Argon has reached its critical capability level for cybersecurity**, the point at which a model could give real uplift to high-impact cyberattacks. It says the same about biological information risk. In both cases it wrote a safety case and added safeguards that it judges bring the risk back below that line.

That shaped the rollout. Fairwind partners can use Argon without cyber guardrails for defensive work. Everyone else gets the guarded version that arrived on 13 October. Google's September post said wider access would start with paid API customers and Ultra subscribers; when it came, Pro was included too.

None of this needs action from you. It does explain why the public Argon carries guardrails the defenders' version doesn't, and why general release came two weeks after the announcement.

## Is Gemini 4 Argon better than GPT-6 Astra and Claude?

**On Google's own scorecard, mostly yes, but by less than the launch posts imply, and not everywhere.** [Google DeepMind's evaluation table](https://deepmind.google/models/evals-methodology/gemini-4-argon) compares Argon with GPT-6 Astra, Claude Fable 5.1 and Claude Opus 5.5 across 19 results. Argon leads on 13, ties on one and trails on five. A sample:

| Test | Google's category | Argon | Best rival |
| --- | --- | --- | --- |
| Harvey's Legal Agent Benchmark | Knowledge work | 19.6% | 6.7% (Fable 5.1) |
| GraphWalks, 256K to 1M tokens | Long context | 84.2% | 71.8% (Astra) |
| Vals Index | Knowledge work | 68.9% | 67.0% (Opus 5.5) |
| CWE-bench v1 | Cybersecurity | 68.0% | 68.0% (Astra) |
| OSWorld-2.0 | Computer use | 69.2% | 72.6% (Astra) |
| FrontierSWE v2 | Agentic coding | 55.0% | 65.5% (Astra) |
| Terminal-Bench 4.0 | Agentic coding | 57.4% | 66.4% (Opus 5.5) |



Three things change how you should read that.

- **Most rival numbers are self-reported.** Google's methodology note says non-Gemini scores come from the other labs' own published figures unless stated otherwise, while several Argon scores were computed by Google, including DeepSWE, Terminal-Bench 4.0 and OSWorld-2.0. That isn't cheating. It does mean the bars weren't all produced under the same conditions, which is the first thing to check on any chart, as [our guide to reading AI benchmarks](/blog/how-to-read-ai-benchmarks) explains.
- **Some settings differ by model.** On LVBench, a long-video test, Google sampled Gemini at one frame per second but gave rivals a fixed number of frames because of API limits. Argon's OSWorld score is the best of three runs. Footnotes like these are normal, and they're why a gap of a point or two tells you very little.
- **The biggest wins have low ceilings.** Argon nearly triples the best rival on Harvey's legal benchmark, yet 19.6% means it still fails about four tasks in five. Leading on a hard test isn't the same as being reliable at it.

The security number Google highlights works the same way. On Gray Swan's indirect prompt injection test, which checks whether hidden instructions in a web page or email can hijack an agent, Argon's attack success rate is 0.7%. Claude Opus 5.5 and Claude Fable 5.1 sit at 1.0%. That's a real result and a narrow lead. The gap that matters is against weaker models: Kimi K3 is at 52.7%.

## What changes for you in the Gemini app

Away from the benchmarks, Google's 13 October Gemini app post lists a few everyday differences.

- **Plainer answers.** Google says Argon answers more directly with less hedging, repeats itself less, skips clichés and follows style instructions better than earlier Gemini models. That's Google's claim; your own prompts are the real test.
- **A tasks mode.** A toggle switches a conversation from chat to tasks, where Gemini plans the steps, browses across sites and keeps working in the background, even when you're away from your computer. It's in select countries and languages, and it runs on Flash or Argon.
- **More connected apps.** Gemini now links to more than 40 apps and services, including Instacart, OpenTable, Adobe and Shopify. This one isn't limited to paid plans, though most connections only work in English in the US so far.
- **A March 2026 knowledge cutoff.** The model card dates Argon's training data to March 2026 and notes it can still hallucinate. For anything newer it depends on searching, so check dates and sources on recent topics.

**And the "Gemini agent" for businesses?** That's a separate announcement. On 8 October, Google Cloud introduced the Gemini agent, which it calls a single, universal agent for work: it plans a job, uses your company's tools and works inside Gmail, Docs and Sheets. Google says it picks the model for each job from Gemini models _and_ Anthropic's Claude models, so it isn't simply Argon with a new name. TechCrunch reported that businesses get it first and consumers later. Google's post gives no consumer date.

## Should you switch to Gemini for Argon?

If you already pay for Google AI Pro, just try it. Pick Argon for jobs that are long or have many steps, and leave quick questions to Flash so you don't burn the week's allowance on a recipe.

If you're choosing between ChatGPT, Claude and Gemini, Argon narrows the gap at the top rather than settling it. Google's own table has it trading wins with GPT-6 Astra and Claude Opus 5.5, so the deciding factors haven't moved: which apps you already live in, which plan you'd pay for, and how each assistant handles your actual work. Our [ChatGPT vs Gemini](/blog/chatgpt-vs-gemini) and [Claude vs Gemini](/blog/claude-vs-gemini) comparisons walk through those trade-offs, and [our tracker of every 2026 model release](/blog/new-ai-models-2026) keeps the dates straight.

What doesn't change is the skill on your side. A stronger model is better at guessing what you meant, but a clear brief still beats a vague one. And the better the model, the more convincing its wrong answers look. Writing a specific prompt, checking an answer before you use it, and knowing when a task deserves the heavy model all carry over to whatever Google ships next.

If you want to build that on purpose, [Iro's Gemini path](/learn-gemini) teaches it in five-minute lessons, and the app's drills include spotting the hallucination in a confident answer and setting a 0 to 100 trust dial on it. Pro adds the Prompt Lab, which scores your own prompts on clarity, specificity, constraints and context. For the free version of the habit, start with [how to spot an AI hallucination](/blog/spot-ai-hallucinations).

## FAQ

**What is Gemini 4 Argon?**

Gemini 4 Argon is Google's frontier AI model and the first of the Gemini 4 family. Google announced it on 30 September 2026 for vetted cyber defenders and made it generally available on 13 October 2026. It's built for long, multi-step work such as coding, legal and financial analysis, science and security.

**Can I use Gemini 4 Argon for free?**

Not in the Gemini app. Google's help center lists Argon only for Google AI Pro and Google AI Ultra subscribers. Free accounts get Auto or Flash-Lite, and Google AI Plus gets Flash-Lite, Flash and Pro. Developers can use Argon through the paid tier of the Gemini API.

**When was Gemini 4 Argon released?**

Google announced Gemini 4 Argon on 30 September 2026 and first rolled it out to security teams in its Fairwind Program. General availability followed on 13 October 2026: the Gemini API for developers, the Gemini app and AI Mode in Search for Google AI Pro and Ultra, and Google Antigravity for Ultra.

**Is Gemini 4 Argon better than GPT-6 Astra?**

On Google's own comparison table, Argon leads on 13 of 19 results, including legal, finance and long-context tests. GPT-6 Astra beats it on FrontierSWE v2, Terminal-Bench 4.0, Terminal-Bench Science and OSWorld-2.0, and the two tie on CWE-bench v1. Most rival scores in that table are the labs' self-reported figures.

**What is the Google Fairwind Program?**

Fairwind is a Google DeepMind program that gives vetted cyber defenders early access to advanced models. It prioritizes governments, critical infrastructure operators and core technology platforms, and Google says it works with more than 650 partners. Members can use Gemini 4 Argon without the cyber guardrails applied to the public version.

**How much does the Gemini 4 Argon API cost?**

At time of writing (October 2026), Google's introductory API price is $2 per million input tokens and $10 per million output tokens, with cached input 95% cheaper. After 30 November 2026 it rises to $4 and $20. In the Gemini app there's no separate charge, since Argon comes with Google AI Pro and Ultra.

## Read next

- [How to use Gemini: a beginner's guide](https://tryiro.com/blog/how-to-use-gemini)
- [How to read an AI benchmark score](https://tryiro.com/blog/how-to-read-ai-benchmarks)
- [ChatGPT vs Gemini: which should you use?](https://tryiro.com/blog/chatgpt-vs-gemini)
- [Learn Gemini in five-minute lessons](https://tryiro.com/learn-gemini)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

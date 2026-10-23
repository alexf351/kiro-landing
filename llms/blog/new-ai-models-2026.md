---
title: "New AI models in 2026: every major release, tracked"
canonical_url: "https://tryiro.com/blog/new-ai-models-2026"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["new AI models October 2026", "Gemini 4 Argon", "GPT-6 Astra", "Claude Opus 5.5", "GPT-6.1 Sol", "new AI models 2026", "AI model releases", "latest AI models", "Claude Opus 5", "GPT-5.6", "Grok 4.5", "Muse Spark", "best AI model 2026", "Kimi K3"]
date_published: "2026-07-26"
date_modified: "2026-10-23"
reading_time_minutes: 9
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# New AI models in 2026: every major release, tracked

> Twenty-six major releases since April, the latest Anthropic's Claude Duet preview on 21 October. Here's what each one changed, and which model to use.

**Canonical:** https://tryiro.com/blog/new-ai-models-2026
**Published:** 2026-07-26
**Updated:** 2026-10-23
**Reading time:** ~9 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Google's Gemini 4 Argon (13 October 2026) is the newest frontier flagship, and on 7 October GPT-6 replaced GPT-5.6 Sol as ChatGPT's default: GPT-6 Sol on paid plans, GPT-6 Luna on Free and Go.
- Five labs shipped frontier models in July 2026 alone: Anthropic (Claude Opus 5 on 24 July), OpenAI (the GPT-5.6 family on 9 July), SpaceXAI (Grok 4.5 on 8 July), Moonshot AI (Kimi K3, weights 27 July), and Meta (Muse Spark 1.1 on 9 July).
- The real 2026 story is price, not raw capability: Opus 5 delivers near-Fable-5 performance at half the price, and GPT-5.6 Terra matches GPT-5.5 for roughly half the cost.
- Every lab now ships tiers instead of one model (Luna, Sol and Astra at OpenAI; Haiku, Sonnet and Opus plus effort settings at Anthropic), so choosing the right tier now matters more than choosing the right lab.
- Benchmark leaderboards reshuffle within weeks. The skill that transfers between models (prompting, judgment, knowing when to verify) is worth more than tracking any single release.

## The short answer

**As of 23 October 2026, the newest frontier flagships are Google's Gemini 4 Argon (13 October), Anthropic's Claude Opus 5.5 (22 September) and OpenAI's GPT-6 Astra (3 September).** If you just want a default: GPT-6 Sol or Claude Sonnet 5.5 for everyday work, GPT-6 Astra, Gemini 4 Argon or Claude Opus 5.5 when correctness matters more than cost, and GPT-6 Luna or Claude Haiku 5.5 when you're paying per token at volume.

The more useful takeaway is what the cluster of releases has in common. In 2026 the frontier stopped being a single leaderboard position and became a price-performance curve: the top models are close enough on capability that cost per task, speed, and tier selection decide which one you should actually run.

**What changed in October:** ChatGPT's default moved to GPT-6 Sol on paid plans (7 October), and Gemini 4 Argon reached the API and Google's paying subscribers (13 October). Most of the month's other releases were cheaper or more open: Claude Haiku 5.5, DeepSeek V4.1-Flash-1017, MiniMax M3.1 Flash and the Muse Spark Open weights from Meta. Agents also became products in their own right, with [parallel agents in GPT-6 Pro](/blog/gpt-6-pro-parallel-agents) and Anthropic's [Claude Duet](/blog/claude-duet) preview.

Figures below reflect each lab's published pricing and reported benchmark results at the time each row was added (the tracker was first written on 26 July 2026). The September and October rows were checked against each vendor's own announcement or documentation, and their prices are as listed at time of writing (October 2026). Model pricing and leaderboard positions in this field change within weeks. Check the vendor's current docs before you commit to one for production work. Last reviewed 23 October 2026.

## Every major 2026 release, in order

| Model | Lab | Released | Why it mattered | API price (in/out per M tokens) |
| --- | --- | --- | --- | --- |
| **Muse Spark** | Meta (Superintelligence Labs) | April 2026 | Meta's first post-Llama model, a ground-up rebuild, not a Llama iteration. Free to use. | Free tier |
| **Claude Fable 5** | Anthropic | June 2026 (general availability 1 July) | Anthropic's most capable generally available model; briefly restricted by US export controls before relaunch. | Premium tier |
| **Grok 4.5** | SpaceXAI | 8 July 2026 | SpaceXAI's first model built specifically for coding and agentic work, trained on real developer session data. | $2 / $6 |
| **GPT-5.6 (Luna, Terra, Sol)** | OpenAI | 9 July 2026 | Three tiers instead of one model, with Sol adding Max reasoning effort and Ultra mode. | $1/$6 to $5/$30 |
| **Muse Spark 1.1** | Meta | 9 July 2026 | Multimodal reasoning update aimed at agentic tasks, on the Meta Model API. | Free tier |
| **Kimi K3** | Moonshot AI | 16 July 2026 (weights 27 July) | At ~2.8T parameters, the largest open-weight release to date: 1M context, native vision, Modified MIT license. | $3 / $15 |
| **Claude Opus 5** | Anthropic | 24 July 2026 | Near-Fable-5 capability at half the price, with a 1M-token context window and a fast mode. | $5 / $25 |
| **DeepSeek V4-Flash-0731** | DeepSeek | 31 July 2026 | Open weights under MIT on Hugging Face: 284B total / 13B active, 1M context. V4-Pro (1.6T / 49B active) is the larger sibling. | MIT, self-host |
| **Grok Imagine Image 2.0** | SpaceXAI | 7 August 2026 | Image model with region-level editing, segmentation, background removal and up to five reference images. Vendor-cited second on both Arena image boards, behind gpt-image-2. | In Grok; API coming soon |
| **Gemini 3.7 Flash** | Google | 13 August 2026 | Workhorse update three weeks after 3.6 Flash: better coding and agents, 1M context, tunable thinking levels. Introductory price doubles on 1 January 2027. | $0.75 / $3.75 to 31 Dec 2026 |
| **Gemini 3.8 Flash** | Google | 2 September 2026 | Google's third Flash release in six weeks: better coding, agentic work and multi-step reasoning than 3.7 Flash at the same price, though it can spend more tokens at higher effort. In the Gemini app for Google AI Pro and Ultra subscribers; a Cyber variant goes only to vetted defenders. | $0.75 / $3.75 to 31 Dec 2026, then $1.50 / $7.50 |
| **GPT-6 Astra** | OpenAI | 3 September 2026 | Frontier model aimed at agentic work: computer use, browsing and long multi-step tasks. GPT-5.6 Sol stayed ChatGPT's default until 7 October, and Plus reaches Astra only inside Work and Codex. | $10 / $50 |
| **DeepSeek V4.1-Flash** | DeepSeek | 10 September 2026 | The smallest model in DeepSeek's new architecture family: a 552B-parameter MoE with 8B active parameters for input and 16B for output, native image understanding and a 1M context. It replaced V4-Flash on DeepSeek's API, and V4-Pro is being phased out in its favor. | MIT, self-host |
| **GPT-6 Sol and GPT-6 Luna** | OpenAI | 22 September 2026 | The first GPT-6 models for everyday work, with Sol leaning to capability and Luna to cost. Both take text and images. They launched in the API and in ChatGPT Work and Codex for paid plans, then reached the Chat tab on 7 October. | Sol $2 / $10; Luna $0.10 / $0.50 |
| **Claude Opus 5.5** | Anthropic | 22 September 2026 | First model in the Claude 5.5 family. Anthropic says it performs at the level of Claude Fable 5.1 on most work and costs about 40% less to run than Opus 5, and it tops Anthropic's own table on agentic coding, computer use and knowledge work. | $4 / $20 |
| **Claude Sonnet 5.5** | Anthropic | 28 September 2026 | The faster, cheaper complement to Opus 5.5, aimed at well-scoped everyday tasks, bug fixes and polished documents. Over 30% faster than Sonnet 5 and up to 30% cheaper per task at the same token price. | $2 / $10 |
| **GPT-6.1 Sol** | OpenAI | 29 September 2026 | Near-Astra results on coding, computer use and professional work at one-fifth of Astra's standard API price, with delegation to subagents in beta. Released alongside OpenAI's DevDay 2026 announcements. | $2 / $10 |
| **dots** | OpenAI | 29 September 2026 | Not a model: always-on agents powered by GPT-6 Astra, each with its own cloud computer and browser, reachable in ChatGPT, Slack and Teams. Rolling out to Pro plans (outside the EEA, UK and Switzerland), Business Premium and Enterprise. | In ChatGPT Pro, Business Premium and Enterprise |
| **GPT-6 in ChatGPT (Sol, Luna)** | OpenAI | 7 October 2026 | GPT-6 became the default model in ChatGPT's Chat tab, with Intelligent UI (interactive, visual answers). Plus, Pro, Business and Enterprise get GPT-6 Sol; Free and Go get GPT-6 Luna. | In ChatGPT, all plans |
| **Claude Haiku 5.5** | Anthropic | 7 October 2026 | Anthropic's cheapest and fastest small model, built for high-volume work and as a subagent alongside Opus 5.5 and Sonnet 5.5. Anthropic puts its typical running cost about 75% below Haiku 4.5. | $0.10 / $0.50 (prompts up to 100K tokens) |
| **[Gemini 4 Argon](/blog/gemini-4-argon)** | Google | 13 October 2026 (announced 30 September) | Google's first Gemini 4 model, aimed at long, hard coding, science and agentic work, with a 1M-token unified input-output limit in the API. In the Gemini app for Google AI Pro and Ultra subscribers. | $2 / $10 introductory; $4 / $20 after 30 November |
| **Muse Spark Open** | Meta | 15 October 2026 | An open-weight version of Muse Spark: 816B total / 42B active parameters, 1M context, natively multimodal and built for coding and agents. Gated download under the Muse Model License, which requires a separate agreement for model-as-a-service businesses above $20M in revenue. | Muse Model License, self-host |
| **[GPT-6 Pro update](/blog/gpt-6-pro-parallel-agents)** | OpenAI | 16 October 2026 | The Pro reasoning option in ChatGPT, built on GPT-6 Astra, got faster responses, better tool use and parallel agents that split one task across several agents at once. Pro first, in the Chat tab; Plus doesn't get GPT-6 Pro. | In ChatGPT Pro, Business and Enterprise |
| **DeepSeek V4.1-Flash-1017** | DeepSeek | 17 October 2026 | A minor update to September's V4.1-Flash (552B backbone parameters, 1M context, image and text input) with better reasoning, coding, agentic and visual scores and shorter outputs. | MIT, self-host |
| **MiniMax M3.1 Flash** | MiniMax | 19 October 2026 | Multimodal mixture-of-experts model (about 428B total / 23B active, 1M context) for agents, coding, computer use and security. MiniMax says agentic work costs 70% less than on its predecessor. Weights are now on Hugging Face under MiniMax's own community license. | $0.15 / $0.60 |
| **[Claude Duet](/blog/claude-duet)** | Anthropic | 21 October 2026 (research preview) | Not a model but an agent app built around Claude Opus 5.5. It checks your connected accounts every few hours, keeps working in the background and asks before it acts for you. Waitlist for US Pro and Max subscribers, on iOS, Android and claude.ai. | Included in Pro and Max (shared usage limits) |



Two things stand out from that list. First, the release cadence: five frontier launches inside July alone, and that excludes the wider wave of smaller releases (Google's Gemini 3.6 Flash trio, several Qwen models, poolside's Laguna S 2.1) that landed in the same fortnight. Second, the direction: apart from Fable 5, GPT-6 Astra and Gemini 4 Argon, most releases in the second half of 2026 have been about doing more for less, not setting a new capability ceiling. Look at the late-September prices: GPT-6 Sol, GPT-6.1 Sol and Claude Sonnet 5.5 all sit at $2 / $10, and GPT-6 Luna and Claude Haiku 5.5 at $0.10 / $0.50 for shorter prompts.

## What actually changed in 2026

This is the headline. Anthropic positioned Claude Opus 5 as approaching Fable 5's capability in many categories at half the price, keeping the same $5/$25 per million tokens as Opus 4.8. OpenAI made the same move one tier down: GPT-5.6 Terra is pitched as competitive with GPT-5.5 at roughly half the cost, which makes it the obvious migration path for anyone already running 5.5 workloads.

For everyday users this is invisible. You are not paying per token in a chat app. For anyone building with the API, or using AI-powered tools that pass costs through, it is the whole story of 2026.

The single flagship model is gone. OpenAI splits GPT-5.6 into Luna (fast, cheap, high volume), Terra (balanced), and Sol (frontier reasoning and long-horizon agent work). Anthropic exposes effort settings so you can trade cost against depth per request, plus a fast mode on Opus 5 that runs about 2.5x faster at double the token price.

The practical consequence: _picking the wrong tier now costs more than picking the wrong lab._ Running a flagship model to reformat a spreadsheet is the 2026 version of burning money, and running a cheap tier on work that needs careful reasoning is the 2026 version of getting quietly wrong answers.

Grok 4.5 was SpaceXAI's first model built specifically for coding and agentic work, trained using real developer session data, and it reports 83.3% on Terminal-Bench 2.1 and 64.7% on SWE-Bench Pro. OpenAI reported Sol Ultra at 91.9% on the same Terminal-Bench 2.1 benchmark. The benchmarks the labs choose to lead with have shifted from trivia-style knowledge tests toward whether a model can work inside a real codebase over a long session.

Moonshot AI published the weights for Kimi K3 on 27 July, roughly 2.8 trillion parameters under a Modified MIT license, the largest open-weight release so far. The practical catch is that running it takes around 594GB of VRAM at full precision, so "open" here means auditable and self-hostable by organisations rather than runnable on your laptop. The pressure it puts on closed-model pricing is real regardless of who can host it.

Grok 4.5 landed at 54 on the Artificial Analysis Intelligence Index: fourth place at the time, behind Fable 5, GPT-5.5, and Opus 4.8, at roughly a fifth of the cost of the models above it. Meta's Muse Spark landed fourth on the same index in April. Fourth place at a fifth of the price is a better deal than first place for most real work, which is exactly why the leaderboard alone stopped being a useful buying signal in 2026.

## Which model should you actually use?

| If you want… | Use | Why |
| --- | --- | --- |
| A solid everyday default | GPT-6 Sol or Claude Sonnet 5.5 | Both cost $2 / $10 per million tokens. GPT-6 Sol is ChatGPT's default on paid plans, and Anthropic aims Sonnet 5.5 at well-scoped everyday work. |
| Maximum capability, cost secondary | GPT-6 Astra, Gemini 4 Argon or Claude Opus 5.5 | The newest frontier flagships. Astra's clearest lead is agentic and computer-use work, Google aims Argon at long, hard coding and science tasks, and Anthropic puts Opus 5.5 at Fable 5.1 level on most work. |
| Long documents or whole codebases | Claude Opus 5.5 or Gemini 4 Argon | Anthropic says Opus 5.5 is particularly good at long, sprawling jobs like codebase-wide migrations and audits; Argon has a 1M-token unified input-output limit in the API. |
| High-volume, simple tasks | GPT-6 Luna or Claude Haiku 5.5 | Both $0.10 / $0.50 per million tokens on shorter prompts, a fraction of last summer's budget tiers. Haiku 5.5 is built for summaries, classification and subagent work. |
| Coding agents in a real repo | Claude Opus 5.5 or GPT-6.1 Sol | Opus 5.5 tops Anthropic's agentic coding results; GPT-6.1 Sol offers near-Astra coding at a fifth of Astra's API price and can delegate to subagents (beta). |
| Open weights you can self-host and audit | DeepSeek V4.1-Flash-1017 or Kimi K3 | DeepSeek's model is MIT-licensed and activates only 8B to 16B parameters per token, so it is far cheaper to serve. Kimi K3 (Modified MIT) is the largest, but budget for an 8x H100 class machine. |
| To spend nothing | ChatGPT Free (GPT-6 Luna) or Muse Spark | ChatGPT's free tier runs GPT-6 Luna in the Chat tab. Meta's Muse Spark is free, strong on multimodal reasoning, and notably strong on health and medical benchmarks. |



One caveat worth stating plainly: nobody should reorganize their workflow every time a model ships. If your current tool does the job, a two-point benchmark difference will not change your output. The switching cost is real and the marginal gain usually is not.

## What this means if you're learning AI

There is an uncomfortable implication in a list like this: twenty-six major releases in seven months means anything you learn about a _specific_ model has a shelf life measured in weeks. People who tie their AI skills to one product's quirks have to relearn constantly.

What actually transfers between models is the part that has not changed since 2023:

- **Prompting structure**, giving a model role, context, constraints, and a defined output format works on every model on this page, and will work on the next four.
- **Judgment**, knowing which tasks a model is reliable for, and which need verification, matters more as models get more confident and more agentic.
- **Tool choice**, the skill this article is really about: matching the job to the tier, not defaulting to the most expensive option or the one you saw on X.
- **Verification habits**, the failure mode of a strong model is a plausible wrong answer, and better models make that failure harder to spot, not easier.

That is the case for treating AI as a skill you practice rather than a product you follow. The model names on this page will be outdated by winter. The habits are not.

## FAQ

**What is the newest AI model in 2026?**

The newest frontier model is Google's Gemini 4 Argon, generally available from 13 October 2026. Since then Meta has released the Muse Spark Open weights (15 October), DeepSeek shipped V4.1-Flash-1017 (17 October) and MiniMax launched M3.1 Flash (19 October). In ChatGPT, GPT-6 Sol became the default on paid plans on 7 October.

**Which AI model is the best in 2026?**

There is no single best model. The newest frontier flagships are Gemini 4 Argon, Claude Opus 5.5 and GPT-6 Astra; the best value at near-frontier quality are GPT-6.1 Sol and Claude Sonnet 5.5; the cheapest capable options are GPT-6 Luna and Claude Haiku 5.5. Because leaderboard positions shift within weeks, cost per task and tier selection are more useful buying signals than rank.

**What is the cheapest frontier AI model?**

Among near-frontier models, GPT-6.1 Sol and Claude Sonnet 5.5 both cost $2 per million input tokens and $10 per million output, and OpenAI pitches GPT-6.1 Sol as near-Astra on coding. For high-volume work, GPT-6 Luna and Claude Haiku 5.5 cost $0.10/$0.50 on shorter prompts. Meta's Muse Spark is free.

**Do I need to switch AI models every time a new one launches?**

No. For most everyday tasks (writing, summarizing, brainstorming, learning) the difference between the top models is small enough that your prompting matters more than your model choice. Switching is worth it when you hit a specific limit: context length, cost at volume, or a task type your current model consistently fails.

**What does GPT-5.6's Luna, Terra, and Sol naming mean?**

They are capability tiers of the same model family, released by OpenAI on 9 July 2026. Luna is the fastest and cheapest ($1/$6 per million tokens) for high-volume simple work; Terra is the balanced middle ($2.50/$15); Sol is the flagship ($5/$30) for frontier reasoning and long-horizon agentic tasks, and the only tier with Max reasoning effort and Ultra mode.

**What is the largest open-weight AI model?**

Kimi K3 from Moonshot AI, whose weights were published on 27 July 2026 under a Modified MIT license at roughly 2.8 trillion parameters. Running it locally requires about 594GB of VRAM at full precision (an 8x H100 class machine) so most users access it through the API instead.

## Read next

- [GPT-6 Astra: OpenAI's frontier model, explained](https://tryiro.com/blog/gpt-6-astra)
- [Kimi K3: the biggest open-weight model yet](https://tryiro.com/blog/kimi-k3)
- [Claude Opus 5: what actually changed](https://tryiro.com/blog/claude-opus-5)
- [GPT-5.6: Luna vs Terra vs Sol](https://tryiro.com/blog/gpt-5-6)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

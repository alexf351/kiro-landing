---
title: "Claude Opus 5: what actually changed, and who it's for"
canonical_url: "https://tryiro.com/blog/claude-opus-5"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Claude Opus 5", "Claude Opus 5 pricing", "Claude Opus 5 benchmarks", "Anthropic Opus 5", "Claude Opus 5 vs Fable 5", "new Claude model"]
date_published: "2026-07-26"
date_modified: "2026-07-26"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# Claude Opus 5: what actually changed, and who it's for

> Anthropic's newest model lands at half the price of Fable 5 with a 1M-token context window. Here's what's genuinely new, what the benchmarks mean, and whether you should switch.

**Canonical:** https://tryiro.com/blog/claude-opus-5
**Published:** 2026-07-26
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Claude Opus 5 rolled out on 24 July 2026 at $5 per million input tokens and $25 per million output — the same price as Opus 4.8, and half the input price of Anthropic's flagship Fable 5.
- The pitch is near-flagship capability at mid-tier cost, not a new capability ceiling: Anthropic positions it as approaching Fable 5 in many categories for half the money.
- It has a 1M-token context window, 128K max output, and a May 2026 knowledge cutoff — the most recent of any Claude model.
- A fast mode runs roughly 2.5x quicker at double the token price ($10/$50), and effort settings let you trade cost against depth on a per-request basis.

## The short answer

**Claude Opus 5 is Anthropic's cost-efficient frontier model, released on 24 July 2026 at $5 per million input tokens and $25 per million output tokens — half the input price of Fable 5, with capability Anthropic positions as approaching it in many categories.** It ships with a 1M-token context window, 128K maximum output, and a May 2026 knowledge cutoff.

If you use Claude in a browser or an app, the practical change is that a stronger model is now the one answering you. If you build on the API, the change is a pricing decision: Opus 5 costs the same as Opus 4.8 while performing meaningfully better, which makes staying on 4.8 hard to justify.

## What's actually new

Anthropic held Opus 5 at Opus 4.8's rate — $5/$25 per million tokens — while pushing capability toward Fable 5, whose input pricing sits at double that. Batch API pricing runs $2.50/$12.50 per million tokens for work that can tolerate delay. Read the release as a repositioning rather than a new ceiling: the frontier is being made affordable rather than pushed further out.

One million tokens is roughly 750,000 words, which in practice means an entire codebase, a year of meeting notes, or several long reports in a single conversation without chunking them. Combined with 128K maximum output, it makes long-document work substantially less fiddly — you stop engineering around the context limit and start just pasting the material in.

Two controls change how you spend money per request. **Fast mode** runs about 2.5x quicker at double the price ($10/$50 per million tokens) — worth it for interactive work where waiting is the bottleneck, wasteful for batch jobs. **Effort settings** let you dial reasoning depth up or down per request, so a simple reformatting task and a hard architectural question no longer cost the same.

Opus 5 has the most recent training cutoff of any Claude model. That matters less than people assume — any model's knowledge of recent events is patchy near its cutoff, and anything genuinely current still needs a web search or a source you provide. But it does reduce the number of times the model confidently describes a superseded version of a fast-moving tool.

## What the benchmarks say (and what they don't)

Anthropic reports Opus 5 more than doubling Opus 4.8's score on Frontier-Bench v0.1, landing within 0.5% of Fable 5's peak on CursorBench 3.2 at half the cost per task, and scoring roughly three times the next-best model on ARC-AGI 3. Anthropic also describes it as its most aligned model to date, with the lowest measured rates of deceptive behaviour.

Two honest caveats belong next to any of those numbers:

- **Vendor benchmarks are marketing artifacts.** Every lab picks the evaluations where its model looks strongest. That does not make the numbers false, but it does make cross-lab comparisons from press materials unreliable.
- **Benchmark gains rarely map to your work.** A model that scores three times higher on an abstract reasoning benchmark does not write emails three times better. For most everyday tasks — drafting, summarizing, explaining — the top handful of models are close enough that your prompt matters more than your model.

The number that _is_ straightforwardly meaningful is price: $5/$25 versus Fable 5's premium tier is a real, verifiable difference that shows up on your bill every month.

## Opus 5 vs Fable 5 vs GPT-5.6

The genuinely competitive matchup is Opus 5 against GPT-5.6 Terra and Sol: all three are aimed at the same buyer, who wants near-frontier quality without paying frontier prices. Opus 5's differentiator is the 1M-token context window; GPT-5.6's is the three-tier structure that lets you drop to Luna for cheap bulk work inside the same family.

## Should you switch?

**If you're on Claude Opus 4.8:** yes, effectively automatically. Same price, better model, longer context. There is no argument for staying.

**If you're on Fable 5 for everything:** probably worth testing Opus 5 on your actual workload. If quality holds on the tasks you care about, you halve your input costs. Keep Fable 5 for the genuinely hard subset.

**If you use ChatGPT and are wondering whether to move:** almost certainly not worth the disruption on capability grounds alone. GPT-5.6 and Opus 5 are close enough that switching tools costs you more in lost muscle memory than you gain in benchmark points. Switch if you specifically need the 1M-token context, or if you prefer Claude's writing style — not because a chart moved.

**If you're a casual user:** nothing to do. You are already getting the newer model in the apps that use it, and the meaningful gap between you and someone getting more from AI has never been the model version. It's how well you prompt it, and whether you check the output.

## FAQ

**When was Claude Opus 5 released?**

Claude Opus 5 rolled out on 24 July 2026, arriving about three weeks after Claude Fable 5 became generally available on 1 July and roughly two weeks after OpenAI's GPT-5.6 family launched on 9 July.

**How much does Claude Opus 5 cost?**

The API price is $5 per million input tokens and $25 per million output tokens — the same as Opus 4.8 and half of Fable 5's input price. Fast mode doubles that to $10/$50 and runs about 2.5x faster, and Batch API pricing is $2.50/$12.50.

**Is Claude Opus 5 better than Fable 5?**

No — Fable 5 remains Anthropic's most capable generally available model. Opus 5 is positioned as approaching Fable 5's capability in many categories at half the input price, which makes it the better value for most work but not the outright capability leader.

**What is Claude Opus 5's context window?**

One million tokens, with a maximum output of 128K tokens. That is roughly 750,000 words of input — enough for an entire codebase or several long reports in one conversation.

**What is Claude Opus 5's knowledge cutoff?**

May 2026, the most recent of any Claude model. Anything more recent than that still needs a web search or sources you provide in the prompt.

## Read next

- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)
- [GPT-5.6: Luna vs Terra vs Sol](https://tryiro.com/blog/gpt-5-6)
- [Learn to use Claude properly](https://tryiro.com/learn-claude)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into real leverage.

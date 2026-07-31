---
title: "Grok 4.5: xAI's coding model, reviewed honestly"
canonical_url: "https://tryiro.com/blog/grok-4-5"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Grok 4.5", "Grok 4.5 benchmarks", "Grok 4.5 pricing", "xAI Grok", "Grok for coding", "Grok 4.5 vs GPT-5.6"]
date_published: "2026-07-26"
date_modified: "2026-07-26"
reading_time_minutes: 6
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# Grok 4.5: xAI's coding model, reviewed honestly

> Fourth place on the intelligence leaderboard, a fifth of the price, and trained on real developer sessions. Here's what Grok 4.5 is genuinely good at.

**Canonical:** https://tryiro.com/blog/grok-4-5
**Published:** 2026-07-26
**Reading time:** ~6 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Grok 4.5 launched on 8 July 2026 at $2 per million input tokens and $6 per million output — roughly a fifth of what the top-ranked models cost.
- It is xAI's first model built specifically for coding and agentic work, trained using real developer session data rather than general web text.
- Reported results: 83.3% on Terminal-Bench 2.1, 64.7% on SWE-Bench Pro, and 54 on the Artificial Analysis Intelligence Index — fourth place at launch, behind Claude Fable 5, GPT-5.5, and Claude Opus 4.8.
- Its real advantage is token efficiency: it reportedly uses 3–4x fewer tokens per task than the priciest rivals, which compounds the price gap in long agent runs.

## The short answer

**Grok 4.5 is xAI's first model built specifically for coding and agentic work, released on 8 July 2026 at $2 per million input tokens and $6 per million output.** It is not the most capable model available — it landed fourth on the Artificial Analysis Intelligence Index at launch with a score of 54 — but it costs roughly a fifth of what the models above it charge.

That trade is the entire pitch, and for a specific kind of work it is a good one: long agent runs where token consumption compounds, and high-volume coding tasks where a small capability gap costs less than a large price gap.

## What makes it different

Grok 4.5 is a mixture-of-experts model trained on trillions of tokens of real Cursor developer session data — actual people working in actual codebases, rather than general web text and public repositories. The bet is that watching how developers iterate teaches a model something that reading finished code does not: what a half-broken change looks like, and what people do next.

xAI leaned on evaluations built to measure what a model can do inside a real repository over an extended session, rather than one-shot puzzle solving. That mirrors the wider 2026 shift — every lab has moved from knowledge quizzes toward agentic benchmarks, because agentic work is where the money is and where models still visibly fail.

The most under-discussed number: Grok 4.5 reportedly uses 3–4x fewer tokens per task than the most expensive rivals while matching GPT-5.5 in the Codex harness on the Coding Agent Index (76). Combine that with a per-token price a fifth of theirs and the effective cost difference on a long agent run is large — this is a bigger deal than the headline price alone suggests.

## The numbers, in context

For comparison, OpenAI reported Sol Ultra at 91.9% and base Sol at 88.8% on that same Terminal-Bench 2.1 benchmark. So Grok 4.5 is meaningfully behind the frontier on agentic coding — roughly five points behind base Sol — while costing $2/$6 against Sol's $5/$30.

Whether that trade is good depends entirely on your failure tolerance. Five percentage points on a benchmark means something different when you are generating throwaway scripts than when you are running an unattended agent against production code.

## When Grok 4.5 is the right call

**Use it when:** you are running high-volume coding or agentic tasks where per-task cost is the binding constraint; your workflow reviews output before it lands anywhere important; or you are running long agent sessions where the token-efficiency advantage compounds.

**Use something else when:** the task is a one-off where a few dollars of tokens is irrelevant and you just want the best answer — use GPT-5.6 Sol or Claude Fable 5. Or when you need very long context, where Claude Opus 5's 1M-token window is the differentiator.

**If you are not a developer:** Grok 4.5 is not aimed at you. It is a coding and agent model, and its strengths show up in tooling rather than chat. For general everyday use, the assistant you already know well will out-perform a new model you don't — the skill gap between users is consistently larger than the capability gap between the top few models.

## FAQ

**What is Grok 4.5?**

Grok 4.5 is xAI's coding and agentic model, released on 8 July 2026. It is a mixture-of-experts model trained on real developer session data, priced at $2 per million input tokens and $6 per million output.

**Is Grok 4.5 good for coding?**

It is competitive but not leading. It reports 83.3% on Terminal-Bench 2.1 and 64.7% on SWE-Bench Pro, and matches GPT-5.5 in the Codex harness on the Coding Agent Index. GPT-5.6 Sol scores higher on the same agentic coding benchmark, but costs substantially more per token.

**How much does Grok 4.5 cost?**

$2 per million input tokens and $6 per million output tokens — roughly a fifth of the cost of the top-ranked models at its launch. It also reportedly uses 3–4x fewer tokens per task than the most expensive rivals, which widens the effective saving on long tasks.

**How does Grok 4.5 compare to GPT-5.6?**

GPT-5.6 Sol is stronger on agentic coding benchmarks (88.8% vs 83.3% on Terminal-Bench 2.1) but costs $5/$30 per million tokens against Grok 4.5's $2/$6. GPT-5.6 Luna is the closer price competitor at $1/$6. Grok 4.5 sits between them on both price and reported capability.

## Read next

- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)
- [GPT-5.6: Luna vs Terra vs Sol](https://tryiro.com/blog/gpt-5-6)
- [The best AI coding tools](https://tryiro.com/blog/best-ai-coding-tools)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

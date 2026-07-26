---
title: "GPT-5.6 Luna vs Terra vs Sol: which tier should you actually use?"
canonical_url: "https://tryiro.com/blog/gpt-5-6"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["GPT-5.6", "GPT-5.6 pricing", "GPT-5.6 Sol", "GPT-5.6 Terra", "GPT-5.6 Luna", "GPT-5.6 vs GPT-5.5", "which GPT-5.6 tier"]
date_published: "2026-07-26"
date_modified: "2026-07-26"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# GPT-5.6 Luna vs Terra vs Sol: which tier should you actually use?

> OpenAI shipped three models instead of one. Sol costs five times what Luna does — here's how to tell which tier your work actually needs.

**Canonical:** https://tryiro.com/blog/gpt-5-6
**Published:** 2026-07-26
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- GPT-5.6 launched on 9 July 2026 in three tiers: Luna ($1/$6 per million tokens), Terra ($2.50/$15), and Sol ($5/$30).
- Sol is the flagship for frontier reasoning and long-horizon agentic work, and the only tier with Max reasoning effort and Ultra mode.
- Terra is the practical default: OpenAI positions it as competitive with GPT-5.5 at roughly half the cost, making it the obvious migration path off 5.5.
- Luna is built for volume, not depth — but it reportedly beats Claude Opus 4.8 on two coding benchmarks while costing a fraction as much, so it is not a toy tier.

## The short answer

**Use Terra by default, Sol when being wrong is expensive, and Luna when you are running the same simple task thousands of times.** OpenAI released the GPT-5.6 family on 9 July 2026 after a limited preview that began on 26 June, splitting one flagship into three tiers priced from $1/$6 to $5/$30 per million tokens.

The tier names are deliberately non-obvious, so here is the ranking in plain terms: Luna is the fastest and cheapest, Terra is the balanced middle, and Sol is the flagship.

## The three tiers, compared

Sol is also the only tier that gets two extra inference controls: **Max reasoning effort** and **Ultra mode**, both of which trade time and money for depth on the hardest problems. If you never touch those controls, you are probably paying for Sol without using what makes it Sol.

## What the benchmarks show

On Terminal-Bench 2.1 — an agentic coding benchmark that measures whether a model can work through a real terminal session — Sol Ultra reportedly scored 91.9% and base Sol 88.8%, edging Claude Mythos 5 and GPT-5.5 at 88.0%.

The more interesting number is at the bottom of the range. Luna reportedly beats Claude Opus 4.8 on two coding benchmarks — 74.6 versus 72.5 on the Artificial Analysis Coding Agent Index, and 67.2% versus 59.0% on DeepSWE — while costing a small fraction as much. One analysis put Luna at roughly 24 benchmark points per estimated API dollar against 4.5 for Opus 4.8 and 3.2 for Fable 5.

Two things follow from that, and the second one is the one people miss:

- **The cheap tier is genuinely capable.** "Budget model" in 2026 means something that would have been frontier eighteen months earlier. Most production workloads do not need more than Luna.
- **Points-per-dollar is not the whole story.** Efficiency metrics reward cheap models by construction. If a task fails 8% more often, the retries, the review time, and the occasional bad output that ships can cost far more than the token savings. Efficiency matters when volume is high and stakes are low — precisely Luna's stated use case.

## How to pick a tier without guessing

Ignore the marketing and ask two questions about the task in front of you.

**1. What does a wrong answer cost?** If a bad output gets caught immediately and costs a retry, use the cheap tier — you are effectively getting the same result for a fifth of the price. If a bad output ships to a customer, enters a codebase, or informs a decision nobody re-checks, buy the reasoning.

**2. How many steps does the task have?** Single-step tasks (rewrite this, classify that, summarize this document) run fine on Luna. Reliability drops as tasks get longer and more open-ended, so multi-step agent work — where each step compounds the last step's errors — is where Sol earns its price.

A practical routine used by teams running all three: prototype on Sol to find out what "good" looks like for your task, then step down a tier at a time until quality visibly breaks, and run one tier above that. Most workloads settle on Terra. Many settle on Luna and the team is surprised.

## If you're coming from GPT-5.5

Terra is the intended landing spot. OpenAI positions it as competitive with GPT-5.5 at roughly half the cost, which makes it a straightforward migration for existing 5.5 workloads: same rough capability, half the bill.

If you are a ChatGPT subscriber rather than an API user, none of this pricing applies to you directly — you get the newer models through the product, and the tier is chosen for you based on your plan and the task. The tier names matter when you are building something, or when you are choosing between AI-powered tools that disclose which model they run.

Worth repeating: the gap between someone getting a lot out of GPT-5.6 and someone getting a little has almost nothing to do with tier selection. It is prompt quality, task selection, and whether they verify. A well-structured prompt on Luna beats a lazy prompt on Sol Ultra almost every time.

## FAQ

**What is GPT-5.6?**

GPT-5.6 is OpenAI's model family released on 9 July 2026, after a limited preview that began 26 June. It ships in three tiers — Luna (fastest and cheapest), Terra (balanced), and Sol (flagship) — rather than as a single model.

**How much does GPT-5.6 cost?**

Per million tokens: Luna is $1 input / $6 output, Terra is $2.50/$15, and Sol is $5/$30. The gap between the cheapest and most expensive tier is 5x on both input and output.

**Which GPT-5.6 tier should I use?**

Terra for most work — it is positioned as competitive with GPT-5.5 at about half the cost. Sol for complex coding, multi-step agents, and scientific or security reasoning where correctness outweighs cost. Luna for high-volume simple tasks like summarizing, drafting, and classification.

**What is GPT-5.6 Ultra mode?**

Ultra mode is an inference setting available only on the Sol tier, alongside Max reasoning effort. Both trade additional time and cost for more depth on hard problems. Sol Ultra reportedly scored 91.9% on the Terminal-Bench 2.1 agentic coding benchmark, versus 88.8% for base Sol.

**Is GPT-5.6 Luna good enough for real work?**

For high-volume, single-step tasks, yes. Luna reportedly outperforms Claude Opus 4.8 on the Artificial Analysis Coding Agent Index (74.6 vs 72.5) and DeepSWE (67.2% vs 59.0%) at a fraction of the price. It is a poor fit for long multi-step agent runs, where small error rates compound across steps.

## Read next

- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)
- [Claude Opus 5: what changed](https://tryiro.com/blog/claude-opus-5)
- [Learn to use ChatGPT properly](https://tryiro.com/learn-chatgpt)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He writes about practical AI fluency — prompting, AI tools, and the daily habits that turn AI from a novelty into real leverage.

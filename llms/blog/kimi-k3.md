---
title: "Kimi K3: the biggest open-weight model ever, and who can actually run it"
canonical_url: "https://tryiro.com/blog/kimi-k3"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Kimi K3", "Kimi K3 open weights", "Kimi K3 benchmarks", "Kimi K3 local", "Moonshot AI", "largest open source AI model", "Kimi K3 pricing"]
date_published: "2026-07-27"
date_modified: "2026-07-27"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# Kimi K3: the biggest open-weight model ever, and who can actually run it

> Moonshot AI released the weights to a 2.8-trillion-parameter model today. Here's what that means, what it costs to run, and why 'open weights' isn't the same as 'you can use it'.

**Canonical:** https://tryiro.com/blog/kimi-k3
**Published:** 2026-07-27
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Kimi K3's weights shipped on 27 July 2026 under a Modified MIT license. At roughly 2.8 trillion parameters, it is the largest open-weight model released to date.
- You almost certainly cannot run it locally: it needs about 594GB of VRAM at BF16 and ~350GB even at 4-bit, so a minimum of 8x H100 80GB cards. A single RTX 4090 or a maxed-out Mac Studio cannot do it.
- The API is the realistic route at $3 per million input tokens and $15 per million output — cheaper than most frontier models, with $0.30 per million on cache hits.
- Treat the benchmarks carefully: as of the weights release, essentially every published K3 result is vendor-run in Moonshot's own environment, with independent evaluation still pending.

## The short answer

**Kimi K3 is a 2.8-trillion-parameter open-weight model from Moonshot AI whose weights were published on 27 July 2026 under a Modified MIT license, the largest open-weight release so far.** The API went live earlier, on 16 July; today's news is that anyone can now download and modify the model itself.

The practical catch is hardware. Running K3 yourself takes roughly 594GB of VRAM at full precision, or about 350GB heavily quantized. That is an 8x H100 cluster, not a desktop. For almost everyone, "open weights" here means the freedom for companies and researchers to self-host and audit it, not a model you will run on your own machine.

Figures reflect Moonshot's published specifications and reporting as of 27 July 2026.

## What Kimi K3 actually is

K3 is a mixture-of-experts model: roughly 2.8 trillion total parameters, but only 16 of its 896 experts activate per token. That is how a model this size stays economically viable to serve: you pay compute for a fraction of the parameters on any given token.

The headline specifications:

- **1M-token context window**, matching Claude Opus 5 at the top of the current range.
- **Native vision** and always-on reasoning, rather than reasoning as a separate mode you toggle.
- **Built for long-horizon coding and agent workloads**, the same target as most of July's releases.
- Two in-house architectural pieces: **Kimi Delta Attention**, a hybrid linear attention mechanism, and **Attention Residuals**, a replacement for standard residual connections, both wrapped in Moonshot's Stable LatentMoE framework.

API pricing is $3 per million input tokens and $15 per million output, dropping to $0.30 per million on cache hits. That undercuts most frontier models (Claude Opus 5 sits at $5/$25 and GPT-5.6 Sol at $5/$30), though it is not the cheapest option on the board.

## Can you run it locally? Almost certainly not

This is where enthusiasm for open weights meets arithmetic. The memory requirements:

| Precision | VRAM needed | What that means in hardware |
| --- | --- | --- |
| BF16 (full) | ~594 GB | 8x H100 80GB (640GB total) as a practical minimum |
| Q4 (4-bit quantized) | ~350 GB | Still far past any consumer setup |
| Aggressive quantization | ~650GB–1TB in practice with overhead | Past every consumer ceiling, including a 512GB Mac Studio |



A single RTX 4090 has 24GB. A high-end Mac Studio tops out at 512GB of unified memory and still cannot hold K3 comfortably. And the raw weights are only part of the problem: at 1M-token context, the KV cache alone consumes tens of gigabytes, so a setup that barely fits the weights will either swap constantly or force you to truncate context down to a few thousand tokens, which throws away the main reason to use the model.

If you want to use K3 today, the honest answer is the API at platform.kimi.ai or through OpenRouter. Downloading 594GB of weights to discover your machine cannot load them is a rite of passage worth skipping.

## How good is it, really?

Moonshot's published results put K3 trailing Claude Fable 5 on overall capability and on deep repository comprehension, while leading on some long-horizon agent tasks. It also ranked first on LMArena's blind Frontend Code Arena evaluation, ahead of Fable 5 (a blind, human-preference test), which makes it one of the more meaningful data points available.

Then the caveat that should sit next to all of it: **as of the weights release, effectively every K3 benchmark in circulation is vendor-run, in Moonshot's own environment.** Independent evaluations have not landed yet.

That is not an accusation. It is the normal state of affairs in the first week of any model launch, and it applies equally to Anthropic, OpenAI, and Google. But it is why the sensible reading of any launch-week benchmark table is "promising, unconfirmed" rather than "beats X." The useful thing about open weights is precisely that this gets resolved: independent researchers can now run their own evaluations on the actual model rather than an API endpoint that may be quietly updated underneath them.

Check back in a few weeks. Launch-week numbers and month-two numbers often differ, and the direction is rarely upward.

## Why open weights matter even if you never download them

It is tempting to dismiss a model you cannot run. That misses what open weights actually change:

- **Auditability.** Researchers can inspect the model directly instead of inferring behaviour through an API. For anyone in a regulated industry, that is the difference between a usable vendor and an unusable one.
- **No silent updates.** A hosted model can change under you with no notice, breaking prompts that worked yesterday. A downloaded checkpoint is frozen, which matters enormously if you have built something on top of it.
- **Price pressure.** Every capable open-weight release forces the closed labs to justify their pricing. The steep cost drops across 2026 are not unrelated to models like this existing.
- **Derivatives.** The Modified MIT license permits modification, so the useful thing may not be K3 itself but the smaller, specialized models people distil from it. Those _will_ run on ordinary hardware.

For everyday use, none of this changes your workflow. The assistant you already know well remains the better tool than a frontier model you have not learned. But it is worth understanding the shape of the field: the gap between what is available to a large company and what is available to an individual keeps narrowing, and open weights are the main reason why.

## FAQ

**What is Kimi K3?**

Kimi K3 is a mixture-of-experts model from Moonshot AI with roughly 2.8 trillion total parameters, a 1M-token context window, native vision, and always-on reasoning. Its API launched on 16 July 2026 and its weights were published on 27 July 2026 under a Modified MIT license, making it the largest open-weight model released to date.

**Can I run Kimi K3 locally?**

Realistically, no. It requires about 594GB of VRAM at BF16 and roughly 350GB even at 4-bit quantization, which means a minimum of 8x H100 80GB GPUs. A single RTX 4090 (24GB) or even a 512GB Mac Studio cannot run it. Most people should use the API at platform.kimi.ai or via OpenRouter.

**How much does Kimi K3 cost?**

$3 per million input tokens and $15 per million output tokens, dropping to $0.30 per million for cache-hit input. That is cheaper than Claude Opus 5 ($5/$25) and GPT-5.6 Sol ($5/$30), though not the cheapest capable model available.

**Is Kimi K3 better than Claude or GPT-5.6?**

Moonshot's own results show K3 trailing Claude Fable 5 on overall capability and deep repository comprehension, while leading on some long-horizon agent tasks and ranking first on LMArena's blind Frontend Code Arena. Independent evaluations were still pending at the weights release, so launch-week comparisons should be treated as provisional.

**What license is Kimi K3 released under?**

A Modified MIT license, which permits downloading and modifying the weights. That allows self-hosting, auditing, and building derivative models, including smaller distilled versions that can run on ordinary hardware.

## Read next

- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)
- [Claude Opus 5: what changed](https://tryiro.com/blog/claude-opus-5)
- [GPT-5.6: Luna vs Terra vs Sol](https://tryiro.com/blog/gpt-5-6)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

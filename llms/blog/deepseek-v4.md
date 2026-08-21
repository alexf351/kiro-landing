---
title: "DeepSeek V4: what open weights actually mean for you"
canonical_url: "https://tryiro.com/blog/deepseek-v4"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["DeepSeek V4", "DeepSeek V4 Pro", "DeepSeek V4 Flash", "DeepSeek open weights", "DeepSeek V4 context window", "best open source AI model 2026"]
date_published: "2026-08-21"
date_modified: "2026-08-21"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# DeepSeek V4: what open weights actually mean for you

> DeepSeek V4 is the strongest open-weight model of 2026: 1.6 trillion parameters, a million-token context, MIT licensed, free to download. Almost none of that matters if you are not running your own servers — so here is the part that does.

**Canonical:** https://tryiro.com/blog/deepseek-v4
**Published:** 2026-08-21
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- DeepSeek V4 comes in two sizes, both MIT licensed with weights on Hugging Face: V4-Pro at 1.6T total parameters with 49B active, and V4-Flash at 284B total with 13B active. Both support a 1M-token context window.
- MIT licensing is the genuinely unusual part. You can download it, run it, modify it and use it commercially with essentially no strings — which is not true of most models people call 'open'.
- '1.6 trillion parameters' does not mean you can run it. Only 49B are active per token, but you still need all 1.6T in memory, which is a server-rack problem rather than a laptop one.
- If you are not self-hosting, the practical benefit is indirect: open weights push the whole market's prices down and give you an exit if a vendor changes terms. That is worth understanding even if you never download anything.

## The short answer

**DeepSeek V4 is the most capable openly licensed model released in 2026, and for most people its importance is economic rather than practical.** You are unlikely to run it. You will probably still benefit from it existing.

The verifiable facts, from the model cards themselves: two sizes, **V4-Pro at 1.6T total parameters with 49B active** and **V4-Flash at 284B total with 13B active**, both with a **1M-token context window**, both released under the **MIT licence** with weights on Hugging Face. V4-Flash-0731 was promoted to a production-candidate build on 31 July 2026.

**A note on numbers you will see elsewhere.** Coverage of this release has been unusually sloppy — parameter counts off by a factor of ten, and API availability reported as generally available while DeepSeek's own docs still listed it as preview. Everything above comes from the model cards and DeepSeek's API documentation. Where third-party write-ups disagree with those, trust the source.

## The two models, and what the numbers mean

|  | Total parameters | Active per token | Context | Licence |
| --- | --- | --- | --- | --- |
| V4-Pro | 1.6T | 49B | 1M tokens | MIT |
| V4-Flash | 284B | 13B | 1M tokens | MIT |



The two-number format trips people up, so it is worth unpacking. These are **mixture-of-experts** models: the full network is enormous, but only a fraction of it fires for any given token. V4-Pro holds 1.6 trillion parameters and uses about 49 billion of them at a time.

That design buys speed and cost, _not_ a smaller footprint. The whole model still has to be resident in memory, because the router cannot know in advance which experts a token will need. **Active parameters tell you what it costs to run. Total parameters tell you what it costs to host.** Marketing tends to quote whichever is more flattering.

## Why the MIT licence is the actual story

"Open" gets used very loosely in AI. Plenty of models described as open ship with licences restricting commercial use, capping your user count, forbidding using outputs to train other models, or reserving the right to change terms later.

**MIT has essentially none of that.** Download it, run it, modify it, build a business on it, keep your changes private. It is the same licence a great deal of ordinary open-source software uses, and applying it to a frontier-scale model is a deliberate and unusual choice.

Two consequences worth caring about:

- **It is a permanent floor.** A released MIT model cannot be un-released. Whatever happens to DeepSeek as a company, these weights stay downloadable and usable — which is a very different guarantee from an API that can be repriced or retired.
- **It is competitive pressure.** A capable free-to-self-host model puts a ceiling on what closed vendors can charge for equivalent capability. You feel that in prices you never negotiated.

## Can you actually run it? Almost certainly not

This is where enthusiasm meets hardware.

"Free to download" and "free to use" are different claims. To serve V4-Pro you need all 1.6T parameters in fast memory. Even heavily quantised that is a multi-GPU server, not a gaming PC and not a laptop. **V4-Flash at 284B is far more approachable and still well beyond consumer hardware.**

So who is this actually for?

- **Companies with a data-residency or compliance requirement** that rules out sending text to someone else's API. This is the big one, and it is why open weights matter commercially.
- **Inference providers**, who host it and sell access — which is how most people who "use DeepSeek V4" will actually reach it.
- **Researchers**, who can inspect and modify something at this scale rather than probing a black box.

If you are an individual, the realistic route is DeepSeek's own app and API, or a third-party host. You get the model without the rack.

## What it changes if you just use AI apps

Honestly? Not much this week, and quite a lot over a year.

Open weights at frontier capability do three things that reach ordinary users indirectly. They **drag prices down** across the market. They **make lock-in less dangerous**, because a credible alternative exists that nobody can withdraw. And they **widen who can build**, which means more tools, including from people who could never have afforded to train anything.

What it does _not_ change is the thing that actually determines your results. A better model does not rescue a vague prompt; it produces a more articulate version of the wrong answer. **The skills that decide whether AI is useful to you — describing a task precisely, giving enough context, setting constraints, and checking output you cannot verify at a glance — are model-independent.** They were true of V3, they are true of V4, and they will be true of whatever ships next.

That is the case for spending your time on the durable half. Iro's paths cover [how to structure a prompt](/blog/how-to-write-a-prompt) and [how to catch a confident wrong answer](/blog/spot-ai-hallucinations), which pay off across every model in this post and every one after it.

## FAQ

**How many parameters does DeepSeek V4 have?**

DeepSeek V4 comes in two sizes. V4-Pro has 1.6 trillion total parameters with about 49 billion active per token, and V4-Flash has 284 billion total with about 13 billion active. Both are mixture-of-experts models, so only a fraction of the network runs for any given token even though the whole model must be held in memory.

**Is DeepSeek V4 really open source?**

The weights are released under the MIT licence on Hugging Face, which is unusually permissive: you can download, run, modify and commercially use them with essentially no restrictions. Purists note that open weights are not the same as fully open source, since training data and code are not necessarily included, but MIT weights are far more permissive than most licences marketed as open.

**Can I run DeepSeek V4 on my own computer?**

Almost certainly not. Mixture-of-experts means only around 49 billion of V4-Pro's parameters are active per token, but all 1.6 trillion must still be resident in memory, which requires a multi-GPU server rather than a desktop. V4-Flash at 284 billion is more approachable but still beyond consumer hardware. Most people will reach V4 through DeepSeek's own app and API or a third-party inference provider.

**What is DeepSeek V4's context window?**

Both V4-Pro and V4-Flash support a 1 million token context window, according to their Hugging Face model cards.

**Does a better model mean better results for me?**

Only partly. A stronger model raises the ceiling but does not fix a vague request — it tends to produce a more fluent version of the wrong answer. The factors that most affect your results are describing the task precisely, supplying enough context, stating constraints, and verifying output you cannot check at a glance. Those skills transfer across every model.

## Read next

- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)
- [ChatGPT vs DeepSeek, compared](https://tryiro.com/blog/chatgpt-vs-deepseek)
- [How to spot AI hallucinations](https://tryiro.com/blog/spot-ai-hallucinations)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

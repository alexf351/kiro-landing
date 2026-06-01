---
title: "The 7 prompt patterns that work everywhere"
canonical_url: "https://tryiro.com/blog/prompt-engineering-patterns"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["prompt engineering", "prompt patterns", "ChatGPT prompts", "Claude prompts", "prompt design"]
date_published: "2026-05-24"
date_modified: "2026-06-01"
reading_time_minutes: 9
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "prompt-engineering"
---

# The 7 prompt patterns that work everywhere

> Transferable structures for ChatGPT, Claude, Gemini, and Perplexity.

**Canonical:** https://tryiro.com/blog/prompt-engineering-patterns
**Published:** 2026-05-24
**Updated:** 2026-06-01
**Reading time:** ~9 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Most prompting problems are solved by a few repeatable patterns: role, context, examples, and step-by-step instructions.
- The single biggest upgrade is giving the model context and a clear goal before asking for output.
- Few-shot examples (showing one to three samples) reliably improve format and quality.
- Treat the first output as a draft and refine it with specific feedback.

## Why patterns beat prompts

People share prompts the way restaurants share recipes. Copy, paste, eat. Then the model updates and the prompt stops working.

Patterns are different. A pattern is a _structure_ — a way of organising information for an AI model that survives whatever the model does next. Master the patterns and you can write a prompt for any model, any task, any version.

These seven are the ones that show up over and over in real work. They're what Iro AI's [Prompt Lab](/prompt-engineering-app) drills.

## 1. The Role-Goal-Constraints frame

The most reliable opener for any non-trivial task. Four parts:

- **Role.** Who is the model supposed to be? ("You are a senior litigation associate.")
- **Goal.** What is the user trying to accomplish? ("Draft a discovery objection.")
- **Context.** What does the model need to know? (Facts, audience, prior decisions.)
- **Constraints.** What must the output do, avoid, or fit inside? ("Under 200 words. No case citations. Tone: assertive but cordial.")

Without role and constraints, you get average output. With them, you get specific.

## 2. Few-shot with anchors

For tasks where style matters more than reasoning — classifications, rewrites, tone-matching — give the model two or three examples that bracket the kind of output you want, then ask for the next one in the same shape.

The trick is _anchoring_: pick examples that span the range. Don't give three nearly-identical examples. Give a clearly-easy one, a clearly-hard one, and a middle one. The model learns the structure, not the surface.

Few-shot prompting works because large language models are strong in-context learners by design — the behavior OpenAI documented in [“Language Models are Few-Shot Learners”](https://arxiv.org/abs/2005.14165) (Brown et al., 2020).

## 3. Output format contract

Specify the output shape up front. Not as a wish — as a contract.

> Return ONLY a JSON object with these keys: `summary` (string, ≤ 40 words), `risks` (array of objects with `name` and `severity`), and `next_step` (string). No prose outside the JSON.

This is how you stop the model from preambling. The format contract is also what makes a prompt programmable — you can feed the output to the next step without parsing free text.

## 4. Self-critique loop

Ask the model to grade its own first draft before producing the final answer:

> Step 1: draft an answer. Step 2: list three specific weaknesses of the draft. Step 3: produce a second draft that fixes those weaknesses. Return only step 3.

This costs you a few seconds and almost always improves the answer. It works because the model is better at evaluating writing than at writing first drafts.

## 5. Decomposition

For anything complex, don't ask for the whole answer in one prompt. Ask the model to _plan_ the answer first, then execute the plan in subsequent turns.

This is the basis of [agentic workflows](/ai-agents-course): break a goal into named steps, do each step, gate progress on review. It's also what makes long answers actually useful — without decomposition, the model loses the thread halfway through.

Breaking a problem into steps measurably improves accuracy on complex tasks — the core finding behind [chain-of-thought prompting](https://arxiv.org/abs/2201.11903) (Wei et al., 2022).

## 6. Comparison prompt

When you can't tell whether an answer is good, ask the model to produce two or three different versions and compare them on explicit criteria you supply.

This is far more reliable than asking for one "good" answer. The model is better at choosing among options than at hitting a single target.

## 7. Verify-then-trust

The last pattern is a discipline more than a prompt. For any factual claim the model makes — numbers, dates, names, citations — check it before you trust it.

Two cheap checks: paste the claim back and ask the model to find sources; or run the same claim through a grounded tool like Perplexity. [Hallucination detection](/blog/spot-ai-hallucinations) has its own post — read that next.

## Putting them together

Most real prompts use three or four patterns at once. A typical work prompt might use Role-Goal-Constraints + Output format + Self-critique. A research prompt might use Decomposition + Comparison + Verify-then-trust.

The skill is knowing which patterns to combine for the task. That's not something you read your way to — you have to drill it. Iro AI's [Prompt Lab](/prompt-engineering-app) is the fastest way; the [ChatGPT path](/learn-chatgpt) and [Claude path](/learn-claude) apply the same patterns inside specific tools.

## FAQ

**Do these patterns work for image and video models too?**

Some of them. Role-Goal-Constraints maps cleanly to image and video prompting (subject, style, framing, motion, mood). Decomposition matters less. See image generation and video generation paths.

**Aren't system prompts more important than these patterns?**

System prompts use the same patterns. A good system prompt is mostly Role + Constraints + Output format set once at the top of the conversation.

**Which model handles these patterns best?**

All four major assistants (ChatGPT, Claude, Gemini, Perplexity) respond well to all seven patterns. Claude tends to be best at Self-critique. Perplexity is best at Verify-then-trust because it's built for grounded answers.

**How do I know which patterns to combine for a given task?**

Reps. That's what Iro AI's Prompt Lab is for — you practise patterns on small tasks until the choice becomes automatic.

## Read next

- [How to actually learn ChatGPT in 2026](https://tryiro.com/blog/how-to-learn-chatgpt-in-2026)
- [How to spot AI hallucinations in 5 seconds](https://tryiro.com/blog/spot-ai-hallucinations)
- [Prompt Lab in Iro AI](https://tryiro.com/prompt-engineering-app)
- [Learn Claude in Iro AI](https://tryiro.com/learn-claude)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He writes about practical AI fluency — prompting, AI tools, and the daily habits that turn AI from a novelty into real leverage.

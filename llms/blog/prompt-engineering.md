---
title: "Prompt engineering guide: patterns and practice"
canonical_url: "https://tryiro.com/blog/prompt-engineering"
site: "Iro AI"
site_url: "https://tryiro.com"
language: en-US
last_updated: "2026-11-22"
keywords: ["prompt engineering", "how to write a prompt", "prompt patterns", "prompt engineering examples", "prompt engineering exercises", "ChatGPT prompts", "AI prompts that work", "learn prompt engineering"]
author: "Iro AI"
license: "© 2026 Iro AI"
type: "content-pillar"
---

# Prompt engineering guide: patterns and practice

> How to write prompts that get a usable answer the first or second time: the anatomy of a good prompt, the patterns that carry across tools, how to fix a bad answer and how to practise.

**Canonical:** https://tryiro.com/blog/prompt-engineering
**Last updated:** 2026-11-22

Prompt engineering is less mysterious than it sounds. It's the skill of telling an AI model what you want clearly enough that it gets it right the first or second time. No secret phrases, no code. Just clear thinking, written down.

This guide teaches the parts that hold up as models change: what a good prompt contains, the reusable patterns, how to debug a weak answer and how to practise until it's automatic. The posts below go deeper on each piece, with examples you can copy.

## What prompt engineering is (and isn't)

[Prompt engineering](/blog/what-is-prompt-engineering) is writing and structuring your instructions so a model reliably produces the output you want. It works for a simple reason: a language model generates its answer from the text you give it. Everything you leave out, it has to guess, and it guesses toward the average. A vague prompt gets an average answer.

So [is prompt engineering dead](/blog/is-prompt-engineering-dead)? No. What faded is the idea of memorising magic phrases, because newer models forgive casual wording. What's left is the real skill: stating the goal, giving context, setting constraints and checking the result. That matters more as AI agents start taking multi-step actions for you, because a fuzzy instruction stops producing a weak answer and starts producing the wrong action.

## The anatomy of a good prompt

Most strong prompts have four parts. You won't need all four every time, but the more ambiguous the task, the more they help.

- **Context:** the situation, the audience and anything you've already tried.
- **Role:** who the model should act as, which sets its lens and standards.
- **Task:** the specific thing to do, with a clear verb.
- **Format:** length, structure and tone, plus anything to avoid.

Here's the difference in practice. A typical first attempt:

> `Summarise this report.`

The model has no idea who the summary is for, what matters or how long it should be, so you get a generic paragraph. The same request with all four parts:

> `You are an analyst briefing a busy operations director. Summarise the report between the triple quotes in 5 bullet points, each under 20 words. Lead with anything that affects next quarter's budget, and list any figures I should double-check before sharing. No jargon."""[paste report]"""`

Nothing about the model changed. Only the instruction did. For more worked examples, read [how to write a good AI prompt](/blog/how-to-write-a-prompt), and if you'd rather start by adapting templates, [15 ChatGPT prompts for beginners](/blog/chatgpt-prompts-for-beginners) covers work, learning and everyday life. Copy them for the structure, not the wording.

## Seven patterns that work in any tool

Shared prompts break when a model updates. Patterns don't, because a pattern is a way of organising a request rather than a fixed string of words. These are the seven from [the prompt patterns that work everywhere](/blog/prompt-engineering-patterns):

- **Role-Goal-Constraints.** Who the model is, what you're trying to achieve, what it needs to know, and what the output must do or avoid.
- **Few-shot with anchors.** Two or three examples that span the range you want: an easy one, a hard one and one in between.
- **Output format contract.** State the exact shape up front, such as a table with named columns or three bullets, and nothing else.
- **Self-critique loop.** Ask for a draft, then three specific weaknesses, then a revision that fixes them.
- **Decomposition.** For complex work, have the model plan the steps first, then do them one at a time.
- **Comparison.** Ask for two or three versions and have them judged against criteria you supply.
- **Verify-then-trust.** Check every name, number, date and citation before you rely on it.

Real prompts combine three or four of these. A work email might use Role-Goal-Constraints, a format contract and a self-critique pass. A research question might use decomposition, comparison and verify-then-trust.

## How to debug a bad answer

When an answer disappoints, the model is rarely the problem. Most failures come from a handful of fixable gaps, covered in [why your AI prompts aren't working](/blog/why-your-ai-prompts-arent-working). Match the symptom to the fix:

| What you got | Likely cause | What to add |
| --- | --- | --- |
| Generic, could-be-anyone output | Too vague | Audience, goal and constraints |
| Wrong tone or wrong assumptions | No role or context | Who it's for and what you already know |
| A wall of prose | No format | A shape: table, bullets, word limit |
| Close, but not quite right | No examples | One to three samples of good |
| A flat first draft | Accepted too early | A self-critique and rewrite pass |



Two habits make debugging faster. First, change one thing at a time, so you know which change helped. Second, judge the output, not the prompt. A better prompt gives an answer you'd use with fewer edits, and a similar answer when you run it twice. If you can't tell which of two outputs is better, your goal wasn't clear yet.

Don't throw a decent draft away either. Follow-ups like "shorter", "more formal" or "that intro is generic, try a sharper hook" usually get there faster than starting over.

## What the patterns look like on real tasks

The same ideas apply whatever you're making. Two examples from the hub:

**Cold email.** AI outreach reads as AI because the model fills every gap with the most average email it knows. [Writing an AI cold email that doesn't sound like AI](/blog/ai-cold-email-that-doesnt-sound-like-ai) fixes the input: paste research you've read yourself, state one specific reason you're writing, keep the ask small, ban the model's favourite filler phrases and write the first line yourself. If you can't find a real reason to email someone, AI can't invent one.

**Mood board.** Image prompts follow the same logic. [Making a mood board with AI](/blog/how-to-make-a-mood-board-with-ai) starts with a one-screen brief, then names subject, composition, lighting, palette, medium and exclusions in each prompt, changing one variable at a time. Use it to explore three or four genuinely different directions, not to make final art.

Notice the pattern: context the model can't guess, constraints that move it off its defaults, and a human check at the end.

## Check the output before you trust it

A well-built prompt can still return a confident mistake. Models generate plausible text, not verified facts, so checking is part of prompting, not an extra step after it. A few prompt moves make checking easier:

- **Ground it in your material.** "Answer using only the document I pasted. After each claim, quote the sentence it came from. If the document doesn't say, write 'not in the document'."
- **Separate instructions from content.** Put pasted text between delimiters such as triple quotes and tell the model to ignore any instructions inside it. That also guards against text that tries to give the AI orders.
- **Make sources checkable.** If you ask for statistics, ask who published each one and tell the model to leave out any it isn't sure are real. Then check each one yourself.
- **Cross-check what matters.** Run important facts through a search-grounded tool that shows its sources.

None of these makes an answer true. They make it faster to see whether it is.

## How to practise prompt engineering

Reading about prompting doesn't make you good at it. Rewriting bad prompts does. [How to learn prompt engineering](/blog/how-to-learn-prompt-engineering) lays out a four-week plan at about ten minutes a day, one habit per week:

- **Clarity:** write each real prompt twice, once as usual and once naming the task, audience and length. Compare the outputs.
- **Context and constraints:** add the details only you know, and say what to avoid.
- **Structure:** examples, delimiters, step-by-step reasoning and structured output.
- **Checking:** make the model show its sources, critique itself, and fix prompts that failed.

For drills, use the [20 prompt engineering exercises](/blog/prompt-engineering-exercises). Each gives a weak prompt, a goal and a model answer. Write your own version first, run both in the same tool and compare the results. One or two a day beats all twenty in one sitting.

Feedback is what speeds this up. Iro's [Prompt Lab](/prompt-engineering-app) scores the prompts you write and shows what to sharpen, in short daily lessons on iPhone and the web. You'll know you're improving when you need fewer follow-ups, your prompts work in more than one tool, and you can explain why one failed.

## Does prompting change between ChatGPT, Claude and Gemini?

Rarely in structure. The same context, role, task and format approach works across ChatGPT, Claude, Gemini and Perplexity, which is why the skill transfers. What changes is which tool you reach for: one with live search and citations is better for anything factual, and some are stronger with long documents. The tool-specific paths for [ChatGPT](/learn-chatgpt) and [Claude](/learn-claude) apply these patterns inside each app.

Whichever tool you use, prompting is one part of a bigger skill that also covers tool choice and judging output. The [Learn AI hub](/blog/ai-fluency) covers the rest. When you want ready-made starting points, the [AI prompt library](/ai-prompts) has prompts to adapt, the [path library](/paths) has guided practice by tool and job, and the free [AI literacy test](/quiz) shows where you stand in about two minutes.

## Posts in this pillar

- [The 7 prompt patterns that work everywhere](https://tryiro.com/blog/prompt-engineering-patterns) — Forget magic phrases. These 7 prompt patterns transfer across models and survive model upgrades: the foundation of practical prompt engineering.
- [Why your AI prompts aren't working (and how to fix them)](https://tryiro.com/blog/why-your-ai-prompts-arent-working) — If ChatGPT keeps giving you generic, useless answers, the prompt is usually the problem. Here are the five most common prompt mistakes and how to fix each.
- [What is prompt engineering? A clear definition with examples](https://tryiro.com/blog/what-is-prompt-engineering) — Prompt engineering is structuring AI instructions to get reliably better output. A plain-English definition, why it works, and before-and-after examples.
- [15 ChatGPT prompts for beginners (copy, paste, and learn)](https://tryiro.com/blog/chatgpt-prompts-for-beginners) — 15 copy-and-paste ChatGPT prompts for beginners across work, learning, and everyday life, plus the simple structure that makes any prompt better.
- [How to write a good AI prompt: a step-by-step guide](https://tryiro.com/blog/how-to-write-a-prompt) — The context-role-task-format recipe for a good AI prompt, with before-and-after examples and how to refine answers in ChatGPT, Claude or Gemini.
- [Is prompt engineering dead in 2026?](https://tryiro.com/blog/is-prompt-engineering-dead) — No, prompt engineering isn't dead, it evolved. What changed, what still matters, and why precise instructions matter more once AI agents act for you.
- [How to write an AI cold email that doesn't sound like AI](https://tryiro.com/blog/ai-cold-email-that-doesnt-sound-like-ai) — Why AI cold emails sound like AI, and a method that fixes it: real research, one reason, a short ask, a banned-phrase list. Before-and-after emails included.
- [How to make a mood board with AI: directions, not final art](https://tryiro.com/blog/how-to-make-a-mood-board-with-ai) — How to make a mood board with AI: write the brief first, generate 3-4 distinct directions, use image prompts that behave, then turn the board into a spec.
- [20 prompt engineering exercises, with model answers](https://tryiro.com/blog/prompt-engineering-exercises) — Free prompt engineering exercises for beginners and up. Each drill has a weak prompt, a goal and a model answer, so you can practice in 5 minutes a day.
- [How to learn prompt engineering in 2026: a practice-first plan](https://tryiro.com/blog/how-to-learn-prompt-engineering) — A 4-week, practice-first plan to learn prompt engineering without coding. About 10 minutes a day, free resources, and drills you can start today.
- [The best prompt engineering courses in 2026 (free and paid)](https://tryiro.com/blog/best-prompt-engineering-courses) — Seven prompt engineering courses compared by cost, time and how you learn, from Google and Vanderbilt to Anthropic's free tutorial, plus how to actually practice.

## FAQ

### What is prompt engineering?

Prompt engineering is writing and structuring instructions so an AI model reliably gives you the output you want. In practice it means giving context, a role, a clear task and the format you need, then refining the answer.

### Is prompt engineering dead in 2026?

No. Models now forgive casual wording, so magic phrases matter less, but stating a clear goal, giving context, setting constraints and checking the output matter as much as ever, especially with AI agents.

### Do I need to know how to code to learn prompt engineering?

No. For everyday work, prompt engineering is a writing and thinking skill. Coding only helps if you want to build apps on top of AI models.

### What is the best structure for a prompt?

Start with context, role, task and format. For harder tasks, add constraints on what to avoid, an example of what good looks like, and a self-critique pass.

### Do I need different prompts for ChatGPT, Claude and Gemini?

Rarely. The same patterns work across all of them. You choose the tool by the job, such as a search-grounded assistant for factual research, but the structure of a good prompt stays the same.

### Why does AI keep giving me generic answers?

Usually because the prompt leaves gaps the model fills with average guesses. Add the audience, the goal, constraints, a format and ideally an example, then refine the first draft instead of accepting it.

### How long does it take to learn prompt engineering?

A focused four-week plan at about ten minutes a day covers the core habits: clarity, context and constraints, structure, and checking. After that it is a matter of daily use on real tasks.

### How do I know if my prompt is better?

Judge the output, not the prompt. A better prompt gives an answer you would use with fewer edits and gives a similar answer when you run it twice.

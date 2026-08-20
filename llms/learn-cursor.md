---
title: "Learn Cursor: Agent Mode, Rules & Reviewing AI Code | Iro AI"
canonical_url: "https://tryiro.com/learn-cursor"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Cursor AI", "how to use Cursor", "Cursor agent mode", "cursorrules", "Cursor tutorial", "AI code editor"]
audience: "Developers, technical founders, and anyone shipping code with AI assistance"
level: "Intermediate"
date_published: "2026-07-29"
date_modified: "2026-07-29"
author: "Iro AI"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
---

# Cursor writes code faster than you can read it. That's the problem to solve.

> Cursor is an AI-first code editor that can edit across files, run terminal commands, and iterate on its own mistakes. The people who get value from it are not the ones who prompt best. They are the ones who review best.

**Canonical page:** https://tryiro.com/learn-cursor
**App Store:** https://apps.apple.com/app/id6759628066
**Last updated:** 2026-07-29

## In short

Cursor is an AI code editor built around three levels of assistance: inline edits for single changes, Composer for multi-file edits you review as diffs, and Agent mode, which reads the codebase, edits files, runs terminal commands, and loops until the task is done. The skill that separates people who ship with it from people who accumulate debt is reviewing its output with the same scrutiny you would apply to a pull request from a stranger.

- Composer edits multiple files and shows you a diff per file before you accept.
- Agent mode runs a longer autonomous loop, including terminal commands.
- Rules files in .cursor/rules keep the model on your conventions and stop it inventing packages.
- Context can be silently dropped in long sessions, so re-mention key files explicitly.

## What you'll be able to do

- Pick the right mode for the size of the change
- Write a rules file that actually changes the output
- Keep the model pointed at the files that matter
- Catch the failure mode that costs most: plausible code solving the wrong problem

## Inside the path

1. **Three modes, three jobs** (5 min) — Inline, Composer, Agent: when each one is the right amount of autonomy.
2. **Rules that survive** (5 min) — What to put in .cursor/rules, and why long sessions quietly forget it.
3. **Context is a budget** (5 min) — Pointing at the right files instead of hoping the model finds them.
4. **Reviewing like a skeptic** (5 min) — Reading generated diffs for what is wrong, not for whether they look reasonable.

## Three modes, and how much rope to give

Cursor offers escalating levels of autonomy, and matching the level to the task is most of the skill.

- **Inline edit** for a single function or block. You see exactly what changed.
- **Composer** for changes across several files. It proposes a diff per file and you accept or reject each one. This is the workhorse.
- **Agent mode** for longer tasks where you want it to read the codebase, run commands, watch output, and iterate. Powerful and the easiest to misuse.

A useful rule: the more files a change touches, the more you want to see diffs rather than outcomes. Agent mode is best on work you could describe precisely to a competent contractor, and worst on work you have not fully thought through yourself.

## Rules files, and why they stop working

Rules live in `.cursor/rules` and tell the model your conventions: the packages you use, the patterns you want, the APIs that are off limits. Good rules prevent the two most annoying agent failures, importing packages that do not exist and using APIs from an older version of your framework.

The catch is that in long sessions, context gets compacted and rules can be silently dropped. If output starts drifting from your conventions halfway through a session, that is usually what happened. Re-mention the rule or the file explicitly rather than assuming it is still in play.

Keep rules short and specific. A rules file that explains standard patterns wastes context on things the model already knows. Spend it on what is unique to your codebase.

## Reviewing generated code

Cursor writes faster than you read. That inverts where your time goes, and most people have not adjusted: the bottleneck stopped being typing and became reviewing.

Read a generated diff looking for what is _wrong_, not checking whether it looks reasonable. Agreeable-looking code is exactly what these models are best at producing. Specifically:

- Does it solve the problem you described, or a slightly different one? This is the most expensive failure and the hardest to spot.
- Did it touch files you did not expect?
- Did it handle the edge case, or add a comment claiming it did?
- Do the tests actually exercise the change, or did the model write tests that pass by construction?

## What Cursor does not fix

An AI editor makes a good engineer faster. It does not make an unclear specification clear. If you cannot describe what you want precisely, the model will produce something plausible in the wrong direction, and you will spend longer unpicking it than you would have spent writing it.

The skills that compound here are the same ones that transfer to every model release: specifying constraints up front, reading adversarially, and knowing which tasks are faster done by hand.

## Sample practice exercise

**Type:** Tool judgment

**Scenario:** You need to rename a database column and update every usage across about fifteen files, including two migrations and a handful of tests.

**Task:** Choose the approach most likely to land this cleanly.

- Use Agent mode with the prompt "rename the column and fix everything", then accept the result once the tests pass.
- **(correct)** Use Composer, name the old and new column, list the migration and test files explicitly, then review each file's diff before accepting.
- Use inline edit in each of the fifteen files one at a time.
- Ask Cursor in chat how to do it, then make all the edits by hand.

**Why:** The second option wins on two counts. First, **Composer shows a diff per file**, so you approve fifteen small reviewable changes rather than one opaque result. Second, naming the migration and test files explicitly stops the model guessing at scope, which is where renames usually go wrong. Agent mode with a vague prompt is the expensive failure: passing tests prove the tests still pass, not that the rename was complete or that a migration was not silently rewritten. Inline editing fifteen files is slow and invites you to miss one. Doing it entirely by hand throws away the leverage.

## Cursor questions

**What is Cursor?**

Cursor is an AI-first code editor. It offers inline edits for single changes, Composer for multi-file edits reviewed as diffs, and Agent mode, which reads your codebase, edits files, runs terminal commands, and iterates until a task is finished.

**What is the difference between Composer and Agent mode in Cursor?**

Composer proposes multi-file edits and shows a diff per file for you to accept or reject. Agent mode runs a longer autonomous loop, executing terminal commands and iterating on its own output with less intervention. Use Composer when you want to review each change, and Agent mode for well-specified longer tasks.

**What should go in a .cursor/rules file?**

Your conventions, the packages and framework versions you actually use, and patterns specific to your codebase. Keep it short. Rules prevent the model importing non-existent packages or using outdated APIs. Avoid explaining standard patterns, which wastes context.

**Why does Cursor stop following my rules mid-session?**

Long sessions compact context, which can silently drop rules. If output starts drifting from your conventions, re-mention the rule or the relevant file explicitly rather than assuming it is still in context.

**Which AI model should I use inside Cursor?**

Cursor lets you choose, and the picks have real trade-offs. See our guide to choosing an AI model for coding for how the current options compare on agentic work, raw capability, and cost.

## Related paths

- [AI for developers](https://tryiro.com/ai-for-developers)
- [Vibe coding course](https://tryiro.com/vibe-coding-course)
- [Which AI model for coding?](https://tryiro.com/blog/best-ai-model-for-coding)

## More AI tools to learn

- [Learn Notion AI](https://tryiro.com/learn-notion-ai): Draft, summarize, extract action items, and ask questions across your workspace.
- [Learn Canva AI](https://tryiro.com/learn-canva-ai): Design on-brand graphics fast with Canva's Magic Studio AI tools.
- [Learn ElevenLabs](https://tryiro.com/learn-elevenlabs): Get AI speech that sounds like a person, not an announcer reading a script.
- [Learn Gamma](https://tryiro.com/learn-gamma): Generate a deck in a minute, then do the ten minutes that make it good.
- [AI for Excel & Sheets](https://tryiro.com/ai-for-excel): Write formulas, clean data, and build models with AI as your spreadsheet copilot.
- [Learn Midjourney](https://tryiro.com/learn-midjourney): Write prompts that give you the image you pictured, not a muddy guess.


## Read next

- [The best AI coding tools](https://tryiro.com/blog/best-ai-coding-tools)
- [Which AI model should you use for coding?](https://tryiro.com/blog/best-ai-model-for-coding)

---

Iro AI is a gamified app for building real AI skills, five minutes a day: 29 learning paths, 477 lessons, 3,000+ exercises, and active practice with instant feedback. Free to start on iOS; also runs in any browser at https://app.tryiro.com. Full reference: https://tryiro.com/llms-full.txt

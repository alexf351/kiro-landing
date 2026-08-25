---
title: "How to use Microsoft Copilot (and why it seems broken)"
canonical_url: "https://tryiro.com/blog/how-to-use-microsoft-copilot"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["how to use Microsoft Copilot", "Microsoft Copilot guide", "Copilot in Word", "Copilot in Excel", "is Microsoft Copilot free", "Copilot vs ChatGPT"]
date_published: "2026-08-21"
date_modified: "2026-08-21"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# How to use Microsoft Copilot (and why it seems broken)

> Most complaints about Copilot come down to one thing: there are two different products with the same name, and the free one cannot do the thing people are trying to do. Here is which is which, and how to prompt the one you have.

**Canonical:** https://tryiro.com/blog/how-to-use-microsoft-copilot
**Published:** 2026-08-21
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- There are two Copilots. The free one at copilot.microsoft.com is a web chatbot. Copilot inside Word, Excel, PowerPoint and Outlook needs a paid Microsoft 365 subscription — Personal, Family or Premium.
- Almost every 'Copilot doesn't work in Word' complaint is someone using the free web version. Nothing is broken; they have the other product.
- Copilot's real advantage over ChatGPT and Claude is not the model, it is the context: inside Microsoft 365 it can see your document, your spreadsheet and your inbox. That is also its main privacy consideration.
- The prompting skill is the same one every other assistant rewards. Copilot rewards it slightly more, because vague requests against your real documents produce confidently wrong output about your actual work.

## There are two Copilots, and that is the whole confusion

**Microsoft ships two different things under the name Copilot, and most frustration with it is really a mismatch between the two.**

|  | Free Copilot | Copilot in Microsoft 365 |
| --- | --- | --- |
| Where | copilot.microsoft.com, the desktop and mobile apps, and Edge | Inside Word, Excel, PowerPoint, Outlook and OneNote |
| Costs | Nothing | A paid Microsoft 365 subscription — Personal, Family or Premium |
| Can it see your documents? | No | Yes, that is the entire point |
| Good for | General questions, drafting, web-grounded answers | Working on the file actually in front of you |



So when someone says "Copilot can't summarise my document," they are almost always in the free web chatbot, which has never been able to see their files. Nothing is broken. It is the other product.

Microsoft's tier names and prices have moved more than once, including a Microsoft 365 Premium tier and a pricing update in the last year. We deliberately do not quote figures here — check [Microsoft's own pricing page](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing), because a number copied from a blog post is how people end up surprised at renewal.

## What it actually does in each app

Assuming you have the paid version, this is where it earns the money:

- **Word** — drafts from a brief, rewrites a section in a different register, and summarises a long document. Best used on the awkward first draft, where a bad start costs the most time.
- **Excel** — analyses a range, builds charts, and surfaces patterns. Ask it to explain what a formula does before you ask it to write one; it is a very effective way to learn a spreadsheet you inherited.
- **PowerPoint** — generates outlines and suggests layouts. Treat the output as structure, not as a finished deck.
- **Outlook** — drafts replies and summarises long threads. Thread summarisation is genuinely the strongest single feature: it turns a forty-message chain into who decided what.

The pattern worth noticing: **Copilot is strongest on tasks where the source material is right there and the work is transformation** — summarise this, rewrite this, explain this. It is weakest when asked to invent something with no grounding, which is exactly when a general chatbot does better.

## How to prompt it

The same four things every assistant needs, with one Copilot-specific wrinkle.

- **Say what the output should be.** "Summarise this" invites a summary of whatever length it fancies. "Summarise this into five bullets, each naming a decision and who owns it" produces something you can use.
- **Name the audience and register.** "Rewrite this for a client who is not technical" changes the output far more than any adjective about tone.
- **Point at the source explicitly.** This is the Copilot-specific part. In Word and Outlook you can reference specific files and threads, and results improve sharply when you do rather than assuming it knows which document you mean.
- **State the constraints.** Length, what to exclude, what to preserve verbatim. Constraints are the difference between a draft you edit and a draft you rewrite.

A worked example. Instead of _"write an email about the delay"_, try: _"Draft a reply to this thread telling the client the delivery slips two weeks. Lead with the new date, give one sentence of cause without blaming anyone, offer a call. Under 120 words, plain language, no apology in the first sentence."_

The second prompt is not longer for the sake of it. Every clause removes a decision the model would otherwise make badly on your behalf.

## What not to trust it with

Copilot's grounding in your real files makes it more useful _and_ more dangerous, because a confident wrong answer about your own data is much harder to spot than a wrong answer about the world.

- **Check every number it reports back.** Especially in Excel and in thread summaries. A summary that transposes two figures reads exactly as fluently as one that does not.
- **Verify anything attributed to a person.** "Sam agreed to the deadline" in a thread summary is the kind of claim that causes real problems if the model inferred it.
- **Know your organisation's data posture.** Copilot in Microsoft 365 works by having access to your content. That is the feature. Whether it is appropriate for a given document is a policy question, not a technical one.

The underlying skill is judging output you cannot verify at a glance, which is the most transferable AI skill there is and the one most people skip. [How to spot AI hallucinations](/blog/spot-ai-hallucinations) covers the tells.

## Copilot or ChatGPT?

Not really a competition, because they win on different axes.

**Use Copilot when the context is the point.** The document, the spreadsheet, the thread. Nothing else has that access, and pasting a long document into a chatbot loses the structure that made it a document.

**Use ChatGPT or Claude when the thinking is the point.** Open-ended drafting, argument, exploration, code. They are also simply where you already are if you do not live in Microsoft 365.

Most people who use AI seriously end up using two or three, chosen by task rather than loyalty. **Tool choice is itself a skill**, and it is the one that stops you forcing every job through whichever app you opened first. [ChatGPT vs Copilot](/blog/chatgpt-vs-copilot) goes deeper on the split, and Iro's [Copilot path](/learn-copilot) is built around practising these prompts rather than reading about them.

## FAQ

**Is Microsoft Copilot free?**

Partly. A free Copilot is available at copilot.microsoft.com, as desktop and mobile apps, and inside Edge — it is a web-grounded chatbot. Copilot inside Word, Excel, PowerPoint and Outlook requires a paid Microsoft 365 subscription such as Personal, Family or Premium. Most complaints that Copilot cannot see a document come from people using the free web version.

**Why can't Copilot see my Word document?**

Because you are almost certainly using the free web Copilot, which has no access to your files by design. Copilot needs to run inside the Microsoft 365 app itself to read the document you are working on, and that requires a paid subscription.

**What is Copilot best at?**

Transformation tasks where the source material is already present: summarising a long document, rewriting a section for a different audience, explaining an inherited spreadsheet formula, and condensing a long email thread into decisions and owners. It is weaker at open-ended invention with no grounding, where a general chatbot usually does better.

**How do I write a good Copilot prompt?**

Say what the output should be including its format, name the audience and register, point explicitly at the source file or thread rather than assuming it knows which you mean, and state constraints such as length and what to preserve verbatim. Each clause removes a decision the model would otherwise make badly on your behalf.

**Should I use Copilot or ChatGPT?**

Use Copilot when the context is the point — the document, spreadsheet or thread it can actually see. Use ChatGPT or Claude when the thinking is the point, such as open-ended drafting, argument or code. Most people who use AI seriously end up using several and choosing by task rather than by loyalty.

## Read next

- [ChatGPT vs Microsoft Copilot](https://tryiro.com/blog/chatgpt-vs-copilot)
- [What is Microsoft Copilot?](https://tryiro.com/blog/what-is-microsoft-copilot)
- [How to use AI at work](https://tryiro.com/blog/how-to-use-ai-at-work)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

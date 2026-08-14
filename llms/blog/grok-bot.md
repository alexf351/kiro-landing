---
title: "Grok Bot: what SpaceXAI's always-on AI agents actually do"
canonical_url: "https://tryiro.com/blog/grok-bot"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Grok Bot", "SpaceXAI Grok Bot", "xAI AI agents", "Grok Bot pricing", "always-on AI agents", "AI agent that uses your tools"]
date_published: "2026-08-13"
date_modified: "2026-08-13"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-agents"
---

# Grok Bot: what SpaceXAI's always-on AI agents actually do

> Grok Bot went into beta on 11 August 2026. Each Bot gets its own cloud computer, signs in to the tools you already use, and comes back with finished work. Here is what that means in practice, what it costs, and the part nobody markets: what you have to hand over to make it work.

**Canonical:** https://tryiro.com/blog/grok-bot
**Published:** 2026-08-13
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Grok Bot is not a chatbot. Each Bot runs on its own cloud computer, logs in to your existing tools, and completes multi-step jobs without being watched.
- It works by driving software the way you do rather than through API integrations, which is why it can reach tools that never built an AI connector.
- Beta access is bundled into SuperGrok Heavy, Cursor Ultra and Cursor Teams Premium. SuperGrok Heavy is $300 a month, so this is not a casual purchase.
- Cursor tiers grant access because SpaceX now owns both. It acquired xAI, rebranded to SpaceXAI, then agreed to buy Cursor's parent Anysphere.
- The real cost is trust: a Bot that signs in to your accounts holds your session, so the scoping decisions are yours to make before you delegate.

## What Grok Bot is

SpaceXAI put **Grok Bot** into public beta on **11 August 2026**. The pitch is short: Bots are AI teammates you can give real work to.

Each Bot gets three things a chatbot does not have. **Its own cloud computer**, so it has somewhere to actually do the work. **Its own login sessions**, so it can reach the tools your job lives in. And **its own memory** of how you like things done, so the second time you ask costs you less explaining than the first.

The company says the product started as an internal prototype that spread across its own teams, who built Bots for sales outbound, marketing campaigns, office operations and bug fixes before it shipped to anyone else. That origin shows in the framing: this is aimed at recurring work, not one-off questions.

## Why this is not just a better chatbot

A chatbot produces text and hands it back to you. You are still the one who opens the tool, pastes the thing, clicks the button, and checks the result. The model does the thinking and you do the operating.

Grok Bot inverts that. It **drives the software itself**, working through interfaces the way a person does rather than through prebuilt API integrations. That distinction matters more than it sounds. An agent that needs an API connector can only reach tools whose makers built one. An agent that can use a screen and a login can reach the internal admin panel, the crusty vendor portal, and the tool your finance team refuses to migrate off.

Bots can also message each other and share context in threads, and they learn routines by demonstration, then run them on a schedule. Watch it once, repeat it forever, is the shape of the promise. Whether it holds at your particular messy edge cases is the thing to test rather than assume.

## What a Bot can actually do

The published examples cluster around multi-step work that spans several apps and has a definite finish line:

- **Work that crosses tools.** Pull from one system, decide something, write the result into another.
- **Work that lives in an inbox.** Triage, draft, follow up, escalate what needs a human.
- **Work that repeats.** Demonstrate the routine once, then let it run on a schedule.
- **Work that is delegated, not answered.** The output is a finished job rather than a suggestion you still have to execute.

The client apps are on desktop, including a Linux build, and iOS. Android is listed as coming. Enterprise customers are routed to a waitlist rather than getting immediate access.

## What it costs and who can get it

Grok Bot is not sold on its own. Beta access is bundled into three existing subscriptions: **SuperGrok Heavy**, **Cursor Ultra** and **Cursor Teams Premium**.

SuperGrok Heavy sits at the top of the Grok consumer ladder at **$300 a month**. For context, the tiers below it run roughly: a free tier, SuperGrok Lite around $10, SuperGrok around $30, and a $100 tier between that and Heavy. So Grok Bot is gated behind the most expensive consumer plan on offer, several times the price of a normal AI subscription.

That pricing tells you the intended buyer. This is aimed at people whose time is expensive enough that unattended work pays for itself, not at someone curious what agents feel like. If you want the cheap version of the lesson, the honest answer is to wait: agentic features reliably drift down the pricing ladder once they stop breaking.

## Why a Grok feature is gated behind Cursor plans

This looks like a mistake on the pricing page until you follow the corporate trail. It is not.

SpaceX acquired xAI in an all-stock deal, finalised in the first half of 2026, and the AI business was folded in rather than run alongside. On **6 July 2026** the company rebranded as **SpaceXAI**. Grok itself kept its name, which is why the chatbot, the apps and the API all still say Grok.

Then in June 2026 SpaceX announced it would acquire **Anysphere**, the company behind the AI coding tool **Cursor**, in a deal reported at around $60 billion and set to close later in the year.

So Grok and Cursor now sit under one owner, and their top subscription tiers have started sharing entitlements. If you already pay for Cursor at the Ultra or Teams Premium level, you may have access to Grok Bot without knowing it.

## The part that is not in the marketing

An agent that signs in to your tools is holding your session. Whatever it does, it does as you.

That is not a reason to avoid it. It is the reason to scope it deliberately, and the scoping is your job, not the vendor's:

- **Give it its own accounts where you can.** A separate login with only the permissions the task needs beats handing over yours.
- **Start with reversible work.** Drafting, sorting and preparing are recoverable. Sending, paying and deleting are not.
- **Decide what needs a human before you delegate, not after.** Anything that touches money, contracts, customers or public posts deserves an explicit gate.
- **Check the first few runs properly.** The failure mode of an unattended agent is not a dramatic error, it is a small wrong assumption repeated a hundred times on a schedule.

None of this is unique to Grok Bot. It applies to every agent that can act on your behalf, and it will apply to the cheaper ones that follow.

## The skill this actually demands from you

Agentic tools quietly move the work rather than removing it. You stop writing the output and start doing three other things: **specifying** the job precisely enough that an unsupervised system cannot drift, **bounding** what it is allowed to touch, and **verifying** results you did not watch being produced.

Those are learnable, and they are the same skills whether the agent is Grok Bot, a Copilot agent or something that ships next quarter. Delegation was always a skill. It just used to only apply to people.

If you want to build it deliberately rather than by accident, our [AI agents path](/ai-agents-course) covers what agents are and when to trust them, and [what agentic AI actually means](/blog/what-is-agentic-ai) is the shorter read. To see where you stand first, the [AI rank quiz](/quiz) is ten questions and about two minutes.

## FAQ

**What is Grok Bot?**

Grok Bot is SpaceXAI's always-on AI agent product, launched in public beta on 11 August 2026. Each Bot runs on its own cloud computer, signs in to the tools you already use, keeps its own memory of your preferences, and completes multi-step jobs without supervision. Bots can also message each other and run learned routines on a schedule.

**How much does Grok Bot cost?**

It is not sold separately. Beta access is bundled into SuperGrok Heavy, Cursor Ultra and Cursor Teams Premium subscriptions. SuperGrok Heavy is $300 a month, the top of Grok's consumer ladder, so Grok Bot is currently gated behind a premium plan rather than available at normal subscription prices.

**How is Grok Bot different from ChatGPT or normal Grok?**

A chatbot gives you output and you operate the tools yourself. Grok Bot operates the tools. It works through software interfaces the way a person does rather than through prebuilt API integrations, which means it can reach systems that never shipped an AI connector, and it finishes the job instead of handing you a draft to execute.

**Why does a Cursor subscription unlock a Grok feature?**

Because they share an owner. SpaceX acquired xAI and rebranded as SpaceXAI in July 2026, then announced the acquisition of Anysphere, the company behind Cursor, in a deal reported at around $60 billion. Grok and Cursor now sit under the same parent, and their top tiers share entitlements.

**Is it safe to let an AI agent log in to my accounts?**

It carries real risk, because an agent using your session acts as you. Reduce it by giving the agent its own account with only the permissions the task needs, starting with reversible work like drafting and sorting rather than sending or paying, requiring a human gate on anything touching money or customers, and checking early runs closely, since the common failure is a small wrong assumption repeated on a schedule.

**Is xAI still called xAI?**

No. SpaceX acquired xAI and the company rebranded as SpaceXAI on 6 July 2026. Grok itself kept its name, so the chatbot, the mobile apps, the SuperGrok subscriptions and the developer API are all still branded Grok.

## Read next

- [What agentic AI actually means](https://tryiro.com/blog/what-is-agentic-ai)
- [What is Grok?](https://tryiro.com/blog/what-is-grok)
- [AI automation for beginners](https://tryiro.com/blog/ai-automation-for-beginners)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

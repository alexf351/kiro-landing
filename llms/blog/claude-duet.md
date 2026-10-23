---
title: "Claude Duet: what Anthropic's background agent does, and what to check first"
canonical_url: "https://tryiro.com/blog/claude-duet"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Claude Duet", "what is Claude Duet", "Claude Duet waitlist", "Claude Duet safety", "Anthropic proactive agent", "Claude Duet Pro and Max"]
date_published: "2026-10-23"
date_modified: "2026-10-23"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-agents"
---

# Claude Duet: what Anthropic's background agent does, and what to check first

> Claude Duet is a new Anthropic app, in research preview since 21 October 2026, where Claude watches your connected apps, briefs you each morning and works in the background, then asks before it sends, pays, signs or deletes. Access is a waitlist for US Pro and Max subscribers, and the trust questions are worth settling before you connect anything.

**Canonical:** https://tryiro.com/blog/claude-duet
**Published:** 2026-10-23
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Claude Duet is a separate Anthropic app, opened as a research preview on 21 October 2026, in which Claude works as a proactive agent across your connected apps instead of waiting for you to open a chat.
- Access is by waitlist, starting with Claude Pro and Max subscribers in the US. Team and Enterprise plans aren't included yet, and Duet shares your plan's usage limits, background checks included.
- It reads, drafts and prepares work on its own, but shows you the action and waits for approval before it sends a message, makes a payment, signs a document or deletes anything. Trading securities and moving money between accounts are off-limits even with approval.
- Anthropic says Duet never sees your passwords or sign-in tokens, and that its safeguards will still occasionally miss something. It's a research preview, not a finished product.
- Which apps you connect, which approvals you actually read, and how closely you check its early work decide much of the risk. Those are delegation skills, and they transfer to every agent.

## What is Claude Duet? The short answer

**Claude Duet is a separate Anthropic app, opened as a research preview on 21 October 2026, in which Claude works as a proactive agent: it watches the apps you connect, tells you what needs attention, does tasks in the background, and asks before it acts on your behalf.**

The difference from the Claude app you may already use is who moves first. In ordinary Claude you open a chat and ask. Duet comes to you, with a brief every morning and a message when something needs a decision.

Three things to know before the detail:

- **You probably can't use it yet.** It's a waitlist, starting with Pro and Max subscribers in the US.
- **It reads and drafts freely, but asks before it sends, pays, signs or deletes.** A few actions are blocked even if you say yes.
- **A good share of the risk is set by you**, through which apps you connect and how carefully you read what it asks you to approve.

**Where this comes from.** Every product detail below is taken from Anthropic's own pages: the [launch announcement](https://claude.com/resources/articles/claude-duet) (21 October), the [safety, privacy and security write-up](https://claude.com/resources/articles/claude-duet-safety-privacy-and-security) (23 October) and the [Claude Duet product page](https://claude.com/product/claude-duet). It's a research preview, and Anthropic describes access, limits and the approval rules as still changing. Last reviewed 23 October 2026.

## Who can get Claude Duet, and what does it cost?

Anthropic is letting people in from a waitlist, beginning with Claude Pro and Max subscribers in the US, and says it'll email you when Duet is ready for your account. Team and Enterprise plans aren't included yet.

There's no separate price. During the preview, Duet is included in Pro and Max and draws on the same usage limits as the rest of Claude. That last part is worth reading twice, because a background agent spends your allowance differently from a chat.

| Question | What Anthropic says |
| --- | --- |
| Who can join | US Pro and Max subscribers, by waitlist |
| Team or Enterprise | Not included yet |
| Usage | Shares your plan's limits. Background checks count, and big jobs like a financial model or a deck take more |
| Where you use it | A standalone iOS and Android app, plus claude.ai in a browser on a computer |
| Model | Built around Claude Opus 5.5 |



Duet lives in its own app, separate from the main Claude app, but it carries over your memory, skills and connected apps from your Claude account. If you haven't spent much time in Claude itself, [getting comfortable with the main app first](/blog/how-to-use-claude) is the sensible on-ramp, since that's the context Duet starts from.

The model underneath, Claude Opus 5.5, came out on 22 September. Our [tracker of 2026 model releases](/blog/new-ai-models-2026) has the wider timeline.

## What does a background agent actually do day to day?

An agent is an AI that takes steps towards a goal instead of only answering (our explainer on [what agentic AI means](/blog/what-is-agentic-ai) covers the idea). Duet points one at your working day.

Anthropic describes a rhythm with three parts:

- **A morning brief.** A short summary of the most important items across your connected apps.
- **Check-ins every few hours.** It looks through your connected accounts and messages you only when something needs you. Anthropic says it doesn't check nonstop because that would use up your plan's limits much faster. You can tell it what you want to hear about and how often.
- **Tasks you hand it.** You type or talk to it in one ongoing thread, and it works out which apps to use. It has its own virtual machine with a browser, so your laptop or phone doesn't need to stay on, and you get a notification when the job's done or needs your review.

The examples Anthropic gives are mostly the admin of running a small business: finding Gmail and Slack messages you've missed and helping you reply, checking QuickBooks or Stripe for unpaid invoices and drafting reminders, preparing payroll in Gusto, and drafting follow-ups from deal history in HubSpot. It reaches these through the more than 6,000 connectors and plugins in the Claude Marketplace. For how connectors plug AI into other software generally, see [what MCP is](/blog/what-is-mcp).

One tester story shows the appeal better than the feature list. A property broker says that one day, without being asked, Duet flagged a showing that was on her calendar for the wrong day.

Anthropic is just as plain about the gaps. Duet may misread a thread or misjudge what's urgent, and it can miss something that arrives between check-ins. Personal errands such as booking tickets aren't as strong as work tasks, and it can't yet show you its browser.

## How do Claude Duet's approvals and safeguards work?

Duet reads, drafts and prepares work on its own. Before it sends a message, makes a payment, signs a document or deletes anything, it shows you exactly what it's about to do, including the destination, the content and every recipient, then waits for your approval.

Around that step, Anthropic describes several layers:

- **A second check outside the model.** A separate automated check, built on the auto mode classifier from Claude Code, judges whether each action matches what you asked for. Because it runs outside the model doing the work, instructions hidden in a web page can't sway it.
- **Hard limits.** Trading securities, moving money between accounts and accessing someone else's account are off-limits even with your approval.
- **No "don't ask me again" for the risky steps.** Paying or sending money, deleting an order and creating an account always need a fresh yes, however often you've approved them before.
- **Purchases on a one-time card.** It pays with a single-use card from a wallet such as Link from Stripe, limited to that merchant and amount, so your real card number isn't shared.
- **A sensitive-information filter.** Sign-in credentials, full card and bank account numbers and government ID numbers are never shared, even if you ask. Health or financial details go out only with your consent, and your own request counts.
- **Credentials kept away from the model.** Anthropic says Duet never sees your passwords, browser cookies or sign-in tokens. You type passwords into a form inside the Claude app, and they travel encrypted to a separate browser machine.

One practical rule falls out of that last point. Duet's sign-in form only appears inside the app, during a sign-in you asked for. Anthropic says it never arrives as a link, a text, an email or on any site other than claude.ai, so anything else asking for your password in Duet's name isn't legitimate.

Anthropic is also open about what isn't solved. The safeguards "will occasionally miss something or flag a harmless message," and it's still tuning how often Duet asks, because too many requests teach people to tap through them.

## What to ask before you connect your apps

What makes delegating to an agent safe is the same whatever the product: a clear scope, a gate on risky steps, and someone checking the output. Anthropic has built the gate. The scope and the checking are still yours. Our guide to [how AI agents work](/blog/ai-agents-explained) goes deeper on all three. For Duet, ask these five:

- **What's already connected?** Apps you've connected to Claude carry over to Duet, and switching one off in either place switches it off in both. Review the list, then start with the one or two apps where help matters most.
- **What happens when I disconnect?** New access stops from that moment, but what Duet already learned stays until you reset its memory in the app's settings. Deleting your account wipes everything it has stored.
- **Whose information is in there?** Your inbox holds things other people sent you. Anthropic's own example is a weekly team recap that should never include private details like performance review conversations. If you're thinking of connecting work accounts from a personal Pro or Max plan, check what your employer allows first.
- **Which approvals will I really read?** The approval card is only a gate if you look at it. Save "don't ask me again" for steps you'd happily undo, and slow down on anything with a recipient list.
- **How will I check its judgment?** Each task has its own page in the task list, and you can steer it mid-task. For the first week or two, compare the morning brief against your actual inbox. You're looking for what it missed, not just what it got right.

That last habit matters most. An agent that's wrong in an obvious way gets caught quickly. One that quietly misjudges what's urgent, every few hours, is the failure to watch for.

## Should you join the Claude Duet waitlist?

If you're a US Pro or Max subscriber whose day is mostly email, calendar and admin spread across several apps, yes. Anthropic says it built Duet for professionals and small business owners with more on their plates than they can track, and it doesn't cost extra during the preview. Treat the first weeks as a trial of its judgment, not a handover.

If you're outside the US, on a Team or Enterprise plan, or mostly want help with personal errands, there's nothing to do yet.

Either way, the skill it asks of you isn't new. Background agents shift your work from doing the task to specifying it, fencing it in and checking the result, and those are the parts that take practice. We saw the same pattern with [SpaceXAI's Grok Bot](/blog/grok-bot), and it'll apply to whatever ships next.

If you'd like to build that habit on purpose, Iro's [AI agents path](/ai-agents-course) works through it in 5-minute lessons, with delegate-versus-do-it-yourself calls, a 0–100 trust-calibration dial and spot-the-hallucination drills, so judging an agent's output is second nature before you hand one your inbox. The [Claude path](/learn-claude) covers the prompting and checking habits that carry over.

## FAQ

**What is Claude Duet?**

Claude Duet is an Anthropic app, opened as a research preview on 21 October 2026, where Claude works as a proactive agent. It sends a morning brief, checks your connected apps every few hours, works on tasks in the background on its own cloud computer, and asks for approval before sending, paying, signing or deleting anything.

**Who can get Claude Duet?**

Access is by waitlist, starting with Claude Pro and Max subscribers in the US. Team and Enterprise plans are not included yet. Anthropic says it will email you when Duet is ready for your account. It runs as a standalone iOS and Android app, and on claude.ai in a computer browser.

**How much does Claude Duet cost?**

There is no separate charge during the research preview. Duet is included in Claude Pro and Max and shares your plan's usage limits with the rest of Claude. Its background checks count toward those limits, and larger jobs such as building a financial model or a deck use more.

**Is Claude Duet safe to connect to my email?**

Anthropic built in approval before sending, paying, signing or deleting, a separate check outside the model, and credential handling that keeps passwords away from it. It also says the safeguards will occasionally miss something. Connect only the apps you need, read every approval card, and check its early briefs against your inbox.

**What can't Claude Duet do?**

Even with your approval, it won't trade securities, move money between accounts or access someone else's account. Anthropic also says the preview may misread a thread or misjudge urgency, can miss something that arrives between check-ins, is weaker at personal errands like booking tickets, and can't yet show you its browser.

**How is Claude Duet different from the Claude app?**

The Claude app waits for you to open a chat. Duet comes to you: a morning brief, a message when something needs you, and tasks it works on while you're away. It lives in a separate app but uses your Claude account's memory, skills and connected apps.

## Read next

- [What agentic AI actually means](https://tryiro.com/blog/what-is-agentic-ai)
- [AI agents, explained without the jargon](https://tryiro.com/blog/ai-agents-explained)
- [Grok Bot: SpaceXAI's always-on agents](https://tryiro.com/blog/grok-bot)
- [Learn to work with AI agents](https://tryiro.com/ai-agents-course)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

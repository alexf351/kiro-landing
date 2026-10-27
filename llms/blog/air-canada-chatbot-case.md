---
title: "The Air Canada chatbot case: what happened, and how to stop a support bot inventing policy"
canonical_url: "https://tryiro.com/blog/air-canada-chatbot-case"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["Air Canada chatbot case", "Air Canada chatbot lawsuit", "Moffatt v. Air Canada", "who is liable for chatbot mistakes", "AI chatbot wrong refund policy"]
date_published: "2026-10-27"
date_modified: "2026-10-27"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-fluency"
---

# The Air Canada chatbot case: what happened, and how to stop a support bot inventing policy

> In February 2024, a British Columbia tribunal ordered Air Canada to pay a customer $812.02 after its website chatbot described a bereavement-fare rule that the airline's own policy page contradicted. The airline argued it couldn't be liable for the chatbot's words, and the tribunal called that "a remarkable submission."

**Canonical:** https://tryiro.com/blog/air-canada-chatbot-case
**Published:** 2026-10-27
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- In Moffatt v. Air Canada (2024 BCCRT 149, decided 14 February 2024), British Columbia's Civil Resolution Tribunal ordered Air Canada to pay $812.02 after its website chatbot said a bereavement fare could be claimed within 90 days, even after travel.
- The airline's own "Bereavement travel" page said the policy doesn't apply to requests made after travel is completed, and the chatbot's reply linked to that very page.
- The tribunal rejected Air Canada's argument that it couldn't be liable for its chatbot: the bot is "still just a part of Air Canada's website," and the airline is responsible for all of it.
- The tribunal saw no reason customers should have to double-check one part of a website against another. If your bot or your agent states a policy, treat the statement as yours.
- For support teams, the fix is procedural: ground replies in the real policy text, quote refund and eligibility terms word for word, and route money, eligibility and exceptions to a human.

## What was the Air Canada chatbot case about?

**In Moffatt v. Air Canada, decided on 14 February 2024, British Columbia's Civil Resolution Tribunal held Air Canada responsible for a website chatbot that told a customer they could claim a bereavement fare after traveling, contrary to the airline's own policy page, and ordered it to pay $812.02.** The airline argued it couldn't be held liable for what the chatbot said. The tribunal disagreed, bluntly.

The amount was small. The principle isn't. What a company's bot tells a customer about policy is the company talking, and pointing out that the correct rule was on another page didn't get the airline off the hook.

For support teams, the question is how to stop an automated or AI-drafted reply from stating a policy you don't have. The case comes first, then the fix.

Facts and quotes come from the tribunal's published decision, [_Moffatt v. Air Canada_, 2024 BCCRT 149](https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do) (file SC-2023-005609), read on the Civil Resolution Tribunal's own decisions site. Amounts are in Canadian dollars. It's a small-claims decision from one province, decided on its own facts, and this post isn't legal advice. Last reviewed 27 October 2026.

## What did the Air Canada chatbot tell the customer?

On 11 November 2022, Jake Moffatt's grandmother died in Ontario. That day, Moffatt went to Air Canada's website to book a flight from Vancouver to Toronto at the airline's bereavement rates, and asked the site's support chatbot about them. The screenshot Moffatt filed as evidence shows the chatbot saying, in part:

> If you need to travel immediately or have already travelled and would like to submit your ticket for a reduced bereavement rate, kindly do so within 90 days of the date your ticket was issued by completing our Ticket Refund Application form.

The words "bereavement fares" in that reply were a link to Air Canada's "Bereavement travel" page. As the decision records it, that page said the policy doesn't apply to requests for bereavement consideration after travel has been completed. The bot's answer and the page it linked to disagreed on the one condition that mattered.

| Date | What happened |
| --- | --- |
| 11 Nov 2022 | Moffatt asks the chatbot, then books Vancouver to Toronto for the next day: $794.98. |
| 16 Nov 2022 | Books the return, Toronto to Vancouver on 18 November: $845.38. |
| 17 Nov 2022 | Submits a first bereavement-fare application, well inside the 90 days the chatbot gave. |
| 8 Feb 2023 | An Air Canada representative admits the chatbot had provided "misleading words." |
| 14 Feb 2024 | The tribunal mostly allows Moffatt's claim and orders Air Canada to pay $812.02. |



One detail matters for anyone running AI support: the decision doesn't say what technology sat behind the chatbot. Air Canada didn't provide any information about it, and the ruling didn't depend on it.

## Why the "chatbot is a separate entity" defense failed

The tribunal treated Moffatt's claim as negligent misrepresentation. In plain terms: a business that owes a customer a duty of care makes an inaccurate statement without reasonable care, the customer reasonably relies on it, and loses money as a result. It found every element made out, and that Air Canada "did not take reasonable care to ensure its chatbot was accurate."

The airline's main argument was that it couldn't be held liable for information provided by its agents, servants or representatives, including a chatbot. It didn't explain why. The decision says that in effect, Air Canada was suggesting the chatbot is a separate legal entity responsible for its own actions, and calls it "a remarkable submission."

The reasoning that follows is short enough to remember:

- **A chatbot is part of the website.** It "is still just a part of Air Canada's website," and the airline is responsible for all the information on it. "It makes no difference whether the information comes from a static page or a chatbot."
- **Being right elsewhere isn't a defense.** Air Canada said the correct rule was on another page. The tribunal said the airline hadn't explained why that page was "inherently more trustworthy" than its chatbot, or why customers should have to double-check one part of its website against another.
- **Trusting the bot was reasonable.** There was no reason a customer should know that one section of the site was accurate and another wasn't.

Air Canada also relied on terms in its tariff but didn't file the relevant part, so that defense wasn't proven. The award was $650.88 in damages, the gap between the $1,630.36 Moffatt paid and the $979.48 the tribunal calculated at a $380 bereavement fare plus charges and tax. Add $36.14 in pre-judgment interest and $125 in tribunal fees and you get $812.02.

## Who is liable for chatbot mistakes? What this means for support teams

On this decision's reasoning, the business is. The tribunal didn't ask how the chatbot worked or who wrote its answers. What mattered was whose website the customer was on, and whether relying on it was reasonable.

The case is about a website chatbot, but our reading is that the logic reaches an agent who pastes an AI draft into a ticket and clicks send: the customer can't see which words a model wrote. It's the same pattern as the [lawyers sanctioned for AI-invented case citations](/blog/ai-fake-case-citations): in both, the tool wasn't the one held responsible.

Generative AI makes this failure easy to produce. A language model writes the most plausible next words, and refund windows, deadlines and exceptions look alike from company to company. Without your policy in front of it, a model will write a fluent, specific rule that belongs to nobody. Our guide to [spotting AI hallucinations](/blog/spot-ai-hallucinations) covers the tells.

Two details from the case are worth pinning up. The wrong answer linked to the right page, and that didn't help. And the whole dispute came from one condition in one sentence: whether you could claim after you'd flown.

## How to stop an AI support reply from inventing policy

None of this means switching AI off. It means deciding which parts of a reply a model may write and which it may only copy. Six rules cover most of it:

- **Answer from the policy, not from memory.** Paste the relevant policy text into the prompt, or use a tool that pulls it from your help center before it answers (that's [retrieval-augmented generation](/blog/what-is-rag)). Tell the model to use only that text. If you're pasting tickets into a general chatbot, read our piece on [client data in ChatGPT](/blog/client-data-in-chatgpt) first.
- **Quote refund, eligibility and deadline terms instead of paraphrasing them.** Rewording is where conditions quietly change. A quoted clause can still be misapplied, but it can't misstate the rule.
- **Make silence the safe default.** If the source doesn't answer the question, the model should say so and mark the gap, for example `[CHECK: refund after travel?]`, rather than fill it. Our [AI for customer support](/ai-for-customer-support) guide walks through a refund request built around that rule, with a prompt you can adapt.
- **Route money, eligibility and exceptions to a person.** A bot can explain the process and collect details. A human decides whether this customer gets this money.
- **Keep one source of truth.** If the bot draws on a different or older document than the published policy page, you're running two policies and answerable for both. After each policy change, re-ask the bot your top policy questions and compare its answers with the page.
- **Treat a quoted bot answer as an escalation.** Moffatt emailed the airline a screenshot of the chatbot's reply. When a customer cites what your bot told them, send it to someone who can fix both the case and the bot.

## A review checklist and escalation triggers

Run this on any AI-drafted reply that mentions policy, before it goes out:

- Every policy statement traces to a current, named source you can point to.
- Refund, eligibility and deadline wording is quoted from that source, not reworded.
- Numbers match the source exactly: amounts, days, dates and percentages.
- Conditions survived the draft. Qualifiers like "before travel," "unused" or "within 30 days of purchase" are easy for a smooth rewrite to lose.
- Nothing promises an outcome the sender can't authorize, such as "you qualify" or "we'll refund you."
- If the reply links to a policy page, it says what the page says.
- Each `[CHECK]` marker is resolved, or the ticket has been escalated.

These triggers should hand a conversation to a human, whether a bot or an agent is drafting:

| Trigger | Sounds like | What AI may do |
| --- | --- | --- |
| Money | "Can I get a refund for the return leg?" | Acknowledge and collect details; a person confirms any amount. |
| Eligibility and deadlines | "Do I still qualify if I've already flown?" | Quote the clause; a person applies it to the case. |
| Exceptions and hardship | Bereavement, illness, "special circumstances" | Reply with care and hand off straight away. |
| Retroactive requests | "Can you apply the discount after I've paid?" | Hand off. A retroactive claim is what Moffatt was about. |
| Gaps or conflicts | The source is silent, or two pages disagree | Mark it, escalate, and flag the document for a fix. |
| Quoting the bot | "Your chat assistant told me..." | Escalate with the transcript attached. |



## How to get better at catching invented policy

A checklist catches the errors you look for. Noticing that a smooth, confident answer has no source behind it is a reflex, and reflexes come from repetition.

Iro AI trains that habit in about five minutes a day. Spot-the-hallucination exercises put a confident wrong answer in front of you, a 0 to 100 trust-calibration dial asks how far you'd actually rely on an output, and guardrail-writing drills practice telling a model what it must not do. The [AI for customer support](/ai-for-customer-support) page covers the support side: brand-voice replies, ticket summaries, triage and the never-invent-policy rule. On Pro, you can also generate a Custom Path from a link to your own public help-center page, so you practice on your actual rules.

## FAQ

**What happened in the Air Canada chatbot case?**

In November 2022, Air Canada's website chatbot told Jake Moffatt they could claim a bereavement fare within 90 days of the ticket's issue, even after travel. The airline's policy page said otherwise, and Air Canada wouldn't accept a retroactive claim. On 14 February 2024, British Columbia's Civil Resolution Tribunal found negligent misrepresentation and ordered Air Canada to pay $812.02.

**Who is liable for chatbot mistakes?**

In Moffatt v. Air Canada, the business was. The tribunal rejected the argument that the airline couldn't be liable for its chatbot, saying the bot was part of Air Canada's website and the airline was responsible for all the information on it. It's a small-claims decision from one Canadian province, so check local law. This isn't legal advice.

**How much did Air Canada have to pay for its chatbot's mistake?**

$812.02 in Canadian dollars: $650.88 in damages, $36.14 in pre-judgment interest and $125 in tribunal fees. The damages were the difference between the $1,630.36 Moffatt paid for two flights and what the tribunal calculated they would have paid at the bereavement fare. A $200 coupon the airline offered wasn't deducted, because there was no evidence Moffatt accepted it.

**Was the Air Canada chatbot case a lawsuit?**

Not in a court. It was a small-claims dispute decided in writing by British Columbia's Civil Resolution Tribunal, cited as Moffatt v. Air Canada, 2024 BCCRT 149. Moffatt represented themselves and Air Canada was represented by an employee. Once filed, a tribunal order has the same force as an order of the Provincial Court of British Columbia.

**Did Air Canada's chatbot use generative AI?**

The decision doesn't say. The tribunal noted that Air Canada didn't provide any information about the nature of its chatbot, and the outcome didn't depend on it: the decision says it makes no difference whether information comes from a static page or a chatbot.

**How do you stop an AI chatbot from giving the wrong refund policy?**

Ground every answer in your actual policy text, pasted in or retrieved from your help center, and tell the model to use only that. Quote refund and eligibility terms instead of paraphrasing them. Have it flag gaps rather than fill them, and route money, eligibility and exceptions to a human before anything is promised.

## Read next

- [AI for customer support, without invented policy](https://tryiro.com/ai-for-customer-support)
- [AI fake case citations: what happened to the lawyers](https://tryiro.com/blog/ai-fake-case-citations)
- [How to spot AI hallucinations in 5 seconds](https://tryiro.com/blog/spot-ai-hallucinations)
- [What is RAG, explained simply](https://tryiro.com/blog/what-is-rag)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

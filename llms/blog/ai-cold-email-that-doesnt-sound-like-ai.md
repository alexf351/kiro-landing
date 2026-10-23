---
title: "How to write an AI cold email that doesn't sound like AI"
canonical_url: "https://tryiro.com/blog/ai-cold-email-that-doesnt-sound-like-ai"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["AI cold email that doesn't sound like AI", "how to write cold emails with ChatGPT", "AI outreach that gets replies", "ChatGPT cold email prompt", "AI sales email", "AI recruiter outreach"]
date_published: "2026-10-23"
date_modified: "2026-10-23"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "prompt-engineering"
---

# How to write an AI cold email that doesn't sound like AI

> AI cold emails read as AI because the model fills every gap in your prompt with the most average email it knows. Give it real research and one real reason, ban its favorite phrases and write the first line yourself, and the draft starts to read like someone who did their homework.

**Canonical:** https://tryiro.com/blog/ai-cold-email-that-doesnt-sound-like-ai
**Published:** 2026-10-23
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- AI cold emails sound like AI for five reasons: generic flattery, the same predictable shape, filler phrases, personalization that only repeats a name and a job title, and a misleading subject line.
- The fix starts before the prompt. Give the model research you've read yourself and one specific reason you're writing to this person, not to this kind of person.
- Constrain the output: one reason, one small ask, a word limit and a list of banned phrases. Without constraints a model falls back on its defaults.
- Write the first line yourself. It's the sentence that proves you looked, and it's the one AI is worst at faking.
- If you can't find a real reason to email someone, AI can't invent one. Skip that person until you have one.

## Why do AI cold emails sound like AI?

**AI cold emails sound like AI because the model fills every gap in your prompt with the most common cold email it knows, so the fix is to leave fewer gaps: real research, one specific reason, a short ask, banned phrases and a first line you write yourself.**

Ask ChatGPT for "a personalized cold email to a VP of Operations" and it has almost nothing to work with. It doesn't know the person, what they care about this month, or why you, of all people, are writing. So it writes the average of every cold email it has seen. That average is the email your prospect already gets, and already deletes.

The model isn't the problem. The input is. This post is for sales reps, recruiters and consultants who want the speed of AI drafting without sending something that reads like a template.

## The five tells of an AI-written cold email

Here's a typical first draft from a one-line prompt:

> Subject: Quick questionHi Dana, I hope this email finds you well! I came across your impressive profile and was truly inspired by your work leading operations at [Company]. In today's fast-paced logistics landscape, staying ahead of staffing challenges is more important than ever.That's why I wanted to reach out. Our platform helps operations leaders like you streamline scheduling, boost efficiency and empower your teams. Would you be open to a quick 15-minute call next week to explore how we could help [Company] achieve its goals?

Nothing in it is false, and nothing in it is about Dana. The tells:

- **Generic flattery.** "Impressive profile" praises nothing in particular, which proves the sender didn't look.
- **The same shape.** Compliment, a pain the sender guessed, the product, a 15-minute call. It's the default you get when the prompt asks for nothing else, and the reader has seen it all week.
- **Filler phrases.** "I hope this finds you well", "in today's fast-paced landscape", "I wanted to reach out", "streamline", "empower". Each one is harmless. Together they sound like nobody in particular.
- **Fake personalization.** A name, a title and a company dropped into a template. "I see you lead operations" isn't research; it's a mail merge with better grammar.
- **A misleading subject line.** "Quick question" on a sales pitch, or a fake "Re:" on a first email. If you sell to US businesses, the fake "Re:" also sits badly with the [FTC's CAN-SPAM guidance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), which says the subject line must accurately reflect the content of the message and makes no exception for business-to-business email.

## How to write cold emails with ChatGPT that don't sound like AI

- **Research first, from sources you've read.** Their post, a job listing, a talk, a product launch. Paste the actual text into the prompt. Don't ask the model to research someone from memory: it will produce plausible details that may not be true.
- **Write the reason in one sentence.** Why this person, and why now. If you can't write that sentence, the model can't either, and the email isn't ready.
- **Make the ask small.** A yes-or-no question, or an offer to send something useful. "A quick 15-minute call to explore" asks a stranger for their calendar.
- **Constrain the output.** A word limit, one reason, one ask, no compliments, no exclamation marks, and a list of banned phrases. Constraints are what move a model off its defaults, which is the core of most [prompt patterns that work](/blog/prompt-engineering-patterns).
- **Write the first line yourself.** It's where the proof that you looked lives. Hand it to the model word for word and let it write the rest.
- **Ask for two versions with different structures,** pick one, and edit it. The edit is where your voice comes back.

## A cold email prompt, before and after

The prompt behind the email above was something like this:

> Write a personalized cold email to a VP of Operations at a logistics company about our scheduling software. Make it engaging and get them to book a call.

Here's the version that applies all six steps:

> Help me write a first-touch email. I sell shift-scheduling software for warehouses. Research, all of which I've read myself: Dana, VP of Operations at [Company], posted on LinkedIn this month that they've had 11 night-shift lead roles open since August, that agencies fill the gaps, and that handovers between agency and permanent staff are "a mess". Their careers page lists three open night-shift supervisor roles today. Why I'm writing to her: most of our customers use us to fix exactly that handover. My first line, keep it word for word: "Saw your post about the 11 night-shift lead roles you've had open since August, and the handover mess that comes with agency cover." Rules: under 90 words after my first line. One reason, one ask, and the ask is a yes-or-no question, not a meeting request. Don't claim results I haven't given you. No compliments, no exclamation marks, and none of these: "I hope this finds you well", "I came across", "reach out", "quick call", "streamline", "empower", "in today's", "touch base". Write it the way you'd write to a colleague. Give me two versions with different structures.

And one of the drafts it produced, lightly edited:

> Subject: night-shift handoversHi Dana,Saw your post about the 11 night-shift lead roles you've had open since August, and the handover mess that comes with agency cover.Handover is the part we work on. Our scheduling tool gives agency and permanent staff the same shift notes and task list, so the incoming lead isn't starting from a phone call.Would a one-page example of how another warehouse runs its night handover be useful? If not, no need to reply.

It isn't cleverer than the first email. It's narrower: one fact Dana wrote herself, one thing you do about it, one easy question. Our [AI for sales](/ai-for-sales) page takes the same approach through prospect research, discovery prep and follow-ups.

## AI outreach for recruiters and consultants

The method doesn't change by job. The reason does.

**Recruiters.** The reason is something the candidate actually built, wrote or said, matched to a real detail of the role. "Your background looks like a great fit" is the recruiting version of "impressive profile".

> Hi Sam, your talk on cutting flaky tests in a large monorepo is why I'm writing. I'm hiring a staff engineer for a 40-person payments team whose CI runs take 50 minutes, and fixing that is the first project. Remote, European time zones, and I can share the salary range up front. Worth sending you the one-page brief?

Don't let the model fill in role details you haven't given it, and keep candidate data out of tools your company hasn't approved. Our [AI for recruiters](/ai-for-recruiters) page covers sourcing and fair screening as well as outreach.

**Consultants.** The reason is a public trigger plus a specific observation: a remark on an earnings call, a regulation about to land, an expansion running behind. Offer something small and useful instead of a capabilities deck.

> Hi Priya, on your Q3 call you said the new distribution center is running well below planned throughput. Ramp-ups like that are most of our work, and I've written a one-page note on the three causes we see most often. Want me to send it?

That last line only works if the note exists. [AI for consultants](/ai-for-consultants) covers using AI for the research and synthesis behind a note like that.

## A checklist before you hit send

- One fact you read yourself, in the first line
- One reason for writing to this person, in one sentence
- One ask, answerable in a word
- Short enough to read in one glance on a phone
- None of your banned phrases, no compliments, no exclamation marks
- No claim about results you can't back up
- An honest subject line: no fake "Re:" or "Following up" on a first email
- Read aloud, it sounds like something you'd say to them in person

If you can't tick the first two, AI can't fix the email. Wait until you have a reason, or skip that person.

## How to get better at AI outreach

Most of this is prompting: giving the model real input and clear constraints instead of a one-line wish. If your drafts keep coming back generic, [why your AI prompts aren't working](/blog/why-your-ai-prompts-arent-working) diagnoses the usual causes, and [how to write a good AI prompt](/blog/how-to-write-a-prompt) covers the structure.

Reading about it only gets you so far; practice with feedback is faster. Iro's lessons take about five minutes, with instant feedback, and there's a path on AI for email. On Pro, Prompt Lab scores a prompt you write on clarity, specificity, constraints and context, which is most of the difference between the two prompts above. Compression drills cover the other half of the job: saying it in fewer words.

## FAQ

**How do I make ChatGPT cold emails not sound like AI?**

Give it research you've read yourself, one specific reason you're writing to this person, a word limit, a small ask and a list of banned phrases. Write the first line yourself, ask for two versions with different structures, then edit the one you pick. Most AI-sounding emails come from prompts that leave the model to guess.

**What phrases make an email sound AI-written?**

Common tells include "I hope this email finds you well", "I came across your profile", "in today's fast-paced landscape", "I wanted to reach out", "streamline" and a closing request for a quick 15-minute call. None is wrong on its own. Several together, wrapped around generic flattery, are what make an email read as a template.

**Can AI personalize cold emails at scale?**

Only if each email still contains something true and specific about that person, which usually means real research per prospect. AI drafts quickly once you have that input. Personalization that is just a name, a job title and a compliment is exactly what reads as automated, however many you send.

**How long should a cold email be?**

Short enough to read in one glance on a phone. That usually means one specific fact, one reason for writing and one easy question. There's no magic word count, but every sentence should earn its place, because a long first email asks a stranger for more attention than they owe you.

**Can recruiters use ChatGPT for candidate outreach?**

Yes, with the same method: a specific reason drawn from the candidate's real work, the actual role details and a short ask. Don't let AI invent details about the candidate or the role, and keep personal data you've collected out of tools your company hasn't approved.

**Is it legal to send AI-written cold emails?**

Using AI doesn't change the rules. In the US, the FTC's CAN-SPAM guidance covers commercial email, including business-to-business email, and requires accurate headers and subject lines, a valid physical postal address and a working opt-out. Other countries have their own rules, so check what applies where you send.

## Read next

- [Why your AI prompts aren't working](https://tryiro.com/blog/why-your-ai-prompts-arent-working)
- [The 7 prompt patterns that work everywhere](https://tryiro.com/blog/prompt-engineering-patterns)
- [How to write a good AI prompt](https://tryiro.com/blog/how-to-write-a-prompt)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

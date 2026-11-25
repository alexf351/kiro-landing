---
title: "Using AI at work and school: guides by task"
canonical_url: "https://tryiro.com/blog/ai-at-work"
site: "Iro AI"
site_url: "https://tryiro.com"
language: en-US
last_updated: "2026-11-25"
keywords: ["using AI at work", "how to use AI at work safely", "AI at work and school", "AI confidential data", "AI fake citations", "AI review checklist", "AI for teachers", "AI for studying"]
author: "Iro AI"
license: "© 2026 Iro AI"
type: "content-pillar"
---

# Using AI at work and school: guides by task

> Guides for using AI on the work you actually do, from summaries and SQL to reviews and lesson plans, without leaking data, filing fake citations or letting a chatbot invent policy.

**Canonical:** https://tryiro.com/blog/ai-at-work
**Last updated:** 2026-11-25

Most AI mistakes at work aren't about the model. They come from a skipped step: a client file pasted into a personal account, a citation nobody opened, a refund rule a chatbot made up, a query that ran cleanly and answered the wrong question.

This hub collects our practical guides for professionals, teachers and students. Start with the guide below, which covers the first tasks worth handing over, the safety rules, and a checklist to run before anything AI-made leaves your hands. Then go deeper by task or by job.

## Pick your first tasks: high value, low risk

Don't start by automating your job. Start with one task you do every week, where a draft saves real time and a mistake is easy to spot. Our guide to [how to use AI at work](/blog/how-to-use-ai-at-work) names the safe starting set:

- **Drafting.** Emails, outlines and first versions of documents.
- **Summarizing.** Long threads, reports and meeting notes. Ask for a shape, not a paragraph: "five bullets, then the three key decisions and anything I need to act on." [How to use AI to summarize a document](/blog/how-to-use-ai-to-summarize-a-document) covers long PDFs and the follow-up most people skip: "What did you leave out?"
- **Brainstorming.** Options, names and counterarguments to react to.
- **First-pass research.** Getting oriented, then checking the sources.
- **Reformatting.** Messy notes into a table, an agenda or a checklist.

The same rule holds in any business. [AI for small business](/blog/ai-for-small-business) suggests picking the one repetitive task you dread and handing AI the first draft, with a person approving anything that touches a real customer or a real dollar. [AI for real estate](/blog/ai-for-real-estate) applies it to listings and lead replies, with two extra checks: verify every property detail, since AI can invent square footage, and read public copy against fair-housing rules.

Hold AI back from final, high-stakes decisions until you've checked its work. Copilot or Gemini inside your office suite follows the same rules. For more ready-made workflows, see [AI productivity](/ai-productivity) and [AI for meetings](/ai-for-meetings).

## Feed it your evidence, not a blank page

Most bad AI writing at work starts from a one-line request with no facts in it, so the model fills the gap with confident filler. The fix is to give it your evidence and forbid it from adding any.

[AI for performance reviews](/blog/ai-for-performance-reviews) shows this best. Paste your notes, metrics and examples, tell the model to use only that evidence, and have it write [NEED EVIDENCE] wherever a section has none. Then run an audit prompt that doesn't rewrite your draft but quotes every claim your notes don't support and every vague or personality-based phrase.

Job applications work the same way. [How to use AI to write a resume](/blog/how-to-use-ai-to-write-a-resume) treats the model as an editor, not an author: give it your real experience and the job description, and never accept an invented job, title, date or number. [How to use AI to write a cover letter](/blog/how-to-use-ai-to-write-a-cover-letter) adds the inputs that matter: the full job description, two or three real achievements with specifics, a tone and a length, then a ruthless edit. The [AI job hunting](/ai-job-hunting) path turns that into practice.

## What never goes into a chatbot

Two questions decide whether you can paste something in, and most advice only answers the first. What does the vendor do with what you type? And are you allowed to share this information with a third party at all? [Is it safe to put client data in ChatGPT?](/blog/client-data-in-chatgpt) takes both apart.

Personal ChatGPT plans can use your conversations for training by default, with an opt-out under Data controls, while business, enterprise and education workspaces aren't trained on by default. A business plan keeps chats out of training, not out of sight of your own admins. Whether you may share client data at all is for your professional rules, client agreements and firm policy to decide.

Some things stay out of a prompt unless your firm has approved the tool for exactly that use: passwords and account numbers, government ID numbers, health details, anything under an NDA, and names attached to performance, pay or disciplinary matters. When you do need help with real work, strip the client out first:

- Swap names for roles (Client A, Employee 2).
- Remove direct identifiers: addresses, emails, account and case numbers.
- Blur indirect ones. A rare job title plus a small town can identify someone.
- Ask for the method, not an answer about the record. Paste column headings, not the payroll file.

Placeholders reduce risk; they don't make data anonymous if it can be linked back. Role guides such as [AI for HR](/ai-for-hr), [AI for accountants](/ai-for-accountants) and [AI for lawyers](/ai-for-lawyers) are written around this habit.

## Citations and policy: the two failures everyone remembers

In [Mata v. Avianca](/blog/ai-fake-case-citations), lawyers filed a brief relying on six court decisions ChatGPT had invented, and they were fined $5,000. When one lawyer asked the chatbot whether a case was real, it said the case "does indeed exist." Later cases went further, up to disqualification and referral to a state bar, and co-signers who never touched the tool were fined too. The fix is procedural: treat every AI citation as a lead, pull the full opinion from an authoritative database, confirm the quote and the proposition, and never use the chatbot to confirm itself.

In the [Air Canada chatbot case](/blog/air-canada-chatbot-case), a website chatbot told a grieving customer they could claim a bereavement fare after traveling. The airline's own policy page said otherwise. A British Columbia tribunal ordered Air Canada to pay $812.02 and rejected its argument that it couldn't be liable for its chatbot, which was "still just a part of Air Canada's website." For support teams, the lesson is to ground replies in the real policy text, quote refund and eligibility terms word for word, have the model mark gaps instead of filling them, and route money, eligibility and exceptions to a person. [AI for customer support](/ai-for-customer-support) builds a reply around that rule.

## Numbers and themes: check the work you can't see

[How to check AI-generated SQL](/blog/how-to-check-ai-generated-sql) makes the key point: AI-written SQL usually runs. The danger is that it runs cleanly and answers a slightly different question, because of a fan-out join, a filter in the wrong place, NULL handling or a date boundary. Give the model the dialect, the schema, the grain of the answer and a sample row, and ask it to list its assumptions. Then reconcile one total you already trust, check a small slice by hand and count rows at every join. [AI for data analysts](/ai-for-data-analysts) and [AI for Excel](/ai-for-excel) apply the same checks.

Qualitative work has its own version. [How to analyze customer feedback with AI](/blog/how-to-analyze-customer-feedback-with-ai) warns against asking for a summary of 400 survey answers. Instead, give every item an ID, have the model tag each one against a list of themes you've edited, with an exact quote, and count the tags yourself. Before a theme reaches the roadmap, re-read a random sample under it. Keep "what users said" and "what we should build" apart: one is evidence, the other is your judgment.

## Keep people decisions with people

AI can tighten a review's wording, but it has no idea what anyone did this year. The performance review guide draws the line: use AI to structure notes and flag vague or biased language, never to decide a rating, compare people or rank a team. It notes that the EU AI Act lists systems intended to monitor and evaluate workers' performance and behavior as high-risk. The same goes for hiring and discipline. [AI for managers](/ai-for-managers) and [AI for recruiters](/ai-for-recruiters) cover where the help stops.

That line also answers the bigger worry. [Will AI take your job?](/blog/will-ai-take-your-job) argues that AI mostly automates tasks, not whole roles, and that judgment, relationships, accountability and taste are the durable parts. The real risk is a colleague who uses AI well doing the same work faster.

## A review checklist before anything AI-made leaves your hands

Run this on any AI-assisted email, report, query, summary or review before someone else sees it:

- **Policy.** The tool is approved for this kind of data, and nothing confidential went in that shouldn't have.
- **Sources.** Every citation, quote and policy statement traces to a source you opened yourself.
- **Numbers.** Figures, dates, names and amounts match the original exactly. At least one total is reconciled against something you trust.
- **Conditions.** Qualifiers like "before travel" or "within 30 days" survived the rewrite.
- **Nothing added.** No achievement, statistic or promise appears that wasn't in your input.
- **Judgment.** Ratings, approvals and anything that commits money or a person were decided by you.
- **Voice.** Read it aloud. If you couldn't defend a sentence in a meeting, cut it.

The habit behind the list is simple: a confident answer isn't a checked one. That reflex is what Iro trains, in practice-first lessons of a few minutes a day on iPhone and the web, with spot-the-hallucination drills and prompt repair. The [AI for work](/ai-for-work) page shows the work skills it covers.

## At school: study honestly, teach the judgment

For students, the rule is that AI should make you think more, not less. [How to use AI for studying](/blog/how-to-use-ai-for-studying) lists the moves that help: explain a concept until it clicks, quiz yourself one question at a time, organize your notes, build a study plan and generate practice problems. If you couldn't reproduce it without the AI, you haven't learned it. Verify facts against your course material, and follow your school's rules. More at [AI for students](/ai-for-students).

For teachers, [AI for teachers](/blog/ai-for-teachers) starts from one test: delegate first drafts you can judge in seconds, like a quiz question or a reading at three levels, and keep anything you'd have to research to check. Describe the situation without naming the student, and keep identifying student details out of tools your school hasn't approved. AI detectors aren't reliable enough to accuse anyone: they produce false positives and flag non-native English writers at higher rates.

Teaching students to use AI is its own job. [How to teach AI literacy in high school](/blog/teach-ai-literacy-high-school) lays out a five-unit sequence with verification at its heart, activities that need no student accounts, and a four-line process log: what I asked, what it gave me, what I changed and why. [The best AI literacy resources for teachers](/blog/best-ai-literacy-resources-for-teachers) compares free curricula such as Code.org's How AI Works, Day of AI and Experience AI. Schools can also use the free [AI literacy classroom kit](/ai-literacy-classroom-kit) or visit our [educators page](/for-educators).

## Guides by role

Each job has its own best tasks and its own risks. Start with yours:

- **Business and finance:** [finance](/ai-for-finance), [accountants](/ai-for-accountants), [consultants](/ai-for-consultants), [founders](/ai-for-founders)
- **Customers and growth:** [sales](/ai-for-sales), [marketing](/ai-for-marketing), [customer support](/ai-for-customer-support)
- **Product and technical:** [product managers](/ai-for-product-managers), [developers](/ai-for-developers), [data analysts](/ai-for-data-analysts), [designers](/ai-for-designers)
- **People and regulated work:** [HR](/ai-for-hr), [lawyers](/ai-for-lawyers), [healthcare](/ai-for-healthcare)
- **Everyday output:** [writers](/ai-for-writers), [presentations](/ai-for-presentations), [research](/ai-for-research)

Once these habits are second nature, the next step is handing AI whole multi-step jobs. Our [AI agents hub](/blog/ai-agents) covers what that involves and what to check before you connect your accounts.

## Posts in this pillar

- [How to use AI for studying (without cheating yourself)](https://tryiro.com/blog/how-to-use-ai-for-studying) — How to use AI for studying the right way: the 5 best ways to study with ChatGPT or Claude, what to avoid so you actually learn, and copy-paste study prompts.
- [How to use AI at work (a practical guide for 2026)](https://tryiro.com/blog/how-to-use-ai-at-work) — Where to start with AI at work in 2026: the highest-value first tasks, how to verify output and protect company data, and how to build the habit.
- [Will AI take your job? An honest answer (and how to stay ahead)](https://tryiro.com/blog/will-ai-take-your-job) — AI changes most jobs more than it eliminates them. The real risk is being out-competed by people who use it well — and what to do about that, starting now.
- [AI for small business: practical ways to use it in 2026](https://tryiro.com/blog/ai-for-small-business) — Practical, no-code ways small businesses can use AI for marketing, customer service, admin and analysis, plus the best app to learn it in 5 minutes a day.
- [AI for teachers: practical, responsible ways to use it in 2026](https://tryiro.com/blog/ai-for-teachers) — Practical ways teachers can use AI for lesson planning, feedback and differentiation, with copy-paste prompts, the student-data rules, and how to teach AI use.
- [AI for real estate: practical ways agents can use it in 2026](https://tryiro.com/blog/ai-for-real-estate) — How real estate agents use AI in 2026: listing copy, lead follow-up, market summaries and admin, plus the fair-housing and client-data rules to follow.
- [How to use AI to write a resume (without sounding like a robot)](https://tryiro.com/blog/how-to-use-ai-to-write-a-resume) — How to use AI to write a resume in 2026: tailor it to a job, strengthen bullet points, and pass keyword filters — honestly, without fabricating anything.
- [How to use AI to summarize a document](https://tryiro.com/blog/how-to-use-ai-to-summarize-a-document) — How to use AI to summarize a document or PDF in 2026: the prompts that get a useful summary, which tools handle long files, and how to catch what AI leaves out.
- [How to use AI to write a cover letter](https://tryiro.com/blog/how-to-use-ai-to-write-a-cover-letter) — A step-by-step method for using AI to draft a cover letter tailored to the job, keep your own voice, and cut the generic AI tells that get it binned.
- [How to teach AI literacy to high school students](https://tryiro.com/blog/teach-ai-literacy-high-school) — A practical sequence for teaching AI literacy in high school: what to cover in what order, five classroom activities needing no software, and how to assess it.
- [AI fake case citations: what happened to the lawyers, and how to avoid it](https://tryiro.com/blog/ai-fake-case-citations) — Lawyers have been fined and disqualified for filing AI-invented cases. What happened in Mata v. Avianca and since, why AI fakes citations, and how to check.
- [Is it safe to put client data in ChatGPT? A guide for accountants, lawyers and HR](https://tryiro.com/blog/client-data-in-chatgpt) — Is it safe to put client data in ChatGPT? What each plan does with your chats as of October 2026, the settings that matter, and what never to paste.
- [How to check AI-generated SQL before you trust the numbers](https://tryiro.com/blog/how-to-check-ai-generated-sql) — AI-written SQL usually runs, and that's the trap. The 7 mistakes ChatGPT makes in SQL, a prompt that prevents many, and a 6-step check before you trust it.
- [How to use AI for performance reviews without letting it judge anyone](https://tryiro.com/blog/ai-for-performance-reviews) — How to use AI for performance reviews and self-evaluations: prompts that start from your own notes, what ChatGPT must never do, and privacy and bias checks.
- [The Air Canada chatbot case: what happened, and how to stop a support bot inventing policy](https://tryiro.com/blog/air-canada-chatbot-case) — A tribunal held Air Canada liable for its chatbot's wrong bereavement-fare advice. What happened, and how support teams stop AI replies inventing policy.
- [How to analyze customer feedback with AI and get themes you can trust](https://tryiro.com/blog/how-to-analyze-customer-feedback-with-ai) — How to analyze customer feedback with AI: anonymize it, build a codebook, demand counts and quotes with IDs, and spot-check each theme before the roadmap.
- [The best AI literacy apps and resources for teachers in 2026](https://tryiro.com/blog/best-ai-literacy-resources-for-teachers) — The best AI literacy apps and curricula for teachers in 2026: Code.org, Day of AI, Experience AI, Common Sense and Iro's kit, by grade, format and cost.

## FAQ

### What is the safest way to start using AI at work?

Start with one repetitive, low-risk task such as drafting an email, summarizing a long thread or reformatting notes. Use a tool your company has approved, check anything that matters before it goes out, and keep final decisions for yourself.

### What should I never paste into ChatGPT or another chatbot at work?

Passwords, account and ID numbers, health details, anything under an NDA, and names tied to performance, pay or disciplinary matters, unless your firm has approved that tool for exactly that use. When you need help with real work, swap names for roles and ask for the method rather than pasting the record.

### Why do AI tools make up citations and facts?

Language models generate plausible text rather than looking records up, so they can produce a perfectly formatted citation that refers to nothing. Asking the same chatbot to confirm it doesn't help. Open the original source yourself before you rely on it.

### Is a company responsible for what its chatbot tells customers?

In Moffatt v. Air Canada, a British Columbia tribunal held that it was, treating the chatbot as part of the airline's website. It's one small-claims decision, not legal advice, but the practical lesson is to ground support replies in your real policy text and send money and eligibility questions to a person.

### Can I use AI to write a performance review?

Yes, if your company allows it and the AI works only from your own notes and examples. Use it to structure and tighten your draft and to flag vague or biased language, but decide the rating yourself and keep confidential HR details out of unapproved tools.

### How do I check numbers or SQL that AI produced?

Reconcile one total against a figure you already trust, check a small slice by hand, and ask the model to list every assumption it made. A query that runs without errors can still be answering a different question.

### Is using AI for studying cheating?

Using AI to explain concepts, quiz you and plan your time is studying, not cheating. Submitting AI-written work as your own usually breaks school rules and skips the learning. If you can't reproduce the work without the AI, you haven't learned it yet.

### Can teachers rely on AI detectors to catch cheating?

No. Detectors produce false positives and have been found to flag writing by non-native English speakers at higher rates. Treat a score as a reason for a conversation, and make AI use visible with a short process log instead.

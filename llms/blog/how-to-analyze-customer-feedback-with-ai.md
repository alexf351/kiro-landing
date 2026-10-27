---
title: "How to analyze customer feedback with AI and get themes you can trust"
canonical_url: "https://tryiro.com/blog/how-to-analyze-customer-feedback-with-ai"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["how to analyze customer feedback with AI", "AI feedback analysis", "AI thematic analysis", "summarize user interviews with ChatGPT", "synthesize user research with AI"]
date_published: "2026-10-27"
date_modified: "2026-10-27"
reading_time_minutes: 8
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# How to analyze customer feedback with AI and get themes you can trust

> Pasting feedback into a chat and asking for a summary gets you themes you can't check. The method that holds up: tag every item by ID against a codebook you've edited, count the tags yourself, and read a sample under every theme before it reaches the roadmap.

**Canonical:** https://tryiro.com/blog/how-to-analyze-customer-feedback-with-ai
**Published:** 2026-10-27
**Reading time:** ~8 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- Don't ask an AI to summarize feedback. Ask it to tag every item, by ID, against a codebook you've reviewed, then count the tags yourself in a spreadsheet.
- Every theme needs a count and verbatim quotes with item IDs, so anyone can open the source and confirm the quote exists and says what the theme claims.
- Five failures cause most bad readouts: invented or merged quotes, themes ranked by vividness instead of frequency, small themes dropped, the model echoing your hypothesis, and silent truncation of long files.
- Before a theme reaches the roadmap, re-read about ten random items tagged with it. If more than two don't belong, fix the definition and re-tag.
- Keep "what users said" and "what we should build" in separate halves of the summary. The first is evidence; the second is your judgment.

## How do you analyze customer feedback with AI?

**Give every piece of feedback an ID, have the AI tag each item against a list of themes you've checked, count the tags yourself, and read a sample under every theme before anything reaches the roadmap.**

The shortcut most people try is pasting 400 survey answers into a chat and asking for a summary. Back come five confident themes. Some will be right, and you can't tell which, because nothing points to the feedback behind them.

So the goal isn't a summary. It's an audit trail: every theme with a count, every count built from tagged items, every quote traceable to an ID you can open. The same approach works for survey free text, support tickets, app reviews, interview notes and sales call notes.

Our [AI for product managers](/ai-for-product-managers) guide starts here too, because the PRD, the prioritization and the stakeholder update all inherit whatever the themes got wrong.

## How to clean and anonymize feedback before you upload it

Put everything in one spreadsheet, one row per item, with these columns:

- **ID:** a short unique code, such as `T-0412` for a ticket or `R-0088` for a review. Every quote gets traced through it.
- **Source:** survey, ticket, review, interview or sales call.
- **Date**, so you can compare periods later.
- **Segment:** plan, company size or platform, as a coarse label.
- **Text:** the feedback itself, untouched apart from redaction.

Then clean it. Remove auto-replies, agent signatures and duplicate copies of a thread. Break long interview notes into one row per distinct point, keeping the interview's ID with a suffix (`I-07a`, `I-07b`). When you count later, count interviews rather than rows, or one talkative customer starts to look like a trend.

Next, strip anything that identifies a person: names, emails, phone numbers, account and order numbers, and company names in B2B notes. Swap them for placeholders like `[CUSTOMER]` instead of deleting them, so sentences still read. Use only a tool your company has approved; our guide to [putting client data into ChatGPT](/blog/client-data-in-chatgpt) covers what to remove and why the plan matters.

Keep the source column honest, too. Every channel has a bias. Tickets come from people with a problem; sales notes pass through a rep's memory of a deal. If tickets dominate your file, the themes will lean toward what's broken. If your support team already tags tickets (see [AI for customer support](/ai-for-customer-support)), keep those tags as a column. They're a useful cross-check on the model's.

## Should you give the AI a codebook or let it find the themes?

Both, in that order: let the model propose, then fix the list yourself. A **codebook** is simply the list of themes with a definition for each.

**Pass one: propose.** Give the model a random sample of about 100 items and ask for 8 to 15 candidate themes, each with a one-line definition, what belongs, what doesn't, and two example IDs.

**Then edit it.** People skip this step, and it's where your product knowledge counts:

- Merge themes that describe the same problem in different words.
- Split vague buckets. "UX issues" or "performance" usually hides three separate problems.
- Name themes in the user's language ("can't find past invoices"), not your org chart's ("billing IA").
- Add `Other` and `Unclear`, so an odd item isn't forced into the nearest theme.
- Give praise its own themes. What users love tells you what not to break.

**Pass two: tag everything** against the edited codebook. An existing taxonomy, like last quarter's themes, is a fine starting point, as long as `Other` stays open. New problems show up there first.

One rule covers both passes: **don't tell the model what you expect to find.** Write "we think onboarding is the problem" in the prompt and you've made it easy for the model to agree with you. Test a hypothesis afterwards, as a separate question, against the tagged data.

## A prompt for AI thematic analysis you can copy

Use this for pass two. Paste your codebook where it says, then attach or paste the spreadsheet.

> You are helping me tag customer feedback. Each item has an ID, a source, a segment and text. Use only the codebook below. For every item, return one table row: ID | theme (up to two, from the codebook, or Other, or Unclear) | type (bug, friction, request or praise) | an exact quote from that item's text, copied character for character, no longer than 25 words. Rules: do not paraphrase inside a quote. Never combine words from two items into one quote. If no theme fits, use Other and give the reason in five words or fewer. Do not suggest features or solutions. After the table, tell me how many items you received and how many you tagged, and list any IDs you skipped. Codebook: [paste here]

Three lines carry most of the weight. The exact-quote rule, tied to an ID, makes every quote checkable with a single search. The ban on suggestions keeps evidence and opinion apart. The item count at the end catches the model quietly stopping early.

Notice what the prompt doesn't ask for: counts. A model that reads 600 comments and announces "37 mentions" is estimating, and you can't audit an estimate. Paste the tags into your spreadsheet and count them with a pivot table, or, if your tool can run code on an uploaded file, have it count in code and check one total by hand.

## Where AI feedback analysis goes wrong

Watch for these five. None of them comes with a warning.

| Failure | What it looks like | The check |
| --- | --- | --- |
| Invented or merged quotes | A quote cleaner than anything a customer wrote, or half of one ticket stitched to half of another | Search for every quote you'll show anyone, by ID. Not there word for word, not in the deck |
| Vividness over frequency | One long, furious ticket becomes a headline theme while forty one-line "it's slow" comments shrink to a footnote | Rank themes by your tag counts, never by the order of the model's prose |
| Lost minority signal | A small theme gets folded into a bigger one or dropped, even when it's all from your largest accounts or about accessibility | Ask for every theme however small, and split counts by segment |
| Agreeing with you | Your hypothesis, or the framing of your question, comes back as the top finding | Keep hypotheses out of the tagging prompt and test them afterwards against the counts |
| Truncation | The file is longer than the model can hold at once, so the end of it is never read and the answer doesn't say so | Compare the model's item count with your row count. If they differ, chunk |



Invented quotes are the most dangerous, because quotes are what persuade a room. They're a kind of [AI hallucination](/blog/spot-ai-hallucinations), and they look exactly like real ones. Truncation is the sneakiest. Every model has a limit on how much text it can work with at once, its [context window](/blog/what-is-a-context-window), and a long upload may not be read in full, with nothing in the reply to tell you.

## How to spot-check AI themes and handle large feedback sets

Run this on every theme before it goes into a summary.

- **Sample.** Pull 10 random items tagged with the theme, or all of them if there are fewer. Random matters, because the examples the model picks are its best ones.
- **Re-read.** Would you have tagged each item the same way? Mark yes or no.
- **Set a bar.** A reasonable one: if more than two in ten are wrong, the definition is the problem. Tighten it in the codebook and re-tag, rather than patching rows by hand.
- **Read the leftovers.** Go through everything in Other and Unclear. A cluster there is a theme your codebook is missing.
- **Verify quotes.** Search each quote you plan to use against its ID in the source file.

**For big sets, chunk.** Split the file into batches small enough that the model's item count matches yours every time: a few hundred short reviews, far fewer long interview excerpts. Tag each batch with the same codebook and the same prompt, then combine the tags in your spreadsheet. If later batches keep producing `Other` for the same reason, add a theme, bump the codebook version and re-run the earlier batches.

Avoid asking the model to summarize its own batch summaries. That's where IDs fall away and the vivid themes win again.

## How to turn feedback themes into a one-page roadmap summary

Split the page into two halves. The line between them matters more than the formatting.

**What users said.** Evidence only. For each of the top five or six themes: its name, the count and share of items (each interview counted once), the split by segment and source, any change from last period, and two verbatim quotes with their IDs. Add a line for small themes you're watching, plus a short method note covering sources, date range, item count and what you excluded.

**What we think it means.** Your interpretation, the options and the open questions, clearly labeled as yours. AI earns a place here again as a sparring partner: hand it the evidence half and ask for three different readings of the top theme, or for the strongest case against your preferred fix. The decision stays with you.

Getting good at this comes down to one reflex: checking where a neat quote or a confident count came from before you repeat it. Iro builds that reflex in lessons of about five minutes, where you do the work and get instant feedback. Spot-the-hallucination exercises are close practice for catching an invented quote, and a 0–100 trust-calibration dial makes you decide how far to trust an output before acting on it. The [AI for product managers](/ai-for-product-managers) page opens with feedback to themes, then covers drafting the PRD, competitor teardowns, prioritization and the stakeholder update.

## FAQ

**Can ChatGPT analyze customer feedback?**

Yes, if you set it up so the result can be checked. Give each item an ID, ask it to tag every item against a list of themes you've reviewed, with an exact quote per item, then count the tags yourself and re-read a random sample under each theme. A plain summary request gives themes you can't verify.

**How do I summarize user interviews with ChatGPT?**

Remove names and identifying details, split each interview's notes into one row per distinct point with an ID such as I-07a, and tag the rows against a shared codebook. Count interviews rather than rows, so one talkative customer doesn't look like a trend, and check every quote you use against the original notes.

**What is AI thematic analysis?**

Thematic analysis groups qualitative feedback into themes defined in a codebook. With AI, the model proposes candidate themes, you edit the codebook, the model tags each item, and you count and spot-check the tags. The AI speeds up the reading; the definitions and the final judgment stay with a person.

**How much feedback can AI analyze at once?**

It depends on the tool and how long each item is, because every model has a context window limit. Ask the model to report how many items it received and tagged, and compare that with your row count. If the numbers don't match, split the file into batches and tag each one with the same codebook.

**Is it safe to upload customer feedback to AI tools?**

Only to tools your company has approved, and only after removing personal details such as names, emails, phone numbers, account numbers and customer company names. Replace them with placeholders so the text still reads. Check your plan's data settings before uploading, even when the feedback looks harmless.

**Can AI tell me what to build from customer feedback?**

It can report what users said and suggest readings of it, but deciding what to build needs strategy, cost and context the model doesn't have. Keep the evidence and your recommendations in separate sections, and use AI to argue against your preferred option rather than to choose it.

## Read next

- [How to spot AI hallucinations in 5 seconds](https://tryiro.com/blog/spot-ai-hallucinations)
- [Is it safe to put client data in ChatGPT?](https://tryiro.com/blog/client-data-in-chatgpt)
- [What is a context window in AI?](https://tryiro.com/blog/what-is-a-context-window)
- [How to use AI to summarize a document](https://tryiro.com/blog/how-to-use-ai-to-summarize-a-document)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

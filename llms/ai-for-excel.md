---
title: "Learn AI for Excel in 5-Minute Lessons | Iro AI"
canonical_url: "https://tryiro.com/ai-for-excel"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["app to learn AI for Excel", "AI for Excel lessons", "AI for Excel", "ChatGPT for Excel", "AI Excel formulas", "AI for Google Sheets", "how to use AI in spreadsheets"]
audience: "Analysts, operators, students, small-business owners, anyone who lives in spreadsheets"
level: "Beginner to advanced"
date_published: "2026-07-09"
date_modified: "2026-11-25"
author: "Iro AI"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
---

# Use AI to actually get good at Excel.

> Stop fighting VLOOKUP. AI can write the formula, explain the error, and turn a wall of messy data into an answer, if you know how to ask. Iro teaches you the prompts and the checks so the numbers you hand up are actually right.

**Canonical page:** https://tryiro.com/ai-for-excel
**App Store:** https://apps.apple.com/app/id6759628066
**Last updated:** 2026-11-25

## In short

Yes. Iro is an app that teaches AI for Excel in six short lessons, about five minutes each, on iPhone and in any browser: formulas from plain English, cleaning messy data, asking questions of your data, charts, and using AI inside the spreadsheet with Copilot in Excel, Claude for Excel or Gemini in Sheets. The skill that matters most is checking: AI sometimes invents functions or off-by-one ranges, so you test a result on a few rows before trusting it on 10,000.

- 6 lessons, about 5 minutes each, on iPhone and the web. Free to start.
- Describe the goal and your columns, let AI write the formula, then test it on a few rows.
- Iro's Microsoft Copilot path adds a lesson on Excel for Microsoft 365 users.

## What you'll be able to do

- Turn a plain-English request into a working Excel or Sheets formula
- Debug #REF!, #VALUE!, and #N/A errors by asking the right way
- Clean and reshape messy data without doing it by hand
- Get AI to explain what an inherited spreadsheet actually does
- Sanity-check AI formulas so you never hand up wrong numbers

## The six lessons in Iro's Excel + AI path

1. **Formulas From Plain English** (5 min) — Describe the goal, your columns and one example row, and AI picks the right function, even one you wouldn't have reached for.
2. **Clean Messy Data** (5 min) — Show a few messy rows next to one row shaped the way you want, and AI infers the cleanup rules from the pair.
3. **Ask Questions of Your Data** (5 min) — Ask a specific question, like which region's revenue fell while volume grew, instead of "what insights do you see?"
4. **Charts and Takeaways** (5 min) — Have AI recommend a chart type and explain why, so you learn the pattern behind the choice.
5. **AI Inside the Spreadsheet** (5 min) — Use Copilot in Excel, Claude for Excel or Gemini in Sheets, which read the live workbook and put formulas in place.
6. **The Spreadsheet Workflow** (5 min) — Save your cleanup prompts, standing questions and checks so a recurring report gets faster every week.

## Why AI is so good at spreadsheets — and where it slips

Spreadsheet tasks are a sweet spot for AI: the goal is usually easy to describe in words, and the answer is a small, testable piece of code (a formula). Describe what you want and your columns, and a model like ChatGPT or Claude will hand you the formula, explain an error, or suggest a cleaner structure.

Where it slips is the details humans skip: it can invent a function that doesn't exist in your version, get a range off by one, or assume your data is cleaner than it is. None of that is a reason to avoid AI; it's a reason to test the formula on a few rows and read what it actually does before you trust it on the whole sheet.

## Excel or Google Sheets — the skill is the same

Almost everything here works in both Excel and Google Sheets; you just tell the model which one you're using so it picks the right function names. The transferable skill is the same: describe the goal, give real context (cell references, a sample row, your version), ask for an explanation, and verify. Learn it once and it works wherever your data lives.

## A worked example: messy CRM export to revenue by rep

Start by describing the sheet, not the problem. Say you've pulled 8,000 rows out of a CRM: column A is a Date that arrived as text, B is Rep, C is Amount with currency symbols stuck in it, D is Stage. You want revenue per rep per month for closed-won deals. Here's the loop that gets you there in about ten minutes.

### 1. Give the model the shape of your data

"Excel 365. Headers in row 1, data in A2:D8001. A = Date stored as text like '03/14/2026', B = Rep name, C = Amount stored as text like '$1,240.00', D = Stage." Those two lines remove most of the guessing, and they're the step almost everyone skips.

### 2. Fix the types before you do any math

Get helper-column formulas that turn C into a real number and A into a real date, plus a way to spot the rows where that conversion fails. Numbers stored as text are the most common reason a perfectly correct SUMIFS comes back as zero.

### 3. Ask for the formula and the reasoning

"Write a SUMIFS for G2 that totals the Amount helper column for the rep in $F2 where Stage is 'Closed Won' and the date falls in the month in G$1. Use mixed references so I can drag it across and down, and explain each argument." Now you have something you can extend, not just paste.

### 4. Check it against rows you already know

Filter to one rep for one month and add the amounts up yourself. Matching numbers mean you can drag the formula out across the grid. If they don't match, paste both back and ask what the formula is excluding; blank stages and trailing spaces turn up here almost every time.

## What wastes the most time when people use AI on a spreadsheet?

The biggest time sink isn't the model being wrong, it's asking it a question it was never going to answer well. Five habits account for most of the lost hours.

- **Asking it to do the arithmetic.** Pasting 400 rows and asking for the total invites drift. Ask for the formula instead and let the spreadsheet compute; the tool that's genuinely good at math should do the math.
- **Naming the tool but not the version.** XLOOKUP, LET, TEXTSPLIT and LAMBDA arrived with Microsoft 365 and aren't in Excel 2019 or 2016. "Excel 2019, no dynamic arrays" in your first line saves a round trip through a #NAME? error.
- **Accepting a formula you can't read.** If you can't explain the nesting to a colleague, you won't be able to fix it in three months. Get a LET version with named steps, or split it into two helper columns.
- **Describing the data as you wish it were.** Merged cells, trailing spaces, blank rows in the middle of a range, dates in two formats. Say what's actually there, or paste ten real rows and let the model see it.
- **Forcing a formula where a tool fits better.** Some jobs belong to a pivot table, to Power Query, or to QUERY in Sheets. Have the model pick the approach before it writes a single formula.

One more worth naming: don't ask for a whole model in a single prompt. Build it one column at a time and check each one as you go. You'll spend your debugging time on a formula you understand instead of a wall of nesting you inherited from a chatbot.

## Sample practice exercise

**Type:** Prompt practice

**Scenario:** You have a sheet with a Full Name column ("Ada Lovelace") and you need two new columns: First Name and Last Name. You ask AI for help.

**Task:** Choose the prompt that will get you a formula you can actually paste in and trust.

- "How do I split names in Excel?"
- **(correct)** "In Excel, column A has full names like 'Ada Lovelace' in A2 down. Write a formula for B2 that returns the first name and one for C2 that returns the last name, assuming a single space. Explain what each part does and how it handles a missing space."
- "Split my names please."
- "Give me the best Excel formula."

**Why:** The winning prompt names the **tool** (Excel), gives the **exact cell references and a data example** (A2, "Ada Lovelace"), states the **assumption** (single space), asks for an **explanation**, and asks how it handles an **edge case** (missing space). That's the difference between a formula you paste in blind and one you understand and trust. In Iro you'd write your own and get feedback on the details that matter: cell refs, assumptions, and edge cases.

## AI + spreadsheet questions

**Is there an app that teaches AI for Excel in short lessons?**

Yes. Iro has an Excel + AI path of six lessons, each about five minutes, on iPhone and in any web browser. It covers writing formulas from plain English, cleaning messy data, asking questions of your data, choosing charts and using AI inside the spreadsheet, and every lesson ends in a hands-on exercise with feedback. It's free to start.

**Can ChatGPT write Excel formulas?**

Yes, and it's one of its most reliable uses. Describe the result you want, give it your cell references and a sample of the data, and it will write the formula and explain it. Test it on a few rows before trusting the whole sheet.

**Does this work for Google Sheets too?**

Yes, the approach is identical. Just tell the model you're in Google Sheets so it uses the right function names (like ARRAYFORMULA or QUERY). Iro's lessons cover both.

**Is it safe to paste my company data into AI?**

Be careful with sensitive or personal data. Check your company's policy and the tool's data settings. You can often get the same help by pasting a small, anonymized sample instead of the full dataset. Iro covers this in its AI-at-work lessons.

**Why did the AI formula give the wrong answer?**

Usually a wrong range, a bad assumption about your data, or a function that behaves differently in your version. That's why the last lesson is about checking: test on a few known rows and read what the formula does. AI is a fast draft, not a final answer.

**Do I need to be good at Excel already?**

No. Beginners can get working formulas immediately, and you'll learn what they mean as you go. Iro starts simple and builds up to cleanup, analysis, and modeling.

**Can I upload an Excel file to ChatGPT?**

Yes, ChatGPT and Claude both accept .xlsx and .csv uploads, and both can run code on the file to summarize columns, find duplicates, chart a trend, or hand back a cleaned copy. What comes back is a new file rather than edits to your workbook, so formulas, macros and conditional formatting usually don't survive the trip. The upload is also a snapshot: it won't refresh when your source data changes. Check your company's policy before uploading anything confidential.

**Is Copilot in Excel better than ChatGPT for spreadsheets?**

They're good at different things. Copilot sits inside Excel and can see your open workbook, so it acts on your real data without you describing it, but it only comes with a paid Microsoft 365 plan that includes Copilot. ChatGPT or Claude in a browser needs context from you (version, cell references, a sample row) and tends to explain a formula in more depth. The prompting skill carries across both.

## Related paths

- [AI for work](https://tryiro.com/ai-for-work)
- [AI for finance](https://tryiro.com/ai-for-finance)
- [Learn ChatGPT](https://tryiro.com/learn-chatgpt)

## More AI tools to learn

- [Learn Midjourney](https://tryiro.com/learn-midjourney): Write prompts that give you the image you pictured, not a muddy guess.
- [Learn Microsoft Copilot](https://tryiro.com/learn-copilot): 16 short lessons on Copilot in Outlook, Teams, Word, Excel and PowerPoint.
- [Learn NotebookLM](https://tryiro.com/learn-notebooklm): Turn your own documents into a research assistant that cites its sources.
- [Learn Cursor](https://tryiro.com/learn-cursor): Get an AI editor to work on your codebase without wrecking it.
- [Learn Notion AI](https://tryiro.com/learn-notion-ai): Draft, summarize, extract action items, and ask questions across your workspace.
- [Learn Canva AI](https://tryiro.com/learn-canva-ai): Design on-brand graphics fast with Canva's Magic Studio AI tools.


## Read next

- [How to use AI at work](https://tryiro.com/blog/how-to-use-ai-at-work)
- [How to spot AI hallucinations](https://tryiro.com/blog/spot-ai-hallucinations)
- [Practice prompt engineering](https://tryiro.com/prompt-engineering-app)

---

Iro AI is a gamified app for building real AI skills, five minutes a day: 34 learning paths, 522 lessons, 3,000+ exercises, and active practice with instant feedback. Free to start on iOS; also runs in any browser at https://app.tryiro.com. Full reference: https://tryiro.com/llms-full.txt

---
title: "How to check AI-generated SQL before you trust the numbers"
canonical_url: "https://tryiro.com/blog/how-to-check-ai-generated-sql"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["how to check SQL from ChatGPT", "is ChatGPT SQL accurate", "AI SQL mistakes", "AI-generated SQL", "ChatGPT SQL prompt", "validate SQL query results"]
date_published: "2026-10-23"
date_modified: "2026-10-23"
reading_time_minutes: 8
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-tools"
---

# How to check AI-generated SQL before you trust the numbers

> SQL from ChatGPT almost always runs; the danger is that it runs and quietly answers a different question. Here are the seven mistakes behind most wrong numbers, a prompt that heads off many of them, and six checks to run before anyone sees the result.

**Canonical:** https://tryiro.com/blog/how-to-check-ai-generated-sql
**Published:** 2026-10-23
**Reading time:** ~8 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- AI-written SQL usually runs without errors. The common failure is a query that runs cleanly and answers a slightly different question from the one you asked.
- Seven mistakes cause most wrong numbers: the wrong join type, fan-out joins that duplicate rows, NULL handling, date and time-zone boundaries, a GROUP BY that changes the grain, dialect differences, and a filter in WHERE that belonged in ON.
- Give the model the dialect, the schema with column types and relationships, the grain of the answer, a sample row and your metric definition. Each one removes a guess.
- Before trusting a result, count rows at each join, reconcile a total you already know, run it on a slice you can check by hand, read the plan, read every join and test the edge cases.
- Even the top system on the BIRD text-to-SQL leaderboard scores 82.95% execution accuracy on its test set, against 92.96% listed for human data engineers and database students (October 2026). Review is part of the job.

## Is ChatGPT's SQL accurate?

**SQL from ChatGPT or any other assistant is usually valid and often wrong in small ways, so treat it as a draft and check it before the number goes anywhere.** The query that errors isn't the problem. The one that hurts runs cleanly, returns a plausible table, and answers a slightly different question from the one you asked.

It happens because the model can't see your data. It doesn't know that `status` can be NULL, that one order has many line items, or that your finance team's "September" is New York time. It fills each gap with the most common assumption, which is wrong for your database often enough to matter.

For scale: on [BIRD](https://bird-bench.github.io/), a public text-to-SQL benchmark built on 95 databases, the top system on the leaderboard scores **82.95%** execution accuracy on the test set. The maintainers list human performance, from data engineers and database students, at **92.96%**. Those systems are purpose-built and have the schema in hand. A chat assistant answering a one-line request has far less to go on.

Our [AI for data analysts](/ai-for-data-analysts) guide covers the wider workflow. This post is about the review step, where wrong numbers get caught or shipped.

## The 7 most common AI SQL mistakes

Most wrong numbers from AI-written SQL trace back to one of these. None of them throws an error.

| Mistake | What it does | The fix |
| --- | --- | --- |
| Wrong join type | An INNER JOIN drops customers with no orders, so "all customers" quietly becomes "customers who bought" | Decide which rows must survive; LEFT JOIN from the table that defines them |
| Fan-out join | Joining orders to line items repeats each order once per item, so `SUM(order_total)` is inflated | Aggregate the many side first, or sum at the item level |
| Filter in WHERE, not ON | A WHERE condition on the right-hand table of a LEFT JOIN removes the unmatched rows, turning it back into an inner join | Put conditions on the joined table in ON |
| NULL handling | `status <> 'cancelled'` also drops rows where status is NULL; `COUNT(col)` and `AVG` skip NULLs | Decide what NULL means, then write it: `OR status IS NULL` |
| Date and time-zone boundaries | `BETWEEN '2026-09-01' AND '2026-09-30'` on a timestamp stops at midnight on the 30th, and UTC days aren't your local days | Half-open ranges (`>=` start, `<` next start) in a named time zone |
| GROUP BY changes the grain | `AVG(order_total)` gives the average per order when you asked per customer; an extra GROUP BY column splits one row into many | State the grain: "one row per customer per month" |
| Dialect differences | In PostgreSQL and SQL Server, integer divided by integer truncates, so a refund rate comes back as 0. In MySQL, `\|\|` means OR unless PIPES_AS_CONCAT is on. SQL Server uses TOP, not LIMIT | Name the database and version in the prompt |



**The fan-out, in practice.** Ask for "revenue and item count per customer" and you'll often get this:

> `SELECT o.customer_id, SUM(o.order_total) AS revenue, COUNT(oi.order_item_id) AS items FROM orders o JOIN order_items oi ON oi.order_id = o.order_id GROUP BY o.customer_id;`

An order with three line items now appears three times, so its total is counted three times. The item count is right, which makes the revenue column look trustworthy. Collapse the many side to one row per order before you join:

> `WITH items AS (SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id) SELECT o.customer_id, SUM(o.order_total) AS revenue, SUM(i.item_count) AS items FROM orders o LEFT JOIN items i ON i.order_id = o.order_id GROUP BY o.customer_id;`

**WHERE versus ON.** "Paid orders per customer, including customers with none" often comes back with `LEFT JOIN orders o ON o.customer_id = c.customer_id WHERE o.status = 'paid'`. WHERE runs after the join, so it filters out every customer without a paid order, including the ones the LEFT JOIN kept with NULLs, and the zeros you asked for disappear. Move the condition into the join, `ON o.customer_id = c.customer_id AND o.status = 'paid'`, and they stay with a count of 0.

**NOT IN and NULLs.** `WHERE customer_id NOT IN (SELECT customer_id FROM refunds)` returns no rows at all if a single `refunds.customer_id` is NULL. That's standard SQL, documented in the [PostgreSQL manual](https://www.postgresql.org/docs/current/functions-subquery.html), not a bug. `NOT EXISTS` doesn't have the problem.

## How to prompt ChatGPT for SQL that's right more often

Every mistake above is a guess the model made because the prompt left a gap. Here's the request most people send:

> Write a SQL query showing revenue per customer last month.

That leaves the model to guess the dialect, the table names, what counts as revenue, which month, which time zone, and whether customers with nothing should appear. This version removes those guesses:

> Write a PostgreSQL 16 query. Tables: customers(customer_id BIGINT, name TEXT, created_at TIMESTAMPTZ); orders(order_id BIGINT, customer_id BIGINT, status TEXT, order_total NUMERIC(10,2), created_at TIMESTAMPTZ); order_items(order_item_id BIGINT, order_id BIGINT, product_id BIGINT, quantity INT). One customer has many orders; one order has many items. Sample order row: (88123, 1024, 'paid', 59.90, '2026-10-01 02:30:00+00'). status is NULL while an order is processing. Question: paid revenue per customer for September 2026, where September means America/New_York time. Grain: one row per customer, including customers with no paid orders, shown as 0. Use half-open date ranges, not BETWEEN. Don't join order_items unless the answer needs it. Before the SQL, state the grain of each CTE. After it, list every assumption you made and two checks I should run on the result.

Each line does a job. The dialect settles the date functions and the division rules. The types and relationships warn the model about fan-out. The NULL note and the zero-rows rule head off the WHERE-versus-ON trap. The sample row is deliberate too: 02:30 UTC on 1 October is still 30 September in New York, so a query that filters in UTC drops it.

The closing request for assumptions is the most useful part: it turns silent guesses into a list you can confirm or correct. Five real rows beat one, with anything sensitive removed or faked. [How to write a good AI prompt](/blog/how-to-write-a-prompt) covers the general structure. Which model you use matters less than this context, but if you're choosing one anyway, see [which AI model to use for coding](/blog/best-ai-model-for-coding).

## How to check SQL from ChatGPT: 6 steps

Run these before a result reaches a dashboard, a deck or a decision. It's ordinary code review, the same habit our [AI for developers](/ai-for-developers) page applies to application code.

- **Count rows at every join.** Run the query in pieces and compare `COUNT(*)` with `COUNT(DISTINCT order_id)`, or whatever your grain should be. If they differ where they should match, a join has fanned out.
- **Reconcile one total you already trust.** Last month's revenue from the finance report, yesterday's sign-ups from the product dashboard. If the total is off, stop. The breakdown can't be right when the sum isn't.
- **Run it on a slice you can check by hand.** Filter to one customer or one day, pull the raw rows, and do the arithmetic yourself. Ten rows you've verified beat a million you haven't.
- **Read the plan.** `EXPLAIN` shows how the database will run the query and how many rows it expects at each step. A join that's expected to produce far more rows than you have orders deserves a look. In PostgreSQL, `EXPLAIN ANALYZE` actually executes the statement, so the [documentation](https://www.postgresql.org/docs/current/sql-explain.html) suggests wrapping anything that writes data in `BEGIN` and `ROLLBACK`.
- **Read every join out loud.** For each one, say what a single row means before and after it. "One row per order" becoming "one row per order item" is the sentence that catches fan-out. Then check each join type against the population you want.
- **Push the edges.** Try a customer with no orders, an order with a NULL status, a timestamp at 23:59 on the last day of the range, and an empty month. Each should land where your definition says it should.

Asking a fresh chat to find the bugs is a useful second pass, not a substitute for these steps. Step 2 is the same move that catches [an AI hallucination](/blog/spot-ai-hallucinations): check a confident answer against something you already know.

SQL behavior checked against the PostgreSQL, MySQL and SQL Server documentation. BIRD figures as listed on its leaderboard in October 2026. Last reviewed 23 October 2026.

## A checklist before you trust AI-written SQL

- Dialect and version named in the prompt
- Schema pasted with column types and relationships
- Grain stated in one sentence, and the output matches it
- Every join type matches the rows you need to keep
- Conditions on a LEFT JOIN's right-hand table sit in ON, not WHERE
- No SUM or AVG over rows a join has duplicated
- NULLs handled on purpose: `<>`, `NOT IN`, `COUNT(col)` and `AVG` checked
- Date ranges half-open, in a named time zone
- Ratios cast to a decimal before dividing
- One known total reconciled
- One slice checked by hand
- The model's assumptions read, and each one confirmed or fixed

## How to get good at reviewing AI SQL

The checklist works, but the real skill sits underneath it: seeing a confident, well-formatted answer and asking what it assumed. It's the same skill for a query, a formula or a summary, and practice builds it faster than reading does.

That's the habit Iro trains. Lessons take about five minutes and you do the work, with instant feedback: spot-the-hallucination exercises, a 0–100 trust-calibration dial for deciding how far to trust an output, and prompt repair. There's an Excel path, and on Pro you can generate a Custom Path on any topic you type, SQL review included. If your query results end up in a spreadsheet, our [AI for Excel](/ai-for-excel) guide applies the same checks to formulas.

## FAQ

**Is ChatGPT good at writing SQL?**

It's good at syntax and structure and less reliable on meaning. ChatGPT writes SQL that usually runs, but without your schema it guesses table names, join types, NULL handling and date boundaries. Give it the dialect, the schema with types, the grain and a sample row, then reconcile a known total before you trust the result.

**How do I know if an AI-generated SQL query is correct?**

Reconcile it against a total you already trust, run it on a slice small enough to check by hand, compare row counts before and after each join, and test edge cases such as NULLs, empty periods and the last minute of a date range. A query that runs without errors is not evidence that it's right.

**Why does my AI-written SQL return duplicate rows?**

Usually a fan-out join. When you join a table to one with many matching rows, such as orders to order items, each order repeats once per item and any SUM over the order table is inflated. Aggregate the many side to one row per key before joining, or sum at the item level.

**What is the difference between a filter in WHERE and in ON?**

On a LEFT JOIN, a condition in ON decides which right-hand rows match, so unmatched left rows survive with NULLs. The same condition in WHERE runs after the join and removes those rows, which turns the query back into an inner join. Put conditions on the joined table in ON when you need every left row.

**What should I include in a prompt to get correct SQL?**

The database and version, the tables with column types and relationships, one or more sample rows, the exact metric definition, the grain of the answer, the time zone for dates and how to treat missing data. Ask the model to list its assumptions after the query so you can confirm or correct each one.

**Can I paste company data into ChatGPT to get SQL written?**

Paste the schema and a few sample rows with sensitive values removed or faked, not real customer data. The schema is usually enough for the model to write the query. Check which AI tools your company has approved before sharing anything internal, including table and column names.

## Read next

- [How to spot AI hallucinations in 5 seconds](https://tryiro.com/blog/spot-ai-hallucinations)
- [Which AI model should you use for coding?](https://tryiro.com/blog/best-ai-model-for-coding)
- [How to write a good AI prompt](https://tryiro.com/blog/how-to-write-a-prompt)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

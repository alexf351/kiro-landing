---
title: "AI fake case citations: what happened to the lawyers, and how to avoid it"
canonical_url: "https://tryiro.com/blog/ai-fake-case-citations"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["AI fake case citations", "lawyer sanctioned for ChatGPT", "Mata v. Avianca", "how lawyers avoid AI hallucinations", "AI hallucinated case law", "ChatGPT fake cases"]
date_published: "2026-10-23"
date_modified: "2026-10-23"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-fluency"
---

# AI fake case citations: what happened to the lawyers, and how to avoid it

> Lawyers have been fined, disqualified and referred to regulators for filing cases an AI tool made up. The details differ, but every one of those filings skipped the same step: nobody pulled the cited opinion from a real legal database and read it before signing.

**Canonical:** https://tryiro.com/blog/ai-fake-case-citations
**Published:** 2026-10-23
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- In Mata v. Avianca (S.D.N.Y., June 2023), two lawyers and their firm were fined $5,000 for filing six court decisions that ChatGPT had invented, and had to write to every judge falsely named as an author.
- Using AI is not the violation. Signing a filing without reading the cited authority is, and courts have sanctioned co-signers who never touched the tool.
- Sanctions are escalating, from modest fines in 2023 to disqualification from the case and referral to the state bar in Johnson v. Dunn (N.D. Ala., July 2025).
- Language models fabricate citations because they generate plausible text rather than retrieve records. Asking the chatbot to confirm doesn't work: in Mata, it said the fake case "does indeed exist."
- The fix is procedural: treat every AI citation as a lead, pull the full opinion from an authoritative database, confirm the quote and the proposition, and run a citator before anyone signs.

## Why are lawyers being sanctioned for AI fake citations?

**Lawyers are being sanctioned because they filed case law that an AI tool invented and signed the filing without pulling and reading the cited opinions, and courts treat that as the lawyer's failure, not the software's.** No court has sanctioned a chatbot. The penalty lands on the signature.

The cases share a pattern. A tool produced citations with the right format, real-sounding party names and plausible holdings. Nobody checked them against a legal database. When the other side or the judge couldn't find them, things got worse for the lawyers who were slow to admit it.

The fix isn't to swear off AI. It's a verification step that treats every AI-supplied citation as a lead until someone has read the real opinion. That workflow is below, after the cases that made it necessary.

Case details come from the court opinions themselves where we could read them (_Mata_, _Park_, _Wadsworth_ and _Ayinde_) and from Bloomberg Law and Alabama Reflector reporting for _Johnson v. Dunn_. This describes practice; it isn't legal advice, and your own jurisdiction's rules govern. Last reviewed 23 October 2026.

## What happened in Mata v. Avianca?

Roberto Mata sued the airline Avianca, saying a metal serving cart struck his knee on a flight to New York. Avianca asked the court to dismiss the claim as time-barred under the Montreal Convention. His lawyers' opposition, filed on 1 March 2023, argued otherwise and relied on decisions including _Varghese v. China Southern Airlines_, attributed to the Eleventh Circuit.

Six of those decisions did not exist. Steven Schwartz, the lawyer who did the research, testified that his firm's research subscription had limited federal coverage and that he had assumed ChatGPT was "like a super search engine." When he asked it whether _Varghese_ was real, it said the case "does indeed exist" and could be found on Westlaw and LexisNexis.

On 22 June 2023, Judge P. Kevin Castel of the Southern District of New York [issued his sanctions opinion](https://storage.courtlistener.com/recap/gov.uscourts.nysd.575368/gov.uscourts.nysd.575368.54.0.pdf). Schwartz, his colleague Peter LoDuca and their firm, Levidow, Levidow & Oberman, were fined **$5,000**, jointly and severally. They also had to mail the opinion to their client and to each real judge falsely named as the author of a fake opinion.

Two lines from that opinion are worth remembering. The court said there is "nothing inherently improper about using a reliable artificial intelligence tool for assistance." It also found bad faith, and said that if the lawyers had come clean soon after Avianca questioned the cases, "the record now would look quite different."

## Which other lawyers have been sanctioned for AI citations?

Mata was the case most people heard about. It wasn't the last, and the consequences have grown. Four that are well documented:

| Case | What went wrong | Outcome |
| --- | --- | --- |
| _Park v. Kim_, 2d Cir., January 2024 | A reply brief cited a state appellate decision the court couldn't find. Counsel said she had used ChatGPT "for assistance in case identification." | Referred to the court's Grievance Panel and ordered to give her client a copy of the ruling. |
| _Wadsworth v. Walmart_, D. Wyo., February 2025 | Motions in limine cited nine cases, and eight did not exist. They came from the firm's own in-house AI platform. | The drafting lawyer was fined $3,000 and lost his pro hac vice admission. Two lawyers who co-signed were fined $1,000 each. |
| _Ayinde_ and _Al-Haroun_, High Court of England and Wales, June 2025 | In _Al-Haroun_, 18 of 45 citations did not exist, and one fake authority was attributed to the judge hearing the application. | Lawyers in both cases referred to their regulators, alongside a warning to the whole profession. |
| _Johnson v. Dunn_, N.D. Ala., July 2025 | Lawyers at a large firm filed fabricated ChatGPT citations despite the firm's own AI policies. | Three lawyers publicly reprimanded, disqualified from the case and referred to the Alabama State Bar. |



Three things stand out. **Co-signers pay too:** in Wadsworth, two of the three sanctioned lawyers never used the tool; they signed the motions. **Legal-specific tools aren't exempt:** those fake cases came from a law firm's own platform, not a free chatbot. And **the response is escalating.** In Johnson v. Dunn, the judge said a fine would not "rectify the egregious misconduct" and removed the lawyers from the case instead.

The English court put the principle plainly in [_Ayinde_](https://caselaw.nationalarchives.gov.uk/ewhc/admin/2025/1383): lawyers who use AI for research "have a professional duty therefore to check the accuracy of such research by reference to authoritative sources" before relying on it.

## Why does AI make up case citations?

A language model doesn't look cases up. It generates text by predicting what plausibly comes next, and the English court described fake citations in exactly those terms, as "a result of their operational design." Our explainer on [what an LLM is](/blog/what-is-an-llm) covers the mechanics.

Citations are close to a worst case for that design. They follow a rigid pattern: party v. party, volume, reporter, page, court, year. A model that has seen millions of them can produce one that is formatted perfectly and refers to nothing. The more specific it looks, the more convincing it is, and specificity costs the model nothing.

Two more things make it worse:

- **Guessing gets rewarded.** A September 2025 research paper published by OpenAI argues that models hallucinate partly because training and evaluation "reward guessing over acknowledging uncertainty." Ask for authority supporting your argument and the model is under pressure to supply some.
- **It can't audit itself.** Asking the same chatbot whether a case is real runs the same process again. In Mata, it said yes.

Tools that search a real database before answering, a technique called [retrieval-augmented generation](/blog/what-is-rag), do much better, but not perfectly. A [preregistered 2024 Stanford study](https://arxiv.org/abs/2405.20362) found that leading legal research AI tools from LexisNexis and Thomson Reuters each hallucinated **between 17% and 33% of the time** on its test questions, while still beating a general chatbot. Those products have been updated since. The lesson hasn't changed: retrieval narrows the problem without removing your duty to read.

A made-up case is also the easier failure to catch. The harder one is a real case cited for something it doesn't say, or a genuine opinion credited with a quote that isn't in it.

## How lawyers can avoid AI hallucinations: a verification workflow

This is how careful practices handle it, written so a lawyer or paralegal can run it on any draft. Adapt it to your firm's policy; the signing lawyer stays responsible either way.

- **Don't ask a general chatbot for authority.** Use it for structure, drafting and summarizing material you supply. Tell it not to cite cases or statutes, or to flag any citation as unverified. Our [AI for lawyers](/ai-for-lawyers) guide has prompts written that way.
- **Log every citation as a lead.** Anything AI touched goes on a list: case name, citation, the proposition it supports, the pin cite.
- **Pull the full opinion from an authoritative source.** Westlaw, Lexis, Bloomberg Law, Fastcase, an official reporter or the court's own records. If you can't retrieve it, it doesn't go in the brief. Never use the chatbot to confirm it.
- **Read it for the proposition.** Check that the quote appears word for word at the pin cite, and that the passage is the court's holding rather than a party's argument or dicta. The Wyoming judge in Wadsworth flagged exactly that risk.
- **Run a citator.** KeyCite or Shepard's, to confirm it's still good law.
- **Check the court's own rules on AI.** Some courts now require lawyers to disclose generative AI use. Read the local rules and the judge's standing orders before filing.
- **Correct fast if something slips through.** Mata turned on what happened after the cases were questioned. Withdrawing and correcting promptly is what the duty of candor expects.

Steps 3 and 4 are the ones every sanctioned filing above skipped. A paralegal can run them. Whoever signs owns the result.

## What your professional-conduct rules expect

In the US, the ABA's ethics committee addressed this in [Formal Opinion 512](https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf) on 29 July 2024. It ties generative AI to duties lawyers already have: competence, confidentiality, client communication, supervision, reasonable fees, meritorious claims and candor toward the tribunal. Before filing, it says, lawyers must review AI outputs, "including analysis and citations to authority," and correct the errors.

Opinion 512 interprets the ABA Model Rules, which states adopt and adapt, and many state bars have published their own guidance, so check yours. Two duties are easy to forget. Supervision covers the paralegal or junior who ran the research. Confidentiality governs what you paste in the first place, which we cover in [is it safe to put client data in ChatGPT](/blog/client-data-in-chatgpt).

## How to get better at catching fake citations

The cite-check is a procedure. Noticing that an answer is suspiciously tidy is a reflex, and reflexes come from repetition. Our guide to [spotting AI hallucinations](/blog/spot-ai-hallucinations) covers the quick checks, and [how to tell if something is AI-generated](/blog/how-to-tell-if-something-is-ai-generated) covers the habit of verifying instead of guessing.

If you want daily practice, Iro AI builds that reflex in about five minutes a day. Spot-the-hallucination exercises put a confident wrong answer in front of you, a 0 to 100 trust-calibration dial asks how far you'd actually rely on an output, and prompt-repair drills teach you to ask for work that's easier to check. It won't replace a cite-check. It trains the instinct that makes you run one.

## FAQ

**What happened in Mata v. Avianca?**

In 2023, lawyers for Roberto Mata filed a brief in federal court in New York relying on six decisions ChatGPT had invented, then were slow to admit it. On 22 June 2023, Judge P. Kevin Castel fined two lawyers and their firm $5,000 and ordered letters to their client and to each judge falsely named as an author.

**Can lawyers be sanctioned for using ChatGPT?**

Using ChatGPT is not itself sanctionable. Courts sanction lawyers for filing citations they did not verify. In Mata v. Avianca the judge said there is nothing inherently improper about using a reliable AI tool, but that lawyers have a gatekeeping duty to ensure their filings are accurate. Outcomes have ranged from fines to disqualification and referral to regulators.

**Why does ChatGPT make up fake legal cases?**

Language models generate text by predicting what plausibly comes next rather than looking up records. Case citations follow a rigid format, so a model can produce one that looks perfect and refers to nothing. Asking the same chatbot whether the case is real does not help: in Mata v. Avianca, ChatGPT insisted a fake case existed.

**How do lawyers avoid AI hallucinations in court filings?**

Treat every AI-supplied citation as an unverified lead. Pull the full opinion from an authoritative database, confirm the quote and pin cite, check that the passage is the court's holding, and run a citator such as KeyCite or Shepard's. Check the court's rules on AI disclosure, and correct any error immediately.

**Do legal AI research tools hallucinate too?**

Less than general chatbots, but they are not hallucination-free. A preregistered 2024 Stanford study found leading legal research AI tools from LexisNexis and Thomson Reuters each hallucinated between 17% and 33% of the time on its test questions. In Wadsworth v. Walmart, the fake cases came from a law firm's own in-house AI platform.

**Who is responsible if a paralegal uses AI and a citation is fake?**

The lawyer who signs the filing. Courts treat a signature as certifying a reasonable inquiry into the law, and professional rules make lawyers responsible for supervising nonlawyer assistants. In Wadsworth v. Walmart, two lawyers who had not used the AI tool were fined because they signed the motions without checking them. This is general information, not legal advice.

## Read next

- [How to spot AI hallucinations in 5 seconds](https://tryiro.com/blog/spot-ai-hallucinations)
- [AI for lawyers: draft and summarize faster](https://tryiro.com/ai-for-lawyers)
- [What is RAG, explained simply](https://tryiro.com/blog/what-is-rag)
- [Is it safe to put client data in ChatGPT?](https://tryiro.com/blog/client-data-in-chatgpt)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

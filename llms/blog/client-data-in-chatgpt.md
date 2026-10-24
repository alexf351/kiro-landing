---
title: "Is it safe to put client data in ChatGPT? A guide for accountants, lawyers and HR"
canonical_url: "https://tryiro.com/blog/client-data-in-chatgpt"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["is it safe to put client data in ChatGPT", "can I use ChatGPT with confidential information", "ChatGPT data privacy", "ChatGPT confidentiality for lawyers", "ChatGPT client data for accountants", "ChatGPT employee data HR"]
date_published: "2026-10-23"
date_modified: "2026-10-23"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-fluency"
---

# Is it safe to put client data in ChatGPT? A guide for accountants, lawyers and HR

> Not on a personal account with the default settings, and not on any plan your firm hasn't approved for client work. Here's what each ChatGPT plan does with what you type, the settings worth changing, and how to strip a prompt of anything that identifies a client.

**Canonical:** https://tryiro.com/blog/client-data-in-chatgpt
**Published:** 2026-10-23
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- On personal ChatGPT plans (Free, Go, Plus and Pro), your conversations can be used to train OpenAI's models by default. Turning off Improve the model for everyone in Data controls stops that for new chats.
- Opting out is not a confidentiality guarantee. Rating a response can still send the whole conversation for training, and a deleted chat can take up to 30 days to be purged, longer under a legal hold.
- ChatGPT Business, Enterprise and Edu are not used for training by default, and workspace admins set retention. On Business, those admins can also view members' chats.
- A plan changes what the vendor does with your data. It doesn't decide whether you may share a client's data with a vendor at all; your professional rules, client agreements and firm policy do.
- The safest prompt has no client in it: replace names and identifiers with placeholders, blur unusual details, and ask for the method rather than pasting the record.

## Is it safe to put client data in ChatGPT?

**Not on a personal ChatGPT account with its default settings, and not on any plan until your firm has approved that tool for client data.** Those are two separate questions, and most advice online only answers the first.

The first is what the vendor does with what you type: whether it trains on it, how long it keeps it and who can read it. That depends on your plan and your settings, and it's covered below.

The second is whether you're allowed to hand the information to a third party at all. Your professional rules, your client's contract or engagement letter, privacy law and your firm's policy decide that. A better plan can't answer it for you.

Data-handling details come from OpenAI's, Anthropic's and Google's own help and privacy pages, as of October 2026. Vendors revise these pages often, so check the current version before relying on any of it. This is general information, not legal or compliance advice. Last reviewed 23 October 2026.

## What ChatGPT does with your data on personal and business plans

OpenAI splits ChatGPT into personal plans (Free, Go, Plus and Pro) and managed workspaces such as Business, Enterprise and Edu. The defaults are very different.

| As of October 2026 | Personal plans | Business, Enterprise, Edu |
| --- | --- | --- |
| Used to train OpenAI's models | Yes by default, with an opt-out | No by default |
| How long chats are kept | Until you delete them, then purged within 30 days | Set by workspace admins; deleted chats purged within 30 days |
| Who else in your organization can see them | No one; it's your account | Business admins can view, export and delete members' chats. Enterprise admins get an audit log. |
| Shared links | Anyone with the link can view | Only members of the same workspace |



The business tiers also come with paperwork that firms need. OpenAI's [enterprise privacy page](https://openai.com/enterprise-privacy/) says it will sign a data processing addendum for Business and Enterprise, that those plans have completed SOC 2 Type 2 audits, and that data is encrypted at rest and in transit. Its API, which developers use to build tools, isn't trained on by default either. For health information, OpenAI says it can sign a business associate agreement for the API, and it offers a separate ChatGPT for Healthcare workspace.

One detail HR teams should notice: a business account keeps your chats out of OpenAI's training, not out of sight of your own admins.

Claude and Gemini follow the same personal-versus-business split. Anthropic [asks Claude Free, Pro and Max users](https://www.anthropic.com/news/updates-to-our-consumer-terms) whether their chats can train its models, and keeps them for up to five years in de-identified form if they say yes; its Team, Enterprise and API products aren't trained on by default. Google's consumer Gemini app has human reviewers read some chats, keeps reviewed chats for up to three years, and its [privacy hub](https://support.google.com/gemini/answer/13594961?hl=en) asks users not to enter confidential information they wouldn't want a reviewer to see. Gemini inside Google Workspace isn't human-reviewed or used to train models outside your organization without permission.

## Which ChatGPT settings protect confidential information?

If you use a personal account for any work at all, check these five things. They work the same way on the web and in the mobile apps.

- **Improve the model for everyone.** Open Settings, then [Data controls](https://help.openai.com/en/articles/7730893-data-controls-faq). Switch it off and OpenAI won't use your new conversations for training, while your history stays. It applies across your devices when you're signed in. Voice mode has its own separate control.
- **The thumbs-up and thumbs-down buttons.** On personal plans, rating a response can send the entire conversation for training even after you've opted out. Don't rate anything that touched client work.
- **Temporary Chat.** These chats don't appear in your history, don't create memories and aren't used for training. OpenAI may still keep a copy for up to 30 days for safety, and saving one turns it into a regular chat.
- **Memory.** Found under Settings, then Personalization. When it's on, ChatGPT can remember details from past chats and draw on them later, which is the last place a client's name belongs. Review what it has saved, or turn it off.
- **Shared links.** Anyone who has a link shared from a personal account can open the conversation. Never share one that touched client work.

Deleting a chat removes it from your view at once and schedules it for permanent deletion within 30 days, unless OpenAI has to keep it for security or legal reasons. That exception isn't theoretical. In 2025, a preservation order in The New York Times' lawsuit against OpenAI required the company to keep consumer ChatGPT content it would normally have deleted. OpenAI says those obligations ended on 26 September 2025, though it's still storing a limited set of April to September 2025 data. Treat a deleted chat as probably gone within a month, not as something that never happened.

## What should you never paste into ChatGPT?

Even on an approved business plan, some information shouldn't go into a prompt without a specific reason and sign-off. On a personal account, none of it should.

- **For everyone:** passwords, account and card numbers, Social Security or National Insurance numbers, tax IDs, dates of birth alongside names, health information, and anything covered by an NDA, a court protective order or a client contract that limits sharing.
- **Accountants:** tax returns and their source documents, payroll exports, bank statements and a client's unpublished financials. US tax preparers also have Section 7216 of the Internal Revenue Code, which makes it a misdemeanor to knowingly or recklessly disclose return information outside the uses the rules allow. Our [AI for accountants](/ai-for-accountants) guide works from context, sample data and a check step instead.
- **Lawyers:** privileged communications, unredacted discovery, settlement positions and strategy, and anything that identifies a client in a matter that isn't public. [AI for lawyers](/ai-for-lawyers) covers the drafting and summarizing jobs where AI helps most, and if research is on your list, read [how lawyers ended up filing fake cases](/blog/ai-fake-case-citations) first.
- **HR:** names attached to performance, disciplinary, grievance or investigation details; medical, disability and leave records; pay tied to individuals; and candidate files. The [AI for HR](/ai-for-hr) guide drafts with placeholders and roles for exactly this reason.

## How to anonymize client data before you paste it

Most useful prompts don't need the client at all. They need the shape of the problem. A five-step routine:

- **Swap names for roles.** Client A, Employee 2, the target company. Keep the key in your own files, never in the chat.
- **Strip the direct identifiers.** Addresses, emails, phone numbers, account and tax ID numbers, dates of birth, case and matter numbers, even file names.
- **Blur the indirect ones.** A rare job title, a small town and an exact figure can identify someone together when no single detail would. Round the amounts, turn dates into "month 3," and generalize the industry and location.
- **Ask for the method, not an answer about the record.** Paste the column headings, not the payroll file. Ask for the checklist, the formula or the draft structure, then apply it to the real data yourself.
- **Reread before you send.** Use Temporary Chat, and put the real details back in your own document rather than in the conversation.

Be honest about what this achieves. Placeholders reduce risk; they don't make data anonymous if it can be linked back. The GDPR, for one, treats pseudonymized data that "could be attributed to a natural person by the use of additional information" as information about an identifiable person. For the wider habits of using AI on real work, see [how to use AI at work](/blog/how-to-use-ai-at-work).

## What to ask your firm before using ChatGPT for client work

If your firm has an AI policy, read it first. If it doesn't, these questions get you a usable answer quickly:

- **Which tools and plans are approved for client or employee data?** "ChatGPT" isn't an answer. A managed Enterprise workspace and your personal Plus account are different products.
- **Is there a signed data processing agreement,** and for health information, a business associate agreement?
- **What retention period is set, and who can see my chats?** On a business plan, that includes your own admins.
- **Do our client agreements say anything about AI tools or subcontractors?** Check before you assume it's allowed.
- **Do we need client consent?** For US lawyers, ABA Formal Opinion 512 says informed consent is required before entering information about a representation into a self-learning AI tool that could disclose it, and that boilerplate in an engagement letter isn't enough. Accountants in public practice have the AICPA's confidential client information rule, which bars disclosure without the client's specific consent. HR teams answer to privacy law and their own employee notices.
- **What do I do if I've already pasted something I shouldn't have?** A good policy says to report it, not to delete it and hope. Deleting a chat doesn't undo the disclosure.

## How to use ChatGPT safely for client work

The professionals who get the most out of AI aren't the ones who paste the most into it. They write prompts with all the context the model needs and none of the client, and they know which jobs to keep for themselves.

That's a learnable skill, and Iro AI trains it in about five minutes a day. Delegate-versus-do-it-yourself exercises train the call on what to hand off, guardrail-writing drills teach you to set limits inside the prompt, and on Pro the Prompt Lab scores your real prompts on clarity, specificity, constraints and context. If ChatGPT is your main tool, start with [learning ChatGPT properly](/learn-chatgpt).

## FAQ

**Is it safe to put client data in ChatGPT?**

Not on a personal plan with default settings, where conversations can be used for training. Business, Enterprise and Edu plans are not trained on by default, but whether you may share client data with any vendor depends on your professional rules, client agreements and firm policy. Check with your firm before pasting anything identifiable.

**Does ChatGPT use my conversations for training?**

On personal plans (Free, Go, Plus and Pro), yes by default. You can turn off Improve the model for everyone in Settings, under Data controls. OpenAI says it does not train on Business, Enterprise, Edu or API data by default. On personal plans, rating a response with thumbs up or down can still send that conversation for training.

**Does ChatGPT Temporary Chat keep my data?**

Temporary chats do not appear in your history, do not create memories and are not used to train models. OpenAI may keep a copy for up to 30 days for safety purposes. If you save a temporary chat, it becomes a regular chat and follows your normal settings.

**Can lawyers use ChatGPT with confidential client information?**

Only within their professional duties. ABA Formal Opinion 512 says lawyers need informed client consent before entering information about a representation into a self-learning AI tool that could disclose it, and that boilerplate in an engagement letter is not enough. State rules vary, so check your jurisdiction and firm policy. This is general information, not legal advice.

**Is ChatGPT Enterprise safe for confidential data?**

It has much stronger defaults than a personal account. OpenAI does not train on Enterprise data by default, admins set retention, and the plan has completed a SOC 2 Type 2 audit with encryption at rest and in transit. Approval for client data is still your firm's decision, and your own admins can access conversation logs.

**How do I anonymize data before using ChatGPT?**

Replace names with roles, remove direct identifiers such as account numbers, addresses and dates of birth, and blur details that identify someone in combination, like a rare job title plus a location. Ask for the method rather than pasting the record. Placeholders reduce risk but do not make data truly anonymous if it can be linked back.

## Read next

- [How to use AI at work: a practical guide](https://tryiro.com/blog/how-to-use-ai-at-work)
- [AI for accountants: formulas, emails and guidance](https://tryiro.com/ai-for-accountants)
- [AI for HR: draft JDs, policies and onboarding](https://tryiro.com/ai-for-hr)
- [AI fake case citations: what happened to the lawyers](https://tryiro.com/blog/ai-fake-case-citations)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

---
title: "What is MCP? The protocol quietly wiring AI into everything"
canonical_url: "https://tryiro.com/blog/what-is-mcp"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["what is MCP", "Model Context Protocol", "MCP explained", "MCP 2026-07-28", "MCP servers", "AI tool integration"]
date_published: "2026-07-28"
date_modified: "2026-07-28"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "ai-agents"
---

# What is MCP? The protocol quietly wiring AI into everything

> Model Context Protocol passed 400 million monthly SDK downloads and shipped its biggest spec update yet today. Here's what it actually is, in plain terms.

**Canonical:** https://tryiro.com/blog/what-is-mcp
**Published:** 2026-07-28
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- MCP (Model Context Protocol) is an open standard for connecting AI models to tools and data — one common plug instead of a custom integration for every pairing.
- It has crossed 400 million monthly SDK downloads, which makes it the de facto way AI assistants reach the outside world.
- Today's 2026-07-28 release — the fifth spec version — moves MCP to a stateless request/response core, so servers can run on serverless and edge infrastructure.
- It also graduates extensions (MCP Apps and Tasks) into a versioned framework and hardens authorization, with the Enterprise-Managed Authorization extension now stable.

## The short answer

**MCP — Model Context Protocol — is an open standard that lets AI models talk to outside tools and data through one common interface, instead of every app building a bespoke integration for every model.** It is the plumbing behind an assistant that can read your files, query a database, or take an action in another product.

The reason to pay attention now: MCP has passed **400 million monthly SDK downloads**, and today's **2026-07-28 specification** — its fifth release — is the largest structural change since launch, moving the protocol to a stateless core.

## The problem it solves

Before a shared protocol, connecting an AI assistant to a tool meant writing a custom integration for that specific pairing. Ten assistants and ten tools meant a hundred bespoke connections, each maintained separately, each breaking on its own schedule.

MCP replaces that with one interface. A tool exposes itself once as an _MCP server_; any MCP-speaking assistant can use it. The comparison people reach for is USB-C: before, every device had its own cable; after, one port fits everything.

That is the whole idea, and its unglamorousness is the point. Protocols win by disappearing — you do not think about HTTP when you open a web page. MCP crossing 400 million monthly SDK downloads means it has largely stopped being a proposal and started being infrastructure.

## What the 2026-07-28 release changes

The headline change. MCP moved from a bidirectional, stateful protocol — where client and server hold an open session — to a plain request/response model where every request describes itself completely.

That sounds like an implementation detail and is actually the difference between "MCP servers are something you host and babysit" and "MCP servers are something you deploy like any web endpoint." Because requests no longer depend on session state, any request can land on any instance behind an ordinary round-robin load balancer, and servers can run on serverless and edge infrastructure. Clients that still want the full capability list up front can make an optional discovery call.

MCP Apps and Tasks now ship under a versioned extensions framework. In practice that means interactive interfaces and long-running work — an agent that takes twenty minutes rather than returning instantly — have a formal home without bloating the core protocol. This is the standard maturity move: keep the middle small, let capability grow at the edges.

Authorization now aligns more closely with existing OAuth and OpenID Connect deployments, and the Enterprise-Managed Authorization (EMA) extension is stable. Translation: companies can let AI assistants reach internal systems using the identity infrastructure they already run, rather than inventing a parallel permission model. That is usually the specific thing blocking adoption inside large organisations.

The release also adds multi round-trip requests, header-based routing, cacheable list results, and updated Tier 1 SDKs.

## Why this matters even if you never write code

MCP is the reason the phrase "AI assistant" is shifting from something that answers questions to something that does things. Every capability that arrives in your tools — an assistant that can search your company wiki, file a ticket, pull a report — is likely riding on this kind of connection underneath.

Three practical consequences:

- **Capabilities will arrive faster and more unevenly.** When integration is cheap, features ship constantly. Expect your tools to gain abilities you did not ask for and were not announced loudly.
- **The permissions question becomes yours.** An assistant that can only talk is low-stakes. One that can act on your accounts is not. Knowing what a given assistant is connected to — and what it is allowed to do there — becomes a real literacy question, not an IT detail.
- **"Can it connect to X?" starts to beat "which model is smartest?"** for everyday usefulness. A slightly weaker model wired into your actual work often beats a stronger one in an isolated chat window.

## How much should you actually care?

Honest answer, by who you are:

**If you build software:** a lot, today. The stateless core changes deployment economics, and the authorization work removes the usual enterprise blocker. If you shelved an MCP server because hosting a stateful service was annoying, that objection just went away.

**If you work with AI daily but don't build:** know what it is and check what your assistant is connected to. That is roughly the depth that pays off. You do not need the spec.

**If you're learning AI:** this is worth understanding conceptually, because it explains where the field is heading. The interesting frontier stopped being "how smart is the model" and became "what is it plugged into, and what is it permitted to do." Agents are just models with tools and a loop — MCP is how the tools get attached.

The skill that follows from that is not memorising a protocol. It is judgment about delegation: what you hand to an automated system, what you review before it acts, and what you never connect at all. That question gets more important every time integration gets easier — and it is a question about you, not about the model.

## FAQ

**What is MCP (Model Context Protocol)?**

MCP is an open standard that lets AI models connect to external tools and data sources through one common interface, rather than requiring a custom integration for every model-and-tool pairing. A tool exposes itself once as an MCP server, and any MCP-compatible AI assistant can then use it.

**What changed in the MCP 2026-07-28 release?**

It is the fifth MCP spec release and the largest structural change so far. MCP moved to a stateless request/response core so servers can run on serverless and edge infrastructure; MCP Apps and Tasks graduated into a versioned extensions framework; and authorization was hardened to align with OAuth and OpenID Connect, with the Enterprise-Managed Authorization extension now stable.

**Why does a stateless core matter in MCP?**

Previously MCP was a bidirectional stateful protocol, meaning client and server held an open session. Now every request is self-describing, so any request can be handled by any server instance behind a standard load balancer. That makes MCP servers deployable on serverless and edge platforms like ordinary web endpoints instead of long-lived services.

**Do I need to understand MCP to use AI tools?**

No. MCP is infrastructure — most people will use tools built on it without ever touching it. The one part worth knowing as a user is what your AI assistant is connected to and what actions it is permitted to take, since assistants that can act on your accounts carry different risks from ones that only answer questions.

**How widely is MCP used?**

It has passed 400 million monthly SDK downloads, which makes it the de facto standard for connecting AI assistants to external tools and data rather than one competing proposal among several.

## Read next

- [AI agents, explained without the jargon](https://tryiro.com/blog/ai-agents-explained)
- [What is agentic AI?](https://tryiro.com/blog/what-is-agentic-ai)
- [Every 2026 AI model release, tracked](https://tryiro.com/blog/new-ai-models-2026)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He writes about practical AI fluency — prompting, AI tools, and the daily habits that turn AI from a novelty into real leverage.

---
title: "How to make a mood board with AI: directions, not final art"
canonical_url: "https://tryiro.com/blog/how-to-make-a-mood-board-with-ai"
site: "Iro AI"
site_url: "https://tryiro.com"
app_store: "https://apps.apple.com/app/id6759628066"
language: en-US
keywords: ["how to make a mood board with AI", "AI mood board", "AI mood board prompts", "Midjourney mood board", "AI moodboard for design projects"]
date_published: "2026-10-27"
date_modified: "2026-10-27"
reading_time_minutes: 7
author: "Alex Furukawa"
license: "© 2026 Iro AI"
canonical_llm_reference: "https://tryiro.com/llms-full.txt"
pillar: "prompt-engineering"
---

# How to make a mood board with AI: directions, not final art

> Use AI to see three or four visual directions in an afternoon, not to make the final art. Write the brief first, control your prompts one variable at a time, anchor each direction with references, and finish by turning the board into words your team can build from.

**Canonical:** https://tryiro.com/blog/how-to-make-a-mood-board-with-ai
**Published:** 2026-10-27
**Reading time:** ~7 min
**Author:** Alex Furukawa — Founder of Iro AI

## Key takeaways

- An AI mood board is for exploring visual directions quickly, not for making final art. Every generated image on it is reference, not a deliverable.
- Write a one-screen brief before you prompt: what it's for, who it's for, three words it should be, three it shouldn't, fixed constraints and the open question.
- Generate three or four directions that genuinely differ in palette, light, texture and medium, instead of forty variations of your first idea.
- Image prompts behave when they name subject, composition, lighting, palette, medium and exclusions, and when you change one variable at a time and log what you tried.
- Finish by turning the chosen direction into words: a hex palette, a type mood, adjectives tied to specific frames, and do and don't rules. Then move to real design tools.

## How do you make a mood board with AI?

**To make a mood board with AI, write a short brief first, generate three or four clearly different visual directions from it, refine each with prompts that change one variable at a time, then translate the winning direction into words (palette, type mood, adjectives) your team can build from.**

The generator is the fast part. The useful part is everything around it: knowing what you're exploring before you start, and knowing when to close the tab. It can show you a direction in an afternoon instead of a week. It's bad at final art, and a mood board was never final art anyway.

This guide is for designers, and for anyone who briefs one: founders, marketers and product managers who'd like to walk into a kickoff with something better than "make it feel premium".

## Write the brief before you write a prompt

Open a generator with no brief and you'll get forty attractive images that answer no question. Five minutes of writing first saves an hour of scrolling.

A mood-board brief fits on one screen:

- **What it's for.** A product launch page, a café rebrand, a conference stage. The medium changes every decision after it.
- **Who it's for.** One sentence on the audience, and what they should feel in the first second.
- **Three words it should be, three it shouldn't.** "Warm, precise, unhurried" helps. "Not corporate, not cute, not neon" often helps more.
- **Fixed constraints.** Existing brand colors, a logo that stays, accessibility needs, where people will see it.
- **The open question.** What you genuinely don't know yet. That's the thing the board exists to answer.

A chat assistant can turn a rambling kickoff call into these five headings and flag what's missing. Then edit it yourself: the "shouldn't" list is where your taste lives.

## Why 3 or 4 directions beat 40 variations

The most common mistake is generating forty versions of the first idea. They all look slightly different and they all answer the same question, so the board feels busy without giving anyone a real choice.

Aim instead for **three or four directions that disagree with each other**. For a specialty coffee brand, that might be:

- **Analog warmth:** film grain, kraft paper, hand-painted signage, morning light.
- **Lab precision:** white surfaces, brushed steel, macro shots of grounds, cool daylight.
- **Night shift:** deep greens and amber, low light, neon reflected in wet windows.
- **Wild card:** one direction you'd never pitch, which shows you where the edges are.

Do this in words before any images exist. Give a chat assistant your brief and ask: "Propose four visual directions that differ in palette, lighting, texture and era. One line each, no overlap, and make one a deliberate outlier." You'll throw most of them away. Then generate six to nine images per surviving direction, not sixty.

It's the same move our [AI for designers](/ai-for-designers) guide opens with: ideate directions, not final art. Widen fast, then narrow on purpose.

## AI mood board prompts that behave

Image models fill every gap you leave with an average guess. "Cozy coffee shop aesthetic" leaves almost everything open, so each run lands somewhere different and you can't tell why. A prompt that behaves names the things that decide the image:

- **Subject:** what's in frame, specifically. "A ceramic pour-over dripper on a wooden counter", not "coffee".
- **Composition:** close-up or wide, camera angle, where the subject sits, how much empty space.
- **Lighting:** direction, quality and time of day, such as "low side light from a window, early morning".
- **Palette:** three or four named colors, or "muted earth tones with one rust accent".
- **Medium:** 35mm film photo, gouache, 3D render, risograph print. This shifts the mood more than any adjective.
- **Exclusions:** what must not appear. "No text, no logos, no people" keeps a board about atmosphere rather than garbled lettering.

Put together, a prompt for the analog-warmth direction might read:

> Close-up of a ceramic pour-over dripper on a worn oak counter, steam rising, shot from slightly above, subject off-center left with empty space on the right. Low morning side light through a window. Muted palette of cream, walnut brown and one rust accent. 35mm film photograph with visible grain. No text, no logos, no people.

Then **change one variable at a time**. Swap the lighting to overcast and keep everything else. Change three things at once and you won't know which one helped.

Keep a **prompt log**: each prompt, the tool, the date and what you kept. It's how you recreate a frame for the client deck two weeks later, and it doubles as your record of what was generated and how. Our guide to [writing a good AI prompt](/blog/how-to-write-a-prompt) covers the same structure for text models, and [why your AI prompts aren't working](/blog/why-your-ai-prompts-arent-working) helps when a direction won't come out right.

## How to keep an AI mood board consistent (including Midjourney)

A column on the board reads as one direction only if its images share a look. Text prompts alone drift, so anchor each direction with references.

Most image generators let you upload a reference image and use it to steer the style. Pick two or three per direction (your own photos, a frame you generated and liked, a texture you shot) and reuse them for every image in that column. Add a fixed style line to the end of each prompt for that direction, such as "35mm film, visible grain, cream and walnut, low side light", and vary only the subject.

Midjourney has three features that do most of this work:

- **Style references.** Adding `--sref` and an image URL applies that image's look to your prompt, and `--sw` sets how strongly it pulls, according to Midjourney's [style reference documentation](https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference).
- **Moodboards.** There's a feature with exactly that name. You add images to a [Midjourney moodboard](https://docs.midjourney.com/hc/en-us/articles/39193335040013-Moodboards) on its website, by uploading them, pasting URLs or picking from your gallery, then apply it to a prompt with `--p` and the board's code. One moodboard per direction keeps the columns apart.
- **Aspect ratio and exclusions.** Images start square; `--ar 16:9` or `--ar 4:5` matches where the work will live, and `--no` tells it what to leave out. Both are in the [parameter list](https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List), and our [Midjourney page](/learn-midjourney) goes further into parameters.

Chat-based image tools work differently: you upload a frame and ask for changes in plain language ("same scene, overcast light, swap the rust for olive"). Either way, the discipline is the same. If you're still choosing a tool, our [comparison of AI image generators](/blog/best-ai-image-generators) covers the main options.

## Can you use an AI mood board with clients?

Yes, as a thinking tool, provided you're upfront about what it is. Three checks before it goes in a deck:

- **Read the specific tool's terms,** both for commercial use and for what you upload. Rights vary by tool and often by plan, and they get revised, so check the current terms for the account that made the images.
- **Look at your references.** Using someone else's photo as a style reference is still using their photo, so a photographer's portfolio or a competitor's campaign isn't a neutral input. Check, too, whether your plan makes your generations visible to other users.
- **Label it.** Mark AI-generated frames on the board and say plainly that they show a direction, not finished or licensed assets. Some client contracts restrict generated material entirely, so ask before it appears in front of them.

On ownership, one primary source is worth knowing. In its [January 2025 report on copyrightability](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf), the US Copyright Office concluded that, with current generally available technology, prompts alone don't give enough human control to make the user the author of the output. Human expression that's perceptible in an output, and creative selection, arrangement or modification of outputs, can still be protected.

That's about who owns the output, a separate question from what a tool's terms let you do with it. It's US guidance, other countries differ, and none of this is legal advice. The practical reading for a mood board: it's reference, and the work your team makes from it is the deliverable.

## How to turn a mood board into direction your team can use

A board that exists only as pictures gets reinterpreted by everyone who opens it. Once the team picks a direction, write it down in a form someone can build from without the board in front of them:

- **Palette:** four to six colors with hex values, sampled in your design tool. Treat generated colors as a starting point, not a spec, and check contrast before anything ships.
- **Type mood:** "a warm humanist sans with a slightly condensed display face", plus two or three real typefaces to test. Ignore any lettering in the images, because generators approximate letterforms.
- **Adjectives with evidence:** three words, each tied to a frame. "Unhurried: see the steam shot, mostly empty space."
- **Do and don't:** "Natural light only. No stock-photo smiles. Grain is fine; heavy filters aren't."

A chat assistant can draft this from your notes; ask it to separate what the team agreed from what's still open.

**Then stop.** When new generations stop changing the decision, the board is done. Real typography, layout, brand assets and anything that needs exact color belong in Figma, Illustrator or whatever your team builds in. Stay longer in the generator and you're polishing reference material nobody will ship.

The skill underneath all of this is directing a model precisely: a clear brief, controlled variables, an honest review. Iro teaches it in five-minute daily lessons with instant feedback, and our [AI for designers](/ai-for-designers) page covers ideating directions, image prompts that behave, design briefs and feedback synthesis. Prompt Lab (Pro) scores prompts you write on clarity, specificity, constraints and context. Image Lab is where you try image prompts yourself: three images free, then up to 10 a day on Pro.

## FAQ

**How do I make a mood board with AI?**

Write a one-screen brief, then generate three or four clearly different visual directions from it, six to nine images each. Use prompts that name subject, composition, lighting, palette, medium and exclusions, and change one variable at a time. Finish by writing the chosen direction down as a palette, type mood and adjectives your team can build from.

**What are good AI mood board prompts?**

Good mood board prompts name six things: the subject, the composition, the lighting, a short palette, the medium (film photo, gouache, 3D render) and what to exclude, such as text, logos or people. Add a fixed style line to every prompt in one direction so the images match, and vary only the subject.

**Can you make a mood board in Midjourney?**

Yes. Midjourney has a Moodboards feature: you add images on its website by upload, URL or from your gallery, then apply the board to a prompt with --p and its code. Style references (--sref with an image URL) also keep a look consistent, and --sw sets how strongly the reference applies.

**How many images should an AI mood board have?**

Fewer than you think. Three or four distinct directions with six to nine images each is usually enough to make a real decision. Forty variations of one idea make a board look busy without giving anyone a choice, and they're harder to turn into clear direction afterwards.

**Can I show AI-generated mood boards to clients?**

Usually, as reference. Check the specific tool's current terms for commercial use and for images you upload, label AI-generated frames on the board, and present them as a direction rather than finished or licensed assets. Some client contracts restrict generated material, so ask first.

**When should I stop using AI and move to design tools?**

When new generations stop changing the decision. At that point write the direction down as hex colors, type mood, adjectives and do and don't rules, then move to Figma, Illustrator or your usual tools for typography, layout, brand assets and exact color.

## Read next

- [The best AI image generators in 2026](https://tryiro.com/blog/best-ai-image-generators)
- [How to write a good AI prompt](https://tryiro.com/blog/how-to-write-a-prompt)
- [The 7 prompt patterns that work everywhere](https://tryiro.com/blog/prompt-engineering-patterns)
- [Grok Imagine Image 2.0: the editing tools are the story](https://tryiro.com/blog/grok-imagine-image-2)

## About the author

Alex Furukawa — Founder of Iro AI. Alex Furukawa is the founder of Iro AI, the gamified app for learning to use AI well. He works in private equity real estate, where he leads his firm's AI initiative and builds the automation his team runs on live deals. He writes about practical AI fluency: prompting, AI tools, and the daily habits that turn AI from a novelty into hours you get back.

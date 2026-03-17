Read all files in the research/ directory (or the directory specified: $ARGUMENTS).

For each file:
1. Identify the document's focus area
2. Extract every insight that translates into a concrete, actionable improvement for the website (index.html and quiz.html)
3. Skip insights that only apply to the native app, backend, or internal operations

Then combine all extracted improvements into a single deduplicated, prioritized list:
- **Tier 1 — Critical**: Items that directly impact conversion or fix broken experiences
- **Tier 2 — Important**: Items with meaningful impact on engagement or trust
- **Tier 3 — Refinements**: Nice-to-haves that polish the experience

For each item, include:
- What to change
- Why it matters (reference the source research file)
- Which file(s) to modify

Flag any contradictions between research files. If multiple files recommend the same thing, note that as higher confidence.

Save the output to research/IMPROVEMENTS.md (overwrite if it exists).

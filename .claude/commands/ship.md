Commit all current changes and push to remote. Follow these steps:

1. Run `git status` to see what changed
2. Run `git diff --stat` to understand the scope
3. Stage all modified and new files that are relevant (do NOT stage .env, credentials, or node_modules)
4. Write a clear commit message that:
   - Starts with a concise summary line (under 72 chars)
   - Lists key changes as bullet points in the body if there are multiple changes
   - Ends with: Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
5. Commit and push to the current branch

If there are no changes to commit, say so and stop.

Use a HEREDOC for the commit message to preserve formatting.

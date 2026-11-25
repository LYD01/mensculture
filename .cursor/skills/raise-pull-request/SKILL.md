---
name: raise-pull-request
description: Commit the working tree in reviewable pieces, push the branch, and return a GitHub compare link with the pull request title and description prefilled so the user can open the PR. Use when the user asks to raise, open, or prepare a pull request, or says "PR for me to review".
disable-model-invocation: true
---

# Raise a pull request

The user opens the PR themselves. Your job ends with a link they can click.

## Steps

1. **Check state.** Run `git branch --show-current`, `git status --short`, and `git log --oneline main..HEAD`.
   - If on `main`, stop and ask for a branch name, then create it with `git switch -c`.
   - Never include `.env*`, secrets, or unrelated local edits.
2. **Verify before committing.** Run `pnpm format`, `pnpm lint`, and `npx tsc --noEmit`. Fix errors (the `commitlint.config.mjs` warning is known).
3. **Commit by concern**, following the `git-commits` and `repo-tooling` rules:
   - Roughly 2 to 6 commits, each buildable. Stage explicit paths, never `git add .`.
   - Conventional Commits, lowercase imperative subject, no trailing period.
   - Wrap body lines at 100 characters or fewer (commitlint rejects longer lines).
   - If an `index.ts` barrel mixes two concerns, temporarily trim it for the earlier commit, then restore it.
   - Run the commit as its own command. Do not chain copies or file replacements into the same call.
4. **Push** with `git push -u origin <branch>`. Pushing is allowed here because the user asked for a PR.
5. **Build the compare link.** Get the repo with `git remote get-url origin` (convert `git@github.com:owner/repo.git` or the https form to `owner/repo`). Base is `main` unless told otherwise.

   ```
   https://github.com/<owner>/<repo>/compare/main...<branch>?expand=1&title=<url-encoded title>&body=<url-encoded body>
   ```

   Encode with `python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "<text>"`. Keep the URL under about 6000 characters.
6. **Reply** with the link as a markdown link, then a short list of the commits. Do not open the PR yourself, and do not use `gh` unless the user asks (its login can be expired; check with `gh auth status`).

## PR body template

```markdown
## What changed

- One bullet per feature.

## How to test

- Steps the reviewer can follow locally (`pnpm dev`, then where to click).

## Notes

- Known gaps, follow-ups, or decisions the reviewer should check.
```

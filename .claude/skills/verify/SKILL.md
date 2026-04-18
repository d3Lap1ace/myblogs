---
name: verify
description: Verify the project builds cleanly by running lint and the static export build. Use after non-trivial code changes or before claiming a task is done.
---

Run the two checks in order and report the result.

1. `npm run lint`
2. `npm run build`

If lint fails, stop — do not run the build. Fix the lint errors first, then re-run from step 1.

If the build fails, read the Next.js error output carefully. Common causes in this repo:

- A `date:` field in post frontmatter is a bare YAML date instead of a quoted string, so gray-matter produces a `Date` object that can't be JSON-serialized during static export. Quote the value.
- A route references a page under a slug that no longer exists (the `code`/`life` → `posts` consolidation removed older routes).
- A post in `src/content/posts/` is missing a required frontmatter field (`title`, `date`, `category`, `excerpt`, `readTime`).

Report a concise pass/fail summary. On failure, name the failing step and quote the relevant error.

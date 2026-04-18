---
name: new-post
description: Scaffold a new blog post in src/content/posts/ with the required frontmatter (title, date, category, excerpt, readTime). Use when the user asks to add, create, or draft a new blog post.
---

Create a new Markdown post at `src/content/posts/<slug>.md`.

## Gather inputs

Ask the user for anything not supplied in `$ARGUMENTS`:

- **title** — the post title (usually Chinese, matching existing voice)
- **slug** — filename without `.md`. If not given, default to today's date in `YYYY-MM-DD` format. Confirm before overwriting an existing file.
- **category** — short tag (e.g., `思考`, `技术`). Check existing posts in `src/content/posts/` for conventions.
- **excerpt** — one- or two-sentence summary shown on list pages
- **readTime** — rough estimate like `5 min`

## Write the file

Use this exact frontmatter shape — `date` **must be a quoted string**, not a bare YAML date (gray-matter parses bare dates into `Date` objects, which breaks JSON serialization during static export):

```markdown
---
title: <title>
date: "<YYYY-MM-DD>"
category: <category>
excerpt: <excerpt>
readTime: <N min>
---

# <title>

<body — leave a placeholder paragraph if the user hasn't provided content yet>
```

## After writing

- Remind the user the post will be served at `/myblogs/posts/<slug>` (note the `/myblogs` basePath).
- Do not commit automatically — leave that to the user.

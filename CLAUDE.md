# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog built with Next.js 15 (App Router, React 19, TypeScript, Tailwind CSS 4). Posts are Markdown files parsed with `gray-matter`; the site builds to a fully static export and deploys to GitHub Pages under the `/myblogs` path.

## Commands

- `npm run dev` — local dev server
- `npm run build` — static export to `/out/`
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`)

Before marking a non-trivial task done, run `npm run lint && npm run build` (or `/verify`).

## Deployment gotchas

- `output: 'export'` + `basePath: '/myblogs'` in `next.config.ts` — every route is served under `/myblogs/...`. When testing locally, hit `http://localhost:3000/myblogs`, not `/`.
- GitHub Actions builds against Node.js 24 (`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`). Local Node mismatches can pass locally and fail in CI.

## Content

- Posts live in `src/content/posts/*.md`. Filename is the slug (e.g., `2026-03-16.md` → `/posts/2026-03-16`).
- Required frontmatter: `title`, `date` (ISO `YYYY-MM-DD` **string**, not a YAML date), `shortName` (dash-joined label shown on post cards, e.g. `HSBC-Shopping`). `excerpt` is used by the RSS generator but not the UI.
- `date` must be a string — bare `2026-03-16` gets parsed into a `Date` object by gray-matter and breaks JSON serialization during static export. Quote it: `date: "2026-03-16"`.
- Post content is typically written in Chinese; match the existing voice when editing.
- Use `/new-post` to scaffold a post with the right frontmatter.

## Conventions

- Commit messages: English, imperative mood, no conventional-commit prefix (e.g., `Fix date serialization in gray-matter parse`). Prior Chinese commits are historical — new commits should be English.
- TypeScript path alias: `@/*` → `./src/*`.
- No Prettier configured — ESLint is the only style enforcement.

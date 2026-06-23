# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2026-06-23]

### Added
- Browser-based blog post editor using Decap CMS (git-backed, no new dependencies).
  - Accessible at `/admin` on the live site.
  - Allows creating, editing, and publishing blog posts directly in the browser (Markdown editor).
  - Supports uploading and inserting images inline in posts (stored in `public/images/`).
- New static admin UI files:
  - `public/admin/config.yml` — Decap configuration (blog collection matching existing schema, GitHub backend, media library for images).
  - `src/pages/admin.html` — Minimal HTML shell that loads Decap CMS via CDN script.
- `CHANGELOG.md` — New file to document changes for traceability and rollback.
- Updated README.md with new primary workflow for adding posts and using images.

### Notes
- Blog posts continue to be plain Markdown files in `src/content/blog/`.
- Content and images remain in the Git repository.
- Changes made in the CMS are committed to Git and automatically trigger a Vercel deployment.
- **Rollback**: Revert the relevant Git commit(s) with `git revert`. The three new files can be removed if you want to fully disable the editor. Existing blog rendering is untouched.
- This addition keeps the site lightweight: no new npm packages, no changes to existing source code (rendering, layouts, content collections), no framework additions.

### Changed
- Documentation: "Adding a New Blog Post" section in README.md now prioritizes the `/admin` UI. Manual file editing remains available as a fallback.

## [Previous]
See Git history for prior changes.

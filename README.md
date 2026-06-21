# tirumalakaggundi.com

Personal website for Tirumala Kaggundi.

A clean, fast, static site built with [Astro](https://astro.build) + Tailwind that includes:
- Landing page
- Projects
- Writings (external publications)
- Blog
- Resume

**Live site:** [www.tirumalakaggundi.com](https://www.tirumalakaggundi.com)

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:4321

## Content Updates

### Adding a New Blog Post
1. Create a new Markdown file in `src/content/blog/your-post-slug.md`
2. Add frontmatter:

```md
---
title: "Your Post Title"
pubDate: 2026-06-25
description: "Short description shown on the blog index and used for SEO."
tags: ["policy", "trading"]
---

Your post content here. Markdown supported.
```

3. Commit and push. The post will appear automatically after the next deploy.

### Updating Projects
Edit `src/data/projects.ts`. The first project is the AI for Trade competition entry.

### Updating Writings
Edit `src/data/writings.ts` (add URLs if you want direct links to the articles).

### Updating Resume
Replace `public/resume.pdf` with your latest version.

### Updating Headshot / Images
Replace `public/images/headshot.jpg`.

## Deployment (Vercel + GitHub)

This site is hosted on **Vercel** (free Hobby plan) and automatically deploys from GitHub.

### How It Was Set Up

1. Created a new GitHub repository: `Tiru-Kaggundi/personal_website`
2. Pushed all source code to the `main` branch.
3. Deployed the project to Vercel (initial deploy was done via Vercel CLI after the first push).
4. Connected the GitHub repository in the Vercel dashboard:
   - Project → Settings → Git → Connect Git Repository
5. Added the custom domain in Vercel:
   - Settings → Domains → Added `www.tirumalakaggundi.com` (and the apex domain)
6. Configured DNS on Squarespace (domain registrar):
   - Added an **A record** for both the apex and `www`:
     - `A` → `76.76.21.21`
   - Vercel automatically provisions SSL.

### How Redeploys Work

- Every push to the `main` branch on GitHub automatically triggers a new production deployment on Vercel.
- You can also trigger a manual deployment from the Vercel dashboard.

### Useful Vercel Commands (optional)

```bash
# Deploy manually from your machine (if needed)
npx vercel --prod

# Preview a deployment
npx vercel
```

## Commands

| Command          | Action                              |
|------------------|-------------------------------------|
| `npm run dev`    | Start local dev server              |
| `npm run build`  | Build production site to `dist/`    |
| `npm run preview`| Preview the production build locally |

## Project Structure

```
src/
├── content/
│   └── blog/                 # Markdown blog posts (Astro Content Collections)
├── data/
│   ├── projects.ts           # Projects list
│   └── writings.ts           # External publications
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogPostLayout.astro
├── pages/
│   ├── index.astro           # Homepage
│   ├── projects.astro
│   ├── writings.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── resume.astro
└── styles/
    └── global.css
public/
├── images/headshot.jpg
├── resume.pdf
└── favicon.*
```

## Notes

- The site is fully static. All content (blog posts, projects, writings, resume) lives in this repository.
- Vercel only builds and serves the output — nothing is stored on Vercel.
- The domain `www.tirumalakaggundi.com` is managed on Squarespace. DNS points to Vercel.

All future updates are done the normal way: edit files → commit → push. Vercel handles the rest.

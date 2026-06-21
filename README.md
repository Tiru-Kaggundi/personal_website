# tirumalakaggundi.com

Personal website for Tirumala Kaggundi — a simple, fast, static site with a landing page and a Substack-style blog.

Built with Astro + Tailwind. Deployed to Vercel (free Hobby plan).

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:4321

## How to Add a New Blog Post

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

## How to Update Projects

Edit `src/data/projects.ts`. Each project can include a GitHub link and optionally a `blogSlug` to link to a related post.

## Resume

Place your current resume at `public/resume.pdf`. The `/resume` page links directly to it for download.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), import the GitHub repository.
3. Vercel will auto-detect Astro and deploy on every push.
4. Add your custom domain:
   - In the Vercel project dashboard → Settings → Domains
   - Add `tirumalakaggundi.com` and `www.tirumalakaggundi.com`
   - Update the DNS records at your domain registrar (A record for apex, CNAME for www)
   - SSL is provisioned automatically

Everything (blog posts, images, resume PDF, project data) lives in this Git repo. Vercel only builds and serves the static output.

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
│   └── blog/           # Markdown blog posts
├── data/
│   └── projects.ts     # Curated project list
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogPostLayout.astro
├── pages/
│   ├── index.astro     # Home
│   ├── projects.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── resume.astro
└── styles/
    └── global.css
public/
├── resume.pdf          # Replace with your real resume
└── images/             # headshot.jpg + other images (already includes your headshot)
```

## Next Steps

- Replace placeholder content with your real bio, projects, and writing
- Add your actual Substack URL in the nav/footer/home
- The headshot (Headshot_tiru.jpg) has been added to public/images/headshot.jpg and is already displayed on the homepage. Replace it anytime by overwriting the file.
- Deploy to Vercel and configure the custom domain

All future updates are done by editing files and pushing to Git.

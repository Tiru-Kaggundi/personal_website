# tirumalakaggundi.com

Personal website for Tirumala Kaggundi.

A clean, fast, static site built with [Astro](https://astro.build) + Tailwind that includes:
- Landing page
- Projects
- Publications (external publications)
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

### Adding or Editing Blog Posts (recommended)

Use the browser-based editor (no VS Code or local files required, similar to Substack/Blogger):

1. Visit https://www.tirumalakaggundi.com/admin
2. Sign in with your GitHub account (must have write permission on the repository).
3. Click **New Blog Post**.
4. Fill out:
   - Title
   - Publish Date
   - Description (used in list and SEO)
   - Tags (optional)
5. Write the post body using Markdown. 
6. **Insert images**: Use the image button in the editor toolbar (or drag & drop). Images are automatically uploaded to `public/images/` and inserted as Markdown.
7. Click **Publish** (or Save). The CMS commits the `.md` file + any new images directly to Git.

The post will go live automatically after the next Vercel deployment (usually < 1 minute).

All CMS-driven content changes are tracked in `CHANGELOG.md`.

#### Fallback: Editing Markdown files manually

If you cannot use the admin UI:

1. Create (or edit) a Markdown file directly in `src/content/blog/your-post-slug.md`
2. Use the same frontmatter format:

```md
---
title: "Your Post Title"
pubDate: 2026-06-25
description: "Short description shown on the blog index and used for SEO."
tags: ["policy", "trading"]
---

Your post content here. Markdown supported.
```

3. Commit and push. The post will appear after the next deploy.

### Inserting images in blog posts

- **Using the editor** (`/admin`): Click the image icon in the rich Markdown toolbar to upload and insert. No path wrangling needed.
- **Manual Markdown**: Add image files under `public/images/` (create subfolders if desired, e.g. `public/images/blog/`). Reference them like:

  ```md
  ![A useful diagram](/images/blog/my-diagram.png)
  ```

Images are served as static assets at `/images/...` and render in any blog post. No special components or configuration are required in the site code.

### Updating Projects
Edit `src/data/projects.ts`. The first project is the AI for Trade competition entry.

### Updating Publications
Edit `src/data/publications.ts` (add URLs if you want direct links to the articles).

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
│   └── publications.ts           # External publications
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogPostLayout.astro
├── pages/
│   ├── index.astro           # Homepage
│   ├── projects.astro
│   ├── publications.astro
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

- The site is fully static. All content (blog posts, projects, publications, resume) lives in this repository.
- Vercel only builds and serves the output — nothing is stored on Vercel.
- The domain `www.tirumalakaggundi.com` is managed on Squarespace. DNS points to Vercel.
- Blog posts can now be created and edited via the lightweight Decap CMS editor at `/admin` (content is still plain Markdown files committed to this repo). See `CHANGELOG.md` for a record of these changes.

All future updates are done the normal way: edit files (or use `/admin`) → commit → push. Vercel handles the rest. Changes made through the CMS are automatically documented in the changelog for easy review and rollback.

### Setting up GitHub OAuth for the Admin Editor (required for production)

The `/admin` editor uses a "GitHub backend". This means it needs to authenticate with GitHub to be allowed to commit changes to your repository.

Because this site is hosted on Vercel (not Netlify), you must register your own GitHub OAuth App (one-time setup).

#### Step-by-step

1. Go to: https://github.com/settings/applications/new

2. Fill the form:
   - **Application name**: `Tirumala Kaggundi Site Admin` (or anything you like)
   - **Homepage URL**: `https://www.tirumalakaggundi.com`
   - **Application description**: `CMS for editing blog posts on my personal site`
   - **Authorization callback URL**: We'll set this in a moment (use `https://www.tirumalakaggundi.com` for now)

3. Click **Register application**.

4. On the next page:
   - Copy the **Client ID**.
   - Click **Generate a new client secret** → copy the secret (keep this private).

5. (Recommended) Set up a free OAuth proxy using Cloudflare Workers (keeps your site code clean and lightweight):
   - Go to https://dash.cloudflare.com → Workers & Pages → Create application → Worker.
   - Name it something like `tirumala-cms-oauth`.
   - Replace the default code with this (paste the full script):

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const CLIENT_ID = env.CLIENT_ID;
    const CLIENT_SECRET = env.CLIENT_SECRET;

    if (path === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo&response_type=code`;
      return Response.redirect(githubUrl, 302);
    }

    if (path === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      });

      const tokenData = await tokenRes.json();

      const html = `<!DOCTYPE html><html><body><script>
        window.opener.postMessage({
          type: 'authorization:github:success',
          data: ${JSON.stringify(tokenData)}
        }, '*');
        window.close();
      </script></body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Not found', { status: 404 });
  },
};
```

   - Click **Deploy**.
   - Go to the worker's **Settings** → **Variables and Secrets** and add:
     - `CLIENT_ID` = the Client ID from step 4
     - `CLIENT_SECRET` = the client secret from step 4
   - Note the worker URL, e.g. `https://tirumala-cms-oauth.yourname.workers.dev`

6. Edit your OAuth App on GitHub and update the **Authorization callback URL** to:
   `https://tirumala-cms-oauth.yourname.workers.dev/callback`

7. Update `public/admin/config.yml` and add these two lines under the `backend:` section:

```yaml
backend:
  name: github
  repo: Tiru-Kaggundi/personal_website
  branch: main
  base_url: https://tirumala-cms-oauth.yourname.workers.dev   # ← your worker URL
```

8. Commit & push the updated `config.yml`. Vercel will redeploy.

You should now be able to go to `https://www.tirumalakaggundi.com/admin`, click "Login with GitHub", authorize the app, and create/edit posts with images.

**Local testing tip**: The editor works in development too (it will use the same OAuth flow). You can also test writing posts locally and copy the Markdown if you prefer.

If you run into any issues with the worker or the flow, share the error and I'll help debug.

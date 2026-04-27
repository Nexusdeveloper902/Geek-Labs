# Geek Labs Studio

> *Code it. Build it. Break it.*

Welcome to the open-source repository for the **Geek Labs Studio** developer showcase and devlog. This site is built with **Next.js (App Router)**, **Tailwind CSS**, and **MDX**.

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## The MDX Publishing Workflow

This website uses a file-based CMS. To publish content, you create an `.mdx` file in `content/projects/` or `content/blog/`.

### 1. Creating a New Project

To add a new project to your portfolio:
1. Create a new markdown file inside the `content/projects/` directory (e.g., `my-new-project.mdx`).
2. Add the following frontmatter block at the very top of the file:

```yaml
---
title: Your Project Title
date: 2026-04-22
tags: [tag1, tag2]
cover: /images/your-cover-image.jpg
description: A short 1-2 sentence summary of the project.
---
```
3. Below the frontmatter, write the details of your project using standard Markdown.

### 2. Creating a Devlog

To add a new devlog update:
1. Create a new markdown file inside the `content/blog/` directory (e.g., `my-update.mdx`).
2. Add the following frontmatter. If this devlog is related to a specific project, use the `project` field to link it (use the exact filename of the project without the `.mdx` extension).

```yaml
---
title: Devlog Title
date: 2026-04-22
project: my-new-project
tags: [tag1, tag2]
cover: /images/optional-cover-image.jpg
description: A short 1-2 sentence summary of the update.
---
```

### 3. Creating an Experiment

To add a new mini-project or proof-of-concept to the Pinterest-style masonry board:
1. Create a new markdown file inside the `content/experiments/` directory (e.g., `my-experiment.mdx`).
2. Add the frontmatter block, using the same fields as a project (`title`, `date`, `tags`, `cover`, `description`).
3. The experiment will automatically appear on the `/experiments` masonry grid layout!

## Content Formatting Guidelines

To maintain the premium aesthetic of the showcase, follow these structural rules when writing the body of your `.mdx` files:

1. **Structure:** Format the content nicely using standard Markdown headers (`##`, `###`), bullet points, and code blocks. Do not include conversational filler—keep it focused entirely on the content and technical details.
2. **Tone:** Write in a professional but enthusiastic tone. It should read like an authentic engineering journal.
3. **Styling:** The site automatically applies custom styling to your Markdown:
   - Code blocks automatically receive full syntax highlighting (github-dark theme).
   - Embedded images (`![alt](/path.jpg)`) are automatically styled with rounded borders and a premium glass-card effect.
   - You can embed standard HTML/React components directly in the text since it uses MDX.
   - **Videos:** Use the `<Video />` component to embed videos. Example: `<Video src="/path/demo.mp4" />`
   - **Carousels:** Use the `<Carousel />` component to show multiple images. Example: `<Carousel images='[{"src": "/img1.jpg"}]' />`
   - **GitHub Repos:** Use the `<GithubRepo />` component to fetch and display a beautiful repo card. Example: `<GithubRepo repo="Nexusdeveloper902/Geek-Labs" />`
   - **Navigation:** A Table of Contents and Next/Previous post links are automatically generated for you on every page based on your markdown structure.

## SEO

Geek Labs Studio includes comprehensive SEO out of the box:

- **Dynamic metadata** on every page (title, description, Open Graph, Twitter cards)
- **Dynamic OG image** generated at build time (`src/app/opengraph-image.tsx`)
- **Sitemap** automatically generated from all MDX content (`/sitemap.xml`)
- **Robots.txt** with crawler instructions (`/robots.txt`)
- **JSON-LD structured data** (WebSite + Person schemas)
- **Semantic HTML** with proper heading hierarchy and ARIA labels

Simply save your `.mdx` file, and the content will automatically populate on the site. If a devlog has a `project` field attached to it, it will automatically appear at the bottom of that specific project's page.

---
slug: 'building-a-portfolio'
title: 'Building a Portfolio as a Product Surface'
date: '2026-03-28'
readTime: '6 min read'
excerpt: 'Why I built this site like a product rather than a brochure, and the architectural decisions behind it.'
tags: ['meta', 'design', 'portfolio']
---

## The Problem with "Portfolio"

Most portfolios are brochures. They show screenshots, list technologies, and make claims about impact. But they don't let the visitor inspect the actual work. A hiring manager or client sees "Built a POS system" but can't tell whether that means a weekend prototype or a production system running in a real restaurant.

I wanted this site to close that gap. Every project card should answer three questions:

1. What is it? (clear description, not jargon)
2. Why does it matter? (impact, not features)
3. Can I see the evidence? (case study, live site, or both)

## Product Surface, Not Brochure

The site is structured like a product, not a document. This means:

- **Case studies have depth.** Each case study documents the problem, what was built, the architectural choices, specific bugs fixed, and results. The POS case study includes an interactive demo that lets visitors simulate the actual order flow.
- **Skills are tied to projects.** The skills page doesn't just list technologies. It shows how frequently each skill is used across projects and which projects use it. This makes claims verifiable.
- **The homepage is a summary, not a splash page.** It surfaces the key information --- featured projects, recent writing, quick facts --- in a scannable layout. No hero animation, no "I'm passionate about" filler.

## Technical Decisions

### Astro + React Islands

Astro renders static HTML by default, which means most pages load instantly with no JavaScript overhead. Interactive components (the POS demo, project filters, the contact form) are loaded as React islands --- hydrated on the client only where needed.

This split gives the best of both worlds: fast initial loads for content pages and rich interactivity where it matters.

### Dark Theme with CSS Custom Properties

The color system uses HSL custom properties defined at the `:root` level. This makes it trivial to adjust the theme or add a light mode later. Every component references these variables, so a single change propagates everywhere.

```css
:root {
  --background: 150 10% 5%;
  --surface:    150  7% 14%;
  --foreground: 150  4% 84%;
  --primary:    153 65% 48%;
  --accent:      47 100% 64%;
  --border:     150  6% 20%;
}
```

### No Build-Time Content Layer

Currently, writing posts are Astro pages with inline content. For a small set of posts this works fine, but as the writing section grows, the content should move to Markdown files or a headless CMS. The `posts.js` data file is the first step toward decoupling content from presentation.

## What's Next

The site will evolve from a static portfolio into a living surface that reflects ongoing work. Upcoming additions include:

- More writing on specific technical topics
- An experiments section for smaller projects and prototypes
- Better mobile navigation for the sidebar
- Potential light mode toggle

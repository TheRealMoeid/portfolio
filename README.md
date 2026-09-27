# Moeid Ghiady — Portfolio

Personal portfolio site built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — root layout, page composition, global styles
- `components/sections/` — one component per page section (Header, Hero, Projects, Skills, Capabilities, About, Contact, Footer)
- `components/ui/` — shared primitives (Button, Card, Tag, StatusBadge, SectionHeading, IconLink, BackToTop, Reveal)
- `data/` — typed content (`projects.ts`, `skills.ts`, `capabilities.ts`, `contact.ts`, `site.ts`) kept separate from presentation
- `types/` — shared TypeScript interfaces
- `lib/` — small helpers, including the `useInView` scroll-reveal hook

## Before deploying — outstanding items

These were intentionally left as placeholders during implementation and should be swapped in before the site goes live:

1. **Email and WhatsApp links.** `data/site.ts` has placeholder values for `email` and `whatsapp` in `socialLinks`, marked with a `TODO` comment. Replace with the real address and number.
2. **OG image.** `public/images/og-image.png` is a plain placeholder generated for layout purposes. Swap in a designed 1200x630 image before sharing links publicly.
3. **Domain.** `data/site.ts` has `url: "https://moeidghiady.dev"` as a placeholder for metadata; update to the real domain once one is chosen.
4. **LinkedIn.** Shown as "Coming soon" in Contact and Footer by design. Once a profile exists, update `data/contact.ts` (change its `variant` to `"secondary"` and give it a real `href`).
5. **Fifth project (game project).** Not included yet, per the project's content plan — add it to `data/projects.ts` once the details and repo are ready. The `Project` type's `illustration` field will need a new variant, and a matching SVG in `ProjectIllustrations.tsx`.

## Deployment

Static-friendly and ready to deploy on Vercel, Cloudflare Pages, or similar:

```bash
npm run build
```

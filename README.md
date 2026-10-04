# Moeid Ghiady — Portfolio

Personal portfolio site built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — root layout, page composition, global styles, favicon (`icon.svg`)
- `components/sections/` — one component per page section (Header, Hero, Projects, Skills, Capabilities, About, Contact, Footer), plus `FloatingIcons` (decorative background icons, shown only on very wide screens) and `ProjectIllustrations`
- `components/ui/` — shared primitives (Button, Card, Tag, StatusBadge, SectionHeading, IconLink, BackToTop, Reveal)
- `data/` — typed content (`projects.ts`, `skills.ts`, `capabilities.ts`, `contact.ts`, `site.ts`) kept separate from presentation
- `types/` — shared TypeScript interfaces
- `lib/` — small helpers, including the `useInView` scroll-reveal hook

Other notes: Vercel Analytics (`@vercel/analytics`) is mounted in `app/layout.tsx` and only reports data when the site is deployed on Vercel with Web Analytics enabled. See `PROJECT_FILE_GUIDE.md` for a full file-by-file map.

## Before deploying — outstanding items

These were intentionally left as placeholders during implementation and should be swapped in before the site goes live:

1. **Email and WhatsApp links.** `data/site.ts` now holds the real `email` and `whatsapp` values in `socialLinks` (the WhatsApp number is published on purpose, via a `wa.me` link). The stale `TODO` comment above them can be deleted.
2. **OG image.** `public/images/og-image.png` is a plain placeholder generated for layout purposes. Swap in a designed 1200x630 image before sharing links publicly. Until the real domain is set (item 3), the live Open Graph tags point at `https://moeidghiady.dev/images/og-image.png`, so link previews will not load the image.
3. **Domain.** `data/site.ts` has `url: "https://moeidghiady.dev"` as a placeholder for metadata; update to the real domain once one is chosen.
4. **LinkedIn.** Shown as "Coming soon" in Contact and Footer by design. Once a profile exists, update `data/contact.ts` (change its `variant` to `"secondary"` and give it a real `href`) and `components/sections/Footer.tsx`, where LinkedIn is hard-coded as a disabled link.
5. **Fifth project (game project).** Not included yet, per the project's content plan — add it to `data/projects.ts` once the details and repo are ready. The `Project` type's `illustration` field will need a new variant, and a matching SVG in `ProjectIllustrations.tsx`.
6. **Page title separator.** `app/layout.tsx` builds the title as the name and the role separated by two spaces (the em dash was removed on purpose), so the browser tab and link previews show no visible separator. Optionally add a pipe, colon, or hyphen in `title`, `openGraph.title`, and `twitter.title`.

## Deployment

Static-friendly and ready to deploy on Vercel, Cloudflare Pages, or similar:

```bash
npm run build
```
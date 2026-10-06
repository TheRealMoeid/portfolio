# Personal Portfolio Website — Continuation Context (Page Specification & Technical Architecture)

This file continues from `project_context.md` (overall project direction) and `portfolio-project-context(2).md` (content & information architecture, finalized). Use all three together as the starting context in a new chat. Do not re-derive or re-negotiate anything listed here as "finalized" unless the user explicitly asks to change it.

**Current phase:** v1 implemented and running locally (Next.js ^15.5.27 per `package.json`). Remaining: pre-deploy cleanup, testing, deployment. See `PROJECT_FILE_GUIDE.md` (code map) and `README.md` (checklist).

---

## Page Specification (finalized)

### Section order / page structure

Single scrolling page, in this order:

1. Sticky header / navigation
2. Hero
3. Selected Projects
4. Skills
5. Capabilities / What I Can Build
6. About
7. Contact
8. Footer

Projects are placed before Skills/Capabilities intentionally, to lead with evidence before listing the toolset, consistent with the project's "evidence over claims" content philosophy.

### Layout direction per section

- **Header:** slim, sticky, semi-transparent/blurred on scroll. Left: "MG" wordmark. Right: nav links (Projects, Skills, About, Contact) + filled accent "Get in Touch" button. Collapses to a hamburger on mobile.
- **Hero:** large display name, role/title in accent color beneath it, muted tagline below that, two CTAs (filled "View Projects", outlined "Get in Touch"), small GitHub/Telegram/Email icon row. Includes a distinctive small detail: a thin accent-colored vertical rule beside the name, and a small monospace "based in [location]" tag. Generous negative space, no hero photo/illustration.
- **Selected Projects:** section heading with a small monospace index number (e.g. "01"), one-line intro, 2x2 card grid (2 columns desktop, 1 column mobile). Each card: small icon, project title, one-line description, tech tag pills, status badge, "View on GitHub" link.
- **Skills:** section heading with index ("02"), skills grouped into labeled categories as compact tag/chip clusters (not bars, not percentages), multi-column grid, stacking on mobile.
- **Capabilities:** section heading with index ("03"), 5-card grid, small line icon + short title + 1-2 sentence description per card. A smaller, quieter closing line below the grid mentions embedded/hardware capability without being its own card.
- **About:** section heading with index ("04"), two-column layout: left is body text (2 short paragraphs), right is a simple abstract geometric graphic (not a photo).
- **Contact:** centered. Two equal-weight primary buttons (Email, Telegram), smaller secondary icon links (WhatsApp, GitHub), LinkedIn shown as muted "Coming soon".
- **Footer:** single slim row, name left, copyright/year center, Email + GitHub icons + muted "LinkedIn - Coming soon" on the right. Circular back-to-top button appears near the footer and scrolls to top on click.

### Visual style (finalized, based on approved mockup)

- **Theme:** dark theme. Near-black background, off-white text.
- **Accent color:** one accent color (blue, as used in the approved mockup) used consistently for CTAs, links, tags, badges, section index numbers, and small decorative rule lines.
- **Cards:** thin 1px borders, small border radius, consistent padding across Projects/Skills/Capabilities cards, subtle hover-lift.
- **Typography:** bold geometric/display sans for headings and hero name, clean readable sans for body copy, small monospace font for section index numbers, tags, and small code-style decorative details (e.g. a small `// build / automate / create / improve` style decorative block in the hero).
- **Distinctive details (approved, keep consistent throughout):** monospace section index numbers ("01", "02", etc.) next to each section heading, thin accent vertical rule as a recurring motif, small distinct line icon per project/capability card, subtle background dot/grid texture used sparingly.
- **Overall feel:** minimal, technical, editorial, more visually distinctive/memorable than a generic dark SaaS template, but restrained, not busy. No glassmorphism, no neon glow, no generic AI/circuit-board cliches.

### Hero and Projects visuals (finalized, revised after feedback)

After sharing the second mockup with friends/family, the main feedback was too much text and not enough visuals. Content itself was confirmed as good, no need to remove anything, but more visual appeal was needed. This led to two changes:

- **Hero:** now includes a real photo of Moeid, in a two-column layout (text/CTAs left, photo right). The photo sits in a bordered square/rounded-square frame using the accent color, with small corner-bracket accents for a "technical/viewfinder" feel, styled in a subtle dark duotone to match the dark palette. This is the only real photo on the site. The earlier decorative code-comment block (`// build / automate / create / improve`) is dropped in favor of the photo.
- **Selected Projects:** each project card now includes a top image area (consistent aspect ratio across all 4 cards) with a simple flat-style line-art illustration relevant to that project, rendered in the site's dark background and single accent color only (not bright gradients or 3D device mockups). This replaces the previous plain text-only cards. Card content below the image (title, description, tags, GitHub link) is unchanged.
- **About section:** stays with the abstract geometric graphic (a few overlapping thin-outlined shapes in the accent color) as originally planned. Explicitly decided NOT to add a second real photo here, to keep the Hero photo as the one genuine personal photo on the site rather than diluting it, and to avoid using an AI-generated "photo of himself" for authenticity reasons (the site's content philosophy is evidence-driven and honest, a synthetic stand-in photo would work against that).

### Mockup process notes

- Three visual mockups were generated and reviewed over the course of this phase. The first was too generic. The second (dark theme, blue accent, monospace index numbers, hero vertical rule, code-comment decorative block, distinct icons per card) was approved as an intermediate reference, but was then revised based on outside feedback (see above). The third mockup, adding the hero portrait photo and the image-illustration headers on each project card while keeping the About section's abstract graphic, is the final approved visual reference for implementation.
- Mockups were requested as clear, simple visual references, not highly detailed/polished final renders.

---

## Technical Architecture (finalized)

**Chosen approach:** Approach B — Data-Driven Component Architecture.

Single-page structure (matching the Page Specification above), with content separated from presentation via typed data files, and a shared UI primitives folder for consistent styling across sections. This keeps v1 simple to build while making it easy to extend later (e.g. adding the pending 5th project, or eventually generating individual project pages from the same data without restructuring).

### Folder structure

```
/app
  layout.tsx          # root layout, fonts, metadata, theme
  page.tsx            # composes all sections in order
  globals.css         # Tailwind base + custom CSS variables (colors, fonts)

/components
  /sections
    Header.tsx
    Hero.tsx
    Projects.tsx
    Skills.tsx
    Capabilities.tsx
    About.tsx
    Contact.tsx
    Footer.tsx
  /ui
    Button.tsx         # primary/outline variants
    Card.tsx            # shared card shell (border, radius, padding, hover)
    Tag.tsx              # tech tag / skill chip pill
    StatusBadge.tsx      # "In progress" / "Completed" / etc.
    SectionHeading.tsx   # heading + monospace index number pattern
    IconLink.tsx         # GitHub/Telegram/Email icon links
    BackToTop.tsx

/data
  projects.ts       # typed array of Project objects
  skills.ts         # typed array of SkillCategory objects
  capabilities.ts   # typed array of Capability objects
  contact.ts        # contact links/config
  site.ts           # name, title, tagline, nav items, social links

/types
  index.ts          # Project, SkillCategory, Capability, ContactLink interfaces

/lib
  utils.ts          # small helpers (e.g. cn() for className merging)

/public
  /images           # project screenshots, favicon, og-image
```

### Data shape (example)

```typescript
// types/index.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: "In progress" | "Completed" | "Actively in development" | "Local demo available";
  github: string;
  demo?: string;
  illustration: "shopmate" | "vpnvend" | "mediabot" | "firesystem";
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Capability {
  title: string;
  description: string;
  icon: string; // icon identifier, mapped in the component
}
```

The `slug` field on `Project` is unused for now but sets up future individual project pages without restructuring the data.

### Stack decisions (finalized)

- **Framework:** Next.js + React + TypeScript (per original project_context.md, unchanged)
- **Styling:** plain Tailwind CSS utility classes, no `cva` or variant library, colors/fonts defined via CSS variables in `globals.css` and `tailwind.config.ts`
- **Icons:** `lucide-react`
- **Fonts:** loaded via `next/font/google` (self-hosted, no external font requests, for performance):
  - **Space Grotesk** — headings, hero name, display text
  - **Inter** — body copy
  - **JetBrains Mono** — section index numbers, tags, small decorative code-style details
- **Animations:** no animation library (kept lightweight per the "minimal third-party dependencies" performance requirement). A small custom `useInView` hook built on the native `IntersectionObserver` API, combined with Tailwind transition/opacity/translate utility classes, is used for a simple fade-up scroll-reveal effect per section.

---

## Not Yet Covered / Next Steps

- **Implementation** is the next phase (Planning → Content/IA → Page Spec → Technical Architecture → **Implementation** → Testing → Deployment). Done for v1; see the section below for where the build differs from this spec.
- The pending 5th project (a game project, not yet on GitHub) is still unresolved, see `portfolio-project-context(2).md` for details. Do not add it to `data/projects.ts` until Moeid provides the details.
- Implementation has started and v1 is built. Further code changes should respect the decisions in this file.

---

## Implementation Notes: Where the Build Differs From This Spec

- **Extra files not in the folder structure above:** `components/ui/Reveal.tsx`, `components/sections/ProjectIllustrations.tsx`, `lib/useInView.ts`. `types/index.ts` also has `ContactLink` and `NavItem`, and `Project` has a required `illustration` field.
- **Status value renamed:** `"Local demo"` became `"Local demo available"` (ShopMate Agent and VPN Vend use it).
- **Client components:** six files use `"use client"` (`Header`, `BackToTop`, `Reveal`, `useInView`, `Button`, `Contact`). `Contact` needs it because it passes an `onClick` to `Button`.
- **Button** has a third variant, `soft-red`, used for the unavailable LinkedIn button.
- **Contact section** is simpler than specified: Email, Telegram, WhatsApp, and GitHub all render as filled buttons; LinkedIn shows as a muted red button reading "(currently unavailable)". No secondary icon links.
- **Hero photo:** the duotone/grayscale filter was removed; the photo shows in full colour.
- **Skills:** the site shows six categories. "Digital Logic / FPGA (Quartus II, basic)" from the content file is not on the site (open decision).
- **Footer LinkedIn** is hard-coded, not driven by `data/contact.ts`.
- **Framework version:** `package.json` pins `next` at `^15.5.27` (lockfile 15.5.27) with React 18.3.1; scaffolded on 14. Earlier notes mentioning 16.3.6 with Turbopack no longer match the files.
- **Extra files and dependencies since the spec:** `components/sections/FloatingIcons.tsx` (decorative floating tech icons, visible only at the `2xl` breakpoint and up, rendered from `app/page.tsx`), `app/icon.svg` (favicon), `simple-icons` (brand icons, used only by `FloatingIcons`), and `@vercel/analytics` (`<Analytics />` in `app/layout.tsx`). Icons are therefore `lucide-react` plus `simple-icons`, not `lucide-react` alone. `tailwind.config.ts` also gained a `float` keyframe/animation.
- **Hero** also has an "available for new projects" pill with a pinging green dot, which is not in the spec above. Per the owner it means "ready to be hired"; the wording may change.
- **StatusBadge:** `Actively in development` uses a green dot; `Completed` and `In progress` use the accent colour; `Local demo available` is muted.
- **Types:** `SkillCategory` has an optional `note` field (used for "Still developing" on Databases / Data), which the data-shape example above omits.
- **Dot/grid texture:** the `dot-grid` background utility exists in `tailwind.config.ts` but is not applied anywhere.
- **Footer LinkedIn** reads "(currently unavailable)" rather than "Coming soon".
- **About copy** in `About.tsx` is the owner's own first-person wording and is now authoritative over the finalized text in `portfolio-project-context(2).md`.
- **Resolved since the last revision:** the em dash in the page title was removed on purpose (the separator is now two spaces, so the tab title has no visible separator; optional to improve), the `.gitignore` entry that could hide the hero photo is gone, and the phone number is published on purpose via the WhatsApp `wa.me` link. The site is deployed on Vercel at `portfolio-chi-green-13ro5dp3d1.vercel.app`.
- **Open issues:** fifth project pending, OG image (still the placeholder file; `site.url` now points at the Vercel address), custom domain if one is chosen later, LinkedIn, optional title separator, optional wording for the Hero pill. Details in `README.md` and the last section of `PROJECT_FILE_GUIDE.md`.

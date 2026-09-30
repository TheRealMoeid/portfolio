# Project File Guide

A developer's map of the portfolio codebase: what each file does, how files
depend on each other, and what is safe to touch when you want to change
something.

---

## Project Overview

This is a Next.js App Router site (scaffolded on Next.js 14; the dev server now reports Next.js 16.3.6 with Turbopack, see the `package.json` notes) written in TypeScript and styled with
Tailwind CSS. It is a **single scrolling page** (`app/page.tsx`) built by
stacking eight section components in order: Header, Hero, Projects, Skills,
Capabilities, About, Contact, Footer.

The architecture is **data-driven**: every section component is a "dumb"
renderer that imports its content from a matching file in `data/` and maps
over it. This means:

- To change **what appears on the page** (project descriptions, skills,
  capability text, contact links, name/tagline), you almost always edit a
  file in `data/`, not the component that renders it.
- To change **how something looks or behaves** (spacing, colors, card shape,
  animations, layout), you edit the component in `components/`.
- Small reusable pieces of UI (buttons, cards, tag chips, section headings)
  live once in `components/ui/` and are reused across every section, so a
  style change there affects the whole site at once.

Everything is a **React Server Component** by default (the Next.js App
Router default). A file only becomes a **Client Component** — meaning it can
use `useState`, `useEffect`, or browser APIs — if it starts with the
`"use client"` directive on line 1. Six files in this project do:
`Header.tsx`, `BackToTop.tsx`, `Reveal.tsx`, `useInView.ts`, `Button.tsx`, and
`Contact.tsx`. Everything
else renders once on the server/at build time and ships as static HTML.

**Server/client boundary rule (this caused a real build error):** a Server
Component cannot pass a function (for example `onClick`) as a prop to a Client
Component. `Reveal` and `Button` are Client Components, so any file that hands
them an event handler must itself be a Client Component. That is why
`Contact.tsx` starts with `"use client"`.

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root HTML shell, fonts, <head> metadata
│   ├── page.tsx             # Composes all sections in order
│   └── globals.css          # Theme colors, base styles, scroll-reveal CSS
├── components/
│   ├── sections/             # One file per page section
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectIllustrations.tsx
│   │   ├── Skills.tsx
│   │   ├── Capabilities.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/                   # Reusable primitives used across sections
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Tag.tsx
│       ├── StatusBadge.tsx
│       ├── SectionHeading.tsx
│       ├── IconLink.tsx
│       ├── BackToTop.tsx
│       └── Reveal.tsx
├── data/                    # All page content, typed, separate from UI
│   ├── site.ts               # Name, tagline, nav items, social URLs
│   ├── projects.ts           # The 4 project cards
│   ├── skills.ts              # Skill categories + tags
│   ├── capabilities.ts        # The 5 "what I can build" cards
│   └── contact.ts             # Contact section buttons/links
├── types/
│   └── index.ts               # Shared TypeScript interfaces for the data
├── lib/
│   ├── utils.ts                # cn() className helper
│   └── useInView.ts             # Scroll-reveal hook (IntersectionObserver)
├── public/
│   └── images/
│       ├── moeid.png            # Hero photo
│       └── og-image.png         # Social share preview image (placeholder)
├── tailwind.config.ts         # Design tokens (colors, fonts, max-width)
├── postcss.config.js          # Wires Tailwind into the CSS build
├── next.config.js             # Next.js build/runtime settings
├── tsconfig.json              # TypeScript compiler settings, @/ path alias
├── package.json                # Dependencies and npm scripts
├── package-lock.json           # Exact locked dependency versions (generated)
├── next-env.d.ts                # Next.js TypeScript ambient types (generated)
└── README.md                    # Setup instructions + outstanding TODOs
```

---

## File-by-File Documentation

### `app/layout.tsx`

**Purpose:** The root HTML document. Every page (currently just the one) is
rendered inside this. It sets up fonts and the `<head>` metadata (page
title, description, Open Graph / Twitter preview tags).

**Responsibilities:**
- Loads the three Google Fonts via `next/font/google` (`Space_Grotesk`,
  `Inter`, `JetBrains_Mono`) and exposes each as a CSS variable
  (`--font-display`, `--font-body`, `--font-mono`).
- Builds the `metadata` object Next.js uses to populate `<title>`,
  `<meta name="description">`, and Open Graph/Twitter share-card tags.
- Renders the outer `<html>`/`<body>` and attaches the font CSS variables
  plus the default body font class to `<body>`.

**Important components:** `RootLayout` (default export) — wraps
`{children}`, which is `app/page.tsx`'s output.

**Dependencies / Related files:** Reads `site` from `data/site.ts` for the
title, description, and URL. Imports `./globals.css` (this is the only
place global CSS is imported — removing this import would break all
styling). The font CSS variables it defines are consumed by
`tailwind.config.ts` (`fontFamily.display/body/mono`).

**Safe to modify:** The page `title`/`description` text (via `data/site.ts`,
not here directly — see below), swapping font families, adding more
`<head>` tags (favicon, additional meta tags) inside the `metadata` object
or JSX.

**Be careful with:** The `metadataBase: new URL(site.url)` line requires
`site.url` in `data/site.ts` to be a valid absolute URL — if that's ever
malformed, the build throws. Removing a font import without also removing
its usage in `tailwind.config.ts`/CSS will break the corresponding
`font-display`/`font-body`/`font-mono` Tailwind classes site-wide.

**What can break:** Deleting `import "./globals.css"` removes all styling
from the entire site (it cascades to every page since this is the root
layout). Changing a font `variable` name here without updating
`tailwind.config.ts` breaks that font everywhere it's used.

---

### `app/page.tsx`

**Purpose:** The homepage. Its only job is to lay out the sections in
order.

**Responsibilities:** Imports and renders, top to bottom: `Header`, `Hero`,
`Projects`, `Skills`, `Capabilities`, `About`, `Contact`, `Footer`, plus the
floating `BackToTop` button. `Header` and `BackToTop` are rendered outside
`<main>` since they're fixed-position overlays, not in-flow content.

**Important components:** `Home` (default export).

**Dependencies / Related files:** Imports every file in
`components/sections/` and `components/ui/BackToTop.tsx`.

**Safe to modify:** **This is the file to edit if you want to reorder
sections, remove a section entirely, or add a new one.** Just reorder,
comment out, or add a JSX line — each section is self-contained.

**Be careful with:** If you reorder sections, also update the `index="0X"`
props passed to `SectionHeading` inside the affected section files
(`Projects.tsx` uses `"01"`, `Skills.tsx` `"02"`, `Capabilities.tsx`
`"03"`, `About.tsx` `"04"`) so the numbering stays sequential. Also check
`data/site.ts`'s `navItems` (the header nav links) and each section's
`id="..."` attribute — the nav links jump to `#projects`, `#skills`,
`#about`, `#contact` by anchor ID, so renaming or removing a section's `id`
breaks that nav link and the "View Projects"/"Get in Touch" buttons that
point at `#projects`/`#contact`.

**What can break:** Removing `<Header />` or `<Footer />` removes site-wide
navigation. Removing `<BackToTop />` removes the back-to-top button (it's
otherwise harmless to remove — it's fully self-contained).

---

### `app/globals.css`

**Purpose:** Site-wide CSS: theme color variables, base element styles, the
scroll-reveal animation mechanics, and accessibility affordances.

**Responsibilities:**
- Defines the entire color palette as CSS custom properties on `:root`:
  `--color-background`, `--color-surface`, `--color-foreground`,
  `--color-muted`, `--color-border`, `--color-accent`,
  `--color-accent-dim`. These are the single source of truth for every
  color used across the site (Tailwind just aliases them — see
  `tailwind.config.ts`).
- Sets `border-color` globally to the border token, smooth-scrolling
  behavior, and `scroll-padding-top` (so anchor-jump navigation doesn't
  tuck content under the fixed header).
- Defines `::selection` (text-selection highlight) color and visible
  keyboard focus outlines (`:focus-visible`) — an accessibility
  requirement from the original project brief.
- Defines the `[data-reveal]` / `[data-reveal="visible"]` CSS pair that
  drives the fade-up scroll animation, plus a `prefers-reduced-motion`
  override that disables it for users who've asked their OS to reduce
  motion.

**Dependencies / Related files:** Imported once, only from
`app/layout.tsx`. The color variables here are referenced both by
`tailwind.config.ts` (as `var(--color-*)`, so Tailwind classes like
`bg-background` or `text-accent` work) and directly inline by SVG
illustrations (`ProjectIllustrations.tsx`, `About.tsx`'s
`AbstractGraphic`), which use `stroke="var(--color-accent)"` instead of a
Tailwind class because SVG attributes don't accept Tailwind utility
classes.

**Safe to modify:** **This is the file to edit to change the site's color
scheme.** Change any of the six `--color-*` hex values and the change
propagates everywhere automatically — cards, buttons, text, borders, SVG
illustrations, all of it. Also safe: tweaking the fade-up distance/duration
in `[data-reveal]`, adjusting `scroll-padding-top` if you change the
header's height.

**Be careful with:** Renaming any `--color-*` variable requires updating
`tailwind.config.ts`'s `theme.extend.colors` block to match (they're wired
together by name), plus every inline SVG that references
`var(--color-accent)` directly. Removing the `[data-reveal]` rules breaks
the fade-up animation for every section (they'd just always be visible at
opacity 1, since `Reveal.tsx` only toggles the `data-reveal` attribute —
the actual animation lives here).

**What can break:** Deleting `--color-accent` (or renaming it without
updating the ~15 other references across Tailwind config, SVGs, and
component classes) will cause `var(--color-accent)` to resolve to nothing,
turning the accent blue transparent/invisible across the whole site.

---

### `types/index.ts`

**Purpose:** The shared TypeScript "shape" for every content type. This is
what makes the `data/` files type-checked — if a project object in
`data/projects.ts` is missing a required field or has a typo'd `status`
value, TypeScript will flag it at build time instead of silently rendering
wrong.

**Responsibilities:** Defines five interfaces: `Project`, `SkillCategory`,
`Capability`, `ContactLink`, `NavItem`.

**Important components:**
- `Project.status` is a **union of exact strings**: `"In progress" |
  "Completed" | "Actively in development" | "Local demo available"`. You cannot use
  any other string here without also adding it to this union (and to
  `StatusBadge.tsx`'s `dotColor` map, see below).
- `Project.illustration` is likewise a closed union: `"shopmate" |
  "vpnvend" | "mediabot" | "firesystem"`. This must match a key in
  `ProjectIllustrations.tsx`'s `illustrationMap`.

**Dependencies / Related files:** Imported by every file in `data/`, by
`StatusBadge.tsx`, and by `ProjectIllustrations.tsx`.

**Safe to modify:** Adding optional fields (with `?`) to any interface is
always safe — existing data objects remain valid. Adding a new value to
the `status` or `illustration` unions is safe **as long as** you also
handle it in `StatusBadge.tsx` / `ProjectIllustrations.tsx` respectively
(see those files' notes).

**Be careful with:** Removing or renaming a field that's used in a
component (e.g. renaming `Project.github` to `Project.repo`) requires
updating every place that reads `project.github` — currently just
`Projects.tsx`.

**What can break:** If you add a 5th project with a `status` value not in
the union (e.g. `"Planned"`), TypeScript will fail the build with a type
error at the point where that object is assigned to `Project[]`. This is
intentional — it stops a typo from silently rendering as a blank badge.

---

### `data/site.ts`

**Purpose:** Site identity and global links: your name, title, tagline,
location, the header nav items, and every outbound social/contact URL.

**Responsibilities:**
- `site` object: `name`, `initials` (shown in the header wordmark),
  `title`, `tagline`, `location`, `age`, `university`, `url` (canonical
  site URL used in metadata), `description` (meta description).
- `navItems`: the four links in the header nav (`Projects`, `Skills`,
  `About`, `Contact`), each an anchor (`#id`) into the page.
- `socialLinks`: `github`, `email` (as a `mailto:` link), `telegram`,
  `whatsapp`. **`email` and `whatsapp` are still placeholder values**,
  flagged with a `TODO` comment — replace before deploying.

**Dependencies / Related files:** Imported by `app/layout.tsx` (metadata),
`Header.tsx` (wordmark + nav), `Hero.tsx` (name, title, tagline, location,
social icon row), `About.tsx` (location/age line), `Footer.tsx` (email/
GitHub icons), and indirectly by `data/contact.ts` (which imports
`socialLinks` to build the Contact section's link list).

**Safe to modify:** **This is the first file to edit for most content
changes** — your name, tagline, location, age, and all outbound links live
here as plain strings. Adding/reordering `navItems` is safe as long as the
`href` matches an existing section `id` (see `app/page.tsx` notes).

**Be careful with:** `url` must stay a valid absolute URL (used in
`new URL(site.url)` in `layout.tsx` — an invalid value throws at build
time). If you rename a key in `socialLinks` (e.g. `whatsapp` →
`whatsappUrl`), you must also update `data/contact.ts` and `Hero.tsx`,
which both reference `socialLinks.whatsapp`/`socialLinks.github`/etc. by
name.

**What can break:** A malformed `url` breaks the entire build (not just a
visual issue). A broken/missing key that another file destructures (e.g.
deleting `socialLinks.telegram` while `Hero.tsx` still references it) will
throw a runtime error.

---

### `data/projects.ts`

**Purpose:** The four project cards shown in the Selected Projects section.

**Responsibilities:** Exports `projects: Project[]`, an array of four
objects (ShopMate Agent, VPN Vend, Media Download Bot, Smart Fire
Management System), each with `slug`, `title`, `description`, `tech[]`,
`status`, `github`, and `illustration`.

**Dependencies / Related files:** Rendered by `components/sections/
Projects.tsx`, which maps over this array. Each object's `illustration`
value must match a key in `ProjectIllustrations.tsx`'s `illustrationMap`
(`"shopmate" | "vpnvend" | "mediabot" | "firesystem"`). Each `status` value
must be one of the four strings defined in `types/index.ts` and present in
`StatusBadge.tsx`'s `dotColor` map.

**Safe to modify:** Editing `title`, `description`, `tech`, `github`, and
`status` (to an existing allowed value) on any existing project is fully
safe and just changes displayed text. Reordering the array reorders the
cards.

**Be careful with:** Adding a **5th project** (the pending game project
mentioned in the README) requires three coordinated steps: (1) add a new
`illustration` value to the union in `types/index.ts`, (2) write a matching
SVG component and add it to `illustrationMap` in
`ProjectIllustrations.tsx`, (3) add the project object here. Skipping step
1 or 2 causes a TypeScript error or a blank illustration area. Setting
`status` to a string not in the union breaks the build.

**What can break:** A typo'd `illustration` value (e.g. `"shopmate "` with
a trailing space) will fail type-checking, not silently render — that's by
design.

---

### `data/skills.ts`

**Purpose:** The six skill category groups shown as tag clusters in the
Skills section.

**Responsibilities:** Exports `skillCategories: SkillCategory[]` — each
entry has a `category` name, an optional `note` (currently only
"Databases / Data" uses this, showing "Still developing" next to the
heading), and a `skills: string[]` array rendered as individual `Tag`
chips.

**Dependencies / Related files:** Rendered by `components/sections/
Skills.tsx`.

**Safe to modify:** Fully safe to add/remove/rename skills within a
category, add/remove a `note`, reorder categories, or add a whole new
category object — `Skills.tsx` just maps over whatever's in the array, no
coordination needed elsewhere.

**Be careful with:** Nothing structural — this is one of the lowest-risk
files in the project to edit.

**What can break:** Essentially nothing beyond a content typo. There's no
closed union or cross-file reference for skill categories.

---

### `data/capabilities.ts`

**Purpose:** The five "What I Can Build" cards, plus the quieter closing
line about embedded/hardware work.

**Responsibilities:** Exports `capabilities: Capability[]` (`title`,
`description`, `icon`) and a separate `embeddedNote` string.

**Important components:** `icon` must be a valid **exported component name
from the `lucide-react` icon library** (e.g. `"Send"`, `"Sparkles"`,
`"Server"`, `"Database"`, `"Cog"`) — it's looked up dynamically by string
in `Capabilities.tsx`.

**Dependencies / Related files:** Rendered by `components/sections/
Capabilities.tsx`.

**Safe to modify:** Editing `title`/`description` text, reordering cards,
and editing `embeddedNote` are all safe.

**Be careful with:** If you change an `icon` value, it must exactly match
an export name from `lucide-react` (case-sensitive, e.g. `"Send"` not
`"send"` or `"SendIcon"`). Browse available names at
[lucide.dev/icons](https://lucide.dev/icons) — the sidebar shows exact
export names.

**What can break:** An invalid `icon` string doesn't crash the build (the
lookup in `Capabilities.tsx` is `Icons[capability.icon]`, which returns
`undefined` for an unknown name) — the icon just silently fails to render
and the card shows text only, with no error. Worth double-checking
visually after changing an icon name, since nothing will warn you.

---

### `data/contact.ts`

**Purpose:** The list of links shown in the Contact section.

**Responsibilities:** Exports `contactLinks: ContactLink[]`, each with
`label`, `href`, `icon` (a lucide-react name), and `variant` (`"primary" |
"secondary" | "disabled"`). Email and Telegram are `"primary"`, WhatsApp and
GitHub are `"secondary"`, LinkedIn is `"disabled"`.

**Important:** `Contact.tsx` currently renders primary and secondary links
identically (all as filled `Button`s) and only uses each link's `label` and
`href`, so the `icon` field is unused at the moment.

**Dependencies / Related files:** Imports `socialLinks` from `data/site.ts` for
most `href` values (LinkedIn's `href` is the placeholder `"#"`). Rendered by
`components/sections/Contact.tsx`.

**Safe to modify:** Reordering, relabeling, or changing which link is primary
vs. secondary. To activate LinkedIn, change its `variant` to `"secondary"` (or
`"primary"`) and set a real `href`. **Also edit `Footer.tsx`**, where LinkedIn
is hard-coded as a disabled link and does not read from this file.

**Be careful with:** `Contact.tsx` expects `variant` to be exactly one of the
three strings. Anything else means that link silently disappears.

**What can break:** A typo'd `variant` (e.g. `"Primary"`) removes the link from
the page with no error.

---

### `lib/utils.ts`

**Purpose:** A single tiny helper, `cn()`, used everywhere Tailwind classes
are combined conditionally.

**Responsibilities:** `cn(...classes)` filters out `false`/`null`/
`undefined`/empty values and joins the rest with a space. This is the
project's stand-in for the common `clsx`/`cva` pattern, written by hand to
avoid an extra dependency (per the "no `cva` or variant library" decision
in the technical architecture).

**Dependencies / Related files:** Imported by nearly every component in
`components/ui/` and several in `components/sections/` (anywhere you see
`className={cn(...)}`).

**Safe to modify:** Low-risk to extend (e.g. adding class-merging/
deduplication logic), but not necessary for typical content changes.

**Be careful with:** This function is used pervasively — a change to its
behavior (e.g. how it joins classes) affects styling across the entire
site simultaneously.

**What can break:** Breaking this function's signature or return type
would cause a compile error everywhere it's called (there are ~15 call
sites).

---

### `lib/useInView.ts`

**Purpose:** A custom React hook that detects when an element scrolls into
the viewport, using the browser's native `IntersectionObserver`. This is
the mechanism behind every section's fade-up-on-scroll effect.

**Responsibilities:** Returns `{ ref, isVisible }`. Attach `ref` to any
element; `isVisible` flips from `false` to `true` (once, permanently) the
first time that element enters the viewport. Also checks
`prefers-reduced-motion` on mount and immediately sets `isVisible: true`
without ever creating an observer, if the user has that OS/browser setting
enabled.

**Dependencies / Related files:** Used exclusively by `components/ui/
Reveal.tsx`, which pairs it with the `[data-reveal]` CSS in
`globals.css`.

**Safe to modify:** The `threshold` parameter (default `0.15`, meaning
15% of the element must be visible before it triggers) can be tuned freely
if you want the reveal to trigger earlier/later.

**Be careful with:** This is a `"use client"` file — it uses browser-only
APIs (`window`, `IntersectionObserver`) and cannot be imported into a
Server Component directly; it's only ever used inside `Reveal.tsx`, which
is itself a Client Component.

**What can break:** Removing the reduced-motion check would make the site
ignore that accessibility preference (content would stay invisible/
animate for users who've asked not to see motion, which is one of the
project's stated accessibility requirements).

---

## `components/ui/` — Shared Primitives

These are the lowest-level, most-reused building blocks. **A change to any
file in this folder affects every section that uses it simultaneously** —
that's the point of having them, but also the main risk.

### `components/ui/Button.tsx`

**Purpose:** The pill-shaped CTA button used in the Header, Hero, and
Contact sections.

**Responsibilities:** Renders an `<a>` tag (not a `<button>` — every "Button"
in this site is actually a link) with two visual `variant`s: `"primary"`
(filled, accent background) and `"outline"` (bordered, transparent).
Accepts and spreads all standard anchor props (`href`, `target`, `onClick`,
etc.) via `...props`.

**Dependencies / Related files:** Uses `cn()` from `lib/utils.ts`. Used by
`Header.tsx` ("Get in Touch"), `Hero.tsx` ("View Projects", "Get in
Touch"), `Contact.tsx` (Email/Telegram primary buttons).

**Current state:** `Button.tsx` is now a `"use client"` component and has a
third variant, `"soft-red"` (muted red, used by `Contact.tsx` for the
unavailable LinkedIn button). Variants: `primary`, `outline`, `soft-red`.

**Safe to modify:** Visual tweaks (padding, border radius, hover
transition) are safe and apply everywhere at once — that's usually what
you want for a design-system component. Adding a third `variant` is safe
if you also handle it in the conditional classes.

**Be careful with:** Since it always renders an `<a>`, don't pass it a
`type="submit"` expecting button-form behavior — it won't work (there's no
`<form>` on this site regardless, per project convention).

**What can break:** A syntax error here breaks every CTA button on the
site simultaneously (it's used in 3 different sections).

---

### `components/ui/Card.tsx`

**Purpose:** The shared bordered-box shell used for project cards,
capability cards, and (indirectly, via composition) nothing else.

**Responsibilities:** A `<div>` with the standard border/radius/padding/
hover-lift treatment. Accepts `className` to extend/override, and spreads
remaining `HTMLAttributes`.

**Dependencies / Related files:** Used by `Projects.tsx` (with
`className="flex h-full flex-col p-0"` to override the default padding,
since project cards need a full-bleed illustration at the top) and
`Capabilities.tsx` (default padding, no override).

**Safe to modify:** Adjusting border color/radius, padding, or the hover
animation (`hover:-translate-y-1`) changes both Projects and Capabilities
cards at once.

**Be careful with:** If you change the default `p-6` padding, remember
`Projects.tsx` explicitly overrides it to `p-0` and re-applies padding
manually inside (`<div className="... p-6">` around the text content) —
so a global padding change won't visually affect project cards the same
way it affects capability cards.

**What can break:** Low risk — this is a simple presentational wrapper.

---

### `components/ui/Tag.tsx`

**Purpose:** The small pill-shaped chip used for tech-stack labels
(Projects) and skill names (Skills).

**Responsibilities:** A `<span>` styled as a rounded, bordered, monospace-
text pill.

**Dependencies / Related files:** Used by `Projects.tsx` (one per item in
`project.tech`) and `Skills.tsx` (one per item in `category.skills`).

**Safe to modify:** Fully safe to restyle — affects both usages
identically.

**What can break:** Nothing structural; purely visual.

---

### `components/ui/StatusBadge.tsx`

**Purpose:** The small dot + label shown on each project card ("In
progress", "Completed", etc.).

**Responsibilities:** Maps a `Project["status"]` value to a dot color via
the `dotColor` record, then renders a colored dot + the status text.
Currently three of the four statuses (`Completed`, `In progress`,
`Actively in development`) use the accent color dot, and only `Local demo available`
uses the muted gray dot.

**Dependencies / Related files:** Imports the `Project` type from
`types/index.ts` — **`dotColor` is a `Record<Project["status"], string>`,
meaning TypeScript enforces that this object has an entry for every status
value in the union.** Used only by `Projects.tsx`.

**Safe to modify:** Changing which statuses map to which dot color is
safe and self-contained.

**Be careful with:** **If you add a new status value to the union in
`types/index.ts`, this file's `dotColor` map must also get a new entry for
it, or the build fails** (TypeScript will report the `Record` is missing a
key) — this is one of the few places where adding a value to that union
has an immediate, required follow-up.

**What can break:** Build failure (not a silent bug) if the status union
and this map ever go out of sync — TypeScript catches it for you.

---

### `components/ui/SectionHeading.tsx`

**Purpose:** The reusable heading pattern used at the top of Projects,
Skills, Capabilities, About, and Contact: an optional monospace index
number + thin rule, the heading text, and an optional description line.

**Responsibilities:** Renders `index` (optional — Contact's heading omits
it, since the page spec didn't call for a number on Contact), `title`
(required), `description` (optional), and `align` (`"left" | "center"` —
only Contact uses `"center"`).

**Dependencies / Related files:** Used by `Projects.tsx` (`index="01"`),
`Skills.tsx` (`index="02"`), `Capabilities.tsx` (`index="03"`),
`About.tsx` (`index="04"`), and `Contact.tsx` (no `index` prop passed).

**Safe to modify:** Text/typography styling changes here apply to every
section heading on the site at once — usually what you want for
consistency.

**Be careful with:** If you reorder sections in `app/page.tsx`, remember to
update the `index="0X"` values passed into each section's `<SectionHeading
/>` call so the numbers stay sequential (this component doesn't
auto-number — each call site hardcodes its own number).

**What can break:** Low risk — worst case is a visually wrong index number
if sections are reordered without updating the props.

---

### `components/ui/IconLink.tsx`

**Purpose:** A social/contact link with a lucide icon and a label, with a
special "disabled" rendering for links that do not exist yet (LinkedIn).

**Responsibilities:** Looks up an icon component by string name from
`lucide-react`. If `disabled` is true, renders a non-clickable `<span>` whose
visible text is the label plus "(currently unavailable)" (its `aria-label` still
says "coming soon", a small mismatch you may want to align). Otherwise renders
a real link and adds `target="_blank" rel="noopener noreferrer"` only when the
`href` starts with `"http"`.

**Dependencies / Related files:** Used by `Hero.tsx` (GitHub/Telegram/Email
row) and `Footer.tsx` (Email/GitHub/LinkedIn). **It is no longer used by
`Contact.tsx`**, which now renders everything through `Button`.

**Safe to modify:** Visual styling. The `icon` prop follows the same
lucide-react naming rule as `data/capabilities.ts`.

**What can break:** An invalid `icon` name silently renders no icon (the label
still shows).

---

### `components/ui/BackToTop.tsx`

**Purpose:** The floating circular button that appears once you scroll
near the footer, and smooth-scrolls back to the top when clicked.

**Responsibilities:** Uses an `IntersectionObserver` (its own, separate
from `useInView.ts`) watching for the element with `id="site-footer"` to
enter the viewport; toggles its own visibility accordingly. On click,
calls `window.scrollTo({ top: 0, behavior: "smooth" })`.

**Dependencies / Related files:** **Depends on `id="site-footer"` existing
somewhere on the page** — currently set on the `<footer>` element in
`Footer.tsx`. Rendered once, in `app/page.tsx`, outside `<main>`.

**Safe to modify:** The `threshold: 0.2` (how much of the footer must be
visible before the button appears) and the styling are safe to tune.

**Be careful with:** **If you ever rename or remove the `id="site-footer"`
attribute in `Footer.tsx`, this component's observer finds nothing
(`document.getElementById` returns `null`) and the button will simply
never appear — no error, just silently broken.**

**What can break:** As above — a renamed footer ID silently disables the
whole feature.

---

### `components/ui/Reveal.tsx`

**Purpose:** The wrapper component that gives every section its fade-up-
on-scroll entrance. This is the piece that ties `useInView.ts` (the
detection logic) to the `[data-reveal]` CSS (the actual animation) in
`globals.css`.

**Responsibilities:** Wraps `children` in a `<div>`, attaches the
`useInView` ref to it, and sets `data-reveal="visible"` once the element
has scrolled into view (before that, the attribute is simply absent,
which is what makes the CSS start it hidden). Accepts an optional `delay`
(ms) prop, applied as an inline `transitionDelay` — used to stagger
multiple cards in the same section (e.g. each project card gets
`delay={i * 80}`).

**Dependencies / Related files:** Uses `useInView` from
`lib/useInView.ts`. Wraps content inside **every** section component
(`Header.tsx` is the only section that doesn't use it, since it's always
visible at the top and isn't meant to "reveal").

**Safe to modify:** The stagger `delay` values passed at each call site
(in the section files) are safe to tune for pacing.

**Be careful with:** This is a `"use client"` component because it uses
the `useInView` hook. Don't remove the `"use client"` directive — it would
break, since hooks can't run in Server Components.

**What can break:** Removing this wrapper from a section makes that
section render instantly with no animation (harmless) — but removing the
`[data-reveal]` CSS rules from `globals.css` while keeping this component
would leave elements permanently at `opacity: 0` if reduced-motion isn't
active, since the *only* thing that sets opacity back to 1 is that CSS
rule matching the attribute this component sets.

---

## `components/sections/` — Page Sections

Each file here is a single section of the page, matching the finalized
page specification 1:1. All of them import their content from a
`data/*.ts` file and their look-and-feel from `components/ui/`.

### `components/sections/Header.tsx`

**Purpose:** The sticky top navigation bar.

**Responsibilities:** Tracks scroll position (`useEffect` + a `scroll`
event listener) to toggle a blurred/bordered background once the user
scrolls past 8px (`scrolled` state). Renders the "MG" wordmark (from
`site.initials`), the four nav links (from `navItems`), a "Get in Touch"
button, and a hamburger menu that toggles a mobile dropdown below 768px
(Tailwind's `md:` breakpoint).

**Important components:** `Header` — the only exported component. Internal
state: `scrolled` (blur/border toggle), `menuOpen` (mobile menu toggle).

**Dependencies / Related files:** Reads `navItems` and `site.initials` from
`data/site.ts`. Uses `Button` from `components/ui/Button.tsx`. This is a
`"use client"` component (needs `useState`/`useEffect` for scroll
tracking and menu toggling).

**Safe to modify:** The scroll threshold (`window.scrollY > 8`), the mobile
breakpoint (currently Tailwind's `md:`, i.e. 768px), and all styling are
safe to adjust.

**Be careful with:** The nav links' `href`s are anchor IDs (`#projects`,
etc.) that must match `id` attributes on the actual sections — see
`app/page.tsx` notes on reordering sections.

**What can break:** Removing the `"use client"` directive would break the
scroll-tracking and menu-toggle state entirely (Server Components can't
use `useState`).

---

### `components/sections/Hero.tsx`

**Purpose:** The top-of-page introduction: name, title, tagline, location,
CTAs, social icons, and your photo.

**Responsibilities:** Two-column layout (stacks to one column on mobile via
`flex-col-reverse` → `md:flex-row`, so the photo appears above the text on
mobile but beside it on desktop). Left column: the accent vertical rule +
name/title, tagline, location tag, the two CTA buttons, and the GitHub/
Telegram/Email icon row. Right column: the photo, inside a bordered square
frame with four corner-bracket accents (the "viewfinder" detail from the
approved mockup) and a `grayscale(1) contrast(1.1)` CSS filter for the
duotone look.

**Dependencies / Related files:** Reads `site` and `socialLinks` from
`data/site.ts`. Uses `Button`, `IconLink`, `Reveal` from `components/ui/`.
Uses Next.js's `<Image>` component pointed at `/public/images/moeid.png`.

**Current state of the photo filter:** the filter has been removed in the code.
The `<Image>` className is just `object-cover`, so the photo shows in full
colour. The filter description above is the original design; add
`[filter:grayscale(1)_contrast(1.1)]` back to the className to restore it.

**Safe to modify:** All text is pulled from `data/site.ts`, so change it
there rather than here. The photo filter (currently full grayscale +
slight contrast boost) is a one-line CSS change:
`className="object-cover [filter:grayscale(1)_contrast(1.1)]"` — remove
the `[filter:...]` class entirely for full color, or adjust the
percentages for partial desaturation. Frame size (`h-48 w-48 sm:h-64
sm:w-64`) is safe to resize.

**Be careful with:** The `<Image>` component's `src` path is relative to
`public/` (`/images/moeid.png` → `public/images/moeid.png`). If you swap
in a differently-named file, update `src` to match, and make sure the new
file actually exists in `public/images/` — Next's `<Image>` won't error
at build time for a missing file, but it will 404 in the browser.

**What can break:** Nothing structural — this file is fairly
self-contained. The main risk is a broken image path (silent 404, not a
build error).

---

### `components/sections/Projects.tsx`

**Purpose:** The Selected Projects grid (2 columns on `sm:` and up, 1
column on mobile).

**Responsibilities:** Maps over `projects` from `data/projects.ts`,
rendering each as a `Card` with: an illustration header (via
`ProjectIllustration`), title + `StatusBadge`, description, tech `Tag`
pills, and a "View on GitHub" link. Each card fades in with a staggered
delay (`delay={i * 80}`).

**Dependencies / Related files:** Reads `projects` from
`data/projects.ts`. Uses `SectionHeading`, `Card`, `Tag`, `StatusBadge`,
`Reveal` from `components/ui/`, and `ProjectIllustration` from
`ProjectIllustrations.tsx`.

**Safe to modify:** Grid column counts (`sm:grid-cols-2`), spacing, and the
stagger delay multiplier are safe to tune. Card content itself should be
edited in `data/projects.ts`, not here.

**Be careful with:** This file assumes every project has a valid
`illustration` key that exists in `ProjectIllustrations.tsx`'s map —
enforced by TypeScript via the shared union type, so a mismatch is a build
error, not a runtime surprise.

**What can break:** Low risk given the type-checking safety net described
above.

---

### `components/sections/ProjectIllustrations.tsx`

**Purpose:** The four hand-drawn flat-style SVG line-art icons shown at
the top of each project card (a chat-bubble+cart glyph for ShopMate, a
shield+lock for VPN Vend, a download-arrow+play glyph for the media bot,
a flame+sensor glyph for the fire system).

**Responsibilities:** Four small internal SVG components
(`ShopMateIllustration`, `VpnVendIllustration`, `MediaBotIllustration`,
`FireSystemIllustration`), a `shared` object of common SVG stroke props
they all spread in, and `illustrationMap` — a lookup from the
`Project["illustration"]` string union to the matching component. Exports
one public component, `ProjectIllustration`, which does the lookup and
renders.

**Dependencies / Related files:** Imports the `Project` type from
`types/index.ts`. Used only by `Projects.tsx`. All strokes/fills use
`var(--color-accent)` — i.e. they automatically pick up whatever the
accent color is set to in `globals.css`, with no code change needed.

**Safe to modify:** Tweaking the SVG path data to adjust an illustration's
shape is safe but fiddly (hand-written path coordinates, no visual
editor). Safer: adjust `strokeWidth` or opacity in the `shared` object,
which affects all four uniformly.

**Be careful with:** **Adding a 5th illustration (for the pending game
project) requires three things in sync:** a new SVG component function
here, a new entry in `illustrationMap` here, and a new value added to the
`illustration` union in `types/index.ts`. Missing any one of the three
causes a TypeScript error.

**What can break:** A `viewBox` mismatch or malformed path `d` attribute
won't break the build (SVG errors are silent in the browser) — it'll just
render a blank or visually broken icon. Worth eyeballing in-browser after
editing path data.

---

### `components/sections/Skills.tsx`

**Purpose:** The Skills section — category headings with tag clusters
underneath.

**Responsibilities:** Maps over `skillCategories` from `data/skills.ts`,
rendering each category's name (+ optional `note`, e.g. "Still
developing") followed by a wrapped row of `Tag` chips for that category's
skills.

**Dependencies / Related files:** Reads `skillCategories` from
`data/skills.ts`. Uses `SectionHeading`, `Tag`, `Reveal`.

**Safe to modify:** Grid column counts (`sm:grid-cols-2 lg:grid-cols-3`)
and spacing are safe. Content changes belong in `data/skills.ts`.

**What can break:** Very low risk — no cross-file type constraints beyond
the basic `SkillCategory` shape.

---

### `components/sections/Capabilities.tsx`

**Purpose:** The "What I Can Build" 5-card grid, plus the closing embedded-
work line.

**Responsibilities:** Maps over `capabilities` from
`data/capabilities.ts`, rendering each as a `Card` with a lucide icon
(looked up dynamically by name string, same pattern as `IconLink.tsx`),
title, and description. Renders `embeddedNote` below the grid as a plain
quiet paragraph (intentionally not its own card, per the finalized design
decision that embedded work is a low-priority mention, not a headline
capability).

**Dependencies / Related files:** Reads `capabilities` and `embeddedNote`
from `data/capabilities.ts`. Uses `SectionHeading`, `Card`, `Reveal`.

**Safe to modify:** Grid columns, spacing, icon size — all safe. Content
changes belong in `data/capabilities.ts`.

**Be careful with:** Same dynamic icon-lookup caveat as elsewhere — an
invalid `icon` string in the data file silently renders no icon here, with
no build error.

---

### `components/sections/About.tsx`

**Purpose:** The About section — two short paragraphs of bio text plus an
abstract geometric SVG graphic (deliberately not a second photo, per the
finalized design decision to keep the Hero photo as the only real photo on
the site).

**Responsibilities:** Renders the bio copy (currently hardcoded directly
in this file, not pulled from `data/` — see note below), a small monospace
location/age line pulled from `site.location`/`site.age`, and the
`AbstractGraphic` internal component (three overlapping outlined shapes:
a square, a circle, a rotated square, connected by a thin line, all using
`var(--color-accent)`).

**Dependencies / Related files:** Reads `site.location` and `site.age`
from `data/site.ts`. Uses `SectionHeading`, `Reveal`.

**Safe to modify:** The `AbstractGraphic`'s shapes, positions, and
opacities are safe to adjust for a different abstract composition.

**Be careful with:** **Unlike every other section, the bio paragraph text
here is hardcoded inline in the JSX, not sourced from a `data/` file.**
If you want to edit your bio, edit the two `<p>` tags directly in this
file — there's no `data/about.ts` to look in. (This was a deliberate
simplification since the bio is prose, not a list of structured items like
projects/skills/capabilities.)

**What can break:** Low risk — mostly static text and a self-contained
inline SVG.

---

### `components/sections/Contact.tsx`

**Purpose:** The centered Contact section.

**Client Component:** the file starts with `"use client"`. This is required,
not optional. The disabled LinkedIn button is given an `onClick` (to
`preventDefault`), and a Server Component cannot pass a function to `Button` or
`Reveal` (both Client Components). Without `"use client"` the page returns a 500
with "Event handlers cannot be passed to Client Component props".

**Responsibilities:** Splits `contactLinks` into three groups by `variant`.
Primary (Email, Telegram) and secondary (WhatsApp, GitHub) links are **both
rendered as filled `primary` Buttons**, so they look identical. Disabled links
(LinkedIn) render as a `soft-red` Button with `href` undefined,
`aria-disabled="true"`, `tabIndex={-1}`, and the text "{label} (currently
unavailable)".

**Dependencies / Related files:** `contactLinks` from `data/contact.ts`;
`SectionHeading` (no `index` prop, Contact has no number); `Button`; `Reveal`.

**Differs from the page spec:** the spec called for two large primary buttons
plus smaller secondary icon links and a muted "Coming soon" LinkedIn. The
current code is simpler. Either update the spec or restyle this section.

**Safe to modify:** Layout/spacing and the disabled-button text. If you would
rather keep this file a Server Component, remove the `onClick` and use
`pointer-events-none` in the class list instead, then drop `"use client"`.

**What can break:** Removing `"use client"` while the `onClick` exists brings
back the 500 error. A typo'd `variant` in the data file makes that link vanish.

---

### `components/sections/Footer.tsx`

**Purpose:** The slim footer row: name, copyright, and three icon links.

**Responsibilities:** Computes the current year with `new Date
().getFullYear()` (so the copyright year updates automatically every year
with no manual edits needed). Renders name, "© {year} {name}", and Email/
GitHub/disabled-LinkedIn `IconLink`s.

**Dependencies / Related files:** Reads `site.name` and `socialLinks` from
`data/site.ts`. Uses `IconLink`. **Sets `id="site-footer"` on the
`<footer>` element — this is a load-bearing ID that `BackToTop.tsx`
depends on to know when to appear.**

**Safe to modify:** Adding/removing icon links, text styling. The LinkedIn entry is hard-coded here (`href="#"`, `disabled`) and does not read from `data/contact.ts`, so activating LinkedIn means editing this file as well.

**Be careful with:** **Do not rename or remove `id="site-footer"`
without also updating `BackToTop.tsx`** — that ID is the only thing
connecting the two files (see `BackToTop.tsx` notes above).

**What can break:** As noted — renaming this ID silently disables the
back-to-top button.

---

## Configuration Files

### `tailwind.config.ts`

**What it controls:** Tailwind's design tokens for this project — which
files Tailwind scans for class names (`content`), the custom color
palette, font family mappings, the shared max page width, and a couple of
extra utilities.

**Key sections:**
- `content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"]` — this
  tells Tailwind which files to scan when deciding which CSS to generate.
  **If you add a new folder of components outside `app/` or
  `components/`, you must add it here or its Tailwind classes won't be
  included in the final CSS.**
- `colors`: aliases Tailwind color names (`background`, `surface`,
  `foreground`, `muted`, `border`, `accent`, `accent-dim`) to the CSS
  variables defined in `globals.css`. This is what makes `bg-background`,
  `text-accent`, `border-border`, etc. work as Tailwind classes.
- `fontFamily`: `display`/`body`/`mono` map to the CSS variables set by
  `next/font/google` in `layout.tsx`.
- `maxWidth.content: "1120px"` — the shared max-width used by every
  section's outer wrapper (`max-w-content`), controlling the page's
  overall content width.
- `backgroundImage`/`backgroundSize` (`dot-grid`) and `keyframes`/
  `animation` (`fade-up`) are defined but **currently unused** anywhere in
  the codebase — they were scaffolded per the approved mockup's "subtle
  background dot/grid texture used sparingly" note but never applied.
  Safe to use if you want that texture, or safe to delete if you'd rather
  keep the config lean.

**Safe to change:** `maxWidth.content` (changes the site's overall
width), any `colors` hex-free alias (they just point at the CSS
variables, so change the variables in `globals.css` instead — changing
the names here without updating `globals.css` and every Tailwind class
that uses them is not recommended).

**Values with dependencies elsewhere:** The `colors` and `fontFamily` keys
are directly tied to `globals.css` and `layout.tsx` respectively — see
those files' notes for what breaks if they go out of sync.

---

### `postcss.config.js`

**What it controls:** The CSS build pipeline — runs Tailwind's PostCSS
plugin (which turns `@tailwind` directives in `globals.css` into actual
CSS) and Autoprefixer (adds vendor prefixes for browser compatibility).

**Safe to change:** Generally, no reason to touch this for a project this
size. Adding another PostCSS plugin (e.g. `postcss-nesting`) would go
here.

**Values with dependencies elsewhere:** None beyond the implicit
dependency on `tailwindcss` and `autoprefixer` being present in
`package.json`'s `devDependencies`.

---

### `next.config.js`

**What it controls:** Next.js build/runtime behavior.

**Current content:** Just `reactStrictMode: true` (enables extra
development-mode checks for potential bugs — this has no effect on the
production build's behavior, only on dev-mode warnings).

**Safe to change:** Adding config here (redirects, headers, image domains
for external images, etc.) is safe and won't affect existing behavior
unless you're overriding something already set. If you ever load images
from an external domain (not `public/images/`) via `<Image>`, you'll need
to add an `images.remotePatterns` entry here — Next.js blocks
unconfigured external image domains by default.

**Values with dependencies elsewhere:** None currently — this file is
intentionally minimal.

---

### `tsconfig.json`

**What it controls:** TypeScript compiler behavior and the `@/` path
alias used throughout the project (e.g. `import { site } from
"@/data/site"` instead of a relative `../../data/site`).

**Key section:** `"paths": { "@/*": ["./*"] }` — **this is what makes
every `@/...` import in the codebase resolve.** Every single component and
data file uses this alias.

**Safe to change:** Generally leave as-is. `strict: true` enables all of
TypeScript's strictness checks (the codebase is written to satisfy this,
including things like `Record<Project["status"], string>` requiring every
union member to have a value).

**Be careful with:** **Do not remove or change the `@/*` path mapping** —
doing so would break nearly every import statement in the project
simultaneously (every file in `components/`, `data/`, `lib/` imports
something via `@/`).

**Values with dependencies elsewhere:** The `paths` alias must match how
imports are actually written throughout the codebase (currently
consistently `@/data/...`, `@/components/...`, `@/types`, `@/lib/...`).

---

### `package.json`

**What it controls:** Project metadata, npm scripts, and the dependency
list.

**Scripts:**
- `npm run dev` — starts the local development server (hot-reloading).
- `npm run build` — produces the optimized production build.
- `npm run start` — serves the production build (run `build` first).
- `npm run lint` — runs ESLint using the Next.js default config.

**Dependencies:** `next`, `react`, `react-dom`, `lucide-react` (the icon
library used throughout `components/`). **Dev dependencies:**
`typescript`, type packages (`@types/*`), `tailwindcss`, `postcss`,
`autoprefixer`, `eslint`, `eslint-config-next`.

**Safe to change:** Adding new dependencies for new features is normal and
safe (`npm install <package>` updates this automatically). Bumping patch/
minor versions is generally low-risk.

**Be careful with:** Major-version bumps (e.g. Next.js 14 → 16, which
`npm audit fix --force` can trigger, as it did during initial setup — see
the terminal log from getting the project running) can introduce breaking
changes to the App Router, `next/font`, or `next/image` APIs used
throughout this codebase. If you run `npm audit fix --force`, re-check
that `npm run build` still succeeds afterward, since it can silently jump
several major versions at once.

**What can break:** Removing a dependency that's still imported somewhere
(e.g. removing `lucide-react` while `IconLink.tsx`/`Capabilities.tsx`
still `import * as Icons from "lucide-react"`) breaks the build
immediately with a clear "module not found" error.

---

## Generated / Do-Not-Hand-Edit Files

These files are grouped together because they're either fully
auto-generated or third-party lockfiles. **Don't hand-edit these** — let
the tooling manage them.

- **`package-lock.json`** — Auto-generated by `npm install`/`npm audit
  fix`. Records exact resolved versions of every dependency (direct and
  transitive) so installs are reproducible. Regenerated automatically
  whenever you run `npm install` after changing `package.json`.
- **`next-env.d.ts`** — Auto-generated by Next.js on first run. Contains
  the literal comment "This file should not be edited." Provides ambient
  TypeScript types for Next.js-specific globals.
- **`.next/`** (not present in the delivered zip, created by `npm run
  dev`/`npm run build`) — Next.js's build output/cache directory.
  Safe to delete anytime (`rm -rf .next`) — it regenerates on the next
  `dev`/`build` run. Already excluded via `.gitignore`.
- **`node_modules/`** (not present in the delivered zip, created by `npm
  install`) — all installed dependencies. Never hand-edit anything inside
  here; changes are lost on the next `npm install` and won't be shared
  with anyone else who clones the project. Already excluded via
  `.gitignore`.

---

## `public/images/`

> **Deployment risk:** `.gitignore` contains `public/images/Moeid.png`. The code
> uses `/images/moeid.png`. On Windows (case-insensitive) Git can treat these as
> the same file and ignore your hero photo, so it would be missing on
> Vercel/Cloudflare. Check with `git check-ignore -v public/images/moeid.png`
> and remove that line from `.gitignore` if it matches.

- **`moeid-placeholder.svg`** — a grey silhouette placeholder. Not referenced by
  any component at the moment.

- **`moeid.png`** — the hero photo, referenced by `components/sections/
  Hero.tsx`'s `<Image src="/images/moeid.png" ...>`. Replacing this file
  (keep the same filename, or update the `src` path in `Hero.tsx` if you
  rename it) is the only step needed to change the hero photo.
- **`og-image.png`** — the social-share preview image, referenced in
  `app/layout.tsx`'s `metadata.openGraph.images`. Currently a plain
  placeholder (dark background, name, title, as flat text) — swap this
  file for a properly designed 1200×630 image before sharing links
  publicly. No code change needed if you keep the same filename.

---

## How the Files Work Together

**Static/config layer** (read once, at build time, by the tooling):

```
tsconfig.json  ──►  enables the "@/" import alias used everywhere
tailwind.config.ts ──► reads CSS variables from globals.css by name
postcss.config.js  ──► wires Tailwind + Autoprefixer into the CSS build
next.config.js     ──► Next.js build/runtime settings (currently minimal)
```

**Content → rendering flow** (the actual page-building pipeline):

```
data/*.ts (typed content)
  ↓  imported by
components/sections/*.tsx (one file per section, maps data → JSX)
  ↓  built from
components/ui/*.tsx (shared Button/Card/Tag/SectionHeading/IconLink/etc.)
  ↓  styled by
tailwind classes, resolving to → app/globals.css CSS variables
  ↓  composed in order by
app/page.tsx
  ↓  wrapped by
app/layout.tsx (fonts, <head> metadata, global CSS import)
  ↓  rendered as
the final HTML page
```

**Concretely, for one section (Projects) as a worked example:**

```
types/index.ts          defines what a "Project" object must look like
  ↓
data/projects.ts         the actual 4 project objects, typed against Project
  ↓
components/sections/Projects.tsx    maps over the array
  ↓  each card uses
components/ui/Card.tsx, Tag.tsx, StatusBadge.tsx, Reveal.tsx
components/sections/ProjectIllustrations.tsx  (looked up by project.illustration)
  ↓  all styled via
tailwind classes → app/globals.css --color-* variables
```

**The scroll-reveal animation, across three files:**

```
lib/useInView.ts     (IntersectionObserver logic — detects visibility)
  ↓  used by
components/ui/Reveal.tsx   (sets data-reveal="visible" attribute)
  ↓  styled by
app/globals.css   ([data-reveal] / [data-reveal="visible"] CSS rules
                    actually perform the fade-up transition)
```

---

## Where to Make Common Changes

| If I want to change...                                   | Modify this file                                   | Relevant section |
|------------------------------------------------------------|------------------------------------------------------|---------------------|
| My name, title, tagline, location, age                     | `data/site.ts`                                        | `site` object |
| Email / Telegram / WhatsApp / GitHub URLs                  | `data/site.ts`                                         | `socialLinks` |
| Header nav links                                            | `data/site.ts`                                          | `navItems` |
| Page `<title>` / meta description / share-preview text      | `data/site.ts` (content) + `app/layout.tsx` (structure) | `site.title`/`description`, `metadata` |
| A project's title, description, tech list, GitHub link, status | `data/projects.ts`                                   | the matching project object |
| Adding a 5th project (with a new illustration)                | `types/index.ts`, `ProjectIllustrations.tsx`, `data/projects.ts` | see "Be careful with" notes on each |
| Reordering/removing project cards                            | `data/projects.ts`                                     | array order |
| A project card's illustration artwork                        | `components/sections/ProjectIllustrations.tsx`         | matching `*Illustration` function |
| Skill categories or individual skills                         | `data/skills.ts`                                        | `skillCategories` |
| "What I Can Build" card text                                  | `data/capabilities.ts`                                  | `capabilities` |
| "What I Can Build" card icons                                 | `data/capabilities.ts`                                  | `icon` field (must be a valid `lucide-react` export name) |
| The embedded/hardware closing line                             | `data/capabilities.ts`                                  | `embeddedNote` |
| Contact section buttons/links, or which are primary/secondary | `data/contact.ts`                                        | `contactLinks` |
| Activating LinkedIn once you have a profile | `data/contact.ts` **and** `components/sections/Footer.tsx` | contact: change `variant` + `href`; footer: remove `disabled`, set real `href` |
| About section bio paragraphs                                    | `components/sections/About.tsx`                        | the two `<p>` tags (hardcoded here, not in `data/`) |
| About section's abstract graphic                                | `components/sections/About.tsx`                        | `AbstractGraphic` function |
| Footer content/links                                             | `components/sections/Footer.tsx` (structure) + `data/site.ts` (values) | — |
| Hero photo                                                        | replace `public/images/moeid.png`, and/or `Hero.tsx`'s `src` | — |
| Hero photo's grayscale/duotone filter                              | `components/sections/Hero.tsx`                        | the `[filter:...]` Tailwind class |
| Site-wide colors (background, accent blue, text, borders)          | `app/globals.css`                                       | the `--color-*` variables |
| Fonts                                                                | `app/layout.tsx` (which fonts load) + `tailwind.config.ts` (`fontFamily` mapping) | — |
| Overall page width / how wide the content column is                 | `tailwind.config.ts`                                    | `maxWidth.content` |
| Section order                                                         | `app/page.tsx`                                           | JSX order inside `<main>` |
| Section heading index numbers ("01", "02"...)                        | each section file's `<SectionHeading index="..." />` call | — |
| Button/Card/Tag/etc. shared visual style                              | the matching file in `components/ui/`                  | — |
| Scroll-reveal animation speed/distance                                | `app/globals.css`                                         | `[data-reveal]` transition properties |
| Scroll-reveal trigger sensitivity (how much must be visible)           | `lib/useInView.ts`                                        | `threshold` default |
| Back-to-top button appearance/position                                | `components/ui/BackToTop.tsx`                             | — |
| Social share preview image                                              | replace `public/images/og-image.png`                    | — |
| Canonical site URL (for metadata)                                       | `data/site.ts`                                             | `site.url` |
| npm scripts (dev/build/start/lint)                                       | `package.json`                                             | `scripts` |
| Adding a new dependency                                                   | `npm install <package>` (updates `package.json` + lockfile automatically) | — |

---

## Important Warnings

**Files where a mistake breaks the whole build (TypeScript errors), not
just one section:**
- `types/index.ts` — every `data/*.ts` file is type-checked against these
  interfaces. Removing a required field or a union member that's still
  referenced elsewhere fails the build immediately.
- `tsconfig.json`'s `"@/*": ["./*"]` path alias — removing this breaks
  essentially every import in the project at once.
- `data/site.ts`'s `url` field — must stay a valid absolute URL, or
  `new URL(site.url)` in `app/layout.tsx` throws at build time.

**Files where a mistake fails silently (no error, just visibly wrong or
missing content) — double-check these visually after editing:**
- Any `icon` string in `data/capabilities.ts` or `data/contact.ts` — an
  invalid lucide-react name renders no icon, no warning.
- `data/contact.ts`'s `variant` field — a typo'd value means that link
  just doesn't appear anywhere on the page.
- SVG `d` (path) attributes in `ProjectIllustrations.tsx` or `About.tsx`'s
  `AbstractGraphic` — malformed path data renders a blank/broken shape,
  not an error.
- `Hero.tsx`'s `<Image src="/images/moeid.png">` — a missing/renamed file
  in `public/images/` 404s in the browser, not at build time.

**Files with a "hidden" cross-file dependency that's easy to break by
renaming something:**
- `Footer.tsx`'s `id="site-footer"` ↔ `BackToTop.tsx`'s
  `document.getElementById("site-footer")` — these must match exactly, and
  nothing will warn you if they don't.
- Each section's `id="..."` ↔ `data/site.ts`'s `navItems` `href`s (and the
  Hero's "View Projects"/"Get in Touch" button `href`s, which point at
  `#projects`/`#contact` directly) — a renamed section ID silently breaks
  that specific nav link (it'll just stop scrolling anywhere).
- `app/globals.css`'s `--color-*` variable **names** ↔ `tailwind.config.ts`'s
  `colors` block ↔ inline `var(--color-accent)` references in the two SVG
  illustration files — all three must stay in sync by name.

**Don't hand-edit:** `package-lock.json`, `next-env.d.ts`, and (once
created locally) the `.next/` and `node_modules/` folders — see the
"Generated / Do-Not-Hand-Edit Files" section above.

---

## Known Drift and Open Items (as of 2026-09-30)

Things where the code, the docs, or the planning files disagree, or that still
need a decision:

1. **Client components are six, not four:** `Header`, `BackToTop`, `Reveal`,
   `useInView`, `Button`, `Contact`.
2. **Contact layout** is simpler than the page spec (all buttons look primary,
   no icon links). See the `Contact.tsx` section.
3. **Em dash in page title:** `app/layout.tsx` builds the title as
   `${site.name} — ${site.title}` (three places: `title`, `openGraph.title`,
   `twitter.title`). The content rule says no em dashes anywhere on the site.
   Replace with a colon, pipe, or hyphen.
4. **Skills list** in `data/skills.ts` has six categories. The content file
   (context 2) also lists "Digital Logic / FPGA (Quartus II, basic)". Decide
   whether it stays off the site or gets added.
5. **Hero photo filter** was removed (full colour). The page spec still says
   "subtle dark duotone".
6. **`data/site.ts`:** the `email` and `whatsapp` values now look filled in, but
   the `// TODO: replace placeholder...` comment is still there. Confirm they
   are the public ones you want, then delete the comment.
7. **Fifth project (game)** is still pending. Adding it needs the three-step
   change described under `data/projects.ts`.
8. **Next.js version:** the terminal shows 16.3.6 (Turbopack). The copies of
   `package.json` and `package-lock.json` in the project files still show
   `^14.2.5`. Re-export them so the project files match.
9. **Project files vs local code:** the `Contact.tsx` and `Button.tsx` in the
   project files should be the current versions (with `"use client"`).

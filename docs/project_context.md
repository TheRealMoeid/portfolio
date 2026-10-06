# Personal Portfolio Website — Project Context

## 1. Project Overview

This project is a personal portfolio website for Moeid Ghiady.

The purpose of the website is to give potential clients, employers, and other professional visitors one clear place to understand:

- who Moeid is
- what he can build
- what technologies and skills he works with
- what projects he has completed
- how to contact him

The website should function as a **professional portfolio**, not simply as an online résumé and not as a copy of an existing portfolio/card website.

A reference website was provided for the **concept and purpose only**:

- https://card.josebbk.com/

The reference should NOT be copied visually or structurally. It is only inspiration for the idea of a compact personal website/card that presents personal and professional information in one place.

---

## 2. Current Decisions

These decisions have already been made and should be treated as the current project direction unless explicitly changed later.

### Technology approach

Use **Approach C: Next.js**.

Preferred stack:

- Next.js
- React
- TypeScript
- Tailwind CSS

The site should be primarily static where practical, while retaining the flexibility of Next.js for future expansion.

### Why Next.js

The project should be able to grow beyond a simple one-page portfolio without requiring a complete rewrite.

Potential future additions include:

- individual project pages
- detailed project case studies
- blog
- additional professional content
- analytics
- richer interactions
- other portfolio sections

The initial implementation should still remain simple and should not introduce unnecessary complexity.

---

## 3. Recommended First Version

The first version should contain the following major sections:

1. Hero / Introduction
2. Selected Projects
3. About
4. Skills
5. Capabilities / What I Can Build
6. Contact
7. Footer

The first version should remain focused.

Possible future features such as a blog, detailed project pages, analytics, testimonials, and advanced interactions should not be allowed to unnecessarily complicate v1.

---

## 4. Core Content Philosophy

The site should answer three questions quickly:

1. **Who is this person?**
2. **What can they actually do?**
3. **Can I see evidence of that work and contact them?**

The portfolio should prioritize **evidence over claims**.

For example, instead of relying on statements such as:

> "I am highly skilled in Python and backend development."

the website should demonstrate those skills through real projects and concrete technical details.

Projects are therefore a central part of the site's professional credibility.

The intended hierarchy is:

**Who I am → What I can build → Proof through projects → How to contact me**

---

## 5. Design Direction

The visual direction should be:

**Minimal + technical + editorial**

Desired characteristics:

- clean
- modern
- professional
- strong typography
- generous whitespace
- restrained color palette
- subtle borders
- clean cards
- carefully chosen animations
- excellent mobile presentation
- no excessive visual effects
- no unnecessary gradients or "developer aesthetic" gimmicks

The site should feel like a polished professional portfolio rather than a template or a résumé converted into a webpage.

Animations and interactions may be used, but they should support the content rather than become the main attraction.

Avoid copying the visual design of the reference website.

---

## 6. Initial Information Architecture

The current high-level structure is:

### Hero / Introduction

Should communicate immediately:

- name
- professional direction / role
- concise description of what Moeid builds
- primary CTA to view projects
- primary CTA to contact

Potential additional links:

- GitHub
- LinkedIn
- email
- CV, if eventually included

The hero should not contain a long biography.

---

### Selected Projects

This should be one of the most important sections of the site.

Initial candidate projects include:

- AI Store Assistant
- V2Ray Sales Telegram Bot
- Media Download Telegram Bot

Projects should be presented as evidence of practical ability.

A project presentation may eventually include:

- project name
- concise description
- technologies
- major features
- what was built
- relevant technical challenges
- screenshot(s)
- GitHub link
- optional live/demo link where appropriate

Do not fabricate features, technologies, results, or experience.

The exact project selection and wording will be decided during the content/information-architecture phase.

---

### About

The About section should explain:

- educational background
- development background
- practical/software-building focus
- current professional direction
- relevant interests in software development

Moeid is a Computer Engineering student who is intentionally developing practical software skills beyond university coursework.

The wording should remain realistic and should not exaggerate experience or seniority.

Avoid unsupported titles such as "Senior Developer", "Expert AI Engineer", etc.

---

### Skills

Skills should be organized by meaningful technical areas rather than presented as a giant list or arbitrary percentage bars.

Potential categories include:

#### Programming

- Python
- other languages actually used and demonstrated

#### Backend / APIs

- REST APIs
- Telegram Bot APIs
- business logic
- asynchronous programming
- backend architecture

#### AI

- LLM integration
- AI-assisted applications
- prompt engineering
- local LLM tooling where relevant

#### Databases / Data

- SQL
- SQLite
- other databases actually used

#### Infrastructure / Development Tools

- Git / GitHub
- Docker
- testing
- deployment-related tools

The final skill list must reflect actual ability and project evidence.

Do not use fake or arbitrary proficiency percentages.

---

### Capabilities / What I Can Build

This section should translate technical skills into services/capabilities that a potential client can understand.

Potential categories:

- Telegram bots
- business/process automation
- AI integrations
- backend development
- API integrations
- database-backed applications

The final wording will be determined during the information-architecture phase.

This section is especially relevant because the portfolio may be used for both employment and freelance opportunities.

---

### Contact

The contact section should make it easy to reach Moeid.

Potential contact methods:

- email
- GitHub
- LinkedIn
- freelance profiles
- Telegram, if appropriate

A direct email link is likely preferable to a complicated contact form for v1.

The final public contact information will be decided later.

---

### Footer

Keep it simple.

Possible contents:

- name
- copyright/year
- GitHub
- LinkedIn
- email
- small navigation links

Avoid unnecessary content.

---

## 7. Important Technical Requirements

The implementation should account for:

### Responsive design

The website must work properly across:

- mobile
- tablet
- desktop
- large desktop displays

Mobile should be treated as a first-class experience, not as an afterthought.

### Accessibility

Consider:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast
- meaningful alt text
- proper heading hierarchy
- accessible buttons and links
- appropriate touch target sizes
- reduced-motion preferences

### SEO

The site should include appropriate:

- page title
- meta description
- semantic structure
- Open Graph metadata
- appropriate heading hierarchy
- crawlable content

### Performance

Keep the site lightweight.

Prefer:

- optimized images
- appropriate image formats
- lazy loading where useful
- minimal unnecessary JavaScript
- optimized fonts
- minimal third-party dependencies
- static generation where practical

### Deployment

The site should be deployable through a modern cloud hosting platform.

Possible options include:

- Vercel
- Cloudflare Pages
- GitHub Pages, if compatible with the final architecture

A personal domain should eventually be considered.

---

## 8. Content Principles

The portfolio should be:

### Honest

Do not exaggerate experience, seniority, technical ability, project scale, or results.

### Concrete

Prefer specific descriptions of what was built over vague claims.

### Evidence-driven

Use real projects to demonstrate skills.

### Professional

Avoid overly promotional or "look how cool I am" language.

### Concise

Visitors should be able to understand the main point quickly.

### Expandable

The content architecture should allow future projects and sections to be added without redesigning the entire site.

---

## 9. What We Are NOT Doing Yet

**Historical note: this list is from the planning phase. v1 implementation is now done; only the database, contact backend, and deployment items below are still not built. Basic analytics now exists: `@vercel/analytics` is mounted in `app/layout.tsx` (it only reports when deployed on Vercel).**

At the planning stage, the rule was do NOT:

- write implementation code
- create React components
- create Next.js files
- choose exact Tailwind classes
- implement animations
- set up deployment
- create a database
- add analytics
- build a contact backend
- make detailed UI mockups unless explicitly requested

We are still in the planning/content-definition phase.

---

## 10. Next Phase: Actual Content & Information Architecture

Before implementation begins, the next task is to define the actual content and structure in detail.

This phase should answer:

### Personal identity

- What exact name should appear?
- What professional title/description should be used?
- What short introduction should appear in the hero?
- What should be omitted?

### About

- What background should be mentioned?
- How should the Computer Engineering education be presented?
- How much personal information is appropriate?
- What is the intended professional direction?

### Projects

For each initial project:

- exact title
- one-line description
- longer description
- key features
- technologies
- technical challenges
- important implementation details
- screenshots
- GitHub link
- live/demo link if available
- whether it belongs in the initial "Selected Projects" section

### Skills

Determine:

- which skills are genuinely strong enough to list
- which skills are currently developing
- how they should be grouped
- which skills are demonstrated by which projects

### Capabilities

Determine exactly what services/capabilities should be communicated to potential clients.

### Contact

Determine which contact channels should be public.

### Content exclusions

Explicitly decide what should NOT appear on the website.

---

## 11. Planned Workflow

The intended workflow is:

**Planning → Content/Information Architecture → Page Specification → Technical Architecture → Implementation → Testing → Deployment**

Do not jump directly from the current planning stage into implementation.

The next deliverable should be a concrete **content and information-architecture specification**.

Only after that should the project move toward technical implementation.

---

## 12. Important Working Principle for AI Models

Any AI model working on this project should treat this file as the current project context.

Before making implementation decisions:

1. Read this file.
2. Respect the decisions already made.
3. Do not silently change the chosen technology stack or overall direction.
4. If a proposed change conflicts with an existing decision, explain the trade-off and ask before changing direction.
5. Do not write code while the project is explicitly in the planning/content-definition phase.
6. Prefer realistic, evidence-based portfolio content over exaggerated marketing language.
7. Keep the website maintainable and expandable.
8. Treat the actual projects as the primary evidence of technical ability.

---

## 13. Current Project Status

**Phase:** v1 implemented and running locally; pre-deployment cleanup and testing

**Chosen approach:** Next.js + React + TypeScript + Tailwind CSS

**Chosen first-version structure (as implemented, after the sticky header):**

- Hero
- Selected Projects
- Skills
- Capabilities / What I Can Build
- About
- Contact
- Footer

**Design direction:** Minimal + technical + editorial

**Implementation status:** v1 built (Next.js App Router; `package.json` pins Next.js `^15.5.27`). See `PROJECT_FILE_GUIDE.md` for the code map and `README.md` for the pre-deploy checklist.

**Next step:** Work through the README pre-deploy checklist (OG image, custom domain if chosen, LinkedIn, optionally a title separator and clearer Hero pill wording), add the fifth project when ready, test on real devices, then deploy. (The `.gitignore` photo problem and the em dash in the title are already fixed, and the site is already deployed on Vercel at `portfolio-chi-green-13ro5dp3d1.vercel.app`.)


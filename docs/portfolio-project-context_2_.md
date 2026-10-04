# Personal Portfolio Website — Continuation Context

This file summarizes decisions already finalized for Moeid Ghiady's personal portfolio website project. Use this as the starting context in a new chat. Do not re-derive or re-negotiate anything listed here as "finalized" unless the user explicitly asks to change it.

Project type: personal portfolio website (Next.js + React + TypeScript + Tailwind CSS, see original project_context.md for full technical/design direction; this file covers content only). Current phase: content & information architecture, nearly complete. Implementation has not started.

---

## Content Style Rules (finalized)

- No em dashes ("—") anywhere in the website content/copy.

---

## Hero (finalized)

**Name:** Moeid Ghiady
**Title/role:** Software Developer & Computer Engineering Student
**Tagline:** I build practical software, automation tools, Telegram applications, and AI-powered solutions.
**CTAs:** [View Projects] [Get in Touch]

---

## About (finalized)

Moeid is a Computer Engineering student focused on turning what he learns into practical software. His work has mainly focused on software development, backend systems, automation, Telegram applications, and AI-powered solutions. He is currently building experience through personal projects, working toward freelance readiness, with the goal of growing as a software developer.

(Note: earlier draft said "freelance-oriented work", corrected to "working toward freelance readiness" since freelance work is aspirational, not yet underway. Use this corrected version.)

---

## Skills (finalized)

Organized by category, distinguishing solid vs. still-developing areas. Java is explicitly excluded, used only once for a required course, not a skill Moeid wants to showcase.

- **Programming:** Python (primary), C (embedded), C++ (coursework)
- **Backend / APIs:** Telegram Bot API, aiogram, python-telegram-bot, asyncio/async programming, business logic design (order flows, payment verification, inventory management)
- **AI:** LLM integration (OpenAI SDK, Groq, Ollama), tool/function-calling architecture, prompt engineering, local LLM tooling (Ollama, LM Studio)
- **Databases / Data** *(still developing, not a core strength yet)*: PostgreSQL, SQLAlchemy, SQLite, JSON persistence, Alembic
- **Infrastructure / Tools:** Git/GitHub (solid), pytest/pytest-asyncio (solid), Docker/Docker Compose (still developing)
- **Embedded:** STM32, Embedded C, bare-metal state machine architecture, sensor/actuator integration, UART
- **Digital Logic / FPGA:** Quartus II (basic level, from Computer Architecture Laboratory coursework)

Explicitly dropped from the skills list for now (not enough confirmed evidence/confidence to showcase): granular sub-skills like FSM/RBAC/repository-pattern terminology, digital logic beyond the basic Quartus mention, and networking/VLESS-VMess-Trojan specifics.

---

## Capabilities / What I Can Build (finalized)

Five capability items, translating skills into client/employer-facing services. Embedded/STM32 work is deliberately not a separate item here, it's mentioned only as a brief closing line, since the site's core narrative targets bot/AI/backend clients.

1. **Telegram Bot Development** — Custom bots for e-commerce, media handling, and business workflows, including order management, payments, file delivery, and multi-language support.
2. **AI-Powered Applications** — LLM integration with tool-calling architectures that force reliable, controlled behavior instead of freeform guessing. Not just wrapper chatbots.
3. **Backend & Business Logic** — Designing the systems behind an application: order flows, payment verification, inventory tracking, and concurrency-safe async data handling.
4. **Database-Backed Systems** — Structuring data with PostgreSQL and SQLAlchemy for larger systems, or lighter SQLite and JSON persistence for smaller ones, matched to project scale.
5. **Automation Tools** — Scripts and bots that remove repetitive manual work, from media retrieval to backend admin tasks.

**Closing line (embedded work, low priority mention):**
"Also comfortable working closer to hardware, including embedded C and STM32-based systems, for projects that need it."

---

## Contact (finalized)

- **Email** — primary CTA
- **Telegram** — primary CTA, equally weighted with email
- **WhatsApp** — secondary, included since many clients default to it even though Telegram is enough for Moeid personally
- **GitHub** — secondary link (TheRealMoeid)
- **LinkedIn** — no profile yet, one will be created; section stays visible on the site shown as "Coming soon" / "currently unavailable" rather than removed
- **Instagram** — explicitly excluded, personal account, not meant for the professional site

---

## Footer (finalized)

- **Name:** "Moeid Ghiady"
- **Copyright/year:** e.g. "© 2026 Moeid Ghiady"
- **Contact links:** Email + GitHub only (minimal, not the full Contact list)
- **LinkedIn:** same "Coming soon" placeholder, for consistency
- No nav links back to page sections

**Flagged technical/UX requirement (for Page Specification / Technical Architecture phase, not content):** a "back to top" button that appears when the user scrolls to the footer, and scrolls the page back to top when clicked.

---

## Content Exclusions (finalized)

**Excluded from the site:**
- Instagram (personal account, confirmed as a site-wide exclusion beyond just Contact)
- Phone number (kept private, not published anywhere)
- GPA / grades (not mentioned; only the university name itself is included)
- Fabricated features, technologies, results, or seniority claims (standing project principle)

**Included, but kept brief:**
- General location (city/country, not a full address)
- Age (brief mention, not a focal point)
- University name only (no grades or academic performance metrics)

---

## Selected Projects (finalized, 4 confirmed; 5th pending)

### 1. ShopMate Agent
*(repo name: AI-Store-Assistant)*

A Telegram shopping assistant bot where an LLM interprets user messages and guides them toward items they want to buy, instead of using static menus or scripted flows.

- **Tech stack:** Python 3.11/3.12, aiogram 3.13.1, OpenAI Python SDK, Ollama (local dev inference), Groq (cloud production inference), JSON file persistence, asyncio + asyncio.Lock for concurrency-safe reads/writes, python-dotenv, pytest + pytest-asyncio, Git/GitHub
- **Trickiest challenge:** making the model give accurate, reliable answers and preventing it from guessing, solved via tool calls that force real actions plus a max retry limit
- **GitHub:** https://github.com/TheRealMoeid/ai-store-assistant
- **Status:** not publicly deployed; README has a guide for running it locally

### 2. VPN Vend
*(repo name: V2Ray-sales-telegram-bot; Telegram bot itself named "Moeid's V2ray store")*

A Telegram bot for selling V2Ray/VLESS configurations end-to-end: customers browse configs, place orders, pay via bank transfer, and submit payment receipts for verification. Admins manage orders, configurations, inventory, payments, and shop statistics. Approved orders auto-deliver the purchased configuration.

- **Tech stack:** Python 3.12+, Aiogram 3, PostgreSQL 15, SQLAlchemy 2 (async), asyncpg, Alembic, python-dotenv, Docker + Docker Compose, pytest + pytest-asyncio, Ruff + Black, aiofiles
- **Trickiest challenges:** getting the bot running and working for the first time (many hidden issues), and getting the handlers to work properly
- **GitHub:** https://github.com/TheRealMoeid/V2Ray-sales-telegram-bot
- **Status:** not 100% finished but stable and working fine; still in progress (new features may be added)

### 3. Media Download Bot
*(repo name: media-download-telegram-bot)*

A modular Telegram bot that downloads videos from YouTube and Instagram. User sends a URL, bot detects the platform, downloads via yt-dlp, and sends the video back through Telegram. YouTube lets users choose video quality; Instagram auto-downloads the best available quality.

- **Additional features:** Persian/English language support, persistent user preferences (SQLite), FFmpeg integration, temporary-file cleanup, basic error handling
- **Tech stack:** Python, python-telegram-bot 22.8, yt-dlp 2026.8.19, python-dotenv 1.2.2, pytest 9.0.3 + pytest-asyncio 1.4.0; modular architecture (bot/, downloader/, services/, config/, tests/)
- **Current known issue:** YouTube downloading doesn't work yet, blocked on being unable to download anonymously, still being investigated. This is the project's main unresolved technical challenge.
- **GitHub:** https://github.com/TheRealMoeid/media-download-telegram-bot
- **Display name/status badge:** "Media Download Bot" — "Actively in development"

### 4. Smart Fire Management System
*(repo name: stm32_Smart_Fire_System_Management)*

An STM32F411-based embedded fire detection and management system using a **bare-metal state machine architecture** (explicitly NOT FreeRTOS/RTOS, this was corrected after an earlier draft mistakenly said FreeRTOS). Built as a two-person final project for the Embedded and Real-Time Systems course. Finished and presented.

- **System includes:** MQ-2 gas sensor, LM35 temperature sensor, PIR sensor, flame sensor, actuators, LCD UI, Wi-Fi/Bluetooth modules, SD card
- **Moeid's specific contribution:** design of the temperature sensor and water pump subsystem; design of the gas sensor and gas valve subsystem; design of the project PowerPoint and lab report. (Team project, do not present as solo work.)
- **Teammate:** Navid Rostami
- **Tech:** STM32F411, C, bare-metal state machine architecture, embedded sensor/actuator integration, UART
- **GitHub:** https://github.com/TheRealMoeid/stm32_Smart_Fire_System_Management

### 5. (Pending, not yet finalized)

A game project from the Fundamentals of Computer Science and Programming course, final semester assignment. Confirmed it WILL be part of the Selected Projects section once ready. Not on GitHub yet. Moeid is still waiting on a friend to send him the project file (unsure if he has the latest version himself). **Do not add this to the portfolio yet.** Follow up with Moeid once he has the file, then gather: what the game is (genre/concept), language/tools used, and what it demonstrates (data structures, OOP, algorithms, etc.).

---

## Not Yet Covered / Next Steps

- **Resolution of the pending 5th project** (the game) — the only remaining open item in content/IA. Follow up once Moeid has the project file.

**Status update:** Page Specification, Technical Architecture, and the v1 implementation are now complete (see `portfolio-project-context(3)-page-spec-and-technical-architecture.md`, `PROJECT_FILE_GUIDE.md`, and `README.md`). The only content item still open is the fifth project. A few implemented details intentionally differ from the finalized text in this file, by the owner's decision: the About section is now the owner's own first-person wording in `About.tsx` (it supersedes the About text above), the phone number is published through the WhatsApp `wa.me` link (it supersedes the phone number exclusion for that link only), and the Hero shows an "available for new projects" pill meaning ready to be hired. See Known Drift in `PROJECT_FILE_GUIDE.md`.

Everything else in the content & information-architecture phase (Hero, About, Skills, Capabilities, Contact, Footer, Content Exclusions, Content Style Rules, and the first 4 Selected Projects) is finalized.

Once the 5th project is resolved (or the user decides to proceed without waiting further), the project moves to Page Specification → Technical Architecture → Implementation, per the original planned workflow. (Historical: this instruction applied while the project was in the content-definition phase. Implementation has since started; see the status update above.)

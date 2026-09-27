import { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    title: "Telegram Bot Development",
    description:
      "Custom bots for e-commerce, media handling, and business workflows, including order management, payments, file delivery, and multi-language support.",
    icon: "Send",
  },
  {
    title: "AI-Powered Applications",
    description:
      "LLM integration with tool-calling architectures that force reliable, controlled behavior instead of freeform guessing, not just wrapper chatbots.",
    icon: "Sparkles",
  },
  {
    title: "Backend & Business Logic",
    description:
      "Designing the systems behind an application: order flows, payment verification, inventory tracking, and concurrency-safe async data handling.",
    icon: "Server",
  },
  {
    title: "Database-Backed Systems",
    description:
      "Structuring data with PostgreSQL and SQLAlchemy for larger systems, or lighter SQLite and JSON persistence for smaller ones, matched to project scale.",
    icon: "Database",
  },
  {
    title: "Automation Tools",
    description:
      "Scripts and bots that remove repetitive manual work, from media retrieval to backend admin tasks.",
    icon: "Cog",
  },
];

export const embeddedNote =
  "Also comfortable working closer to hardware, including embedded C and STM32-based systems, for projects that need it.";

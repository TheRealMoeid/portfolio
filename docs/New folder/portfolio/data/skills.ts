import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming",
    skills: ["Python", "C", "C++"],
  },
  {
    category: "Backend / APIs",
    skills: [
      "Telegram Bot API",
      "aiogram",
      "python-telegram-bot",
      "asyncio",
      "Business logic design",
    ],
  },
  {
    category: "AI",
    skills: [
      "LLM integration",
      "Tool-calling architecture",
      "Prompt engineering",
      "Ollama",
      "LM Studio",
    ],
  },
  {
    category: "Databases / Data",
    note: "Still developing",
    skills: ["PostgreSQL", "SQLAlchemy", "SQLite", "JSON persistence", "Alembic"],
  },
  {
    category: "Infrastructure / Tools",
    skills: ["Git / GitHub", "pytest", "Docker"],
  },
  {
    category: "Embedded",
    skills: ["STM32", "Embedded C", "State machine architecture", "UART"],
  },
];

import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "shopmate-agent",
    title: "ShopMate Agent",
    description:
      "A Telegram shopping assistant where an LLM interprets what a customer wants and guides them toward it, instead of static menus or scripted flows.",
    tech: ["Python", "aiogram", "OpenAI SDK", "Groq", "Ollama", "asyncio"],
    status: "Local demo",
    github: "https://github.com/TheRealMoeid/ai-store-assistant",
    illustration: "shopmate",
  },
  {
    slug: "vpn-vend",
    title: "VPN Vend",
    description:
      "An end-to-end V2Ray configuration store on Telegram: customers browse, pay, and submit receipts for verification, while admins manage orders, inventory, and delivery.",
    tech: ["Python", "Aiogram 3", "PostgreSQL", "SQLAlchemy", "Docker"],
    status: "In progress",
    github: "https://github.com/TheRealMoeid/V2Ray-sales-telegram-bot",
    illustration: "vpnvend",
  },
  {
    slug: "media-download-bot",
    title: "Media Download Bot",
    description:
      "A modular Telegram bot that downloads YouTube and Instagram videos from a shared URL, with quality selection and saved language preferences.",
    tech: ["Python", "python-telegram-bot", "yt-dlp", "SQLite", "FFmpeg"],
    status: "Actively in development",
    github: "https://github.com/TheRealMoeid/media-download-telegram-bot",
    illustration: "mediabot",
  },
  {
    slug: "smart-fire-management-system",
    title: "Smart Fire Management System",
    description:
      "An STM32-based fire detection system built on a bare-metal state machine, combining gas, temperature, and flame sensors with an LCD interface and automated response.",
    tech: ["STM32F411", "Embedded C", "UART", "Sensor Integration"],
    status: "Completed",
    github:
      "https://github.com/TheRealMoeid/stm32_Smart_Fire_System_Management",
    illustration: "firesystem",
  },
];

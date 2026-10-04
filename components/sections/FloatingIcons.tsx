import {
  siCplusplus,
  siDocker,
  siGit,
  siGithub,
  siLmstudio,
  siOllama,
  siOpenid,
  siPostgresql,
  siPytest,
  siPython,
  siSqlalchemy,
  siSqlite,
  siStmicroelectronics,
  siTelegram,
} from "simple-icons";
import { Bot, Braces, Laptop, Terminal } from "lucide-react";
import { ReactNode } from "react";

function Brand({ icon }: { icon: { path: string } }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

interface Item {
  name: string;
  node: ReactNode;
  position: string; // side + horizontal offset + vertical position (% of page height)
  delay: string;
}

const items: Item[] = [
  // Left side
  { name: "Python", node: <Brand icon={siPython} />, position: "left-[8%] top-[4%]", delay: "0s" },
  { name: "C++", node: <Brand icon={siCplusplus} />, position: "left-[4%] top-[15%]", delay: "1.2s" },
  { name: "GitHub", node: <Brand icon={siGithub} />, position: "left-[10%] top-[26%]", delay: "2.4s" },
  { name: "Ollama", node: <Brand icon={siOllama} />, position: "left-[5%] top-[37%]", delay: "3.6s" },
  { name: "SQLite", node: <Brand icon={siSqlite} />, position: "left-[9%] top-[48%]", delay: "0.8s" },
  { name: "Terminal", node: <Terminal size={26} />, position: "left-[4%] top-[59%]", delay: "2s" },
  { name: "Git", node: <Brand icon={siGit} />, position: "left-[10%] top-[70%]", delay: "3.2s" },
  { name: "Laptop", node: <Laptop size={26} />, position: "left-[5%] top-[81%]", delay: "4.4s" },
  { name: "pytest", node: <Brand icon={siPytest} />, position: "left-[9%] top-[92%]", delay: "1.6s" },

  // Right side
  { name: "Telegram", node: <Brand icon={siTelegram} />, position: "right-[8%] top-[8%]", delay: "0.6s" },
  { name: "Docker", node: <Brand icon={siDocker} />, position: "right-[5%] top-[18%]", delay: "1.8s" },
  { name: "Braces", node: <Braces size={26} />, position: "right-[10%] top-[28%]", delay: "3s" },
  { name: "PostgreSQL", node: <Brand icon={siPostgresql} />, position: "right-[6%] top-[38%]", delay: "4.2s" },
  { name: "SQLAlchemy", node: <Brand icon={siSqlalchemy} />, position: "right-[9%] top-[48%]", delay: "1.4s" },
  { name: "OpenID", node: <Brand icon={siOpenid} />, position: "right-[5%] top-[58%]", delay: "2.6s" },
  { name: "STM32F411", node: <Brand icon={siStmicroelectronics} />, position: "right-[10%] top-[68%]", delay: "3.8s" },
  { name: "Bot", node: <Bot size={26} />, position: "right-[6%] top-[78%]", delay: "5s" },
  { name: "LM Studio", node: <Brand icon={siLmstudio} />, position: "right-[9%] top-[88%]", delay: "0.4s" },
];

export function FloatingIcons() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden 2xl:block"
    >
      {items.map((item) => (
        <div key={item.name} className={`absolute ${item.position}`}>
          <div
            className="flex h-14 w-14 animate-float items-center justify-center rounded-xl border border-border bg-surface/40 text-accent/70 motion-reduce:animate-none"
            style={{ animationDelay: item.delay }}
          >
            {item.node}
          </div>
        </div>
      ))}
    </div>
  );
}
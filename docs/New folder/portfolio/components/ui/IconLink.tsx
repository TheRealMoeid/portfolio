import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconLinkProps {
  href: string;
  icon: string;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function IconLink({
  href,
  icon,
  label,
  disabled = false,
  className,
}: IconLinkProps) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[icon];

  if (disabled) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted/60",
          className
        )}
        aria-label={`${label} (coming soon)`}
      >
        {Icon && <Icon size={18} aria-hidden="true" />}
        {label}
        <span className="font-mono text-xs">Coming soon</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent",
        className
      )}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
      {label}
    </a>
  );
}

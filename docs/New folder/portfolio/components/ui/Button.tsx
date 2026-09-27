import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "outline";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent",
        variant === "primary" &&
          "bg-accent text-background hover:bg-accent/90",
        variant === "outline" &&
          "border border-border text-foreground hover:border-accent hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

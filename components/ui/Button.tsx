"use client";

import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "outline" | "soft-red";
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
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent",
        variant === "primary" &&
          "bg-accent text-background hover:bg-accent/90",
        variant === "outline" &&
          "border border-border text-foreground hover:border-accent hover:text-accent",
        variant === "soft-red" &&
          "bg-red-400/20 text-red-300 hover:bg-red-400/30",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
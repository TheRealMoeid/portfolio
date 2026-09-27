import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 transition-transform duration-200 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

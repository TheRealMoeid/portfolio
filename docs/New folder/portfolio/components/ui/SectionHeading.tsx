import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center")}>
      {index && (
        <div
          className={cn(
            "mb-3 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="font-mono text-sm text-accent">{index}</span>
          <span className="h-px w-8 bg-border" />
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-xl text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

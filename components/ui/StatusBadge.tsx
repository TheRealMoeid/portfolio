import { Project } from "@/types";
import { cn } from "@/lib/utils";

const dotColor: Record<Project["status"], string> = {
  Completed: "bg-accent",
  "In progress": "bg-accent",
  "Actively in development": "bg-accent",
  "Local demo": "bg-muted",
};

export function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
      <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[status])} />
      {status}
    </span>
  );
}

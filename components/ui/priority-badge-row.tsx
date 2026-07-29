import { cn } from "@/lib/utils";

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-accent-soft text-accent",
  Medium: "bg-white/10 text-muted",
  Low: "bg-white/5 text-muted",
};

export function PriorityBadgeRow({
  label,
  priority,
}: {
  label: string;
  priority: "High" | "Medium" | "Low";
}) {
  return (
    <div className="mb-3 flex items-center justify-between text-sm last:mb-0">
      <span className="text-white">{label}</span>
      <span
        className={cn(
          "rounded-full px-2.5 py-0.5 text-xs font-medium",
          PRIORITY_STYLES[priority]
        )}
      >
        {priority}
      </span>
    </div>
  );
}

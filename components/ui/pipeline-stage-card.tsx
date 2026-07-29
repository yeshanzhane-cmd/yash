import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStageCardProps {
  title: string;
  description: string;
  items: string[];
  status: string;
}

export function PipelineStageCard({ title, description, items, status }: PipelineStageCardProps) {
  const isActive = status.toLowerCase() === "active";
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-canvas p-4">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-1.5 text-xs text-muted">
            <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-1 border-t border-border pt-2 text-[10px] uppercase tracking-wide">
        <span className="text-muted">Status </span>
        <span className={cn("font-medium", isActive ? "text-accent" : "text-positive")}>
          {status}
        </span>
      </div>
    </div>
  );
}

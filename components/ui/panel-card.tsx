import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PanelCard({ title, action, children, className }: PanelCardProps) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-border bg-surface p-5", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

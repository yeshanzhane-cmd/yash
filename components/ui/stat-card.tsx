import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";

export function StatCard({ label, value, delta, positive }: Kpi) {
  const showDelta = delta !== "—";
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl text-white">{value}</p>
      {showDelta && (
        <p
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            positive ? "text-positive" : "text-negative"
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
          )}
          {delta}
        </p>
      )}
    </div>
  );
}

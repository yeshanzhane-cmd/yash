"use client";

import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/lib/types";

export function StatusToggle({
  status,
  onChange,
}: {
  status: AgentStatus;
  onChange: (status: AgentStatus) => void;
}) {
  const active = status === "active";
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-canvas p-3">
      <span className={cn("h-2.5 w-2.5 rounded-full", active ? "bg-positive" : "bg-muted")} />
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{active ? "Agent Active" : "Agent Paused"}</p>
        <p className="text-xs text-muted">
          {active ? "This agent is currently operating." : "This agent will take no actions."}
        </p>
      </div>
      <button
        onClick={() => onChange(active ? "paused" : "active")}
        className={cn(
          "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
          active
            ? "border-negative/40 text-negative hover:bg-negative/10"
            : "border-positive/40 text-positive hover:bg-positive/10"
        )}
      >
        {active ? "Pause Agent" : "Activate Agent"}
      </button>
    </div>
  );
}

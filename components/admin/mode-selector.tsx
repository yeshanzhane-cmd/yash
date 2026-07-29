"use client";

import { cn } from "@/lib/utils";
import type { AgentMode } from "@/lib/types";

const MODES: { id: AgentMode; label: string; description: string }[] = [
  { id: "autonomous", label: "Autonomous", description: "Acts without waiting for approval" },
  { id: "strategic", label: "Strategic", description: "Plans and recommends, executes routine actions" },
  { id: "manual", label: "Manual Approval", description: "Every action requires human sign-off" },
];

export function ModeSelector({
  value,
  onChange,
}: {
  value: AgentMode;
  onChange: (mode: AgentMode) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {MODES.map((mode) => {
        const active = value === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={cn(
              "rounded-lg border p-3 text-left transition-colors",
              active
                ? "border-accent bg-accent-soft"
                : "border-border bg-canvas hover:border-white/20"
            )}
          >
            <p className={cn("text-sm font-medium", active ? "text-accent" : "text-white")}>
              {mode.label}
            </p>
            <p className="mt-0.5 text-xs text-muted">{mode.description}</p>
          </button>
        );
      })}
    </div>
  );
}

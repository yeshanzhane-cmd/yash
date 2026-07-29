"use client";

import Link from "next/link";
import { useAgentStore } from "@/lib/store/agent-store";
import type { DepartmentId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AgentStatusPill({ departmentId }: { departmentId: DepartmentId }) {
  const status = useAgentStore((state) => state.agents[departmentId]?.status ?? "active");
  const active = status === "active";

  return (
    <Link
      href={`/admin/agents/${departmentId}`}
      className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:bg-surface-hover"
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          active ? "bg-positive" : "bg-muted"
        )}
        aria-hidden
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-wide text-muted">AI Agent</span>
        <span className="text-xs font-medium text-white">{active ? "Active" : "Paused"}</span>
      </span>
    </Link>
  );
}

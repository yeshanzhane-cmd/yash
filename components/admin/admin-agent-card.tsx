"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAgentStore } from "@/lib/store/agent-store";
import { cn } from "@/lib/utils";
import type { AgentMeta } from "@/lib/types";

const MODE_LABEL: Record<string, string> = {
  autonomous: "Autonomous",
  strategic: "Strategic",
  manual: "Manual Approval",
};

export function AdminAgentCard({ agent }: { agent: AgentMeta }) {
  const runtime = useAgentStore((state) => state.agents[agent.id]);
  const decisions = useAgentStore((state) => state.decisions);
  const pendingCount = decisions.filter(
    (decision) => decision.agentId === agent.id && decision.status === "pending"
  ).length;

  const status = runtime?.status ?? agent.status;
  const mode = runtime?.mode ?? agent.mode;
  const active = status === "active";

  return (
    <Link
      href={`/admin/agents/${agent.id}`}
      className="group flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-lg text-white">{agent.name}</p>
          <p className="text-xs text-muted">{agent.departmentLabel}</p>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            active ? "bg-positive/15 text-positive" : "bg-white/10 text-muted"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-positive" : "bg-muted")} />
          {active ? "Active" : "Paused"}
        </span>
      </div>

      <p className="text-sm text-muted">{agent.tagline}</p>

      <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-muted">
          Mode: <span className="text-white">{MODE_LABEL[mode]}</span>
        </span>
        {pendingCount > 0 ? (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
            {pendingCount} pending
          </span>
        ) : (
          <span className="text-muted">No pending items</span>
        )}
      </div>

      <span className="flex items-center gap-1 text-xs font-medium text-accent">
        Review agent
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

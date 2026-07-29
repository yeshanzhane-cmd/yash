"use client";

import { AdminShell } from "@/components/layout/admin-shell";
import { AdminAgentCard } from "@/components/admin/admin-agent-card";
import { AGENTS, DEPARTMENT_ORDER } from "@/lib/data/agents";
import { useAgentStore } from "@/lib/store/agent-store";

export default function AdminOverviewPage() {
  const decisions = useAgentStore((state) => state.decisions);
  const pendingCount = decisions.filter((decision) => decision.status === "pending").length;

  return (
    <AdminShell>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl text-white">Agent Oversight</h1>
          <p className="mt-1 text-sm text-muted">
            Review each AI agent&apos;s setup, permissions, and recent decisions.
          </p>
        </div>
        {pendingCount > 0 && (
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
            {pendingCount} decision{pendingCount === 1 ? "" : "s"} awaiting review
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DEPARTMENT_ORDER.map((id) => (
          <AdminAgentCard key={id} agent={AGENTS[id]} />
        ))}
      </div>
    </AdminShell>
  );
}

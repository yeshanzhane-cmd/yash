"use client";

import { useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { PanelCard } from "@/components/ui/panel-card";
import { ApprovalQueueItem } from "@/components/admin/approval-queue-item";
import { useAgentStore } from "@/lib/store/agent-store";
import { cn } from "@/lib/utils";
import type { DecisionStatus } from "@/lib/types";

const FILTERS: { id: DecisionStatus | "all"; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "all", label: "All" },
];

export default function DecisionQueuePage() {
  const [filter, setFilter] = useState<DecisionStatus | "all">("pending");
  const decisions = useAgentStore((state) => state.decisions);

  const filtered = decisions.filter((decision) => filter === "all" || decision.status === filter);

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-white">Decision Queue</h1>
        <p className="mt-1 text-sm text-muted">
          Every decision your AI agents have made or are waiting on you to review, in one place.
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === item.id
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:text-white"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <PanelCard title={`${filtered.length} Decision${filtered.length === 1 ? "" : "s"}`}>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted">Nothing here.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((decision) => (
              <ApprovalQueueItem key={decision.id} decision={decision} />
            ))}
          </div>
        )}
      </PanelCard>
    </AdminShell>
  );
}

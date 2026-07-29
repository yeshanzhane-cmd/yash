"use client";

import Link from "next/link";
import { DecisionLogRow } from "@/components/admin/decision-log-row";
import { AGENTS } from "@/lib/data/agents";
import { useAgentStore } from "@/lib/store/agent-store";
import type { Decision } from "@/lib/types";

export function ApprovalQueueItem({ decision }: { decision: Decision }) {
  const resolveDecision = useAgentStore((state) => state.resolveDecision);
  const agent = AGENTS[decision.agentId];

  return (
    <div>
      <Link
        href={`/admin/agents/${decision.agentId}`}
        className="text-[11px] font-medium uppercase tracking-wide text-accent hover:underline"
      >
        {agent.departmentLabel}
      </Link>
      <DecisionLogRow
        decision={decision}
        onApprove={() => resolveDecision(decision.id, "approved")}
        onReject={() => resolveDecision(decision.id, "rejected")}
      />
    </div>
  );
}

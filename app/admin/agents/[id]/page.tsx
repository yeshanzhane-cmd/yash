"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { StatusToggle } from "@/components/admin/status-toggle";
import { ModeSelector } from "@/components/admin/mode-selector";
import { PermissionToggleRow } from "@/components/admin/permission-toggle-row";
import { TargetEditorRow } from "@/components/admin/target-editor-row";
import { DecisionLogRow } from "@/components/admin/decision-log-row";
import { PanelCard } from "@/components/ui/panel-card";
import { AGENTS, DEPARTMENT_ORDER } from "@/lib/data/agents";
import { useAgentStore } from "@/lib/store/agent-store";
import type { DepartmentId } from "@/lib/types";

export default function AgentReviewPage({ params }: { params: { id: string } }) {
  const departmentId = params.id as DepartmentId;
  const agentMeta = AGENTS[departmentId];

  const runtime = useAgentStore((state) => state.agents[departmentId]);
  const decisions = useAgentStore((state) =>
    state.decisions.filter((decision) => decision.agentId === departmentId)
  );
  const setAgentStatus = useAgentStore((state) => state.setAgentStatus);
  const setAgentMode = useAgentStore((state) => state.setAgentMode);
  const togglePermission = useAgentStore((state) => state.togglePermission);
  const setTargetValue = useAgentStore((state) => state.setTargetValue);
  const resolveDecision = useAgentStore((state) => state.resolveDecision);

  if (!agentMeta || !DEPARTMENT_ORDER.includes(departmentId)) {
    notFound();
  }

  if (!runtime) {
    return null;
  }

  const pendingCount = decisions.filter((decision) => decision.status === "pending").length;

  return (
    <AdminShell>
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Back to Agent Overview
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl text-white">{agentMeta.name}</h1>
          <p className="mt-1 text-sm text-muted">{agentMeta.departmentLabel} · {agentMeta.tagline}</p>
        </div>
        {pendingCount > 0 && (
          <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
            {pendingCount} pending decision{pendingCount === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusToggle status={runtime.status} onChange={(status) => setAgentStatus(departmentId, status)} />
        <PanelCard title="AI Mode">
          <ModeSelector value={runtime.mode} onChange={(mode) => setAgentMode(departmentId, mode)} />
        </PanelCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelCard title="Permissions & Guardrails">
          {runtime.permissions.map((permission) => (
            <PermissionToggleRow
              key={permission.id}
              permission={permission}
              onToggle={() => togglePermission(departmentId, permission.id)}
            />
          ))}
        </PanelCard>
        <PanelCard title="Goal Targets">
          {runtime.targets.map((target) => (
            <TargetEditorRow
              key={target.id}
              target={target}
              onChange={(value) => setTargetValue(departmentId, target.id, value)}
            />
          ))}
        </PanelCard>
      </div>

      <PanelCard title="Decision Audit Log">
        {decisions.length === 0 ? (
          <p className="text-sm text-muted">No decisions logged yet.</p>
        ) : (
          decisions.map((decision) => (
            <DecisionLogRow
              key={decision.id}
              decision={decision}
              onApprove={() => resolveDecision(decision.id, "approved")}
              onReject={() => resolveDecision(decision.id, "rejected")}
            />
          ))
        )}
      </PanelCard>
    </AdminShell>
  );
}

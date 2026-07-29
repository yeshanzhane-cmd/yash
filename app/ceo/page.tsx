"use client";

import { Flag, Rocket, ShieldCheck, Sparkle } from "lucide-react";
import { DepartmentShell } from "@/components/layout/department-shell";
import { DepartmentHeader } from "@/components/layout/department-header";
import { StatCard } from "@/components/ui/stat-card";
import { PanelCard } from "@/components/ui/panel-card";
import { ProgressListItem } from "@/components/ui/progress-list-item";
import { PriorityBadgeRow } from "@/components/ui/priority-badge-row";
import { AgentFlowStrip } from "@/components/ui/agent-flow-strip";
import { DecisionLogRow } from "@/components/admin/decision-log-row";
import { AGENTS } from "@/lib/data/agents";
import { ceoDashboard } from "@/lib/data/dashboards";
import { useAgentStore } from "@/lib/store/agent-store";
import { resolveIcon } from "@/components/icon-map";

const agent = AGENTS.ceo;

const SECONDARY_NAV = [
  { label: "Goals", icon: Flag },
  { label: "Roadmap", icon: Rocket },
  { label: "Decisions", icon: ShieldCheck },
  { label: "Reports", icon: Sparkle },
];

export default function CeoDashboardPage() {
  const decisions = useAgentStore((state) =>
    state.decisions.filter((decision) => decision.agentId === "ceo")
  );
  const resolveDecision = useAgentStore((state) => state.resolveDecision);

  const NowIcon = resolveIcon(ceoDashboard.roadmap.now.icon);
  const NextIcon = resolveIcon(ceoDashboard.roadmap.next.icon);
  const LaterIcon = resolveIcon(ceoDashboard.roadmap.later.icon);

  return (
    <DepartmentShell
      departmentId="ceo"
      departmentLabel={agent.departmentLabel}
      secondaryNav={SECONDARY_NAV}
    >
      <DepartmentHeader
        departmentId="ceo"
        heading={ceoDashboard.greeting}
        subheading={ceoDashboard.subheading}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {agent.kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelCard title="Company Goals">
          {ceoDashboard.goals.map((goal) => (
            <ProgressListItem key={goal.label} label={goal.label} progress={goal.progress} />
          ))}
        </PanelCard>
        <PanelCard title="Weekly Priorities">
          {ceoDashboard.priorities.map((item) => (
            <PriorityBadgeRow key={item.label} label={item.label} priority={item.priority} />
          ))}
        </PanelCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelCard title={`Roadmap · ${ceoDashboard.roadmap.quarter}`}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Now", icon: NowIcon, item: ceoDashboard.roadmap.now },
              { label: "Next", icon: NextIcon, item: ceoDashboard.roadmap.next },
              { label: "Later", icon: LaterIcon, item: ceoDashboard.roadmap.later },
            ].map(({ label, icon: Icon, item }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-canvas p-3 text-center"
              >
                <span className="text-[10px] uppercase tracking-wide text-muted">{label}</span>
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <span className="text-xs text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </PanelCard>
        <PanelCard title="Recent Decisions">
          {decisions.map((decision) => (
            <DecisionLogRow
              key={decision.id}
              decision={decision}
              onApprove={() => resolveDecision(decision.id, "approved")}
              onReject={() => resolveDecision(decision.id, "rejected")}
            />
          ))}
        </PanelCard>
      </div>

      <AgentFlowStrip steps={agent.flow} />
    </DepartmentShell>
  );
}

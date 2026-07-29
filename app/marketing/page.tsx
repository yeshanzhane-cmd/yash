"use client";

import { BarChart3, Calendar, FileText, Image as ImageIcon, Search, Zap } from "lucide-react";
import { DepartmentShell } from "@/components/layout/department-shell";
import { DepartmentHeader } from "@/components/layout/department-header";
import { PanelCard } from "@/components/ui/panel-card";
import { PipelineStageCard } from "@/components/ui/pipeline-stage-card";
import { AgentFlowStrip } from "@/components/ui/agent-flow-strip";
import { AGENTS } from "@/lib/data/agents";
import { marketingDashboard } from "@/lib/data/dashboards";

const agent = AGENTS.marketing;

const SECONDARY_NAV = [
  { label: "Research", icon: Search },
  { label: "Content", icon: FileText },
  { label: "Calendar", icon: Calendar },
  { label: "Analytics", icon: BarChart3 },
  { label: "Assets", icon: ImageIcon },
  { label: "Automations", icon: Zap },
];

export default function MarketingDashboardPage() {
  return (
    <DepartmentShell
      departmentId="marketing"
      departmentLabel={agent.departmentLabel}
      secondaryNav={SECONDARY_NAV}
    >
      <DepartmentHeader
        departmentId="marketing"
        heading={marketingDashboard.overview.heading}
        subheading={marketingDashboard.overview.description}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {agent.kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-border bg-surface p-4">
            <p className="font-display text-2xl text-white">{kpi.value}</p>
            <p className="mt-1 text-xs text-muted">{kpi.label}</p>
          </div>
        ))}
      </div>

      <PanelCard title="Content Pipeline" className="mb-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {marketingDashboard.pipeline.map((stage) => (
            <PipelineStageCard
              key={stage.key}
              title={stage.title}
              description={stage.description}
              items={stage.items}
              status={stage.status}
            />
          ))}
        </div>
      </PanelCard>

      <PanelCard title="Content Calendar" className="mb-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {marketingDashboard.calendar.map((day) => (
            <div
              key={day.day}
              className="flex flex-col gap-2 rounded-lg border border-border bg-canvas p-3"
            >
              <span className="text-[10px] uppercase tracking-wide text-muted">{day.day}</span>
              <span className="text-sm text-white">{day.title}</span>
              <span className="text-xs text-accent">{day.time}</span>
            </div>
          ))}
        </div>
      </PanelCard>

      <AgentFlowStrip steps={agent.flow} />
    </DepartmentShell>
  );
}

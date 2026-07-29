"use client";

import { Calendar, DollarSign, FileText, Send, Target, Users } from "lucide-react";
import { DepartmentShell } from "@/components/layout/department-shell";
import { DepartmentHeader } from "@/components/layout/department-header";
import { StatCard } from "@/components/ui/stat-card";
import { PanelCard } from "@/components/ui/panel-card";
import { ActivityFeedItem } from "@/components/ui/activity-feed-item";
import { AgentFlowStrip } from "@/components/ui/agent-flow-strip";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { DonutChart, DonutLegend } from "@/components/charts/donut-chart";
import { AGENTS } from "@/lib/data/agents";
import { salesDashboard } from "@/lib/data/dashboards";

const agent = AGENTS.sales;

const SECONDARY_NAV = [
  { label: "Leads", icon: Users },
  { label: "Outreach", icon: Send },
  { label: "Pipeline", icon: Target },
  { label: "Meetings", icon: Calendar },
  { label: "Deals", icon: DollarSign },
  { label: "Reports", icon: FileText },
];

export default function SalesDashboardPage() {
  return (
    <DepartmentShell
      departmentId="sales"
      departmentLabel={agent.departmentLabel}
      secondaryNav={SECONDARY_NAV}
    >
      <DepartmentHeader
        departmentId="sales"
        heading="Sales Overview"
        subheading={agent.tagline}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {agent.kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="Sales Pipeline" className="lg:col-span-2">
          <FunnelChart stages={salesDashboard.pipeline} />
        </PanelCard>

        <div className="flex flex-col gap-4">
          <PanelCard title="Top Lead Sources">
            <DonutChart data={salesDashboard.leadSources} />
            <DonutLegend data={salesDashboard.leadSources} />
          </PanelCard>

          <PanelCard title="Outreach Performance">
            {salesDashboard.outreachPerformance.map((row) => (
              <div key={row.label} className="mb-2.5 flex items-center justify-between text-sm last:mb-0">
                <span className="text-muted">{row.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-medium text-white">{row.value}</span>
                  <span className="text-xs text-positive">↗ {row.delta}</span>
                </span>
              </div>
            ))}
          </PanelCard>

          <PanelCard title="Recent Activity">
            {salesDashboard.recentActivity.map((item) => (
              <ActivityFeedItem key={item.text} text={item.text} timestamp={item.timestamp} />
            ))}
          </PanelCard>
        </div>
      </div>

      <AgentFlowStrip steps={agent.flow} />
    </DepartmentShell>
  );
}

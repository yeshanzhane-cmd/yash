"use client";

import { FileText, PiggyBank, Receipt, Settings2, TrendingDown, TrendingUp } from "lucide-react";
import { DepartmentShell } from "@/components/layout/department-shell";
import { DepartmentHeader } from "@/components/layout/department-header";
import { StatCard } from "@/components/ui/stat-card";
import { PanelCard } from "@/components/ui/panel-card";
import { ProgressListItem } from "@/components/ui/progress-list-item";
import { AgentFlowStrip } from "@/components/ui/agent-flow-strip";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { DonutChart, DonutLegend } from "@/components/charts/donut-chart";
import { AGENTS } from "@/lib/data/agents";
import { financeDashboard } from "@/lib/data/dashboards";

const agent = AGENTS.finance;

const SECONDARY_NAV = [
  { label: "Revenue", icon: TrendingUp },
  { label: "Expenses", icon: TrendingDown },
  { label: "Cash Flow", icon: PiggyBank },
  { label: "Forecast", icon: FileText },
  { label: "Taxes", icon: Receipt },
  { label: "Automations", icon: Settings2 },
];

export default function FinanceDashboardPage() {
  return (
    <DepartmentShell
      departmentId="finance"
      departmentLabel={agent.departmentLabel}
      secondaryNav={SECONDARY_NAV}
    >
      <DepartmentHeader
        departmentId="finance"
        heading="Finance Overview"
        subheading={agent.tagline}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {agent.kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="Revenue Overview" className="lg:col-span-2">
          <BarChart data={financeDashboard.revenueOverview} />
        </PanelCard>
        <PanelCard title="Expenses Breakdown">
          <DonutChart data={financeDashboard.expensesBreakdown} />
          <DonutLegend data={financeDashboard.expensesBreakdown} />
        </PanelCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="Profit & Margin">
          <LineChart data={financeDashboard.profitMargin} />
        </PanelCard>
        <PanelCard title="Cash Flow">
          <BarChart data={financeDashboard.cashFlow} />
        </PanelCard>
        <PanelCard title="Forecast (Next 6 Months)">
          <LineChart data={financeDashboard.forecast} />
        </PanelCard>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="Recent Financial Activity">
          {financeDashboard.recentActivity.map((item) => (
            <div
              key={item.text}
              className="mb-2.5 flex items-center justify-between text-sm last:mb-0"
            >
              <div>
                <p className="text-white">{item.text}</p>
                <p className="text-xs text-muted">{item.timestamp}</p>
              </div>
              <span className={item.positive ? "text-positive" : "text-negative"}>
                {item.amount}
              </span>
            </div>
          ))}
        </PanelCard>
        <PanelCard title="AI Insight">
          <p className="text-sm leading-relaxed text-white">{financeDashboard.aiInsight}</p>
        </PanelCard>
        <PanelCard title="Top Revenue Sources">
          {financeDashboard.topRevenueSources.map((source) => (
            <ProgressListItem key={source.label} label={source.label} progress={source.value} />
          ))}
        </PanelCard>
      </div>

      <AgentFlowStrip steps={agent.flow} />
    </DepartmentShell>
  );
}

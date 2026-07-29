"use client";

import { BookOpen, HelpCircle, Inbox, MessageCircle, Settings2, Ticket } from "lucide-react";
import { DepartmentShell } from "@/components/layout/department-shell";
import { DepartmentHeader } from "@/components/layout/department-header";
import { StatCard } from "@/components/ui/stat-card";
import { PanelCard } from "@/components/ui/panel-card";
import { MetricRow } from "@/components/ui/metric-row";
import { ProgressListItem } from "@/components/ui/progress-list-item";
import { ActivityFeedItem } from "@/components/ui/activity-feed-item";
import { AgentFlowStrip } from "@/components/ui/agent-flow-strip";
import { DonutChart } from "@/components/charts/donut-chart";
import { AGENTS } from "@/lib/data/agents";
import { supportDashboard } from "@/lib/data/dashboards";

const agent = AGENTS.support;

const SECONDARY_NAV = [
  { label: "Inbox", icon: Inbox },
  { label: "Live Chat", icon: MessageCircle },
  { label: "Tickets", icon: Ticket },
  { label: "Knowledge Base", icon: BookOpen },
  { label: "FAQ", icon: HelpCircle },
  { label: "Automations", icon: Settings2 },
];

const ticketTotal = supportDashboard.ticketStatus.reduce((sum, item) => sum + item.value, 0);

export default function SupportDashboardPage() {
  return (
    <DepartmentShell
      departmentId="support"
      departmentLabel={agent.departmentLabel}
      secondaryNav={SECONDARY_NAV}
    >
      <DepartmentHeader
        departmentId="support"
        heading="Support Overview"
        subheading={agent.tagline}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {agent.kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelCard title="Support Channels">
          {supportDashboard.channels.map((channel) => (
            <MetricRow
              key={channel.key}
              label={channel.label}
              description={channel.description}
              value={channel.value}
              unit={channel.unit}
            />
          ))}
        </PanelCard>
        <PanelCard title={`Ticket Status · ${ticketTotal} Total`}>
          <DonutChart
            data={supportDashboard.ticketStatus}
            centerLabel="Total"
            centerValue={ticketTotal}
          />
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {supportDashboard.ticketStatus.map((item) => (
              <li key={item.name} className="flex items-center justify-between">
                <span className="text-muted">{item.name}</span>
                <span className="font-medium text-white">{item.value}</span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <PanelCard title="AI Knowledge Base" className="mb-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Articles Published", value: supportDashboard.knowledgeBase.articles },
            { label: "Views This Month", value: supportDashboard.knowledgeBase.viewsThisMonth },
            { label: "Helpful Rate", value: supportDashboard.knowledgeBase.helpfulRate },
            { label: "Updated Today", value: supportDashboard.knowledgeBase.updatedToday },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-xl text-white">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </PanelCard>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelCard title="Popular Topics">
          {supportDashboard.popularTopics.map((topic) => (
            <ProgressListItem key={topic.label} label={topic.label} progress={topic.value} />
          ))}
        </PanelCard>
        <PanelCard title="Recent Resolved Tickets">
          {supportDashboard.recentResolved.map((item) => (
            <ActivityFeedItem key={item.text} text={item.text} timestamp={item.timestamp} />
          ))}
        </PanelCard>
      </div>

      <AgentFlowStrip steps={agent.flow} />
    </DepartmentShell>
  );
}

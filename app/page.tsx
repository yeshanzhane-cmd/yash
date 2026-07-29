"use client";

import Link from "next/link";
import { ArrowRight, Crown, Landmark, LifeBuoy, Megaphone, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { IconRail } from "@/components/layout/icon-rail";
import { AGENTS, DEPARTMENT_ORDER } from "@/lib/data/agents";
import { useAgentStore } from "@/lib/store/agent-store";
import { cn } from "@/lib/utils";
import type { DepartmentId } from "@/lib/types";

const DEPARTMENT_ICONS: Record<DepartmentId, typeof Crown> = {
  ceo: Crown,
  marketing: Megaphone,
  sales: TrendingUp,
  support: LifeBuoy,
  finance: Landmark,
};

export default function LandingPage() {
  return (
    <div className="flex h-screen">
      <IconRail />
      <main className="flex-1 overflow-y-auto p-10">
        <div className="mb-10 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" aria-hidden />
          <div>
            <h1 className="font-display text-2xl text-white">Alpha X</h1>
            <p className="text-sm text-muted">Your AI Company OS. Five agents, one command center.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DEPARTMENT_ORDER.map((id) => (
            <DepartmentTile key={id} departmentId={id} />
          ))}

          <Link
            href="/admin"
            className="group flex flex-col justify-between gap-4 rounded-lg border border-dashed border-border bg-canvas p-5 transition-colors hover:border-accent/50"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-accent" aria-hidden />
              <div>
                <p className="font-display text-lg text-white">Admin Panel</p>
                <p className="text-xs text-muted">Review every agent&apos;s setup</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-accent">
              Open Admin Panel
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

function DepartmentTile({ departmentId }: { departmentId: DepartmentId }) {
  const agent = AGENTS[departmentId];
  const status = useAgentStore((state) => state.agents[departmentId]?.status ?? agent.status);
  const active = status === "active";
  const Icon = DEPARTMENT_ICONS[departmentId];

  return (
    <Link
      href={`/${departmentId}`}
      className="group flex flex-col justify-between gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="font-display text-lg text-white">{agent.departmentLabel}</p>
            <p className="text-xs text-muted">{agent.tagline}</p>
          </div>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
            active ? "bg-positive/15 text-positive" : "bg-white/10 text-muted"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-positive" : "bg-muted")} />
          {active ? "Active" : "Paused"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border pt-3">
        {agent.kpis.slice(0, 2).map((kpi) => (
          <div key={kpi.label}>
            <p className="text-sm font-semibold text-white">{kpi.value}</p>
            <p className="text-[11px] text-muted">{kpi.label}</p>
          </div>
        ))}
      </div>

      <span className="flex items-center gap-1 text-xs font-medium text-accent">
        Open dashboard
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

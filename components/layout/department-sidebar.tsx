import Link from "next/link";
import { Settings, Sparkles, type LucideIcon } from "lucide-react";
import { AgentStatusPill } from "@/components/ui/agent-status-pill";
import type { DepartmentId } from "@/lib/types";

export interface SecondaryNavItem {
  label: string;
  icon: LucideIcon;
}

interface DepartmentSidebarProps {
  departmentId: DepartmentId;
  departmentLabel: string;
  secondaryNav: SecondaryNavItem[];
}

export function DepartmentSidebar({
  departmentId,
  departmentLabel,
  secondaryNav,
}: DepartmentSidebarProps) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-canvas p-4">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" aria-hidden />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">{departmentLabel}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted">Command Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <Link
          href={`/${departmentId}`}
          className="flex items-center gap-2.5 rounded-lg bg-accent-soft px-3 py-2 text-sm font-medium text-accent"
        >
          Overview
        </Link>
        {secondaryNav.map(({ label, icon: Icon }) => (
          <div
            key={label}
            title="Coming soon"
            className="flex cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted/70"
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </div>
        ))}
      </nav>

      <div className="space-y-3 border-t border-border pt-4">
        <Link
          href={`/admin/agents/${departmentId}`}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-white"
        >
          <Settings className="h-4 w-4" aria-hidden />
          Settings
        </Link>
        <AgentStatusPill departmentId={departmentId} />
      </div>
    </aside>
  );
}

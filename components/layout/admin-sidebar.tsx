"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ListChecks, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Agent Overview", icon: LayoutGrid },
  { href: "/admin/decisions", label: "Decision Queue", icon: ListChecks },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-canvas p-4">
      <div className="mb-6 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-accent" aria-hidden />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Admin Panel</p>
          <p className="text-[10px] uppercase tracking-wide text-muted">Agent Oversight</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-hover hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

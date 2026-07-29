import type { ReactNode } from "react";
import { IconRail } from "@/components/layout/icon-rail";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <IconRail />
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}

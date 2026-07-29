import type { ReactNode } from "react";
import { IconRail } from "@/components/layout/icon-rail";
import { DepartmentSidebar, type SecondaryNavItem } from "@/components/layout/department-sidebar";
import type { DepartmentId } from "@/lib/types";

interface DepartmentShellProps {
  departmentId: DepartmentId;
  departmentLabel: string;
  secondaryNav: SecondaryNavItem[];
  children: ReactNode;
}

export function DepartmentShell({
  departmentId,
  departmentLabel,
  secondaryNav,
  children,
}: DepartmentShellProps) {
  return (
    <div className="flex h-screen">
      <IconRail />
      <DepartmentSidebar
        departmentId={departmentId}
        departmentLabel={departmentLabel}
        secondaryNav={secondaryNav}
      />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}

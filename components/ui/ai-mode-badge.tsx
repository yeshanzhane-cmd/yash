"use client";

import { useAgentStore } from "@/lib/store/agent-store";
import type { DepartmentId } from "@/lib/types";

const MODE_LABEL: Record<string, string> = {
  autonomous: "Autonomous",
  strategic: "Strategic",
  manual: "Manual Approval",
};

export function AiModeBadge({ departmentId }: { departmentId: DepartmentId }) {
  const mode = useAgentStore((state) => state.agents[departmentId]?.mode ?? "strategic");

  return (
    <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      AI MODE: {MODE_LABEL[mode] ?? mode}
    </span>
  );
}

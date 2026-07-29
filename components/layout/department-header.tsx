import { AiModeBadge } from "@/components/ui/ai-mode-badge";
import type { DepartmentId } from "@/lib/types";

interface DepartmentHeaderProps {
  departmentId: DepartmentId;
  heading: string;
  subheading: string;
}

export function DepartmentHeader({ departmentId, heading, subheading }: DepartmentHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="font-display text-2xl text-white">{heading}</h1>
        <p className="mt-1 text-sm text-muted">{subheading}</p>
      </div>
      <AiModeBadge departmentId={departmentId} />
    </div>
  );
}

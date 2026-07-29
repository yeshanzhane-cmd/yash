import { ArrowRight } from "lucide-react";
import { resolveIcon } from "@/components/icon-map";
import type { FlowStep } from "@/lib/types";

export function AgentFlowStrip({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex items-center justify-center gap-6 rounded-lg border border-border bg-surface px-6 py-6">
      {steps.map((step, index) => {
        const Icon = resolveIcon(step.icon);
        const isLast = index === steps.length - 1;
        return (
          <div key={step.label} className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-white">
                {step.label}
              </span>
            </div>
            {!isLast && <ArrowRight className="h-4 w-4 text-accent" aria-hidden />}
          </div>
        );
      })}
    </div>
  );
}

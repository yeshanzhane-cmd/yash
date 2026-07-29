"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Decision } from "@/lib/types";

const STATUS_STYLES: Record<Decision["status"], string> = {
  pending: "bg-white/10 text-muted",
  approved: "bg-positive/15 text-positive",
  rejected: "bg-negative/15 text-negative",
};

export function DecisionLogRow({
  decision,
  onApprove,
  onReject,
}: {
  decision: Decision;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <div>
        <p className="text-sm text-white">{decision.text}</p>
        <p className="text-xs text-muted">{decision.timestamp}</p>
      </div>
      <div className="flex items-center gap-2">
        {decision.status === "pending" ? (
          <>
            <button
              onClick={onReject}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-negative transition-colors hover:bg-negative/10"
              aria-label="Reject decision"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
            <button
              onClick={onApprove}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-positive transition-colors hover:bg-positive/10"
              aria-label="Approve decision"
            >
              <Check className="h-3.5 w-3.5" aria-hidden />
            </button>
          </>
        ) : (
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_STYLES[decision.status])}>
            {decision.status}
          </span>
        )}
      </div>
    </div>
  );
}

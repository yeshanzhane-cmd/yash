"use client";

import { useState } from "react";
import type { Target } from "@/lib/types";

export function TargetEditorRow({
  target,
  onChange,
}: {
  target: Target;
  onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(target.value));

  const commit = () => {
    const parsed = Number(draft);
    if (Number.isFinite(parsed) && parsed >= 0) {
      onChange(parsed);
    } else {
      setDraft(String(target.value));
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <p className="text-sm text-white">{target.label}</p>
      <div className="flex items-center gap-1.5">
        {target.unit === "$" && <span className="text-sm text-muted">$</span>}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
          }}
          inputMode="numeric"
          className="w-24 rounded-md border border-border bg-surface px-2 py-1 text-right text-sm text-white focus:border-accent focus:outline-none"
        />
        {target.unit !== "$" && <span className="text-xs text-muted">{target.unit}</span>}
      </div>
    </div>
  );
}

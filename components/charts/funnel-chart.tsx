interface FunnelStage {
  key: string;
  label: string;
  description: string;
  value: number;
  unit: string;
}

export function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const max = Math.max(...stages.map((stage) => stage.value));

  return (
    <div className="flex flex-col items-center gap-1">
      {stages.map((stage) => {
        const widthPct = Math.max(18, (stage.value / max) * 100);
        return (
          <div key={stage.key} className="w-full" style={{ maxWidth: `${widthPct}%` }}>
            <div className="rounded-md border border-accent/40 bg-accent-soft px-4 py-2.5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-accent">
                {stage.label}
              </p>
              <p className="font-display text-lg text-white">
                {stage.value.toLocaleString()}
                <span className="ml-1 text-xs font-normal text-muted">{stage.unit}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MetricRow({
  label,
  description,
  value,
  unit,
}: {
  label: string;
  description: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <div className="text-right">
        <p className="font-display text-lg text-white">{value.toLocaleString()}</p>
        <p className="text-[10px] uppercase tracking-wide text-muted">{unit}</p>
      </div>
    </div>
  );
}

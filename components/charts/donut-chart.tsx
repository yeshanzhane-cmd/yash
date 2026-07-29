"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#ff6a00", "#f59e0b", "#6b7280", "#3f3f46", "#27272a", "#52525b"];

interface DonutDatum {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: DonutDatum[];
  centerLabel?: string;
  centerValue?: string | number;
}

export function DonutChart({ data, centerLabel, centerValue }: DonutChartProps) {
  return (
    <div className="relative h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="65%"
            outerRadius="100%"
            paddingAngle={2}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#141416",
              border: "1px solid #232326",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerValue !== undefined && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg text-white">{centerValue}</span>
          {centerLabel && <span className="text-[10px] uppercase text-muted">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function DonutLegend({ data }: { data: DonutDatum[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {data.map((entry, index) => (
        <li key={entry.name} className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-muted">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </span>
          <span className="font-medium text-white">{entry.value}%</span>
        </li>
      ))}
    </ul>
  );
}

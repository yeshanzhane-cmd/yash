"use client";

import { Bar, BarChart as RBarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface BarDatum {
  label: string;
  value: number;
}

export function BarChart({ data }: { data: BarDatum[] }) {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9a9aa0", fontSize: 11 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "#141416",
              border: "1px solid #232326",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.value < 0 ? "#ef4444" : "#ff6a00"} />
            ))}
          </Bar>
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

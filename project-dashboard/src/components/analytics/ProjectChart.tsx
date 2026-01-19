'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ProjectChartProps {
  data: { name: string; active: number; completed: number }[];
}

export function ProjectChart({ data }: ProjectChartProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Projects Overview
      </h3>
      <ResponsiveContainer width="95%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="name" stroke="#71717a" />
          <YAxis stroke="#71717a" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="active" fill="#3b82f6" name="Active" />
          <Bar dataKey="completed" fill="#10b981" name="Completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

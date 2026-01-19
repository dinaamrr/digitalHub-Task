import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down';
  color?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  trend,
  color = 'blue',
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        {change && (
          <span
            className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        {value}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{title}</p>
    </div>
  );
}

'use client';

import { Task } from '@/store/slices/tasksSlice';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const statusColors = {
    todo: 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400',
    'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    review: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    done: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  };

  const priorityColors = {
    low: 'border-l-green-500',
    medium: 'border-l-yellow-500',
    high: 'border-l-red-500',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-zinc-900 rounded-lg p-4 border-l-4 ${
        priorityColors[task.priority]
      } border-r border-t border-b border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-all cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 flex-1">
          {task.title}
        </h4>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
          <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
        </div>
      </div>
    </div>
  );
}

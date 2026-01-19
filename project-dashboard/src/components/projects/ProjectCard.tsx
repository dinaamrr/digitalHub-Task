'use client';

import { Project } from '@/store/slices/projectsSlice';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusColors = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'on-hold': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[project.status]
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            Progress
          </span>
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
            {project.progress}%
          </span>
        </div>
        <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
          <span>{format(new Date(project.endDate), 'MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
          <span>{project.teamMembers.length} members</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useAppSelector } from '@/store/hooks';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { FolderKanban, CheckSquare, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { projects } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);

  const stats = useMemo(() => {
    const activeProjects = projects.filter((p) => p.status === 'active').length;
    const completedProjects = projects.filter(
      (p) => p.status === 'completed'
    ).length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'done').length;
    const avgProgress =
      projects.length > 0
        ? Math.round(
            projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
          )
        : 0;

    return {
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      avgProgress,
    };
  }, [projects, tasks]);

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={FolderKanban}
          color="blue"
        />
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={CheckSquare}
          color="purple"
        />
        <StatsCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={CheckSquare}
          color="green"
        />
        <StatsCard
          title="Avg. Progress"
          value={`${stats.avgProgress}%`}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Recent Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-zinc-500 dark:text-zinc-400">
              No projects yet. Create your first project to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

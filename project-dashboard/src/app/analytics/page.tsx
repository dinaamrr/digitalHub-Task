'use client';

import { useAppSelector } from '@/store/hooks';
import { ProjectChart } from '@/components/analytics/ProjectChart';
import { TaskProgressChart } from '@/components/analytics/TaskProgressChart';
import { useMemo } from 'react';

export default function AnalyticsPage() {
  const { projects } = useAppSelector((state) => state.projects);
  const { tasks } = useAppSelector((state) => state.tasks);

  const projectData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month) => ({
      name: month,
      active: Math.floor(Math.random() * 10) + 5,
      completed: Math.floor(Math.random() * 5) + 2,
    }));
  }, []);

  const taskStatusData = useMemo(() => {
    const statusCounts = {
      todo: tasks.filter((t) => t.status === 'todo').length,
      'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
      review: tasks.filter((t) => t.status === 'review').length,
      done: tasks.filter((t) => t.status === 'done').length,
    };

    return Object.entries(statusCounts).map(([name, value]) => ({
      name: name.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      value,
    }));
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectChart data={projectData} />
        <TaskProgressChart data={taskStatusData} />
      </div>
    </div>
  );
}

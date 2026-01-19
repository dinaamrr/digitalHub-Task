'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProjects } from '@/store/slices/projectsSlice';
import { setTasks } from '@/store/slices/tasksSlice';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import DashboardPage from './dashboard/page';
import ProjectsPage from './projects/page';
import TasksPage from './tasks/page';
import AnalyticsPage from './analytics/page';
import { Project } from '@/store/slices/projectsSlice';
import { Task } from '@/store/slices/tasksSlice';
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    status: 'active',
    progress: 65,
    startDate: new Date('2024-01-15').toISOString(),
    endDate: new Date('2024-03-30').toISOString(),
    teamMembers: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build a cross-platform mobile application for iOS and Android',
    status: 'active',
    progress: 40,
    startDate: new Date('2024-02-01').toISOString(),
    endDate: new Date('2024-05-15').toISOString(),
    teamMembers: ['Alice Brown', 'Charlie Wilson'],
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party APIs for payment and authentication',
    status: 'completed',
    progress: 100,
    startDate: new Date('2023-12-01').toISOString(),
    endDate: new Date('2024-01-20').toISOString(),
    teamMembers: ['David Lee', 'Emma Davis'],
    createdAt: new Date('2023-11-25').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Design Homepage Mockup',
    description: 'Create initial design mockup for the homepage',
    status: 'done',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: new Date('2024-02-15').toISOString(),
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    title: 'Implement Responsive Layout',
    description: 'Make the layout responsive for mobile and tablet devices',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Jane Smith',
    dueDate: new Date('2024-02-28').toISOString(),
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    projectId: '2',
    title: 'Setup Development Environment',
    description: 'Configure React Native development environment',
    status: 'done',
    priority: 'medium',
    assignee: 'Alice Brown',
    dueDate: new Date('2024-02-05').toISOString(),
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    projectId: '2',
    title: 'Design App Icons',
    description: 'Create app icons for both iOS and Android platforms',
    status: 'review',
    priority: 'medium',
    assignee: 'Charlie Wilson',
    dueDate: new Date('2024-02-20').toISOString(),
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    projectId: '1',
    title: 'Content Migration',
    description: 'Migrate existing content to the new website structure',
    status: 'todo',
    priority: 'low',
    assignee: 'Bob Johnson',
    dueDate: new Date('2024-03-10').toISOString(),
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { activeView } = useAppSelector((state) => state.ui);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Initialize with mock data
    dispatch(setProjects(mockProjects));
    dispatch(setTasks(mockTasks));
  }, [dispatch, isAuthenticated, router]);

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'projects':
        return <ProjectsPage />;
      case 'tasks':
        return <TasksPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'dashboard':
      default:
        return <DashboardPage />;
    }
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
}

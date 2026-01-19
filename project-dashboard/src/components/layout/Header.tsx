'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';
import { Menu, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { activeView } = useAppSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const getPageInfo = () => {
    switch (activeView) {
      case 'dashboard':
        return { name: 'Dashboard', description: 'Overview of your projects and tasks' };
      case 'projects':
        return { name: 'Projects', description: 'Manage and track your projects' };
      case 'tasks':
        return { name: 'Tasks', description: 'Manage your tasks and track progress' };
      case 'analytics':
        return { name: 'Analytics', description: 'Insights and metrics for your projects and tasks' };
      default:
        return { name: 'Dashboard', description: 'Overview of your projects and tasks' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden transition-colors"
          >
            <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-300" strokeWidth={2} />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {pageInfo.name}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {pageInfo.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
              {user?.firstName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-3 border-b border-zinc-300">
                <p className="text-sm font-medium text-zinc-900">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.lastName || 'User'}
                </p>
                <p className="text-xs text-zinc-500">
                  {user?.email || ''}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-zinc-100 transition-colors"
              >
                <LogOut className="w-4 h-4" strokeWidth={2} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

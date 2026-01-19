'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveView, toggleSidebar } from '@/store/slices/uiSlice';
import { LayoutDashboard, FolderKanban, CheckSquare, BarChart3, X, Menu } from 'lucide-react';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarOpen, activeView } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleNavClick = (view: typeof activeView) => {
    dispatch(setActiveView(view));
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            ProjectHub
          </h1>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-700 dark:text-zinc-300" strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as typeof activeView)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {user?.firstName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.lastName || 'User'}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

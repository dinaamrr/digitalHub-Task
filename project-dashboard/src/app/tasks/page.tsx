'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { addTask, updateTask, deleteTask } from '@/store/slices/tasksSlice';
import { Task } from '@/store/slices/tasksSlice';
import { Plus, Search, Filter } from 'lucide-react';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);
  const { projects } = useAppSelector((state) => state.projects);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupedTasks = {
    todo: filteredTasks.filter((t) => t.status === 'todo'),
    'in-progress': filteredTasks.filter((t) => t.status === 'in-progress'),
    review: filteredTasks.filter((t) => t.status === 'review'),
    done: filteredTasks.filter((t) => t.status === 'done'),
  };

  const handleSubmit = (data: any) => {
    const taskData: Task = {
      ...data,
      id: editingTask?.id || `task-${Date.now()}`,
      createdAt: editingTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: new Date(data.dueDate).toISOString(),
    };

    if (editingTask) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingTask(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500 pointer-events-none z-10" strokeWidth={2} /> */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-4 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 capitalize">
                {status.replace('-', ' ')}
              </h3>
              <span className="px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {statusTasks.length}
              </span>
            </div>
            <div className="space-y-3 min-h-[200px]">
              {statusTasks.length > 0 ? (
                statusTasks.map((task) => (
                  <div key={task.id} className="relative group">
                    <TaskCard
                      task={task}
                      onClick={() => handleEdit(task)}
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(task);
                        }}
                        className="p-1 bg-white dark:bg-zinc-800 rounded shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task.id);
                        }}
                        className="p-1 bg-red-500 text-white rounded shadow-md hover:bg-red-600 text-xs"
                      >
                        Del
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-zinc-400 dark:text-zinc-500 text-sm">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          projects={projects.map((p) => ({ id: p.id, name: p.name }))}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(undefined);
          }}
        />
      )}
    </div>
  );
}

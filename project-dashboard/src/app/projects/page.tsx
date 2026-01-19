'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { addProject, updateProject, deleteProject } from '@/store/slices/projectsSlice';
import { Project } from '@/store/slices/projectsSlice';
import { Plus, Search } from 'lucide-react';

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (data: any) => {
    const projectData: Project = {
      ...data,
      id: editingProject?.id || `project-${Date.now()}`,
      progress: editingProject?.progress || 0,
      createdAt: editingProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    if (editingProject) {
      dispatch(updateProject(projectData));
    } else {
      dispatch(addProject(projectData));
    }
    setShowForm(false);
    setEditingProject(undefined);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingProject(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          New Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500 pointer-events-none z-10" strokeWidth={2} /> */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="relative group">
              <ProjectCard
                project={project}
                onClick={() => handleEdit(project)}
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(project);
                  }}
                  className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project.id);
                  }}
                  className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-zinc-500 dark:text-zinc-400">
            {searchQuery
              ? 'No projects found matching your search.'
              : 'No projects yet. Create your first project to get started!'}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(undefined);
          }}
        />
      )}
    </div>
  );
}

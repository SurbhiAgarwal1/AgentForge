'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Search,
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
  Cpu,
  Calendar,
} from 'lucide-react';
import { projects, agents } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
};

const projectStatusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  generating: {
    label: 'Generating',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  building: {
    label: 'Building',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    dot: 'bg-yellow-400',
  },
  reviewing: {
    label: 'Reviewing',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    dot: 'bg-purple-400',
  },
  deploying: {
    label: 'Deploying',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    dot: 'bg-green-400',
  },
  completed: {
    label: 'Completed',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  error: {
    label: 'Error',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    dot: 'bg-red-400',
  },
};

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Generating', value: 'generating' },
  { label: 'Building', value: 'building' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'Completed', value: 'completed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

function ProjectStatusBadge({ status }: { status: string }) {
  const config = projectStatusConfig[status] || projectStatusConfig.building;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        config.bg,
        config.color
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}

function AgentAvatarSmall({ agentId }: { agentId: string }) {
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) return null;

  const IconComponent = iconMap[agent.avatar] || Cpu;

  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-lg"
      style={{ backgroundColor: `${agent.color}20` }}
      title={agent.name}
    >
      <IconComponent className="h-3.5 w-3.5" style={{ color: agent.color }} />
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {project.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {project.description}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-300">{project.progress}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                delay: 0.3,
              }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
            />
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-xs text-gray-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer: Agent Avatars + Date */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4">
          <div className="flex items-center gap-1">
            <span className="mr-2 text-xs text-gray-600">Agents:</span>
            <div className="flex -space-x-1">
              {project.agents.map((agentId) => (
                <AgentAvatarSmall key={agentId} agentId={agentId} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(project.createdAt)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === 'all' || project.status === activeFilter;

    const matchesSearch =
      searchQuery === '' ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your AI-generated projects
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 outline-none transition-colors focus:border-cyan-500/50 focus:bg-white/[0.06] sm:w-64"
            />
          </div>

          {/* New Project Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-shadow hover:shadow-cyan-500/30"
          >
            <Plus className="h-4 w-4" />
            New Project
          </motion.button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {filterTabs.map((tab) => {
          const count =
            tab.value === 'all'
              ? projects.length
              : projects.filter((p) => p.status === tab.value).length;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                activeFilter === tab.value
                  ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 ring-1 ring-cyan-500/20'
                  : 'text-gray-500 hover:bg-white/[0.05] hover:text-gray-300'
              )}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-gray-600">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderKanban className="mb-4 h-12 w-12 text-gray-700" />
          <p className="text-sm text-gray-500">No projects match your filter</p>
          <p className="mt-1 text-xs text-gray-600">Try adjusting your search or filter</p>
        </div>
      )}
    </motion.div>
  );
}

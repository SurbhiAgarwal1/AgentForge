'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Bot,
  Rocket,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { projects, agents, deployments, activityItems } from '@/lib/mock-data';
import { PromptInput } from '@/components/dashboard/prompt-input';
import { FileExplorer } from '@/components/dashboard/file-explorer';
import { CodePreview } from '@/components/dashboard/code-preview';
import { AgentPanel } from '@/components/dashboard/agent-panel';
import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { cn } from '@/lib/utils';
import type { ProjectFile } from '@/lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const stats = [
  {
    label: 'Active Projects',
    value: projects.filter((p) => p.status !== 'completed').length,
    icon: FolderKanban,
    color: '#06b6d4',
    bgColor: 'bg-cyan-500/10',
    change: '+2 this week',
  },
  {
    label: 'Agents Working',
    value: agents.filter((a) => a.status === 'working' || a.status === 'thinking').length,
    icon: Bot,
    color: '#8b5cf6',
    bgColor: 'bg-purple-500/10',
    change: `${agents.length} total`,
  },
  {
    label: 'Deployments',
    value: deployments.length,
    icon: Rocket,
    color: '#06b6d4',
    bgColor: 'bg-cyan-500/10',
    change: `${deployments.filter((d) => d.status === 'live').length} live`,
  },
  {
    label: 'Tasks Completed',
    value: activityItems.filter((a) => a.type === 'test' || a.type === 'review').length,
    icon: CheckCircle2,
    color: '#8b5cf6',
    bgColor: 'bg-purple-500/10',
    change: '94% pass rate',
  },
];

function StatCard({
  stat,
}: {
  stat: (typeof stats)[0];
}) {
  const IconComponent = stat.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          <p className="mt-1 text-xs text-gray-600">{stat.change}</p>
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', stat.bgColor)}>
          <IconComponent className="h-5 w-5" style={{ color: stat.color }} />
        </div>
      </div>
    </motion.div>
  );
}

function RecentDeployments() {
  const recentDeploys = deployments.slice(0, 3);

  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <h3 className="text-sm font-semibold text-white">Recent Deployments</h3>
        <a href="/dashboard/deployments" className="text-xs text-cyan-400 transition-colors hover:text-cyan-300">
          View all
        </a>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {recentDeploys.map((deploy) => (
          <div
            key={deploy.id}
            className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  deploy.status === 'live'
                    ? 'bg-green-400'
                    : deploy.status === 'building'
                      ? 'bg-yellow-400 animate-pulse'
                      : 'bg-gray-500'
                )}
              />
              <div>
                <p className="text-sm font-medium text-white">{deploy.projectName}</p>
                <p className="text-xs text-gray-500">{deploy.platform} - {deploy.buildTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  deploy.status === 'live'
                    ? 'bg-green-500/10 text-green-400'
                    : deploy.status === 'building'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : deploy.status === 'deploying'
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'bg-gray-500/10 text-gray-400'
                )}
              >
                {deploy.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LivePreviewPlaceholder() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex h-[400px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">
          <Activity className="h-8 w-8 text-gray-600" />
        </div>
        <p className="text-sm font-medium text-gray-400">Live Preview</p>
        <p className="mt-1 text-xs text-gray-600">
          Running application will appear here
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-700" />
          <span className="text-xs text-gray-600">Waiting for dev server...</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<ProjectFile | undefined>(
    undefined
  );

  const handleFileSelect = (file: ProjectFile) => {
    setSelectedFile(file);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Prompt Input */}
      <motion.div variants={itemVariants}>
        <PromptInput />
      </motion.div>

      {/* Main Grid: File Explorer + Code Preview + Live Preview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <FileExplorer onFileSelect={handleFileSelect} />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <CodePreview file={selectedFile} />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <LivePreviewPlaceholder />
        </motion.div>
      </div>

      {/* Right Section: Agent Panel + Activity Timeline */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <AgentPanel />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ActivityTimeline />
        </motion.div>
      </div>

      {/* Recent Deployments */}
      <RecentDeployments />
    </motion.div>
  );
}

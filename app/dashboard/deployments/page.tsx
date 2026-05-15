'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  AlertCircle,
  Clock,
  ExternalLink,
  Globe,
  Timer,
  Calendar,
} from 'lucide-react';
import { deployments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Deployment } from '@/lib/types';

const deployStatusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string; ring: string }
> = {
  live: {
    label: 'Live',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    dot: 'bg-green-400',
    ring: 'ring-green-500/20',
  },
  building: {
    label: 'Building',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    dot: 'bg-yellow-400',
    ring: 'ring-yellow-500/20',
  },
  deploying: {
    label: 'Deploying',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-400',
    ring: 'ring-cyan-500/20',
  },
  pending: {
    label: 'Pending',
    color: 'text-gray-400',
    bg: 'bg-gray-500/10 border-gray-500/20',
    dot: 'bg-gray-400',
    ring: 'ring-gray-500/20',
  },
  failed: {
    label: 'Failed',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    dot: 'bg-red-400',
    ring: 'ring-red-500/20',
  },
};

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

function DeployStatusBadge({ status }: { status: string }) {
  const config = deployStatusConfig[status] || deployStatusConfig.pending;

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', bgColor)}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}

function DeploymentRow({ deployment }: { deployment: Deployment }) {
  const config = deployStatusConfig[deployment.status] || deployStatusConfig.pending;

  return (
    <motion.div
      variants={itemVariants}
      className="group overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Project Info */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              config.bg
            )}
          >
            <Rocket className="h-5 w-5" style={{ color: config.color.replace('text-', '#') }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              {deployment.projectName}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {deployment.platform}
              </span>
              <span className="flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {deployment.buildTime}
              </span>
            </div>
          </div>
        </div>

        {/* Status + URL + Date */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <DeployStatusBadge status={deployment.status} />

          <a
            href={deployment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-cyan-400 transition-colors hover:text-cyan-300"
          >
            <ExternalLink className="h-3 w-3" />
            {deployment.url.replace('https://', '')}
          </a>

          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar className="h-3 w-3" />
            {formatDate(deployment.deployedAt)}
          </span>

          {deployment.status === 'pending' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-cyan-500/20"
            >
              <Rocket className="h-3.5 w-3.5" />
              Deploy
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function DeploymentsPage() {
  const liveCount = deployments.filter((d) => d.status === 'live').length;
  const buildingCount = deployments.filter(
    (d) => d.status === 'building' || d.status === 'deploying'
  ).length;
  const pendingCount = deployments.filter((d) => d.status === 'pending').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Deployments</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage your project deployments
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Live"
          value={liveCount}
          icon={Rocket}
          color="#22c55e"
          bgColor="bg-green-500/10"
        />
        <SummaryCard
          label="Building"
          value={buildingCount}
          icon={Clock}
          color="#eab308"
          bgColor="bg-yellow-500/10"
        />
        <SummaryCard
          label="Pending"
          value={pendingCount}
          icon={AlertCircle}
          color="#94a3b8"
          bgColor="bg-gray-500/10"
        />
      </div>

      {/* Deployment List */}
      <div className="space-y-3">
        {deployments.map((deployment) => (
          <DeploymentRow key={deployment.id} deployment={deployment} />
        ))}
      </div>

      {deployments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Rocket className="mb-4 h-12 w-12 text-gray-700" />
          <p className="text-sm text-gray-500">No deployments yet</p>
          <p className="mt-1 text-xs text-gray-600">
            Deploy a project to see it here
          </p>
        </div>
      )}
    </motion.div>
  );
}

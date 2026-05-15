'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
  Cpu,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Agent, AgentStatus } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
};

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string; glow: string }
> = {
  thinking: {
    label: 'Thinking',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    dot: 'bg-yellow-400',
    glow: 'shadow-[0_0_20px_rgba(234,179,8,0.15)]',
  },
  working: {
    label: 'Working',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-400',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  },
  reviewing: {
    label: 'Reviewing',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    dot: 'bg-purple-400',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]',
  },
  idle: {
    label: 'Idle',
    color: 'text-gray-500',
    bg: 'bg-gray-500/10 border-gray-500/20',
    dot: 'bg-gray-500',
    glow: '',
  },
  completed: {
    label: 'Completed',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    dot: 'bg-green-400',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.15)]',
  },
  error: {
    label: 'Error',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    dot: 'bg-red-400',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  },
};

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Idle', value: 'idle' },
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

function AgentAvatar({
  avatar,
  color,
  status,
  size = 'large',
}: {
  avatar: string;
  color: string;
  status: string;
  size?: 'large' | 'small';
}) {
  const IconComponent = iconMap[avatar] || Cpu;
  const isActive = status === 'working' || status === 'thinking';

  return (
    <div className="relative">
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl',
          size === 'large' ? 'h-14 w-14' : 'h-10 w-10'
        )}
        style={{ backgroundColor: `${color}20` }}
      >
        <IconComponent
          className={size === 'large' ? 'h-7 w-7' : 'h-5 w-5'}
          style={{ color }}
        />
      </div>
      {isActive && (
        <motion.div
          className={cn(
            'absolute rounded-full border-2 border-[#0a0a1a]',
            size === 'large' ? '-right-0.5 -bottom-0.5 h-4 w-4' : '-right-0.5 -bottom-0.5 h-3 w-3'
          )}
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.idle;

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

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Progress</span>
        <span className="font-medium text-gray-300">{progress}%</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            delay: 0.3,
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${color}, ${color}80)`,
          }}
        />
      </div>
    </div>
  );
}

function AgentDetailCard({ agent }: { agent: Agent }) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[agent.status] || statusConfig.idle;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        'group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]',
        config.glow && 'hover:' + config.glow
      )}
      style={{
        boxShadow: agent.status === 'working' || agent.status === 'thinking'
          ? `0 0 30px ${agent.color}10`
          : undefined,
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <AgentAvatar
              avatar={agent.avatar}
              color={agent.color}
              status={agent.status}
              size="large"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.role}</p>
            </div>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        {/* Current Task */}
        <div className="mt-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
            Current Task
          </p>
          <p className="mt-1 text-sm text-gray-300">{agent.currentTask}</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={agent.progress} color={agent.color} />

        {/* Thought Log Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-2.5 text-sm text-gray-500 transition-colors hover:bg-white/[0.04] hover:text-gray-300"
        >
          <span className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Thought Log
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2 border-l-2 border-white/[0.06] pl-4">
                {agent.thoughtLog.map((thought, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-sm text-gray-500"
                  >
                    <span className="mr-2 text-xs text-gray-700">{i + 1}.</span>
                    {thought}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter((agent) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'active' &&
        (agent.status === 'working' ||
          agent.status === 'thinking' ||
          agent.status === 'reviewing')) ||
      (activeFilter === 'idle' && agent.status === 'idle');

    const matchesSearch =
      searchQuery === '' ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.currentTask.toLowerCase().includes(searchQuery.toLowerCase());

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
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage your AI development team
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 outline-none transition-colors focus:border-cyan-500/50 focus:bg-white/[0.06]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {filterTabs.map((tab) => (
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
            {tab.value === 'all' && (
              <span className="ml-1.5 text-xs text-gray-600">({agents.length})</span>
            )}
            {tab.value === 'active' && (
              <span className="ml-1.5 text-xs text-gray-600">
                ({agents.filter((a) => a.status === 'working' || a.status === 'thinking' || a.status === 'reviewing').length})
              </span>
            )}
            {tab.value === 'idle' && (
              <span className="ml-1.5 text-xs text-gray-600">
                ({agents.filter((a) => a.status === 'idle').length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Agent Cards Grid */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredAgents.map((agent) => (
            <AgentDetailCard key={agent.id} agent={agent} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredAgents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Cpu className="mb-4 h-12 w-12 text-gray-700" />
          <p className="text-sm text-gray-500">No agents match your filter</p>
          <p className="mt-1 text-xs text-gray-600">Try adjusting your search or filter</p>
        </div>
      )}
    </motion.div>
  );
}

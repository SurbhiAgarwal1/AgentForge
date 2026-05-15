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
  ChevronDown,
  ChevronUp,
  Cpu,
} from 'lucide-react';
import { agents } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

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
  { label: string; color: string; bg: string; dot: string }
> = {
  thinking: {
    label: 'Thinking',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    dot: 'bg-yellow-400',
  },
  working: {
    label: 'Working',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  reviewing: {
    label: 'Reviewing',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    dot: 'bg-purple-400',
  },
  idle: {
    label: 'Idle',
    color: 'text-gray-500',
    bg: 'bg-gray-500/10 border-gray-500/20',
    dot: 'bg-gray-500',
  },
  completed: {
    label: 'Completed',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    dot: 'bg-green-400',
  },
  error: {
    label: 'Error',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    dot: 'bg-red-400',
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
  name,
  avatar,
  color,
  status,
}: {
  name: string;
  avatar: string;
  color: string;
  status: string;
}) {
  const IconComponent = iconMap[avatar] || Cpu;
  const isActive = status === 'working' || status === 'thinking';

  return (
    <div className="relative">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}20` }}
      >
        <IconComponent className="h-5 w-5" style={{ color }} />
      </div>
      {isActive && (
        <motion.div
          className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-[#0a0a1a]"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.2, 1] }}
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
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        config.bg,
        config.color
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', config.dot)}
      />
      {config.label}
    </span>
  );
}

function AgentCard({ agent }: { agent: (typeof agents)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <AgentAvatar
              name={agent.name}
              avatar={agent.avatar}
              color={agent.color}
              status={agent.status}
            />
            <div>
              <h3 className="text-sm font-semibold text-white">
                {agent.name}
              </h3>
              <p className="text-xs text-gray-500">{agent.role}</p>
            </div>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        {/* Current Task */}
        <p className="mt-3 text-xs text-gray-400 line-clamp-2">
          {agent.currentTask}
        </p>

        {/* Progress Bar */}
        {agent.progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-300">
                {agent.progress}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${agent.progress}%` }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  delay: 0.3,
                }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(to right, ${agent.color}, ${agent.color}80)`,
                }}
              />
            </div>
          </div>
        )}

        {/* Thought Log Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex w-full items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-xs text-gray-500 transition-colors hover:bg-white/[0.04] hover:text-gray-300"
        >
          <span>Thought Log</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
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
              <div className="mt-2 space-y-1.5 border-l-2 border-white/[0.06] pl-3">
                {agent.thoughtLog.map((thought, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-xs text-gray-500"
                  >
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

export function AgentPanel() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Active Agents</h2>
        <span className="text-xs text-gray-500">
          {agents.filter((a) => a.status !== 'idle' && a.status !== 'completed').length}{' '}
          of {agents.length} active
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </motion.div>
  );
}

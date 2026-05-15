'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Brain,
  Lightbulb,
  Bug,
  Star,
  Layers,
  Clock,
  Hash,
} from 'lucide-react';
import { memoryEntries } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { MemoryEntry } from '@/lib/types';

const typeConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType; border: string }
> = {
  architecture: {
    label: 'Architecture',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: Layers,
  },
  pattern: {
    label: 'Pattern',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: Lightbulb,
  },
  bug: {
    label: 'Bug',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: Bug,
  },
  preference: {
    label: 'Preference',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: Star,
  },
  context: {
    label: 'Context',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: Brain,
  },
};

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Pattern', value: 'pattern' },
  { label: 'Bug', value: 'bug' },
  { label: 'Preference', value: 'preference' },
  { label: 'Context', value: 'context' },
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

function TypeBadge({ type }: { type: string }) {
  const config = typeConfig[type] || typeConfig.context;
  const IconComponent = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        config.bg,
        config.border,
        config.color
      )}
    >
      <IconComponent className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function RelevanceScore({ score }: { score: number }) {
  const percentage = Math.round(score * 100);
  const color =
    percentage >= 90
      ? 'text-green-400'
      : percentage >= 80
        ? 'text-cyan-400'
        : percentage >= 70
          ? 'text-yellow-400'
          : 'text-gray-400';

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn('h-full rounded-full', {
            'bg-green-400': percentage >= 90,
            'bg-cyan-400': percentage >= 80 && percentage < 90,
            'bg-yellow-400': percentage >= 70 && percentage < 80,
            'bg-gray-500': percentage < 70,
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={cn('text-xs font-medium', color)}>{percentage}%</span>
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function MemoryCard({ entry }: { entry: MemoryEntry }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
    >
      <div className="p-5">
        {/* Type Badge + Project */}
        <div className="flex items-center justify-between">
          <TypeBadge type={entry.type} />
          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-xs text-gray-500">
            {entry.project}
          </span>
        </div>

        {/* Content */}
        <p className="mt-4 text-sm leading-relaxed text-gray-300 line-clamp-4">
          {entry.content}
        </p>

        {/* Footer: Relevance + Timestamp */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4">
          <div className="flex items-center gap-2">
            <Hash className="h-3.5 w-3.5 text-gray-600" />
            <span className="text-xs text-gray-600">Relevance</span>
            <RelevanceScore score={entry.relevance} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Clock className="h-3.5 w-3.5" />
            {formatTimestamp(entry.timestamp)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEntries = memoryEntries.filter((entry) => {
    const matchesFilter =
      activeFilter === 'all' || entry.type === activeFilter;

    const matchesSearch =
      searchQuery === '' ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.project.toLowerCase().includes(searchQuery.toLowerCase());

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
          <h1 className="text-2xl font-bold text-white">AI Memory</h1>
          <p className="mt-1 text-sm text-gray-500">
            Persistent knowledge base across sessions and projects
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 outline-none transition-colors focus:border-cyan-500/50 focus:bg-white/[0.06]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {filterTabs.map((tab) => {
          const count =
            tab.value === 'all'
              ? memoryEntries.length
              : memoryEntries.filter((m) => m.type === tab.value).length;

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

      {/* Memory Cards Grid */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry) => (
            <MemoryCard key={entry.id} entry={entry} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredEntries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Brain className="mb-4 h-12 w-12 text-gray-700" />
          <p className="text-sm text-gray-500">No memories match your search</p>
          <p className="mt-1 text-xs text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </motion.div>
  );
}

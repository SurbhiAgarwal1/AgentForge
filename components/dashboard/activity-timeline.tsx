'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  GitPullRequest,
  Rocket,
  Lightbulb,
  Bug,
  TestTube2,
} from 'lucide-react';
import { activityItems } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  code: {
    icon: Code2,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  review: {
    icon: GitPullRequest,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  deploy: {
    icon: Rocket,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  plan: {
    icon: Lightbulb,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  debug: {
    icon: Bug,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  test: {
    icon: TestTube2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

function ActivityItem({
  item,
  isLast,
}: {
  item: (typeof activityItems)[0];
  isLast: boolean;
}) {
  const config = typeConfig[item.type] || typeConfig.code;
  const IconComponent = config.icon;

  return (
    <motion.div variants={itemVariants} className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 h-full w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
          config.bgColor
        )}
      >
        <IconComponent className={cn('h-4 w-4', config.color)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-sm font-semibold text-white">
              {item.agent}
            </span>
            <p className="mt-0.5 text-sm text-gray-400">{item.action}</p>
          </div>
          <span className="flex-shrink-0 text-xs text-gray-600">
            {formatTimestamp(item.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ActivityTimeline() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Activity</h3>
        <span className="text-xs text-gray-500">
          {activityItems.length} events
        </span>
      </div>

      <div className="p-4">
        {activityItems.map((item, index) => (
          <ActivityItem
            key={item.id}
            item={item}
            isLast={index === activityItems.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AgentStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: AgentStatus;
  className?: string;
}

const statusConfig: Record<
  AgentStatus,
  { label: string; dotColor: string; bgColor: string; textColor: string }
> = {
  thinking: {
    label: 'Thinking',
    dotColor: 'bg-yellow-400',
    bgColor: 'bg-yellow-400/10',
    textColor: 'text-yellow-400',
  },
  working: {
    label: 'Working',
    dotColor: 'bg-cyan-400',
    bgColor: 'bg-cyan-400/10',
    textColor: 'text-cyan-400',
  },
  reviewing: {
    label: 'Reviewing',
    dotColor: 'bg-purple-400',
    bgColor: 'bg-purple-400/10',
    textColor: 'text-purple-400',
  },
  idle: {
    label: 'Idle',
    dotColor: 'bg-gray-400',
    bgColor: 'bg-gray-400/10',
    textColor: 'text-gray-400',
  },
  completed: {
    label: 'Completed',
    dotColor: 'bg-green-400',
    bgColor: 'bg-green-400/10',
    textColor: 'text-green-400',
  },
  error: {
    label: 'Error',
    dotColor: 'bg-red-400',
    bgColor: 'bg-red-400/10',
    textColor: 'text-red-400',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', config.dotColor)}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'online' | 'offline' | 'thinking' | 'error' | 'working';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, { color: string; label: string; animate: boolean }> = {
  online: { color: 'bg-green-500', label: 'Online', animate: false },
  offline: { color: 'bg-gray-500', label: 'Offline', animate: false },
  thinking: { color: 'bg-purple-500', label: 'Thinking', animate: true },
  error: { color: 'bg-red-500', label: 'Error', animate: false },
  working: { color: 'bg-cyan-500', label: 'Working', animate: true },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status];

  return (
    <div className={cn("flex items-center gap-2 rounded-full px-2 py-0.5 bg-white/5 border border-white/10", className)}>
      <div className={cn(
        "h-1.5 w-1.5 rounded-full",
        style.color,
        style.animate && "animate-pulse shadow-[0_0_8px_rgba(var(--status-color),0.5)]"
      )} />
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {style.label}
      </span>
    </div>
  );
}

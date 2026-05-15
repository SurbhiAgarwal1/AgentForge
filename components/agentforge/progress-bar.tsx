'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = '#06b6d4',
  showLabel = true,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 12px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        />
      </div>
      {showLabel && (
        <span
          className="min-w-[3ch] text-right text-xs font-medium tabular-nums"
          style={{ color }}
        >
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}

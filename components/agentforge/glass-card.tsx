'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl',
        glow &&
          'shadow-[0_0_30px_-5px_rgba(6,182,212,0.15),0_0_30px_-5px_rgba(139,92,246,0.15)]',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.02,
              borderColor: 'rgba(6,182,212,0.3)',
              transition: {
                type: 'spring' as const,
                stiffness: 300,
                damping: 20,
              },
            }
          : undefined
      }
      whileTap={
        onClick
          ? {
              scale: 0.98,
              transition: {
                type: 'spring' as const,
                stiffness: 400,
                damping: 25,
              },
            }
          : undefined
      }
      onClick={onClick}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

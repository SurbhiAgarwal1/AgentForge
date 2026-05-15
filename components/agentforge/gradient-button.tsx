'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function GradientButton({
  children,
  size = 'md',
  variant = 'primary',
  onClick,
  disabled = false,
  className,
}: GradientButtonProps) {
  return (
    <motion.button
      className={cn(
        'relative rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-black',
        sizeClasses[size],
        variant === 'primary'
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
          : 'border border-cyan-500/30 bg-transparent text-cyan-400 hover:border-cyan-500/60 hover:bg-cyan-500/10',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      whileHover={
        !disabled
          ? {
              scale: 1.05,
              transition: {
                type: 'spring' as const,
                stiffness: 400,
                damping: 20,
              },
            }
          : undefined
      }
      whileTap={
        !disabled
          ? {
              scale: 0.95,
              transition: {
                type: 'spring' as const,
                stiffness: 500,
                damping: 25,
              },
            }
          : undefined
      }
      onClick={onClick}
      disabled={disabled}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 transition-opacity hover:opacity-100" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

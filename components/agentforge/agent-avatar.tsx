'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
  Users,
  Code2,
  Network,
  Rocket,
  Activity,
  Sparkles,
  Bot,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { AgentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
  Users,
  Code2,
  Network,
  Rocket,
  Activity,
  Sparkles,
  Bot,
  Cpu,
};

interface AgentAvatarProps {
  name: string;
  icon: string;
  color: string;
  status: AgentStatus;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: {
    container: 'h-8 w-8',
    icon: 14,
    dot: 'h-2 w-2',
    dotOffset: 'top-0 right-0',
  },
  md: {
    container: 'h-12 w-12',
    icon: 20,
    dot: 'h-3 w-3',
    dotOffset: 'top-0.5 right-0.5',
  },
  lg: {
    container: 'h-16 w-16',
    icon: 28,
    dot: 'h-3.5 w-3.5',
    dotOffset: 'top-1 right-1',
  },
};

const statusColors: Record<AgentStatus, string> = {
  thinking: 'bg-yellow-400',
  working: 'bg-cyan-400',
  reviewing: 'bg-purple-400',
  idle: 'bg-gray-500',
  completed: 'bg-green-400',
  error: 'bg-red-500',
};

export function AgentAvatar({
  name,
  icon,
  color,
  status,
  size = 'md',
}: AgentAvatarProps) {
  const IconComponent = iconMap[icon] || Bot;
  const config = sizeConfig[size];

  const isActive = status === 'thinking' || status === 'working' || status === 'reviewing';

  return (
    <motion.div
      className="relative inline-flex"
      whileHover={{
        scale: 1.1,
        transition: {
          type: 'spring' as const,
          stiffness: 400,
          damping: 20,
        },
      }}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full border-2',
          config.container
        )}
        style={{
          borderColor: `${color}60`,
          backgroundColor: `${color}15`,
          boxShadow: isActive ? `0 0 20px ${color}30` : 'none',
        }}
      >
        <IconComponent
          size={config.icon}
          style={{ color }}
          strokeWidth={2}
        />
      </div>

      {/* Status indicator */}
      <motion.div
        className={cn(
          'absolute rounded-full border-2 border-black',
          config.dot,
          config.dotOffset,
          statusColors[status]
        )}
        animate={
          isActive
            ? {
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }
            : { scale: 1, opacity: 1 }
        }
        transition={
          isActive
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }
            : undefined
        }
      />
    </motion.div>
  );
}

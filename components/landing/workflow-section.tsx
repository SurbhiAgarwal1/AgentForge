'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  LayoutList,
  Users,
  Code2,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'step-1',
    label: 'Prompt',
    description: 'Describe your project in natural language',
    icon: MessageSquare,
    color: '#06b6d4',
  },
  {
    id: 'step-2',
    label: 'Planning',
    description: 'AI architects design the system structure',
    icon: LayoutList,
    color: '#8b5cf6',
  },
  {
    id: 'step-3',
    label: 'Agents',
    description: 'Specialized agents activate for their roles',
    icon: Users,
    color: '#06b6d4',
  },
  {
    id: 'step-4',
    label: 'Code',
    description: 'Agents write, review, and refine the code',
    icon: Code2,
    color: '#8b5cf6',
  },
  {
    id: 'step-5',
    label: 'Review',
    description: 'QA tests and reviewers verify quality',
    icon: ShieldCheck,
    color: '#06b6d4',
  },
  {
    id: 'step-6',
    label: 'Deploy',
    description: 'DevOps agents ship to production',
    icon: Rocket,
    color: '#8b5cf6',
  },
];

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

function TravelingDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
      initial={{ left: '0%', opacity: 0 }}
      animate={{
        left: ['0%', '100%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
    />
  );
}

function VerticalTravelingDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
      initial={{ top: '0%', opacity: 0 }}
      animate={{
        top: ['0%', '100%'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
    />
  );
}

export function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section title */}
        <motion.div
          className="mb-16 text-center"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-400"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            How It Works
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            From Prompt to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Production
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-gray-400"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            A seamless pipeline that transforms your idea into deployed software,
            powered by coordinated AI agents.
          </motion.p>
        </motion.div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:block">
          <motion.div
            className="flex items-start justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    className="flex flex-col items-center"
                    variants={stepVariants}
                    transition={{ delay: index * 0.15 }}
                  >
                    {/* Node circle */}
                    <div
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: `${step.color}40`,
                        backgroundColor: `${step.color}15`,
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                    >
                      <Icon className="h-7 w-7" style={{ color: step.color }} />
                    </div>

                    {/* Label */}
                    <h3
                      className="mt-3 text-base font-semibold"
                      style={{ color: step.color }}
                    >
                      {step.label}
                    </h3>

                    {/* Description */}
                    <p className="mt-1 max-w-[140px] text-center text-xs text-gray-500">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Connecting line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="relative mt-8 flex h-0.5 flex-1 items-center mx-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30" />
                      <TravelingDot delay={index * 0.5} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile/Tablet: Vertical layout */}
        <div className="lg:hidden">
          <motion.div
            className="relative mx-auto max-w-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-cyan-500/30" />
            <VerticalTravelingDot delay={0} />

            <div className="flex flex-col gap-8">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className="relative flex items-start gap-5"
                    variants={stepVariants}
                    transition={{ delay: index * 0.15 }}
                  >
                    {/* Node circle */}
                    <div
                      className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: `${step.color}40`,
                        backgroundColor: `${step.color}15`,
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: step.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <h3
                        className="text-base font-semibold"
                        style={{ color: step.color }}
                      >
                        {step.label}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

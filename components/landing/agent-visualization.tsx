'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { agents } from '@/lib/mock-data';
import { GlassCard } from '@/components/agentforge/glass-card';
import { AgentAvatar } from '@/components/agentforge/agent-avatar';
import { ProgressBar } from '@/components/agentforge/progress-bar';
import { StatusBadge } from '@/components/agentforge/status-badge';
import { cn } from '@/lib/utils';

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

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

export function AgentVisualization() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
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
            AI-Powered Team
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Meet Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Team
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-gray-400"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Six specialized agents working in concert to build, test, and deploy
            your software with precision and speed.
          </motion.p>
        </motion.div>

        {/* Agent cards grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {agents.map((agent) => (
            <motion.div key={agent.id} variants={cardVariants}>
              <GlassCard
                className="p-6"
                glow
                hover
              >
                <div className="flex items-start gap-4">
                  <AgentAvatar
                    name={agent.name}
                    icon={agent.avatar}
                    color={agent.color}
                    status={agent.status}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {agent.name}
                      </h3>
                      <StatusBadge status={agent.status} />
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {agent.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-400">{agent.currentTask}</p>
                </div>

                <div className="mt-5">
                  <ProgressBar value={agent.progress} color={agent.color} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

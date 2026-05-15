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
import { featureCards } from '@/lib/mock-data';
import { GlassCard } from '@/components/agentforge/glass-card';
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

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[400px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[350px] w-[450px] rounded-full bg-cyan-500/5 blur-[100px]" />
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
            className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-purple-400"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Features
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ship Faster
            </span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-gray-400"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            A complete AI-powered development platform that handles every stage
            of the software lifecycle, from architecture to deployment.
          </motion.p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featureCards.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Bot;

            return (
              <motion.div key={feature.id} variants={cardVariants}>
                <GlassCard className="h-full p-6" glow hover>
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${feature.color}15`,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    <IconComponent
                      className="h-6 w-6"
                      style={{ color: feature.color }}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

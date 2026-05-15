'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const headingWords = ['Build', 'Software', 'With', 'Autonomous', 'AI', 'Teams'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  xDrift: number;
  yDrift: number;
}

function Particles() {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#06b6d4', '#8b5cf6', '#06b6d4', '#8b5cf6', '#06b6d4'];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colors[i % colors.length],
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      xDrift: (Math.random() - 0.5) * 60,
      yDrift: (Math.random() - 0.5) * 60,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={p.size}
          fill={p.color}
          opacity={0.3}
          animate={{
            x: [0, p.xDrift, 0],
            y: [0, p.yDrift, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        />
      ))}
    </div>
  );
}

function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute -bottom-32 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[100px]" />
      <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-purple-500/8 blur-[100px]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24 sm:px-6 lg:px-8">
      <BackgroundOrbs />

      <Particles />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Heading */}
        <motion.h1
          className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={cn(
                'inline-block',
                word === 'AI' && 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
                word === 'Teams' && 'bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent',
                i > 0 && 'ml-3'
              )}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          Deploy specialized AI agents that plan, code, test, and deploy
          full-stack applications autonomously. From idea to production in minutes,
          not months.
        </motion.p>

        {/* AI Prompt Box */}
        <motion.div
          className="mx-auto mt-10 max-w-2xl"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        >
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1" />
            </div>
            <div className="border-t border-white/5 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-cyan-400">$</span>
                <motion.span
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  Describe the app you want to build...
                </motion.span>
                <motion.span
                  className="inline-block h-4 w-0.5 bg-cyan-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] transition-shadow hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Start Building</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>

          <motion.button
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
            Watch Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

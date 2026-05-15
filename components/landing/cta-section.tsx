'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 30,
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

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
      <div className="absolute right-1/3 bottom-1/3 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[100px]" />
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-32 sm:px-6 lg:px-8">
      <BackgroundGrid />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Main heading */}
        <motion.h2
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          Start Building{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            The Future
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2 }}
        >
          Join thousands of developers who are shipping production-ready software
          with AI-powered teams. No credit card required. Start building in
          under 60 seconds.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-10"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-10 py-4 text-base font-semibold text-white shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] transition-shadow hover:shadow-[0_0_60px_-5px_rgba(6,182,212,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Started Free</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        </motion.div>

        {/* Subtle trust line */}
        <motion.p
          className="mt-6 text-sm text-gray-600"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Free forever for open source. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}

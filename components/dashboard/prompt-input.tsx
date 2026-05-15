'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const quickActions = [
  { label: 'E-commerce App', icon: '🛒' },
  { label: 'SaaS Dashboard', icon: '📊' },
  { label: 'API Backend', icon: '⚡' },
  { label: 'Landing Page', icon: '🚀' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function PromptInput() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;
    // Handle submission
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto"
    >
      {/* Input Container */}
      <div
        className={cn(
          'relative rounded-2xl border bg-white/[0.03] backdrop-blur-xl transition-all duration-300',
          focused
            ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1),0_0_60px_rgba(6,182,212,0.05)]'
            : 'border-white/[0.06]'
        )}
      >
        {/* Glow effect */}
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10"
          />
        )}

        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to build..."
            rows={4}
            className="w-full resize-none bg-transparent px-5 pt-5 pb-2 text-sm text-gray-200 placeholder-gray-600 outline-none"
          />

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-gray-600">
                AI agents will collaborate to build your project
              </span>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={!value.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                value.trim()
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'cursor-not-allowed bg-white/[0.05] text-gray-600'
              )}
            >
              <Send className="h-4 w-4" />
              Generate
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {quickActions.map((action, i) => (
          <motion.button
            key={action.label}
            variants={chipVariants}
            custom={i}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setValue(`Build a ${action.label}`)}
            className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm text-gray-400 backdrop-blur-sm transition-colors hover:border-cyan-500/30 hover:bg-white/[0.06] hover:text-gray-200"
          >
            <span>{action.icon}</span>
            {action.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

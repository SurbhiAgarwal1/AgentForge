'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, FolderGit2, Users, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Metric {
  id: string;
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  color: string;
  decimals: number;
}

const metrics: Metric[] = [
  {
    id: 'metric-1',
    icon: Star,
    value: 12.4,
    suffix: 'K+',
    prefix: '',
    label: 'GitHub Stars',
    color: '#06b6d4',
    decimals: 1,
  },
  {
    id: 'metric-2',
    icon: FolderGit2,
    value: 50,
    suffix: 'K+',
    prefix: '',
    label: 'Projects Generated',
    color: '#8b5cf6',
    decimals: 0,
  },
  {
    id: 'metric-3',
    icon: Users,
    value: 8,
    suffix: 'K+',
    prefix: '',
    label: 'Active Teams',
    color: '#06b6d4',
    decimals: 0,
  },
  {
    id: 'metric-4',
    icon: Server,
    value: 99.7,
    suffix: '%',
    prefix: '',
    label: 'Uptime',
    color: '#8b5cf6',
    decimals: 1,
  },
];

function AnimatedCounter({
  value,
  decimals,
  duration = 2,
}: {
  value: number;
  decimals: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const endTime = startTime + duration * 1000;

    function animate(currentTime: number) {
      if (currentTime >= endTime) {
        setCount(value);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * value).toFixed(decimals)));

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [isInView, value, decimals, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export function SocialProof() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-black px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <React.Fragment key={metric.id}>
              <motion.div
                className="flex flex-col items-center gap-2 px-6 py-4 sm:px-10"
                variants={itemVariants}
              >
                <Icon
                  className="mb-1 h-5 w-5"
                  style={{ color: metric.color }}
                />
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <AnimatedCounter
                      value={metric.value}
                      decimals={metric.decimals}
                    />
                  </span>
                  <span
                    className="text-2xl font-bold sm:text-3xl"
                    style={{ color: metric.color }}
                  >
                    {metric.suffix}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{metric.label}</span>
              </motion.div>

              {/* Divider between items (not after last) */}
              {index < metrics.length - 1 && (
                <motion.div
                  className="hidden h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block"
                  variants={itemVariants}
                />
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </section>
  );
}

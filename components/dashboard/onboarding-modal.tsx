'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  Users,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Bot,
  Brain,
  Code2,
  ShieldCheck,
  Cloud,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  features?: { icon: React.ElementType; label: string; color: string }[];
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to AgentForge',
    subtitle: 'Your AI-powered development team',
    description:
      'AgentForge orchestrates autonomous AI agents that collaborate to design, build, test, and deploy software — all from a single prompt. Let us show you how it works.',
    icon: Zap,
    gradient: 'from-cyan-500 to-purple-600',
  },
  {
    title: 'Meet Your AI Team',
    subtitle: 'Specialized agents, one mission',
    description:
      'Each agent has a distinct role and expertise. They work in parallel, communicate through shared context, and autonomously coordinate to deliver production-quality code.',
    icon: Users,
    gradient: 'from-purple-500 to-cyan-500',
    features: [
      { icon: Brain, label: 'Architect — Designs system architecture', color: '#06b6d4' },
      { icon: Code2, label: 'Frontend & Backend — Write production code', color: '#8b5cf6' },
      { icon: ShieldCheck, label: 'QA — Tests and validates everything', color: '#06b6d4' },
      { icon: Cloud, label: 'DevOps — Deploys and monitors', color: '#8b5cf6' },
    ],
  },
  {
    title: 'Ship Faster Than Ever',
    subtitle: 'From idea to deployment in minutes',
    description:
      'Describe what you want to build, and your AI team will handle the rest. Review their work in real-time, provide feedback, and deploy with confidence.',
    icon: Rocket,
    gradient: 'from-cyan-500 to-purple-600',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  }),
};

export function OnboardingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const IconComponent = step.icon;

  const goNext = () => {
    if (isLastStep) {
      onClose();
      return;
    }
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (isFirstStep) return;
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring' as const,
              stiffness: 300,
              damping: 25,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f0f2a]/95 shadow-2xl shadow-purple-500/10 backdrop-blur-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.05] text-gray-400 transition-colors hover:bg-white/[0.1] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg',
                      step.gradient
                    )}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Text */}
                  <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  <p className="mt-1 text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {step.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>

                  {/* Features list for step 2 */}
                  {step.features && (
                    <div className="mt-6 w-full space-y-3">
                      {step.features.map((feature, i) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.2 + i * 0.08,
                              type: 'spring' as const,
                              stiffness: 300,
                              damping: 24,
                            }}
                            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-left"
                          >
                            <div
                              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${feature.color}20` }}
                            >
                              <FeatureIcon
                                className="h-4 w-4"
                                style={{ color: feature.color }}
                              />
                            </div>
                            <span className="text-sm text-gray-300">
                              {feature.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: Step indicators + Navigation */}
            <div className="border-t border-white/[0.06] px-8 py-5">
              <div className="flex items-center justify-between">
                {/* Step indicators */}
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        index === currentStep
                          ? 'w-8 bg-gradient-to-r from-cyan-500 to-purple-500'
                          : index < currentStep
                          ? 'w-1.5 bg-cyan-500/50'
                          : 'w-1.5 bg-white/10'
                      )}
                    />
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center gap-3">
                  {!isFirstStep && (
                    <motion.button
                      onClick={goBack}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </motion.button>
                  )}

                  <motion.button
                    onClick={goNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-lg transition-all',
                      isLastStep
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-cyan-500/20'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-cyan-500/20'
                    )}
                  >
                    {isLastStep ? 'Get Started' : 'Next'}
                    {!isLastStep && <ArrowRight className="h-4 w-4" />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

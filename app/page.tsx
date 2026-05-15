'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/landing/hero-section';
import { AgentVisualization } from '@/components/landing/agent-visualization';
import { FeaturesSection } from '@/components/landing/features-section';
import { WorkflowSection } from '@/components/landing/workflow-section';
import { TerminalSection } from '@/components/landing/terminal-section';
import { SocialProof } from '@/components/landing/social-proof';
import { CtaSection } from '@/components/landing/cta-section';
import { AnimatedGrid } from '@/components/agentforge/animated-grid';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedGrid />
      <div className="relative z-10">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 glass"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500">
                <span className="text-sm font-bold text-white">AF</span>
              </div>
              <span className="text-lg font-semibold text-white">
                Agent<span className="gradient-text">Forge</span>
              </span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
              <a href="#workflow" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Workflow</a>
              <a href="#agents" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Agents</a>
              <a href="#terminal" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Demo</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="/dashboard" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">
                Sign In
              </a>
              <a
                href="/dashboard"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Get Started
              </a>
            </div>
          </div>
        </motion.nav>

        <HeroSection />

        <div id="agents">
          <AgentVisualization />
        </div>

        <div id="features">
          <FeaturesSection />
        </div>

        <div id="workflow">
          <WorkflowSection />
        </div>

        <div id="terminal">
          <TerminalSection />
        </div>

        <SocialProof />
        <CtaSection />

        <footer className="border-t border-border/50 py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-purple-500">
                <span className="text-xs font-bold text-white">AF</span>
              </div>
              <span className="text-sm text-muted-foreground">AgentForge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for the future of software development
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

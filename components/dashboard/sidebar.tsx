'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  LayoutDashboard,
  Bot,
  FolderKanban,
  GitBranch,
  Rocket,
  Brain,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Agents', href: '/dashboard/agents', icon: Bot },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'Workflows', href: '/dashboard/workflows', icon: GitBranch },
  { label: 'Deployments', href: '/dashboard/deployments', icon: Rocket },
  { label: 'Memory', href: '/dashboard/memory', icon: Brain },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const sidebarVariants = {
  expanded: {
    width: 260,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    width: 72,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

const labelVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    display: 'block',
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transitionEnd: { display: 'none' },
    transition: {
      duration: 0.2,
    },
  },
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      className="relative flex h-screen flex-col border-r border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
      style={{ minWidth: 0 }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              variants={labelVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="text-lg font-bold tracking-tight text-white"
            >
              Agent
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Forge
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/[0.08] text-cyan-400'
                  : 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 ring-1 ring-cyan-500/20"
                  transition={{
                    type: 'spring' as const,
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <item.icon
                className={cn(
                  'relative z-10 h-5 w-5 flex-shrink-0',
                  isActive
                    ? 'text-cyan-400'
                    : 'text-gray-500 group-hover:text-gray-300'
                )}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    variants={labelVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500">
            <User className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                variants={labelVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium text-white">
                  Alex Chen
                </p>
                <p className="truncate text-xs text-gray-500">Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0a0a1a] text-gray-400 transition-colors hover:bg-white/[0.08] hover:text-white"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </motion.aside>
  );
}

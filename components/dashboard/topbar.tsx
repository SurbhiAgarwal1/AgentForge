'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Sparkles,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      isLast: index === arr.length - 1,
    }));

  return (
    <div className="flex items-center gap-1.5 text-sm">
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
          )}
          <span
            className={cn(
              'font-medium',
              segment.isLast
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                : 'text-gray-500'
            )}
          >
            {segment.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export function Topbar({
  onMobileMenuToggle,
}: {
  onMobileMenuToggle?: () => void;
}) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState(3);

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-6 backdrop-blur-xl">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-4">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <Breadcrumb />
      </div>

      {/* Center: Search */}
      <div className="hidden max-w-md flex-1 px-8 md:block">
        <div
          className={cn(
            'relative flex items-center rounded-lg border transition-all duration-300',
            searchFocused
              ? 'border-cyan-500/50 bg-white/[0.06] shadow-[0_0_20px_rgba(6,182,212,0.08)]'
              : 'border-white/[0.06] bg-white/[0.03]'
          )}
        >
          <Search className="absolute left-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search agents, projects, commands..."
            className="w-full bg-transparent py-2 pl-10 pr-20 text-sm text-gray-200 placeholder-gray-600 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="absolute right-3 flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* AI Status */}
        <div className="hidden items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-1.5 sm:flex">
          <motion.div
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-xs font-medium text-cyan-400">
            3 Agents Active
          </span>
        </div>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white">
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-[10px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 ring-2 ring-white/10 transition-all hover:ring-cyan-500/30"
          >
            <User className="h-4 w-4 text-white" />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0f0f2a]/95 py-1 shadow-2xl backdrop-blur-xl"
              >
                <div className="border-b border-white/[0.06] px-4 py-3">
                  <p className="text-sm font-medium text-white">Alex Chen</p>
                  <p className="text-xs text-gray-500">alex@agentforge.dev</p>
                </div>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/[0.06]">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

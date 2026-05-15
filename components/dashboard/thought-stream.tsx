'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Terminal, Code2, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Thought = {
  id: string;
  timestamp: string;
  type: 'thinking' | 'action' | 'code' | 'error' | 'success';
  content: string;
  agentName: string;
};

const mockThoughts: Thought[] = [
  { id: '1', timestamp: '14:20:01', type: 'thinking', agentName: 'Architect', content: 'Analyzing project requirements for authentication module...' },
  { id: '2', timestamp: '14:20:05', type: 'action', agentName: 'Architect', content: 'Searching Supabase documentation for Auth helper methods.' },
  { id: '3', timestamp: '14:20:12', type: 'code', agentName: 'Coder', content: 'Implementing createClientComponentClient in middleware.ts' },
  { id: '4', timestamp: '14:20:15', type: 'thinking', agentName: 'Security', content: 'Validating RLS policies for the users table.' },
  { id: '5', timestamp: '14:20:20', type: 'success', agentName: 'Architect', content: 'System architecture validated. Proceeding to implementation.' },
];

export function ThoughtStream() {
  const [thoughts, setThoughts] = useState<Thought[]>(mockThoughts);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const types: Thought['type'][] = ['thinking', 'action', 'code', 'error', 'success'];
      const agents = ['Architect', 'Coder', 'Security', 'Researcher'];
      const contents = [
        'Optimizing database queries...',
        'Refactoring UI components for better performance.',
        'Scanning for potential security vulnerabilities.',
        'Generating unit tests for the last commit.',
        'Updating project documentation.',
      ];

      const newThought: Thought = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        type: types[Math.floor(Math.random() * types.length)],
        agentName: agents[Math.floor(Math.random() * agents.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
      };

      setThoughts(prev => [newThought, ...prev.slice(0, 19)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getIcon = (type: Thought['type']) => {
    switch (type) {
      case 'thinking': return <Brain className="h-3 w-3 text-purple-400" />;
      case 'action': return <Terminal className="h-3 w-3 text-cyan-400" />;
      case 'code': return <Code2 className="h-3 w-3 text-blue-400" />;
      case 'error': return <AlertCircle className="h-3 w-3 text-red-400" />;
      case 'success': return <Sparkles className="h-3 w-3 text-green-400" />;
    }
  };

  return (
    <div className="flex h-[400px] flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Agent Thought Stream</h3>
        </div>
        <button 
          onClick={() => setIsLive(!isLive)}
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors",
            isLive ? "bg-cyan-500/10 text-cyan-400" : "bg-white/5 text-gray-400"
          )}
        >
          {isLive ? 'LIVE' : 'PAUSED'}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {thoughts.map((thought) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-3"
            >
              <div className="mt-1 flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5">
                  {getIcon(thought.type)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {thought.agentName}
                  </span>
                  <span className="text-[10px] text-gray-600">{thought.timestamp}</span>
                </div>
                <p className={cn(
                  "text-xs mt-0.5",
                  thought.type === 'error' ? "text-red-400/80" : "text-gray-300"
                )}>
                  {thought.content}
                </p>
                {thought.type === 'code' && (
                  <div className="mt-2 rounded bg-black/50 p-2 border border-white/5">
                    <div className="h-1.5 w-24 rounded-full bg-white/5 animate-pulse" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

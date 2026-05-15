'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Bot, Database, Globe } from 'lucide-react';

export function AgentNetworkView() {
  const nodes = [
    { id: '1', label: 'Primary Architect', x: 50, y: 50, icon: Bot, color: 'bg-cyan-500' },
    { id: '2', label: 'Memory Core', x: 20, y: 80, icon: Database, color: 'bg-purple-500' },
    { id: '3', label: 'Web Researcher', x: 80, y: 80, icon: Globe, color: 'bg-emerald-500' },
    { id: '4', label: 'Code Reviewer', x: 50, y: 120, icon: Bot, color: 'bg-blue-500' },
  ];

  const connections = [
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '1', to: '4' },
    { from: '3', to: '2' },
  ];

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Share2 className="h-4 w-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Agent Neural Network</h3>
      </div>
      
      <svg className="absolute inset-0 h-full w-full pointer-events-none">
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!;
          const toNode = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}px`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}px`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: "linear" }}
            />
          );
        })}
      </svg>

      <div className="relative z-10 h-full w-full">
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}px`, transform: 'translateX(-50%)' }}
              className="absolute group"
              whileHover={{ scale: 1.1 }}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 shadow-lg transition-colors group-hover:border-white/40",
                node.color
              )}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {node.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';

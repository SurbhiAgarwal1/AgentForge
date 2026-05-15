'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Download, 
  ExternalLink,
  Bot,
  Zap,
  Shield,
  SearchCode
} from 'lucide-react';
import { cn } from '@/lib/utils';

const templates = [
  {
    id: '1',
    name: 'Research Architect',
    description: 'Specialized in deep-web research, document analysis, and synthesis of complex topics.',
    author: 'AgentForge Core',
    stars: 1200,
    downloads: '15k',
    category: 'Research',
    icon: SearchCode,
    color: 'from-blue-500 to-cyan-500',
    tags: ['GPT-4o', 'WebSearch', 'PDF-Parser']
  },
  {
    id: '2',
    name: 'DevOps Automator',
    description: 'Handles CI/CD pipelines, infrastructure as code, and automatic deployment monitoring.',
    author: 'InfraGenius',
    stars: 850,
    downloads: '8k',
    category: 'DevOps',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    tags: ['Terraform', 'GitHubActions', 'Docker']
  },
  {
    id: '3',
    name: 'Security Sentinel',
    description: 'Autonomous security audits, vulnerability scanning, and real-time threat detection.',
    author: 'SafeGuard AI',
    stars: 2100,
    downloads: '22k',
    category: 'Security',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    tags: ['Audit', 'PenTesting', 'Compliance']
  },
  {
    id: '4',
    name: 'Full-Stack Coder',
    description: 'Writes clean, tested code across the entire stack. Expert in React, Node, and SQL.',
    author: 'AgentForge Core',
    stars: 3400,
    downloads: '50k',
    category: 'Development',
    icon: Bot,
    color: 'from-emerald-500 to-teal-500',
    tags: ['TypeScript', 'NextJS', 'Testing']
  }
];

export default function MarketplacePage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Forge Marketplace</h1>
          <p className="text-gray-400">Discover and deploy pre-trained agent templates for any task.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search templates..."
              className="h-10 w-64 rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>
          <button className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white hover:bg-white/10">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Featured Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {templates.map((template, index) => {
          const Icon = template.icon;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-cyan-500/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                    template.color
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-500">by {template.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-[10px] font-bold text-gray-400">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {template.stars}
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-400 line-clamp-2">
                {template.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {template.tags.map(tag => (
                  <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {template.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Documentation
                  </div>
                </div>
                <button className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  Deploy Template
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Development', 'Research', 'Security', 'DevOps', 'Creative', 'Finance'].map((cat) => (
          <button 
            key={cat}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border border-white/10 transition-all",
              cat === 'All' ? "bg-cyan-500 text-white border-cyan-500" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Cpu,
  Rocket,
  Bell,
  Save,
  Globe,
  Bot,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

function GlassCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05]">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </motion.div>
  );
}

function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        {description && (
          <p className="mt-0.5 text-xs text-gray-600">{description}</p>
        )}
      </div>
      <div className="w-full sm:w-64">{children}</div>
    </div>
  );
}

function SwitchField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        {description && (
          <p className="mt-0.5 text-xs text-gray-600">{description}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-white/[0.1]"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [projectName, setProjectName] = useState('AgentForge');
  const [techStack, setTechStack] = useState('Next.js, TypeScript, PostgreSQL');
  const [aiModel, setAiModel] = useState('claude-4-sonnet');
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [deployPlatform, setDeployPlatform] = useState('vercel');
  const [notifDeploy, setNotifDeploy] = useState(true);
  const [notifErrors, setNotifErrors] = useState(true);
  const [notifReviews, setNotifReviews] = useState(false);
  const [localMode, setLocalMode] = useState(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={cardVariants}>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure your AgentForge workspace and AI preferences
        </p>
      </motion.div>

      {/* General Settings */}
      <GlassCard
        title="General"
        description="Basic project configuration"
        icon={Settings}
      >
        <FormField
          label="Project Name"
          description="The name of your current project"
        >
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border-white/[0.08] bg-white/[0.04] text-gray-200 placeholder-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
          />
        </FormField>

        <FormField
          label="Tech Stack"
          description="Comma-separated list of technologies"
        >
          <Input
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="border-white/[0.08] bg-white/[0.04] text-gray-200 placeholder-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
          />
        </FormField>
      </GlassCard>

      {/* AI Configuration */}
      <GlassCard
        title="AI Configuration"
        description="Model and agent behavior settings"
        icon={Bot}
      >
        <FormField
          label="AI Model"
          description="Select the model for code generation"
        >
          <Select value={aiModel} onValueChange={setAiModel}>
            <SelectTrigger className="border-white/[0.08] bg-white/[0.04] text-gray-200 focus:ring-cyan-500/20">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="border-white/[0.08] bg-[#0f0f2a]/95 backdrop-blur-xl">
              <SelectItem value="claude-4-sonnet" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                Claude 4 Sonnet
              </SelectItem>
              <SelectItem value="claude-4-opus" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                Claude 4 Opus
              </SelectItem>
              <SelectItem value="claude-4-haiku" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                Claude 4 Haiku
              </SelectItem>
              <SelectItem value="gpt-4-turbo" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                GPT-4 Turbo
              </SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <SwitchField
          label="Auto-Deploy"
          description="Automatically deploy when builds pass review"
          checked={autoDeploy}
          onChange={setAutoDeploy}
        />

        <div className="pt-4 border-t border-white/5 mt-4">
          <SwitchField
            label="Local Intelligence Mode"
            description="Run models locally via Ollama or WebGPU when available"
            checked={localMode}
            onChange={setLocalMode}
          />
        </div>
      </GlassCard>

      {/* Deployment Settings */}
      <GlassCard
        title="Deployment"
        description="Platform and environment configuration"
        icon={Rocket}
      >
        <FormField
          label="Platform"
          description="Default deployment target"
        >
          <Select value={deployPlatform} onValueChange={setDeployPlatform}>
            <SelectTrigger className="border-white/[0.08] bg-white/[0.04] text-gray-200 focus:ring-cyan-500/20">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="border-white/[0.08] bg-[#0f0f2a]/95 backdrop-blur-xl">
              <SelectItem value="vercel" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                Vercel
              </SelectItem>
              <SelectItem value="aws" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                AWS
              </SelectItem>
              <SelectItem value="gcp" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                GCP
              </SelectItem>
              <SelectItem value="netlify" className="text-gray-300 focus:bg-white/[0.06] focus:text-white">
                Netlify
              </SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </GlassCard>

      {/* Notifications Settings */}
      <GlassCard
        title="Notifications"
        description="Configure when and how you receive alerts"
        icon={Bell}
      >
        <SwitchField
          label="Deployment Notifications"
          description="Receive alerts when deployments complete"
          checked={notifDeploy}
          onChange={setNotifDeploy}
        />

        <SwitchField
          label="Error Notifications"
          description="Get notified when agents encounter errors"
          checked={notifErrors}
          onChange={setNotifErrors}
        />

        <SwitchField
          label="Review Notifications"
          description="Receive alerts for code review completions"
          checked={notifReviews}
          onChange={setNotifReviews}
        />
      </GlassCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 border-0"
            size="lg"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Brain,
  Monitor,
  Server,
  ShieldCheck,
  Cloud,
  Eye,
  MessageSquare,
  Rocket,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Prompt: MessageSquare,
  Architect: Brain,
  Frontend: Monitor,
  Backend: Server,
  QA: ShieldCheck,
  Reviewer: Eye,
  DevOps: Cloud,
  Deploy: Rocket,
};

const nodeColorMap: Record<string, string> = {
  Prompt: '#94a3b8',
  Architect: '#06b6d4',
  Frontend: '#8b5cf6',
  Backend: '#06b6d4',
  QA: '#22c55e',
  Reviewer: '#8b5cf6',
  DevOps: '#06b6d4',
  Deploy: '#22c55e',
};

const workflowSteps = [
  {
    id: '1',
    name: 'Prompt Analysis',
    description: 'Parse user requirements and define project scope',
    agent: 'Prompt',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Architecture Design',
    description: 'Design system architecture and define service boundaries',
    agent: 'Architect',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Frontend Generation',
    description: 'Generate UI components and client-side logic',
    agent: 'Frontend',
    status: 'in_progress',
  },
  {
    id: '4',
    name: 'Backend Generation',
    description: 'Build API endpoints and server-side services',
    agent: 'Backend',
    status: 'in_progress',
  },
  {
    id: '5',
    name: 'Quality Assurance',
    description: 'Run automated tests and verify correctness',
    agent: 'QA',
    status: 'pending',
  },
  {
    id: '6',
    name: 'Code Review',
    description: 'Review code quality and security compliance',
    agent: 'Reviewer',
    status: 'pending',
  },
  {
    id: '7',
    name: 'DevOps Pipeline',
    description: 'Configure CI/CD and containerization',
    agent: 'DevOps',
    status: 'pending',
  },
  {
    id: '8',
    name: 'Deployment',
    description: 'Deploy to production with zero-downtime strategy',
    agent: 'Deploy',
    status: 'pending',
  },
];

function CustomNode({ data }: NodeProps) {
  const iconName = data.label as string;
  const IconComponent = iconMap[iconName] || MessageSquare;
  const color = nodeColorMap[iconName] || '#94a3b8';

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0f0f2a]/90 px-4 py-3 shadow-lg backdrop-blur-xl"
      style={{ boxShadow: `0 0 20px ${color}15` }}
    >
      {data.label !== 'Prompt' && (
        <Handle
          type="target"
          position={Position.Left}
          className="!h-2 !w-2 !rounded-full !border-0"
          style={{ background: color }}
        />
      )}
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}20` }}
      >
        <IconComponent className="h-5 w-5" style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{data.label}</p>
        <p className="text-xs text-gray-500">{data.sublabel}</p>
      </div>
      {data.label !== 'Deploy' && (
        <Handle
          type="source"
          position={Position.Right}
          className="!h-2 !w-2 !rounded-full !border-0"
          style={{ background: color }}
        />
      )}
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 40, y: 260 },
    data: { label: 'Prompt', sublabel: 'User Input' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 240, y: 260 },
    data: { label: 'Architect', sublabel: 'Design' },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 460, y: 140 },
    data: { label: 'Frontend', sublabel: 'UI Generation' },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 460, y: 380 },
    data: { label: 'Backend', sublabel: 'API Generation' },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 680, y: 140 },
    data: { label: 'QA', sublabel: 'Testing' },
  },
  {
    id: '6',
    type: 'custom',
    position: { x: 680, y: 380 },
    data: { label: 'Reviewer', sublabel: 'Code Review' },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 880, y: 260 },
    data: { label: 'DevOps', sublabel: 'Pipeline' },
  },
  {
    id: '8',
    type: 'custom',
    position: { x: 1080, y: 260 },
    data: { label: 'Deploy', sublabel: 'Production' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    style: { stroke: '#06b6d4', strokeWidth: 2 },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    style: { stroke: '#22c55e', strokeWidth: 2 },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    style: { stroke: '#06b6d4', strokeWidth: 2, strokeDasharray: '5 5' },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    style: { stroke: '#06b6d4', strokeWidth: 2, strokeDasharray: '5 5' },
  },
  {
    id: 'e7-8',
    source: '7',
    target: '8',
    style: { stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '5 5' },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
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

function StepStatusIcon({ status }: { status: string }) {
  if (status === 'completed') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
    );
  }
  if (status === 'in_progress') {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20">
        <motion.div
          className="h-2.5 w-2.5 rounded-full bg-cyan-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    );
  }
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06]">
      <div className="h-2.5 w-2.5 rounded-full bg-gray-600" />
    </div>
  );
}

export default function WorkflowsPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => {
      setNodes((nds) => {
        const updated = [...nds];
        return updated;
      });
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setEdges((eds) => {
        const updated = [...eds];
        return updated;
      });
    },
    []
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Workflows</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visualize and manage your AI agent orchestration pipeline
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* React Flow Diagram */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Agent Pipeline</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Active
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Completed
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-gray-600" />
                Pending
              </span>
            </div>
          </div>
          <div className="h-[600px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              proOptions={{ hideAttribution: true }}
              className="bg-[#0a0a1a]"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="rgba(255,255,255,0.04)"
              />
              <Controls
                className="!border-white/[0.08] !bg-[#0f0f2a]/90 !shadow-lg [&>button]:!border-white/[0.08] [&>button]:!bg-[#0f0f2a] [&>button]:!text-gray-400 [&>button:hover]:!bg-white/[0.08] [&>button:hover]:!text-white"
              />
            </ReactFlow>
          </div>
        </motion.div>

        {/* Side Panel: Workflow Steps */}
        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h3 className="text-sm font-semibold text-white">Workflow Steps</h3>
            <span className="text-xs text-gray-500">
              {workflowSteps.filter((s) => s.status === 'completed').length}/{workflowSteps.length}
            </span>
          </div>
          <div className="max-h-[560px] overflow-y-auto p-4 scrollbar-thin">
            <div className="space-y-1">
              {workflowSteps.map((step, index) => {
                const color = nodeColorMap[step.agent] || '#94a3b8';
                const IconComponent = iconMap[step.agent] || MessageSquare;

                return (
                  <div key={step.id} className="relative">
                    {/* Connection line */}
                    {index < workflowSteps.length - 1 && (
                      <div className="absolute left-3 top-7 h-full w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
                    )}

                    <div className="relative flex items-start gap-3 pb-6">
                      <StepStatusIcon status={step.status} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {step.name}
                          </p>
                          <span
                            className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: `${color}15`,
                              color,
                            }}
                          >
                            {step.agent}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

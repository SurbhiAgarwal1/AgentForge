export type AgentStatus = 'thinking' | 'working' | 'reviewing' | 'idle' | 'completed' | 'error';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: AgentStatus;
  currentTask: string;
  progress: number;
  thoughtLog: string[];
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'generating' | 'building' | 'reviewing' | 'deploying' | 'completed' | 'error';
  progress: number;
  agents: string[];
  createdAt: string;
  techStack: string[];
  files: ProjectFile[];
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  type: 'component' | 'page' | 'api' | 'config' | 'style' | 'util';
  content: string;
  language: string;
}

export interface Deployment {
  id: string;
  projectId: string;
  projectName: string;
  status: 'pending' | 'building' | 'deploying' | 'live' | 'failed';
  url: string;
  platform: string;
  deployedAt: string;
  buildTime: string;
}

export interface MemoryEntry {
  id: string;
  type: 'architecture' | 'pattern' | 'bug' | 'preference' | 'context';
  content: string;
  project: string;
  timestamp: string;
  relevance: number;
}

export interface ActivityItem {
  id: string;
  agent: string;
  action: string;
  timestamp: string;
  type: 'code' | 'review' | 'deploy' | 'plan' | 'debug' | 'test';
}

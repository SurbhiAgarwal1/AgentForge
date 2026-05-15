'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FolderOpen,
  FileCode2,
  FileJson,
  FileType,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { projects } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { ProjectFile } from '@/lib/types';

const languageIcons: Record<string, React.ElementType> = {
  typescript: FileCode2,
  json: FileJson,
  python: FileCode2,
  go: FileCode2,
};

const fileIconVariants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 90 },
};

function getFileIcon(file: ProjectFile) {
  if (file.type === 'component' || file.type === 'page' || file.type === 'api' || file.type === 'util') {
    const IconComp = languageIcons[file.language] || FileCode2;
    return <IconComp className="h-4 w-4 text-purple-400" />;
  }
  if (file.language === 'json') {
    return <FileJson className="h-4 w-4 text-yellow-400" />;
  }
  return <FileType className="h-4 w-4 text-gray-500" />;
}

function FileTreeItem({
  file,
  depth = 0,
  selectedFileId,
  onSelectFile,
}: {
  file: ProjectFile;
  depth?: number;
  selectedFileId: string | null;
  onSelectFile: (file: ProjectFile) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isFolder = file.type === 'component' ? false : !['page', 'api', 'util', 'config', 'style'].includes(file.type);
  // For our flat file structure, treat all items as files
  const isFile = true;

  const isSelected = selectedFileId === file.id;

  return (
    <div>
      <button
        onClick={() => {
          if (isFile) {
            onSelectFile(file);
          }
        }}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/[0.05]',
          isSelected
            ? 'bg-cyan-500/[0.08] text-cyan-400'
            : 'text-gray-400'
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <span className="flex-shrink-0">{getFileIcon(file)}</span>
        <span className="truncate">{file.name}</span>
      </button>
    </div>
  );
}

function ProjectTree({
  project,
  selectedFileId,
  onSelectFile,
}: {
  project: (typeof projects)[0];
  selectedFileId: string | null;
  onSelectFile: (file: ProjectFile) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/[0.05]"
      >
        <motion.div
          variants={fileIconVariants}
          animate={expanded ? 'expanded' : 'collapsed'}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-4 w-4 text-gray-500" />
        </motion.div>
        {expanded ? (
          <FolderOpen className="h-4 w-4 text-cyan-400" />
        ) : (
          <Folder className="h-4 w-4 text-cyan-400" />
        )}
        <span className="truncate">{project.name}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-2 border-l border-white/[0.06]">
              {project.files.map((file) => (
                <FileTreeItem
                  key={file.id}
                  file={file}
                  depth={1}
                  selectedFileId={selectedFileId}
                  onSelectFile={onSelectFile}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FileExplorer({
  onFileSelect,
}: {
  onFileSelect?: (file: ProjectFile) => void;
}) {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const handleSelectFile = (file: ProjectFile) => {
    setSelectedFileId(file.id);
    onFileSelect?.(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h3 className="text-sm font-semibold text-white">Project Files</h3>
        <span className="text-xs text-gray-500">
          {projects.reduce((sum, p) => sum + p.files.length, 0)} files
        </span>
      </div>

      <div className="max-h-[500px] overflow-y-auto p-2">
        {projects.map((project) => (
          <ProjectTree
            key={project.id}
            project={project}
            selectedFileId={selectedFileId}
            onSelectFile={handleSelectFile}
          />
        ))}
      </div>
    </motion.div>
  );
}

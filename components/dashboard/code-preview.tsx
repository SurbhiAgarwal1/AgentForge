'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectFile } from '@/lib/types';

const languageColors: Record<string, string> = {
  typescript: 'bg-blue-500/20 text-blue-400',
  javascript: 'bg-yellow-500/20 text-yellow-400',
  python: 'bg-green-500/20 text-green-400',
  go: 'bg-cyan-500/20 text-cyan-400',
  json: 'bg-yellow-500/20 text-yellow-400',
  html: 'bg-orange-500/20 text-orange-400',
  css: 'bg-purple-500/20 text-purple-400',
};

// Simple syntax highlighting patterns
const keywordPattern =
  /\b(import|export|from|default|function|const|let|var|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw|typeof|instanceof|void|null|undefined|true|false|switch|case|break|continue|def|self|func|package|module|require)\b/g;
const typePattern =
  /\b(string|number|boolean|any|unknown|never|void|Promise|React|NextResponse|Request|Response|Array|Record|Map|Set|Date|Error|RegExp|object)\b/g;
const stringPattern = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
const commentPattern = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

function highlightLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let keyIndex = 0;

  // Process comments first (they take precedence)
  const commentMatch = remaining.match(commentPattern);
  if (commentMatch) {
    const commentIdx = remaining.search(commentPattern);
    if (commentIdx > 0) {
      // Process text before the comment
      const beforeComment = remaining.substring(0, commentIdx);
      parts.push(...highlightCode(beforeComment, keyIndex));
      keyIndex += 100;
    }
    parts.push(
      <span key={`comment-${keyIndex}`} className="text-gray-600 italic">
        {commentMatch[0]}
      </span>
    );
    return parts;
  }

  parts.push(...highlightCode(remaining, keyIndex));
  return parts;
}

function highlightCode(text: string, startKey: number): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];

  // Tokenize by splitting on strings and keywords
  const regex = /(["'`])(?:(?=(\\?))\2.)*?\1|\b(?:import|export|from|default|function|const|let|var|return|if|else|for|while|class|interface|type|extends|implements|new|this|async|await|try|catch|throw|typeof|instanceof|void|null|undefined|true|false|switch|case|break|continue|def|self|func|package|module|require)\b|\b(?:string|number|boolean|any|unknown|never|void|Promise|React|NextResponse|Request|Response|Array|Record|Map|Set|Date|Error|RegExp|object)\b/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = startKey;

  while ((match = regex.exec(text)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      tokens.push(
        <span key={`text-${keyIdx}`}>{text.slice(lastIndex, match.index)}</span>
      );
      keyIdx++;
    }

    const matchText = match[0];

    // Check if it's a string
    if (match[1] && /["'`]/.test(match[1])) {
      tokens.push(
        <span key={`str-${keyIdx}`} className="text-emerald-400">
          {matchText}
        </span>
      );
    }
    // Check if it's a type
    else if (typePattern.test(matchText)) {
      tokens.push(
        <span key={`type-${keyIdx}`} className="text-cyan-400">
          {matchText}
        </span>
      );
    }
    // It's a keyword
    else {
      tokens.push(
        <span key={`kw-${keyIdx}`} className="text-purple-400 font-medium">
          {matchText}
        </span>
      );
    }

    keyIdx++;
    lastIndex = match.index + matchText.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    tokens.push(<span key={`rest-${keyIdx}`}>{text.slice(lastIndex)}</span>);
  }

  return tokens;
}

interface CodePreviewProps {
  file?: ProjectFile;
  code?: string;
  language?: string;
  fileName?: string;
}

export function CodePreview({ file, code, language, fileName }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const displayCode = file?.content || code || '';
  const displayLanguage = file?.language || language || 'typescript';
  const displayFileName = file?.name || fileName || 'untitled';

  const lines = useMemo(() => displayCode.split('\n'), [displayCode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const langBadgeClass = languageColors[displayLanguage] || 'bg-gray-500/20 text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d1117]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <FileCode2 className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-300">
            {displayFileName}
          </span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase',
              langBadgeClass
            )}
          >
            {displayLanguage}
          </span>
        </div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </motion.button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                <span className="mr-6 inline-block w-8 select-none text-right text-gray-700">
                  {index + 1}
                </span>
                <span className="flex-1 text-gray-300">
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}

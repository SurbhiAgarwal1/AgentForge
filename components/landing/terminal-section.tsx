'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { terminalLines } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type LineType = 'command' | 'info' | 'agent' | 'success';

interface DisplayedLine {
  id: number;
  type: LineType;
  text: string;
}

const lineTypeColors: Record<LineType, string> = {
  command: 'text-cyan-400',
  info: 'text-gray-400',
  agent: 'text-purple-400',
  success: 'text-green-400',
};

const TYPING_SPEED = 30; // ms per character
const LINE_PAUSE = 400; // ms pause between lines
const CYCLE_PAUSE = 3000; // ms pause before restarting

export function TerminalSection() {
  const [displayedLines, setDisplayedLines] = useState<DisplayedLine[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Reset everything for a new cycle
  const resetCycle = useCallback(() => {
    setDisplayedLines([]);
    setCurrentText('');
    setCurrentLineIndex(0);
    setIsTyping(true);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    clearAllTimeouts();

    if (currentLineIndex >= terminalLines.length) {
      // All lines done, pause then restart
      timeoutRef.current = setTimeout(() => {
        resetCycle();
      }, CYCLE_PAUSE);
      return;
    }

    const line = terminalLines[currentLineIndex];

    if (isTyping) {
      // Typing out the current line character by character
      if (currentText.length < line.text.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(line.text.slice(0, currentText.length + 1));
        }, TYPING_SPEED);
      } else {
        // Line fully typed, move to next line
        timeoutRef.current = setTimeout(() => {
          setDisplayedLines((prev) => [
            ...prev,
            { id: currentLineIndex, type: line.type as LineType, text: line.text },
          ]);
          setCurrentText('');
          setCurrentLineIndex((prev) => prev + 1);
          setIsTyping(true);
          scrollToBottom();
        }, LINE_PAUSE);
      }
    }

    return clearAllTimeouts;
  }, [currentLineIndex, currentText, isTyping, clearAllTimeouts, resetCycle, scrollToBottom]);

  // Auto-scroll on new lines
  useEffect(() => {
    scrollToBottom();
  }, [displayedLines, currentText, scrollToBottom]);

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[300px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Terminal window */}
        <motion.div
          className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          }}
        >
          {/* macOS-style header */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500">agentforge --session nexus</span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="h-[400px] overflow-y-auto p-5 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
          >
            {displayedLines.map((line) => (
              <div key={line.id} className={lineTypeColors[line.type]}>
                {line.text}
              </div>
            ))}

            {/* Currently typing line */}
            {currentLineIndex < terminalLines.length && (
              <div
                className={lineTypeColors[terminalLines[currentLineIndex].type as LineType]}
              >
                {currentText}
                <motion.span
                  className="inline-block h-4 w-2 translate-y-0.5 bg-cyan-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}

            {/* Blinking cursor when all lines are done */}
            {currentLineIndex >= terminalLines.length && (
              <div className="mt-1">
                <motion.span
                  className="inline-block h-4 w-2 bg-cyan-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

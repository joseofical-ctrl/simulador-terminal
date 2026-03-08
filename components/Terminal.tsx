'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { useLanguageStore } from '@/store/languageStore';
import { parseCommand, getWelcomeMessages } from '@/lib/commandParser';
import OutputLineComponent from './OutputLine';
import CommandInput from './CommandInput';
import LanguageToggle from './LanguageToggle';
import MatrixRain from './MatrixRain';
import { OutputLine } from '@/types/terminal';


export default function Terminal() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInit = useRef(false);

  const {
    history,
    commandHistory,
    isProcessing,
    addOutput,
    addCommand,
    clearHistory,
    setProcessing,
  } = useTerminalStore();

  const { language } = useLanguageStore();

  // Initialize with welcome message
  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;
    const steps = getWelcomeMessages(language);
    steps.forEach(({ text, type, delay }) => {
      setTimeout(() => {
        addOutput({ content: text, type: type as OutputLine['type'] });
      }, delay);
    });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback(
    async (input: string) => {
      if (isProcessing) return;

      // Echo the command
      addOutput({ content: input, type: 'command' });
      addCommand(input);

      const steps = parseCommand(input, language);

      if (steps.length === 1 && steps[0].text === '__CLEAR__') {
        clearHistory();
        return;
      }

      setProcessing(true);

      // Find max delay
      const maxDelay = Math.max(...steps.map((s) => s.delay));

      for (const step of steps) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            addOutput({
              content: step.text,
              type: step.type as OutputLine['type'],
            });
            resolve();
          }, step.delay);
        });
      }

      // Wait for last step + buffer
      await new Promise((r) => setTimeout(r, maxDelay + 400));
      setProcessing(false);
    },
    [isProcessing, language, addOutput, addCommand, clearHistory, setProcessing]
  );

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] font-mono overflow-hidden">
      {/* Scanlines overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 scanlines" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 py-2 bg-black/80 border-b border-green-900/50 backdrop-blur-sm shrink-0"
      >
        <div className="flex items-center gap-3">
          {/* Window controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-default" />
          </div>
          <span className="text-green-500 text-xs font-mono opacity-80">
            hacker-terminal — root@system:~
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Status indicators */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-green-700 font-mono">
            <span className="flex items-center gap-1">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              CONNECTED
            </span>
            <span>|</span>
            <span>CMD: {commandHistory.length}</span>
          </div>
          <LanguageToggle />
        </div>
      </motion.header>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 space-y-0.5 terminal-scroll"
        onClick={() => document.getElementById('terminal-input')?.focus()}
      >
        {/* Glow effect */}
        <div className="pointer-events-none fixed inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-green-900/5 blur-3xl" />

        <AnimatePresence>
          {history.map((line, idx) => {
            if (line.type === 'matrix') {
              return (
                <MatrixRain
                  key={line.id}
                  duration={5000}
                />
              );
            }
            return (
              <OutputLineComponent
                key={line.id}
                line={line}
                isLast={idx === history.length - 1}
              />
            );
          })}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="shrink-0 px-4 py-3 bg-black/60 border-t border-green-900/50 backdrop-blur-sm"
      >
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-cyan-500 text-xs font-mono mb-1 flex items-center gap-2"
          >
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              ▶
            </motion.span>
            {language === 'en' ? 'Processing...' : 'Procesando...'}
          </motion.div>
        )}
        <CommandInput onSubmit={handleCommand} disabled={isProcessing} />
      </motion.div>

      {/* Footer status bar */}
      <div className="shrink-0 px-4 py-1 bg-green-900/20 border-t border-green-900/30 flex items-center justify-between text-[10px] text-green-700 font-mono">
        <span>© 2024 Hacker Terminal Simulator</span>
        <span className="flex items-center gap-3">
          <span>
            {language === 'en' ? 'Press' : 'Presiona'}{' '}
            <kbd className="px-1 py-0.5 bg-green-900/40 rounded text-green-500">↑↓</kbd>{' '}
            {language === 'en' ? 'for history' : 'para historial'}
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-green-900/40 rounded text-green-500">Tab</kbd>{' '}
            {language === 'en' ? 'to autocomplete' : 'para autocompletar'}
          </span>
        </span>
      </div>
    </div>
  );
}

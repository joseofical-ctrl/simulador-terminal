'use client';

import { useRef, useEffect, KeyboardEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { useLanguageStore } from '@/store/languageStore';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  disabled?: boolean;
}

export default function CommandInput({ onSubmit, disabled }: CommandInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { commandHistory, historyIndex, setHistoryIndex } = useTerminalStore();
  const { language } = useLanguageStore();

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (value.trim()) {
        onSubmit(value);
        setValue('');
        setHistoryIndex(-1);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setValue(commandHistory[nextIndex] || '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setValue(nextIndex === -1 ? '' : commandHistory[nextIndex] || '');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete
      const commands = ['help', 'scan network', 'decrypt file', 'access system', 'about', 'clear', 'matrix', 'whoami', 'ls', 'status', 'ping '];
      const match = commands.find((c) => c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
  };

  return (
    <div
      className="flex items-center gap-2 w-full cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="text-green-500 font-mono text-sm whitespace-nowrap shrink-0">
        root@system:~$
      </span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          id="terminal-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className={`
            w-full bg-transparent outline-none border-none
            font-mono text-sm text-white caret-green-400
            disabled:cursor-not-allowed
          `}
          aria-label={language === 'en' ? 'Terminal command input' : 'Entrada de comando del terminal'}
        />
        {/* Blinking cursor overlay when empty */}
        {value === '' && !disabled && (
          <motion.span
            className="absolute left-0 top-0 font-mono text-sm text-green-400 pointer-events-none select-none"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ▌
          </motion.span>
        )}
      </div>
    </div>
  );
}

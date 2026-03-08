'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { OutputLine } from '@/types/terminal';
import { useEffect, useState } from 'react';

interface OutputLineProps {
  line: OutputLine;
  isLast?: boolean;
}

function getColorClass(type: OutputLine['type']): string {
  switch (type) {
    case 'command':
      return 'text-green-300';
    case 'success':
      return 'text-green-400';
    case 'error':
      return 'text-red-400';
    case 'system':
      return 'text-cyan-400';
    case 'matrix':
      return 'text-green-500';
    case 'output':
    default:
      return 'text-green-200/90';
  }
}

function TypingText({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) { setDone(true); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}{!done && <span className="animate-pulse">▌</span>}</span>;
}

export default function OutputLineComponent({ line, isLast }: OutputLineProps) {
  const colorClass = getColorClass(line.type);
  const isCommand = line.type === 'command';

  const lineContent = line.content;
  const isMultiline = lineContent.includes('\n');
  const lines = lineContent.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`font-mono text-sm leading-6 whitespace-pre ${colorClass}`}
    >
      {isCommand ? (
        <span>
          <span className="text-green-500 mr-1">root@system:~$</span>
          <span className="text-white ml-1">{lineContent}</span>
        </span>
      ) : isMultiline ? (
        lines.map((l, idx) => (
          <div key={idx}>{l || '\u00A0'}</div>
        ))
      ) : lineContent === '' ? (
        <span>&nbsp;</span>
      ) : isLast ? (
        <TypingText text={lineContent} />
      ) : (
        <span>{lineContent}</span>
      )}
    </motion.div>
  );
}

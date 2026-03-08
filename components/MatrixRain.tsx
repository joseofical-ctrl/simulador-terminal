'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MatrixRainProps {
  onComplete?: () => void;
  duration?: number;
}

export default function MatrixRain({ onComplete, duration = 5000 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(cols).fill(1);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]<>';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Bright leader char
        ctx.fillStyle = '#afffaf';
        ctx.fillText(char, x, y);

        // Green trail
        ctx.fillStyle = '#00ff41';
        const pastChar = chars[Math.floor(Math.random() * chars.length)];
        if (drops[i] > 1) ctx.fillText(pastChar, x, (drops[i] - 1) * fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete?.();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-48 rounded overflow-hidden border border-green-500/30 my-2"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}

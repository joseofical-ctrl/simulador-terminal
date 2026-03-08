"use client";

// ============================================================
// Component: ExcuseCard
// Displays the generated excuse with copy and save actions
// Also includes a typewriter animation effect
// Supports i18n via t() prop
// ============================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Heart, Check, Tag } from "lucide-react";
import { Excuse } from "@/types";
import { cn } from "@/lib/utils";
import { TranslationKey } from "@/lib/translations";

interface ExcuseCardProps {
  excuse: Excuse;
  isFavorite: boolean;
  onSave: (excuse: Excuse) => void;
  onRemove: (id: string) => void;
  onCopy: (text: string) => void;
  t: (key: TranslationKey) => string;
}

// Category badge color mapping
const categoryColors: Record<string, string> = {
  University: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Work: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Friends: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Family: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Relationship: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Absurd: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

/**
 * Hook that animates text with a typewriter effect
 */
function useTypewriter(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIsDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, isDone };
}

export function ExcuseCard({
  excuse,
  isFavorite,
  onSave,
  onRemove,
  onCopy,
  t,
}: ExcuseCardProps) {
  const [copied, setCopied] = useState(false);
  const { displayed, isDone } = useTypewriter(excuse.text);

  const handleCopy = () => {
    onCopy(excuse.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    if (isFavorite) {
      onRemove(excuse.id);
    } else {
      onSave(excuse);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-2xl border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-sm p-6 shadow-2xl overflow-hidden"
    >
      {/* Decorative gradient glow on the card */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-4"
      >
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
            categoryColors[excuse.category] || "bg-zinc-800 text-zinc-400"
          )}
        >
          <Tag className="w-3 h-3" />
          {excuse.category}
        </span>
      </motion.div>

      {/* Excuse Text with typewriter effect */}
      <div className="mb-6 min-h-[80px] flex items-start">
        <p className="text-white text-lg sm:text-xl font-medium leading-relaxed">
          {displayed}
          {/* Blinking cursor while typing */}
          {!isDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-violet-400 ml-0.5 align-middle"
            />
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
        {/* Copy Button */}
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            copied
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-white"
          )}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {t("copied")}
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {t("copy")}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Save/Unsave Favorite Button */}
        <motion.button
          onClick={handleFavorite}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            isFavorite
              ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
              : "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-white"
          )}
        >
          <Heart
            className={cn("w-4 h-4 transition-all", isFavorite && "fill-current")}
          />
          {isFavorite ? t("saved") : t("save")}
        </motion.button>

        {/* Timestamp */}
        <span className="ml-auto text-xs text-zinc-600">
          {new Date(excuse.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}

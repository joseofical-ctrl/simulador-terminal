"use client";

// ============================================================
// Component: Header
// App title, subtitle, generated excuse counter and language toggle
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Globe } from "lucide-react";
import { Language, TranslationKey } from "@/lib/translations";

interface HeaderProps {
  excuseCount: number;
  language: Language;
  t: (key: TranslationKey) => string;
  onToggleLanguage: () => void;
}

export function Header({
  excuseCount,
  language,
  t,
  onToggleLanguage,
}: HeaderProps) {
  return (
    <header className="relative text-center py-16 px-4 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-10 left-1/4 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-2xl" />
        <div className="absolute top-10 right-1/4 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      {/* ——— Language toggle button (top-right) ——— */}
      <div className="absolute top-5 right-4 sm:right-6 z-10">
        <motion.button
          onClick={onToggleLanguage}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          title={t("lang_toggle_label")}
          aria-label={t("lang_toggle_label")}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <Globe className="w-3.5 h-3.5 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
          {/* Show both options, highlight the active one */}
          <span className="text-xs font-semibold tracking-wide">
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5"
              >
                <span className="text-white">
                  {language === "en" ? "EN" : "ES"}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">
                  {language === "en" ? "ES" : "EN"}
                </span>
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.button>
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-6"
      >
        <Zap className="w-3.5 h-3.5" />
        {t("badge")}
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-none"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`title-${language}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline"
          >
            <span className="text-white">{t("title_word1")}</span>{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t("title_word2")}
            </span>{" "}
            <span className="text-white">{t("title_word3")}</span>
          </motion.span>
        </AnimatePresence>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl text-zinc-400 max-w-lg mx-auto mb-10"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`subtitle-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="inline"
          >
            {t("subtitle_pre")}{" "}
            <span className="text-white font-medium">
              {t("subtitle_highlight")}
            </span>{" "}
            {t("subtitle_post")}
          </motion.span>
        </AnimatePresence>
      </motion.p>

      {/* Stats counter */}
      {excuseCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>
            <span className="font-semibold text-white">{excuseCount}</span>{" "}
            {excuseCount === 1 ? t("counter_single") : t("counter_plural")}
          </span>
        </motion.div>
      )}
    </header>
  );
}

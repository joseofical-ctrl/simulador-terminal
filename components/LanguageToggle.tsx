'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/store/languageStore';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center gap-1 bg-black/40 border border-green-900/60 rounded-md px-1 py-0.5">
      <button
        id="lang-en-btn"
        onClick={() => setLanguage('en')}
        className={`relative px-2 py-0.5 rounded text-xs font-mono font-bold transition-all duration-200 ${
          language === 'en'
            ? 'text-black'
            : 'text-green-600 hover:text-green-400'
        }`}
        aria-label="Switch to English"
      >
        {language === 'en' && (
          <motion.div
            layoutId="lang-pill"
            className="absolute inset-0 bg-green-400 rounded"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <span className="text-green-800 font-mono text-xs">|</span>
      <button
        id="lang-es-btn"
        onClick={() => setLanguage('es')}
        className={`relative px-2 py-0.5 rounded text-xs font-mono font-bold transition-all duration-200 ${
          language === 'es'
            ? 'text-black'
            : 'text-green-600 hover:text-green-400'
        }`}
        aria-label="Cambiar a Español"
      >
        {language === 'es' && (
          <motion.div
            layoutId="lang-pill"
            className="absolute inset-0 bg-green-400 rounded"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">ES</span>
      </button>
    </div>
  );
}

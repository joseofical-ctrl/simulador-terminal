"use client";

// ============================================================
// Hook: useLanguage
// Manages language state (en | es) with localStorage persistence
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { Language, TranslationKey, translations } from "@/lib/translations";

const STORAGE_KEY = "excuse-generator-language";
const DEFAULT_LANGUAGE: Language = "en";

export function useLanguage() {
  // Start with default to avoid SSR hydration mismatch
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read saved language from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === "en" || stored === "es") {
        setLanguageState(stored);
      }
    } catch {
      // localStorage not available (SSR / private mode)
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /**
   * Change language and persist to localStorage
   */
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore write errors
    }
  }, []);

  /**
   * Toggle between English and Spanish
   */
  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "es" : "en");
  }, [language, setLanguage]);

  /**
   * Translation function — returns the string for the given key
   * in the currently active language.
   */
  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key];
    },
    [language]
  );

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isLoaded,
  };
}

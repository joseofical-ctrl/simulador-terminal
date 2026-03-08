"use client";

// ============================================================
// Page: Home (app/page.tsx)
// Main page that orchestrates all components
// Now with full i18n support via useLanguage hook
// ============================================================

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Header } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";
import { GenerateButton } from "@/components/GenerateButton";
import { ExcuseCard } from "@/components/ExcuseCard";
import { FavoritesList } from "@/components/FavoritesList";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/hooks/useLanguage";
import { Excuse, ExcuseCategory } from "@/types";

export default function HomePage() {
  // ——— Language ———
  const { language, toggleLanguage, t } = useLanguage();

  // ——— UI state ———
  const [selectedCategory, setSelectedCategory] =
    useState<ExcuseCategory>("University");
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [excuseCount, setExcuseCount] = useState(0);

  // ——— Favorites management via custom hook ———
  const { favorites, addFavorite, removeFavorite, isFavorite, clearFavorites } =
    useFavorites();

  /**
   * Hit the API route to generate a new excuse in the current language
   */
  async function handleGenerate() {
    if (isLoading) return;

    setIsLoading(true);
    // Clear previous card so animation re-triggers
    setCurrentExcuse(null);

    try {
      const res = await fetch("/api/generate-excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send both category and language to the API
        body: JSON.stringify({ category: selectedCategory, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate excuse");
      }

      const excuse: Excuse = {
        id: uuidv4(),
        text: data.excuse,
        category: selectedCategory,
        createdAt: new Date().toISOString(),
      };

      setCurrentExcuse(excuse);
      setExcuseCount((c) => c + 1);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, {
        description: t("toast_error_desc"),
      });
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Copy text to clipboard and show toast
   */
  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(t("toast_copied"), {
        icon: "📋",
        duration: 2000,
      });
    });
  }

  /**
   * Save an excuse to favorites and show toast
   */
  function handleSave(excuse: Excuse) {
    addFavorite(excuse);
    toast.success(t("toast_saved"), {
      icon: "❤️",
      duration: 2000,
    });
  }

  /**
   * Remove from favorites and show toast
   */
  function handleRemoveFavorite(id: string) {
    removeFavorite(id);
    toast.info(t("toast_removed"), {
      icon: "🗑️",
      duration: 1500,
    });
  }

  /**
   * Clear all favorites
   */
  function handleClearAll() {
    clearFavorites();
    toast.info(t("toast_cleared"), {
      icon: "🧹",
      duration: 1500,
    });
  }

  return (
    <main className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* ——— Background grid pattern ——— */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ——— Ambient background blobs ——— */}
      <div className="fixed top-1/3 -left-32 w-80 h-80 bg-violet-800/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 -right-32 w-80 h-80 bg-indigo-800/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
        {/* ——— Header (includes language toggle) ——— */}
        <Header
          excuseCount={excuseCount}
          language={language}
          t={t}
          onToggleLanguage={toggleLanguage}
        />

        {/* ——— Main card container ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 shadow-xl mb-8"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />

          {/* ——— Category Selector ——— */}
          <CategorySelector
            selected={selectedCategory}
            onChange={setSelectedCategory}
            t={t}
          />

          {/* Divider */}
          <div className="my-6 border-t border-zinc-800/60" />

          {/* ——— Generate Button ——— */}
          <GenerateButton onClick={handleGenerate} isLoading={isLoading} t={t} />
        </motion.div>

        {/* ——— Generated Excuse Card ——— */}
        <AnimatePresence mode="wait">
          {currentExcuse && !isLoading && (
            <motion.div key={currentExcuse.id} className="mb-8">
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-3">
                ✦ {t("your_excuse")}
              </p>
              <ExcuseCard
                excuse={currentExcuse}
                isFavorite={isFavorite(currentExcuse.id)}
                onSave={handleSave}
                onRemove={handleRemoveFavorite}
                onCopy={handleCopy}
                t={t}
              />
            </motion.div>
          )}

          {/* Loading skeleton */}
          {isLoading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-3">
                ✦ {t("your_excuse")}
              </p>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-5 w-20 rounded-full bg-zinc-800 animate-pulse" />
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full rounded bg-zinc-800 animate-pulse" />
                  <div className="h-4 w-4/5 rounded bg-zinc-800 animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-zinc-800 animate-pulse" />
                </div>
                <div className="border-t border-zinc-800 pt-4 flex gap-3">
                  <div className="h-9 w-24 rounded-xl bg-zinc-800 animate-pulse" />
                  <div className="h-9 w-24 rounded-xl bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ——— Favorites Section ——— */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
        >
          <FavoritesList
            favorites={favorites}
            onRemove={handleRemoveFavorite}
            onCopy={handleCopy}
            onClearAll={handleClearAll}
            t={t}
          />
        </motion.div>

        {/* ——— Footer ——— */}
        <p className="text-center text-zinc-700 text-xs mt-10">{t("footer")}</p>
      </div>
    </main>
  );
}

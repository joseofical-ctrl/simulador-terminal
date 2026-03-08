"use client";

// ============================================================
// Component: FavoritesList
// Displays all saved favorite excuses with delete actions
// Supports i18n via t() prop
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, Copy, Star } from "lucide-react";
import { Excuse } from "@/types";
import { cn } from "@/lib/utils";
import { TranslationKey } from "@/lib/translations";

interface FavoritesListProps {
  favorites: Excuse[];
  onRemove: (id: string) => void;
  onCopy: (text: string) => void;
  onClearAll: () => void;
  t: (key: TranslationKey) => string;
}

const categoryColors: Record<string, string> = {
  University: "text-blue-400 bg-blue-500/10",
  Work: "text-emerald-400 bg-emerald-500/10",
  Friends: "text-orange-400 bg-orange-500/10",
  Family: "text-yellow-400 bg-yellow-500/10",
  Relationship: "text-pink-400 bg-pink-500/10",
  Absurd: "text-violet-400 bg-violet-500/10",
};

export function FavoritesList({
  favorites,
  onRemove,
  onCopy,
  onClearAll,
  t,
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-14 px-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-6 h-6 text-zinc-600" />
        </div>
        <p className="text-zinc-500 font-medium">{t("favorites_empty_title")}</p>
        <p className="text-zinc-600 text-sm mt-1">{t("favorites_empty_desc")}</p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <h2 className="text-white font-semibold text-base">
            {t("favorites_title")}
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">
            {favorites.length}
          </span>
        </div>
        {favorites.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClearAll}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            {t("clear_all")}
          </motion.button>
        )}
      </div>

      {/* Favorites list */}
      <AnimatePresence>
        <div className="flex flex-col gap-3">
          {favorites.map((excuse, index) => (
            <motion.div
              key={excuse.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group relative flex items-start gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-200"
            >
              {/* Category badge */}
              <span
                className={cn(
                  "shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-md",
                  categoryColors[excuse.category] || "text-zinc-400 bg-zinc-800"
                )}
              >
                {excuse.category}
              </span>

              {/* Excuse text */}
              <p className="flex-1 text-zinc-300 text-sm leading-relaxed">
                {excuse.text}
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {/* Copy */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onCopy(excuse.text)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-colors cursor-pointer"
                  title={t("copy")}
                >
                  <Copy className="w-3.5 h-3.5" />
                </motion.button>

                {/* Remove */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemove(excuse.id)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title={t("clear_all")}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

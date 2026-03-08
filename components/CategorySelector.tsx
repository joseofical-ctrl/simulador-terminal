"use client";

// ============================================================
// Component: CategorySelector
// Grid of category pill buttons to select excuse type
// Supports i18n via t() prop
// ============================================================

import { motion } from "framer-motion";
import { ExcuseCategory } from "@/types";
import {
  BookOpen,
  Briefcase,
  Users,
  Home,
  Heart,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TranslationKey } from "@/lib/translations";

interface CategorySelectorProps {
  selected: ExcuseCategory;
  onChange: (category: ExcuseCategory) => void;
  t: (key: TranslationKey) => string;
}

type CategoryDef = {
  value: ExcuseCategory;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
};

const categories: CategoryDef[] = [
  {
    value: "University",
    labelKey: "cat_university_label",
    descKey: "cat_university_desc",
    icon: <BookOpen className="w-4 h-4" />,
    color: "text-blue-400",
    activeColor:
      "border-blue-500/50 bg-blue-500/10 text-blue-300 shadow-blue-500/10",
  },
  {
    value: "Work",
    labelKey: "cat_work_label",
    descKey: "cat_work_desc",
    icon: <Briefcase className="w-4 h-4" />,
    color: "text-emerald-400",
    activeColor:
      "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/10",
  },
  {
    value: "Friends",
    labelKey: "cat_friends_label",
    descKey: "cat_friends_desc",
    icon: <Users className="w-4 h-4" />,
    color: "text-orange-400",
    activeColor:
      "border-orange-500/50 bg-orange-500/10 text-orange-300 shadow-orange-500/10",
  },
  {
    value: "Family",
    labelKey: "cat_family_label",
    descKey: "cat_family_desc",
    icon: <Home className="w-4 h-4" />,
    color: "text-yellow-400",
    activeColor:
      "border-yellow-500/50 bg-yellow-500/10 text-yellow-300 shadow-yellow-500/10",
  },
  {
    value: "Relationship",
    labelKey: "cat_relationship_label",
    descKey: "cat_relationship_desc",
    icon: <Heart className="w-4 h-4" />,
    color: "text-pink-400",
    activeColor:
      "border-pink-500/50 bg-pink-500/10 text-pink-300 shadow-pink-500/10",
  },
  {
    value: "Absurd",
    labelKey: "cat_absurd_label",
    descKey: "cat_absurd_desc",
    icon: <Sparkles className="w-4 h-4" />,
    color: "text-violet-400",
    activeColor:
      "border-violet-500/50 bg-violet-500/10 text-violet-300 shadow-violet-500/10",
  },
];

export function CategorySelector({
  selected,
  onChange,
  t,
}: CategorySelectorProps) {
  return (
    <div className="w-full">
      <p className="text-sm text-zinc-500 mb-3 font-medium uppercase tracking-wider">
        {t("choose_category")}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(cat.value)}
            className={cn(
              "relative flex flex-col items-start gap-1.5 px-4 py-3.5 rounded-xl border transition-all duration-200 text-left cursor-pointer",
              selected === cat.value
                ? `${cat.activeColor} shadow-lg`
                : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-zinc-300"
            )}
          >
            {/* Selection indicator dot */}
            {selected === cat.value && (
              <motion.div
                layoutId="category-indicator"
                className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-current"
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              />
            )}
            <span
              className={selected === cat.value ? "text-current" : cat.color}
            >
              {cat.icon}
            </span>
            <div>
              <p className="font-semibold text-sm">{t(cat.labelKey)}</p>
              <p className="text-xs opacity-60">{t(cat.descKey)}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

"use client";

// ============================================================
// Component: GenerateButton
// Large CTA button with loading state and Framer Motion
// Supports i18n via t() prop
// ============================================================

import { motion } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TranslationKey } from "@/lib/translations";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  t: (key: TranslationKey) => string;
}

export function GenerateButton({ onClick, isLoading, t }: GenerateButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      className={cn(
        "relative w-full flex items-center justify-center gap-3",
        "px-8 py-4 rounded-2xl font-semibold text-base",
        "transition-all duration-200 cursor-pointer",
        "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600",
        "hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500",
        "text-white shadow-lg shadow-violet-500/25",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
        "overflow-hidden"
      )}
    >
      {/* Shimmer effect */}
      {!isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {/* Button content */}
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{t("generating")}</span>
        </>
      ) : (
        <>
          <Wand2 className="w-5 h-5" />
          <span>{t("generate")}</span>
        </>
      )}
    </motion.button>
  );
}

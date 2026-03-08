// ============================================================
// Translations — Excuse Generator AI
// Supports: English (en) | Español (es)
// ============================================================

export type Language = "en" | "es";

export const translations = {
  en: {
    // Header
    badge: "Powered by GPT-4.1-mini",
    title_word1: "Excuse",
    title_word2: "Generator",
    title_word3: "AI",
    subtitle_pre: "Generate the",
    subtitle_highlight: "perfect excuse",
    subtitle_post: "for any situation.",
    counter_single: "excuse generated this session",
    counter_plural: "excuses generated this session",

    // Category selector
    choose_category: "Choose a category",
    cat_university_label: "University",
    cat_university_desc: "For skipping class",
    cat_work_label: "Work",
    cat_work_desc: "For the office",
    cat_friends_label: "Friends",
    cat_friends_desc: "Cancel plans",
    cat_family_label: "Family",
    cat_family_desc: "Skip Sunday dinner",
    cat_relationship_label: "Relationship",
    cat_relationship_desc: "Romantic excuses",
    cat_absurd_label: "Absurd",
    cat_absurd_desc: "Total nonsense",

    // Generate button
    generate: "Generate Excuse",
    generating: "Generating your excuse...",

    // Excuse card
    your_excuse: "Your excuse",
    copy: "Copy",
    copied: "Copied!",
    save: "Save",
    saved: "Saved",

    // Favorites list
    favorites_title: "Favorite Excuses",
    favorites_empty_title: "No favorites yet",
    favorites_empty_desc: "Generate excuses and save the best ones here.",
    clear_all: "Clear all",

    // Toast messages
    toast_copied: "Copied to clipboard!",
    toast_saved: "Saved to favorites!",
    toast_removed: "Removed from favorites",
    toast_cleared: "All favorites cleared",
    toast_error_desc: "Please check your API key and try again.",

    // Footer
    footer: "Built with Next.js 14 · TailwindCSS · OpenAI GPT-4.1-mini",

    // Language toggle
    lang_toggle_label: "Switch to Spanish",
  },

  es: {
    // Header
    badge: "Impulsado por GPT-4.1-mini",
    title_word1: "Generador",
    title_word2: "de Excusas",
    title_word3: "IA",
    subtitle_pre: "Genera la",
    subtitle_highlight: "excusa perfecta",
    subtitle_post: "para cualquier situación.",
    counter_single: "excusa generada en esta sesión",
    counter_plural: "excusas generadas en esta sesión",

    // Category selector
    choose_category: "Elige una categoría",
    cat_university_label: "Universidad",
    cat_university_desc: "Para faltar a clase",
    cat_work_label: "Trabajo",
    cat_work_desc: "Para la oficina",
    cat_friends_label: "Amigos",
    cat_friends_desc: "Cancelar planes",
    cat_family_label: "Familia",
    cat_family_desc: "Faltar a la cena",
    cat_relationship_label: "Pareja",
    cat_relationship_desc: "Excusas románticas",
    cat_absurd_label: "Absurdo",
    cat_absurd_desc: "Sin ningún sentido",

    // Generate button
    generate: "Generar Excusa",
    generating: "Generando tu excusa...",

    // Excuse card
    your_excuse: "Tu excusa",
    copy: "Copiar",
    copied: "¡Copiado!",
    save: "Guardar",
    saved: "Guardado",

    // Favorites list
    favorites_title: "Excusas Favoritas",
    favorites_empty_title: "Sin favoritas todavía",
    favorites_empty_desc: "Genera excusas y guarda las mejores aquí.",
    clear_all: "Borrar todo",

    // Toast messages
    toast_copied: "¡Copiado al portapapeles!",
    toast_saved: "¡Guardado en favoritas!",
    toast_removed: "Eliminado de favoritas",
    toast_cleared: "Todas las favoritas borradas",
    toast_error_desc: "Verifica tu API key e intenta de nuevo.",

    // Footer
    footer:
      "Desarrollado con Next.js 14 · TailwindCSS · OpenAI GPT-4.1-mini",

    // Language toggle
    lang_toggle_label: "Cambiar a inglés",
  },
} as const;

// Type helper: all valid translation keys
export type TranslationKey = keyof (typeof translations)["en"];

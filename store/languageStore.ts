import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, LanguageState } from '@/types/terminal';

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en' as Language,
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'hacker-terminal-language',
    }
  )
);

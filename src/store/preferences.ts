import { create } from "zustand";
import type { Language } from "../app/catalog";
export const usePreferences = create<{
  language: Language;
  toggleLanguage: () => void;
}>((set) => ({
  language: "zh",
  toggleLanguage: () =>
    set((s) => ({ language: s.language === "zh" ? "en" : "zh" })),
}));

// store/useThemeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () =>
        set((s) => {
          const next = !s.isDark;
          document.documentElement.classList.toggle("dark", next); // ← applies Tailwind dark class
          return { isDark: next };
        }),
    }),
    { name: "finflow-theme" }
  )
);
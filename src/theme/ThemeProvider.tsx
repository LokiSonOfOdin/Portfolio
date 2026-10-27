import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./theme-context";
import type { Theme } from "./theme-context";

const STORAGE_KEY = "portfolio-theme";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  // Применяем тему к документу, чтобы CSS-переменные переключились.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage может быть недоступен (приватный режим) — не критично.
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

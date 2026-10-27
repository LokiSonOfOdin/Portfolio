import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/theme-context";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      title={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
    >
      <Sun size={18} className={styles.sunIcon} aria-hidden="true" />
      <Moon size={18} className={styles.moonIcon} aria-hidden="true" />
    </button>
  );
}

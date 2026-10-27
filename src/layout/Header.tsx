import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

const navItems = [
  { to: "/", label: "Главная" },
  { to: "/projects", label: "Проекты" },
  { to: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="На главную">
          <span className={styles.brandMark}>
            <img src="/logo.svg" alt="" width={40} height={40} />
          </span>
          <span className={styles.brandText}>
            Ганиев <span className={styles.brandAccent}>Рустем</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileNav} aria-label="Мобильная навигация">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${
                  isActive ? styles.mobileNavLinkActive : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

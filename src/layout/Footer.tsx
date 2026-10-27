import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <strong className={styles.brand}>Ганиев Рустем</strong>
          <span className={styles.tagline}>
            Фронтенд-разработчик · React · TypeScript · Node.js
          </span>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале">
          <Link to="/">Главная</Link>
          <Link to="/projects">Проекты</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>

        <span className={styles.copy}>
          Сделано с <Heart size={13} className={styles.heart} /> на React
        </span>
      </div>
    </footer>
  );
}

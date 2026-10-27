import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";
import DashboardView from "../components/analytics/DashboardView";
import styles from "./AnalyticsPage.module.css";

const tech = ["React", "TypeScript", "Recharts", "CSS Modules"];

export default function AnalyticsPage() {
  return (
    <div className={`page ${styles.page}`}>
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeft size={15} />
        Назад к проектам
      </Link>

      <header className={styles.header}>
        <span className={styles.badge}>
          <BarChart3 size={14} />
          Проект из портфолио
        </span>

        <h1 className={styles.title}>
          Аналитическая <span className="gradientText">панель</span>
        </h1>

        <p className={styles.lead}>
          Интерфейс аналитики с визуализацией данных, фильтрами и таблицами.
          Адаптивная сетка от мобильных до широких экранов, интерактивные
          графики и понятные метрики.
        </p>

        <div className={styles.tech}>
          {tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </header>

      <DashboardView />
    </div>
  );
}

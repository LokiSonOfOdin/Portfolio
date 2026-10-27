import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Image,
  MessageSquare,
  PanelsTopLeft,
  ShoppingBag,
} from "lucide-react";
import type { Project } from "../data/projects";
import styles from "./ProjectCard.module.css";

const iconMap = {
  image: Image,
  dashboard: BarChart3,
  shop: ShoppingBag,
  chat: MessageSquare,
  portfolio: PanelsTopLeft,
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = iconMap[project.icon];
  const isReady = project.status === "ready";

  return (
    <article
      className={`${styles.card} ${isReady ? styles.cardReady : ""}`}
    >
      <header className={styles.header}>
        <span className={styles.icon}>
          <Icon size={22} />
        </span>

        <div className={styles.heading}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </div>

        <span
          className={`${styles.badge} ${
            isReady ? styles.badgeReady : styles.badgeSoon
          }`}
        >
          {isReady ? "Готово" : "Скоро"}
        </span>
      </header>

      <p className={styles.description}>{project.description}</p>

      <ul className={styles.features}>
        {project.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <span className={styles.check}>
              <Check size={12} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className={styles.tech}>
        {project.tech.map((item) => (
          <span key={item} className={styles.chip}>
            {item}
          </span>
        ))}
      </div>

      <footer className={styles.actions}>
        {project.href ? (
          <Link to={project.href} className={`${styles.btn} ${styles.btnPrimary}`}>
            Открыть и протестировать
            <ArrowUpRight size={16} />
          </Link>
        ) : !isReady ? (
          <span className={`${styles.btn} ${styles.btnDisabled}`}>
            Скоро в портфолио
          </span>
        ) : null}

        {project.current && (
          <span className={styles.current}>
            <span className={styles.currentDot} />
            Вы сейчас здесь
          </span>
        )}
      </footer>
    </article>
  );
}

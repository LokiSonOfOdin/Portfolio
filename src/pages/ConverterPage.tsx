import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import ConverterView from "../components/converter/ConverterView";
import styles from "./ConverterPage.module.css";

const tech = ["React 19", "TypeScript", "Vite", "@jsquash", "JSZip"];

export default function ConverterPage() {
  return (
    <div className={`page ${styles.page}`}>
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeft size={15} />
        Назад к проектам
      </Link>

      <header className={styles.header}>
        <span className={styles.badge}>
          <ShieldCheck size={14} />
          Проект из портфолио
        </span>

        <h1 className={styles.title}>
          WebP / AVIF <span className="gradientText">Конвертер</span>
        </h1>

        <p className={styles.lead}>
          Клиентский конвертер изображений: загрузите файлы, выберите формат и
          качество сжатия, сравните результат и скачайте всё одним архивом.
          Всё считается прямо в браузере — файлы никуда не отправляются.
        </p>

        <div className={styles.tech}>
          {tech.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </header>

      <ConverterView />
    </div>
  );
}

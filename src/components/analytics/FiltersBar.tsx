import { Calendar, Filter, SlidersHorizontal } from "lucide-react";
import styles from "./FiltersBar.module.css";

type FiltersBarProps = {
  period: string;
  onPeriodChange: (value: string) => void;
};

const periods = ["7 дней", "30 дней", "90 дней", "Квартал"];

export default function FiltersBar({ period, onPeriodChange }: FiltersBarProps) {
  return (
    <section className={styles.bar}>
      <div className={styles.group}>
        <Calendar size={16} />
        <span className={styles.label}>Период</span>
        <div className={styles.pills}>
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              className={`${styles.pill} ${period === item ? styles.pillActive : ""}`}
              onClick={() => onPeriodChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.action}>
          <Filter size={16} />
          Фильтры
        </button>
        <button type="button" className={styles.action}>
          <SlidersHorizontal size={16} />
          Сегменты
        </button>
      </div>
    </section>
  );
}

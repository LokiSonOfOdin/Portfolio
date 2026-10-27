import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { kpi } from "./mockData";
import styles from "./KpiCards.module.css";

export default function KpiCards() {
  return (
    <section className={styles.grid}>
      {kpi.map((item) => (
        <article key={item.label} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.label}>{item.label}</span>
            <span className={`${styles.delta} ${item.up ? styles.deltaUp : styles.deltaDown}`}>
              {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {item.delta}
            </span>
          </div>
          <div className={styles.value}>{item.value}</div>
          <div className={styles.spark} aria-hidden="true">
            <span className={styles.sparkLine} />
          </div>
        </article>
      ))}
    </section>
  );
}

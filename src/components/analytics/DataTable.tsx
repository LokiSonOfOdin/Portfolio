import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { table } from "./mockData";
import styles from "./DataTable.module.css";

export default function DataTable() {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.title}>Топ страниц</h3>
          <p className={styles.subtitle}>Посещения, пользователи, конверсии</p>
        </div>
        <span className={styles.meta}>Показано за 7 дней</span>
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Страница</th>
              <th>Посещения</th>
              <th>Пользователи</th>
              <th>Конверсии</th>
              <th>CR</th>
              <th>Тренд</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.name}>
                <td className={styles.page}>{row.name}</td>
                <td>{row.visits.toLocaleString("ru-RU")}</td>
                <td>{row.users.toLocaleString("ru-RU")}</td>
                <td>{row.conv.toLocaleString("ru-RU")}</td>
                <td className={styles.rate}>{row.rate.toFixed(2)}%</td>
                <td>
                  <span
                    className={`${styles.trend} ${
                      row.status === "up"
                        ? styles.trendUp
                        : row.status === "down"
                        ? styles.trendDown
                        : styles.trendStable
                    }`}
                  >
                    {row.status === "up" ? <ArrowUpRight size={14} /> : row.status === "down" ? <ArrowDownRight size={14} /> : null}
                    {row.status === "up" ? "+8%" : row.status === "down" ? "-4%" : "0%"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { channels, devices, trend } from "./mockData";
import styles from "./Charts.module.css";

const tooltipStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  color: "var(--text)",
  boxShadow: "var(--shadow-sm)",
};

const colors = ["var(--primary)", "#22d3ee", "#f59e0b"];

export default function Charts() {
  return (
    <section className={styles.grid}>
      <article className={`${styles.card} ${styles.cardWide}`}>
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>Динамика трафика</h3>
            <p className={styles.subtitle}>Посетители и пользователи за неделю</p>
          </div>
          <span className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.dot} /> Посетители
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotMuted}`} /> Пользователи
            </span>
          </span>
        </header>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.26} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--primary-border)" }} />
              <Area type="monotone" dataKey="visits" stroke="var(--primary)" strokeWidth={2} fill="url(#visits)" />
              <Area type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={2} fill="url(#users)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={styles.card}>
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>По каналам</h3>
            <p className={styles.subtitle}>Распределение источников</p>
          </div>
        </header>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channels} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--primary-soft)" }} />
              <Bar dataKey="organic" stackId="a" fill="var(--primary)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="ads" stackId="a" fill="#22d3ee" radius={[0, 0, 0, 0]} />
              <Bar dataKey="direct" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={`${styles.card} ${styles.cardCenter}`}>
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>Устройства</h3>
            <p className={styles.subtitle}>Доля по типу устройства</p>
          </div>
        </header>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={devices}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={4}
              >
                {devices.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.legendBottom}>
          {devices.map((item, index) => (
            <div key={item.name} className={styles.legendItem}>
              <span className={styles.dot} style={{ background: colors[index % colors.length] }} />
              {item.name} — {item.value}%
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

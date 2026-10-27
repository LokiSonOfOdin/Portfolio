import { useState } from "react";
import FiltersBar from "./FiltersBar";
import KpiCards from "./KpiCards";
import Charts from "./Charts";
import DataTable from "./DataTable";
import styles from "./DashboardView.module.css";

export default function DashboardView() {
  const [period, setPeriod] = useState("7 дней");

  return (
    <div className={styles.view}>
      <FiltersBar period={period} onPeriodChange={setPeriod} />
      <KpiCards />
      <Charts />
      <DataTable />
    </div>
  );
}

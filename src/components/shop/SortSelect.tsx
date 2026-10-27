import type { SortOption } from "../../types/shop";
import styles from "./SortSelect.module.css";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "name-asc", label: "По названию А-Я" },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className={styles.sort}>
      <span className={styles.label}>Сортировка</span>
      <select value={value} onChange={(e) => onChange(e.target.value as SortOption)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

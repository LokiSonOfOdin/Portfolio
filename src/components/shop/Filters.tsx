import { SlidersHorizontal } from "lucide-react";
import type { ProductBrand, ProductCategory } from "../../types/shop";
import { brands, categories } from "../../data/shop/categories";
import styles from "./Filters.module.css";

interface FiltersProps {
  selectedCategories: ProductCategory[];
  selectedBrands: ProductBrand[];
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  onToggleCategory: (category: ProductCategory) => void;
  onToggleBrand: (brand: ProductBrand) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onInStockChange: (value: boolean) => void;
  onReset: () => void;
}

export default function Filters({
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  inStockOnly,
  onToggleCategory,
  onToggleBrand,
  onMinPriceChange,
  onMaxPriceChange,
  onInStockChange,
  onReset,
}: FiltersProps) {
  return (
    <aside className={styles.filters}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <SlidersHorizontal size={18} />
          <span>Фильтры</span>
        </div>
        <button className={styles.reset} onClick={onReset}>
          Сбросить
        </button>
      </header>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Категория</h3>
        <div className={styles.checkList}>
          {categories.map((category) => {
            const active = selectedCategories.includes(category.id);
            return (
              <label key={category.id} className={`${styles.checkItem} ${active ? styles.active : ""}`}>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggleCategory(category.id)}
                />
                <span>{category.name}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Бренд</h3>
        <div className={styles.checkList}>
          {brands.map((brand) => {
            const active = selectedBrands.includes(brand.id);
            return (
              <label key={brand.id} className={`${styles.checkItem} ${active ? styles.active : ""}`}>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggleBrand(brand.id)}
                />
                <span>{brand.name}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Цена, ₽</h3>
        <div className={styles.priceRow}>
          <input
            type="number"
            placeholder="от"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            min={0}
          />
          <span className={styles.priceDash}>—</span>
          <input
            type="number"
            placeholder="до"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            min={0}
          />
        </div>
      </section>

      <section className={styles.section}>
        <label className={`${styles.checkItem} ${inStockOnly ? styles.active : ""}`}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
          />
          <span>Только в наличии</span>
        </label>
      </section>
    </aside>
  );
}

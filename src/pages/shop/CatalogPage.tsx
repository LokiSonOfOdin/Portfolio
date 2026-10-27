import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products } from "../../data/shop/products";
import type { ProductBrand, ProductCategory, SortOption } from "../../types/shop";
import Filters from "../../components/shop/Filters";
import SortSelect from "../../components/shop/SortSelect";
import ProductCard from "../../components/shop/ProductCard";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<ProductBrand[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("popular");

  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: ProductBrand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setSort("popular");
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategories.length) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedBrands.length) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    if (min !== null && !Number.isNaN(min)) {
      result = result.filter((product) => product.price >= min);
    }
    if (max !== null && !Number.isNaN(max)) {
      result = result.filter((product) => product.price <= max);
    }

    if (inStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    result.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return b.rating - a.rating;
    });

    return result;
  }, [search, selectedCategories, selectedBrands, minPrice, maxPrice, inStockOnly, sort]);

  return (
    <div className={styles.catalog}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Каталог <span className="gradientText">товаров</span>
          </h1>
          <p className={styles.lead}>
            Фильтры, сортировка, карточка товара и корзина. Найдите подходящую технику
          </p>
        </div>
        <div className={styles.searchWrap}>
          <Search size={18} />
          <input
            type="search"
            placeholder="Поиск по названию, тегам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.layout}>
        <Filters
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStockOnly={inStockOnly}
          onToggleCategory={toggleCategory}
          onToggleBrand={toggleBrand}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onInStockChange={setInStockOnly}
          onReset={resetFilters}
        />
        <section className={styles.content}>
          <div className={styles.toolbar}>
            <p className={styles.count}>Найдено: {filtered.length} товаров</p>
            <SortSelect value={sort} onChange={setSort} />
          </div>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <h2>Ничего не найдено</h2>
              <p>Попробуйте изменить фильтры или сбросить их</p>
              <button className="btn btnGhost" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

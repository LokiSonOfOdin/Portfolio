import { Link } from "react-router-dom";
import { ArrowRight, Filter, ShoppingCart, Truck } from "lucide-react";
import { products } from "../../data/shop/products";
import ProductCard from "../../components/shop/ProductCard";
import styles from "./ShopHomePage.module.css";

export default function ShopHomePage() {
  const featured = products.slice(0, 6);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Тестовый интернет-магазин
          </span>
          <h1 className={styles.heroTitle}>
            Электроника с <span className="gradientText">холодным циановым</span> акцентом
          </h1>
          <p className={styles.heroLead}>
            Каталог с фильтрами и сортировкой, карточка товара, корзина, имитирующий выбор курьера/ПВЗ и тестовая оплата картой. Всё работает прямо в браузере.
          </p>
          <div className={styles.heroActions}>
            <Link to="/projects/shop/catalog" className="btn btnPrimary">
              Перейти в каталог
              <ArrowRight size={18} />
            </Link>
            <Link to="/projects/shop/cart" className="btn btnGhost">
              <ShoppingCart size={18} />
              Корзина
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <strong>{products.length}</strong>
              <span>товаров</span>
            </div>
            <div className={styles.stat}>
              <strong>Фильтры</strong>
              <span>по категориям и брендам</span>
            </div>
            <div className={styles.stat}>
              <strong>Тестовая оплата</strong>
              <span>без отправки данных</span>
            </div>
          </div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroCardHeader}>
            <span>Быстрый путь покупателя</span>
          </div>
          <ul className={styles.heroList}>
            <li>
              <Filter size={18} />
              <div>
                <strong>Найди</strong>
                <p>Фильтры и сортировка в каталоге</p>
              </div>
            </li>
            <li>
              <ShoppingCart size={18} />
              <div>
                <strong>Собери</strong>
                <p>Удобная корзина с пересчётом</p>
              </div>
            </li>
            <li>
              <Truck size={18} />
              <div>
                <strong>Оформи</strong>
                <p>Курьер или ПВЗ, тестовая оплата картой</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.featured}>
        <header className={styles.featuredHeader}>
          <div>
            <h2 className={styles.sectionTitle}>
              Популярные <span className="gradientText">товары</span>
            </h2>
            <p className={styles.sectionLead}>Несколько позиций для демонстрации каталога</p>
          </div>
          <Link to="/projects/shop/catalog" className={styles.allLink}>
            Весь каталог
            <ArrowRight size={16} />
          </Link>
        </header>
        <div className={styles.grid}>
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

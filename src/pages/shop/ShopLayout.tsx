import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";
import { useShopStore } from "../../store/useShopStore";
import "../../styles/shop-theme.css";
import styles from "./ShopLayout.module.css";

export default function ShopLayout() {
  const cartCount = useShopStore((state) => state.getCartCount());
  const [bump, setBump] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setBump(true);
      const timeout = setTimeout(() => setBump(false), 420);
      prevCount.current = cartCount;
      return () => clearTimeout(timeout);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  return (
    <div className={`shop ${styles.shop}`}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.headerLeft}>
            <Link to="/projects/shop" className={styles.backLink}>
              <Home size={18} />
              На главную магазина
            </Link>
            <Link to="/projects/shop" className={styles.logo}>
              <ShoppingBag size={20} />
              <span className="gradientText">CyanStore</span>
            </Link>
          </div>
          <nav className={styles.nav}>
            <Link to="/projects/shop" className={styles.navLink}>
              Главная
            </Link>
            <Link to="/projects/shop/cart" className={`${styles.cartLink} ${bump ? styles.cartBump : ""}`}>
              <ShoppingBag size={18} className={bump ? styles.cartIconBump : ""} />
              Корзина
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </header>

      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p>Тестовый интернет-магазин • CyanStore</p>
          <p className={styles.footerMuted}>Рабочая тестовая версия с имитацией оплаты</p>
        </div>
      </footer>
    </div>
  );
}

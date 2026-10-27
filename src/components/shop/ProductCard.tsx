import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "../../types/shop";
import { useShopStore } from "../../store/useShopStore";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useShopStore((state) => state.addToCart);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 380);
  };

  return (
    <article className={styles.card}>
      <Link to={`/projects/shop/product/${product.id}`} className={styles.imageLink}>
        <img src={product.images[0]} alt={product.name} className={styles.image} />
        {discount && <span className={styles.discount}>-{discount}%</span>}
        {!product.inStock && <span className={styles.outOfStock}>Нет в наличии</span>}
      </Link>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" />
            <span>{product.rating}</span>
            <span className={styles.reviews}>({product.reviewsCount})</span>
          </div>
        </div>
        <Link to={`/projects/shop/product/${product.id}`} className={styles.title}>
          {product.name}
        </Link>
        <p className={styles.short}>{product.shortDescription}</p>
        <div className={styles.priceRow}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>{product.price.toLocaleString("ru-RU")} ₽</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
            )}
          </div>
          <button
            className={`${styles.cartBtn} ${added ? styles.cartBtnAdded : ""}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
            {product.inStock ? "В корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>
    </article>
  );
}

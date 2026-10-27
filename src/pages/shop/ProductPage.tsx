import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { getProductById, products } from "../../data/shop/products";
import { useShopStore } from "../../store/useShopStore";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const addToCart = useShopStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Товар не найден</h1>
        <p>Возможно, ссылка устарела или товар был удалён</p>
        <Link to="/projects/shop/catalog" className="btn btnPrimary">
          <ArrowLeft size={18} />
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 420);
  };

  return (
    <div className={styles.product}>
      <nav className={styles.breadcrumbs}>
        <Link to="/projects/shop">Главная</Link>
        <span>/</span>
        <Link to="/projects/shop/catalog">Каталог</Link>
        <span>/</span>
        <span className={styles.current}>{product.name}</span>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrap}>
            <img src={product.images[activeImage]} alt={product.name} className={styles.mainImage} />
            {discount && <span className={styles.discount}>-{discount}%</span>}
          </div>
          {product.images.length > 1 && (
            <div className={styles.thumbs}>
              {product.images.map((image, index) => (
                <button
                  key={image}
                  className={`${styles.thumb} ${index === activeImage ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <header className={styles.infoHeader}>
            <div className={styles.brandRow}>
              <span className={styles.brand}>{product.brand}</span>
              <span className={styles.category}>{product.category}</span>
            </div>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.ratingRow}>
              <div className={styles.rating}>
                <Star size={16} fill="currentColor" />
                <span>{product.rating}</span>
              </div>
              <span className={styles.reviews}>{product.reviewsCount} отзывов</span>
              <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </span>
            </div>
            <p className={styles.short}>{product.shortDescription}</p>
          </header>

          <div className={styles.priceCard}>
            <div className={styles.priceGroup}>
              <span className={styles.price}>{product.price.toLocaleString("ru-RU")} ₽</span>
              {product.oldPrice && (
                <span className={styles.oldPrice}>{product.oldPrice.toLocaleString("ru-RU")} ₽</span>
              )}
            </div>
            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className={`btn btnPrimary ${added ? styles.addBtnAdded : ""}`} onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart size={18} className={added ? styles.addBtnIcon : ""} />
                {product.inStock ? "Добавить в корзину" : "Нет в наличии"}
              </button>
            </div>
            <div className={styles.deliveryNote}>
              <Truck size={18} />
              <span>Курьер или самовывоз из ПВЗ при оформлении заказа</span>
            </div>
          </div>

          <section className={styles.description}>
            <h2 className={styles.sectionTitle}>Описание</h2>
            <p>{product.description}</p>
          </section>

          <section className={styles.specs}>
            <h2 className={styles.sectionTitle}>Характеристики</h2>
            <div className={styles.specGrid}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className={styles.specRow}>
                  <span className={styles.specKey}>{key}</span>
                  <span className={styles.specValue}>{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related}>
          <header className={styles.relatedHeader}>
            <h2 className={styles.sectionTitle}>Похожие товары</h2>
            <Link to="/projects/shop/catalog">Смотреть все</Link>
          </header>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.id} to={`/projects/shop/product/${item.id}`} className={styles.relatedCard}>
                <img src={item.images[0]} alt={item.name} />
                <div>
                  <p className={styles.relatedName}>{item.name}</p>
                  <p className={styles.relatedPrice}>{item.price.toLocaleString("ru-RU")} ₽</p>
                </div>
                <Check size={16} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

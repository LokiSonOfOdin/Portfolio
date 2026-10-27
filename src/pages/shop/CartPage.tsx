import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useShopStore } from "../../store/useShopStore";
import { products } from "../../data/shop/products";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const increaseQuantity = useShopStore((state) => state.increaseQuantity);
  const decreaseQuantity = useShopStore((state) => state.decreaseQuantity);

  const items = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter(Boolean) as { product: (typeof products)[number]; quantity: number }[];

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 490 : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <ShoppingBag size={48} />
        <h1>Корзина пуста</h1>
        <p>Добавьте товары из каталога, чтобы оформить заказ</p>
        <Link to="/projects/shop/catalog" className="btn btnPrimary">
          <span>Перейти в каталог</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Корзина <span className="gradientText">товаров</span>
          </h1>
          <p className={styles.lead}>{items.length} позиций в корзине</p>
        </div>
        <Link to="/projects/shop/catalog" className={styles.continue}>
          <ArrowLeft size={16} />
          Продолжить покупки
        </Link>
      </header>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map(({ product, quantity }) => (
            <article key={product.id} className={styles.item}>
              <Link to={`/projects/shop/product/${product.id}`} className={styles.itemImage}>
                <img src={product.images[0]} alt={product.name} />
              </Link>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <div>
                    <Link to={`/projects/shop/product/${product.id}`} className={styles.itemTitle}>
                      {product.name}
                    </Link>
                    <p className={styles.itemMeta}>
                      {product.brand} • {product.category}
                    </p>
                  </div>
                  <button className={styles.remove} onClick={() => removeFromCart(product.id)}>
                    <Trash2 size={18} />
                    Удалить
                  </button>
                </div>
                <div className={styles.itemFooter}>
                  <div className={styles.quantity}>
                    <button onClick={() => decreaseQuantity(product.id)}>
                      <Minus size={16} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className={styles.itemPrice}>
                    <span className={styles.price}>
                      {(product.price * quantity).toLocaleString("ru-RU")} ₽
                    </span>
                    {quantity > 1 && (
                      <span className={styles.unitPrice}>
                        {product.price.toLocaleString("ru-RU")} ₽ за шт.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Итого</h2>
          <div className={styles.summaryRow}>
            <span>Сумма товаров</span>
            <span>{subtotal.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка</span>
            <span>{delivery.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryTotal}>
            <span>К оплате</span>
            <span>{total.toLocaleString("ru-RU")} ₽</span>
          </div>
          <Link to="/projects/shop/checkout" className="btn btnPrimary" style={{ width: "100%" }}>
            Перейти к оформлению
          </Link>
          <p className={styles.summaryNote}>Доставка рассчитывается как тестовая ставка при оформлении</p>
        </aside>
      </div>
    </div>
  );
}

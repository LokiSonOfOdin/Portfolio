import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import styles from "./CheckoutSuccessPage.module.css";

export default function CheckoutSuccessPage() {
  const location = useLocation();
  const orderNumber = (location.state as { orderNumber?: string } | null)?.orderNumber ?? "CYN-XXXXXXX";

  return (
    <div className={styles.success}>
      <div className={styles.card}>
        <CheckCircle size={56} />
        <h1>Заказ успешно оформлен</h1>
        <p>Спасибо за покупку! Это тестовый заказ в демо-версии интернет-магазина.</p>
        <div className={styles.order}>
          <span>Номер заказа</span>
          <strong>{orderNumber}</strong>
        </div>
        <div className={styles.actions}>
          <Link to="/projects/shop" className="btn btnPrimary">
            <Home size={18} />
            На главную магазина
          </Link>
          <Link to="/projects/shop/catalog" className="btn btnGhost">
            <ShoppingBag size={18} />
            В каталог
          </Link>
        </div>
        <p className={styles.note}>Оплата имитирована. Данные карты не сохранялись.</p>
      </div>
    </div>
  );
}

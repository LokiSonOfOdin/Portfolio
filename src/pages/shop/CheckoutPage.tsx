import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { useShopStore } from "../../store/useShopStore";
import { products } from "../../data/shop/products";
import { pickupPoints } from "../../data/shop/categories";
import styles from "./CheckoutPage.module.css";

type FormErrors = Record<string, string>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useShopStore((state) => state.cart);
  const deliveryMethod = useShopStore((state) => state.deliveryMethod);
  const paymentMethod = useShopStore((state) => state.paymentMethod);
  const setDeliveryMethod = useShopStore((state) => state.setDeliveryMethod);
  const setPaymentMethod = useShopStore((state) => state.setPaymentMethod);
  const clearCart = useShopStore((state) => state.clearCart);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    pickupPoint: pickupPoints[0],
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const items = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter(Boolean) as { product: (typeof products)[number]; quantity: number }[];

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = items.length > 0 ? 490 : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Нет товаров для оформления</h1>
        <p>Добавьте товары в корзину и вернитесь к оформлению</p>
        <Link to="/projects/shop/catalog" className="btn btnPrimary">
          <ArrowLeft size={18} />
          В каталог
        </Link>
      </div>
    );
  }

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "Укажите имя";
    if (!form.lastName.trim()) newErrors.lastName = "Укажите фамилию";
    if (!/^\+?\d{10,12}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Укажите телефон в формате +7XXXXXXXXXX";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Укажите корректный e-mail";
    }
    if (deliveryMethod === "courier" && form.address.trim().length < 5) {
      newErrors.address = "Укажите адрес доставки";
    }
    if (paymentMethod === "card") {
      const cardDigits = form.cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cardDigits)) newErrors.cardNumber = "Укажите 16 цифр карты";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry)) newErrors.cardExpiry = "Формат MM/YY";
      if (!/^\d{3}$/.test(form.cardCvc)) newErrors.cardCvc = "Укажите 3 цифры CVC";
      if (form.cardName.trim().length < 3) newErrors.cardName = "Укажите имя держателя";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsProcessing(false);

    const orderNumber = `CYN-${Date.now().toString().slice(-8)}`;
    clearCart();
    navigate("/projects/shop/checkout/success", { state: { orderNumber } });
  };

  return (
    <div className={styles.checkout}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Оформление <span className="gradientText">заказа</span>
          </h1>
          <p className={styles.lead}>Тестовое оформление с имитацией оплаты картой</p>
        </div>
        <Link to="/projects/shop/cart" className={styles.back}>
          <ArrowLeft size={16} />
          Вернуться в корзину
        </Link>
      </header>

      <form className={styles.layout} onSubmit={handleSubmit}>
        <div className={styles.main}>
          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2>Контактные данные</h2>
            </header>
            <div className={styles.grid}>
              <label className={styles.field}>
                <span>Имя</span>
                <input
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Иван"
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </label>
              <label className={styles.field}>
                <span>Фамилия</span>
                <input
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Иванов"
                />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              </label>
              <label className={styles.field}>
                <span>Телефон</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7XXXXXXXXXX"
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </label>
              <label className={styles.field}>
                <span>E-mail</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="mail@example.ru"
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2>Доставка</h2>
              <p>Имитирующий выбор курьера или ПВЗ</p>
            </header>
            <div className={styles.methodGroup}>
              <button
                type="button"
                className={`${styles.methodCard} ${deliveryMethod === "courier" ? styles.methodActive : ""}`}
                onClick={() => setDeliveryMethod("courier")}
              >
                <Truck size={20} />
                <div>
                  <strong>Курьером</strong>
                  <p>Доставка по адресу</p>
                </div>
              </button>
              <button
                type="button"
                className={`${styles.methodCard} ${deliveryMethod === "pickup" ? styles.methodActive : ""}`}
                onClick={() => setDeliveryMethod("pickup")}
              >
                <MapPin size={20} />
                <div>
                  <strong>Самовывоз из ПВЗ</strong>
                  <p>Бесплатный, тестовый пункт выдачи</p>
                </div>
              </button>
            </div>
            {deliveryMethod === "courier" ? (
              <label className={styles.field}>
                <span>Адрес доставки</span>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Город, улица, дом, квартира"
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </label>
            ) : (
              <label className={styles.field}>
                <span>Пункт выдачи</span>
                <select
                  value={form.pickupPoint}
                  onChange={(e) => setForm({ ...form, pickupPoint: e.target.value })}
                >
                  {pickupPoints.map((point) => (
                    <option key={point} value={point}>
                      {point}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </section>

          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2>Оплата</h2>
              <p>Тестовая пустышка: данные не собираются и не отправляются</p>
            </header>
            <div className={styles.methodGroup}>
              <button
                type="button"
                className={`${styles.methodCard} ${paymentMethod === "card" ? styles.methodActive : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={20} />
                <div>
                  <strong>Тестовая оплата картой</strong>
                  <p>Имитация оплаты без реального списания</p>
                </div>
              </button>
              <button
                type="button"
                className={`${styles.methodCard} ${paymentMethod === "cash" ? styles.methodActive : ""}`}
                onClick={() => setPaymentMethod("cash")}
              >
                <span className={styles.cashIcon}>₽</span>
                <div>
                  <strong>Оплата при получении</strong>
                  <p>Наличными или картой при получении</p>
                </div>
              </button>
            </div>
            {paymentMethod === "card" && (
              <div className={styles.cardForm}>
                <label className={styles.field}>
                  <span>Номер карты</span>
                  <input
                    value={form.cardNumber}
                    onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })}
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                  />
                  {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
                </label>
                <div className={styles.cardRow}>
                  <label className={styles.field}>
                    <span>Срок действия</span>
                    <input
                      value={form.cardExpiry}
                      onChange={(e) => setForm({ ...form, cardExpiry: formatExpiry(e.target.value) })}
                      placeholder="MM/YY"
                      inputMode="numeric"
                    />
                    {errors.cardExpiry && <span className={styles.error}>{errors.cardExpiry}</span>}
                  </label>
                  <label className={styles.field}>
                    <span>CVC/CVV</span>
                    <input
                      value={form.cardCvc}
                      onChange={(e) =>
                        setForm({ ...form, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 3) })
                      }
                      placeholder="123"
                      inputMode="numeric"
                      type="password"
                    />
                    {errors.cardCvc && <span className={styles.error}>{errors.cardCvc}</span>}
                  </label>
                </div>
                <label className={styles.field}>
                  <span>Имя держателя карты</span>
                  <input
                    value={form.cardName}
                    onChange={(e) => setForm({ ...form, cardName: e.target.value.toUpperCase() })}
                    placeholder="IVAN IVANOV"
                  />
                  {errors.cardName && <span className={styles.error}>{errors.cardName}</span>}
                </label>
                <p className={styles.cardNote}>
                  Это тестовая форма. Никакие данные карты не сохраняются и не передаются.
                </p>
              </div>
            )}
          </section>
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Ваш заказ</h2>
          <div className={styles.summaryItems}>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.summaryItem}>
                <div>
                  <p className={styles.summaryItemName}>{product.name}</p>
                  <p className={styles.summaryItemMeta}>
                    {quantity} шт. • {product.price.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <span className={styles.summaryItemPrice}>
                  {(product.price * quantity).toLocaleString("ru-RU")} ₽
                </span>
              </div>
            ))}
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryRow}>
            <span>Сумма</span>
            <span>{subtotal.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Доставка</span>
            <span>{delivery.toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.summaryTotal}>
            <span>Итого</span>
            <span>{total.toLocaleString("ru-RU")} ₽</span>
          </div>
          <button className="btn btnPrimary" style={{ width: "100%" }} disabled={isProcessing}>
            {isProcessing
              ? "Обработка оплаты..."
              : paymentMethod === "card"
              ? "Оплатить тестовой картой"
              : "Подтвердить заказ"}
          </button>
          <p className={styles.summaryNote}>Нажимая кнопку, вы соглашаетесь с условиями тестового заказа</p>
        </aside>
      </form>
    </div>
  );
}

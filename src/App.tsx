import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ScrollToTop from "./layout/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./App.module.css";

// Конвертер грузится лениво: тяжёлые WASM-модули не попадают в стартовый бандл.
const ConverterPage = lazy(() => import("./pages/ConverterPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const ShopLayout = lazy(() => import("./pages/shop/ShopLayout"));
const ShopHomePage = lazy(() => import("./pages/shop/ShopHomePage"));
const CatalogPage = lazy(() => import("./pages/shop/CatalogPage"));
const ProductPage = lazy(() => import("./pages/shop/ProductPage"));
const CartPage = lazy(() => import("./pages/shop/CartPage"));
const CheckoutPage = lazy(() => import("./pages/shop/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("./pages/shop/CheckoutSuccessPage"));

function PageLoader() {
  return (
    <div className={styles.loader}>
      <LoaderCircle className={styles.spinner} size={28} />
      <span>Загрузка…</span>
    </div>
  );
}

export default function App() {
  return (
    <div className={styles.app}>
      <ScrollToTop />
      <Header />

      <main className={`container ${styles.appMain}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/converter" element={<ConverterPage />} />
            <Route path="/projects/analytics" element={<AnalyticsPage />} />
            <Route path="/projects/shop" element={<ShopLayout />}>
              <Route index element={<ShopHomePage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout/success" element={<CheckoutSuccessPage />} />
            </Route>
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

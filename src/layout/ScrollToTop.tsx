import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Скроллим страницу наверх при смене маршрута. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

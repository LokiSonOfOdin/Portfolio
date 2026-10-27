export type ProjectStatus = "ready" | "soon";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  status: ProjectStatus;
  /** Внутренний маршрут приложения, если проект можно открыть здесь. */
  href?: string;
  /** Отметка для проекта, на странице которого находится посетитель. */
  current?: boolean;
  icon: "image" | "dashboard" | "shop" | "chat" | "portfolio";
  year: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Сайт-визитка",
    subtitle: "Этот сайт: портфолио на React и TypeScript",
    description:
      "Личный сайт-портфолио с главной страницей, проектами и контактами. Тёмная и светлая темы, адаптивная вёрстка, роутинг и ленивая загрузка тяжёлых страниц. Внутри живёт конвертер изображений.",
    tech: ["React 19", "TypeScript", "Vite", "React Router", "CSS Modules"],
    features: [
      "Адаптивная вёрстка и две темы оформления",
      "Роутинг и ленивая загрузка страниц",
      "Встроенный конвертер изображений",
      "Единая дизайн-система на CSS-переменных",
    ],
    status: "ready",
    current: true,
    icon: "portfolio",
    year: "2026",
  },
  {
    id: "image-converter",
    title: "WebP / AVIF Конвертер",
    subtitle: "Обработка изображений прямо в браузере",
    description:
      "Клиентский конвертер изображений в современные форматы WebP и AVIF. Всё вычисления выполняются локально на устройстве — файлы не покидают браузер. Есть настройка качества, сравнение результата «до / после», массовая загрузка и выгрузка результата одним ZIP-архивом.",
    tech: ["React 19", "TypeScript", "Vite", "@jsquash", "JSZip", "CSS Modules"],
    features: [
      "Конвертация в WebP и AVIF с выбором качества",
      "Полностью офлайн: файлы не отправляются на сервер",
      "Наглядное сравнение «до / после» и расчёт экономии",
      "Массовая обработка и скачивание архивом ZIP",
    ],
    status: "ready",
    href: "/projects/converter",
    icon: "image",
    year: "2026",
  },
  {
    id: "analytics-dashboard",
    title: "Аналитическая панель",
    subtitle: "Дашборд с графиками и таблицами",
    description:
      "Интерфейс аналитики с визуализацией данных, фильтрами и таблицами. На проекте показан подход к работе со сложными интерфейсами и адаптивной сеткой.",
    tech: ["React", "TypeScript", "Recharts", "CSS Modules"],
    features: [
      "Графики и интерактивные фильтры",
      "Таблицы с сортировкой и статусами",
      "Адаптивная сетка от мобильных до широких экранов",
    ],
    status: "ready",
    href: "/projects/analytics",
    icon: "dashboard",
    year: "2026",
  },
  {
    id: "ecommerce-landing",
    title: "Интернет-магазин",
    subtitle: "Витрина товаров и корзина",
    description:
      "Собранный интернет-магазин с каталогом, фильтрами, карточкой товара и корзиной. Акцент на скорости загрузки и удобстве пользовательского пути.",
    tech: ["React 19", "TypeScript", "Zustand", "React Router", "CSS Modules"],
    features: [
      "Каталог с фильтрами и сортировкой",
      "Карточка товара и корзина",
      "Полная адаптивность",
      "Курьер/ПВЗ и тестовая оплата картой",
    ],
    status: "ready",
    href: "/projects/shop",
    icon: "shop",
    year: "2026",
  },
  {
    id: "chat-app",
    title: "Чат-приложение",
    subtitle: "Обмен сообщениями в реальном времени",
    description:
      "Мессенджер с реальным временем, оптимистичными обновлениями интерфейса и состояниями загрузки. Планируется выход в продакшен.",
    tech: ["React", "TypeScript", "WebSocket", "CSS Modules"],
    features: [
      "Обмен сообщениями в реальном времени",
      "Индикаторы набора и доставки",
      "Тёмная и светлая темы",
    ],
    status: "soon",
    icon: "chat",
    year: "2025",
  },
];

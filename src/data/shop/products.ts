import type { Product } from "../../types/shop";

export const products: Product[] = [
  {
    id: "tn-aura-5g",
    name: "TechNova Aura 5G",
    slug: "technova-aura-5g",
    category: "телефоны",
    brand: "TechNova",
    price: 49990,
    oldPrice: 54990,
    rating: 4.8,
    reviewsCount: 124,
    inStock: true,
    description: "Флагманский смартфон с ярким OLED-дисплеем, мощным процессором и продвинутой камерной системой. Отличная производительность, длительная автономность и современный дизайн для повседневных задач и игр.",
    shortDescription: "OLED 6.7\", 256 ГБ, тройная камера",
    specs: {
      Экран: "6.7\" OLED, 120 Гц",
      Память: "256 ГБ / 8 ГБ",
      Камера: "108 Мп + 12 Мп + 8 Мп",
      Батарея: "5000 мАч, быстрая зарядка 67 Вт",
      Процессор: "Snapdragon 8 Gen 3",
      ОС: "Android 15"
    },
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"],
    tags: ["5G", "OLED"]
  },
  {
    id: "nb-quantum-x",
    name: "Nebula Quantum X",
    slug: "nebula-quantum-x",
    category: "ноутбуки",
    brand: "Nebula",
    price: 89990,
    oldPrice: 94990,
    rating: 4.9,
    reviewsCount: 86,
    inStock: true,
    description: "Мощный ультрабук для работы и учёбы. Тонкий корпус, яркий IPS-дисплей с высоким разрешением, быстрый процессор и большой объём памяти обеспечивают комфорт при любых задачах.",
    shortDescription: "14\" IPS, Intel Core i7, 16 ГБ",
    specs: {
      Экран: "14\" IPS, 2560x1600, 120 Гц",
      Процессор: "Intel Core i7-13700H",
      Память: "16 ГБ LPDDR5",
      Накопитель: "512 ГБ NVMe SSD",
      Батарея: "76 Вт·ч, до 12 ч",
      Вес: "1.4 кг"
    },
    images: ["https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800"],
    tags: ["ультрабук", "IPS"]
  },
  {
    id: "ar-vibe-pro",
    name: "Aurel Vibe Pro",
    slug: "aurel-vibe-pro",
    category: "наушники",
    brand: "Aurel",
    price: 14990,
    oldPrice: 17990,
    rating: 4.7,
    reviewsCount: 203,
    inStock: true,
    description: "Беспроводные наушники с активным шумоподавлением, чистым и детализированным звуком. Комфортная посадка на длительное время, отличная изоляция от окружающих шумов.",
    shortDescription: "TWS, ANC, до 30 ч работы",
    specs: {
      "Тип": "TWS",
      "Шумоподавление": "Активное (ANC)",
      "Время работы": "до 30 ч с кейсом",
      "Зарядка": "USB-C, быстрая",
      "Микрофон": "с шумоподавлением",
      "Защита": "IPX4"
    },
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"],
    tags: ["TWS", "ANC"]
  },
  {
    id: "or-flow-mini",
    name: "Orbit Flow Mini",
    slug: "orbit-flow-mini",
    category: "наушники",
    brand: "Orbit",
    price: 8990,
    rating: 4.6,
    reviewsCount: 167,
    inStock: true,
    description: "Лёгкие наушники",
    shortDescription: "TWS",
    specs: {
      Тип: "TWS"
    },
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"],
    tags: ["TWS"]
  },
  {
    id: "zx-nex-15",
    name: "Zenix Nex 15",
    slug: "zenix-nex-15",
    category: "телефоны",
    brand: "Zenix",
    price: 32990,
    oldPrice: 36990,
    rating: 4.7,
    reviewsCount: 142,
    inStock: true,
    description: "Стильный смартфон с ярким 90 Гц дисплеем, большим аккумулятором и быстрой зарядкой. Отличный вариант по соотношению цена-качество для повседневного использования.",
    shortDescription: "6.5\" IPS, 128 ГБ, быстрая зарядка",
    specs: {
      Экран: "6.5\" IPS, 90 Гц",
      Память: "128 ГБ / 6 ГБ",
      Камера: "50 Мп + 2 Мп",
      Батарея: "5000 мАч, 33 Вт",
      Процессор: "8-ядерный",
      ОС: "Android 14"
    },
    images: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800"],
    tags: ["смартфон", "90 Гц"]
  },
  {
    id: "nb-slate-air",
    name: "Nebula Slate Air",
    slug: "nebula-slate-air",
    category: "ноутбуки",
    brand: "Nebula",
    price: 69990,
    rating: 4.8,
    reviewsCount: 74,
    inStock: true,
    description: "Лёгкий и тонкий ноутбук для повседневных задач. Долгая автономность, быстрый SSD и комфортная клавиатура делают его идеальным вариантом для учёбы и работы.",
    shortDescription: "13.3\" IPS, Intel Core i5, 8 ГБ",
    specs: {
      Экран: "13.3\" IPS, 1920x1080",
      Процессор: "Intel Core i5-12450H",
      Память: "8 ГБ LPDDR4x",
      Накопитель: "256 ГБ NVMe SSD",
      Батарея: "52 Вт·ч, до 10 ч",
      Вес: "1.2 кг"
    },
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"],
    tags: ["ноутбук", "ультратонкий"]
  },
  {
    id: "tn-magnet-case",
    name: "TechNova Чехол",
    slug: "technova-case",
    category: "аксессуары",
    brand: "TechNova",
    price: 2490,
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    description: "Прочный силиконовый чехол с поддержкой MagSafe. Надёжная защита от царапин и ударов, точные вырезы и мягкая поверхность.",
    shortDescription: "MagSafe, силикон",
    specs: {
      Тип: "чехол",
      Совместимость: "MagSafe",
      Материал: "Силикон"
    },
    images: ["https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=800"],
    tags: ["чехол", "MagSafe"]
  },
  {
    id: "or-cable-usbc",
    name: "Orbit Кабель",
    slug: "orbit-cable",
    category: "аксессуары",
    brand: "Orbit",
    price: 1490,
    rating: 4.8,
    reviewsCount: 428,
    inStock: true,
    description: "Неоплётённый USB-C кабель длиной 1.5 м с поддержкой быстрой зарядки. Прочный, гибкий и устойчивый к перегибам.",
    shortDescription: "USB-C, 1.5 м, быстрая зарядка",
    specs: {
      Тип: "кабель",
      Разъём: "USB-C - USB-C",
      Длина: "1.5 м",
      Поддержка: "быстрая зарядка"
    },
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"],
    tags: ["кабель", "USB-C"]
  },
  {
    id: "ar-stand",
    name: "Aurel Подставка",
    slug: "aurel-stand",
    category: "аксессуары",
    brand: "Aurel",
    price: 3990,
    rating: 4.7,
    reviewsCount: 156,
    inStock: true,
    description: "Алюминиевая регулируемая подставка для ноутбука. Улучшает эргономику, обеспечивает охлаждение за счёт зазора и складывается для переноски.",
    shortDescription: "Алюминий, регулируемая",
    specs: {
      Тип: "подставка",
      Материал: "Алюминий",
      Регулировка: "Угол наклона",
      Совместимость: "Ноутбуки 11–17\""
    },
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800"],
    tags: ["подставка", "алюминий"]
  },
  {
    id: "tn-buds-lite",
    name: "TechNova Buds Lite",
    slug: "technova-buds-lite",
    category: "наушники",
    brand: "TechNova",
    price: 6990,
    rating: 4.6,
    reviewsCount: 189,
    inStock: true,
    description: "Компактные беспроводные наушники с чистым звуком и удобной посадкой. Лёгкий кейс, хорошая автономность и быстрая зарядка для повседневного прослушивания.",
    shortDescription: "TWS, до 20 ч работы",
    specs: {
      "Тип": "TWS",
      "Время работы": "до 20 ч с кейсом",
      "Зарядка": "USB-C",
      "Микрофон": "встроенный",
      "Защита": "IPX4",
      "Кодеки": "AAC, SBC"
    },
    images: ["https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"],
    tags: ["TWS", "компактные"]
  }
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

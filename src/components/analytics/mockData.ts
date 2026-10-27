export type TrafficRow = {
  name: string;
  visits: number;
  users: number;
  conv: number;
  rate: number;
  status: "up" | "down" | "stable";
};

export type ChannelPoint = {
  name: string;
  direct: number;
  organic: number;
  ads: number;
};

export type ConversionPoint = {
  name: string;
  value: number;
};

export const kpi = [
  { label: "Посетители", value: "128 430", delta: "+12.4%", up: true },
  { label: "Просмотры", value: "312 862", delta: "+8.7%", up: true },
  { label: "Конверсия", value: "4,82%", delta: "-0.6%", up: false },
  { label: "Средний чек", value: "₽4 820", delta: "+6.1%", up: true },
];

export const trend = [
  { name: "Пн", visits: 14200, users: 11800 },
  { name: "Вт", visits: 15600, users: 13100 },
  { name: "Ср", visits: 14800, users: 12500 },
  { name: "Чт", visits: 17200, users: 14600 },
  { name: "Пт", visits: 19800, users: 16600 },
  { name: "Сб", visits: 16400, users: 13800 },
  { name: "Вс", visits: 13800, users: 11700 },
];

export const channels: ChannelPoint[] = [
  { name: "Пн", direct: 4200, organic: 6800, ads: 3200 },
  { name: "Вт", direct: 4600, organic: 7200, ads: 3800 },
  { name: "Ср", direct: 4400, organic: 6900, ads: 3500 },
  { name: "Чт", direct: 5200, organic: 7800, ads: 4200 },
  { name: "Пт", direct: 5800, organic: 8600, ads: 5400 },
  { name: "Сб", direct: 5000, organic: 7200, ads: 4200 },
  { name: "Вс", direct: 4100, organic: 6200, ads: 3500 },
];

export const devices: ConversionPoint[] = [
  { name: "Десктоп", value: 58 },
  { name: "Мобилка", value: 34 },
  { name: "Планшет", value: 8 },
];

export const table: TrafficRow[] = [
  { name: "Главная", visits: 84240, users: 68420, conv: 6120, rate: 7.26, status: "up" },
  { name: "Каталог", visits: 64280, users: 52460, conv: 2840, rate: 4.42, status: "up" },
  { name: "Карточка товара", visits: 48640, users: 40280, conv: 2180, rate: 4.48, status: "stable" },
  { name: "Корзина", visits: 24620, users: 19840, conv: 1240, rate: 5.04, status: "up" },
  { name: "Оформление", visits: 16840, users: 14260, conv: 920, rate: 5.46, status: "down" },
  { name: "Блог", visits: 12640, users: 11280, conv: 284, rate: 2.25, status: "stable" },
];

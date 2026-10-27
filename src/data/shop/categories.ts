import type { ProductBrand, ProductCategory } from "../../types/shop";

export const categories: { id: ProductCategory; name: string }[] = [
  { id: "телефоны", name: "Телефоны" },
  { id: "ноутбуки", name: "Ноутбуки" },
  { id: "наушники", name: "Наушники" },
  { id: "аксессуары", name: "Аксессуары" },
];

export const brands: { id: ProductBrand; name: string }[] = [
  { id: "TechNova", name: "TechNova" },
  { id: "Nebula", name: "Nebula" },
  { id: "Aurel", name: "Aurel" },
  { id: "Orbit", name: "Orbit" },
  { id: "Zenix", name: "Zenix" },
];

export const pickupPoints = [
  "ПВЗ ул. Ленина, 12",
  "ПВЗ пр. Мира, 45",
  "ПВЗ ул. Гагарина, 78",
];

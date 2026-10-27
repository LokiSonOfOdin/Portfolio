export type ProductCategory = "телефоны" | "ноутбуки" | "наушники" | "аксессуары";

export type ProductBrand = "TechNova" | "Nebula" | "Aurel" | "Orbit" | "Zenix";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  brand: ProductBrand;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  images: string[];
  tags: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "name-asc";

export type DeliveryMethod = "courier" | "pickup";
export type PaymentMethod = "card" | "cash";

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryMethod: DeliveryMethod;
  address?: string;
  pickupPoint?: string;
  paymentMethod: PaymentMethod;
}

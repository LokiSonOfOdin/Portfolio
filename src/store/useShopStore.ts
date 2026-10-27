import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, DeliveryMethod, PaymentMethod } from "../types/shop";

interface ShopState {
  cart: CartItem[];
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  getCartCount: () => number;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      deliveryMethod: "courier",
      paymentMethod: "card",

      addToCart: (productId: string, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { productId, quantity }] };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        }));
      },

      increaseQuantity: (productId: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId: string) => {
        set((state) => {
          const item = state.cart.find((i) => i.productId === productId);
          if (item && item.quantity <= 1) {
            return {
              cart: state.cart.filter((i) => i.productId !== productId),
            };
          }
          return {
            cart: state.cart.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          set((state) => ({
            cart: state.cart.filter((item) => item.productId !== productId),
          }));
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      setDeliveryMethod: (method: DeliveryMethod) => set({ deliveryMethod: method }),
      setPaymentMethod: (method: PaymentMethod) => set({ paymentMethod: method }),

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "portfolio-shop-cart",
    }
  )
);

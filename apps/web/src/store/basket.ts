'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface BasketItem {
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  tag: string;
}

interface BasketState {
  items: BasketItem[];
  hasHydrated: boolean;
  addItem: (item: Omit<BasketItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearBasket: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  setHasHydrated: (value: boolean) => void;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (value) => value.productId === item.productId
          );

          if (existing) {
            return {
              items: state.items.map((value) =>
                value.productId === item.productId
                  ? { ...value, quantity: value.quantity + 1 }
                  : value
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0),
        })),
      clearBasket: () =>
        set({
          items: [],
        }),
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),
    }),
    {
      name: 'fb-basket',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

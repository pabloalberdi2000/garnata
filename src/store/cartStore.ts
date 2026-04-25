import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  collection?: string
}

export interface CartStore {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id)
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        }
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        }
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'garnata-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

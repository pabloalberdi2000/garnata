import { useCartStore } from '../store/cartStore'
import type { CartItem } from '../store/cartStore'

interface UseCartReturn {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  totalItems: number
}

export const useCart = (): UseCartReturn => {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotal = useCartStore((state) => state.getTotal)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total: getTotal(),
    totalItems: getTotalItems(),
  }
}

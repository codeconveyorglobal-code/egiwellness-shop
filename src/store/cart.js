import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: {}, // { [productId]: qty }
      isOpen: false,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      add: (id, qty = 1) =>
        set((s) => ({
          items: { ...s.items, [id]: (s.items[id] || 0) + qty },
          isOpen: true,
        })),

      remove: (id) =>
        set((s) => {
          const items = { ...s.items }
          delete items[id]
          return { items }
        }),

      setQty: (id, qty) =>
        set((s) => {
          const items = { ...s.items }
          if (qty <= 0) delete items[id]
          else items[id] = qty
          return { items }
        }),

      clear: () => set({ items: {} }),

      count: () => Object.values(get().items).reduce((a, b) => a + b, 0),
    }),
    { name: 'egi-cart' }
  )
)

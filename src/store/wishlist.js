import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlist = create(
  persist(
    (set, get) => ({
      ids: [], // array of product ids

      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [id, ...s.ids],
        })),

      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),

      has: (id) => get().ids.includes(id),

      clear: () => set({ ids: [] }),
    }),
    { name: 'egi-wishlist' }
  )
)

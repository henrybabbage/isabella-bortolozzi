import { create } from 'zustand'

export const useActiveItemStore = create((set) => ({
    inViewItem: null,
    setInViewItem: (item) => set({ inViewItem: item })
}))

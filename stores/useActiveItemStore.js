import { create } from 'zustand'

export const useActiveItemStore = create((set) => ({
    inViewItem: 0,
    setInViewItem: (item) => set({ inViewItem: item })
}))

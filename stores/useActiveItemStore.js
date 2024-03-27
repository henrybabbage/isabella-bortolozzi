import { create } from 'zustand'

export const useActiveItemStore = create((set) => ({
    inViewItem: 0,
    currentlyHoveredItem: null,
    setInViewItem: (item) => set({ inViewItem: item }),
    setCurrentlyHoveredItem: (item) => set({ currentlyHoveredItem: item }),
}))

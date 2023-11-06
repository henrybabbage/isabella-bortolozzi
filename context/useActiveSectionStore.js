import { create } from 'zustand'

export const useActiveSectionStore = create((set) => ({
    inViewSection: null,
    setInViewSection: (section) => set({ inViewSection: section })
}))

import { create } from 'zustand'

export const useActiveYearStore = create((set) => ({
    inViewYear: null,
    setInViewYear: (year) => set({ inViewYear: year })
}))

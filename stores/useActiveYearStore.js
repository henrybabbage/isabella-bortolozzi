import { create } from 'zustand'

export const useActiveYearStore = create((set) => ({
    inViewYear: new Date().getFullYear(),
    setInViewYear: (year) => set({ inViewYear: year })
}))

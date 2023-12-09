import { create } from 'zustand'

export const useSampledColorStore = create((set) => ({
    selectedColor: null,
    setSelectedColor: (value) => set({ selectedColor: value })
}))

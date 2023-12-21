import { create } from 'zustand'

export const useSelectedYearStore = create((set) => ({
    selectedYearIndex: 0,
    setSelectedYearIndex: (idx) => set({ selectedYearIndex: idx })
}))

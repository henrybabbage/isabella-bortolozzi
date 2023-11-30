import { create } from 'zustand'

export const useSelectedYearStore = create((set) => ({
    selectedYearIndex: null,
    setSelectedYearIndex: (year) => set({ selectedYearIndex: year })
}))

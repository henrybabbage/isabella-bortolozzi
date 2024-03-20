import { create } from 'zustand'

export const useNavTextColorStore = create((set) => ({
    textColor: null,
    setTextColor: (value) => set({ textColor: value })
}))

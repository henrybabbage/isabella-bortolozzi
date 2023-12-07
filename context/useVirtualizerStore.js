import { create } from 'zustand'

export const useVirtualizerStore = create((set) => ({
    virtualizer: null,
    setVirtualizer: (virtualizer) => set({ setVirtualizer: virtualizer })
}))

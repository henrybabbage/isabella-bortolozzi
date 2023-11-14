import { create } from 'zustand'

export const useActiveImageStore = create((set) => ({
    inViewImage: null,
    setInViewImage: (image) => set({ setInViewImage: image })
}))

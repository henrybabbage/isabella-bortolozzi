import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

export const useNavOpenStore = createWithEqualityFn(
  (set) => ({
    isNavOpen: false,
    setIsNavOpen: (value) => set({ isNavOpen: value }),
  }),
  shallow,
)

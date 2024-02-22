import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

export const useNavOpenStore = createWithEqualityFn(
  (set) => ({
    isNavOpened: false,
    setIsNavOpened: (value) => set({ isNavOpened: value }),
  }),
  shallow,
)

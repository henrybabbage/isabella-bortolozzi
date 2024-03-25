import CustomEase from 'gsap/dist/CustomEase'
import { createContext, useState } from 'react'
import { useContext } from 'react'

import { gsap } from '@/lib/gsap'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
}

const TransitionContext = createContext({
  timeline: null,
  setTimeline: () => {},
  resetTimeline: () => {},
  primaryEase: null,
})

export function TransitionContextProvider({ children }) {
  const setTransition = () => {
    document.documentElement.classList.add('is-transitioning')
  }
  const [timeline, setTimeline] = useState(
    gsap.timeline({ onStart: setTransition, paused: true }),
  )
  const primaryEase =
    typeof window !== 'undefined'
      ? CustomEase.create('primaryEase', 'M0,0 C0.62,0.05 0.01,0.99 1,1')
      : null

  const resetTimeline = () => {
    timeline.pause().clear()
  }

  const contextValue = {
    timeline,
    setTimeline,
    resetTimeline,
    primaryEase,
  }

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  )
}

export default function useTransitionContext() {
  return useContext(TransitionContext)
}

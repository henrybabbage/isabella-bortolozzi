import { createContext, useContext, useRef, useState } from 'react'

import { gsap, PRIMARY_EASE } from '@/lib/gsap'

const TransitionContext = createContext({
  navigationRef: {
    current: null,
  },
  layoutRef: {
    current: null,
  },
  timeline: null,
  setTimeline: () => {},
  resetTimeline: () => {},
  primaryEase: null,
})

export function TransitionContextProvider({ children }) {
  const setTransition = () => {
    document.documentElement.classList.add('is-transitioning')
  }

  const navigationRef = useRef(null)
  const layoutRef = useRef(null)
  const [timeline, setTimeline] = useState(
    gsap.timeline({ onStart: setTransition, paused: true }),
  )

  const primaryEase = PRIMARY_EASE

  const resetTimeline = () => {
    timeline.pause().clear()
  }

  const contextValue = {
    navigationRef,
    layoutRef,
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

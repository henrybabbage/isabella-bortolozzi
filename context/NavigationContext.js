import { gsap } from 'gsap'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import useLockedScroll from '@/hooks/useLockedScroll'
import useScrollbar from '@/hooks/useScrollbar'
import useWindowSize from '@/hooks/useWindowSize'

import useTransitionContext from './TransitionContext'

const NavigationContext = createContext({
  navigationRef: {
    current: null,
  },
  mobileNavRef: {
    current: null,
  },
  open: false,
  sticky: false,
  hidden: false,
  toggle: () => {},
  currentRoute: '',
  setCurrentRoute: () => {},
  currentLocale: '',
  setCurrentLocale: () => {},
})

export function NavigationContextProvider({ children }) {
  const router = useRouter()
  const navigationRef = useRef(null)
  const mobileNavRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(router.asPath, router.locale ?? '')
  const [currentLocale, setCurrentLocale] = useState(router.locale ?? '')
  const { scrollY, directionY } = useScrollbar()
  const { windowSize, isDesktop } = useWindowSize()
  const [locked, setLocked] = useLockedScroll(false)
  const { primaryEase } = useTransitionContext()

  const animate = (state) => {
    if (state) {
      gsap.fromTo(
        mobileNavRef.current,
        {
          opacity: 1,
          scaleY: 0,
        },
        {
          scaleY: 1,
          transformOrigin: 'bottom',
          willChange: 'transform',
          ease: primaryEase,
          duration: 0.7,
        },
      )
    } else {
      gsap.to(mobileNavRef.current, {
        opacity: 0,
        ease: primaryEase,
        duration: 0.7,
      })
    }
  }

  const toggle = () => {
    setOpen(!open)
    setLocked(!locked)
    animate(!open)
  }

  /* Closes navigation if viewport is larger than 991px */
  useEffect(() => {
    if (isDesktop) {
      setOpen(false)
      setLocked(false)
      animate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  /* Closes navigation on route change */
  useEffect(() => {
    if (open) {
      setOpen(false)
      setLocked(false)
      animate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.locale])

  const contextValue = {
    navigationRef,
    mobileNavRef,
    open,
    sticky: scrollY > 0,
    hidden:
      directionY > 0 &&
      typeof windowSize.height === 'number' &&
      scrollY > windowSize.height,
    toggle,
    currentRoute,
    setCurrentRoute,
    currentLocale,
    setCurrentLocale,
  }

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  )
}

export default function useNavigationContext() {
  return useContext(NavigationContext)
}

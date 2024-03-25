import { useContext, useRef } from 'react'

import { TransitionContext } from '@/context/TransitionContext'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from '@/lib/gsap'

const FadeInOut = ({ children }) => {
  const { timeline } = useContext(TransitionContext)
  const el = useRef()

  // useIsomorphicLayoutEffect to avoid console warnings
  useIsomorphicLayoutEffect(() => {
    // intro animation will play immediately
    gsap.to(el.current, {
      opacity: 1,
      duration: 1,
    })

    // add outro animation to top-level outro animation timeline
    timeline.add(
      gsap.to(el.current, {
        opacity: 0,
        duration: 0.5,
      }),
      0,
    )
  }, [])

  return (
    // set initial opacity to 0 to avoid FOUC for SSR
    <div ref={el} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

export default FadeInOut

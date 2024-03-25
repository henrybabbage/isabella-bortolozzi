import { memo, useContext, useRef } from 'react'

import { TransitionContext } from '@/context/TransitionContext'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from '@/lib/gsap'

const AnimateInOut = ({
  children,
  as,
  from,
  to,
  durationIn,
  durationOut,
  delay,
  delayOut,
  set,
  skipOutro,
}) => {
  const { timeline } = useContext(TransitionContext)
  const el = useRef()

  useIsomorphicLayoutEffect(() => {
    // intro animation
    if (set) {
      gsap.set(el.current, { ...set })
    }
    gsap.to(el.current, {
      ...to,
      delay: delay || 0,
      duration: durationIn,
    })

    // outro animation
    if (!skipOutro) {
      timeline.add(
        gsap.to(el.current, {
          ...from,
          delay: delayOut || 0,
          duration: durationOut,
        }),
        0,
      )
    }
  }, [])

  return (
    <div ref={el} style={from}>  
      {children}
    </div>
  )
}

export default memo(AnimateInOut)

import { useRef } from 'react'

import useTransitionContext from '@/context/TransitionContext'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from '@/lib/gsap'

export default function ClipPathInOut({
  children,
  fade = true,
  durationIn = 1.25,
  durationOut = 0.35,
  delay = 0,
  delayOut = 0,
  ease,
  easeOut,
  clipPath,
  clipPathTo = 'inset(0% 0% 0% 0%)',
  clipPathOut,
  skipOutro,
  watch,
  start = 'top bottom',
  end = 'bottom top',
  scrub = false,
  markers,
}) {
  const { timeline, primaryEase } = useTransitionContext()
  const element = useRef(null)
  const animation = useRef(null)

  const animate = () => {
    const scrollTrigger = watch
      ? {
          scrollTrigger: {
            trigger: element.current,
            start,
            end,
            scrub,
            markers: markers,
          },
        }
      : {}

    const anim = gsap.fromTo(
      element.current,
      {
        opacity: fade ? 0 : 1,
        clipPath,
        ease: ease ?? primaryEase,
      },
      {
        opacity: 1,
        clipPath: clipPathTo,
        ease: ease ?? primaryEase,
        delay,
        duration: durationIn,
        ...scrollTrigger,
      },
    )

    animation.current = anim
  }

  const animateOutro = () => {
    if (!skipOutro) {
      timeline?.add(
        gsap.to(element.current, {
          clipPath: clipPathOut ?? clipPath,
          ease: easeOut ?? primaryEase,
          delay: delayOut,
          duration: durationOut,
        }),
        0,
      )
    }
  }

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Intro animation */
      animate()

      /* Outro animation */
      animateOutro()

      gsap.to(element.current, {
        opacity: 1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={element} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

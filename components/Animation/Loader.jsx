
import { useRef } from 'react'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { gsap, PRIMARY_EASE } from '@/lib/gsap'

export default function Loader({ setIsLoading, setIsReady }) {
  const loaderRef = useRef(null)

  const primaryEase = PRIMARY_EASE

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        ease: primaryEase,
        scaleY: 0,
        transformOrigin: '50% 0',
        willChange: 'transform',
        delay: 0.8,
        duration: 1.25,
        onStart: () => {
          setIsReady(true)
        },
        onComplete: () => {
          setIsLoading(false)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="fixed top-0 left-0 bg-black cursor-wait z-[999] w-full h-full"
      ref={loaderRef}
    ></div>
  )
}

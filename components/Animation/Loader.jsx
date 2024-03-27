import CustomEase from 'gsap/dist/CustomEase'
import { useRef } from 'react'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from '@/lib/gsap'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
}

export default function Loader({ setIsLoading, setIsReady }) {
  const loaderRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        ease: CustomEase.create('primaryEase', 'M0,0 C0.62,0.05 0.01,0.99 1,1'),
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

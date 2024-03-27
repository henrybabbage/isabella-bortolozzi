import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useRouter } from 'next/router'
import { useState } from 'react'

import useTransitionContext from '@/context/TransitionContext'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { gsap } from '@/lib/gsap'

export default function TransitionLayout({ children }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState({
    route: router.asPath,
    children,
  })
  const { primaryEase, layoutRef, timeline, resetTimeline } =
    useTransitionContext()

  const animateLayout = () => {
    /* Intro animation */
    gsap.fromTo(
      layoutRef.current,
      {
        y: '-100%',
      },
      {
        opacity: 1,
        y: 0,
        willChange: 'transform',
        ease: primaryEase,
        delay: 1,
        duration: 1.25,
      },
    )

    /* Outro animation */
    timeline?.add(
      gsap.to(layoutRef.current, {
        opacity: 0,
        ease: primaryEase,
        duration: 0.35,
      }),
      0,
    )
  }

  useIsomorphicLayoutEffect(() => {
    if (currentPage.route !== router.asPath) {
      if (timeline.duration() === 0) {
        /* There are no outro animations, so immediately transition */
    
        setCurrentPage({
          route: router.asPath,
          children,
        })
        ScrollTrigger.refresh(true)
        return
      }

      timeline.play().then(() => {
        /* outro complete so reset to an empty paused timeline */
        resetTimeline()

        setCurrentPage({
          route: router.asPath,
          children,
        })
        ScrollTrigger.refresh(true)
      })
    } else {
      ScrollTrigger.refresh(true)
    }
  }, [router.asPath])

  return <div>{currentPage.children}</div>
}

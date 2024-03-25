import { useRouter } from 'next/router'
import { useState } from 'react'

import useNavigationContext from '@/context/NavigationContext'
import useTransitionContext from '@/context/TransitionContext'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { ScrollTrigger } from '@/lib/gsap'

export default function TransitionLayout({ children }) {
  const router = useRouter()
  const [displayChildren, setDisplayChildren] = useState(children)
  const { timeline, resetTimeline, primaryEase, footerRef } =
    useTransitionContext()

  const {
    navigationRef,
    setCurrentRoute,
    currentRoute,
    currentLocale,
    setCurrentLocale,
  } = useNavigationContext()

  const animateNavigation = () => {
    /* Intro animation */
    gsap.fromTo(
      navigationRef.current,
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
      gsap.to(navigationRef.current, {
        opacity: 0,
        ease: primaryEase,
        duration: 0.35,
      }),
      0,
    )
  }

  const animateFooter = () => {
    /* Intro animation */
    gsap.to(footerRef.current, {
      opacity: 1,
      ease: primaryEase,
      duration: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom top',
      },
    })

    /* Outro animation */
    timeline?.add(
      gsap.to(footerRef.current, {
        opacity: 0,
        ease: primaryEase,
        duration: 0.35,
      }),
      0,
    )
  }

  useIsomorphicLayoutEffect(() => {
    if (
      currentRoute !== (router.asPath, router.locale ?? '') &&
      currentLocale === router.locale
    ) {
      if (timeline?.duration() === 0) {
        /* There are no outro animations, so immediately transition */
        setDisplayChildren(children)
        animateNavigation()
        animateFooter()
        setCurrentRoute(router.asPath, router.locale ?? '')
        window.scrollTo(0, 0)
        ScrollTrigger.refresh(true)
        return
      }

      timeline?.play().then(() => {
        /* outro complete so reset to an empty paused timeline */
        resetTimeline()
        setDisplayChildren(children)
        animateNavigation()
        animateFooter()
        setCurrentRoute(router.asPath, router.locale ?? '')
        window.scrollTo(0, 0)
        ScrollTrigger.refresh(true)
        document.documentElement.classList.remove('is-transitioning')
      })
    } else if (currentLocale !== router.locale) {
      setDisplayChildren(children)
      setCurrentRoute(router.asPath, router.locale ?? '')
      setCurrentLocale(router.locale ?? '')
      ScrollTrigger.refresh(true)
    } else {
      setCurrentRoute(router.asPath, router.locale ?? '')
      ScrollTrigger.refresh(true)
    }
  }, [router.asPath, router.locale])

  return <div className="overflow-hidden">{displayChildren}</div>
}

import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export default function useScrollRestoration() {
  const scrollCache = useRef({})
  const activeRestorePath = useRef()
  const router = useRouter()

  useEffect(() => {
    if (history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual'
    }

    const getCurrentPath = () => location.pathname + location.search

    router.beforePopState(() => {
      activeRestorePath.current = getCurrentPath()
      return true
    })

    const onComplete = () => {
      const scrollPath = activeRestorePath.current
      if (!scrollPath || !(scrollPath in scrollCache.current)) {
        window.scrollTo(0, 0)
        return
      }

      activeRestorePath.current = undefined
      const [scrollX, scrollY] = scrollCache.current[scrollPath]
      window.scrollTo(scrollX, scrollY)

      // allow for page taking longer to load
      const delays = [10, 20, 40, 80, 160]
      const checkAndScroll = () => {
        if (
          (window.scrollX === scrollX && window.scrollY === scrollY) ||
          scrollPath !== getCurrentPath()
        ) {
          return
        }
        window.scrollTo(scrollX, scrollY)
        const delay = delays.shift()
        if (delay) {
          setTimeout(checkAndScroll, delay)
        }
      }
      setTimeout(checkAndScroll, delays.shift())
    }

    const onScroll = () => {
      scrollCache.current[getCurrentPath()] = [window.scrollX, window.scrollY]
    }

    router.events.on('routeChangeComplete', onComplete)
    window.addEventListener('scroll', onScroll)

    return () => {
      router.events.off('routeChangeComplete', onComplete)
      window.removeEventListener('scroll', onScroll)
    }
  }, [router])
}

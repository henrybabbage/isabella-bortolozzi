import { useCallback } from 'react'

/**
 * For use with Tanstack Virtual:
 * Scroll to index function
 * https://tanstack.com/virtual/latest/docs/framework/react/examples/smooth-scroll
 */

function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

export const useScrollToVirtualItem = (parentRef, scrollingRef) => {
  const scrollToVirtualItem = useCallback((offset, canSmooth, instance) => {
    const duration = 1000
    const start = parentRef.current.scrollTop
    const startTime = (scrollingRef.current = Date.now())

    const run = () => {
      if (scrollingRef.current !== startTime) return
      const now = Date.now()
      const elapsed = now - startTime
      const progress = easeInOutQuint(Math.min(elapsed / duration, 1))
      const interpolated = start + (offset - start) * progress

      if (elapsed < duration) {
        elementScroll(interpolated, canSmooth, instance)
        requestAnimationFrame(run)
      } else {
        elementScroll(interpolated, canSmooth, instance)
      }
    }

    requestAnimationFrame(run)
  }, [parentRef, scrollingRef])

  return scrollToVirtualItem
}

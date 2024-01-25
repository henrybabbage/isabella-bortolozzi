import { useEffect, useState } from 'react'

// Return the current [width, height] of window
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width,
    height,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

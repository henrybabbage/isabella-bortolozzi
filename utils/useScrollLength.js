import { useEffect, useState } from 'react'

// Return the current [width, height] of window
export default function useScrollLength() {
  const [documentLength, setDocumentLength] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setDocumentLength(window.document.body.offsetHeight - window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return documentLength
}

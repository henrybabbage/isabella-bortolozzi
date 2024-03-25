import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useWindowLocation() {
  const [currentURL, setCurrentURL] = useState('')
  const router = useRouter()

  useEffect(() => {
    const urlObj = new URL(window.location.href)
    urlObj.search = ''
    urlObj.hash = ''
    setCurrentURL(urlObj.toString())
  }, [router.asPath])

  return { currentURL }
}

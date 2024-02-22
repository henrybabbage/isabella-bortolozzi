import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import BackButton from '../Common/Buttons/BackButton'
import AspectImage from '../Common/Media/AspectImage'

export default function ExhibitionPage({ exhibition }) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentScrollElement, setCurrentScrollElement] = useState(0)

  const router = useRouter()

  const scrollToSections = useRef(new Set())
  const scrollViewRef = useRef(null)

  const pageRef = useRef()

  useGSAP(
    () => {
      gsap.from(pageRef.current, { scale: 0.7, y: 100, opacity: 0 })
      gsap.to(pageRef.current, { scale: 1, y: 0, opacity: 1, duration: 0.7 })
    },
    { scope: pageRef },
  )

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3400)
  }, [])

  const scrollToSection = (idx) => {
    if (idx === null || idx === undefined) return
    Array.from(scrollToSections.current)[idx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <>
      <div
        ref={pageRef}
        className="relative min-h-[100svh] w-screen scrollbar-hide"
      >
        <div className="fixed top-6 right-6 z-50">
          <BackButton backPathname={router.pathname.split('/')[1]} />
        </div>
        <div
          ref={scrollViewRef}
          className="h-full w-screen overflow-y-auto overflow-x-hidden py-24"
        >
          <div className="relative grid grid-cols-1 w-screen items-center gap-32">
            {exhibition &&
              exhibition.imageGallery &&
              exhibition.imageGallery.map((image) => (
                <AspectImage
                  key={image._key}
                  image={image}
                  ref={(element) => scrollToSections.current.add(element)}
                  alt={image.alt}
                  priority={isLoading ? false : true}
                  fill={true}
                  mode="contain"
                  sizes="100vw"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

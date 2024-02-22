import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import BackButton from '../Common/Buttons/BackButton'
import FlipImage from '../Common/Media/FlipImage'

export default function ExhibitionPage({ exhibition }) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentScrollElement, setCurrentScrollElement] = useState(0)

  const router = useRouter()

  const scrollToSections = useRef(new Set())
  const scrollViewRef = useRef(null)

  const pageRef = useRef()

  useGSAP(
    () => {
      // animations
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
        className="relative min-h-[100svh] w-full scrollbar-hide"
      >
        <div className="fixed top-6 right-6 z-50">
          <BackButton backPathname={router.pathname.split('/')[1]} />
        </div>
        <div
          ref={scrollViewRef}
          className="h-full w-full px-12 overflow-y-auto overflow-x-hidden py-24"
        >
          <div className="relative grid grid-cols-4 w-full items-center gap-4 gap-y-32">
            {exhibition &&
              exhibition.imageGallery &&
              exhibition.imageGallery.map((image) => (
                <FlipImage
                  key={image._key}
                  image={image}
                  fill={false}
                  mode="contain"
                  width={image.asset.metadata.dimensions.width}
                  height={image.asset.metadata.dimensions.height}
                  aspectRatio={image.asset.metadata.dimensions.aspectRatio}
                  priority={image[0] ? true : false}
                  ref={(element) => scrollToSections.current.add(element)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

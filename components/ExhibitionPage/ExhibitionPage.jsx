import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { Flip } from '@/lib/gsap'

import BackButton from '../Common/Buttons/BackButton'
import FlipImage from '../Common/Media/FlipImage'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export default function ExhibitionPage({ exhibition }) {
  const [isGridView, setIsGridView] = useState(true)
  const [targetId, setTargetId] = useState(null)

  const router = useRouter()

  const pageRef = useRef()
  const imagesRef = useRef()
  const eventsRef = useRef([])

  const { contextSafe } = useGSAP()

  const clickHandler = contextSafe((e) => {
    const { target } = e

    performLayoutFlip(imagesRef)
  })

  function performLayoutFlip(ref) {
    const state = Flip.getState('.grid-container img, .flex-container img')
    ref.current.classList.toggle('grid-container')
    ref.current.classList.toggle('flex-container')

    scrollToTop()

    Flip.from(state, {
      delay: 0.3,
      duration: 0.7,
      ease: 'power4.inOut',
      scale: true,
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
        <div className="h-full w-full px-12 overflow-y-auto overflow-x-hidden py-24">
          <div
            ref={imagesRef}
            className="grid-container relative w-full gap-x-4 gap-y-32"
          >
            {exhibition &&
              exhibition.imageGallery &&
              exhibition.imageGallery.map((image, index) => (
                <FlipImage
                  key={image._key}
                  image={image}
                  fill={false}
                  mode="contain"
                  width={image.asset.metadata.dimensions.width}
                  height={image.asset.metadata.dimensions.height}
                  aspectRatio={image.asset.metadata.dimensions.aspectRatio}
                  priority={true}
                  clickHandler={clickHandler}
                  isGridView={isGridView}
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

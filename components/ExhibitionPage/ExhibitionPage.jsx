import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { Flip } from '@/lib/gsap'

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

    // scrollToTop()

    Flip.from(state, {
      duration: 0.7,
      ease: 'power4.inOut',
      scale: true,
    })
  }

  return (
    <div
      ref={pageRef}
      className="relative h-full w-full px-12 overflow-x-hidden py-24"
    >
      <div
        ref={imagesRef}
        className="grid-container relative w-full gap-x-4 gap-y-32"
      >
        {exhibition &&
          exhibition.imageGallery &&
          exhibition.imageGallery
            .splice(0, 8)
            .map((image, index) => (
              <FlipImage
                key={index}
                image={image}
                fill={false}
                sizes="80vw"
                mode="contain"
                width={image.asset.metadata.dimensions.width}
                height={image.asset.metadata.dimensions.height}
                aspectRatio={image.asset.metadata.dimensions.aspectRatio}
                priority={false}
                clickHandler={clickHandler}
                isGridView={isGridView}
                index={index}
              />
            ))}
      </div>
    </div>
  )
}

import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { Flip, gsap } from '@/lib/gsap'

import FlipImage from '../Common/Media/FlipImage'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export default function ExhibitionPage({ exhibition }) {
  const [isGridView, setIsGridView] = useState(false)
  const [targetId, setTargetId] = useState(null)

  const router = useRouter()

  const pageRef = useRef()
  const imagesRef = useRef()
  const eventsRef = useRef([])

  const { contextSafe } = useGSAP()

  const clickHandler = contextSafe((event) => {
    if (event.target.tagName === 'IMG') {
      const container = imagesRef.current
      const switchingToGridView = container.classList.contains('flex-container')

      if (!switchingToGridView) {
        // Fade out all captions
        gsap.to('.caption', {
          duration: 0.5,
          opacity: 0,
          ease: 'circ.inOut',
          onComplete: () => {
            gsap.set('.caption', { display: 'block' })
            performLayoutFlip(container)
          },
        })
      } else {
        performLayoutFlip(container)

        // Fade in all captions with a delay
        gsap.to('.caption', {
          delay: 1,
          duration: 0.5,
          opacity: 1,
          stagger: 0.25,
          ease: 'circ.inOut',
          onStart: () => {
            gsap.set('.caption', { display: 'block' })
          },
        })
      }
    }
  })

  function performLayoutFlip(container) {
    const state = Flip.getState('.grid-container img, .flex-container img')
    container.classList.toggle('grid-container')
    container.classList.toggle('flex-container')

    Flip.from(state, {
      duration: 0.5,
      ease: 'power4.inOut',
      scale: true,
      fade: true,
    })
  }

  return (
    <div ref={pageRef} className="relative h-full w-full px-12 py-24">
      <div
        ref={imagesRef}
        className="flex-container relative w-full gap-x-4 gap-y-32"
      >
        {exhibition &&
          exhibition.imageGallery &&
          exhibition.imageGallery
            .map((image, index) => (
              <FlipImage
                key={image._key}
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

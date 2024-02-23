import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { gsap } from '@/lib/gsap'

import BackButton from '../Common/Buttons/BackButton'
import FlipImage from '../Common/Media/FlipImage'

export default function ExhibitionPage({ exhibition }) {
  const [isGridView, setIsGridView] = useState(true)

  const router = useRouter()

  const pageRef = useRef()
  const imagesRef = useRef()

  useGSAP(
    () => {
      // animations
      gsap.from(".gridItem", {opacity: 0, stagger: 0.1})
    },
    { scope: pageRef },
  )

  const { contextSafe } = useGSAP()
  const clickHandler = contextSafe((e) => {
    const { target } = e

  })

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
          className="h-full w-full px-12 overflow-y-auto overflow-x-hidden py-24"
        >
          <div
          ref={imagesRef}
          className="relative grid grid-cols-4 w-full items-center gap-4 gap-y-32">
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
                  clickHandler={clickHandler}
                  isGridView={isGridView}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

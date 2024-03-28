import { useGSAP } from '@gsap/react'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { useRef } from 'react'

import DynamicLink from '@/components/Primitives/DynamicLink'
import { gsap } from '@/lib/gsap'
import { sanityClient } from '@/sanity/lib/sanity.client'
import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { cn } from '@/utils/cn'

export default function TableImage({ exhibition, index }) {
  const imageRef = useRef(null)

  const { mainImage } = exhibition

  const currentImage = mainImage?.asset ?? ''

  const imageProps = useNextSanityImage(sanityClient, currentImage)

  const inViewItem = useActiveItemStore((state) => state.inViewItem)

  // get currently hovered item from zustand store if any
  const currentlyHoveredItem = useActiveItemStore(
    (state) => state.currentlyHoveredItem,
  )

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 1,
        clipPath: 'inset(0% 0% 100% 0%)',
        ease: 'power4.inOut',
      },
      {
        delay: 0.25,
        duration: 1,
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'power4.inOut',
      },
    ),
      { dependencies: [] }
  })

  if (!currentImage) return null
  return (
    <DynamicLink link={exhibition} scroll={false}>
      <div
        className={cn(
          'cursor-pointer absolute inset-0 h-full w-full z-50',
          (currentlyHoveredItem ? currentlyHoveredItem : inViewItem) === index
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {imageProps && (
          <Image
            ref={imageRef}
            src={imageProps.src}
            loader={imageProps.loader}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 54vw, 54vw"
            quality={75}
            priority
            className="object-cover object-center pr-4"
          />
        )}
      </div>
    </DynamicLink>
  )
}

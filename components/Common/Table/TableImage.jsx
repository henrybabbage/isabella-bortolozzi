import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { cn } from 'utils/cn'

import DynamicLink from '@/components/Primitives/DynamicLink'
import { sanityClient } from '@/sanity/lib/sanity.client'
import { useActiveItemStore } from '@/stores/useActiveItemStore'

export default function TableImage({ exhibition, index }) {
  const { mainImage } = exhibition

  const currentImage = mainImage?.asset ?? ''

  const imageProps = useNextSanityImage(sanityClient, currentImage)

  const inViewItem = useActiveItemStore((state) => state.inViewItem)
  // get currently hovered item from zustand store if any
  const currentlyHoveredItem = useActiveItemStore(
    (state) => state.currentlyHoveredItem,
  )

  if (!currentImage) return null

  return (
    <DynamicLink link={exhibition} scroll={false}>
      <div
        className={cn(
          'cursor-pointer absolute inset-0 h-full w-full',
          (currentlyHoveredItem ? currentlyHoveredItem : inViewItem) === index
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 54vw, 54vw"
            quality={75}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
      </div>
    </DynamicLink>
  )
}

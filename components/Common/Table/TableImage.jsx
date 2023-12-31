import { sanityClient } from 'lib/sanity.client'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { cn } from 'utils/cn'

import DynamicLink from '@/components/Primitives/DynamicLink'
import { useActiveItemStore } from '@/stores/useActiveItemStore'

export default function TableImage({ exhibition }) {
  const { _id: id, mainImage } = exhibition

  const currentImage = mainImage?.asset ?? ''

  const imageProps = useNextSanityImage(sanityClient, currentImage)

  const inViewItem = useActiveItemStore((state) => state.inViewItem)

  if (!currentImage) return null

  return (
    <DynamicLink link={exhibition} prefetch={false} scroll={false}>
      <div
        className={cn(
          'cursor-pointer absolute inset-0 h-full w-full',
          inViewItem === id
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
            quality={75}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
      </div>
    </DynamicLink>
  )
}

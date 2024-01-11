import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { cn } from 'utils/cn'

import { sanityClient } from '@/sanity/lib/sanity.client'

export default function StandardImage({ image }) {
  const imageProps = useNextSanityImage(sanityClient, image?.asset)

  if (!image) return null

  return (
    <div className={cn('relative h-full w-full')}>
      <Image
        src={imageProps.src}
        loader={imageProps.loader}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        placeholder="blur"
        blurDataURL={image.asset.metadata.lqip}
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  )
}

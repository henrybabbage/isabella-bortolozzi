import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { cn } from 'utils/cn'

import { sanityClient } from '@/sanity/lib/sanity.client'

export default function StandardImage({
    image = {},
    alt = '',
    width = 0,
    height = 0,
    aspectRatio = 1,
    sizes = '100vw',
    priority = true,
    fill = false,
    mode = 'contain',
}) {
  const imageProps = useNextSanityImage(sanityClient, image?.asset)
  
  const ASPECT_RATIO = `aspect-[${aspectRatio}]`

  if (!image) return null
  return (
    <div className={cn(ASPECT_RATIO, 'relative h-full w-full')}>
      {imageProps && (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={alt ?? ""}
          fill={fill}
          sizes={sizes}
          width={width}
          height={height}
          quality={75}
          placeholder="blur"
          blurDataURL={image?.asset?.metadata?.lqip}
          priority={priority}
          style={{ objectFit: `${mode}`, objectPosition: 'center' }}
        />
      )}
    </div>
  )
}

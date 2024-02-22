import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { cn } from 'utils/cn'

import { sanityClient } from '@/sanity/lib/sanity.client'

export default function FlipImage({
  image = {},
  alt = '',
  width = 0,
  height = 0,
  sizes = '100vw',
  priority = true,
  fill = false,
  mode = 'contain',
}) {
  const imageProps = useNextSanityImage(sanityClient, image?.asset)

  // Get aspect ratio
  const IMAGE_ASPECT_RATIO =
    image?.asset?.metadata?.dimensions?.aspectRatio ?? 1

  // Check orientation
  // If larger than 1, it is landscape. If smaller than 1, it is portrait. If 1, it is square.
  // Bortolozzi images are typically 2:3 (portrait) and 3:2 (landscape)
  const isLandscape = IMAGE_ASPECT_RATIO > 1

  const DESKTOP_PORTRAIT_HEIGHT = '90vh'
  const DESKTOP_LANDSCAPE_WIDTH = '64vw'

  const DESKTOP_WIDTH = isLandscape
    ? DESKTOP_LANDSCAPE_WIDTH
    : `calc(${DESKTOP_PORTRAIT_HEIGHT}*${IMAGE_ASPECT_RATIO})`

  // height = width / ratio
  // width = height * ratio
  const DESKTOP_HEIGHT = isLandscape
    ? `calc(${DESKTOP_LANDSCAPE_WIDTH}*(1/${IMAGE_ASPECT_RATIO}))`
    : `${DESKTOP_PORTRAIT_HEIGHT}`

  const MAX_DESKTOP_WIDTH = `${DESKTOP_LANDSCAPE_WIDTH}`
  const MAX_DESKTOP_HEIGHT = `${DESKTOP_PORTRAIT_HEIGHT}`

  // Flip states
  const GRID_COLS_4_STYLES = {}

  const GRID_COLS_1_STYLES = {}

  if (!image) return null
  return (
    <div
      style={{
        width: DESKTOP_WIDTH,
        height: DESKTOP_HEIGHT,
        maxWidth: DESKTOP_WIDTH,
        maxHeight: DESKTOP_HEIGHT,
      }}
      className={cn(
        'relative',
      )}
    >
      {imageProps && (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={alt ?? ''}
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

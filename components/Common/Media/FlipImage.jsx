import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { useEffect, useState } from 'react'
import { cn } from 'utils/cn'

import { sanityClient } from '@/sanity/lib/sanity.client'

import { CustomPortableText } from '../Text/CustomPortableText'

export default function FlipImage({
  image = {},
  alt = '',
  width = 0,
  height = 0,
  sizes = '100vw',
  priority = true,
  fill = false,
  mode = 'contain',
  clickHandler,
  isGridView,
  index,
}) {
  const [imageSizes, setImageSizes] = useState(null)
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

  // height = width / ratio
  // width = height * ratio
  const DESKTOP_WIDTH = isLandscape
    ? `${DESKTOP_LANDSCAPE_WIDTH}`
    : `calc(${DESKTOP_PORTRAIT_HEIGHT}*${IMAGE_ASPECT_RATIO})`

  const DESKTOP_HEIGHT = isLandscape
    ? `calc(${DESKTOP_LANDSCAPE_WIDTH}*(1/${IMAGE_ASPECT_RATIO}))`
    : `${DESKTOP_PORTRAIT_HEIGHT}`

  const DESKTOP_MAX_WIDTH = `${DESKTOP_WIDTH}`
  const DESKTOP_MAX_HEIGHT = `${DESKTOP_HEIGHT}`

  // Flip states
  const GRID_RATIO_STYLES = {}
  const FLEX_RATIO_STYLES = {
    width: `${DESKTOP_WIDTH}`,
    maxWidth: `${DESKTOP_MAX_WIDTH}`,
    height: `${DESKTOP_HEIGHT}`,
    maxHeight: `${DESKTOP_MAX_HEIGHT}`,
  }

  const srcSetGridViewPortrait = '(min-width: 740px) calc(17vw - 30px), 84px'
  const srcSetGridViewLandscape =
    '(min-width: 1940px) calc(17vw - 30px), (min-width: 800px) calc(18vw - 48px), 84px'

  const srcSetFullViewPortrait = '34vw'
  const srcSetFullViewLandscape = '64vw'

  useEffect(() => {
    if (isGridView) {
      setImageSizes(
        isLandscape ? srcSetGridViewLandscape : srcSetGridViewPortrait,
      )
    } else {
      setImageSizes(
        isLandscape ? srcSetFullViewLandscape : srcSetFullViewPortrait,
      )
    }
  }, [isGridView, isLandscape])

  if (!image) return null
  return (
    <div
      style={isGridView ? GRID_RATIO_STYLES : FLEX_RATIO_STYLES}
      className={cn('relative image-item event cursor-pointer')}
      data-image-id={index}
    >
      {imageProps && (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={alt ?? ''}
          fill={fill}
          sizes={imageSizes}
          width={width}
          height={height}
          quality={75}
          placeholder="empty"
          blurDataURL={image?.asset?.metadata?.lqip}
          priority={priority}
          style={{ objectFit: `${mode}`, objectPosition: 'center' }}
          onClick={clickHandler}
          className="bg-highlight"
        />
      )}
      {isGridView && image.details && (
        <div className="pt-4 caption">
          <CustomPortableText value={image.details} classNames="" />
        </div>
      )}
    </div>
  )
}

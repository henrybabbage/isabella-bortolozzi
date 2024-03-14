import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { forwardRef, useState } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { sanityClient } from '@/sanity/lib/sanity.client'

const DESKTOP_LANDSCAPE_WIDTH = '64vw'
const DESKTOP_PORTRAIT_HEIGHT = '96vh'
const MOBILE_LANDSCAPE_WIDTH = '90vw'
const MOBILE_PORTRAIT_HEIGHT = '90vh'

const AspectImage = forwardRef(function AspectImage(
  {
    image = {},
    alt = '',
    width = 0,
    height = 0,
    aspectRatio = 1,
    sizes = '100vw',
    priority = true,
    fill = false,
    mode = 'contain',
  },
  ref,
) {
  const [open, setOpen] = useState(false)

  const imageProps = useNextSanityImage(sanityClient, image)

  // Get aspect ratio
  const IMAGE_ASPECT_RATIO =
    image?.asset?.metadata?.dimensions?.aspectRatio ?? 1

  // Check orientation
  // If larger than 1, it is landscape. If smaller than 1, it is portrait. If 1, it is square.
  // Bortolozzi images are typically 2:3 (portrait) and 3:2 (landscape)
  const isLandscape = IMAGE_ASPECT_RATIO > 1

  // height = width / ratio
  // width = height * ratio

  // Desktop dimensions
  const DESKTOP_WIDTH = isLandscape
    ? `${DESKTOP_LANDSCAPE_WIDTH}`
    : `calc(${DESKTOP_PORTRAIT_HEIGHT}*${IMAGE_ASPECT_RATIO})`

  const DESKTOP_HEIGHT = isLandscape
    ? `calc(${DESKTOP_LANDSCAPE_WIDTH}*(1/${IMAGE_ASPECT_RATIO}))`
    : `${DESKTOP_PORTRAIT_HEIGHT}`

  const DESKTOP_MAX_WIDTH = `${DESKTOP_WIDTH}`
  const DESKTOP_MAX_HEIGHT = `${DESKTOP_HEIGHT}`

  // Mobile dimensions
  const MOBILE_WIDTH = isLandscape
    ? `${MOBILE_LANDSCAPE_WIDTH}`
    : `calc(${MOBILE_PORTRAIT_HEIGHT}*${IMAGE_ASPECT_RATIO})`

  const MOBILE_HEIGHT = isLandscape
    ? `calc(${MOBILE_LANDSCAPE_WIDTH}*(1/${IMAGE_ASPECT_RATIO}))`
    : `${MOBILE_PORTRAIT_HEIGHT}`

  const MOBILE_MAX_WIDTH = `${MOBILE_WIDTH}`
  const MOBILE_MAX_HEIGHT = `${MOBILE_HEIGHT}`

  const DESKTOP_ASPECT_RATIO_VALUES = {
    width: `${DESKTOP_WIDTH}`,
    maxWidth: `${DESKTOP_MAX_WIDTH}`,
    height: `${DESKTOP_HEIGHT}`,
    maxHeight: `${DESKTOP_MAX_HEIGHT}`,
  }

  const MOBILE_ASPECT_RATIO_VALUES = {
    width: `${MOBILE_WIDTH}`,
    maxWidth: `${MOBILE_MAX_WIDTH}`,
    height: `${MOBILE_HEIGHT}`,
    maxHeight: `${MOBILE_MAX_HEIGHT}`,
  }

  const hydrated = useHydrated()
  const tabletAndBelow = useMediaQuery(
    { query: '(max-width: 991px)' },
    hydrated ? undefined : { deviceWidth: 991 },
  )

  return tabletAndBelow ? (
    <div
      ref={ref}
      className="flex flex-col items-center h-screen justify-center w-full"
    >
      <div style={MOBILE_ASPECT_RATIO_VALUES} className="relative">
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={alt ?? ''}
            sizes={sizes}
            blurDataURL={image?.asset?.metadata?.lqip}
            placeholder="blur"
            fill={fill}
            priority={false}
            quality={75}
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        )}
      </div>
    </div>
  ) : (
    <div
      ref={ref}
      className="flex flex-col items-center h-full justify-center w-full"
    >
      <div style={DESKTOP_ASPECT_RATIO_VALUES} className="relative">
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={alt ?? ''}
            width={width}
            height={height}
            sizes={sizes}
            blurDataURL={image?.asset?.metadata?.lqip}
            placeholder="blur"
            fill={fill}
            priority={priority}
            quality={75}
            style={{
              objectFit: `${mode}`,
              objectPosition: 'top',
            }}
          />
        )}
      </div>
    </div>
  )
})

export default AspectImage

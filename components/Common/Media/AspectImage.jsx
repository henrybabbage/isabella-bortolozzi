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

  const ratioMultiplier =
    1 / image?.asset?.metadata?.dimensions?.aspectRatio ?? 1
  const isLandscape = ratioMultiplier < 1

  const DESKTOP_PORTRAIT_WIDTH = `calc((${DESKTOP_PORTRAIT_HEIGHT})*(${
    1 / ratioMultiplier
  }))`
  const DESKTOP_LANDSCAPE_HEIGHT = `calc((${DESKTOP_LANDSCAPE_WIDTH})*(${ratioMultiplier}))`

  const MOBILE_PORTRAIT_WIDTH = `calc((${MOBILE_PORTRAIT_HEIGHT})*(${
    1 / ratioMultiplier
  }))`
  const MOBILE_LANDSCAPE_HEIGHT = `calc((${MOBILE_LANDSCAPE_WIDTH})*(${ratioMultiplier}))`

  const DESKTOP_ASPECT_RATIO_VALUES = {
    width: isLandscape ? DESKTOP_LANDSCAPE_WIDTH : DESKTOP_PORTRAIT_WIDTH,
    height: isLandscape ? DESKTOP_LANDSCAPE_HEIGHT : DESKTOP_PORTRAIT_HEIGHT,
    maxWidth: DESKTOP_LANDSCAPE_WIDTH,
    maxHeight: DESKTOP_PORTRAIT_HEIGHT,
  }

  const MOBILE_ASPECT_RATIO_VALUES = {
    width: isLandscape ? MOBILE_LANDSCAPE_WIDTH : MOBILE_PORTRAIT_WIDTH,
    height: isLandscape ? MOBILE_LANDSCAPE_HEIGHT : MOBILE_PORTRAIT_HEIGHT,
    maxWidth: MOBILE_LANDSCAPE_WIDTH,
    maxHeight: MOBILE_PORTRAIT_HEIGHT,
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

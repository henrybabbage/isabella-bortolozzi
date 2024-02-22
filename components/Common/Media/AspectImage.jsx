import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { forwardRef, useState } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { sanityClient } from '@/sanity/lib/sanity.client'

const LANDSCAPE_WIDTH_DESKTOP = '66vw'
const PORTRAIT_HEIGHT_DESKTOP = '96vh'
const LANDSCAPE_WIDTH_MOBILE = '90vw'
const PORTRAIT_HEIGHT_MOBILE = '90vh'

const AspectImage = forwardRef(function AspectImage(
  {
    image = {},
    alt = '',
    width = 0,
    height = 0,
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
  const landscape = ratioMultiplier < 1

  const desktopLandscapeWidth = LANDSCAPE_WIDTH_DESKTOP
  const desktopPortraitHeight = PORTRAIT_HEIGHT_DESKTOP
  const calcDesktopPortraitWidth = `calc((${desktopPortraitHeight})*(${
    1 / ratioMultiplier
  }))`
  const calcDesktopLandscapeHeight = `calc((${desktopLandscapeWidth})*(${ratioMultiplier}))`

  const mobileLandscapeWidth = LANDSCAPE_WIDTH_MOBILE
  const mobilePortraitHeight = PORTRAIT_HEIGHT_MOBILE
  const calcMobilePortraitWidth = `calc((${mobilePortraitHeight})*(${
    1 / ratioMultiplier
  }))`
  const calcMobileLandscapeHeight = `calc((${mobileLandscapeWidth})*(${ratioMultiplier}))`

  const aspectRatioValuesDesktop = {
    width: landscape ? desktopLandscapeWidth : calcDesktopPortraitWidth,
    height: landscape ? calcDesktopLandscapeHeight : desktopPortraitHeight,
    maxWidth: desktopLandscapeWidth,
    maxHeight: desktopPortraitHeight,
  }

  const aspectRatioValuesMobile = {
    width: landscape ? mobileLandscapeWidth : calcMobilePortraitWidth,
    height: landscape ? calcMobileLandscapeHeight : mobilePortraitHeight,
    maxWidth: mobileLandscapeWidth,
    maxHeight: mobilePortraitHeight,
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
      <div style={aspectRatioValuesMobile} className="relative">
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={alt ?? ''}
            sizes={sizes}
            blurDataURL={image.asset.metadata.lqip}
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
      <div style={aspectRatioValuesDesktop} className="relative">
        {imageProps && (
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={alt ?? ''}
            width={width}
            height={height}
            sizes={sizes}
            blurDataURL={image.asset.metadata.lqip}
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

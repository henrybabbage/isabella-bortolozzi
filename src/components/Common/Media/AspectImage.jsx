
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { useState } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import Modal from '@/components/Common/Dialog/Modal'
import { sanityClient } from '@/lib/sanity.client'

import ZoomImage from './ZoomImage'

const LANDSCAPE_WIDTH_DESKTOP = '66vw'
const PORTRAIT_HEIGHT_DESKTOP = '90vh'
const LANDSCAPE_WIDTH_MOBILE = '90vw'
const PORTRAIT_HEIGHT_MOBILE = '90vh'

export default function AspectImage({
    image,
    alt = '',
    width = 0,
    height = 0,
    sizes = '100vw',
    priority = false,
    fill = false,
    mode = 'contain'
}) {
    const [open, setOpen] = useState(false)

    const imageProps = useNextSanityImage(sanityClient, image)

    const ratioMultiplier = 1 / image.asset.metadata.dimensions.aspectRatio
    const landscape = ratioMultiplier < 1

    const desktopLandscapeWidth = LANDSCAPE_WIDTH_DESKTOP
    const desktopPortraitHeight = PORTRAIT_HEIGHT_DESKTOP
    const calcDesktopPortraitWidth = `calc((${desktopPortraitHeight})*(${1 / ratioMultiplier}))`
    const calcDesktopLandscapeHeight = `calc((${desktopLandscapeWidth})*(${ratioMultiplier}))`

    const mobileLandscapeWidth = LANDSCAPE_WIDTH_MOBILE
    const mobilePortraitHeight = PORTRAIT_HEIGHT_MOBILE
    const calcMobilePortraitWidth = `calc((${mobilePortraitHeight})*(${1 / ratioMultiplier}))`
    const calcMobileLandscapeHeight = `calc((${mobileLandscapeWidth})*(${ratioMultiplier}))`

    const aspectRatioValuesDesktop = {
        width: landscape ? desktopLandscapeWidth : calcDesktopPortraitWidth,
        height: landscape ? calcDesktopLandscapeHeight : desktopPortraitHeight,
        maxWidth: desktopLandscapeWidth,
        maxHeight: desktopPortraitHeight
    }

    const aspectRatioValuesMobile = {
        width: landscape ? mobileLandscapeWidth : calcMobilePortraitWidth,
        height: landscape ? calcMobileLandscapeHeight : mobilePortraitHeight,
        maxWidth: mobileLandscapeWidth,
        maxHeight: mobilePortraitHeight
    }

    const hydrated = useHydrated()
	const tabletAndBelow = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
	const desktopAndAbove = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })
    
    return tabletAndBelow ? (
        <div style={aspectRatioValuesMobile} className="relative">
            <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={alt}
                sizes={sizes}
                fill={fill}
                priority={priority}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'top'
                }}
            />
        </div>
    ) : (
        <Modal open={open} onOpenChange={setOpen}>
            <Modal.Button className="cursor-pointer">
                <div style={aspectRatioValuesDesktop} className="relative">
                    <Image
                        src={imageProps.src}
                        loader={imageProps.loader}
                        alt={alt}
                        width={width}
                        height={height}
                        sizes={sizes}
                        fill={fill}
                        priority={priority}
                        style={{
                            objectFit: `${mode}`,
                            objectPosition: 'top'
                        }}
                    />
                </div>
            </Modal.Button>
            <Modal.Content>
                <ZoomImage image={image} ratio={ratioMultiplier} open={open} setOpen={setOpen} />
            </Modal.Content>
        </Modal>
    )
}

import { sanityClient } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { forwardRef } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

const FullBleedImage = forwardRef(function FullBleedImage({ image = {}, alt = '', priority = true }, ref) {
    const imageProps = useNextSanityImage(sanityClient, image)
    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
    return (
            <div ref={ref} className="-z-10 h-screen w-screen cursor-pointer overflow-hidden relative snap-start">
                {image && (
                    <Image
                        src={imageProps.src}
                        loader={imageProps.loader}
                        alt={alt ?? ''}
                        fill
                        quality={75}
                        sizes={tabletOrMobile ? "300vw" : "100vw"}
                        priority={priority}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'bottom',
                        }}
                    />
                )}
        </div>
    )
})

export default FullBleedImage

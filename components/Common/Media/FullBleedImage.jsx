import { sanityClient } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { forwardRef } from 'react'

const FullBleedImage = forwardRef(function FullBleedImage({ image = {}, alt = '', priority = false }, ref) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
            <div ref={ref} className="-z-10 h-screen w-screen cursor-pointer overflow-hidden relative snap-start">
                {image && (
                    <Image
                        src={imageProps.src}
                        loader={imageProps.loader}
                        alt={alt ?? ''}
                        quality={100}
                        fill
                        priority={priority}
                        sizes="100vw"
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

import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'

import { sanityClient } from 'lib/sanity.client'

export default function FullBleedImage({ image, alt, priority = true }) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
            <div className="relative -z-10 h-screen w-screen cursor-pointer overflow-hidden">
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
}

import { sanityClient } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { cn } from 'utils/cn'

export default function StandardImage({ currentImage }) {
    const imageProps = useNextSanityImage(sanityClient, currentImage?.asset)

    if (!currentImage) return null

    return (
        <div className={cn('absolute inset-0 h-full w-full')}>
            <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt=""
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 50vw"
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
        </div>
    )
}

import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityClient } from '@/lib/sanity.client'

export default function ZoomImage({
    image,
    alt = '',
    sizes = '100vw',
    priority = true,
    fill = true,
    mode = 'contain',
    open,
    setOpen,
    ratio
}) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
        <div
            onClick={() => setOpen(false)}
            style={{ width: '100vw', height: `calc(100vw * ${ratio})` }}
            className="relative overflow-y-auto"
        >
            <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={alt ?? ''}
                sizes={sizes}
                fill={fill}
                priority={priority}
                style={{
                    objectFit: `${mode}`,
                    objectPosition: 'top'
                }}
            />
        </div>
    )
}

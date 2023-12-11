import { sanityClient } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

export default function ZoomImage({
    image = {},
    alt = '',
    sizes = '100vw',
    priority = false,
    fill = true,
    mode = 'contain',
    open,
    setOpen,
    ratio
}) {
    const imageProps = useNextSanityImage(sanityClient, image)
    
    const handleClose = (event) => {
        setOpen(false)
        event.stopPropagation()
    }

    return (
        <div
            onClick={handleClose}
            style={{ width: '100vw', height: `calc(100vw * ${ratio})` }}
            className="relative overflow-y-auto"
        >
            {imageProps &&
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    placeholder='blur'
                    blurDataURL={image.asset.metadata.lqip}
                    alt={alt ?? ''}
                    sizes={sizes}
                    fill={fill}
                    priority={priority}
                    quality={75}
                    style={{
                        objectFit: `${mode}`,
                        objectPosition: 'top'
                    }}
                />
            }
        </div>
    )
}

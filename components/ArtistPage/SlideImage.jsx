import Image from "next/image"
import { useNextSanityImage } from "next-sanity-image"

import { sanityClient } from "@/lib/sanity.client"

export default function SlideImage({ image, priority }) {
    const imageProps = useNextSanityImage(sanityClient, image.asset)
    return (
        <section className="relative h-[80vh] w-screen">
            {imageProps && 
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    alt={image.asset.alt}
                    // width={image.asset.metadata.dimensions.width}
                    // height={image.asset.metadata.dimensions.height}
                    // placeholder='blur'
                    // blurDataURL={image.asset.metadata.lqip}
                    fill
                    sizes="100vw"
                    priority={priority}
                    style={{
                        // width: '100%',
                        // height: 'auto',
                        objectFit: 'contain',
                    }}
                />
            }
        </section>
    )
}

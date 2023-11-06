import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { sanityClient } from "@/lib/sanity.client";

export default function SlideImage({ image }) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
        <div className="relative h-screen w-screen p-40 flex flex-col items-center justify-center">
            {imageProps && 
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    alt={''}
                    width={image.metadata.dimensions.width}
                    height={image.metadata.dimensions.height}
                    sizes="100vw"
                    priority
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            }
        </div>
    )
}

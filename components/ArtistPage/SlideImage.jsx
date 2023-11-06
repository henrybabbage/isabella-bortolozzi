import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { sanityClient } from "@/lib/sanity.client";

export default function SlideImage({ image }) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
        <div className="relative h-full w-full">
            {imageProps && 
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    alt={''}
                    fill
                    sizes="100vw"
                    priority
                    style={{ objectFit: 'cover' }}
                />
            }
        </div>
    )
}

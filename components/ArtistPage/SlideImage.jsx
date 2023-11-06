import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { sanityClient } from "@/lib/sanity.client";

export default function SlideImage({ image }) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
        <div className="relative h-[80vh] w-screen mt-24 flex flex-col items-center justify-center">
                {imageProps && 
                    <Image
                        src={imageProps.src}
                        loader={imageProps.loader}
                        alt={''}
                        fill
                        sizes="100vw"
                        priority
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                }
        </div>
    )
}

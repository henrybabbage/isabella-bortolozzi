import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { sanityClient } from "@/lib/sanity.client";

export default function SlideImage({ image }) {
    const imageProps = useNextSanityImage(sanityClient, image)
    return (
        <section className="h-auto w-full overflow-hidden sm:h-screen sm:overflow-auto flex flex-col justify-center">
			<div className="relative h-[80vh]">
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
        </section>
    )
}

import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityClient } from '@/sanity/lib/sanity.client'

export default function SlideImage({ image, priority }) {
  const imageProps = useNextSanityImage(sanityClient, image.asset)
  return (
    <section className="relative h-[80vh] w-full max-w-full flex justify-center items-center">
      {imageProps && (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={image.alt ?? ''}
          width={image.asset.metadata.dimensions.width}
          height={image.asset.metadata.dimensions.height}
          sizes="(min-width: 1120px) 1120px, (min-width: 660px) 660px, (min-width: 440px) 440px, 300px"
          priority={priority}
          quality={75}
          className="object-contain h-full w-auto"
        />
      )}
    </section>
  )
}

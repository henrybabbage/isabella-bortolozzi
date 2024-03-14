import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityClient } from '@/sanity/lib/sanity.client'

export default function SlideImage({ image, priority }) {
  const imageProps = useNextSanityImage(sanityClient, image.asset)
  return (
    <section className="relative h-[80vh] w-screen max-w-full">
      {imageProps && (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={image.alt ?? ''}
          // width={image.asset.metadata.dimensions.width}
          // height={image.asset.metadata.dimensions.height}
          fill
          sizes="100vw"
          priority={priority}
          quality={75}
          style={{
            objectFit: 'contain',
          }}
        />
      )}
    </section>
  )
}

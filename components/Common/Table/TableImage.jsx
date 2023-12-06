import { sanityClient } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { cn } from 'utils/cn'

import { useActiveItemStore } from '@/context/useActiveItemStore'

export default function TableImage({ currentImage, id }) {
	const imageProps = useNextSanityImage(sanityClient, currentImage?.asset)

	const inViewItem = useActiveItemStore((state) => state.inViewItem)

	if (!currentImage) return null

	return (
		<div className={cn('absolute inset-0 h-full w-full', inViewItem === id ? 'opacity-100' : 'opacity-0')}>
			{imageProps && 
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
            }
		</div>
	)
}

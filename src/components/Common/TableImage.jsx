import { useActiveItemStore } from '@/context/store'
import { sanityClient } from '@/sanity/lib/sanity.client'
import clsx from 'clsx'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'

export default function TableImage({ currentImage, id }) {
	const imageProps = useNextSanityImage(sanityClient, currentImage?.asset)

	const inViewItem = useActiveItemStore((state) => state.inViewItem)

	if (!currentImage) return null

	return (
		<div className={clsx('absolute inset-0 h-full w-full', inViewItem === id ? 'opacity-100' : 'opacity-0')}>
			<Image
				src={imageProps.src}
				loader={imageProps.loader}
				alt=""
				fill
				sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 50vw"
				priority
				style={{ objectFit: 'cover', objectPosition: 'center' }}
			/>
		</div>
	)
}

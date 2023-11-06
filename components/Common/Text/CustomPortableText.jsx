import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityClient } from '@/lib/sanity.client'
import { cn } from '@/utils/cn'

export function CustomPortableText({
	paragraphClasses,
	value,
}) {
	const image = value.asset ?? {}
	const imageProps = useNextSanityImage(sanityClient, image)
	const components = {
		block: {
			normal: ({ children }) => {
				return <p className={cn(paragraphClasses, "text-primary")}>{children}</p>
			},
		},
		marks: {
				em: ({ children }) => <em className="italic">{children}</em>,
				strong: ({ children }) => <strong className="bold">{children}</strong>,
				strikeThrough: ({ children }) => <del>{children}</del>,
				link: ({ children, value }) => {
				return (
					<a
						className="underline transition hover:text-secondary text-primary"
						href={value?.href}
						target='_blank'
						rel="noreferrer noopener"
					>
						{children}
					</a>
				)
			},
		},
		types: {
			image: ({
				value,
			}) => {
				return (
					<div className="my-6 space-y-2">
						<Image
							imageProps={imageProps.src} loader={imageProps.loader} alt={''} width={434} height={434} priority style={{ objectFit: 'contain' }}
						/>
						{value?.caption && (
							<div className="text-sm text-primary">
								{value.caption}
							</div>
						)}
					</div>
				)
			},
		},
	}
	return <PortableText components={components} value={value} />
}
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityClient } from '@/lib/sanity.client'
import { cn } from '@/utils/cn'

const InlineImage = ({ value }) => {
    const image = value.asset ?? {}
	const imageProps = useNextSanityImage(sanityClient, image)
	return (
		<div className="my-6 space-y-2 w-96 h-96 overflow-hidden relative">
            {value.asset && 
                <Image
                    imageProps={imageProps.src}
                    loader={imageProps.loader}
                    alt={''}
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                />
            }
            {value.caption && (
                <div className="text-sm text-primary">
                    {value.caption}
                </div>
            )}
        </div>
	)
}

export function CustomPortableText({
	paragraphClasses,
	value,
}) {
	const components = {
		block: {
			normal: ({ children }) => {
				return <p className={cn(paragraphClasses, "break-normal")}>{children}</p>
			},
		},
		marks: {
				em: ({ children }) => <em className="italic">{children}</em>,
				strong: ({ children }) => <strong className="bold">{children}</strong>,
				strikeThrough: ({ children }) => <del>{children}</del>,
				link: ({ children, value }) => {
				return (
					<a
						className={cn(paragraphClasses, "underline")}
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
			image: InlineImage,
		},
	}
	return <PortableText components={components} value={value} />
}

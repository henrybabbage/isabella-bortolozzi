import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { sanityClient } from '@/sanity/lib/sanity.client'
import { cn } from '@/utils/cn'

const InlineImage = ({ value }) => {
  const image = value.asset ?? {}
  const imageProps = useNextSanityImage(sanityClient, image)
  return (
    <div className="my-4 space-y-2 w-full h-full overflow-hidden relative">
      {imageProps && (
        <Image
          src={imageProps.src}
          loader={imageProps.loader}
          alt={''}
          fill
          style={{ objectFit: 'contain' }}
        />
      )}
      {value.caption && (
        <div className="text-sm text-primary">
          <p>{value.caption}</p>
        </div>
      )}
    </div>
  )
}

export function CustomPortableText({ classNames, value }) {
  const components = {
    block: {
      normal: ({ children }) => {
        return (
          <p className={cn(classNames, 'break-normal whitespace-normal')}>
            {children}
          </p>
        )
      },
      heading: ({ children }) => {
        return (
          <h2 className={cn(classNames, 'break-normal whitespace-normal')}>
            {children}
          </h2>
        )
      },
    },
    marks: {
      em: ({ children }) => <em className="italic">{children}</em>,
      strong: ({ children }) => <strong className="bold">{children}</strong>,
      strikeThrough: ({ children }) => <del>{children}</del>,
      link: ({ children, value }) => {
        return (
          <a
            className={cn(classNames, 'underline')}
            href={value?.href}
            target="_blank"
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

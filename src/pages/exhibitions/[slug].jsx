import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '@/components/Container'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { urlForImage } from '@/lib/sanity.image'
import {
    exhibitionBySlugQuery,
    exhibitionSlugsQuery,
    getExhibition,
} from '@/lib/sanity.queries'
import { formatDate } from '@/utils/formatDate'

export const getStaticProps = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ExhibitionSlugRoute(
  props
) {
  const [exhibition] = useLiveQuery(props.exhibition, exhibitionBySlugQuery, {
    slug: props.exhibition.slug.current,
  })

  return (
    <></>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(exhibitionsSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/exhibition/${slug}`) || [],
    fallback: 'blocking',
  }
}

import { useLiveQuery } from 'next-sanity/preview'
import Head from 'next/head'

import ExhibitionPage from '@/components/ExhibitionPage/ExhibitionPage'
import ExhibitionLayout from '@/components/Layout/ExhibitionLayout'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getAboveTheFoldImage, getViewingRoom } from '@/sanity/lib/sanity.fetch'
import {
  viewingRoomBySlugQuery,
  viewingRoomSlugsQuery,
} from '@/sanity/lib/sanity.queries'

export default function ViewingRoomSlugRoute(props) {
  const [viewingRoom] = useLiveQuery(
    props.viewingRoom,
    viewingRoomBySlugQuery,
    {
      slug: props.viewingRoom.slug,
    },
  )

  // above the fold image to preload
  const image = props.image

  return (
    <>
      <Head>{image && <link rel="preload" as="image" href={image.url} />}</Head>
      <main className="animate-fade-in">
        <ExhibitionPage exhibition={viewingRoom} />
      </main>
    </>
  )
}

ViewingRoomSlugRoute.layout = ExhibitionLayout

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(viewingRoomSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/viewing-rooms/${slug}`) || [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [viewingRoom, image] = await Promise.all([
    getViewingRoom(client, params.slug),
    getAboveTheFoldImage(client, params.slug, 'viewingRoom'),
  ])

  if (!viewingRoom) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      viewingRoom,
      image,
    },
  }
}

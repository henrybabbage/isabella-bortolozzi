import { useLiveQuery } from 'next-sanity/preview'

import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import {
    artistBySlugQuery,
    artistSlugsQuery,
    getArtist,
} from '@/lib/sanity.queries'

export const getStaticProps = async ({ draftMode = false, params = {} }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const artist = await getArtist(client, params.slug)

    if (!artist) {
        return {
        notFound: true,
        }
    }

    return {
        props: {
        draftMode,
        token: draftMode ? readToken : '',
        artist,
        },
    }
}

export default function ArtistSlugRoute(
  props
) {
    const [artist] = useLiveQuery(props.artist, artistBySlugQuery, {
        slug: props.artist.slug.current,
    })

    return (
        <></>
    )
}

export const getStaticPaths = async () => {
    const client = getClient()
    const slugs = await client.fetch(artistSlugsQuery)

    return {
        paths: slugs?.map(({ slug }) => `/${slug}`) || [],
        fallback: 'blocking',
    }
}

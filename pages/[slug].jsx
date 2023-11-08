import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useState } from 'react'

import ArtistSubNav from '@/components/ArtistPage/ArtistSubNav'
import CarouselSection from '@/components/ArtistPage/CarouselSection'
import CVSection from '@/components/ArtistPage/CVSection'
import ExhibitionsSection from '@/components/ArtistPage/ExhibitionsSection'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getArtist } from '@/lib/sanity.fetch'
import {
    artistBySlugQuery,
    artistSlugsQuery,
} from '@/lib/sanity.queries'

export default function ArtistSlugRoute(props) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3400)
	}, [])

    const [artist] = useLiveQuery(props.artist, artistBySlugQuery, {
        slug: props.artist.slug.current,
    })

    return (
        <main className='flex flex-col h-full w-screen relative gap-24 animate-fade-in'>
            <ArtistSubNav artist={artist} isLoading={isLoading} />
            <CarouselSection artist={artist} isLoading={isLoading} />
            <ExhibitionsSection artist={artist} />
            <CVSection artist={artist} />
        </main>
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
        revalidate: 60,
    }
}

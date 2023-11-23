import { useScrollIntoView } from '@mantine/hooks'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useState } from 'react'
import { Client } from 'react-hydration-provider'

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
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'
import { cn } from '@/utils/cn'

export default function ArtistSlugRoute(props) {
    const [isLoading, setIsLoading] = useState(true)

    const { scrollIntoView: scrollIntoViewWorks, targetRef: worksRef } = useScrollIntoView({
        offset: 0
    })

    const { scrollIntoView: scrollIntoViewExhibitions, targetRef: exhibitionsRef } = useScrollIntoView({
        offset: 0
    })

    const { scrollIntoView: scrollIntoViewBiography, targetRef: biographyRef } = useScrollIntoView({
        offset: 72
    })

    useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3400)
	}, [])

    useEffect(() => {
        isLoading
          ? (document.body.style.overflow = 'hidden')
          : (document.body.style.overflow = 'auto')
    }, [isLoading])

    const [artist] = useLiveQuery(props.artist, artistBySlugQuery, {
        slug: props.artist.slug.current,
    })

    return (
        <main className='flex flex-col h-full w-screen relative gap-24 animate-fade-in'>
            <Client>
                <Desktop>
                    <ArtistSubNav
                        artist={artist}
                        isLoading={isLoading}
                        scrollIntoViewWorks={scrollIntoViewWorks}
                        scrollIntoViewExhibitions={scrollIntoViewExhibitions}
                        scrollIntoViewBiography={scrollIntoViewBiography}
                    />
                    <div className={cn(isLoading ? '!overflow-hidden opacity-0' : 'animate-slide-in opacity-100', 'relative')}>
                        <CarouselSection worksRef={worksRef} artist={artist} isLoading={isLoading} />
                        <ExhibitionsSection exhibitionsRef={exhibitionsRef} artist={artist} />
                        <CVSection biographyRef={biographyRef} artist={artist} />
                    </div>
                </Desktop>
                <TabletAndBelow>
                    <div></div>
                </TabletAndBelow>
            </Client>
        </main>
    )
}

export const getStaticPaths = async () => {
    const client = getClient()
    const slugs = await client.fetch(artistSlugsQuery)
    console.log({slugs})
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

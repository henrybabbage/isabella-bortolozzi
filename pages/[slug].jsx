import { useScrollIntoView } from '@mantine/hooks'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useState } from 'react'
import { Client } from 'react-hydration-provider'

import ArtistSubNav from '@/components/ArtistPage/ArtistSubNav'
import CarouselSection from '@/components/ArtistPage/CarouselSection'
import CVSection from '@/components/ArtistPage/CVSection'
import ExhibitionsSection from '@/components/ArtistPage/ExhibitionsSection'
import MobileArtistSubNav from '@/components/Mobile/MobileArtistSubNav'
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
        offset: 0
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
        _type: props.artist._type,
        slug: props.artist.slug,
    })

    return (
        <main className='flex flex-col h-full w-screen relative animate-fade-in'>
            <Client>
                <Desktop>
                    <ArtistSubNav
                        artist={artist}
                        isLoading={isLoading}
                        scrollIntoViewWorks={scrollIntoViewWorks}
                        scrollIntoViewExhibitions={scrollIntoViewExhibitions}
                        scrollIntoViewBiography={scrollIntoViewBiography}
                    />
                </Desktop>
                <TabletAndBelow>
                    <MobileArtistSubNav
                        artist={artist}
                        isLoading={isLoading}
                        scrollIntoViewWorks={scrollIntoViewWorks}
                        scrollIntoViewExhibitions={scrollIntoViewExhibitions}
                        scrollIntoViewBiography={scrollIntoViewBiography}
                    />
                </TabletAndBelow>
                    <div
                        className={cn(
                            isLoading ? '!overflow-hidden opacity-0' : 'animate-slide-in opacity-100',
                            'relative flex flex-col gap-24 sm:gap-0'
                        )}
                    >
                        <CarouselSection worksRef={worksRef} artist={artist} isLoading={isLoading} />
                        <ExhibitionsSection exhibitionsRef={exhibitionsRef} artist={artist} />
                        <CVSection biographyRef={biographyRef} artist={artist} />
                    </div>
            </Client>
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

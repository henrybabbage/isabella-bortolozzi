import { useGSAP } from '@gsap/react'
import { useScrollIntoView } from '@mantine/hooks'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect, useRef, useState } from 'react'
import { Client, useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import ArtistSubNav from '@/components/ArtistPage/ArtistSubNav'
import CarouselSection from '@/components/ArtistPage/CarouselSection'
import CVSection from '@/components/ArtistPage/CVSection'
import ExhibitionSection from '@/components/ArtistPage/ExhibitionSection'
import MobileArtistSubNav from '@/components/Mobile/MobileArtistSubNav'
import { ScrollTrigger } from '@/lib/gsap'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getArtist } from '@/sanity/lib/sanity.fetch'
import {
  artistBySlugQuery,
  artistSlugsQuery,
} from '@/sanity/lib/sanity.queries'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function ArtistSlugRoute(props) {
  const [isLoading, setIsLoading] = useState(true)

  const pageRef = useRef(null)

  const hydrated = useHydrated()
  const desktopOrLaptop = useMediaQuery(
    { query: '(min-width: 992px)' },
    hydrated ? undefined : { deviceWidth: 992 },
  )

  const { scrollIntoView: scrollIntoViewWorks, targetRef: worksRef } =
    useScrollIntoView({
      offset: 0,
      duration: 400,
    })

  const {
    scrollIntoView: scrollIntoViewExhibitions,
    targetRef: exhibitionsRef,
  } = useScrollIntoView({
    offset: 0,
    duration: 400,
  })

  const { scrollIntoView: scrollIntoViewBiography, targetRef: biographyRef } =
    useScrollIntoView({
      offset: 0,
      duration: 400,
    })

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: worksRef.current, // Target the section to pin
        start: 'top top', // Start the pin when the top of the trigger hits the top of the viewport
        pin: true, // Enable pinning
        pinSpacing: false, // Disable adding spacing when the element is pinned
        markers: false, // Show markers for each scroll trigger
      })
    },
    { scope: pageRef },
  )

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3400)
  }, [])

  useEffect(() => {
    isLoading && desktopOrLaptop
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [isLoading, desktopOrLaptop])

  const [artist] = useLiveQuery(props.artist, artistBySlugQuery, {
    _type: props.artist._type,
    slug: props.artist.slug,
  })

  return (
    <main className="w-screen animate-fade-in">
      <div className="flex flex-col w-full relative">
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
        </Client>
        <div
          ref={pageRef}
          className="relative flex flex-col gap-24 sm:gap-0 h-full"
        >
          <CarouselSection
            ref={worksRef}
            artist={artist}
            isLoading={isLoading}
          />
          <ExhibitionSection exhibitionsRef={exhibitionsRef} artist={artist} />
          <CVSection biographyRef={biographyRef} artist={artist} />
        </div>
      </div>
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

import Head from 'next/head'
import { useLiveQuery } from 'next-sanity/preview'

import ExhibitionPage from '@/components/ExhibitionPage/ExhibitionPage'
import ExhibitionLayout from '@/components/Layout/ExhibitionLayout'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getAboveTheFoldImage, getExhibition } from '@/lib/sanity.fetch'
import {
    exhibitionBySlugQuery,
    exhibitionSlugsQuery,
} from '@/lib/sanity.queries'

export default function ExhibitionSlugRoute(
  props
) {
    const [exhibition] = useLiveQuery(props.exhibition, exhibitionBySlugQuery, {
        slug: props.exhibition.slug,
    })

    // above the fold image to preload
    const image = props.image
    
    return (
        <>
            <Head>
                {image && <link rel="preload" as="image" href={image.asset.url} sizes="100vw" alt={image.alt ?? 'Hero'} />}
            </Head>
            <main className='animate-fade-in'>
                <ExhibitionPage exhibition={exhibition} />
            </main>
        </>
    )
}

ExhibitionSlugRoute.layout = ExhibitionLayout

export const getStaticPaths = async () => {
    const client = getClient()
    const slugs = await client.fetch(exhibitionSlugsQuery)

    return {
        paths: slugs?.map(({ slug }) => `/exhibitions/${slug}`) || [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ draftMode = false, params = {} }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const [exhibition, image] = await Promise.all([
        getExhibition(client, params.slug),
        getAboveTheFoldImage(client, params.slug, "exhibition")
    ])
    
    if (!exhibition) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            draftMode,
            token: draftMode ? readToken : '',
            exhibition,
            image,
        },
    }
}

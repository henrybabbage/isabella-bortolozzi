import { useLiveQuery } from 'next-sanity/preview'

import ExhibitionPage from '@/components/Exhibition/ExhibitionPage'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getExhibition } from '@/lib/sanity.fetch'
import {
    exhibitionBySlugQuery,
    exhibitionSlugsQuery,
} from '@/lib/sanity.queries'

export default function ExhibitionSlugRoute(
  props
) {
    const [exhibition] = useLiveQuery(props.exhibition, exhibitionBySlugQuery, {
        slug: props.exhibition.slug.current,
    })

    return (
        <ExhibitionPage exhibition={exhibition} />
    )
}

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
    const exhibition = await getExhibition(client, params.slug)
  
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
        },
    }
}

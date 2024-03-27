import { useLiveQuery } from 'next-sanity/preview'

import FadeInOutUp from '@/components/Animation/FadeInOutUp'
import ExhibitionPage from '@/components/ExhibitionPage/ExhibitionPage'
import ExhibitionLayout from '@/components/Layout/ExhibitionLayout'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getAboveTheFoldImage, getExhibition } from '@/sanity/lib/sanity.fetch'
import {
  exhibitionBySlugQuery,
  exhibitionSlugsQuery,
} from '@/sanity/lib/sanity.queries'

export default function ExhibitionSlugRoute(props) {
  const [exhibition] = useLiveQuery(props.exhibition, exhibitionBySlugQuery, {
    slug: props.exhibition.slug,
  })

  // above the fold image to preload
  const image = props.image

  return (
    <FadeInOutUp delay={0.25} durationIn={2}>
      <main className="h-full w-full">
        <ExhibitionPage exhibition={exhibition} />
      </main>
    </FadeInOutUp>
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
    getAboveTheFoldImage(client, params.slug, 'exhibition'),
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

import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import ExhibitionPage from '@/components/ExhibitionPage/ExhibitionPage'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getViewingRoom } from '@/lib/sanity.fetch'
import {
    viewingRoomBySlugQuery,
    viewingRoomSlugsQuery
} from '@/lib/sanity.queries'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function ExhibitionSlugRoute(
  props
) {
    const [viewingRoom] = useLiveQuery(props.viewingRoom, viewingRoomBySlugQuery, {
        slug: props.viewingRoom.slug,
    })

    return (
        <main className='animate-fade-in'>
            <Client>
                <Desktop>
                    <ExhibitionPage exhibition={viewingRoom} />
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
    const slugs = await client.fetch(viewingRoomSlugsQuery)

    return {
        paths: slugs?.map(({ slug }) => `/viewing-rooms/${slug}`) || [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ draftMode = false, params = {} }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const viewingRoom = await getViewingRoom(client, params.slug)
  
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
        },
    }
}

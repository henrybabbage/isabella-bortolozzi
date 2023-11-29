import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import TableView from '@/components/Common/Table/TableView'
import ViewingRoomsHeader from '@/components/ViewingRoomsPage/ViewingRoomsHeader'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getViewingRooms } from '@/lib/sanity.fetch'
import { viewingRoomsQuery } from '@/lib/sanity.queries'

export default function ViewingRooms(props) {
    const [viewingRooms] = useLiveQuery(props.viewingRooms, viewingRoomsQuery)
    return (
        <main className="animate-fade-in h-screen w-screen">
            <Client>
                <ViewingRoomsHeader />
                <TableView exhibitions={viewingRooms} />
            </Client>
        </main>
    )
}

export const getStaticProps = async ({ draftMode = false }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const viewingRooms = await getViewingRooms(client)
  
    return {
        props: {
            draftMode,
            token: draftMode ? readToken : '',
            viewingRooms,
        },
        revalidate: 60,
    }
}

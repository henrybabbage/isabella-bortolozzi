import { useLiveQuery } from 'next-sanity/preview'

import PageHeader from '@/components/Common/Header/PageHeader'
import TableView from '@/components/Common/Table/TableView'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getViewingRooms } from '@/sanity/lib/sanity.fetch'
import { viewingRoomsQuery } from '@/sanity/lib/sanity.queries'

export default function ViewingRooms(props) {
  const [viewingRooms] = useLiveQuery(props.viewingRooms, viewingRoomsQuery)
  return (
    <main className="animate-fade-in h-[100dvh] w-screen">
      <PageHeader title={'Viewing Rooms'} />
      <TableView exhibitions={viewingRooms} />
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

import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import TableView from '@/components/Common/Table/TableView'
import ExhibitionsHeader from '@/components/ExhibitionsPage/ExhibitionsHeader'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getExhibitions } from '@/lib/sanity.fetch'
import { exhibitionsQuery } from '@/lib/sanity.queries'

export default function Exhibitions(props) {
    const [exhibitions] = useLiveQuery(props.exhibitions, exhibitionsQuery)
    return (
        <main className="animate-fade-in h-screen w-screen">
            <Client>
                <ExhibitionsHeader exhibitions={exhibitions} />
                <TableView exhibitions={exhibitions} />
            </Client>
        </main>
    )
}

export const getStaticProps = async ({ draftMode = false }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const exhibitions = await getExhibitions(client)
  
    return {
        props: {
            draftMode,
            token: draftMode ? readToken : '',
            exhibitions,
        },
        revalidate: 60,
    }
}

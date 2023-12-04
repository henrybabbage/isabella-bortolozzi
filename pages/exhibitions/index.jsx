import { useLiveQuery } from 'next-sanity/preview'
import { Suspense } from 'react'
import { Client } from 'react-hydration-provider'

import TableView from '@/components/Common/Table/TableView'
import ExhibitionsHeader from '@/components/ExhibitionsPage/ExhibitionsHeader'
import LoadingMessage from '@/components/ExhibitionsPage/LoadingMessage'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getExhibitions } from '@/lib/sanity.fetch'
import { exhibitionsQuery } from '@/lib/sanity.queries'

export default function Exhibitions(props) {
    const [exhibitions] = useLiveQuery(props.exhibitions, exhibitionsQuery)
    return (
        <main className="animate-fade-in min-h-full w-screen">
            <Client>
                <ExhibitionsHeader exhibitions={exhibitions} />
                <Suspense fallback={<LoadingMessage />}>
                    <TableView exhibitions={exhibitions} />
                </Suspense>
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

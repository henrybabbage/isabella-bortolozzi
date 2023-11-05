import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'
import { Desktop, TabletAndBelow } from 'utils/breakpoints'

import TableView from '@/components/Common/Table/TableView'
import ExhibitionsHeader from '@/components/ExhibitionsPage/ExhibitionsHeader'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getExhibitions } from '@/lib/sanity.fetch'
import { exhibitionsQuery } from '@/lib/sanity.queries'

export default function Exhibitions(props) {
    const [exhibitions] = useLiveQuery(props.exhibitions, exhibitionsQuery)
    return (
        <main className="h-screen w-screen">
            <Client>
                <Desktop>
                    <ExhibitionsHeader exhibitions={exhibitions} />
                    <TableView exhibitions={exhibitions} />
                </Desktop>
                <TabletAndBelow>
                    <section></section>
                </TabletAndBelow>
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

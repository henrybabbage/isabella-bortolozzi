import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import TableView from '@/components/Common/TableView'
import { getClient } from '@/lib/sanity.client'
import { getExhibitions } from '@/lib/sanity.fetch'
import { exhibitionsQuery } from '@/lib/sanity.queries'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function Exhibitions(props) {
    const [exhibitions] = useLiveQuery(props.exhibitions, exhibitionsQuery)
    return (
        <main className="h-screen w-screen">
            <Client>
                <Desktop>
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
    }
}

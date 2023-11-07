import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import TableView from '@/components/Common/Table/TableView'
import NewsHeader from '@/components/NewsPage/NewsHeader'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getNews } from '@/lib/sanity.fetch'
import { newsQuery } from '@/lib/sanity.queries'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function News(props) {
    const [news] = useLiveQuery(props.news, newsQuery)
    return (
        <main className="h-screen w-screen">
            <Client>
                <Desktop>
                    <NewsHeader news={props.news} />
                    <TableView exhibitions={props.news} />
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
    const news = await getNews(client)
  
    return {
        props: {
            draftMode,
            token: draftMode ? readToken : '',
            news,
        },
        revalidate: 60,
    }
}
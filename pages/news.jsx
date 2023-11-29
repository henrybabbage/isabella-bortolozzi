import { useLiveQuery } from 'next-sanity/preview'

import TableView from '@/components/Common/Table/TableView'
import NewsHeader from '@/components/NewsPage/NewsHeader'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getNews } from '@/lib/sanity.fetch'
import { newsQuery } from '@/lib/sanity.queries'

export default function News(props) {
    const [news] = useLiveQuery(props.news, newsQuery)
    return (
        <main className="animate-fade-in h-[100dvh] w-screen">
            <NewsHeader news={news} />
            <TableView exhibitions={news} />
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

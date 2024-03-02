import { useLiveQuery } from 'next-sanity/preview'

import PageHeader from '@/components/Common/Header/PageHeader'
import Marquee from '@/components/Common/Marquee/Marquee'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getNews } from '@/sanity/lib/sanity.fetch'
import { newsQuery } from '@/sanity/lib/sanity.queries'

export default function News(props) {
  const [news] = useLiveQuery(props.news, newsQuery)
  return (
    <main className="animate-fade-in min-h-[100dvh] w-screen px-4">
      <PageHeader title={'News'} />
      <Marquee items={news} />
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

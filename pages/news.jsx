import { useLiveQuery } from 'next-sanity/preview'

import FadeInOut from '@/components/Animation/FadeInOut'
import PageHeader from '@/components/Common/Header/PageHeader'
import Marquee from '@/components/NewsPage/Marquee'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getNews } from '@/sanity/lib/sanity.fetch'
import { newsQuery } from '@/sanity/lib/sanity.queries'

export default function News(props) {
  const [news] = useLiveQuery(props.news, newsQuery)
  return (
    <FadeInOut delay={0.25}>
      <main className="min-h-screen w-screen max-w-screen px-4">
        <PageHeader title={'News'} />
        <Marquee items={news} />
      </main>
    </FadeInOut>
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

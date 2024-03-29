import { useLiveQuery } from 'next-sanity/preview'

import FadeInOut from '@/components/Animation/FadeInOut'
import PageHeader from '@/components/Common/Header/PageHeader'
import TableView from '@/components/Common/Table/TableView'
import YearsPopover from '@/components/ExhibitionsPage/YearsPopover'
import ExhibitionsLayout from '@/components/Layout/ExhibitionsLayout'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getExhibitions } from '@/sanity/lib/sanity.fetch'
import { exhibitionsQuery } from '@/sanity/lib/sanity.queries'

export default function Exhibitions(props) {
  const [exhibitions] = useLiveQuery(props.exhibitions, exhibitionsQuery)
  return (
    <FadeInOut delay={0.5} durationIn={2} durationOut={2}>
      <main className="min-h-screen w-screen">
        <PageHeader title={'Exhibitions'}>
          <YearsPopover exhibitions={exhibitions} />
        </PageHeader>
        <TableView exhibitions={exhibitions} />
      </main>
    </FadeInOut>
  )
}

Exhibitions.layout = ExhibitionsLayout

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

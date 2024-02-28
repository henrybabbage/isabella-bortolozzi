import { useLiveQuery } from 'next-sanity/preview'
import { Suspense } from 'react'
import { Client } from 'react-hydration-provider'

import PageHeader from '@/components/Common/Header/PageHeader'
import TableView from '@/components/Common/Table/TableView'
import LoadingMessage from '@/components/ExhibitionsPage/LoadingMessage'
import YearsPopover from '@/components/ExhibitionsPage/YearsPopover'
import ExhibitionsLayout from '@/components/Layout/ExhibitionsLayout'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getExhibitions } from '@/sanity/lib/sanity.fetch'
import { exhibitionsQuery } from '@/sanity/lib/sanity.queries'

export default function Exhibitions(props) {
  const [exhibitions] = useLiveQuery(props.exhibitions, exhibitionsQuery)
  return (
    <main className="animate-fade-in min-h-full w-screen">
      <Client>
        <PageHeader title={'Exhibitions'}>
          <YearsPopover exhibitions={exhibitions} />
        </PageHeader>
        <Suspense fallback={<LoadingMessage />}>
          <TableView exhibitions={exhibitions} />
        </Suspense>
      </Client>
    </main>
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

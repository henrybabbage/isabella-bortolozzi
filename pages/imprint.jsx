import { useLiveQuery } from 'next-sanity/preview'

import FadeInOut from '@/components/Animation/FadeInOut'
import PageHeader from '@/components/Common/Header/PageHeader'
import { CustomPortableText } from '@/components/Common/Text/CustomPortableText'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getImprint } from '@/sanity/lib/sanity.fetch'
import { imprintQuery } from '@/sanity/lib/sanity.queries'

export default function Imprint(props) {
  const [imprint] = useLiveQuery(props.imprint, imprintQuery)
  return (
    <FadeInOut delay={0.25}>
      <main className="max-w-screen min-h-screen w-screen py-8">
        <PageHeader title={'Imprint'} />
        <section className="flex flex-col sm:grid sm:grid-cols-12 px-6 py-6">
          {imprint.heading && (
            <div className="sm:col-span-5 sm:col-start-9">
              <CustomPortableText value={imprint.heading} />
            </div>
          )}
          {imprint.imprint && (
            <div className="sm:col-span-5 sm:col-start-9">
              <CustomPortableText value={imprint.imprint} />
            </div>
          )}
          {imprint.privacyPolicy && (
            <div className="sm:col-span-5 sm:col-start-9">
              <CustomPortableText value={imprint.privacyPolicy} />
            </div>
          )}
        </section>
      </main>
    </FadeInOut>
  )
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const imprint = await getImprint(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      imprint,
    },
    revalidate: 60,
  }
}

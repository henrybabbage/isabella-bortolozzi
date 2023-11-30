import { useLiveQuery } from "next-sanity/preview"

import { CustomPortableText } from "@/components/Common/Text/CustomPortableText"
import ImprintHeader from "@/components/ImprintPage/ImprintHeader"
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getImprint } from "@/lib/sanity.fetch"
import { imprintQuery } from "@/lib/sanity.queries"

export default function Imprint(props) {
    const [imprint] = useLiveQuery(props.imprint, imprintQuery)
    return (
        <main className="h-screen w-screen py-6 animate-fade-in">
            <ImprintHeader imprint={imprint} />
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

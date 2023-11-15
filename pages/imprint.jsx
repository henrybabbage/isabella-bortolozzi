import { Client } from "react-hydration-provider"

import { CustomPortableText } from "@/components/Common/Text/CustomPortableText"
import { getClient } from "@/lib/sanity.client"
import { getImprint } from "@/lib/sanity.fetch"
import { Desktop, TabletAndBelow } from "@/utils/breakpoints"

export default function Imprint({ imprint }) {
    return (
        <main className="h-screen w-screen py-6 animate-fade-in">
            <Client>
                <Desktop>
                <section className='fixed h-auto z-50 top-0 grid w-screen grid-cols-12 px-6'>
                        <div className="col-span-5 col-start-4 flex w-full space-x-12 pt-6">
                            <h1 className="text-primary">Imprint</h1>
                        </div>
                    </section>
                    <section className="flex flex-col sm:grid sm:grid-cols-12 px-6 pb-6">
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
                    </Desktop>
                <TabletAndBelow>
                    <div></div>
                </TabletAndBelow>
            </Client>
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

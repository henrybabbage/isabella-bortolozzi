import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import ExhibitionSection from '@/components/HomePage/ExhibitionSection'
import Footer from '@/components/HomePage/Footer'
import MobileFooter from '@/components/Mobile/MobileFooter'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getGallery, getHome } from '@/lib/sanity.fetch'
import { galleryQuery, homeQuery } from '@/lib/sanity.queries'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function IndexPage(props) {
  const [home] = useLiveQuery(props.home, homeQuery)
  const [gallery] = useLiveQuery(props.gallery, galleryQuery)
  return (
        <main className="animate-fade-in h-[100dvh] snap-y snap-mandatory w-full overflow-x-hidden scrollbar-hide overscroll-none">
            <Client>
                <Desktop>
                    <section className="h-[100dvh] snap-start">
                        <ExhibitionSection exhibition={home.publicisedExhibitions[0]} />
                    </section>
                    <section className="h-[100dvh] snap-start">
                        <Footer featuredExhibition={home.publicisedExhibitions[0]} override={home.logoControl} gallery={props.gallery} />
                    </section>
                </Desktop>
                <TabletAndBelow>
                    <section className="h-[100svh] snap-start">
                        <ExhibitionSection exhibition={home.publicisedExhibitions[0]} />
                    </section>
                    <section className="h-[100svh] snap-start">
                        <MobileFooter featuredExhibition={home.publicisedExhibitions[0]} override={home.logoControl} gallery={gallery} />
                    </section>
                </TabletAndBelow>
            </Client>
        </main>
    )
}

export const getStaticProps = async ({ draftMode = false }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined)
    const [home, gallery] = await Promise.all([getHome(client), getGallery(client)])
  
    return {
        props: {
            draftMode,
            token: draftMode ? readToken : '',
            home,
            gallery,
        },
        revalidate: 60,
    }
}

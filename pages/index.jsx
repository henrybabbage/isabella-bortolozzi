import { useLiveQuery } from 'next-sanity/preview'

import ExhibitionSection from '@/components/HomePage/ExhibitionSection'
import Footer from '@/components/HomePage/Footer'
import { readToken } from '@/lib/sanity.api'
import { getClient } from '@/lib/sanity.client'
import { getGallery, getHome } from '@/lib/sanity.fetch'
import { homeQuery } from '@/lib/sanity.queries'

export default function IndexPage(props) {
  const [home] = useLiveQuery(props.home, homeQuery)
  return (
        <main className="animate-fade-in h-screen snap-y snap-mandatory w-full overflow-x-hidden scrollbar-hide">
            <section className="h-screen snap-start">
                <ExhibitionSection exhibition={props.home.publicisedExhibitions[0]} />
            </section>
            <section className="h-screen snap-start">
                <Footer featuredExhibition={props.home.publicisedExhibitions[0]} override={props.home.logoControl} gallery={props.gallery} />
            </section>
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

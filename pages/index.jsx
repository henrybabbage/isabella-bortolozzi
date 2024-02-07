import { useLiveQuery } from 'next-sanity/preview'
import { Client } from 'react-hydration-provider'

import ExhibitionSection from '@/components/HomePage/ExhibitionSection'
import Footer from '@/components/HomePage/Footer'
import MobileFooter from '@/components/Mobile/MobileFooter'
import SmoothScroll from '@/components/Utilities/SmoothScroll'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getGallery, getHome } from '@/sanity/lib/sanity.fetch'
import { galleryQuery, homeQuery } from '@/sanity/lib/sanity.queries'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

export default function IndexPage(props) {
  const [home] = useLiveQuery(props.home, homeQuery)
  const [gallery] = useLiveQuery(props.gallery, galleryQuery)
  return (
    <SmoothScroll>
    <main className="animate-fade-in w-full overflow-x-hidden scrollbar-hide overscroll-none">
      <Client>
        <Desktop>
          <section className="h-[100dvh]">
            <ExhibitionSection exhibition={home.publicisedExhibitions[0]} />
          </section>
          <section className="h-[100dvh]">
            <Footer
              featuredExhibition={home.publicisedExhibitions[0]}
              override={home.logoControl}
              gallery={props.gallery}
            />
          </section>
        </Desktop>
        <TabletAndBelow>
          <section className="h-[100svh]">
            <ExhibitionSection exhibition={home.publicisedExhibitions[0]} />
          </section>
          <section className="h-[100svh]">
            <MobileFooter
              featuredExhibition={home.publicisedExhibitions[0]}
              override={home.logoControl}
              gallery={gallery}
            />
          </section>
        </TabletAndBelow>
      </Client>
    </main>
    </SmoothScroll>
  )
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [home, gallery] = await Promise.all([
    getHome(client),
    getGallery(client),
  ])

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

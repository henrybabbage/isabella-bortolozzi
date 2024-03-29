import { useGSAP } from '@gsap/react'
import { useLiveQuery } from 'next-sanity/preview'
import { useRef } from 'react'

import FadeInOut from '@/components/Animation/FadeInOut'
import ExhibitionSection from '@/components/HomePage/ExhibitionSection'
import Footer from '@/components/HomePage/Footer'
import HomeLayout from '@/components/Layout/HomeLayout'
import { ScrollTrigger } from '@/lib/gsap'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { getGallery, getHome } from '@/sanity/lib/sanity.fetch'
import { galleryQuery, homeQuery } from '@/sanity/lib/sanity.queries'

export default function IndexPage(props) {
  const [home] = useLiveQuery(props.home, homeQuery)
  const [gallery] = useLiveQuery(props.gallery, galleryQuery)

  const pageRef = useRef(null)
  const heroRef = useRef(null)

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: heroRef.current, // Target the section to pin
        start: 'top top', // Start the pin when the top of the trigger hits the top of the viewport
        pin: true, // Enable pinning
        pinSpacing: false, // Disable adding spacing when the element is pinned
        markers: false, // Show markers for each scroll trigger
      })
    },
    { scope: pageRef },
  )

  return (
    <FadeInOut delay={0.25}>
      <main className="max-w-screen w-screen min-h-screen">
        <div ref={pageRef} className="w-full h-full">
          <ExhibitionSection
            exhibition={home.publicisedExhibitions[0]}
            ref={heroRef}
          />
          <Footer
            featuredExhibition={home.publicisedExhibitions[0]}
            override={home.logoControl}
            gallery={props.gallery}
          />
        </div>
      </main>
    </FadeInOut>
  )
}

IndexPage.layout = HomeLayout

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

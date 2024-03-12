import '@splidejs/react-splide/css/core'

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { useRef, useState } from 'react'

import { useSectionInView } from '@/hooks/useSectionInView'

import ArrowLeftButton from '../Common/Buttons/ArrowLeftButton'
import ArrowRightButton from '../Common/Buttons/ArrowRightButton'
import CarouselCaption from './CarouselCaption'
import PaginationCounter from './PaginationCounter'
import SlideImage from './SlideImage'

export default function CarouselSection({ artist, isLoading, worksRef }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(artist?.imageGallery?.length)

  const splideRef = useRef(null)

  const { ref } = useSectionInView('works', 0.1)

  const didClickPrevious = () => {
    if (splideRef.current) {
      splideRef.current.splide.go('>')
    }
  }

  const didClickNext = () => {
    if (splideRef.current) {
      splideRef.current.splide.go('<')
    }
  }

  const centerCarousel = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  const imageGallery = artist?.imageGallery ?? []

  if (!artist || !imageGallery) return null

  return (
    <>
      <section
        ref={ref}
        id="works"
        className="carousel-section bg-background relative h-screen w-full flex flex-col items-center justify-center overflow-x-hidden"
      >
        <div
          ref={worksRef}
          className="h-full w-full flex justify-center items-center"
        >
          {imageGallery.length > 0 && (
            <Splide
              hasTrack={false}
              tag="section"
              ref={splideRef}
              aria-label={`${artist.name} artworks`}
              options={{
                type: 'fade',
                speed: 400,
                keyboard: 'global',
                arrows: true,
                pagination: false,
                autoplay: false,
                rewind: true,
                width: '100vw',
                height: '100vh',
              }}
              onMoved={(splide, newIndex) => {
                setCurrentIndex(newIndex)
                setTotalSlides(splide.length)
              }}
              className="flex justify-center items-center"
            >
              <div
                id="wrapper"
                className="w-screen h-screen items-center flex justify-center"
              >
                <SplideTrack className="">
                  {imageGallery.length > 0 &&
                    imageGallery.map((image, idx) => (
                      <SplideSlide
                        key={idx}
                        className="flex flex-col justify-center items-center"
                      >
                        <SlideImage
                          image={image}
                          priority={idx === 0 ? true : false}
                        />
                      </SplideSlide>
                    ))}
                </SplideTrack>
                <div className="splide__arrows">
                  <div className="splide__arrow splide__arrow--prev">
                    <div className="absolute left-6">
                      <ArrowLeftButton didClickPrevious={centerCarousel} />
                    </div>
                  </div>
                  <div className="splide__arrow splide__arrow--next">
                    <div className="absolute right-6">
                      <ArrowRightButton didClickNext={centerCarousel} />
                    </div>
                  </div>
                </div>
              </div>
            </Splide>
          )}
        </div>
        <div className="space-x-8 h-8 z-50">
          <PaginationCounter
            ref={splideRef}
            currentIndex={currentIndex}
            totalSlides={totalSlides}
            isLoading={isLoading}
          />
          <CarouselCaption content={artist} currentIndex={currentIndex} />
        </div>
        <div id="caption-background" className="bottom-0 bg-background h-16 w-screen absolute -z-0"></div>
      </section>
    </>
  )
}

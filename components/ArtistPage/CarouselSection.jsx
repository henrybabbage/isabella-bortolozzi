import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { useSectionInView } from '@/hooks/useSectionInView'

import ArrowLeftButton from '../Common/Buttons/ArrowLeftButton'
import ArrowRightButton from '../Common/Buttons/ArrowRightButton'
import CarouselCaption from './CarouselCaption'
import PaginationCounter from './PaginationCounter'
import SlideImage from './SlideImage'

const OPTIONS = {
  loop: true,
  align: 'center',
  duration: 0,
}

export default function CarouselSection({ artist, isLoading, worksRef }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(artist?.imageGallery?.length)

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      jump: true,
      delay: 10,
      playOnInit: false,
      stopOnInteraction: false,
    }),
  ])

  const scrollPrev = useCallback(() => {
    centerCarousel()
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    centerCarousel()
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const { ref } = useSectionInView('works', 0.1)

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
            <>
              <div className="embla overflow-hidden">
                <div className="embla__viewport relative h-full" ref={emblaRef}>
                  <div className="embla__container flex">
                    {imageGallery.map((image, index) => (
                      <div
                        key={index}
                        className="embla__slide h-full flex-[0_0_100%] min-w-0"
                      >
                        <SlideImage
                          image={image}
                          priority={index === 0 ? true : false}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-1/2 left-6 embla__prev">
                  <ArrowLeftButton didPressButton={scrollPrev} />
                </div>
                <div className="absolute top-1/2 right-6 embla__next">
                  <ArrowRightButton didPressButton={scrollNext} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="space-x-8 h-8 z-50">
          <PaginationCounter
            ref={emblaRef}
            currentIndex={currentIndex}
            totalSlides={totalSlides}
            isLoading={isLoading}
          />
          <CarouselCaption content={artist} currentIndex={currentIndex} />
        </div>
        <div
          id="caption-background"
          className="bottom-0 bg-background h-16 w-screen absolute -z-0"
        ></div>
      </section>
    </>
  )
}

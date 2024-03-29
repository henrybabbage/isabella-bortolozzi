import useEmblaCarousel from 'embla-carousel-react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { useSectionInView } from '@/hooks/useSectionInView'
import { gsap } from '@/lib/gsap'
import { cn } from '@/utils/cn'

import CarouselCaption from './CarouselCaption'
import PaginationCounter from './PaginationCounter'
import SlideImage from './SlideImage'

const OPTIONS = {
  loop: true,
  align: 'center',
}

const CarouselSection = forwardRef(function CarouselSection(
  { artist, isLoading },
  ref,
) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipText, setTooltipText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(artist?.imageGallery?.length)
  const [isCursorLeft, setIsCursorLeft] = useState(null)

  const containerRef = useRef(null)
  const carouselRef = useRef(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  const handleScrollPrev = useCallback(() => {
    centerCarousel()
    if (emblaApi) emblaApi.scrollPrev(true)
  }, [emblaApi])

  const handleScrollNext = useCallback(() => {
    centerCarousel()
    if (emblaApi) emblaApi.scrollNext(true)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setCurrentIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const { ref: sectionRef } = useSectionInView('works', 0.1)

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power4.out',
      },
    })

    timeline.fromTo(
      containerRef.current,
      {
        autoAlpha: 0,
        yPercent: 10,
      },
      {
        delay: 1,
        duration: 2,
        autoAlpha: 1,
        yPercent: 0,
      },
    )

    timeline.play()

    return () => {
      timeline.revert()
    }
  }, [])

  const centerCarousel = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  const handleMouseEnter = useCallback(() => {
    setShowTooltip(true)
  }, [])

  const handleMouseMove = useCallback((e) => {
    const emblaContainer = containerRef.current
    if (!emblaContainer) return
    const { left, width } = emblaContainer.getBoundingClientRect()
    const cursorX = e.clientX

    // Cursor's X position relative to the carousel
    const relativeX = cursorX - left
    // Determine if the cursor is on the left or right half of the carousel
    const text = relativeX < width / 2 ? 'Prev' : 'Next'

    setIsCursorLeft(relativeX < width / 2)
    setTooltipText(text)
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false)
  }, [])

  const handleClick = () => {
    console.log('Clicked!')
    isCursorLeft ? handleScrollPrev() : handleScrollNext()
  }

  const imageGallery = artist?.imageGallery ?? []

  if (!artist || !imageGallery) return null

  return (
    <>
      <section
        ref={sectionRef}
        id="works"
        className="carousel-section bg-background relative h-screen w-full flex flex-col items-center justify-center overflow-x-hidden"
      >
        <div
          ref={ref}
          className="h-full w-full flex justify-center items-center"
        >
          {imageGallery.length > 0 && (
            <div
              ref={containerRef}
              className="embla overflow-hidden max-w-[96vw] mx-auto"
            >
              <button
                className={cn(
                  showTooltip ? 'block' : 'hidden',
                  'z-100 m-0 cursor-none p-0 text-primary bg-white px-1 py-[2px]',
                )}
                style={{
                  position: 'absolute',
                  left: mousePosition.x - 25,
                  top: mousePosition.y - 25,
                }}
              >
                {tooltipText}
              </button>
              <div
                className="embla__viewport relative h-full cursor-pointer"
                ref={emblaRef}
              >
                <div
                  ref={carouselRef}
                  onClick={handleClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="embla__container flex"
                >
                  {imageGallery.map((image, index) => (
                    <div
                      key={index}
                      className={cn(
                        currentIndex === index ? '' : '',
                        'embla__slide h-full flex-[0_0_100%] min-w-0',
                      )}
                    >
                      <SlideImage
                        image={image}
                        priority={index === 0 ? true : false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="space-x-8 h-8 z-50">
          <PaginationCounter
            currentIndex={currentIndex}
            totalSlides={totalSlides}
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
})

export default CarouselSection

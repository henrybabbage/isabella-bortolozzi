import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useCallback, useEffect, useState } from 'react'

import NewsSlide from './NewsSlide'

export function NewsCarousel({ slides, options }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      startDelay: 2000,
      speed: 0.5,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
    }),
    WheelGesturesPlugin(),
  ])

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )

  return (
    <div className="is-wheel-dragging embla overflow-hidden h-[44rem] max-w-full" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {slides.map((item, index) => (
          <div
            className="embla__slide flex-[0_0_100%] min-w-0 mr-3 max-w-[44rem]"
            key={index}
          >
            <NewsSlide item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

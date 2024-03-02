import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import NewsSlide from './NewsSlide'

export function EmblaCarousel({ slides, options }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      startDelay: 1000,
      speed: 0.25,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
    }),
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
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((item, index) => (
          <div className="embla__slide" key={index}>
            <NewsSlide item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

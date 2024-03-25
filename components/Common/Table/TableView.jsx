import { useGSAP } from '@gsap/react'
import { elementScroll, useWindowVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useEffect, useRef } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { gsap } from '@/lib/gsap'
import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { useActiveYearStore } from '@/stores/useActiveYearStore'
import { useSelectedYearStore } from '@/stores/useSelectedYearStore'

import TableImage from './TableImage'
import TableItem from './TableItem'

function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

// Credit to dataexcess (https://github.com/dataexcess) for the initial architecture that informed this feature
// and credit to Kesorn Dokphikul for solving the integration with react-virtual
export default function TableView({ exhibitions }) {
  const hydrated = useHydrated()
  const tabletOrMobile = useMediaQuery(
    { query: '(max-width: 991px)' },
    hydrated ? undefined : { deviceWidth: 991 },
  )

  const parentRef = useRef(null)
  const listRef = useRef(null)
  const listItemsRef = useRef(null)
  const scrollingRef = useRef()

  useGSAP(
    () => {
      // animations
      gsap.from('.list-container', { opacity: 0, stagger: 0.5 })
    },
    { scope: parentRef },
  )

  // zustand stores
  const setInViewItem = useActiveItemStore((state) => state.setInViewItem)
  const setInViewYear = useActiveYearStore((state) => state.setInViewYear)
  const selectedYearIndex = useSelectedYearStore(
    (state) => state.selectedYearIndex,
  )
  const setCurrentlyHoveredItem = useActiveItemStore(
    (state) => state.setCurrentlyHoveredItem,
  )

  // react-virtual
  // scroll to index function
  const scrollToFn = useCallback((offset, canSmooth, instance) => {
    const duration = 1000
    const start = parentRef.current.scrollTop
    const startTime = (scrollingRef.current = Date.now())

    const run = () => {
      if (scrollingRef.current !== startTime) return
      const now = Date.now()
      const elapsed = now - startTime
      const progress = easeInOutQuint(Math.min(elapsed / duration, 1))
      const interpolated = start + (offset - start) * progress

      if (elapsed < duration) {
        elementScroll(interpolated, canSmooth, instance)
        requestAnimationFrame(run)
      } else {
        elementScroll(interpolated, canSmooth, instance)
      }
    }

    requestAnimationFrame(run)
  }, [])

  const virtualItemSize = tabletOrMobile ? 640 : 144
  const virtualizer = useWindowVirtualizer({
    count: exhibitions?.length ?? 0,
    estimateSize: () => virtualItemSize,
    overscan: 12,
    scrollMargin: listItemsRef?.current?.offsetTop ?? 0,
    // paddingStart: 64,
    // paddingEnd: 64,
  })

  useEffect(() => {
    if (selectedYearIndex !== undefined && selectedYearIndex !== null) {
      virtualizer?.scrollToIndex(selectedYearIndex, {
        align: 'start',
        smoothScroll: true,
      })
    }
  }, [selectedYearIndex, virtualizer])

  const handleScroll = useCallback(() => {
    if (!listItemsRef.current) return
    Array.from(listItemsRef?.current?.children).map((item) => {
      // index of map array is not the same as index of virtualizer
      // to illustrate see changing length of array of children in console.log
      // console.log(listItemsRef.current.children)
      // get each list item container
      const itemRect = item.getBoundingClientRect()
      // if container is within center of viewport update stores
      if (
        itemRect.top < window.innerHeight / 2 &&
        itemRect.bottom > window.innerHeight / 2
      ) {
        const exhibitionId = item.getAttribute('dataexhibitionid')
        const exhibitionIndex = exhibitions.findIndex(
          (item) => item._id == exhibitionId,
        )
        setInViewItem(exhibitionIndex)
        setInViewYear(exhibitions[exhibitionIndex]?.year)
      }
    })
  }, [exhibitions, setInViewItem, setInViewYear])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // on every page load or route change reset the currentlyHoveredItem
  useEffect(() => {
    setCurrentlyHoveredItem(null)
  }, [setCurrentlyHoveredItem])

  // TODO separate mobile table component for mobile only logic
  // TODO replace class "sticky" with class "fixed" on archive page image and uncomment "relative" on <ol> to fix effect on position of grid list

  if (!exhibitions) return null
  return (
    <div
      ref={parentRef}
      onMouseLeave={() => setCurrentlyHoveredItem(null)}
      className="grid w-full grid-cols-12 px-4"
    >
      <div className="hidden sm:visible sm:flex sticky top-16 sm:col-span-6 sm:col-start-1 h-full w-full items-center">
        <div className="relative aspect-square h-full w-full bg-background">
          {exhibitions &&
            exhibitions.map((exhibition, index) => (
              <TableImage
                key={exhibition._id}
                index={index}
                exhibition={exhibition}
              />
            ))}
        </div>
      </div>
      <div
        ref={listRef}
        className="scrollbar-hide col-start-1 col-span-12 w-full"
      >
        {tabletOrMobile ? (
          <ol ref={listItemsRef}>
            {exhibitions &&
              exhibitions.map((exhibition) => (
                <li key={exhibition._id} id={exhibition.year} className="">
                  <TableItem exhibition={exhibition} />
                </li>
              ))}
          </ol>
        ) : (
          <ol
            ref={listItemsRef}
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              //   position: 'relative',
            }}
            className=""
          >
            {virtualizer.getVirtualItems().map((item, index) => {
              return (
                <li
                  id={index}
                  key={item.key}
                  dataexhibitionid={exhibitions[item.index]._id}
                  onMouseEnter={() => {
                    setCurrentlyHoveredItem(item.index)
                  }}
                  // virtualizer styles
                  style={{
                    position: 'absolute',
                    top: 64,
                    left: 0,
                    width: '100%',
                    height: `${item.size}px`,
                    transform: `translateY(${
                      item.start - virtualizer.options.scrollMargin
                    }px)`,
                  }}
                  className=""
                >
                  <TableItem
                    exhibition={exhibitions[item.index]}
                    index={item.index}
                  />
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </div>
  )
}

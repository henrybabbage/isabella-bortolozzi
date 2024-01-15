import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { useActiveYearStore } from '@/stores/useActiveYearStore'
import { useSelectedYearStore } from '@/stores/useSelectedYearStore'
import { cn } from '@/utils/cn'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {
  const hydrated = useHydrated()
  const tabletOrMobile = useMediaQuery(
    { query: '(max-width: 991px)' },
    hydrated ? undefined : { deviceWidth: 991 },
  )

  const parentRef = useRef(null)
  const listRef = useRef(null)
  const listItemsRef = useRef(null)
  const virtualItemSize = tabletOrMobile ? 640 : 228

  // zustand store
  const setInViewItem = useActiveItemStore((state) => state.setInViewItem)
  const setInViewYear = useActiveYearStore((state) => state.setInViewYear)

  const virtualizer = useWindowVirtualizer({
    count: exhibitions.length ?? 0,
    estimateSize: () => virtualItemSize,
    overscan: 8,
    scrollMargin: listRef?.current?.offsetTop ?? 0,
  })

  const selectedYearIndex = useSelectedYearStore(
    (state) => state.selectedYearIndex,
  )

  useLayoutEffect(() => {
    if (selectedYearIndex !== undefined && selectedYearIndex !== null) {
      virtualizer.scrollToIndex(selectedYearIndex, {
        align: 'start',
        smoothScroll: true,
      })
    }
  }, [selectedYearIndex, virtualizer])

  // selection algorithm:
  // 1. if mouse is over an item then set that item active item
  // 2. if mouse is not over an item, or in event of scroll, then set item in center of view as active item

  const handleScroll = useCallback(() => {
    exhibitions.map((_, index) => {
      const element = document.getElementById(index)
      if (element) {
        const itemRect = element.getBoundingClientRect()
        if (
          itemRect.top < window.innerHeight / 2 &&
          itemRect.bottom > window.innerHeight / 2
        ) {
          setInViewItem(index)
          setInViewYear(exhibitions[index].year)
        }
      }
    })
  }, [exhibitions, setInViewItem, setInViewYear])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // TODO separate mobile table component for mobile only logic

  if (!exhibitions) return null

  return (
    <div
      ref={parentRef}
      className={cn('', 'grid w-full grid-cols-12 items-start px-6')}
    >
      <div className="hidden sm:visible sm:flex sticky top-0 sm:col-span-7 sm:col-start-1 h-screen w-full items-center">
        <div className="relative h-[54vw] w-[54vw] bg-background">
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
        className="scrollbar-hide sm:col-span-9 sm:col-start-8 col-start-1 col-span-12 w-full py-[calc(50vh-11vw)]"
      >
        {tabletOrMobile ? (
          <ol ref={listItemsRef}>
            {exhibitions &&
              exhibitions.map((exhibition) => (
                <li
                  key={exhibition._id}
                  id={exhibition.year}
                  className="scroll-mt-[calc(50vh-11vw)]"
                >
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
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((item, index) => {
              return (
                <div
                  key={item.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${item.size}px`,
                    transform: `translateY(${
                      item.start - virtualizer.options.scrollMargin
                    }px)`,
                  }}
                  className="scroll-mt-[calc(50vh-11vw)]"
                >
                  <li id={index} onMouseEnter={() => setInViewItem(index)}>
                    <TableItem
                      exhibition={exhibitions[item.index]}
                      index={index}
                    />
                  </li>
                </div>
              )
            })}
          </ol>
        )}
      </div>
    </div>
  )
}

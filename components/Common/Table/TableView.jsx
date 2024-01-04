import { useWindowVirtualizer } from '@tanstack/react-virtual'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from 'react-responsive'

import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { useActiveYearStore } from '@/stores/useActiveYearStore'
import { useSelectedYearStore } from '@/stores/useSelectedYearStore'
import { cn } from '@/utils/cn'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {
  const [currentMouseYPos, setCurrentMouseYPos] = useState(0)

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

  const { ref, inView } = useInView({
    rootMargin: '-50% 0px -50% 0px',
  })

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

  useEffect(() => {
    // ref for table of rows
    if (listItemsRef) {
      // top of the table (which is not top of the viewport)
      const tableYOffsetTop = listItemsRef.current.getBoundingClientRect().top
      const mousePosWithinTable = Math.abs(tableYOffsetTop - currentMouseYPos)

      // array from ref for table of rows
      const tableRows = Array.from(listItemsRef.current.children)

      tableRows.map((row, index) => {
        const rowYOffsetTop = row.getBoundingClientRect().top
        const rowYOffsetBottom = row.getBoundingClientRect().bottom

        // mouse position relative to top and bottom of element
        if (
          mousePosWithinTable > rowYOffsetTop &&
          mousePosWithinTable < rowYOffsetBottom
        ) {
          // set the index of this table row
          setInViewItem(index)
        } else if (inView) {
          setInViewItem(index)
        }
      })
    }
  }, [inView, setInViewItem, setInViewYear, currentMouseYPos])

  const handleMouseMovement = useCallback((e) => {
    setCurrentMouseYPos(e.clientY)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMovement)
    return () => {
      window.removeEventListener('mousemove', handleMouseMovement)
    }
  }, [currentMouseYPos, handleMouseMovement])

  // TODO separate mobile table component for mobile only logic

  console.log({ inView })

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
        className={cn(
          '',
          'scrollbar-hide sm:col-span-9 sm:col-start-8 col-start-1 col-span-12 w-full py-[calc(50vh-11vw)]',
        )}
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
                >
                  <li className="scroll-mt-[calc(50vh-11vw)]">
                    <TableItem
                      exhibition={exhibitions[item.index]}
                      index={index}
                      ref={ref}
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

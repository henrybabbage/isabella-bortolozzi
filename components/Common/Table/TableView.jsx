import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useEffect, useRef } from 'react'
import { Client, useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { useActiveYearStore } from '@/stores/useActiveYearStore'
import { useSelectedYearStore } from '@/stores/useSelectedYearStore'
import { Desktop, TabletAndBelow } from '@/utils/breakpoints'

import TableImage from './TableImage'
import TableItem from './TableItem'

// Credit to dataexcess (https://github.com/dataexcess) for the initial architecture that informed this feature
// and credit to Kesorn Dokphikul for solving the integration with react-virtual
export default function TableView({ exhibitions }) {
  const hydrated = useHydrated()
  const tabletOrMobile = useMediaQuery(
    { query: '(max-width: 991px)' },
    hydrated ? undefined : { deviceWidth: 991 },
  )

  const parentRef = useRef(null)
  const listItemsRef = useRef(null)

  // zustand stores
  const setInViewItem = useActiveItemStore((state) => state.setInViewItem)
  const setInViewYear = useActiveYearStore((state) => state.setInViewYear)
  const selectedYearIndex = useSelectedYearStore(
    (state) => state.selectedYearIndex,
  )
  const setCurrentlyHoveredItem = useActiveItemStore(
    (state) => state.setCurrentlyHoveredItem,
  )

  const virtualItemSize = tabletOrMobile ? 640 : 144
  const virtualizer = useWindowVirtualizer({
    count: exhibitions?.length ?? 0,
    estimateSize: () => virtualItemSize,
    overscan: 12,
    scrollMargin: parentRef?.current?.offsetTop ?? 0,
    paddingStart: 64,
    // getScrollElement: () => listItemsRef.current,
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
      // index of the map array is not the same as the index of virtualizer array
      // to illustrate observe the changing length of the array of children in console.log
      // console.log(listItemsRef.current.children)

      // get each list item container
      const itemRect = item.getBoundingClientRect()
      // if container is within center of viewport update zustand stores
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

  // TODO replace class "sticky" with class "fixed" on archive page image and uncomment "relative" on <ol> to fix effect on position of grid list

  if (!exhibitions) return null
  return (
    <Client>
      <div
        ref={parentRef}
        onMouseLeave={() => setCurrentlyHoveredItem(null)}
        className="w-full grid grid-cols-12 px-4"
      >
        <Desktop>
          <div className="sm:flex sticky top-16 sm:col-span-6 sm:col-start-1 h-full w-full sm:items-center">
            <div className="relative aspect-square h-full w-full">
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
        </Desktop>
        <TabletAndBelow>
          <ol ref={listItemsRef}>
            {exhibitions &&
              exhibitions.map((exhibition) => (
                <div key={exhibition._id} id={exhibition.year} className="">
                  <TableItem exhibition={exhibition} />
                </div>
              ))}
          </ol>
        </TabletAndBelow>
        <Desktop>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              // position: 'relative',
            }}
            className="sm:col-span-6 sm:col-start-6"
          >
            {virtualizer.getVirtualItems().map((item, index) => {
              return (
                <ol
                  ref={listItemsRef}
                  id={index}
                  key={item.key}
                  dataexhibitionid={exhibitions[item.index]._id}
                  onMouseEnter={() => {
                    setCurrentlyHoveredItem(item.index)
                  }}
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
                  className="list-item"
                >
                  <TableItem
                    exhibition={exhibitions[item.index]}
                    index={item.index}
                  />
                </ol>
              )
            })}
          </div>
        </Desktop>
      </div>
    </Client>
  )
}

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
  const listRef = useRef(null)
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
    scrollMargin: listRef?.current?.offsetTop ?? 0,
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
    setCurrentlyHoveredItem(null)
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
  }, [exhibitions, setCurrentlyHoveredItem, setInViewItem, setInViewYear])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (!exhibitions) return null
  return (
    <Client>
      <div
        ref={parentRef}
        onMouseLeave={() => setCurrentlyHoveredItem(null)}
        className="grid w-full grid-cols-12 items-start px-4"
      >
        <Desktop>
          <div className="flex fixed top-16 sm:col-span-6 sm:col-start-1 h-full w-full items-start">
            <div className="relative h-[50vw] w-[50vw] bg-background">
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
        <div
          ref={listRef}
          className="sm:col-span-6 sm:col-start-7 col-start-1 col-span-12 w-full"
        >
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
                  <li
                    id={index}
                    key={item.key}
                    dataExhibitionId={exhibitions[item.index]._id}
                    onMouseEnter={() => {
                      setCurrentlyHoveredItem(item.index)
                    }}
                    // onMouseLeave={() => setCurrentlyHoveredItem(null)}
                    // virtualizer styles
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
                    className="list-item"
                  >
                    <TableItem
                      exhibition={exhibitions[item.index]}
                      index={item.index}
                    />
                  </li>
                )
              })}
            </ol>
          </Desktop>
        </div>
      </div>
    </Client>
  )
}

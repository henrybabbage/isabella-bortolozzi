import { useRouter } from 'next/router'
import { forwardRef } from 'react'

import DynamicLink from '@/components/Primitives/DynamicLink'
import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { TabletAndBelow } from '@/utils/breakpoints'
import { cn } from '@/utils/cn'
import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'

import StandardImage from '../Media/StandardImage'

// TableItem.jsx is each row of the table composed from TableView.jsx
const TableItem = forwardRef(function TableItem({ exhibition, index }, ref) {
  const router = useRouter()

  // get inViewItem from zustand store
  const inViewItem = useActiveItemStore((state) => state.inViewItem)
  // get currently hovered item from zustand store if any
  const currentlyHoveredItem = useActiveItemStore(
    (state) => state.currentlyHoveredItem,
  )

  console.log({ inViewItem })
  console.log({ currentlyHoveredItem })

  // format list of artist names for this row item
  const artistNames = exhibition?.artists?.map((a) => a.name)
  const artistList = artistNames?.join(', ')

  if (!exhibition) return null
  return (
    <DynamicLink link={exhibition} scroll={false}>
      <div
        ref={ref}
        className="text-primary grid-rows-[10.25vw] transition-colors duration-700 ease-in-out group relative flex flex-col sm:grid h-[40rem] sm:h-[10.25vw] sm:max-h-[10.25vw] cursor-pointer sm:grid-cols-6 px-4 content-start pt-1 sm:pt-0 sm:pb-6 text-left"
      >
        <TabletAndBelow>
          <div className="sm:hidden h-[22rem] max-h-full w-full overflow-hidden pb-6">
            <StandardImage
              key={exhibition._id}
              image={exhibition.mainImage ?? ''}
            />
          </div>
        </TabletAndBelow>
        <div
          className={cn(
            (currentlyHoveredItem ? currentlyHoveredItem : inViewItem) === index
              ? 'bg-highlight'
              : 'bg-none',
            'sm:col-span-6 sm:col-start-1 h-full',
          )}
        >
          <div className="grid grid-cols-6 w-full h-full">
            <div className="flex flex-col sm:col-span-3 sm:col-start-1 pt-6 sm:pt-3 w-fit h-full">
              {exhibition.title && (
                <h1 className="text-primary">{exhibition?.title}</h1>
              )}
              {exhibition.subtitle && (
                <h2 className="text-primary">{exhibition?.subtitle}</h2>
              )}
              {artistList && (
                <h2 className="text-primary pl-8">{artistList}</h2>
              )}
            </div>
            <div className="flex flex-col sm:col-span-1 sm:col-start-4 w-fit sm:pt-3 pt-6 pl-8 h-full">
              {!router.pathname.startsWith('/exhibitions') &&
                exhibition.venue && (
                  <h3 className="text-primary">{exhibition?.venue?.name}</h3>
                )}
              {!router.pathname.startsWith('/exhibitions') && (
                <h3 className="text-primary">
                  {exhibition.venue && exhibition.venue.city && (
                    <span>
                      {exhibition.venue.country
                        ? exhibition?.venue?.city + ', '
                        : exhibition?.venue?.city}
                    </span>
                  )}
                  {exhibition.venue && exhibition.venue.country && (
                    <span>{exhibition?.venue?.country}</span>
                  )}
                </h3>
              )}
            </div>
            <div className="w-full h-full sm:pt-3 pt-6 sm:col-span-2 sm:col-start-5 flex justify-end">
              <div className="inline-flex h-full">
                {exhibition.startDate && exhibition.endDate && (
                  <h3 className="inline-flex space-x-2 text-primary">
                    <span className="align-baseline">
                      {formatDateWithoutYear(exhibition.startDate)}
                    </span>
                    <span>—</span>
                    <span>{formatDateWithoutYear(exhibition.endDate)}</span>
                  </h3>
                )}
                {exhibition.endDate && (
                  <h3 className="text-primary pl-4">
                    <span className="align-baseline">
                      {getYear(exhibition.endDate)}
                    </span>
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DynamicLink>
  )
})

export default TableItem

import { useRouter } from 'next/router'
import { forwardRef } from 'react'

import DynamicLink from '@/components/Primitives/DynamicLink'
import { useActiveItemStore } from '@/stores/useActiveItemStore'
import { cn } from '@/utils/cn'
import { formatDateWithoutYear, getYear } from '@/utils/dateHelpers'

import StandardImage from '../Common/Media/StandardImage'
import { CustomPortableText } from '../Common/Text/CustomPortableText'

const ExhibitionTableItem = forwardRef(function ExhibitionTableItem(
  { exhibition, index },
  ref,
) {
  const router = useRouter()

  // get inViewItem from zustand store
  const inViewItem = useActiveItemStore((state) => state.inViewItem)
  // get currently hovered item from zustand store if any
  const currentlyHoveredItem = useActiveItemStore(
    (state) => state.currentlyHoveredItem,
  )

  // format list of artist names for this row item
  const artistNames = exhibition?.artists?.map((a) => a.name)
  const artistList = artistNames?.join(', ')

  if (!exhibition) return null
  return (
    <DynamicLink link={exhibition} scroll={false}>
      <div
        ref={ref}
        className={cn(
          'z-50 text-primary group relative flex flex-col sm:grid h-[40rem] sm:h-[10.25vw] sm:max-h-[10.25vw] sm:grid-flow-dense sm:grid-cols-12 px-6 content-start pt-1 sm:pt-0 sm:pb-6 text-left',
          '',
        )}
      >
        <div className="sm:hidden h-[22rem] max-h-full w-full overflow-hidden pb-6">
          <StandardImage
            key={exhibition._id}
            image={exhibition.mainImage ?? ''}
          />
        </div>
        <div
          id="divider"
          className="sm:ml-4 sm:col-span-6 sm:col-start-7 sm:border-t sm:border-solid sm:border-border"
        ></div>
        <div
          className={cn(
            'sm:col-span-6 sm:col-start-7 h-[10.25vw] sm:ml-4',
            (currentlyHoveredItem ? currentlyHoveredItem : inViewItem) === index
              ? 'bg-highlight'
              : 'bg-background',
          )}
        >
          <div
            className={cn(
              'sm:col-span-3 sm:col-start-7 flex flex-col h-full sm:h-auto',
              '',
            )}
          >
            <div className="flex w-full flex-col pt-6 sm:pt-3">
              {exhibition.title && (
                <h1 className="uppercase pr-2">{exhibition.title}</h1>
              )}
              {exhibition.subtitle && (
                <h2 className="h-auto">{exhibition.subtitle}</h2>
              )}
              {router.pathname.startsWith('/news') && exhibition.heading && (
                <CustomPortableText value={exhibition.heading} classNames="" />
              )}
              {router.pathname.startsWith('/news') && exhibition.text && (
                <CustomPortableText
                  value={exhibition.text}
                  classNames={cn('uppercase', '')}
                />
              )}
            </div>
            <div className="sm:col-span-3 sm:col-start-2 pt-4 sm:pt-0">
              <h2 className="pl-8">{artistList}</h2>
            </div>
          </div>
          <div className="sm:col-span-2 sm:col-start-9 flex flex-col pt-3 h-fit sm:h-auto">
            {!router.pathname.startsWith('/exhibitions') && (
              <h3 className="pr-0">
                {exhibition.venue && exhibition.venue.name && (
                  <span>
                    {exhibition.venue.city || exhibition.venue.country
                      ? exhibition.venue.name + ', '
                      : exhibition.venue.name}
                  </span>
                )}
                {exhibition.venue && exhibition.venue.city && (
                  <span>
                    {exhibition.venue.country
                      ? exhibition.venue.city + ', '
                      : exhibition.venue.city}
                  </span>
                )}
                {exhibition.venue && exhibition.venue.country && (
                  <span>{exhibition.venue.country}</span>
                )}
              </h3>
            )}
          </div>
          <div className="sm:col-span-2 sm:col-start-11 flex justify-end pt-3 h-fit sm:h-auto">
            <div className="flex w-full sm:w-auto justify-between sm:justify-normal">
              {exhibition.startDate && exhibition.endDate && (
                <h3 className="">
                  {formatDateWithoutYear(exhibition.startDate)}—
                  {formatDateWithoutYear(exhibition.endDate)}
                </h3>
              )}
              {exhibition.endDate && (
                <h3 className="pl-6">{getYear(exhibition.endDate)}</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </DynamicLink>
  )
})

export default ExhibitionTableItem
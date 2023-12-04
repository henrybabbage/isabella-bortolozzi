import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useState } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { useSelectedYearStore } from '@/context/useSelectedYearStore'
import { useScrollToSelectedYear } from '@/hooks/useScrollToSelectedYear'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {
    const [listItems, setListItems] = useState(exhibitions)

    const tableContentRef = useRef()

    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
    const rowSize = tabletOrMobile ? 640 : 312

    const selectedYearIndex = useSelectedYearStore((state) => state.selectedYearIndex)

    useScrollToSelectedYear(selectedYearIndex, tableContentRef)

    const rowVirtualizer = useVirtualizer({
        count: exhibitions.length,
        getScrollElement: () => tableContentRef.current,
        estimateSize: () => rowSize,
        overscan: 12,
    })

    const virtualItems = rowVirtualizer.getVirtualItems()

	if (!exhibitions) return null

	return (
		<div className="grid w-full grid-cols-12 items-start px-6">
			<div className="hidden sm:visible sm:flex sticky top-0 col-span-3 col-start-1 h-screen w-full items-center">
				<div className="relative h-[22vw] w-[22vw] bg-background">
					{exhibitions &&
						exhibitions.map((exhibition) => (
							<TableImage
								key={exhibition._id}
								id={exhibition._id}
								currentImage={exhibition.mainImage ?? ''}
							/>
						))}
				</div>
			</div>
			<div className="sm:col-span-9 sm:col-start-4 col-start-1 col-span-12 w-full py-[calc(50vh-11vw)]">
				<ol
                    ref={tableContentRef}
                    style={{ height: `${rowVirtualizer.getTotalSize()}px`, }}
                >
                    {virtualItems.map(virtualItem => {
                        const listItem = listItems[virtualItem.index]
                        return (
							<li
                                key={virtualItem.key}
                                className="scroll-mt-[calc(50vh-11vw)]"
                                style={{
                                    height: `${virtualItem.size}px`,
                                }}
                            >
								<TableItem exhibition={listItem} />
							</li>
						)
                    })}
				</ol>
			</div>
		</div>
	)
}

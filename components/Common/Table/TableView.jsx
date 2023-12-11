import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useLayoutEffect, useRef } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { useSelectedYearStore } from '@/context/useSelectedYearStore'
import { cn } from '@/utils/cn'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions }) {
    const hydrated = useHydrated()
    const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })

    const parentRef = useRef(null)
    const tableContentRef = useRef(null)
    const listRef = useRef(null)
    const virtualItemSize = tabletOrMobile ? 640 : 312

    const virtualizer = useWindowVirtualizer({
        count: exhibitions.length,
        estimateSize: () => virtualItemSize,
        overscan: 8,
        scrollMargin: listRef.current?.offsetTop ?? 0,
    })

    const selectedYearIndex = useSelectedYearStore((state) => state.selectedYearIndex)

    useLayoutEffect(() => {
		if (selectedYearIndex !== undefined && selectedYearIndex !== null) {
			virtualizer.scrollToIndex(selectedYearIndex, { align: 'start', smoothScroll: true })
		}
	}, [selectedYearIndex, virtualizer])

    // TODO separate mobile table component for mobile only logic

	if (!exhibitions) return null

	return (
		<div ref={parentRef} className={cn("", "grid w-full grid-cols-12 items-start px-6")}>
			<div className="hidden sm:visible sm:flex sticky top-0 col-span-3 col-start-1 h-screen w-full items-center">
				<div className="relative h-[22vw] w-[22vw] bg-background">
					{exhibitions &&
						exhibitions.map((exhibition) => (
							<TableImage
								key={exhibition._id}
                                exhibition={exhibition}
							/>
						))}
				</div>
			</div>
			<div ref={listRef} className={cn("", "scrollbar-hide sm:col-span-9 sm:col-start-4 col-start-1 col-span-12 w-full py-[calc(50vh-11vw)]")}>
                {tabletOrMobile ? (
                    <ol ref={tableContentRef}>
                        {exhibitions &&
                            exhibitions.map((exhibition) => (
                                <li key={exhibition._id} id={exhibition.year} className="scroll-mt-[calc(50vh-11vw)]">
                                    <TableItem exhibition={exhibition} />
                                </li>
                            ))}
                    </ol>
                ) : (
                    <ol
                        ref={tableContentRef}
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {virtualizer.getVirtualItems().map((item) => {
                            return (
                                <div
                                    key={item.key}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${item.size}px`,
                                        transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
                                    }}
                                >
                                    <li className='scroll-mt-[calc(50vh-11vw)]'>
                                        <TableItem exhibition={exhibitions[item.index]} />
                                    </li>
                                </div>
                        )})}
                    </ol>
                )}
			</div>
		</div>
	)
}

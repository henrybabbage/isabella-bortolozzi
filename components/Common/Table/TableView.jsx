import { useRef } from 'react'
import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { useSelectedYearStore } from '@/context/useSelectedYearStore'
import { useScrollToSelectedYear } from '@/hooks/useScrollToSelectedYear'
import { cn } from '@/utils/cn'

import TableImage from './TableImage'
import TableItem from './TableItem'

export default function TableView({ exhibitions, fullPage = false }) {

    const parentRef = useRef(null)
    const tableContentRef = useRef()

    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })

    const selectedYearIndex = useSelectedYearStore((state) => state.selectedYearIndex)

    useScrollToSelectedYear(selectedYearIndex, tableContentRef)

	if (!exhibitions) return null

	return (
		<div ref={parentRef} className={cn(fullPage ? "overflow-auto" : "", "grid w-full grid-cols-12 items-start px-6")}>
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
			<div className={cn(fullPage ? "h-screen" : "", "scrollbar-hide sm:col-span-9 sm:col-start-4 col-start-1 col-span-12 w-full py-[calc(50vh-11vw)]")}>
                <ol ref={tableContentRef}>
                    {exhibitions &&
                        exhibitions.map((exhibition) => (
                            <li key={exhibition._id} id={exhibition.year} className="scroll-mt-[calc(50vh-11vw)]">
                                <TableItem id={exhibition._id} year={exhibition.year} exhibition={exhibition} />
                            </li>
                        ))}
                </ol>
			</div>
		</div>
	)
}

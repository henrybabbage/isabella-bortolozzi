import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'

import { useActiveYearStore } from '@/context/useActiveYearStore'
import { useSelectedYearStore } from '@/context/useSelectedYearStore'
import { cn } from '@/utils/cn'
import { getYear } from '@/utils/dateHelpers'

export default function YearsPopover({ exhibitions }) {
    const [years, setYears] = useState([])
    const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		let years = exhibitions.map((exhibition) => getYear(exhibition.year))
		years = Array.from([...new Set(years)])
		setYears(years)
	}, [exhibitions])

    const inViewYear = useActiveYearStore((state) => state.inViewYear)

    const setSelectedYearIndex = useSelectedYearStore((state) => state.setSelectedYearIndex)

    const didClickYear = (year) => {
		const firstExhibitionWithYear = exhibitions.find((exhibition) => getYear(exhibition.endDate) == year)
		const idx = exhibitions.indexOf(firstExhibitionWithYear)
        setSelectedYearIndex(idx)
	}

    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen} className='bg-background h-fit'>
            <Popover.Trigger asChild className='shadow-transparent shadow-none focus:shadow-none outline-none focus:outline-none'>
                <button type="button" aria-label="Open menu to select chosen year" className="h-fit">
                    <h3 className="text-secondary hover:text-primary small-caps">{isOpen ? 'Close' : 'Select Year'}</h3>
                </button>
            </Popover.Trigger>
            <Popover.Portal className="shadow-transparent shadow-none focus:shadow-none">
                <Popover.Content onCloseAutoFocus={(event) => event.preventDefault()} className="shadow-transparent shadow-none focus:shadow-none outline-none focus:outline-none h-fit bg-background">
                    <nav className="grid grid-cols-12 w-screen px-6 sm:px-0 pt-1 pb-2 sm:pt-1">
                        <div className="sm:col-span-9 sm:col-start-4 col-span-12 col-start-1 sm:pl-3">
                            <div className="h-fit w-full sm:w-2/3">
                                {years.map((year, index) => (
                                    <span key={index} className="h-fit inline-flex">
                                        <button
                                            onClick={() => {
                                                didClickYear(year)
                                            }}
                                            aria-label={`Scroll to exhibitions from the year ${year}`}
                                            className="h-fit focus-visible:outline-1 focus-visible:ring-secondary focus-visible:ring-offset-1"
                                        >
                                            <h3
                                                className={cn(
                                                    "cursor-pointer h-fit inline-flex shrink-0 text-secondary hover:text-primary",
                                                    inViewYear === year ? 'text-primary' : 'text-secondary'
                                                )}
                                                key={index}
                                            >
                                                {year}
                                            </h3>
                                        </button>
                                        <span className="text-secondary mr-1 h-fit w-fit">{index < years.length - 1 ? ',' : ''}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </nav>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

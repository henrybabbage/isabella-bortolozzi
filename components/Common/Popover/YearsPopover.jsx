import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useActiveYearStore } from '@/context/useActiveYearStore'
import { cn } from '@/utils/cn'
import { getYear } from '@/utils/dateHelpers'

export default function YearsPopover({ exhibitions }) {
    const [years, setYears] = useState([])
    const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		let years = exhibitions.map((exhibition) => getYear(exhibition.endDate))
		years = Array.from([...new Set(years)])
		setYears(years)
	}, [exhibitions])

    const setInViewYear = useActiveYearStore((state) => state.setInViewYear)
    const inViewYear = useActiveYearStore((state) => state.inViewYear)

    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen} className='bg-background h-fit'>
            <Popover.Trigger asChild className='shadow-transparent shadow-none focus:shadow-none outline-none focus:outline-none'>
                <button type="button" aria-label="Open menu to select chosen year" className="h-fit">
                    <h3 className="text-secondary hover:text-primary">{isOpen ? 'Close' : 'Select Year'}</h3>
                </button>
            </Popover.Trigger>
            <Popover.Portal className="shadow-transparent shadow-none focus:shadow-none">
                <Popover.Content onCloseAutoFocus={(event) => event.preventDefault()} className="shadow-transparent shadow-none focus:shadow-none outline-none focus:outline-none h-fit bg-background">
                    <nav className="grid grid-cols-12 w-screen px-6 sm:px-0 pt-1 pb-2 sm:pt-0">
                        <div className="sm:col-span-9 sm:col-start-4 col-span-12 col-start-1 sm:pl-3">
                            <div className="h-fit w-full sm:w-2/3">
                                {years.map((year, index) => (
                                    <Link
                                        href={`#${year}`}
                                        onClick={() => setInViewYear(year)}
                                        aria-label='Select year'
                                        key={index}
                                        className="h-fit"
                                    >
                                        <h3
                                            className={cn(
                                                "tabular-nums mr-1 cursor-pointer inline-flex shrink-0 text-secondary hover:text-primary",
                                                inViewYear === year ? 'text-primary' : 'text-secondary'
                                            )}
                                            key={index}
                                        >
                                            {index != years.length - 1 ? year + ',' : year}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

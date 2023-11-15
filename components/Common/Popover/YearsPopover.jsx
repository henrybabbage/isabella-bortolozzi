import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'

import { useActiveYearStore } from '@/context/useActiveYearStore'
import { cn } from '@/utils/cn'
import { getYear } from '@/utils/dateHelpers'
import Link from 'next/link'

export default function YearsPopover({ exhibitions }) {
    const [years, setYears] = useState([])
    const [open, setOpen] = useState(false)

	useEffect(() => {
		let years = exhibitions.map((exhibition) => getYear(exhibition.endDate))
		years = Array.from([...new Set(years)])
		setYears(years)
	}, [exhibitions])

    const setInViewYear = useActiveYearStore((state) => state.setInViewYear)
    const inViewYear = useActiveYearStore((state) => state.inViewYear)

    return (
        <Popover.Root open={open} onOpenChange={setOpen} className='bg-background h-fit'>
            <Popover.Trigger asChild className='shadow-transparent shadow-none focus:shadow-none'>
                <button type="button" aria-label="Open menu to select chosen year" className="h-fit">
                    <h3 className="text-secondary hover:text-primary">{open ? 'Close' : 'Select Year'}</h3>
                </button>
            </Popover.Trigger>
            <Popover.Portal className="shadow-transparent shadow-none focus:shadow-none">
                <Popover.Content onCloseAutoFocus={(event) => event.preventDefault()} className="shadow-transparent shadow-none focus:shadow-none h-fit bg-background">
                    <nav className="grid grid-cols-12 w-screen">
                        <div className="col-span-9 col-start-4 pl-3">
                            <div className="h-fit w-2/3">
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
                                                "mr-1 cursor-pointer inline-flex shrink-0 text-secondary hover:text-primary",
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

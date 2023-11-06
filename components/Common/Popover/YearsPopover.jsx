import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'

import { getYear } from '@/utils/dateHelpers'

export default function YearsPopover({ exhibitions }) {
    const [years, setYears] = useState([])
    const [open, setOpen] = useState(false)

	useEffect(() => {
		let years = exhibitions.map((exhibition) => getYear(exhibition.endDate))
		years = Array.from([...new Set(years)])
		setYears(years)
	}, [exhibitions])

    return (
        <Popover.Root open={open} onOpenChange={setOpen} className='bg-background h-fit'>
            <Popover.Trigger asChild>
                <button type="button" aria-label="Open menu to select chosen year" className="h-fit">
                    <h3 className="text-secondary hover:text-primary">{open ? 'Close' : 'Select Year'}</h3>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
            <Popover.Content onCloseAutoFocus={(event) => event.preventDefault()} className="h-fit bg-background">
                <nav className="grid grid-cols-12 w-screen">
                    <div className="col-span-9 col-start-4 pl-3">
                        <div className="h-fit w-2/3">
                            {years.map((year, index) => (
                                <button type="button" aria-label='Select year' key={index} className="h-fit">
                                    <h3
                                        className="mr-1 inline-flex shrink-0 text-secondary hover:text-primary"
                                        key={index}
                                        onClick={() => {}}
                                    >
                                        {index != years.length - 1 ? year + ',' : year}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

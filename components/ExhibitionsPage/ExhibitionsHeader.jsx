import React from 'react'

import YearsPopover from '../Common/Popover/YearsPopover'

export default function ExhibitionsHeader({ exhibitions }) {
    return (
        <section className='fixed top-0 z-700 grid w-screen grid-cols-12 px-6'>
            <div className="z-500 col-span-9 col-start-4 flex h-[4.5rem] w-full space-x-12 pt-6">
                <h1 className="text-secondary">Exhibitions</h1>
                <YearsPopover exhibitions={exhibitions} />
            </div>
        </section>
    )
}

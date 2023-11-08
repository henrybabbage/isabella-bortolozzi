import YearsPopover from '../Common/Popover/YearsPopover'

export default function ExhibitionsHeader({ exhibitions }) {
    return (
        <section className='fixed bg-background h-auto z-50 top-0 grid w-screen grid-cols-12 px-6'>
            <div className="col-span-9 col-start-4 flex w-full space-x-12 pt-6">
                <h1 className="text-primary">Exhibitions</h1>
                <YearsPopover exhibitions={exhibitions} />
            </div>
        </section>
    )
}

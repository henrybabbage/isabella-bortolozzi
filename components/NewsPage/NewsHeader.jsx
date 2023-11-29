export default function NewsHeader({ news }) {
    return (
        <section className='fixed bg-background h-auto z-50 top-0 grid w-screen grid-cols-12 px-6'>
            <div className="sm:col-span-9 sm:col-start-4 col-span-12 col-start-1 flex w-full space-x-12 pt-14 sm:pt-6">
                <h1 className="text-primary">News</h1>
            </div>
        </section>
    )
}

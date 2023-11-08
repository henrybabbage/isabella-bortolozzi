export default function NewsHeader({ news }) {
    return (
        <section className='fixed bg-background h-auto z-50 top-0 grid w-screen grid-cols-12 px-6'>
            <div className="col-span-9 col-start-4 flex w-full space-x-12 pt-6">
                <h1 className="text-primary">News</h1>
            </div>
        </section>
    )
}

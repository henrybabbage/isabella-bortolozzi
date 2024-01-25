
export default function PageHeader({ title, children }) {
    return (
        <section className="fixed bg-background h-auto z-50 top-0 grid w-screen grid-cols-12 px-6 pt-6 pb-1 sm:pt-0 sm:pb-0">
            <div className="pb-2 sm:col-span-9 sm:col-start-4 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full space-x-12 pt-14 sm:pt-6">
                <h1 className="text-primary">{title}</h1>
                {children}
            </div>
        </section>
    )
}

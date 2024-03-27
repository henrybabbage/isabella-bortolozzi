export default function PageHeader({ title, children }) {
  return (
    <section className="fixed bg-background h-auto z-50 top-0 left-0 grid w-screen grid-cols-12 px-4 pt-6 pb-1 sm:pt-0 sm:pb-0">
      <div className="pb-2 sm:col-span-1 sm:col-start-2 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full pt-14 sm:pt-4">
        <h1 className="text-primary">{title}</h1>
      </div>
      <div className="pb-2 sm:col-span-9 sm:col-start-3 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full pt-14 sm:pt-4">
        {children}
      </div>
    </section>
  )
}

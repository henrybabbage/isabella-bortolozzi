import Link from 'next/link'

export default function PageHeader({ title, children }) {
  return (
    <section className="fixed bg-background h-auto z-50 top-0 left-0 grid w-screen grid-cols-12 px-4 pt-4 pb-1 sm:pt-0 sm:pb-0">
      <div className="pb-2 sm:col-span-1 sm:col-start-2 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full pt-14 sm:pt-4">
        <h1 className="text-primary p-0 m-0">{title}</h1>
      </div>
      <div className="pb-2 sm:col-span-6 sm:col-start-3 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full pt-14 sm:pt-4">
        {children}
      </div>
      <div className="sm:col-span-1 sm:col-start-12 col-span-1 col-start-12 pt-14 sm:pt-4 w-full flex justify-end">
        <Link
          href="/"
          aria-label="Click to visit home page"
          className="p-0 m-0"
        >
          <h1 className="text-primary transition hover:text-secondary cursor-pointer">
            Bortolozzi
          </h1>
        </Link>
      </div>
    </section>
  )
}

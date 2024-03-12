import Link from 'next/link'

import { useNavOpenStore } from '@/stores/useNavOpenStore'

export default function PageHeader({ title, children }) {
  const [isNavOpen, setIsNavOpen] = useNavOpenStore(
    ({ isNavOpen, setIsNavOpen }) => [isNavOpen, setIsNavOpen],
  )
  return (
    <section className="fixed bg-background h-auto z-50 top-0 left-0 grid w-screen grid-cols-12 px-4 pt-6 pb-1 sm:pt-0 sm:pb-0">
      <div className="pb-2 sm:col-span-9 sm:col-start-2 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full space-x-12 pt-14 sm:pt-4">
        <h1 className="text-primary">{title}</h1>
        {children}
      </div>
      <div className="sm:col-span-1 sm:col-start-12 col-span-1 col-start-12 pt-14 sm:pt-4 w-full flex justify-end">
        <Link href="/" aria-label="Click to visit home page">
          <h1 className="text-primary transition hover:text-secondary cursor-pointer">
            Bortolozzi
          </h1>
        </Link>
      </div>
    </section>
  )
}

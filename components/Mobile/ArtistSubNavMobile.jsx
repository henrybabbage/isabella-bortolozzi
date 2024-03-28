import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'

import { useActiveSectionStore } from '@/stores/useActiveSectionStore'
import { cn } from '@/utils/cn'

export default function ArtistSubNavMobile({
  artist,
  isLoading,
  scrollIntoViewWorks,
  scrollIntoViewExhibitions,
  scrollIntoViewBiography,
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (!artist) return null

  return (
    <section className="fixed bg-background h-auto z-50 top-0 grid w-screen grid-cols-12 px-6 pt-6 pb-1 sm:pt-0 sm:pb-0">
      <div className="sm:col-span-9 sm:col-start-4 col-span-12 col-start-1 flex justify-between sm:justify-normal w-full space-x-12 pt-14 sm:pt-6">
        <h1 className="text-primary">{artist.name}</h1>
        <SectionsPopover
          isLoading={isLoading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          scrollIntoViewWorks={scrollIntoViewWorks}
          scrollIntoViewExhibitions={scrollIntoViewExhibitions}
          scrollIntoViewBiography={scrollIntoViewBiography}
        />
      </div>
    </section>
  )
}

const SectionsPopover = ({
  isLoading,
  isOpen,
  setIsOpen,
  scrollIntoViewWorks,
  scrollIntoViewExhibitions,
  scrollIntoViewBiography,
}) => {
  const inViewSection = useActiveSectionStore((state) => state.inViewSection)
  const setInViewSection = useActiveSectionStore(
    (state) => state.setInViewSection,
  )
  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="z-[999] bg-background h-fit w-full sm:hidden"
    >
      <Popover.Trigger
        asChild
        className="shadow-transparent shadow-none focus:shadow-none outline-none focus:outline-none"
      >
        <button
          type="button"
          aria-label="Open menu to select section"
          className="h-fit px-2"
        >
          <h3 className="text-secondary hover:text-primary active:text-primary text-2xl align-top">
            {'↓'}
          </h3>
        </button>
      </Popover.Trigger>
      <Popover.Portal className="shadow-transparent shadow-none focus:shadow-none">
        <Popover.Content
          onCloseAutoFocus={(event) => event.preventDefault()}
          className="z-[999] shadow-transparent shadow-none focus:shadow-none outline-none focus:outline-none h-fit bg-background w-screen"
        >
          <nav className="flex flex-col gap-4 w-full pt-6 pb-6 px-6">
            <button
              type="button"
              className={cn(
                'uppercase z-100 w-fit cursor-pointer transition hover:text-primary',
                isLoading ? 'hidden' : 'block',
                inViewSection === 'works' ? 'text-primary' : 'text-secondary',
              )}
              onClick={() => {
                setInViewSection('works')
                scrollIntoViewWorks({
                  alignment: 'start',
                })
                setIsOpen(false)
              }}
            >
              {'Works'}
            </button>
            <button
              type="button"
              className={cn(
                'uppercase z-100 w-fit cursor-pointer transition hover:text-primary',
                isLoading ? 'hidden' : 'block',
                inViewSection === 'exhibitions'
                  ? 'text-primary'
                  : 'text-secondary',
              )}
              onClick={() => {
                setInViewSection('exhibitions')
                scrollIntoViewExhibitions({
                  alignment: 'start',
                })
                setIsOpen(false)
              }}
            >
              {'Exhibitions'}
            </button>
            <button
              type="button"
              className={cn(
                'uppercase z-100 w-fit cursor-pointer transition hover:text-primary',
                isLoading ? 'hidden' : 'block',
                inViewSection === 'biography'
                  ? 'text-primary'
                  : 'text-secondary',
              )}
              onClick={() => {
                setInViewSection('biography')
                scrollIntoViewBiography({
                  alignment: 'start',
                })
                setIsOpen(false)
              }}
            >
              {'Biography'}
            </button>
          </nav>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

import { useActiveSectionStore } from '@/stores/useActiveSectionStore'
import { cn } from '@/utils/cn'

import LoadingCounter from '../Common/Loading/LoadingCounter'

export default function ArtistSubNav({
  artist,
  isLoading,
  scrollIntoViewWorks,
  scrollIntoViewExhibitions,
  scrollIntoViewBiography,
}) {
  const inViewSection = useActiveSectionStore((state) => state.inViewSection)
  const setInViewSection = useActiveSectionStore(
    (state) => state.setInViewSection,
  )

  if (!artist) return null
  return (
    <aside className="fixed top-0 grid w-full grid-cols-12 px-4 sm:px-6 z-100">
      <div className="absolute col-span-1 col-start-1 flex h-[4rem] pt-4 w-full items-baseline bg-background"></div>
      <div className="absolute col-span-9 col-start-2 inline-flex h-[4rem] pt-4 w-full items-baseline space-x-12 bg-background">
        <h1 className="text-primary w-auto whitespace-nowrap">{artist.name}</h1>
        <nav className="flex space-x-4 w-full">
          <button
            type="button"
            className={cn(
              'z-100 w-fit cursor-pointer transition hover:text-primary uppercase',
              isLoading ? 'hidden' : 'block',
              inViewSection === 'works' ? 'text-primary' : 'text-secondary',
            )}
            onClick={() => {
              setInViewSection('works')
              scrollIntoViewWorks({
                alignment: 'start',
              })
            }}
          >
            {'Works'}
          </button>
          <div className={cn(isLoading ? 'block' : 'hidden', 'w-full z-[999]')}>
            <LoadingCounter totalImages={artist.imageGallery?.length} />
          </div>
          <button
            type="button"
            className={cn(
              'z-100 w-fit cursor-pointer transition hover:text-primary uppercase',
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
            }}
          >
            {'Exhibitions'}
          </button>
          <button
            type="button"
            className={cn(
              'z-100 w-fit cursor-pointer transition hover:text-primary uppercase',
              isLoading ? 'hidden' : 'block',
              inViewSection === 'biography' ? 'text-primary' : 'text-secondary',
            )}
            onClick={() => {
              setInViewSection('biography')
              scrollIntoViewBiography({
                alignment: 'start',
              })
            }}
          >
            {'Biography'}
          </button>
        </nav>
      </div>
    </aside>
  )
}

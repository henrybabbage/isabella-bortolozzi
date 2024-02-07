import { useHydrated } from 'react-hydration-provider'
import { useMediaQuery } from 'react-responsive'

import { useSectionInView } from '@/hooks/useSectionInView'
import { cn } from '@/utils/cn'

import ArtistBio from './ArtistBio'
import ExhibitionList from './ExhibitionList'

export default function CVSection({ artist, biographyRef }) {
  const { ref } = useSectionInView('biography', 0.1)

  const hydrated = useHydrated()
  const tabletOrMobile = useMediaQuery(
    { query: '(max-width: 991px)' },
    hydrated ? undefined : { deviceWidth: 991 },
  )

  if (!artist) return null

  return (
    <section ref={ref} id="biography">
      <div
        ref={biographyRef}
        className={cn(
          tabletOrMobile ? 'pt-[8rem]' : 'pt-[4.5rem]',
          'h-full min-h-screen px-6',
        )}
      >
        <div className="grid grid-cols-12">
          <div className="h-full col-start-1 col-span-12 sm:col-span-9 sm:col-start-4">
            <ArtistBio
              artistBio1={artist?.artistBio1}
              artistBio2={artist?.artistBio2}
            />
            {artist.soloExhibitionHistory && (
              <h3 className="mb-6 text-primary">Selected Solo Exhibitions</h3>
            )}
            <div className="mb-6">
              {artist &&
                artist.soloExhibitionHistory &&
                artist.soloExhibitionHistory.map((exhibition, idx) => (
                  <ExhibitionList
                    key={idx}
                    year={exhibition?.year}
                    exhibition={exhibition?.exhibitionRecord}
                  />
                ))}
            </div>
            {artist.groupExhibitionHistory && (
              <h3 className="mb-6 text-primary">Selected Group Exhibitions</h3>
            )}
            <div className="mb-6">
              {artist &&
                artist.groupExhibitionHistory &&
                artist.groupExhibitionHistory.map((exhibition, idx) => (
                  <ExhibitionList
                    key={idx}
                    year={exhibition?.year}
                    exhibition={exhibition?.exhibitionRecord}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

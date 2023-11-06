
import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

import ArtistBio from './ArtistBio'
import ExhibitionList from './ExhibitionList'

export default function CVSection({ artist }) {
    const { ref } = useSectionInView("CV", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
    return (
        <section ref={ref} id="CV" className="h-screen min-h-screen flex flex-col">
            <ArtistBio artistBio1={artist?.artistBio1} artistBio2={artist?.artistBio2} />
            <h3 className="mb-6 text-primary">Selected Solo Exhibitions</h3>
            <div className='mb-6'>
                {artist &&
                    artist?.soloExhibitionHistory &&
                    artist?.soloExhibitionHistory.map((exhibition, idx) => (
                        <ExhibitionList
                            key={idx}
                            year={exhibition?.year}
                            exhibition={exhibition?.exhibitionRecord}
                        />
                ))}
            </div>
            <h3 className="mb-6 text-primary">Selected Group Exhibitions</h3>
            <div className='mb-6'>
                {artist &&
                    artist?.groupExhibitionHistory &&
                    artist?.groupExhibitionHistory.map((exhibition, idx) => (
                        <ExhibitionList
                            key={idx}
                            year={exhibition?.year}
                            exhibition={exhibition?.exhibitionRecord}
                        />
                ))}
            </div>
        </section>
    )
}

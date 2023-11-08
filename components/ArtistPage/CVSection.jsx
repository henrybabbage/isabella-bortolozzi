
import { useSectionInView } from '@/hooks/useSectionInView'

import ArtistBio from './ArtistBio'
import ExhibitionList from './ExhibitionList'

export default function CVSection({ artist }) {
    const { ref } = useSectionInView("biography", 0.1)
    return (
        <section ref={ref} id="biography" className="scroll-mt-16 h-screen min-h-screen px-6">
            <div className="grid grid-cols-12">
                <div className="h-fit col-span-9 col-start-4">
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
                </div>
            </div>
        </section>
    )
}

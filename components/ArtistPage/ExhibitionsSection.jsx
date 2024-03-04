import { useSectionInView } from '@/hooks/useSectionInView'

import ExhibitionsTable from './ExhibitionsTable'

export default function ExhibitionsSection({ artist, exhibitionsRef }) {
  const { ref } = useSectionInView('exhibitions', 0.1)
  return (
    <section
      ref={ref}
      id="exhibitions"
      className="bg-background z-10 table-section relative h-full min-h-screen flex flex-col"
    >
      <div ref={exhibitionsRef} className="h-full w-full">
        <ExhibitionsTable exhibitions={artist.selectedExhibitions} />
      </div>
    </section>
  )
}

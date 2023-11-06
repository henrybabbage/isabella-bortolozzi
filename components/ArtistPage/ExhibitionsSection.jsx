
import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

import TableView from '../Common/Table/TableView'

export default function ExhibitionsSection({ artist }) {
    const { ref } = useSectionInView("Exhibitions", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
    return (
        <section ref={ref} id="Exhibitions" className="h-screen min-h-screen flex flex-col">
            <TableView exhibitions={artist.selectedExhibitions} />
        </section>
    )
}

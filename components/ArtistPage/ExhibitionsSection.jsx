
import { useSectionInView } from '@/hooks/useSectionInView'

import TableView from '../Common/Table/TableView'

export default function ExhibitionsSection({ artist }) {
    const { ref } = useSectionInView("Exhibitions", 0.5)
    return (
        <section ref={ref} id="exhibitions" className="relative h-full min-h-screen flex flex-col">
            <TableView exhibitions={artist.selectedExhibitions} />
        </section>
    )
}

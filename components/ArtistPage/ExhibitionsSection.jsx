
import { useSectionInView } from '@/hooks/useSectionInView'

import TableView from '../Common/Table/TableView'

export default function ExhibitionsSection({ artist }) {
    const { ref } = useSectionInView("exhibitions", 0.1)
    return (
        <section ref={ref} id="exhibitions" className="relative h-full min-h-screen flex flex-col">
            <TableView exhibitions={artist.selectedExhibitions} />
        </section>
    )
}

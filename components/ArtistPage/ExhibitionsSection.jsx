
import { useSectionInView } from '@/hooks/useSectionInView'

import TableView from '../Common/Table/TableView'

export default function ExhibitionsSection({ artist, exhibitionsRef }) {
    const { ref } = useSectionInView("exhibitions", 0.1)
    return (
        <section ref={ref} id="exhibitions" className="relative h-full min-h-screen flex flex-col">
            <div ref={exhibitionsRef} className="h-full w-full">
                <TableView exhibitions={artist.selectedExhibitions} fullPage={false} />
            </div>
        </section>
    )
}


import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function ExhibitionsSection() {
    const { ref } = useSectionInView("Exhibitions", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
    return (
        <section ref={ref} id="Exhibitions" className="h-screen min-h-screen">
        
        </section>
    )
}


import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function CVSection() {
    const { ref } = useSectionInView("CV", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
    return (
        <section ref={ref} id="CV" className="h-screen min-h-screen">
            CV
        </section>
    )
}

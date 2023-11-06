
import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function CVSection() {
    const { ref } = useSectionInView("CV", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
    return (
        <div ref={ref} id="CV">
            CV
        </div>
    )
}

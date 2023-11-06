import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function CarouselSection() {
	const { ref } = useSectionInView("Carousel", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
	return (
		<div ref={ref} id="carousel">
			Carousel
		</div>
	)
}

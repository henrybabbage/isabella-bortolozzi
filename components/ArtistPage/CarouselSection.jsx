import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function CarouselSection() {
	const { ref } = useSectionInView("Carousel", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
	return (
		<section ref={ref} id="carousel" className="h-screen">
			Carousel
		</section>
	)
}

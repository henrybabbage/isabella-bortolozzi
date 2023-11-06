import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

export default function CarouselSection({ artist, isLoading }) {
	const { ref } = useSectionInView("Carousel", 0.5)
  	const { setActiveSection } = useActiveSectionStore()
	return (
		<section ref={ref} id="carousel" className="h-screen w-screen">
			Carousel
		</section>
	)
}

import Carousel from "nuka-carousel"

import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'

import SlideImage from "./SlideImage"

export default function CarouselSection({ artist, isLoading }) {
	const { ref } = useSectionInView("Carousel", 0.5)
  	const { setActiveSection } = useActiveSectionStore()

    const imageGallery = artist?.imageGallery ?? []
    console.log(imageGallery)
	return (
		<section ref={ref} id="carousel" className="relative h-screen w-screen flex flex-col items-center justify-center">
			<div className="h-3/4 w-3/4">
                <Carousel animation="fade" enableKeyboardControls swiping wrapAround withoutControls>
                    {imageGallery && imageGallery.map((image, idx) => (
                        <div className="h-full w-full" key={idx}>
                            <SlideImage image={image.asset} />
                        </div>
                    ))}
                </Carousel>
            </div>
		</section>
	)
}

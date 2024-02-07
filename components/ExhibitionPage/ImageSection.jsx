import { forwardRef, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'

import AspectImage from '../Common/Media/AspectImage'
import FullBleedImage from '../Common/Media/FullBleedImage'

const ImageSection = forwardRef(function ImageSection({ exhibition, scrollToSections, isLoading, index }, ref) {
	const { ref: inViewRef, inView } = useInView()
  	return (
		<Fragment ref={ref}>
			<section ref={inViewRef}
				className="relative flex flex-col w-screen items-center"
			>
				{exhibition &&
					exhibition.imageGallery &&
					exhibition.imageGallery
					.map((image, idx) =>
						idx === 0 ? (
							<FullBleedImage
								ref={(element) => scrollToSections.current.add(element)}
								key={idx}
								image={image}
								alt={image.alt}
								priority={true}
							/>
						) : image.fullbleed === true ? (
							<FullBleedImage
								ref={(element) => scrollToSections.current.add(element)}
								key={idx}
								image={image}
								alt={image.alt}
								priority={isLoading ? false : true}
							/>
						) : (
							<AspectImage
                                ref={(element) => scrollToSections.current.add(element)}
                                key={idx}
								image={image}
								alt={image.alt}
								priority={isLoading ? false : true}
								fill={true}
								mode="contain"
								sizes="100vw"
							/>
						)
				)}
			</section>
		</Fragment>
  	)
})

export default ImageSection

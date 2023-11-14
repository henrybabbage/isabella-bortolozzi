import { forwardRef } from "react";
import { useInView } from "react-intersection-observer";

import { useActiveImageStore } from "@/context/useActiveImageStore";

import AspectImage from "../Common/Media/AspectImage";
import FullBleedImage from "../Common/Media/FullBleedImage";

const SnapSection = forwardRef(function SnapSection({ exhibition }, ref) {
    const { inViewRef, inView } = useInView({ rootMargin: '-50% 0px -50% 0px' })
	const setInViewImage = useActiveImageStore((state) => state.setInViewImage)
	const inViewImage = useActiveImageStore((state) => state.inViewImage)
    console.log(inView)
    return (
        <div ref={inViewRef}>
            <section ref={ref} className="relative flex flex-col w-screen items-center">
                {exhibition &&
                    exhibition?.imageGallery &&
                    exhibition?.imageGallery
                        ?.slice(1)
                        .map((image, idx) =>
                            image?.fullbleed ? (
                                <FullBleedImage
                                    ref={(element) => scrollToSections.current.add(element)}
                                    key={idx}
                                    image={image}
                                    alt={image.alt}
                                    priority={false}
                                />
                            ) : (
                                <AspectImage
                                    ref={(element) => scrollToSections.current.add(element)}
                                    image={image}
                                    alt={image.alt}
                                    priority={false}
                                    fill={true}
                                    mode="contain"
                                    sizes="100vw"
                                    key={idx}
                                />
                            )
                )}
            </section>
        </div>
    )
})

export default SnapSection

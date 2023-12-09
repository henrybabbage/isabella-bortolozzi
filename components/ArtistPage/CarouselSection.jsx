import '@splidejs/react-splide/css/core';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useRef, useState } from "react";

import { useSectionInView } from '@/hooks/useSectionInView';

import ArrowLeftButton from "../Common/Buttons/ArrowLeftButton";
import ArrowRightButton from "../Common/Buttons/ArrowRightButton";
import GlobalDrawer from "../Common/Drawers/GlobalDrawer";
import SlideImage from "./SlideImage";

export default function CarouselSection({ artist, isLoading, worksRef }) {
    const [index, setIndex] = useState(0)

    const splideRef = useRef(null)

	const { ref } = useSectionInView("works", 0.1)

    const didClickPrevious = () => {
        setIndex(index - 1)
    }
    
    const didClickNext = () => {
        setIndex(index + 1)
    }

    const imageGallery = artist?.imageGallery ?? []

    if (!artist || !imageGallery) return null
    
	return (
        <>
            <section ref={ref} id="works" className="relative h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
                <div ref={worksRef} className="h-full w-full flex justify-center items-center">
                    {imageGallery.length > 0 &&
                        <Splide
                            hasTrack={false}
                            tag="section"
                            ref={splideRef}
                            aria-label={`${artist.name} artworks`}
                            options={{
                                type: "fade",
                                speed: 400,
                                keyboard: "global",
                                arrows: true,
                                pagination: false,
                                autoplay: true,
                                rewind: true,
                            }}
                            onArrowsMounted={( splide, prev, next ) => {console.log('prev, next', prev, next )}}
                            onMoved={( splide, newIndex ) => {
                                console.log('moved', newIndex)
                                console.log('length', splide.length)
                            }}
                        >
                            <div id="wrapper" className="w-screen h-screen items-center flex justify-center">
                                <SplideTrack className="max-w-6xl flex flex-col justify-center items-center">
                                    {imageGallery.length > 0 && imageGallery.map((image, idx) => (
                                        <SplideSlide key={idx} className="h-full w-full">
                                            <SlideImage image={image} priority={idx === 0 ? true : false} />
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                                <div className="splide__arrows">
                                    <div className="splide__arrow splide__arrow--prev">
                                        <div className="absolute left-6">
                                            <ArrowLeftButton didClickPrevious={didClickPrevious} />
                                        </div>
                                    </div>
                                    <div className="splide__arrow splide__arrow--next">
                                        <div className="absolute right-6">
                                            <ArrowRightButton didClickNext={didClickNext} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Splide>
                    }
                </div>
                <div className="absolute bottom-6 right-6 sm:bottom-6 sm:right-6">
                    {imageGallery.length > 0 && <GlobalDrawer content={artist} index={index} didClickPrevious={didClickPrevious} didClickNext={didClickNext} />}
                </div>
            </section>
        </>
	)
}

const paginationCounter = ({ splideRef }) => {
    const currentSlide = splideRef?.current?.splide.index
    const slideCount = splideRef?.current?.splide.length
    return  (
        <div className="absolute left-6 bottom-6">
            <h3 className="inline-flex gap-2.5 w-auto justify-start">
                <span className='w-5 text-center'>{currentSlide + 1}</span>
                <span className='w-2 text-center'>{'|'}</span>
                <span className='w-5 text-center'>{slideCount}</span>
            </h3>
        </div>
    )
}

import '@splidejs/react-splide/css/core';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useRef } from "react";

import { useSectionInView } from '@/hooks/useSectionInView';

import ArrowLeftButton from "../Common/Buttons/ArrowLeftButton";
import ArrowRightButton from "../Common/Buttons/ArrowRightButton";
import GlobalDrawer from "../Common/Drawers/GlobalDrawer";
import PaginationCounter from './PaginationCounter';
import SlideImage from "./SlideImage";

export default function CarouselSection({ artist, isLoading, worksRef }) {

    const splideRef = useRef(null)

	const { ref } = useSectionInView("works", 0.1)

    const didClickPrevious = () => {
        if (splideRef.current) {
            console.log(splideRef.current.move(newIndex))
            splideRef.current.move(newIndex)
        }
    }
    
    const didClickNext = () => {
        // if (splideRef.current) {
        //     console.log(splideRef.current)
        // }
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
                                width: '100vw',
                                height: '100vh',
                            }}
                            onArrowsMounted={( splide, prev, next ) => {console.log('prev, next', prev, next )}}
                            onMoved={( splide, newIndex ) => {
                                console.log('moved', newIndex)
                                console.log('length', splide.length)
                            }}
                            className="flex justify-center items-center"
                        >
                            <div id="wrapper" className="w-screen h-screen items-center flex justify-center">
                                <SplideTrack className="">
                                    {imageGallery.length > 0 && imageGallery.map((image, idx) => (
                                        <SplideSlide key={idx} className="flex flex-col justify-center items-center">
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
                <PaginationCounter ref={splideRef} isLoading={isLoading} />
                <div className="absolute bottom-6 right-6 sm:bottom-6 sm:right-6">
                    {imageGallery.length > 0 && <GlobalDrawer ref={splideRef} content={artist} didClickPrevious={didClickPrevious} didClickNext={didClickNext} />}
                </div>
            </section>
        </>
	)
}

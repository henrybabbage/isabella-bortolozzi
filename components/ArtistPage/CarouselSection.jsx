import { easeExpInOut } from 'd3-ease'
import Carousel from "nuka-carousel"
import { useState } from "react"

import { useSectionInView } from '@/hooks/useSectionInView'

import ArrowLeftButton from "../Common/Buttons/ArrowLeftButton"
import ArrowRightButton from "../Common/Buttons/ArrowRightButton"
import GlobalDrawer from "../Common/Drawers/GlobalDrawer"
import SlideImage from "./SlideImage"

export default function CarouselSection({ artist, isLoading, worksRef }) {
    const [index, setIndex] = useState(0)

	const { ref } = useSectionInView("works", 0.1)

    const didClickPrevious = () => {
        setIndex(index - 1)
    }
    
    const didClickNext = () => {
        setIndex(index + 1)
    }

    const imageGallery = artist?.imageGallery ?? []

	return (
        <>
            <section ref={ref} id="works" className="relative h-screen w-screen flex flex-col items-center justify-center">
                <div ref={worksRef} className="h-full w-full">
                    {imageGallery.length > 0 &&
                        <Carousel
                            animation="fade"
                            speed={100}
                            enableKeyboardControls
                            swiping
                            wrapAround
                            easing={easeExpInOut}
                            slideIndex={index}
                            beforeSlide={(_, v) => setIndex(v)}
                            renderCenterLeftControls={renderCenterLeftControls}
                            renderCenterRightControls={renderCenterRightControls}
                            renderBottomCenterControls={false}
                            renderBottomLeftControls={paginationCounter}
                        >
                            {imageGallery.length > 0 && imageGallery.map((image, idx) => (
                                <SlideImage image={image.asset} key={idx} />
                            ))}
                        </Carousel>
                    }
                </div>
                <div className="absolute bottom-6 right-6">
                    {imageGallery.length > 0 && <GlobalDrawer content={artist} index={index} didClickPrevious={didClickPrevious} didClickNext={didClickNext} />}
                </div>
            </section>
        </>
	)
}

const renderCenterRightControls = ({ nextSlide }) => {
    return (
        <div className="absolute right-6">
            <ArrowRightButton nextSlide={nextSlide} />       
        </div>
    )
}

const renderCenterLeftControls = ({ previousSlide }) => {
    return (
        <div className="absolute left-6">
            <ArrowLeftButton previousSlide={previousSlide} />       
        </div>
    )
}

const paginationCounter = ({ slideCount, currentSlide }) => {
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

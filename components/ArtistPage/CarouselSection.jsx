import Carousel from "nuka-carousel"
import { useState } from "react"

import { useSectionInView } from '@/hooks/useSectionInView'

import ArrowLeftButton from "../Common/Buttons/ArrowLeftButton"
import ArrowRightButton from "../Common/Buttons/ArrowRightButton"
import GlobalDrawer from "../Common/Drawers/GlobalDrawer"
import SlideImage from "./SlideImage"

export default function CarouselSection({ artist, isLoading }) {
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
                <div className="h-full w-full" onClick={() => setIndex(index + 1)}>
                    <Carousel
                        animation="fade"
                        speed={100}
                        enableKeyboardControls
                        swiping
                        wrapAround
                        slideIndex={index}
                        beforeSlide={(_, v) => setIndex(v)}
                        renderCenterLeftControls={renderCenterLeftControls}
                        renderCenterRightControls={renderCenterRightControls}
                        renderBottomCenterControls={false}
                        renderBottomLeftControls={paginationCounter}
                        className='cursor-pointer'
                    >
                        {imageGallery && imageGallery.map((image, idx) => (
                            <SlideImage image={image.asset} key={idx} />
                        ))}
                    </Carousel>
                </div>
                <div className="absolute bottom-6 right-6">
                    <GlobalDrawer content={artist} index={index} didClickPrevious={didClickPrevious} didClickNext={didClickNext} />
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
            <h3 className="inline-flex space-x-3">
                <span>{currentSlide + 1}</span>
                <span>{'|'}</span>
                <span>{slideCount}</span>
            </h3>
        </div>
    )
}

import Carousel from "nuka-carousel"
import { useState } from "react"
import { useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"

import { useActiveSectionStore } from '@/context/useActiveSectionStore'
import { useSectionInView } from '@/hooks/useSectionInView'
import { cn } from "@/utils/cn"

import ArrowLeftButton from "../Common/Buttons/ArrowLeftButton"
import ArrowRightButton from "../Common/Buttons/ArrowRightButton"
import PlusButton from "../Common/Buttons/PlusButton"
import ArtworkDrawer from "../Common/Drawers/ArtworkDrawer"
import SlideImage from "./SlideImage"

export default function CarouselSection({ artist, isLoading }) {
    const [index, setIndex] = useState(0)
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)

	const { ref } = useSectionInView("Carousel", 0.5)
  	const { setActiveSection } = useActiveSectionStore()

    const imageGallery = artist?.imageGallery ?? []

    const hydrated = useHydrated()
	const tabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
	const desktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })

    const handleMobileClick = (state, value, event) => {
		if (desktopOrLaptop) return
		else if (!desktopOrLaptop) {
			event.stopPropagation()
			state(value)
		}
	}

	const handleDesktopMouseEnter = (state, value, event) => {
		if (!desktopOrLaptop) return
		else if (desktopOrLaptop) {
			event.stopPropagation()
			state(value)
		}
	}

	return (
        <>
            <section ref={ref} id="carousel" className="relative h-screen w-screen flex flex-col items-center justify-center">
                <div className="h-full w-full">
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
                    >
                        {imageGallery && imageGallery.map((image, idx) => (
                            <SlideImage image={image.asset} key={idx} />
                        ))}
                    </Carousel>
                </div>
                <div
                    onMouseEnter={(event) => handleDesktopMouseEnter(setDrawerIsOpen, true, event)}
                    onClick={(event) => handleMobileClick(setDrawerIsOpen, true, event)}
                    className="absolute h-fit bottom-6 right-6 z-500"
                >
                    <PlusButton didPressButton={() => {}} />
                </div>
                <div
                className={cn('pointer-events-none absolute z-100 grid h-screen w-screen grid-cols-12 transition-opacity ease-in-out',
                    tabletOrMobile ? 'place-items-end' : null,
                    drawerIsOpen ? 'block' : 'hidden',
                    )}
                >
                    <div
                        className={cn('col-span-12 col-start-1 h-full bg-transparent sm:col-span-8 sm:col-start-1',
                            drawerIsOpen ? 'pointer-events-auto block' : 'pointer-events-none hidden'
                        )}
                        onMouseEnter={(event) => handleDesktopMouseEnter(setDrawerIsOpen, false, event)}
                        onClick={(event) => handleMobileClick(setDrawerIsOpen, false, event)}
                    ></div>
                    <aside className="pointer-events-none z-500 col-span-12 col-start-1 h-[540px] w-full sm:col-span-4 sm:col-start-9 sm:h-screen sm:w-auto">
                        <ArtworkDrawer setDrawerIsOpen={setDrawerIsOpen} didClickNext={() => {}} didClickPrevious={() => {}} tabletOrMobile={tabletOrMobile} />
                    </aside>
                </div>
            </section>
        </>
	)
}

const renderCenterRightControls = ({ nextSlide }) => {
    return (
        <div className="z-[999] absolute right-6">
            <ArrowRightButton nextSlide={nextSlide} />       
        </div>
    )
}

const renderCenterLeftControls = ({ previousSlide }) => {
    return (
        <div className="z-[999] absolute left-6">
            <ArrowLeftButton nextSlide={previousSlide} />       
        </div>
    )
}

const paginationCounter = ({ slideCount, currentSlide }) => {
    return  (
        <div>{`${currentSlide + 1} | ${slideCount}`}</div>
    )
}

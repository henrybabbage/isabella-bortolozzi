import { useCallback, useEffect, useRef, useState } from "react"
import { Client, useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"
import { Desktop, TabletAndBelow } from "utils/breakpoints"
import { cn } from 'utils/cn'

import BackButton from "../Common/Buttons/BackButton"
import GlobalDrawer from "../Common/Drawers/GlobalDrawer"
import LoadingScreen from "../Common/Loading/LoadingScreen"
import AspectImage from "../Common/Media/AspectImage"
import FullBleedImage from "../Common/Media/FullBleedImage"
import SnapSection from "./SnapSection"

export default function ExhibitionPage({exhibition}) {
    const [isLoading, setIsLoading] = useState(true)
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [currentScrollElement, setCurrentScrollElement] = useState(0)

    console.log(currentScrollElement)

    useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3400)
	}, [])
    
    const scrollToSections = useRef(new Set())
    const scrollViewRef = useRef(null)

    const handleScroll = useCallback(() => {
		let offset = Math.abs(scrollViewRef.current.children[0].getBoundingClientRect().top)

		Array.from(scrollToSections.current).map((section, idx) => {
            if (section === null || section === undefined) {
                return
            }

			const sectionCenter = section.offsetTop + section.offsetHeight / 2
			if (sectionCenter > offset && sectionCenter < offset + window.innerHeight) {
				setCurrentScrollElement(idx)
			}

		})
	}, [scrollViewRef])

    useEffect(() => {
		const scrollView = scrollViewRef.current
		scrollView.addEventListener('scroll', handleScroll)
		return () => {
			scrollView.removeEventListener('scroll', handleScroll)
		}
	}, [scrollViewRef, handleScroll])

    const didClickPrevious = () => {
		let goToRef = currentScrollElement - 1
		if (goToRef < 0 || goToRef > scrollToSections.current.size) {
			return
		}
		scrollToSection(goToRef)
	}

	const didClickNext = () => {
		let goToRef = currentScrollElement + 1
		if (goToRef < 0 || goToRef > scrollToSections.current.size) {
			return
		}
		scrollToSection(goToRef)
	}

	const scrollToSection = (idx) => {
		Array.from(scrollToSections.current)[idx].scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}

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
            <LoadingScreen exhibition={exhibition} isLoading={isLoading} />
            <div className={cn(isLoading ? '!overflow-hidden opacity-0' : 'animate-slide-in opacity-100', 'relative snap-y h-screen w-screen scrollbar-hide')}>
                <div className="fixed top-6 right-6 z-500">
                    <BackButton />
                </div>
                <div className="fixed bottom-6 right-6 z-500">
                    <GlobalDrawer content={exhibition} pressRelease={exhibition.body} index={currentScrollElement} didClickPrevious={didClickPrevious} didClickNext={didClickNext} />
                </div>
                <div
                    ref={scrollViewRef}
                    className="flex flex-col h-screen w-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
                >
                    <SnapSection exhibition={exhibition} scrollToSections={scrollToSections} index={currentScrollElement} />
                    <section className="relative flex flex-col w-screen h-screen snap-start">
                        <Client>
                            <Desktop><div></div></Desktop>
                            <TabletAndBelow></TabletAndBelow>
                        </Client>
                    </section>
                </div>
            </div>
        </>
    )
}

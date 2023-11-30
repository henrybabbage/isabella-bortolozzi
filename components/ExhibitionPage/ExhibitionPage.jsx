import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from 'utils/cn'

import BackButton from "../Common/Buttons/BackButton"
import GlobalDrawer from "../Common/Drawers/GlobalDrawer"
import LoadingScreen from "../Common/Loading/LoadingScreen"
import SnapSection from "./SnapSection"

export default function ExhibitionPage({exhibition}) {
    const [isLoading, setIsLoading] = useState(true)
    const [currentScrollElement, setCurrentScrollElement] = useState(0)

    console.log('currentScrollElement:', currentScrollElement)

    useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 3400)
	}, [])

    const router = useRouter()
    
    const scrollToSections = useRef(new Set())
    const scrollViewRef = useRef(null)

    console.log('scrollToSections:', scrollToSections)

    const handleScroll = useCallback(() => {
		let offset = Math.abs(scrollViewRef.current.children[0].getBoundingClientRect().top)

		Array.from(scrollToSections.current).map((section, idx) => {
            if (!section) return

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
		if (goToRef <= 0 || goToRef > scrollToSections.current.size) {
			return
		}
		scrollToSection(goToRef)
	}

	const didClickNext = () => {
		let goToRef = currentScrollElement + 1
		if (goToRef <= 0 || goToRef > scrollToSections.current.size) {
			return
		}
		scrollToSection(goToRef)
	}

	const scrollToSection = (idx) => {
        if (!idx) return
		Array.from(scrollToSections.current)[idx]?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}

    return (
        <>
            <LoadingScreen exhibition={exhibition} isLoading={isLoading} />
            <div className={cn(isLoading ? '!overflow-hidden opacity-0' : 'animate-slide-in opacity-100', 'relative snap-y h-[100dvh] w-screen scrollbar-hide')}>
                <div className="fixed top-6 right-6 z-50">
                    <BackButton backPathname={router.pathname.split('/')[1]} />
                </div>
                <div className="fixed bottom-6 right-6 z-50">
                    <GlobalDrawer content={exhibition} pressRelease={exhibition.body} index={currentScrollElement} didClickPrevious={didClickPrevious} didClickNext={didClickNext} />
                </div>
                <div
                    ref={scrollViewRef}
                    className="flex flex-col h-[100dvh] w-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
                >
                    <SnapSection exhibition={exhibition} scrollToSections={scrollToSections} index={currentScrollElement} />
                </div>
            </div>
        </>
    )
}

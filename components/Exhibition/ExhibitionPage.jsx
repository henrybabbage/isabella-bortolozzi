import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from "react"
import { Client, useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"
import { Desktop, TabletAndBelow } from "utils/breakpoints"
import { cn } from 'utils/cn'

import CloseButton from '../Common/Buttons/CloseButton'
import PlusButton from "../Common/Buttons/PlusButton"
import ArtworkDrawer from "../Common/Drawers/ArtworkDrawer"
import AspectImage from "../Common/Media/AspectImage"
import FullBleedImage from "../Common/Media/FullBleedImage"

export default function ExhibitionPage({exhibition}) {
    const [isLoading, setIsLoading] = useState(true)
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [currentScrollElement, setCurrentScrollElement] = useState(0)

    useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 3400)
	}, [])

    const router = useRouter()

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
		Array.from(scrollToSections.current)[idx]?.scrollIntoView({
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
        <div className={cn('relative snap-y h-screen w-screen scrollbar-hide', isLoading && '!overflow-hidden')}>
            <div className="fixed top-6 right-6 z-[999]">
                <div onClick={() => router.back()}>
                    <CloseButton didPressButton={() => {}} />
                </div>
            </div>
            <div
                className="fixed bottom-6 right-6 z-[999]"
                onMouseEnter={(event) => handleDesktopMouseEnter(setDrawerIsOpen, true, event)}
                onClick={(event) => handleMobileClick(setDrawerIsOpen, true, event)}
            >
                <PlusButton didPressButton={() => {}} />
            </div>
            <div
                className={cn('pointer-events-none absolute z-200 grid h-screen w-screen grid-cols-12 transition-opacity duration-150 ease-in-out',
                    tabletOrMobile ? 'place-items-end' : null,
                    drawerIsOpen ? 'opacity-100' : 'opacity-0',
                )}
            >
                <div
                    className={cn('col-span-12 col-start-1 h-full bg-transparent sm:col-span-8 sm:col-start-1',
                        drawerIsOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    )}
                    onMouseEnter={(event) => handleDesktopMouseEnter(setDrawerIsOpen, false, event)}
                    onClick={(event) => handleMobileClick(setDrawerIsOpen, false, event)}
                ></div>
                <aside className="pointer-events-none z-200 col-span-12 col-start-1 h-[540px] w-full bg-whitesmoke-400 sm:col-span-4 sm:col-start-9 sm:h-screen sm:w-auto">
                    <ArtworkDrawer />
                </aside>
            </div>
            <div
                ref={scrollViewRef}
                className="flex flex-col h-screen w-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
            >
                <section className="relative flex flex-col w-screen items-center">
                    <section className="relative">
                        {exhibition &&
                            exhibition?.imageGallery &&
                            exhibition?.imageGallery
                                ?.slice(0, 1)
                                .map((image, idx) => (
                                    <FullBleedImage
                                        reference={(element) => scrollToSections.current.add(element)}
                                        key={idx}
                                        image={image}
                                        alt={image.alt}
                                        priority={true}
                                    />
                        ))}
                    </section>
                    <section className="relative flex flex-col items-center">
                        {exhibition &&
                            exhibition?.imageGallery &&
                            exhibition?.imageGallery
                                ?.slice(1)
                                .map((image, idx) =>
                                    image?.fullbleed ? (
                                        <FullBleedImage
                                            reference={(element) => scrollToSections.current.add(element)}
                                            key={idx}
                                            image={image}
                                            alt={image.alt}
                                            priority={false}
                                        />
                                    ) : (
                                        <AspectImage
                                            reference={(element) => scrollToSections.current.add(element)}
                                            image={image}
                                            alt={image.alt}
                                            priority={true}
                                            fill={true}
                                            mode="contain"
                                            sizes="100vw"
                                            key={idx}
                                        />
                                    )
                        )}
                    </section>
                </section>
                <section ref={(element) => scrollToSections.current.add(element)} className="h-screen w-screen snap-center">
                    <Client>
                        <TabletAndBelow></TabletAndBelow>
                        <Desktop></Desktop>
                    </Client>
                </section>
            </div>
        </div>
    )
}

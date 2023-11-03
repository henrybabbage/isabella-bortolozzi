import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"
import { useHydrated } from "react-hydration-provider"
import { useMediaQuery } from "react-responsive"

import { cn } from '@/utils/cn'

import CloseButton from '../Buttons/CloseButton'
import PlusButton from "../Buttons/PlusButton"

export default function ExhibitionPage({exhibition}) {
    const [isLoading, setIsLoading] = useState(true)
    const [artworkDrawerIsOpen, setArtworkDrawerIsOpen] = useState(false)

    const router = useRouter()

    const hydrated = useHydrated()
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' }, hydrated ? undefined : { deviceWidth: 991 })
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' }, hydrated ? undefined : { deviceWidth: 992 })
    
    const handleMobileClick = (state, value, event) => {
		if (isDesktopOrLaptop) return
		else if (!isDesktopOrLaptop) {
			event.stopPropagation()
			state(value)
		}
	}

	const handleDesktopMouseEnter = (state, value, event) => {
		if (!isDesktopOrLaptop) return
		else if (isDesktopOrLaptop) {
			event.stopPropagation()
			state(value)
		}
	}

    return (
        <div className={cn('h-screen w-screen scrollbar-hide', isLoading && '!overflow-hidden')}>
            <div className="absolute top-6 right-6">
                <Link
                    scroll={false}
                    href={{
                        pathname: '/' + router.query.backNavigation,
                        query: { useStoredScrollPosition: true },
                    }}
                >
                    <CloseButton didPressButton={() => {}} />
                </Link>
            </div>
            <div
                className="absolute bottom-6 right-6"
                onMouseEnter={(event) => handleDesktopMouseEnter(setArtworkDrawerIsOpen, true, event)}
                onClick={(event) => handleMobileClick(setArtworkDrawerIsOpen, true, event)}
            >
                <PlusButton didPressButton={() => {}} />
            </div>
            {artworkDrawerIsOpen && (
                <div
                    className={cn('pointer-events-none absolute z-200 grid h-screen w-screen grid-cols-12 duration-300 delay-150 ease-in-out',
                        isTabletOrMobile ? 'place-items-end' : null,
                        artworkDrawerIsOpen ? 'opacity-100' : 'opacity-0',
                    )}
                >
                    <div
                        className={cn('col-span-12 col-start-1 h-full bg-transparent sm:col-span-8 sm:col-start-1',
                        artworkDrawerIsOpen ? 'pointer-events-auto' : 'pointer-events-none')}
                        onMouseEnter={(event) => handleDesktopMouseEnter(setArtworkDrawerIsOpen, false, event)}
                        onClick={(event) => handleMobileClick(setArtworkDrawerIsOpen, false, event)}
                    ></div>
                    <aside className="pointer-events-none z-200 col-span-12 col-start-1 h-[540px] w-full bg-whitesmoke-400 sm:col-span-4 sm:col-start-9 sm:h-screen sm:w-auto">
                    </aside>
                </div>
            )}
        </div>
    )
}
